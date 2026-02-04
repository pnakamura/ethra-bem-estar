-- =============================================
-- ETHRA Database: STEP 1 - Create Tables Only (no RLS policies yet)
-- =============================================

-- ===================
-- PLANOS (Plans)
-- ===================

CREATE TABLE public.planos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome_plano text NOT NULL,
  descricao text,
  valor numeric NOT NULL,
  periodo text DEFAULT '/mês'::text,
  features text,
  popular boolean DEFAULT false,
  action text DEFAULT 'Comprar agora'::text,
  checkout_plano_id text,
  checkout_signature_link text,
  eh_plano_gestor boolean DEFAULT false,
  max_dependentes integer,
  ativo boolean DEFAULT true,
  criado_em timestamp with time zone DEFAULT now(),
  deletado_em timestamp with time zone
);

ALTER TABLE public.planos ENABLE ROW LEVEL SECURITY;

-- Simple policy without function dependency
CREATE POLICY "Anyone can view active plans" ON public.planos
  FOR SELECT USING ((ativo = true) AND (deletado_em IS NULL));

-- ===================
-- USUARIOS (Main users table)
-- ===================

CREATE TABLE public.usuarios (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  nome_completo text,
  celular text,
  tipo_usuario public.tipo_usuario DEFAULT 'cliente',
  status public.tipo_status_assinatura DEFAULT 'ativa',
  plano text,
  plano_id uuid REFERENCES public.planos(id),
  peso_atual_kg numeric,
  gestor_id uuid,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone DEFAULT now(),
  deletado_em timestamp with time zone
);

ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_usuarios_tipo ON public.usuarios(tipo_usuario);
CREATE INDEX idx_usuarios_email ON public.usuarios(email);

-- ===================
-- PROFILES
-- ===================

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  role text DEFAULT 'user'::text,
  plano_id uuid REFERENCES public.planos(id),
  peso_atual_kg numeric,
  whatsapp_id varchar,
  avatar_url text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE UNIQUE INDEX idx_profiles_user_id ON public.profiles(user_id);

-- Simple profile policy
CREATE POLICY "Users can manage own profile" ON public.profiles
  FOR ALL USING (auth.uid() = user_id);

-- ===================
-- USER_ROLES
-- ===================

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Simple policy - users can view their own roles
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- ===================
-- FEATURE_ACCESS_LEVELS
-- ===================

CREATE TABLE public.feature_access_levels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  feature_key text NOT NULL UNIQUE,
  feature_name text NOT NULL,
  feature_description text,
  category text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.feature_access_levels ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active features" ON public.feature_access_levels
  FOR SELECT USING (is_active = true);

-- ===================
-- PLAN_FEATURE_ACCESS
-- ===================

CREATE TABLE public.plan_feature_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid REFERENCES public.planos(id),
  feature_key text REFERENCES public.feature_access_levels(feature_key),
  access_level text DEFAULT 'full'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.plan_feature_access ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view plan features" ON public.plan_feature_access
  FOR SELECT USING (true);

-- ===================
-- USER_FEATURE_OVERRIDES
-- ===================

CREATE TABLE public.user_feature_overrides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  feature_key text REFERENCES public.feature_access_levels(feature_key),
  access_level text NOT NULL,
  expires_at timestamp with time zone,
  reason text,
  granted_by uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.user_feature_overrides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own overrides" ON public.user_feature_overrides
  FOR SELECT USING (auth.uid() = user_id);

-- ===================
-- RATE_LIMITS
-- ===================

CREATE TABLE public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  action text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role only" ON public.rate_limits
  FOR ALL USING (auth.role() = 'service_role'::text);

CREATE INDEX idx_rate_limits_user_action ON public.rate_limits(user_id, action, created_at);

-- ===================
-- ADMIN_AUDIT_LOG
-- ===================

CREATE TABLE public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id),
  admin_user_id uuid,
  action text NOT NULL,
  table_name text,
  record_id uuid,
  target_user_id uuid,
  target_email text,
  old_data jsonb,
  new_data jsonb,
  details jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_audit_log_admin ON public.admin_audit_log(admin_id);
CREATE INDEX idx_audit_log_target ON public.admin_audit_log(target_user_id);
CREATE INDEX idx_audit_log_created ON public.admin_audit_log(created_at DESC);

-- ===================
-- DEPENDENTES
-- ===================

CREATE TABLE public.dependentes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES public.usuarios(id) ON DELETE CASCADE,
  nome_completo text NOT NULL,
  email text NOT NULL,
  celular text,
  criado_em timestamp with time zone DEFAULT now(),
  atualizado_em timestamp with time zone,
  deletado_em timestamp with time zone
);

ALTER TABLE public.dependentes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their dependents" ON public.dependentes
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can manage their dependents" ON public.dependentes
  FOR ALL USING (auth.uid() = usuario_id);

-- ===================
-- VINCULOS_USUARIOS
-- ===================

CREATE TABLE public.vinculos_usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_principal_id uuid NOT NULL REFERENCES public.usuarios(id),
  usuario_id uuid NOT NULL REFERENCES public.usuarios(id),
  ativo boolean DEFAULT true,
  criado_em timestamp with time zone DEFAULT now(),
  UNIQUE (usuario_principal_id, usuario_id)
);

ALTER TABLE public.vinculos_usuarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their links" ON public.vinculos_usuarios
  FOR ALL USING (auth.uid() = usuario_principal_id);