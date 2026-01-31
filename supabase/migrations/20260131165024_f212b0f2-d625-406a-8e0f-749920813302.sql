
-- Corrigir search_path nas funções restantes

-- 1. cleanup_old_rate_limits
CREATE OR REPLACE FUNCTION public.cleanup_old_rate_limits()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.rate_limits
  WHERE created_at < NOW() - INTERVAL '24 hours';
END;
$$;

-- 2. update_plan_feature_access_updated_at
CREATE OR REPLACE FUNCTION public.update_plan_feature_access_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 3. check_rate_limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(p_throttle_key text, p_max_attempts integer DEFAULT 5, p_window_minutes integer DEFAULT 10)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record RECORD;
  v_window_start TIMESTAMPTZ;
  v_is_allowed BOOLEAN := TRUE;
  v_retry_after_seconds INTEGER := 0;
BEGIN
  v_window_start := NOW() - (p_window_minutes || ' minutes')::INTERVAL;
  
  SELECT * INTO v_record
  FROM public.rate_limits
  WHERE throttle_key = p_throttle_key
  FOR UPDATE;
  
  IF v_record IS NULL THEN
    INSERT INTO public.rate_limits (throttle_key, attempt_count, first_attempt_at, last_attempt_at)
    VALUES (p_throttle_key, 1, NOW(), NOW());
    
    RETURN jsonb_build_object(
      'allowed', TRUE,
      'attempts', 1,
      'max_attempts', p_max_attempts
    );
  END IF;
  
  IF v_record.blocked_until IS NOT NULL AND v_record.blocked_until > NOW() THEN
    v_retry_after_seconds := EXTRACT(EPOCH FROM (v_record.blocked_until - NOW()))::INTEGER;
    
    RETURN jsonb_build_object(
      'allowed', FALSE,
      'attempts', v_record.attempt_count,
      'max_attempts', p_max_attempts,
      'retry_after_seconds', v_retry_after_seconds,
      'blocked_until', v_record.blocked_until
    );
  END IF;
  
  IF v_record.first_attempt_at < v_window_start THEN
    UPDATE public.rate_limits
    SET 
      attempt_count = 1,
      first_attempt_at = NOW(),
      last_attempt_at = NOW(),
      blocked_until = NULL,
      updated_at = NOW()
    WHERE throttle_key = p_throttle_key;
    
    RETURN jsonb_build_object(
      'allowed', TRUE,
      'attempts', 1,
      'max_attempts', p_max_attempts
    );
  END IF;
  
  UPDATE public.rate_limits
  SET 
    attempt_count = attempt_count + 1,
    last_attempt_at = NOW(),
    updated_at = NOW()
  WHERE throttle_key = p_throttle_key;
  
  IF v_record.attempt_count + 1 > p_max_attempts THEN
    UPDATE public.rate_limits
    SET blocked_until = NOW() + (p_window_minutes || ' minutes')::INTERVAL
    WHERE throttle_key = p_throttle_key;
    
    v_retry_after_seconds := p_window_minutes * 60;
    v_is_allowed := FALSE;
  END IF;
  
  RETURN jsonb_build_object(
    'allowed', v_is_allowed,
    'attempts', v_record.attempt_count + 1,
    'max_attempts', p_max_attempts,
    'retry_after_seconds', v_retry_after_seconds
  );
END;
$$;

-- 4. compute_user_streak
CREATE OR REPLACE FUNCTION public.compute_user_streak(u_id uuid)
RETURNS TABLE(current_streak bigint, best_streak bigint)
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  today date := CURRENT_DATE;
BEGIN
  RETURN QUERY
  WITH dias AS (
    SELECT DISTINCT d::date AS dia
    FROM (
      SELECT rp.data_registro AS d
      FROM public.registro_peso rp
      WHERE rp.usuario_id = u_id AND rp.deletado_em IS NULL
      
      UNION ALL
      
      SELECT inf.data_registro AS d
      FROM public.informacoes_nutricionais inf
      WHERE inf.usuario_id = u_id AND inf.deletado_em IS NULL
      
      UNION ALL
      
      SELECT rh.horario::date AS d
      FROM public.registro_hidratacao rh
      WHERE rh.usuario_id = u_id AND rh.deletado_em IS NULL
    ) t
    WHERE d <= today
  ),
  ordenado AS (
    SELECT dia, ROW_NUMBER() OVER (ORDER BY dia DESC) AS rn
    FROM dias
  ),
  blocos AS (
    SELECT 
      dia,
      rn,
      (dia + rn * INTERVAL '1 day') AS grupo
    FROM ordenado
  ),
  grupos AS (
    SELECT 
      grupo,
      COUNT(*) AS tamanho_grupo,
      MIN(dia) AS min_dia,
      MAX(dia) AS max_dia
    FROM blocos
    GROUP BY grupo
  )
  SELECT 
    COALESCE((SELECT tamanho_grupo FROM grupos g WHERE g.max_dia = today), 0)::bigint AS current_streak,
    COALESCE((SELECT MAX(tamanho_grupo) FROM grupos), 0)::bigint AS best_streak;
END;
$$;
