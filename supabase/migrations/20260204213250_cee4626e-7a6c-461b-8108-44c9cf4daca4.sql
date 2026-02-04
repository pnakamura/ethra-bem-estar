-- =============================================
-- STEP 5: Hydration + Storage + Feature Access Functions
-- =============================================

-- ===================
-- REGISTRO_HIDRATACAO
-- ===================

CREATE TABLE public.registro_hidratacao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  quantidade_ml integer NOT NULL,
  tipo_liquido public.tipo_liquido DEFAULT 'água',
  horario timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.registro_hidratacao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own hydration records" ON public.registro_hidratacao
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own hydration records" ON public.registro_hidratacao
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own hydration records" ON public.registro_hidratacao
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_registro_hidratacao_user ON public.registro_hidratacao(user_id);
CREATE INDEX idx_registro_hidratacao_date ON public.registro_hidratacao(horario DESC);

-- ===================
-- STORAGE BUCKETS
-- ===================

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'meditation-audio',
  'meditation-audio',
  true,
  52428800,
  ARRAY['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/mp3', 'audio/m4a']
) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'journey-images',
  'journey-images',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- ===================
-- STORAGE POLICIES
-- ===================

CREATE POLICY "Public read access for meditation audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'meditation-audio');

CREATE POLICY "Socios can upload meditation audio"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'meditation-audio' 
  AND public.is_socio()
);

CREATE POLICY "Socios can update meditation audio"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'meditation-audio' 
  AND public.is_socio()
);

CREATE POLICY "Socios can delete meditation audio"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'meditation-audio' 
  AND public.is_socio()
);

CREATE POLICY "Public read access for journey images"
ON storage.objects FOR SELECT
USING (bucket_id = 'journey-images');

CREATE POLICY "Socios can upload journey images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'journey-images' 
  AND public.is_socio()
);

CREATE POLICY "Socios can update journey images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'journey-images' 
  AND public.is_socio()
);

CREATE POLICY "Socios can delete journey images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'journey-images' 
  AND public.is_socio()
);

-- ===================
-- CHECK_FEATURE_ACCESS FUNCTION (Primary)
-- ===================

CREATE OR REPLACE FUNCTION public.check_feature_access(user_uuid uuid, feature_name text)
RETURNS text
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_access_level TEXT;
  v_plan_id UUID;
  v_user_type TEXT;
BEGIN
  SELECT tipo_usuario INTO v_user_type
  FROM usuarios WHERE id = user_uuid;
  
  IF v_user_type = 'socio' THEN
    RETURN 'full';
  END IF;

  SELECT access_level INTO v_access_level
  FROM user_feature_overrides
  WHERE user_id = user_uuid
    AND feature_key = feature_name
    AND (expires_at IS NULL OR expires_at > now());
  
  IF v_access_level IS NOT NULL THEN
    RETURN v_access_level;
  END IF;

  SELECT plano_id INTO v_plan_id
  FROM profiles WHERE user_id = user_uuid;

  IF v_plan_id IS NULL THEN
    BEGIN
      SELECT plano_id INTO v_plan_id
      FROM usuarios WHERE id = user_uuid AND plano_id IS NOT NULL;
    EXCEPTION WHEN OTHERS THEN
      v_plan_id := NULL;
    END;
  END IF;

  IF v_plan_id IS NULL THEN
    SELECT p.id INTO v_plan_id
    FROM planos p
    JOIN usuarios u ON LOWER(TRIM(p.nome_plano)) = LOWER(TRIM(u.plano))
    WHERE u.id = user_uuid
    LIMIT 1;
  END IF;

  IF v_plan_id IS NOT NULL THEN
    SELECT access_level INTO v_access_level
    FROM plan_feature_access
    WHERE plan_id = v_plan_id
      AND feature_key = feature_name;
  END IF;

  RETURN COALESCE(v_access_level, 'none');
END;
$$;

-- ===================
-- CHECK_FEATURE_ACCESS (Legacy signature)
-- ===================

CREATE OR REPLACE FUNCTION public.check_feature_access(p_feature_key text, p_user_id uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_type text;
  v_plan_id uuid;
  v_access_level text;
  v_override_level text;
BEGIN
  SELECT tipo_usuario, plano_id INTO v_user_type, v_plan_id
  FROM usuarios
  WHERE id = p_user_id;

  IF v_user_type = 'socio' THEN
    RETURN 'full';
  END IF;

  SELECT access_level INTO v_override_level
  FROM user_feature_overrides
  WHERE user_id = p_user_id 
    AND feature_key = p_feature_key
    AND (expires_at IS NULL OR expires_at > now());
  
  IF v_override_level IS NOT NULL THEN
    RETURN v_override_level;
  END IF;

  IF v_plan_id IS NULL THEN
    SELECT p.id INTO v_plan_id
    FROM planos p
    JOIN usuarios u ON LOWER(TRIM(p.nome_plano)) = LOWER(TRIM(u.plano))
    WHERE u.id = p_user_id
    LIMIT 1;
  END IF;

  IF v_plan_id IS NULL THEN
    RETURN 'none';
  END IF;

  SELECT access_level INTO v_access_level
  FROM plan_feature_access
  WHERE plan_id = v_plan_id AND feature_key = p_feature_key;

  RETURN COALESCE(v_access_level, 'none');
END;
$$;

-- ===================
-- CHECK_CONTENT_ACCESS
-- ===================

CREATE OR REPLACE FUNCTION public.check_content_access(
  p_user_id uuid, 
  p_content_type text, 
  p_content_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_content_access_level TEXT;
  v_user_feature_access TEXT;
  v_feature_key TEXT;
  v_content_hierarchy JSONB := '{"free": 0, "basic": 1, "premium": 2, "exclusive": 3}'::jsonb;
  v_content_level INT;
  v_max_allowed_level INT;
BEGIN
  v_feature_key := p_content_type || '_premium';
  
  IF p_content_type = 'breathing' THEN
    SELECT COALESCE(access_level, 'free') INTO v_content_access_level
    FROM breathing_techniques WHERE id = p_content_id;
  ELSIF p_content_type = 'meditation' THEN
    SELECT COALESCE(access_level, 'free') INTO v_content_access_level
    FROM meditation_tracks WHERE id = p_content_id;
  ELSIF p_content_type = 'journey' THEN
    SELECT CASE WHEN is_premium THEN 'premium' ELSE 'free' END INTO v_content_access_level
    FROM journeys WHERE id = p_content_id;
  ELSE
    RETURN true;
  END IF;
  
  IF v_content_access_level IS NULL OR v_content_access_level = 'free' THEN
    RETURN true;
  END IF;
  
  v_user_feature_access := public.check_feature_access(
    user_uuid := p_user_id, 
    feature_name := v_feature_key
  );
  
  v_content_level := (v_content_hierarchy ->> v_content_access_level)::int;
  
  IF v_user_feature_access = 'full' THEN
    RETURN true;
  ELSIF v_user_feature_access = 'limited' THEN
    v_max_allowed_level := 1;
    RETURN v_content_level <= v_max_allowed_level;
  ELSE
    RETURN false;
  END IF;
END;
$$;

-- ===================
-- REFRESH_USER_GAMIFICATION
-- ===================

CREATE OR REPLACE FUNCTION public.refresh_user_gamification(p_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  INSERT INTO gamification_user_stats (usuario_id)
  VALUES (p_user_id)
  ON CONFLICT (usuario_id) DO UPDATE SET
    updated_at = now();
END;
$$;