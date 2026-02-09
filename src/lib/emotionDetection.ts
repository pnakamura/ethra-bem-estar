/**
 * Utility for detecting emotional tone in messages
 * Used to adjust avatar state and UI feedback
 */

export type ResponseTone = 'neutral' | 'empathic' | 'curious' | 'encouraging' | 'reflective';

// Patterns for detecting emotional tone in guide responses
const tonePatterns = {
  empathic: [
    'entendo', 'compreendo', 'sinto', 'imagino como', 'deve ser',
    'difícil', 'doloroso', 'acolho', 'aqui com você', 'estou aqui',
    'entendo como', 'compreendo que', 'sei que não é fácil',
  ],
  curious: [
    'pergunto', 'curioso', 'o que acha', 'gostaria de saber',
    'como você se sente', 'me conte mais', 'o que te leva a',
    'você já pensou', 'será que', 'me diz', 'como é',
  ],
  encouraging: [
    'parabéns', 'incrível', 'maravilha', 'excelente', 'ótimo',
    'muito bem', 'isso é lindo', 'que bom', 'orgulho', 'admirável',
    'força', 'você consegue', 'acredito em você', 'confio',
  ],
  reflective: [
    'hmm', 'veja bem', 'interessante', 'pensando', 'deixe-me',
    'refletindo', 'pois é', 'sabe...', 'é que', '...',
  ],
};

/**
 * Detects the emotional tone of a guide response
 */
export function detectResponseTone(content: string): ResponseTone {
  const lowerContent = content.toLowerCase();
  
  // Check patterns in order of specificity
  for (const pattern of tonePatterns.empathic) {
    if (lowerContent.includes(pattern)) return 'empathic';
  }
  
  for (const pattern of tonePatterns.encouraging) {
    if (lowerContent.includes(pattern)) return 'encouraging';
  }
  
  for (const pattern of tonePatterns.curious) {
    if (lowerContent.includes(pattern)) return 'curious';
  }
  
  for (const pattern of tonePatterns.reflective) {
    if (lowerContent.includes(pattern)) return 'reflective';
  }
  
  return 'neutral';
}

/**
 * Check if content has deep emotional indicators
 * Used to trigger longer thinking delays
 */
export function hasDeepEmotionalContent(content: string): boolean {
  const deepPatterns = [
    'morte', 'perda', 'luto', 'depressão', 'suicídio', 'desespero',
    'trauma', 'abuso', 'violência', 'medo profundo', 'angústia',
    'sozinho no mundo', 'não aguento mais', 'não vejo saída',
    'preciso de ajuda', 'estou perdido', 'me sinto vazio',
  ];
  
  const lowerContent = content.toLowerCase();
  return deepPatterns.some(pattern => lowerContent.includes(pattern));
}

/**
 * Get a visual indicator for the response tone
 */
export function getToneEmoji(tone: ResponseTone): string {
  switch (tone) {
    case 'empathic': return '💗';
    case 'curious': return '🤔';
    case 'encouraging': return '✨';
    case 'reflective': return '💭';
    default: return '';
  }
}
