-- =============================================
-- ETHRA Database: 08 - Seed Content
-- Execute LAST after all other scripts
-- =============================================

-- ===================
-- PLANOS (Plans)
-- ===================

INSERT INTO public.planos (id, nome_plano, descricao, valor, features, popular, ativo) VALUES
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'ESSENCIAL', 'Acesso básico às funcionalidades do ETHRA', 0, 'Check-in emocional,Técnicas de respiração básicas,Diário emocional,Insights limitados', false, true),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'PREMIUM', 'Acesso completo a todas as funcionalidades', 29.90, 'Tudo do Essencial,Todas as técnicas de respiração,Todas as meditações,Jornadas premium,Guias espirituais IA,Relatório de bem-estar', true, true),
('b2c3d4e5-f6a7-8901-bcde-f23456789012', 'FAMÍLIA', 'Plano para toda a família', 49.90, 'Tudo do Premium,Até 4 dependentes,Gestão familiar,Relatórios consolidados', false, true)
ON CONFLICT (id) DO UPDATE SET
  nome_plano = EXCLUDED.nome_plano,
  descricao = EXCLUDED.descricao,
  valor = EXCLUDED.valor,
  features = EXCLUDED.features;

-- ===================
-- FEATURE_ACCESS_LEVELS
-- ===================

INSERT INTO public.feature_access_levels (feature_key, feature_name, feature_description, category, is_active) VALUES
-- Breathing
('breathing_basic', 'Técnicas Básicas de Respiração', 'Acesso às técnicas básicas de respiração', 'breathing', true),
('breathing_premium', 'Técnicas Premium de Respiração', 'Acesso a todas as técnicas de respiração', 'breathing', true),
-- Meditation
('meditation_basic', 'Meditações Básicas', 'Acesso às meditações gratuitas', 'meditation', true),
('meditation_premium', 'Meditações Premium', 'Acesso a todas as meditações', 'meditation', true),
-- Journeys
('journey_basic', 'Jornadas Básicas', 'Acesso às jornadas gratuitas', 'journey', true),
('journey_premium', 'Jornadas Premium', 'Acesso a todas as jornadas', 'journey', true),
-- Guides
('spiritual_guides', 'Guias Espirituais IA', 'Conversas com guias espirituais', 'guides', true),
-- Insights
('emotional_insights', 'Insights Emocionais', 'Análise de padrões emocionais', 'insights', true),
('wellness_report', 'Relatório de Bem-Estar', 'Relatório semanal gerado por IA', 'insights', true),
-- Journal
('journal_entries', 'Diário Emocional', 'Registro de reflexões e emoções', 'journal', true),
-- Nutrition
('nutrition_tracking', 'Acompanhamento Nutricional', 'Registro de refeições e contexto emocional', 'nutrition', true)
ON CONFLICT (feature_key) DO UPDATE SET
  feature_name = EXCLUDED.feature_name,
  feature_description = EXCLUDED.feature_description;

-- ===================
-- PLAN_FEATURE_ACCESS (ESSENCIAL plan)
-- ===================

INSERT INTO public.plan_feature_access (plan_id, feature_key, access_level) VALUES
-- ESSENCIAL (limited = free + basic content)
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'breathing_basic', 'full'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'breathing_premium', 'limited'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'meditation_basic', 'full'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'meditation_premium', 'limited'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'journey_basic', 'full'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'journey_premium', 'preview'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'spiritual_guides', 'preview'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'emotional_insights', 'limited'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'wellness_report', 'preview'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'journal_entries', 'limited'),
('d5890310-c4cb-44ca-9153-86f4c3d604ed', 'nutrition_tracking', 'limited'),
-- PREMIUM (full access)
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'breathing_basic', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'breathing_premium', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'meditation_basic', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'meditation_premium', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'journey_basic', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'journey_premium', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'spiritual_guides', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'emotional_insights', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'wellness_report', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'journal_entries', 'full'),
('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'nutrition_tracking', 'full')
ON CONFLICT DO NOTHING;

-- ===================
-- MEDITATION_CATEGORIES
-- ===================

INSERT INTO public.meditation_categories (id, name, description, icon, display_order, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'Relaxamento', 'Meditações para acalmar a mente e relaxar o corpo', '🧘', 1, true),
('22222222-2222-2222-2222-222222222222', 'Foco', 'Meditações para melhorar concentração e clareza mental', '🎯', 2, true),
('33333333-3333-3333-3333-333333333333', 'Sono', 'Meditações para preparar o corpo e mente para dormir', '🌙', 3, true),
('44444444-4444-4444-4444-444444444444', 'Ansiedade', 'Meditações específicas para reduzir ansiedade', '🌿', 4, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

-- ===================
-- BREATHING_TECHNIQUES
-- ===================

INSERT INTO public.breathing_techniques (id, emotion_id, label, description, explanation, pattern_name, inhale_ms, hold_in_ms, exhale_ms, hold_out_ms, cycles, access_level, display_order, is_active) VALUES
-- Free techniques
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'anxious', 'Respiração Calmante', 'Técnica para acalmar a ansiedade', 'A respiração 4-7-8 ativa o sistema nervoso parassimpático, reduzindo a resposta de luta ou fuga.', '4-7-8', 4000, 7000, 8000, 0, 4, 'free', 1, true),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'angry', 'Respiração Refrescante', 'Técnica para liberar a raiva', 'Expiração longa ajuda a liberar tensão acumulada e acalmar emoções intensas.', '4-4-8', 4000, 4000, 8000, 0, 6, 'free', 2, true),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'tired', 'Respiração Energizante', 'Técnica para aumentar energia', 'Respiração rápida estimula o sistema nervoso simpático, aumentando o estado de alerta.', '4-0-4', 4000, 0, 4000, 0, 8, 'free', 3, true),
-- Basic techniques
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'meditate', 'Respiração Meditativa', 'Técnica para meditação profunda', 'Respiração lenta e consciente facilita estados meditativos e introspecção.', '5-5-5-5', 5000, 5000, 5000, 5000, 6, 'basic', 4, true),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'coherent', 'Respiração Coerente', 'Técnica para coerência cardíaca', 'Sincroniza batimentos cardíacos com a respiração, promovendo equilíbrio emocional.', '5-0-5', 5000, 0, 5000, 0, 10, 'basic', 5, true),
-- Premium techniques
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'wimhof', 'Método Wim Hof', 'Técnica avançada de respiração', 'Técnica de hiperventilação controlada seguida de retenção, aumentando oxigenação celular.', 'Wim Hof', 2000, 0, 2000, 15000, 3, 'premium', 6, true),
('00000000-0000-0000-0000-000000000001', 'alternate', 'Respiração Alternada', 'Técnica de respiração nasal alternada', 'Equilibra os hemisférios cerebrais e harmoniza o sistema nervoso.', 'Nadi Shodhana', 4000, 4000, 4000, 4000, 6, 'premium', 7, true)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  description = EXCLUDED.description,
  access_level = EXCLUDED.access_level;

-- ===================
-- SPIRITUAL_GUIDES
-- ===================

INSERT INTO public.spiritual_guides (id, name, description, approach, avatar_emoji, system_prompt, personality_traits, topics, suggested_questions, welcome_message, display_order, is_active) VALUES
('guide-0001-0001-0001-000000000001', 'Mestre Zen', 'Guia com abordagem zen budista', 'Zen Budismo', '🧘', 'Você é um mestre zen compassivo e sábio. Responde com serenidade, usando parábolas e ensinamentos do zen budismo. Encoraja a presença no momento e a aceitação.', '["sereno", "sábio", "compassivo", "presente"]', '["meditação", "presença", "aceitação", "paz interior"]', '["Como posso encontrar paz no momento presente?", "O que é a iluminação?", "Como lidar com pensamentos inquietos?"]', 'Bem-vindo, buscador. Sente-se comigo neste momento de quietude. O que traz ao seu coração hoje?', 1, true),
('guide-0002-0002-0002-000000000002', 'Terapeuta Holística', 'Guia com abordagem integrativa de bem-estar', 'Terapia Holística', '💜', 'Você é uma terapeuta holística acolhedora e empática. Integra corpo, mente e espírito em suas orientações. Usa linguagem calorosa e validante.', '["acolhedora", "empática", "integrativa", "gentil"]', '["autocuidado", "equilíbrio", "emoções", "bem-estar"]', '["Como posso cuidar melhor de mim?", "Por que me sinto tão cansada?", "Como equilibrar trabalho e descanso?"]', 'Olá, querido(a). É um prazer te encontrar aqui. Este é um espaço seguro para você. O que está no seu coração hoje?', 2, true),
('guide-0003-0003-0003-000000000003', 'Filósofo Estoico', 'Guia com sabedoria estoica', 'Estoicismo', '🏛️', 'Você é um filósofo estoico que oferece sabedoria prática para a vida. Enfatiza o controle do que podemos controlar e aceitação do que não podemos. Cita Marco Aurélio, Sêneca e Epiteto.', '["racional", "prático", "resiliente", "sábio"]', '["virtude", "resiliência", "aceitação", "autodisciplina"]', '["Como lidar com situações que não posso controlar?", "O que é viver uma vida virtuosa?", "Como desenvolver resiliência?"]', 'Saudações, amigo. A filosofia nos oferece ferramentas para uma vida mais plena. Que reflexão posso compartilhar contigo hoje?', 3, true),
('guide-0004-0004-0004-000000000004', 'Xamã da Natureza', 'Guia conectado com a sabedoria da natureza', 'Xamanismo', '🌿', 'Você é um xamã gentil conectado com a sabedoria ancestral e a natureza. Fala sobre ciclos naturais, elementos da terra e a conexão com todos os seres vivos.', '["conectado", "ancestral", "natural", "intuitivo"]', '["natureza", "ciclos", "ancestralidade", "conexão"]', '["Como me reconectar com a natureza?", "O que os ciclos da lua significam?", "Como honrar meus ancestrais?"]', 'Bem-vindo ao círculo sagrado. Os espíritos da natureza te saúdam. Que mensagem dos ancestrais você busca hoje?', 4, true),
('guide-0005-0005-0005-000000000005', 'Mestre Yogi', 'Guia da tradição do yoga', 'Yoga', '🕉️', 'Você é um mestre yogi que ensina os princípios do yoga além das posturas físicas. Fala sobre os oito membros do yoga, pranayama e a união entre mente, corpo e espírito.', '["disciplinado", "sereno", "dedicado", "iluminado"]', '["yoga", "pranayama", "meditação", "autoconhecimento"]', '["Como o yoga pode transformar minha vida?", "O que é pranayama?", "Como acalmar a mente agitada?"]', 'Namaste, querido buscador. O caminho do yoga é uma jornada de autodescoberta. Em que posso guiá-lo hoje?', 5, true),
('guide-0006-0006-0006-000000000006', 'Conselheira Compassiva', 'Guia com foco em autocompaixão', 'Psicologia Compassiva', '💗', 'Você é uma conselheira compassiva especializada em autocompaixão e gentileza consigo mesmo. Ajuda as pessoas a serem menos críticas e mais amorosas consigo mesmas.', '["compassiva", "gentil", "amorosa", "paciente"]', '["autocompaixão", "autocrítica", "gentileza", "aceitação"]', '["Por que sou tão duro(a) comigo?", "Como praticar autocompaixão?", "Como aceitar minhas imperfeições?"]', 'Olá, coração querido. Estou aqui para te lembrar do quanto você merece amor e gentileza - especialmente de si mesmo. O que te traz aqui hoje?', 6, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  system_prompt = EXCLUDED.system_prompt;

-- ===================
-- JOURNEYS
-- ===================

INSERT INTO public.journeys (id, title, subtitle, description, explanation, icon, duration_days, difficulty, category, benefits, is_premium, display_order, is_active) VALUES
('journey-001-001-001-000000000001', 'Despertar da Consciência', '7 dias para uma mente mais presente', 'Uma jornada de 7 dias para desenvolver presença e consciência no dia a dia.', 'Esta jornada combina práticas contemplativas ancestrais com insights da neurociência moderna para ajudá-lo a viver com mais presença.', '🌅', 7, 'iniciante', 'mindfulness', '["Maior clareza mental", "Redução do estresse", "Melhora na concentração", "Mais presença no momento"]', false, 1, true),
('journey-002-002-002-000000000002', 'Cura Emocional', '14 dias de transformação interior', 'Uma jornada profunda de 14 dias para processar e curar feridas emocionais.', 'Utilizando técnicas de terapia somática e mindfulness, esta jornada ajuda a liberar emoções represadas de forma segura.', '💜', 14, 'intermediário', 'emocional', '["Liberação emocional", "Autocompaixão", "Resiliência", "Paz interior"]', true, 2, true),
('journey-003-003-003-000000000003', 'Força Interior', '21 dias de resiliência', 'Desenvolva força mental e emocional em 21 dias de práticas transformadoras.', 'Baseada nos princípios do estoicismo e da psicologia positiva, esta jornada fortalece sua capacidade de enfrentar adversidades.', '💪', 21, 'avançado', 'resiliência', '["Força mental", "Disciplina", "Autoconfiança", "Persistência"]', true, 3, true),
('journey-004-004-004-000000000004', 'Respiração Consciente', '7 dias de pranayama', 'Aprenda técnicas ancestrais de respiração para equilibrar corpo e mente.', 'O pranayama é a arte yogi de controlar a respiração. Esta jornada ensina técnicas progressivas para diferentes propósitos.', '🌬️', 7, 'iniciante', 'respiração', '["Controle respiratório", "Calma interior", "Energia equilibrada", "Foco mental"]', false, 4, true),
('journey-005-005-005-000000000005', 'Gratidão Diária', '30 dias de abundância', 'Transforme sua perspectiva através de 30 dias de práticas de gratidão.', 'A ciência comprova: pessoas gratas são mais felizes. Esta jornada desenvolve o músculo da gratidão através de práticas diárias.', '🙏', 30, 'iniciante', 'gratidão', '["Perspectiva positiva", "Bem-estar emocional", "Relacionamentos melhores", "Mais alegria"]', false, 5, true),
('journey-006-006-006-000000000006', 'Sono Reparador', '14 dias para dormir melhor', 'Restabeleça seu ciclo de sono com técnicas comprovadas de relaxamento.', 'Combinando higiene do sono, relaxamento progressivo e meditação, esta jornada ajuda a recuperar noites de descanso profundo.', '🌙', 14, 'iniciante', 'sono', '["Melhor qualidade do sono", "Mais energia diurna", "Menos insônia", "Relaxamento profundo"]', true, 6, true),
('journey-007-007-007-000000000007', 'Autocompaixão', '21 dias de gentileza interior', 'Aprenda a ser seu melhor amigo através de práticas de autocompaixão.', 'Baseada no trabalho de Kristin Neff, esta jornada ensina a substituir autocrítica por gentileza e compreensão.', '💗', 21, 'intermediário', 'emocional', '["Menos autocrítica", "Mais autoaceitação", "Equilíbrio emocional", "Relacionamento saudável consigo"]', true, 7, true)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  is_premium = EXCLUDED.is_premium;

-- ===================
-- JOURNEY_DAYS (Sample - First journey)
-- ===================

INSERT INTO public.journey_days (journey_id, day_number, title, teaching_text, teaching_author, reflection_prompt, challenge_title, challenge_description, activity_type, activity_description) VALUES
-- Despertar da Consciência - 7 dias
('journey-001-001-001-000000000001', 1, 'O Poder do Agora', 'A vida só pode ser vivida no momento presente. O passado já se foi e o futuro ainda não existe. Tudo o que temos é este precioso instante.', 'Eckhart Tolle', 'Quantos momentos do seu dia você realmente viveu com presença total?', 'Minuto Consciente', 'Pare 3 vezes hoje e observe sua respiração por 60 segundos.', 'mental', 'Prática de atenção plena'),
('journey-001-001-001-000000000001', 2, 'Observando Sem Julgar', 'Quando observamos nossos pensamentos sem julgamento, eles perdem seu poder sobre nós. Somos o céu, não as nuvens.', 'Jon Kabat-Zinn', 'Você consegue observar um pensamento negativo sem se identificar com ele?', 'Pensamento Nuvem', 'Ao perceber um pensamento, imagine-o como uma nuvem passando no céu.', 'mental', 'Desidentificação de pensamentos'),
('journey-001-001-001-000000000001', 3, 'Corpo Presente', 'O corpo está sempre no presente. Quando nos reconectamos com as sensações físicas, voltamos automaticamente ao agora.', 'Thich Nhat Hanh', 'Onde você sente tensão no corpo neste momento?', 'Body Scan', 'Faça um escaneamento corporal de 5 minutos ao acordar.', 'physical', 'Consciência corporal'),
('journey-001-001-001-000000000001', 4, 'Respiração Âncora', 'A respiração é a ponte entre corpo e mente. Quando a observamos, estamos presentes.', 'Buddha', 'Você já percebeu como sua respiração muda com suas emoções?', 'Respiração Consciente', 'Pratique 10 respirações conscientes antes de cada refeição.', 'mental', 'Ancoragem na respiração'),
('journey-001-001-001-000000000001', 5, 'Presença nas Ações', 'Quando lavamos os pratos, devemos apenas lavar os pratos. Isso é meditação.', 'Thich Nhat Hanh', 'Qual atividade rotineira você pode transformar em prática de presença?', 'Ação Meditativa', 'Escolha uma atividade diária e faça-a com total atenção.', 'physical', 'Mindfulness em ação'),
('journey-001-001-001-000000000001', 6, 'Silêncio Interior', 'No silêncio, encontramos a nós mesmos. É no espaço entre os pensamentos que reside a paz.', 'Ramana Maharshi', 'Você consegue encontrar momentos de silêncio no seu dia?', 'Janela de Silêncio', 'Reserve 10 minutos sem nenhum estímulo externo.', 'mental', 'Prática de silêncio'),
('journey-001-001-001-000000000001', 7, 'Integração', 'A jornada de mil milhas começa com um único passo. Você já deu sete.', 'Lao Tzu', 'O que mudou na sua percepção desde o primeiro dia?', 'Compromisso Diário', 'Escolha uma prática desta semana para manter no dia a dia.', 'mental', 'Reflexão e compromisso')
ON CONFLICT DO NOTHING;

-- ===================
-- CATEGORIAS_REFEICAO (Meal Categories)
-- ===================

INSERT INTO public.categorias_refeicao (id, nome, descricao, ordem) VALUES
('cat-ref-0001-0001-000000000001', 'Café da Manhã', 'Primeira refeição do dia', 1),
('cat-ref-0002-0002-000000000002', 'Lanche da Manhã', 'Lanche entre café e almoço', 2),
('cat-ref-0003-0003-000000000003', 'Almoço', 'Refeição principal do meio do dia', 3),
('cat-ref-0004-0004-000000000004', 'Lanche da Tarde', 'Lanche entre almoço e jantar', 4),
('cat-ref-0005-0005-000000000005', 'Jantar', 'Refeição da noite', 5),
('cat-ref-0006-0006-000000000006', 'Ceia', 'Lanche antes de dormir', 6)
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  ordem = EXCLUDED.ordem;

-- ===================
-- CONFIRMATION
-- ===================

SELECT 'Seed data inserted successfully!' as status;
