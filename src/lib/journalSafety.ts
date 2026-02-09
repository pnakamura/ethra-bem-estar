/**
 * Journal Safety & Sensitive Content Detection
 * Detects risk indicators and provides appropriate resources
 */

const riskKeywords = [
  'suicídio', 'suicidio', 'me matar', 'quero morrer', 'não aguento mais',
  'não vejo saída', 'nao vejo saida', 'acabar com tudo', 'sem esperança',
  'autolesão', 'autolesao', 'me machucar', 'me cortar', 'self harm',
  'não quero viver', 'nao quero viver', 'desistir de tudo',
  'overdose', 'pular de', 'me enforcar',
];

const intenseEmotionKeywords = [
  'desespero', 'angústia', 'angustia', 'pânico', 'panico',
  'depressão', 'depressao', 'ansiedade severa', 'crise',
  'trauma', 'abuso', 'violência', 'violencia',
  'estou perdido', 'me sinto vazio', 'sozinho no mundo',
  'ninguém se importa', 'ninguem se importa', 'sem saída',
  'não consigo dormir', 'não consigo comer', 'choro o tempo todo',
];

export type SafetyLevel = 'safe' | 'intense' | 'risk';

export interface SafetyCheck {
  level: SafetyLevel;
  message: string;
  contacts?: { name: string; number: string; description: string }[];
}

export function checkContentSafety(text: string): SafetyCheck {
  const lower = text.toLowerCase();

  const hasRisk = riskKeywords.some(k => lower.includes(k));
  if (hasRisk) {
    return {
      level: 'risk',
      message: 'Percebemos que você pode estar passando por um momento muito difícil. Você não está sozinho(a). Por favor, procure ajuda profissional.',
      contacts: [
        { name: 'CVV', number: '188', description: 'Centro de Valorização da Vida — 24h, gratuito' },
        { name: 'SAMU', number: '192', description: 'Emergência médica' },
        { name: 'WhatsApp CVV', number: '(11) 98495-4141', description: 'Chat de apoio emocional' },
      ],
    };
  }

  const hasIntense = intenseEmotionKeywords.some(k => lower.includes(k));
  if (hasIntense) {
    return {
      level: 'intense',
      message: 'Parece que você está passando por emoções intensas. Considere conversar com um profissional de saúde mental para apoio especializado.',
      contacts: [
        { name: 'CVV', number: '188', description: 'Centro de Valorização da Vida — 24h, gratuito' },
      ],
    };
  }

  return { level: 'safe', message: '' };
}

// Therapeutic writing prompts
export const writingPrompts = [
  'O que me fez sorrir hoje?',
  'Algo que eu gostaria de dizer a mim mesmo(a)...',
  'Como meu corpo está se sentindo agora?',
  'Uma coisa pela qual sou grato(a) hoje...',
  'O que me causou desconforto e por quê?',
  'Se eu pudesse mudar uma coisa hoje, seria...',
  'Uma pequena vitória que tive recentemente...',
  'Como estou cuidando de mim?',
  'O que aprendi sobre mim essa semana?',
  'Uma memória que me traz paz...',
];

export function getRandomPrompt(): string {
  return writingPrompts[Math.floor(Math.random() * writingPrompts.length)];
}

// Extended emotion detection for journal
const emotionMap: Record<string, string[]> = {
  'Alegria': ['feliz', 'alegr', 'content', 'satisfeit', 'divertid', 'animad', 'empolgad', 'entusiasmad'],
  'Tristeza': ['trist', 'choro', 'chorei', 'deprimi', 'melancol', 'saudade', 'solidão', 'vazio'],
  'Raiva': ['raiva', 'irritad', 'frustrad', 'odio', 'ódio', 'revoltad', 'indignado', 'furioso'],
  'Medo': ['medo', 'ansios', 'preocupad', 'aflito', 'assustado', 'inseguranç', 'apavorad', 'nervos'],
  'Calma': ['calm', 'paz', 'tranquil', 'seren', 'relaxad', 'aliviado', 'acolhid'],
  'Amor': ['amor', 'carinho', 'afeição', 'ternura', 'apaixonad', 'amado', 'querido', 'gratidão'],
  'Surpresa': ['surpres', 'espantad', 'chocad', 'impressionad', 'inesperado'],
  'Nojo': ['nojo', 'repulsa', 'aversão', 'asco', 'desgost'],
  'Confiança': ['confianç', 'segur', 'determin', 'corajos', 'forte'],
  'Reflexivo': [],
};

export function detectJournalEmotions(text: string): string[] {
  const lower = text.toLowerCase();
  const detected: string[] = [];

  for (const [emotion, keywords] of Object.entries(emotionMap)) {
    if (emotion === 'Reflexivo') continue;
    if (keywords.some(k => lower.includes(k))) {
      detected.push(emotion);
    }
  }

  if (detected.length === 0 && text.length > 20) {
    detected.push('Reflexivo');
  }

  return detected;
}
