-- Tabela: user_favorite_breathings
CREATE TABLE public.user_favorite_breathings (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  breathing_id UUID NOT NULL REFERENCES public.breathing_techniques(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, breathing_id)
);

-- Tabela: user_favorite_meditations
CREATE TABLE public.user_favorite_meditations (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meditation_id UUID NOT NULL REFERENCES public.meditation_tracks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, meditation_id)
);

-- Tabela: user_favorite_journeys
CREATE TABLE public.user_favorite_journeys (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_id UUID NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, journey_id)
);

-- Habilitar RLS
ALTER TABLE public.user_favorite_breathings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorite_meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorite_journeys ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para user_favorite_breathings
CREATE POLICY "Users can view their own favorite breathings"
ON public.user_favorite_breathings
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite breathings"
ON public.user_favorite_breathings
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorite breathings"
ON public.user_favorite_breathings
FOR DELETE
USING (auth.uid() = user_id);

-- Políticas RLS para user_favorite_meditations
CREATE POLICY "Users can view their own favorite meditations"
ON public.user_favorite_meditations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite meditations"
ON public.user_favorite_meditations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorite meditations"
ON public.user_favorite_meditations
FOR DELETE
USING (auth.uid() = user_id);

-- Políticas RLS para user_favorite_journeys
CREATE POLICY "Users can view their own favorite journeys"
ON public.user_favorite_journeys
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can add their own favorite journeys"
ON public.user_favorite_journeys
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own favorite journeys"
ON public.user_favorite_journeys
FOR DELETE
USING (auth.uid() = user_id);

-- Índices para melhor performance
CREATE INDEX idx_favorite_breathings_user ON public.user_favorite_breathings(user_id);
CREATE INDEX idx_favorite_meditations_user ON public.user_favorite_meditations(user_id);
CREATE INDEX idx_favorite_journeys_user ON public.user_favorite_journeys(user_id);