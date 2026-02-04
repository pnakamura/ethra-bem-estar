-- =============================================
-- STEP 2: Create Security Functions + RLS Policies + Remaining Tables
-- =============================================

-- ===================
-- SECURITY FUNCTIONS (depend on user_roles and usuarios)
-- ===================

-- has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- is_admin function
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'::app_role
  )
$$;

-- is_socio function
CREATE OR REPLACE FUNCTION public.is_socio()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.usuarios
    WHERE id = auth.uid()
      AND tipo_usuario = 'socio'::tipo_usuario
  )
$$;

-- get_current_user_role function
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS tipo_usuario
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT tipo_usuario
  FROM public.usuarios
  WHERE id = auth.uid()
$$;

-- can_manage_dependents function
CREATE OR REPLACE FUNCTION public.can_manage_dependents(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.usuarios
    WHERE id = auth.uid()
      AND tipo_usuario IN ('socio', 'gestor')
  )
$$;

-- can_gestor_access_user function
CREATE OR REPLACE FUNCTION public.can_gestor_access_user(_gestor_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.usuarios u
    WHERE u.id = _user_id
      AND u.gestor_id = _gestor_id
  )
$$;

-- ===================
-- ADD RLS POLICIES FOR USUARIOS
-- ===================

CREATE POLICY "Users can view own data" ON public.usuarios
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Socios can view all users" ON public.usuarios
  FOR SELECT USING (is_socio());

CREATE POLICY "Users can update own data" ON public.usuarios
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Socios can manage all users" ON public.usuarios
  FOR ALL USING (is_socio());

-- ===================
-- ADD RLS POLICIES FOR ADMIN_AUDIT_LOG
-- ===================

CREATE POLICY "Admins can manage audit logs" ON public.admin_audit_log
  FOR ALL USING (is_admin());

CREATE POLICY "Users can view audit logs related to them" ON public.admin_audit_log
  FOR SELECT USING (auth.uid() = target_user_id);

-- ===================
-- ADD ADMIN POLICIES FOR OTHER TABLES
-- ===================

CREATE POLICY "Admins can manage plans" ON public.planos
  FOR ALL USING (is_admin());

CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (is_admin());

CREATE POLICY "Socios can manage features" ON public.feature_access_levels
  FOR ALL USING (is_socio());

CREATE POLICY "Socios can manage plan features" ON public.plan_feature_access
  FOR ALL USING (is_socio());

CREATE POLICY "Socios can manage overrides" ON public.user_feature_overrides
  FOR ALL USING (is_socio());

-- ===================
-- BREATHING_TECHNIQUES (from 02_breathing_meditation.sql)
-- ===================

CREATE TABLE public.breathing_techniques (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emotion_id text NOT NULL,
  label text NOT NULL,
  description text NOT NULL,
  explanation text,
  icon text DEFAULT '🌬️'::text,
  color_class text DEFAULT 'text-primary'::text,
  bg_class text DEFAULT 'bg-primary/10'::text,
  pattern_name text NOT NULL,
  pattern_description text,
  inhale_ms integer NOT NULL DEFAULT 4000,
  hold_in_ms integer NOT NULL DEFAULT 0,
  exhale_ms integer NOT NULL DEFAULT 4000,
  hold_out_ms integer NOT NULL DEFAULT 0,
  cycles integer NOT NULL DEFAULT 4,
  is_special_technique boolean DEFAULT false,
  special_config jsonb DEFAULT '{}'::jsonb,
  background_audio_url text,
  access_level text DEFAULT 'free'::text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  deleted_at timestamp with time zone
);

ALTER TABLE public.breathing_techniques ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active breathing techniques" ON public.breathing_techniques
  FOR SELECT USING ((is_active = true) AND (deleted_at IS NULL));

CREATE POLICY "Socios can manage breathing techniques" ON public.breathing_techniques
  FOR ALL USING (is_socio());

CREATE INDEX idx_breathing_techniques_active ON public.breathing_techniques(is_active) WHERE is_active = true;
CREATE INDEX idx_breathing_techniques_order ON public.breathing_techniques(display_order);
CREATE INDEX idx_breathing_techniques_access ON public.breathing_techniques(access_level);

CREATE TRIGGER update_breathing_techniques_timestamp
  BEFORE UPDATE ON public.breathing_techniques
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- MEDITATION_CATEGORIES
-- ===================

CREATE TABLE public.meditation_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  icon text DEFAULT '🧘'::text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.meditation_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active meditation categories" ON public.meditation_categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Socios can manage meditation categories" ON public.meditation_categories
  FOR ALL USING (is_socio());

-- ===================
-- MEDITATION_TRACKS
-- ===================

CREATE TABLE public.meditation_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  short_description text,
  explanation text,
  category_id uuid REFERENCES public.meditation_categories(id),
  duration_display text NOT NULL,
  duration_ms integer NOT NULL,
  background_audio_url text,
  narration_audio_url text,
  thumbnail_url text,
  has_background_music boolean DEFAULT false,
  has_narration boolean DEFAULT false,
  access_level text DEFAULT 'free'::text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  created_by uuid REFERENCES auth.users(id),
  deleted_at timestamp with time zone
);

ALTER TABLE public.meditation_tracks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active meditation tracks" ON public.meditation_tracks
  FOR SELECT USING ((is_active = true) AND (deleted_at IS NULL));

CREATE POLICY "Socios can manage meditation tracks" ON public.meditation_tracks
  FOR ALL USING (is_socio());

CREATE INDEX idx_meditation_tracks_category ON public.meditation_tracks(category_id);
CREATE INDEX idx_meditation_tracks_active ON public.meditation_tracks(is_active) WHERE is_active = true;
CREATE INDEX idx_meditation_tracks_access ON public.meditation_tracks(access_level);

CREATE TRIGGER update_meditation_tracks_timestamp
  BEFORE UPDATE ON public.meditation_tracks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- BREATHING_SESSIONS
-- ===================

CREATE TABLE public.breathing_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  technique_id uuid REFERENCES public.breathing_techniques(id),
  technique_name text NOT NULL,
  cycles_completed integer NOT NULL DEFAULT 0,
  duration_ms integer NOT NULL DEFAULT 0,
  emotion_entry_id uuid,
  completed_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.breathing_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own breathing sessions" ON public.breathing_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own breathing sessions" ON public.breathing_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own breathing sessions" ON public.breathing_sessions
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_breathing_sessions_user ON public.breathing_sessions(user_id);
CREATE INDEX idx_breathing_sessions_completed ON public.breathing_sessions(completed_at DESC);

-- ===================
-- USER_FAVORITE_BREATHINGS
-- ===================

CREATE TABLE public.user_favorite_breathings (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  breathing_id uuid NOT NULL REFERENCES public.breathing_techniques(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, breathing_id)
);

ALTER TABLE public.user_favorite_breathings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their favorite breathings" ON public.user_favorite_breathings
  FOR ALL USING (auth.uid() = user_id);

-- ===================
-- USER_FAVORITE_MEDITATIONS
-- ===================

CREATE TABLE public.user_favorite_meditations (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meditation_id uuid NOT NULL REFERENCES public.meditation_tracks(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, meditation_id)
);

ALTER TABLE public.user_favorite_meditations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their favorite meditations" ON public.user_favorite_meditations
  FOR ALL USING (auth.uid() = user_id);