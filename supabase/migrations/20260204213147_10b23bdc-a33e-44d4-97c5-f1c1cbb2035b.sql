-- =============================================
-- STEP 3: Spiritual Guides + Journeys + Emotion Tracking Tables
-- =============================================

-- ===================
-- SPIRITUAL_GUIDES
-- ===================

CREATE TABLE public.spiritual_guides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  approach text NOT NULL,
  avatar_emoji text DEFAULT '🧘'::text,
  system_prompt text NOT NULL,
  personality_traits jsonb DEFAULT '[]'::jsonb,
  topics jsonb DEFAULT '[]'::jsonb,
  suggested_questions jsonb DEFAULT '[]'::jsonb,
  example_messages jsonb DEFAULT '[]'::jsonb,
  welcome_message text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.spiritual_guides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active guides" ON public.spiritual_guides
  FOR SELECT USING (is_active = true);

CREATE POLICY "Socios can manage guides" ON public.spiritual_guides
  FOR ALL USING (is_socio());

CREATE INDEX idx_spiritual_guides_order ON public.spiritual_guides(display_order);
CREATE INDEX idx_spiritual_guides_active ON public.spiritual_guides(is_active) WHERE is_active = true;

CREATE TRIGGER update_spiritual_guides_timestamp
  BEFORE UPDATE ON public.spiritual_guides
  FOR EACH ROW EXECUTE FUNCTION public.update_guide_updated_at();

-- ===================
-- GUIDE_CONVERSATIONS
-- ===================

CREATE TABLE public.guide_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_id uuid NOT NULL REFERENCES public.spiritual_guides(id),
  title text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.guide_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own conversations" ON public.guide_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own conversations" ON public.guide_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own conversations" ON public.guide_conversations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own conversations" ON public.guide_conversations
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_guide_conversations_user ON public.guide_conversations(user_id);
CREATE INDEX idx_guide_conversations_guide ON public.guide_conversations(guide_id);
CREATE INDEX idx_guide_conversations_updated ON public.guide_conversations(updated_at DESC);

CREATE TRIGGER update_guide_conversations_timestamp
  BEFORE UPDATE ON public.guide_conversations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- GUIDE_MESSAGES
-- ===================

CREATE TABLE public.guide_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.guide_conversations(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.guide_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages from own conversations" ON public.guide_messages
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM guide_conversations gc
    WHERE gc.id = guide_messages.conversation_id AND gc.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert messages to own conversations" ON public.guide_messages
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM guide_conversations gc
    WHERE gc.id = guide_messages.conversation_id AND gc.user_id = auth.uid()
  ));

CREATE INDEX idx_guide_messages_conversation ON public.guide_messages(conversation_id);
CREATE INDEX idx_guide_messages_created ON public.guide_messages(created_at);

-- ===================
-- USER_GUIDE_PREFERENCES
-- ===================

CREATE TABLE public.user_guide_preferences (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_guide_id uuid REFERENCES public.spiritual_guides(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.user_guide_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own guide preferences" ON public.user_guide_preferences
  FOR ALL USING (auth.uid() = user_id);

CREATE TRIGGER update_user_guide_preferences_timestamp
  BEFORE UPDATE ON public.user_guide_preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- JOURNEYS
-- ===================

CREATE TABLE public.journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text NOT NULL,
  explanation text,
  icon text DEFAULT '🧭'::text,
  theme_color text DEFAULT 'primary'::text,
  cover_image_url text,
  duration_days integer NOT NULL DEFAULT 7,
  difficulty text DEFAULT 'iniciante'::text,
  category text DEFAULT 'geral'::text,
  benefits jsonb DEFAULT '[]'::jsonb,
  is_premium boolean DEFAULT false,
  is_active boolean DEFAULT true,
  display_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active journeys" ON public.journeys
  FOR SELECT USING (is_active = true);

CREATE POLICY "Socios can manage journeys" ON public.journeys
  FOR ALL USING (is_socio());

CREATE INDEX idx_journeys_active ON public.journeys(is_active) WHERE is_active = true;
CREATE INDEX idx_journeys_order ON public.journeys(display_order);
CREATE INDEX idx_journeys_difficulty ON public.journeys(difficulty);
CREATE INDEX idx_journeys_category ON public.journeys(category);

CREATE TRIGGER update_journeys_timestamp
  BEFORE UPDATE ON public.journeys
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===================
-- JOURNEY_DAYS
-- ===================

CREATE TABLE public.journey_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  title text NOT NULL,
  teaching_text text NOT NULL,
  teaching_author text,
  reflection_prompt text,
  challenge_title text,
  challenge_description text,
  activity_type text DEFAULT 'mental'::text,
  activity_description text,
  bonus_tip text,
  image_url text,
  suggested_breathing_id uuid REFERENCES public.breathing_techniques(id),
  suggested_meditation_id uuid REFERENCES public.meditation_tracks(id),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE (journey_id, day_number)
);

ALTER TABLE public.journey_days ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view journey days" ON public.journey_days
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM journeys j
    WHERE j.id = journey_days.journey_id AND j.is_active = true
  ));

CREATE POLICY "Socios can manage journey days" ON public.journey_days
  FOR ALL USING (is_socio());

CREATE INDEX idx_journey_days_journey ON public.journey_days(journey_id);
CREATE INDEX idx_journey_days_number ON public.journey_days(journey_id, day_number);

-- ===================
-- USER_JOURNEYS
-- ===================

CREATE TABLE public.user_journeys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_id uuid NOT NULL REFERENCES public.journeys(id),
  current_day integer NOT NULL DEFAULT 1,
  streak_count integer DEFAULT 0,
  is_completed boolean DEFAULT false,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  last_activity_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_id, journey_id)
);

ALTER TABLE public.user_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own journeys" ON public.user_journeys
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journeys" ON public.user_journeys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own journeys" ON public.user_journeys
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journeys" ON public.user_journeys
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_user_journeys_user ON public.user_journeys(user_id);
CREATE INDEX idx_user_journeys_active ON public.user_journeys(user_id, is_completed) WHERE is_completed = false;

-- ===================
-- JOURNEY_DAY_COMPLETIONS
-- ===================

CREATE TABLE public.journey_day_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_journey_id uuid NOT NULL REFERENCES public.user_journeys(id) ON DELETE CASCADE,
  day_number integer NOT NULL,
  teaching_read boolean DEFAULT false,
  practice_done boolean DEFAULT false,
  challenge_done boolean DEFAULT false,
  reflection_note text,
  mood_before text,
  mood_after text,
  completed_at timestamp with time zone DEFAULT now(),
  UNIQUE (user_journey_id, day_number)
);

ALTER TABLE public.journey_day_completions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own completions" ON public.journey_day_completions
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM user_journeys uj
    WHERE uj.id = journey_day_completions.user_journey_id AND uj.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert their own completions" ON public.journey_day_completions
  FOR INSERT WITH CHECK (EXISTS (
    SELECT 1 FROM user_journeys uj
    WHERE uj.id = journey_day_completions.user_journey_id AND uj.user_id = auth.uid()
  ));

CREATE POLICY "Users can update their own completions" ON public.journey_day_completions
  FOR UPDATE USING (EXISTS (
    SELECT 1 FROM user_journeys uj
    WHERE uj.id = journey_day_completions.user_journey_id AND uj.user_id = auth.uid()
  ));

CREATE INDEX idx_journey_day_completions_journey ON public.journey_day_completions(user_journey_id);

-- ===================
-- USER_FAVORITE_JOURNEYS
-- ===================

CREATE TABLE public.user_favorite_journeys (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  journey_id uuid NOT NULL REFERENCES public.journeys(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT now(),
  PRIMARY KEY (user_id, journey_id)
);

ALTER TABLE public.user_favorite_journeys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their favorite journeys" ON public.user_favorite_journeys
  FOR ALL USING (auth.uid() = user_id);