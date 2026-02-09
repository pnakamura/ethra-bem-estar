
# Plano: Conversas Mais Humanas no /guide

## Resumo da Analise

Apos analise do sistema de chat do guia, identifiquei os seguintes componentes:

| Componente | Funcao |
|------------|--------|
| `GuideChat.tsx` | Pagina principal com fases (reading→thinking→transitioning→responding) |
| `useGuideChat.ts` | Hook com streaming, chunking de respostas e persistencia |
| `useStreamingPacer.ts` | Controle de ritmo de digitacao com hesitacoes |
| `useMessageChunker.ts` | Divide respostas longas em chunks naturais |
| `useThinkingDelay.ts` | Frases de reflexao e deteccao de contexto emocional |
| `MessageBubble.tsx` | Renderizacao das mensagens com indicador de memoria |
| `TypingIndicator.tsx` | Animacao de "pensando/digitando" |
| `guide-chat/index.ts` | Edge function com system prompt humanizado |

### Pontos Fortes Existentes
- Sistema de fases bem estruturado (reading→thinking→responding)
- Streaming com pacing que simula digitacao humana
- Frases de reflexao contextuais ("Hmm, interessante...")
- Deteccao de conteudo emocional
- Chunking de respostas longas
- Indicador de memoria (sparkle quando guia lembra algo)

### Oportunidades de Melhoria Identificadas

1. **Variacoes de Abertura**: O guia pode parecer repetitivo ao iniciar respostas
2. **Pausas Entre Mensagens**: Falta "pausa para respirar" entre chunks
3. **Reacoes Emocionais Visuais**: Avatar nao reage ao conteudo emocional
4. **Digitacao "Imperfeita"**: Ritmo muito uniforme, sem hesitacoes visiveis
5. **Status Mais Expressivo**: "digitando..." e generico demais
6. **Indicadores de Leitura**: Usuario nao ve que guia "leu" a mensagem
7. **Micro-interacoes**: Faltam reacoes sutis como "..." antes de responder algo delicado
8. **Markdown nas Respostas**: Respostas de IA nao sao renderizadas com formatacao

---

## Fase 1: Melhorias no Sistema de Streaming e Pausas

### 1.1 Pausas Mais Naturais Entre Chunks

Adicionar indicador visual de "respiracao" entre chunks de mensagem.

**useMessageChunker.ts** - Aumentar delays e adicionar variacao:
```typescript
// Delays mais longos e variaveis
const baseDelay = index === 0 ? 2000 : 3500; // Mais tempo para refletir
const emotionalBonus = hasEmotionalContent(chunk) ? 2000 : 0; // Dobrar para emocional
```

### 1.2 Hesitacoes Visiveis no Streaming

**useStreamingPacer.ts** - Mostrar "..." temporario durante hesitacoes:
```typescript
// Durante hesitacao, mostrar indicador visual
if (hesitationDelay > 0) {
  optionsRef.current?.onHesitate?.(true);
  await sleep(hesitationDelay);
  optionsRef.current?.onHesitate?.(false);
}
```

---

## Fase 2: Avatar e Estados Emocionais

### 2.1 Deteccao de Tom da Resposta

Criar utilidade para detectar tom da resposta do guia e ajustar avatar:

**Novo: src/lib/emotionDetection.ts**
```typescript
export type ResponseTone = 'neutral' | 'empathic' | 'curious' | 'encouraging' | 'reflective';

export function detectResponseTone(content: string): ResponseTone {
  const lowerContent = content.toLowerCase();
  
  if (/entendo|compreendo|sinto|imagino como/.test(lowerContent)) return 'empathic';
  if (/pergunto|curioso|o que acha|gostaria de saber/.test(lowerContent)) return 'curious';
  if (/parabéns|incrível|maravilha|excelente|ótimo/.test(lowerContent)) return 'encouraging';
  if (/hmm|veja bem|interessante|pensando/.test(lowerContent)) return 'reflective';
  
  return 'neutral';
}
```

### 2.2 Avatar Reativo ao Tom

**GuideAvatar.tsx** - Adicionar estados para diferentes tons:
```typescript
export type AvatarState = 'idle' | 'thinking' | 'speaking' | 'empathic' | 'curious' | 'encouraging';

// Animacoes diferentes por estado
case 'curious':
  return { rotate: [0, 3, -3, 0], transition: { duration: 0.8 } };
case 'encouraging':
  return { scale: [1, 1.1, 1], transition: { duration: 0.5 } };
```

---

## Fase 3: Status Mais Expressivos

### 3.1 Frases de Status Contextuais

**GuideChat.tsx** - Status mais humanos baseados no contexto:
```typescript
const getStatusText = () => {
  const lastUserMessage = messages.filter(m => m.role === 'user').pop();
  const context = lastUserMessage ? detectMessageContext(lastUserMessage.content) : 'default';
  
  switch (phase) {
    case 'reading':
      return context === 'emotional' ? 'lendo com atenção...' : 'lendo...';
    case 'thinking':
      if (context === 'emotional') return 'acolhendo suas palavras...';
      if (context === 'question') return 'refletindo sobre sua pergunta...';
      return 'preparando resposta...';
    case 'responding':
      return 'compartilhando...';
    default:
      return guide?.approach || 'online';
  }
};
```

### 3.2 Indicador de Leitura ("Visto")

Adicionar feedback visual quando o guia "leu" a mensagem do usuario:

**MessageBubble.tsx** - Adicionar checkmark de leitura em mensagens do usuario:
```tsx
{isUser && wasRead && (
  <motion.span
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    className="text-xs text-secondary ml-1"
  >
    ✓✓
  </motion.span>
)}
```

---

## Fase 4: Renderizacao de Markdown

### 4.1 Instalar Dependencia

```bash
npm install react-markdown
```

### 4.2 Renderizar Respostas com Formatacao

**MessageBubble.tsx** - Usar ReactMarkdown para respostas do guia:
```tsx
import ReactMarkdown from 'react-markdown';

// Dentro do componente:
{isUser ? (
  <p className="whitespace-pre-wrap">{message.content}</p>
) : (
  <div className="prose prose-sm dark:prose-invert max-w-none">
    <ReactMarkdown>{message.content}</ReactMarkdown>
  </div>
)}
```

---

## Fase 5: Micro-Interacoes e Detalhes

### 5.1 "Pensando Mais" para Topicos Delicados

Quando detectar conteudo emocional, adicionar pausa extra com frase especial:

**useThinkingDelay.ts** - Frases para conteudo sensivel:
```typescript
deepEmotional: [
  'Preciso de um momento para responder com cuidado...',
  'Isso merece uma resposta atenciosa...',
  'Deixe-me formular isso com carinho...',
],
```

### 5.2 Efeito de "Digitacao Interrompida"

Simular quando o guia "para" de digitar brevemente para pensar:

**useStreamingPacer.ts** - Pausas mais longas em pontos-chave:
```typescript
// Ao encontrar "..." no texto, pausa mais longa
if (char === '…' || chunk.includes('...')) {
  baseDelay = 800 + Math.random() * 600; // 800-1400ms
  optionsRef.current?.onPause?.('reflecting');
}
```

### 5.3 Indicador de "Pensando Profundamente"

Quando a resposta demora mais que o esperado, mudar frase:

**TypingIndicator.tsx** - Variante para reflexao profunda:
```tsx
{variant === 'deep' && (
  <span className="text-xs text-primary/70 italic">
    Refletindo profundamente...
  </span>
)}
```

---

## Fase 6: Melhorias no System Prompt

### 6.1 Instrucoes Adicionais para Humanizacao

**guide-chat/index.ts** - Expandir instrucoes:
```typescript
// Adicionar ao system prompt:
12. Nunca comece duas respostas consecutivas da mesma forma
13. Use "..." para indicar que está pensando em algo delicado
14. Faca perguntas de acompanhamento genuinas, nao genericas
15. Varie a estrutura das respostas (às vezes curta, às vezes longa)
16. Quando o usuario compartilhar algo pessoal, primeiro valide, depois responda
17. Ocasionalmente use formatacao markdown para enfatizar pontos importantes (**negrito**, *italico*)
```

---

## Arquivos a Modificar

| Arquivo | Alteracoes |
|---------|------------|
| `src/hooks/useMessageChunker.ts` | Delays maiores, pausas mais naturais |
| `src/hooks/useStreamingPacer.ts` | Callbacks de hesitacao, pausas visiveis |
| `src/hooks/useThinkingDelay.ts` | Frases para conteudo sensivel |
| `src/components/guide/GuideAvatar.tsx` | Estados emocionais (curious, encouraging) |
| `src/components/guide/MessageBubble.tsx` | Markdown, indicador de leitura, deteccao de tom |
| `src/components/guide/TypingIndicator.tsx` | Variante deep, animacoes mais suaves |
| `src/pages/GuideChat.tsx` | Status contextuais, estados do avatar |
| `src/lib/emotionDetection.ts` | Nova utilidade para detectar tom |
| `supabase/functions/guide-chat/index.ts` | Instrucoes expandidas no prompt |
| `package.json` | Adicionar react-markdown |

---

## Dependencias Necessarias

```json
{
  "react-markdown": "^9.0.0"
}
```

---

## Resumo Visual das Melhorias

```text
ANTES                           DEPOIS
────────────────────────────────────────────────────
Status: "digitando..."          Status: "acolhendo suas palavras..."
Avatar: sempre igual            Avatar: reage ao conteudo (empático/curioso)
Texto: plaintext                Texto: markdown formatado
Pausas: uniformes               Pausas: variaveis por contexto
Resposta: aparece de uma vez    Resposta: chunks com respiração
Leitura: invisivel              Leitura: ✓✓ quando guia leu
Hesitacao: invisivel            Hesitacao: "..." temporário
```

---

## Metricas de Humanizacao

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Variacoes de status | 4 | 8+ |
| Estados do avatar | 4 | 6 |
| Delay medio entre chunks | 2.5s | 3.5s |
| Frases de reflexao | 18 | 30+ |
| Indicadores visuais | 3 | 7 |

---

## Ordem de Implementacao

1. **Markdown** - Impacto visual imediato
2. **Status contextuais** - Facil de implementar
3. **Delays maiores** - Ajustes numericos
4. **Avatar reativo** - Estados visuais
5. **Indicador de leitura** - Detalhe de UX
6. **System prompt** - Melhoria no backend

