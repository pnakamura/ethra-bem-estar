-- =============================================
-- MÓDULO: JORNADAS INTERIORES
-- Tabelas 100% isoladas - sem impacto em tabelas existentes
-- =============================================

-- 1. JOURNEYS - Catálogo de jornadas disponíveis
CREATE TABLE public.journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    icon TEXT DEFAULT '🧭',
    theme_color TEXT DEFAULT 'primary',
    cover_image_url TEXT,
    duration_days INTEGER NOT NULL DEFAULT 7,
    difficulty TEXT DEFAULT 'iniciante' CHECK (difficulty IN ('iniciante', 'intermediário', 'avançado')),
    category TEXT DEFAULT 'geral',
    benefits JSONB DEFAULT '[]'::jsonb,
    is_premium BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. JOURNEY_DAYS - Conteúdo de cada dia
CREATE TABLE public.journey_days (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    journey_id UUID NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    teaching_text TEXT NOT NULL,
    teaching_author TEXT,
    reflection_prompt TEXT,
    challenge_title TEXT,
    challenge_description TEXT,
    bonus_tip TEXT,
    suggested_breathing_id UUID REFERENCES public.breathing_techniques(id) ON DELETE SET NULL,
    suggested_meditation_id UUID REFERENCES public.meditation_tracks(id) ON DELETE SET NULL,
    activity_type TEXT DEFAULT 'mental' CHECK (activity_type IN ('mental', 'physical', 'social', 'creative', 'spiritual')),
    activity_description TEXT,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(journey_id, day_number)
);

-- 3. USER_JOURNEYS - Inscrição do usuário em jornadas
CREATE TABLE public.user_journeys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    journey_id UUID NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
    current_day INTEGER DEFAULT 1,
    started_at TIMESTAMPTZ DEFAULT now(),
    completed_at TIMESTAMPTZ,
    last_activity_at TIMESTAMPTZ DEFAULT now(),
    streak_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, journey_id)
);

-- 4. JOURNEY_DAY_COMPLETIONS - Progresso diário
CREATE TABLE public.journey_day_completions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_journey_id UUID NOT NULL REFERENCES public.user_journeys(id) ON DELETE CASCADE,
    day_number INTEGER NOT NULL,
    teaching_read BOOLEAN DEFAULT false,
    practice_done BOOLEAN DEFAULT false,
    challenge_done BOOLEAN DEFAULT false,
    reflection_note TEXT,
    mood_before TEXT,
    mood_after TEXT,
    completed_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_journey_id, day_number)
);

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================
CREATE INDEX idx_journeys_active ON public.journeys(is_active) WHERE is_active = true;
CREATE INDEX idx_journey_days_journey ON public.journey_days(journey_id);
CREATE INDEX idx_user_journeys_user ON public.user_journeys(user_id);
CREATE INDEX idx_user_journeys_active ON public.user_journeys(user_id, is_active) WHERE is_active = true;
CREATE INDEX idx_journey_completions_user_journey ON public.journey_day_completions(user_journey_id);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

-- Journeys: qualquer usuário autenticado pode ver jornadas ativas
ALTER TABLE public.journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active journeys"
ON public.journeys FOR SELECT
USING (is_active = true);

CREATE POLICY "Socios can manage journeys"
ON public.journeys FOR ALL
USING (is_socio());

-- Journey Days: qualquer usuário autenticado pode ver conteúdo
ALTER TABLE public.journey_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view journey days"
ON public.journey_days FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.journeys j 
    WHERE j.id = journey_id AND j.is_active = true
));

CREATE POLICY "Socios can manage journey days"
ON public.journey_days FOR ALL
USING (is_socio());

-- User Journeys: usuário só vê/edita suas próprias inscrições
ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own journeys"
ON public.user_journeys FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own journeys"
ON public.user_journeys FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journeys"
ON public.user_journeys FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journeys"
ON public.user_journeys FOR DELETE
USING (auth.uid() = user_id);

-- Journey Day Completions: usuário só vê/edita seus próprios registros
ALTER TABLE public.journey_day_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own completions"
ON public.journey_day_completions FOR SELECT
USING (EXISTS (
    SELECT 1 FROM public.user_journeys uj 
    WHERE uj.id = user_journey_id AND uj.user_id = auth.uid()
));

CREATE POLICY "Users can insert their own completions"
ON public.journey_day_completions FOR INSERT
WITH CHECK (EXISTS (
    SELECT 1 FROM public.user_journeys uj 
    WHERE uj.id = user_journey_id AND uj.user_id = auth.uid()
));

CREATE POLICY "Users can update their own completions"
ON public.journey_day_completions FOR UPDATE
USING (EXISTS (
    SELECT 1 FROM public.user_journeys uj 
    WHERE uj.id = user_journey_id AND uj.user_id = auth.uid()
));

-- =============================================
-- TRIGGER PARA UPDATED_AT
-- =============================================
CREATE TRIGGER update_journeys_updated_at
    BEFORE UPDATE ON public.journeys
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();