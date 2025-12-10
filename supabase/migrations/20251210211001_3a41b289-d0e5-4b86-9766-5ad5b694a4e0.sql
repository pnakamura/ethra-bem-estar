-- =============================================
-- MÓDULO ADMIN: Respirações e Meditações
-- Apenas usuários com tipo_usuario = 'socio' podem gerenciar
-- =============================================

-- 1. Tabela de Técnicas de Respiração
CREATE TABLE public.breathing_techniques (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    emotion_id TEXT NOT NULL UNIQUE,
    label TEXT NOT NULL,
    description TEXT NOT NULL,
    explanation TEXT,
    icon TEXT DEFAULT '🌬️',
    color_class TEXT DEFAULT 'text-primary',
    bg_class TEXT DEFAULT 'bg-primary/10',
    inhale_ms INTEGER NOT NULL DEFAULT 4000,
    hold_in_ms INTEGER NOT NULL DEFAULT 0,
    exhale_ms INTEGER NOT NULL DEFAULT 4000,
    hold_out_ms INTEGER NOT NULL DEFAULT 0,
    pattern_name TEXT NOT NULL,
    pattern_description TEXT,
    cycles INTEGER NOT NULL DEFAULT 4,
    is_special_technique BOOLEAN DEFAULT false,
    special_config JSONB DEFAULT '{}',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    deleted_at TIMESTAMPTZ
);

-- 2. Tabela de Categorias de Meditação
CREATE TABLE public.meditation_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT DEFAULT '🧘',
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabela de Meditações
CREATE TABLE public.meditation_tracks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES public.meditation_categories(id),
    duration_display TEXT NOT NULL,
    duration_ms INTEGER NOT NULL,
    background_audio_url TEXT,
    narration_audio_url TEXT,
    thumbnail_url TEXT,
    has_background_music BOOLEAN DEFAULT false,
    has_narration BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    deleted_at TIMESTAMPTZ
);

-- 4. Habilitar RLS
ALTER TABLE public.breathing_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meditation_tracks ENABLE ROW LEVEL SECURITY;

-- 5. Políticas RLS para breathing_techniques
CREATE POLICY "Anyone can view active breathing techniques"
ON public.breathing_techniques FOR SELECT
USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Socios can manage breathing techniques"
ON public.breathing_techniques FOR ALL
USING (is_socio());

-- 6. Políticas RLS para meditation_categories
CREATE POLICY "Anyone can view active meditation categories"
ON public.meditation_categories FOR SELECT
USING (is_active = true);

CREATE POLICY "Socios can manage meditation categories"
ON public.meditation_categories FOR ALL
USING (is_socio());

-- 7. Políticas RLS para meditation_tracks
CREATE POLICY "Anyone can view active meditation tracks"
ON public.meditation_tracks FOR SELECT
USING (is_active = true AND deleted_at IS NULL);

CREATE POLICY "Socios can manage meditation tracks"
ON public.meditation_tracks FOR ALL
USING (is_socio());

-- 8. Trigger para updated_at
CREATE TRIGGER update_breathing_techniques_updated_at
BEFORE UPDATE ON public.breathing_techniques
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_meditation_tracks_updated_at
BEFORE UPDATE ON public.meditation_tracks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- 9. Criar bucket para áudios de meditação
INSERT INTO storage.buckets (id, name, public)
VALUES ('meditation-audio', 'meditation-audio', true)
ON CONFLICT (id) DO NOTHING;

-- 10. Políticas de storage para meditation-audio
CREATE POLICY "Anyone can view meditation audio"
ON storage.objects FOR SELECT
USING (bucket_id = 'meditation-audio');

CREATE POLICY "Socios can upload meditation audio"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'meditation-audio' AND is_socio());

CREATE POLICY "Socios can update meditation audio"
ON storage.objects FOR UPDATE
USING (bucket_id = 'meditation-audio' AND is_socio());

CREATE POLICY "Socios can delete meditation audio"
ON storage.objects FOR DELETE
USING (bucket_id = 'meditation-audio' AND is_socio());

-- 11. Seed: Categorias de meditação iniciais
INSERT INTO public.meditation_categories (name, description, icon, display_order) VALUES
('Relaxamento', 'Meditações para relaxar e acalmar a mente', '😌', 1),
('Foco', 'Meditações para melhorar concentração', '🎯', 2),
('Sono', 'Meditações para dormir melhor', '😴', 3),
('Natureza', 'Sons da natureza para meditação', '🌿', 4);

-- 12. Seed: Técnicas de respiração existentes
INSERT INTO public.breathing_techniques (emotion_id, label, description, explanation, icon, color_class, bg_class, inhale_ms, hold_in_ms, exhale_ms, hold_out_ms, pattern_name, pattern_description, cycles, is_special_technique, special_config, display_order) VALUES
('anxious', 'Ansioso', 'Estou me sentindo ansioso ou preocupado', 'A técnica 4-7-8 ativa o sistema nervoso parassimpático, reduzindo a frequência cardíaca e promovendo relaxamento profundo.', '😰', 'text-primary', 'bg-primary/10', 4000, 7000, 8000, 0, 'Respiração 4-7-8', 'Inspire por 4s, segure por 7s, expire por 8s', 4, false, '{}', 1),
('angry', 'Estressado / Com Raiva', 'Preciso me acalmar e encontrar equilíbrio', 'A Respiração Quadrada equilibra o sistema nervoso, reduzindo cortisol e promovendo clareza mental através de tempos iguais.', '😤', 'text-destructive', 'bg-destructive/10', 4000, 4000, 4000, 4000, 'Respiração Quadrada', 'Inspire 4s, segure 4s, expire 4s, segure 4s', 4, false, '{}', 2),
('tired', 'Cansado', 'Preciso de mais energia e disposição', 'Respirações curtas e rápidas aumentam a oxigenação cerebral e estimulam o sistema nervoso simpático de forma controlada.', '😴', 'text-orange-500', 'bg-orange-500/10', 2000, 0, 2000, 0, 'Respiração Energizante', 'Inspire rápido por 2s, expire rápido por 2s', 6, false, '{}', 3),
('panic', 'Pânico', 'Estou tendo uma crise de ansiedade ou pânico', 'O Suspiro Fisiológico é a forma mais rápida de acalmar o sistema nervoso, usada naturalmente pelo corpo durante o sono.', '😱', 'text-red-600', 'bg-red-600/10', 5000, 0, 8000, 0, 'Suspiro Fisiológico', 'Dupla inspiração seguida de expiração longa', 3, true, '{"type": "physiological_sigh", "inhale1_ms": 2000, "pause_ms": 1000, "inhale2_ms": 2000}', 4),
('wim_hof', 'Wim Hof', 'Respiração avançada para energia e foco', 'Método que combina hiperventilação controlada com retenção, aumentando a tolerância ao estresse e fortalecendo o sistema imunológico.', '❄️', 'text-blue-500', 'bg-blue-500/10', 2000, 0, 2000, 0, 'Método Wim Hof', '30 respirações rápidas, depois retenção', 30, true, '{"type": "wim_hof", "rounds": 3, "retention_after": true}', 5),
('alternate', 'Narina Alternada', 'Equilibrar os hemisférios cerebrais', 'Técnica yogue que equilibra os canais de energia (nadis) e harmoniza os hemisférios cerebrais, promovendo clareza e calma.', '👃', 'text-purple-500', 'bg-purple-500/10', 4000, 4000, 4000, 0, 'Nadi Shodhana', 'Alterne as narinas a cada ciclo', 6, true, '{"type": "alternate_nostril", "instructions": ["Feche narina direita, inspire pela esquerda", "Feche ambas, segure", "Feche esquerda, expire pela direita", "Inspire pela direita", "Feche ambas, segure", "Expire pela esquerda"]}', 6),
('coherent', 'Coerência Cardíaca', 'Sincronizar respiração e batimentos', 'Respirar a 6 ciclos por minuto sincroniza o ritmo cardíaco com a respiração, otimizando a variabilidade da frequência cardíaca.', '💚', 'text-green-500', 'bg-green-500/10', 5000, 0, 5000, 0, 'Respiração Coerente', 'Inspire 5s, expire 5s (6 ciclos/min)', 6, false, '{}', 7);

-- 13. Seed: Meditações iniciais
INSERT INTO public.meditation_tracks (title, description, category_id, duration_display, duration_ms, has_background_music, has_narration, display_order) VALUES
('5 Minutos de Calma', 'Uma meditação guiada rápida para momentos de estresse', (SELECT id FROM meditation_categories WHERE name = 'Relaxamento'), '5:00', 300000, true, true, 1),
('Sons da Natureza', 'Relaxe com sons de floresta e pássaros', (SELECT id FROM meditation_categories WHERE name = 'Natureza'), '10:00', 600000, true, false, 2),
('Meditação para Dormir', 'Prepare-se para uma noite tranquila de sono', (SELECT id FROM meditation_categories WHERE name = 'Sono'), '15:00', 900000, true, true, 3),
('Foco e Concentração', 'Melhore sua produtividade com esta meditação', (SELECT id FROM meditation_categories WHERE name = 'Foco'), '7:00', 420000, true, true, 4);