
# Plano de Otimizacao Completa - ETHRA

## Resumo Executivo

Apos analise detalhada do codigo, identifiquei otimizacoes em 6 categorias:

| Categoria | Impacto | Prioridade |
|-----------|---------|------------|
| Performance | Alto | Alta |
| Seguranca | Critico | Alta |
| Qualidade de Codigo | Medio | Media |
| Cache e Rede | Alto | Alta |
| CSS e Bundle | Medio | Media |
| UX/Acessibilidade | Medio | Media |

---

## Fase 1: Seguranca (Prioridade Critica)

### 1.1 Habilitar Protecao contra Senhas Vazadas

O linter identificou que a protecao contra senhas vazadas esta desabilitada.

**Acao**: Habilitar "Leaked Password Protection" nas configuracoes de autenticacao do backend.

### 1.2 Substituir console.log por Logger Centralizado

Encontrei **356 ocorrencias** de `console.log/console.error` em 24 arquivos. O projeto ja possui um utilitario de logger em `src/lib/logger.ts`, mas nao esta sendo usado consistentemente.

**Arquivos afetados**:
- `src/hooks/useAdminJourneys.ts`
- `src/hooks/useEmotionEntries.ts`
- `src/hooks/useGamificationStats.ts`
- `src/hooks/useJourneys.ts`
- `src/hooks/useUserJourney.ts`
- `src/hooks/useFavorites.ts`
- `src/hooks/useOnboarding.ts`
- `src/contexts/AuthContext.tsx`
- E mais 16 arquivos

**Substituir**:
```typescript
// DE
console.error('Error:', error);

// PARA
import { logger } from '@/lib/logger';
logger.error('Error:', error);
```

---

## Fase 2: Performance de Rede e Cache

### 2.1 Configurar staleTime em Queries

Algumas queries nao tem `staleTime` configurado, causando refetches desnecessarios.

**Hooks a otimizar**:

| Hook | staleTime Atual | staleTime Recomendado |
|------|-----------------|----------------------|
| `useBreathingTechniques` | 0 (default) | 10 minutos |
| `useEmotionEntries` | 0 | 2 minutos |
| `useFavoriteBreathings` | 0 | 5 minutos |
| `useFavoriteMeditations` | 0 | 5 minutos |
| `useJournalEntries` | 0 | 1 minuto |
| `useMeditationTracks` | 0 | 10 minutos |

**Exemplo de mudanca**:
```typescript
// useBreathingTechniques.ts
return useQuery({
  queryKey: ['breathing-techniques'],
  queryFn: async () => { /* ... */ },
  staleTime: 10 * 60 * 1000, // 10 minutos
});
```

### 2.2 Adicionar gcTime para Dados Estaticos

Conteudo que raramente muda (tecnicas, meditacoes, jornadas) deve ter `gcTime` maior:

```typescript
// Para dados de conteudo estatico
staleTime: 10 * 60 * 1000,  // 10 min
gcTime: 30 * 60 * 1000,     // 30 min
```

### 2.3 Otimizar useInsightsData

Este hook faz 3 queries separadas que poderiam ser paralelizadas com `Promise.all` ou combinadas:

```typescript
// Atual: 3 queries sequenciais
const { data: emotionEntries } = useQuery({...});
const { data: breathingSessions } = useQuery({...});
const { data: hydrationEntries } = useQuery({...});

// Otimizado: Query unica com dados combinados
const { data: insightsData } = useQuery({
  queryKey: ['insights-combined', user?.id, period],
  queryFn: async () => {
    const [emotions, breathing, hydration] = await Promise.all([
      fetchEmotions(),
      fetchBreathing(),
      fetchHydration(),
    ]);
    return { emotions, breathing, hydration };
  },
});
```

---

## Fase 3: Otimizacao de CSS (1354 linhas)

### 3.1 Remover Duplicacoes de Keyframes

Os keyframes estao duplicados entre `src/index.css` e `tailwind.config.ts`:

**Duplicados**:
- `fade-in` / `fade-in-up`
- `shimmer` (definido 2x)
- `scale-in` / `scaleIn`
- `slide-up` / `slideUp`

**Acao**: Consolidar todos os keyframes em `tailwind.config.ts` e remover duplicatas do CSS.

### 3.2 Remover Classes CSS Nao Utilizadas

Identificar e remover classes que nao sao referenciadas:
- `.glow-neon-teal` (provavelmente nao usado)
- `.card-neon` (sem referencias encontradas)
- Varios efeitos de glow redundantes

### 3.3 Mover Variaveis Duplicadas

Algumas variaveis CSS sao definidas tanto no `:root` quanto em `.dark` com valores identicos. Consolidar.

---

## Fase 4: Qualidade de Codigo

### 4.1 Memoizacao de Callbacks

Callbacks em componentes pesados devem usar `useCallback`:

**Home.tsx** - Handlers que causam re-renders:
```typescript
// Adicionar useCallback
const handleMoodCheck = useCallback(() => setShowMoodModal(true), []);
const handleBreathing = useCallback(() => setShowBreathingSelector(true), []);
const handleMeditation = useCallback(() => setShowMeditation(true), []);
```

### 4.2 Memoizacao de Valores Computados

**useInsightsData.ts** - Calculos pesados que poderiam ser memoizados:
```typescript
// Usar useMemo para calculos complexos
const emotionCounts = useMemo(() => 
  getEmotionCounts(emotionEntries), 
  [emotionEntries]
);

const patterns = useMemo(() => 
  generatePatterns(emotionEntries, breathingSessions, hydrationEntries, emotionCounts, dyadOccurrences),
  [emotionEntries, breathingSessions, hydrationEntries, emotionCounts, dyadOccurrences]
);
```

### 4.3 Padronizar Tratamento de Erros

Criar um padrao consistente para erros em hooks:

```typescript
// Criar utilidade padrao
// src/lib/errorHandler.ts
export const handleQueryError = (error: Error, context: string) => {
  logger.error(`[${context}]`, error);
  toast.error(`Erro: ${error.message}`);
};

// Uso nos hooks
onError: (error) => handleQueryError(error, 'useJourneys'),
```

---

## Fase 5: Otimizacao de Componentes

### 5.1 Lazy Load de Componentes Pesados

Componentes de overlay ja sao lazy loaded no App.tsx. Verificar:
- `BreathPacer` (731 linhas) - ja em AnimatePresence
- `MeditationPlayer` (442 linhas) - ja em AnimatePresence
- `MoodCheckModal` - OK
- Charts no Insights - considerar lazy load

### 5.2 Otimizar Animacoes do Framer Motion

**GardenWidget.tsx** - Animacoes infinitas que podem impactar bateria:
```typescript
// Atual - animacao sempre ativa
animate={{ 
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3]
}}
transition={{ duration: 3, repeat: Infinity }}

// Otimizado - usar will-change e reduce-motion
const prefersReducedMotion = useReducedMotion();

animate={prefersReducedMotion ? {} : { 
  scale: [1, 1.2, 1],
  opacity: [0.3, 0.5, 0.3]
}}
```

### 5.3 Virtualizar Listas Longas

Para listas que podem crescer (historico de emocoes, entradas do diario):
```typescript
// Considerar usar @tanstack/react-virtual para listas > 50 itens
import { useVirtualizer } from '@tanstack/react-virtual';
```

---

## Fase 6: Melhorias de UX/Acessibilidade

### 6.1 Adicionar Error Boundaries Especificos

Atualmente ha ErrorBoundary generico. Adicionar boundaries especificos:
- Para graficos no Insights
- Para o GuideChat
- Para o BreathPacer

### 6.2 Melhorar Feedback de Loading

Substituir Skeletons genericos por componentes especificos (ja criados na ultima iteracao):
- `QuickActionCardSkeleton`
- `GardenWidgetSkeleton`
- `JournalEntrySkeleton`

### 6.3 Implementar Retry Automatico

Para queries criticas, adicionar retry:
```typescript
useQuery({
  queryKey: ['active-user-journey'],
  queryFn: async () => { /* ... */ },
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});
```

---

## Arquivos a Modificar

| Arquivo | Alteracoes |
|---------|------------|
| `src/hooks/useBreathingTechniques.ts` | staleTime, logger |
| `src/hooks/useEmotionEntries.ts` | staleTime, logger, retry |
| `src/hooks/useFavorites.ts` | staleTime, logger |
| `src/hooks/useGamificationStats.ts` | logger |
| `src/hooks/useInsightsData.ts` | Combinar queries, useMemo |
| `src/hooks/useJourneys.ts` | staleTime, logger |
| `src/hooks/useJournalEntries.ts` | staleTime, logger |
| `src/hooks/useMeditationTracks.ts` | staleTime, logger |
| `src/hooks/useUserJourney.ts` | staleTime, logger |
| `src/hooks/useOnboarding.ts` | logger |
| `src/hooks/useAdminJourneys.ts` | logger |
| `src/contexts/AuthContext.tsx` | logger |
| `src/pages/Home.tsx` | useCallback |
| `src/components/dashboard/GardenWidget.tsx` | useReducedMotion |
| `src/index.css` | Remover duplicatas |
| `tailwind.config.ts` | Consolidar keyframes |

---

## Metricas de Sucesso

| Metrica | Antes | Depois (Esperado) |
|---------|-------|-------------------|
| Console logs em prod | 356 ocorrencias | 0 |
| Queries sem staleTime | ~15 | 0 |
| CSS duplicado | ~200 linhas | 0 |
| Lighthouse Performance | ~75 | >85 |
| First Contentful Paint | ~2.5s | <2s |

---

## Ordem de Implementacao

```text
1. Seguranca (Critico)
   ├── Habilitar Leaked Password Protection
   └── Substituir console.log por logger

2. Performance de Rede (Alto Impacto)
   ├── Configurar staleTime em todas as queries
   └── Otimizar useInsightsData

3. Qualidade de Codigo (Medio Impacto)
   ├── Adicionar useCallback nos handlers
   └── Memoizar calculos pesados

4. CSS/Bundle (Medio Impacto)
   ├── Remover keyframes duplicados
   └── Consolidar variaveis CSS

5. UX (Polimento)
   ├── Error boundaries especificos
   └── Retry automatico
```

---

## Secao Tecnica

### Calculo de staleTime Recomendado

| Tipo de Dado | Frequencia de Mudanca | staleTime |
|--------------|----------------------|-----------|
| Conteudo estatico (tecnicas, meditacoes) | Raramente | 10+ minutos |
| Dados do usuario (favoritos, jornadas) | Frequente mas controlado | 5 minutos |
| Dados em tempo real (emocoes, diario) | Frequente | 1-2 minutos |
| Estatisticas agregadas | Periodicamente | 5 minutos |

### Estrutura do Logger

```typescript
// src/lib/logger.ts (existente)
const logger = {
  log: (...args) => isDevelopment && console.log(...args),
  warn: (...args) => isDevelopment && console.warn(...args),
  error: (...args) => {
    console.error(...args);
    // Futuramente: enviar para servico de monitoramento
  },
  debug: (...args) => isDevelopment && console.debug(...args),
};
```

### Pattern para Queries Otimizadas

```typescript
// Template para hooks otimizados
export function useOptimizedQuery<T>(queryKey: string[], queryFn: () => Promise<T>) {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: [...queryKey, user?.id],
    queryFn,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,    // 5 minutos
    gcTime: 10 * 60 * 1000,      // 10 minutos
    retry: 2,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 10000),
  });
}
```
