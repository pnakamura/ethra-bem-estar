-- =============================================
-- STEP 4: Emotion Tracking + Nutrition + Settings Tables
-- =============================================

-- ===================
-- EMOTION_ENTRIES
-- ===================

CREATE TABLE public.emotion_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  selected_emotions jsonb NOT NULL DEFAULT '[]'::jsonb,
  detected_dyads jsonb DEFAULT '[]'::jsonb,
  recommended_treatment jsonb,
  free_text text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.emotion_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own emotion entries" ON public.emotion_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emotion entries" ON public.emotion_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emotion entries" ON public.emotion_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emotion entries" ON public.emotion_entries
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_emotion_entries_user ON public.emotion_entries(user_id);
CREATE INDEX idx_emotion_entries_created ON public.emotion_entries(created_at DESC);

-- Add foreign key to breathing_sessions after emotion_entries exists
ALTER TABLE public.breathing_sessions 
  ADD CONSTRAINT breathing_sessions_emotion_entry_id_fkey 
  FOREIGN KEY (emotion_entry_id) REFERENCES public.emotion_entries(id);

-- ===================
-- JOURNAL_ENTRIES
-- ===================

CREATE TABLE public.journal_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  word_count integer NOT NULL DEFAULT 0,
  detected_emotions jsonb DEFAULT '[]'::jsonb,
  emotion_entry_id uuid REFERENCES public.emotion_entries(id),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own journal entries" ON public.journal_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journal entries" ON public.journal_entries
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journal entries" ON public.journal_entries
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journal entries" ON public.journal_entries
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_journal_entries_user ON public.journal_entries(user_id);
CREATE INDEX idx_journal_entries_created ON public.journal_entries(created_at DESC);

CREATE TRIGGER update_journal_entries_timestamp
  BEFORE UPDATE ON public.journal_entries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- CATEGORIAS_REFEICAO
-- ===================

CREATE TABLE public.categorias_refeicao (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome varchar NOT NULL,
  descricao text,
  ordem integer
);

ALTER TABLE public.categorias_refeicao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view meal categories" ON public.categorias_refeicao
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage meal categories" ON public.categorias_refeicao
  FOR ALL USING (is_admin());

-- ===================
-- INFORMACOES_NUTRICIONAIS
-- ===================

CREATE TABLE public.informacoes_nutricionais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES public.usuarios(id),
  categoria_refeicao_id uuid REFERENCES public.categorias_refeicao(id),
  descricao_ia text,
  calorias numeric,
  proteinas numeric,
  carboidratos numeric,
  gorduras numeric,
  dados_raw_ia jsonb,
  dados_n8n jsonb,
  data_registro timestamp with time zone DEFAULT now(),
  deletado_em timestamp with time zone
);

ALTER TABLE public.informacoes_nutricionais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own nutrition data" ON public.informacoes_nutricionais
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can insert their own nutrition data" ON public.informacoes_nutricionais
  FOR INSERT WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Users can update their own nutrition data" ON public.informacoes_nutricionais
  FOR UPDATE USING (auth.uid() = usuario_id);

CREATE POLICY "Users can delete their own nutrition data" ON public.informacoes_nutricionais
  FOR DELETE USING (auth.uid() = usuario_id);

CREATE INDEX idx_informacoes_nutricionais_user ON public.informacoes_nutricionais(usuario_id);
CREATE INDEX idx_informacoes_nutricionais_date ON public.informacoes_nutricionais(data_registro DESC);

-- ===================
-- EMOTION_NUTRITION_CONTEXT
-- ===================

CREATE TABLE public.emotion_nutrition_context (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nutrition_entry_id uuid REFERENCES public.informacoes_nutricionais(id),
  mood_before text NOT NULL,
  hunger_type text NOT NULL DEFAULT 'unknown'::text,
  energy_after text,
  meal_category text,
  mindful_eating_notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.emotion_nutrition_context ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own emotion nutrition context" ON public.emotion_nutrition_context
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own emotion nutrition context" ON public.emotion_nutrition_context
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own emotion nutrition context" ON public.emotion_nutrition_context
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own emotion nutrition context" ON public.emotion_nutrition_context
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_emotion_nutrition_context_user ON public.emotion_nutrition_context(user_id);

-- ===================
-- USER_ACCESSIBILITY_SETTINGS
-- ===================

CREATE TABLE public.user_accessibility_settings (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  font_scale text NOT NULL DEFAULT 'normal',
  high_contrast boolean NOT NULL DEFAULT false,
  reduce_motion boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.user_accessibility_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own accessibility settings" ON public.user_accessibility_settings
  FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER update_user_accessibility_settings_timestamp
  BEFORE UPDATE ON public.user_accessibility_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- GAMIFICATION_USER_STATS
-- ===================

CREATE TABLE public.gamification_user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  nivel integer DEFAULT 1,
  total_pontos integer DEFAULT 0,
  sequencia_atual integer DEFAULT 0,
  maior_sequencia integer DEFAULT 0,
  total_sessoes_respiracao integer DEFAULT 0,
  total_minutos_meditacao integer DEFAULT 0,
  total_checkins_emocao integer DEFAULT 0,
  total_entradas_diario integer DEFAULT 0,
  conquistas_desbloqueadas jsonb DEFAULT '[]'::jsonb,
  ultima_atividade timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.gamification_user_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own gamification stats" ON public.gamification_user_stats
  FOR SELECT USING (auth.uid() = usuario_id);

CREATE POLICY "Users can manage their own gamification stats" ON public.gamification_user_stats
  FOR ALL USING (auth.uid() = usuario_id);

CREATE UNIQUE INDEX idx_gamification_user_stats_user ON public.gamification_user_stats(usuario_id);

-- ===================
-- ONBOARDING_PROGRESS
-- ===================

CREATE TABLE public.onboarding_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_steps jsonb DEFAULT '[]'::jsonb,
  current_step integer DEFAULT 0,
  experience_level text,
  selected_goals jsonb DEFAULT '[]'::jsonb,
  preferred_time text,
  is_completed boolean DEFAULT false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.onboarding_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own onboarding" ON public.onboarding_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE UNIQUE INDEX idx_onboarding_progress_user ON public.onboarding_progress(user_id);