
# Plano: Correção do Botão Salvar + Persistência de Rascunho

## Problemas Identificados

### 1. Botão "Salvar" Invisível no Passo 5
Analisando a screenshot e o código (linhas 608-631), identifiquei o problema:
- O footer está **dentro** da estrutura do modal, mas a div scrollável (linha 297) fecha na linha 606
- O footer está **FORA** da área scrollável, o que é correto
- **Porém**, o footer usa `margin-bottom: max(env(...), 0px)` que pode ser insuficiente em alguns dispositivos Android

O problema real: o modal tem `max-h-[min(92dvh,92vh)]` e `mb-[max(env(safe-area-inset-bottom,24px),24px)]`, mas o footer pode estar sendo "empurrado para fora" da viewport visível.

### 2. Perda de Progresso ao Sair do App
O usuário escolheu **"Restaurar automaticamente"**: se o check-in estiver após o passo 3, ao reabrir o modal ele deve retomar de onde parou.

---

## Solução 1: Corrigir Visibilidade do Footer

### Arquivo: `src/components/nutrition/MealCheckModal.tsx`

**Mudanças:**
1. Remover `marginBottom` inline que pode causar conflito
2. Usar classes Tailwind consistentes para safe-area
3. Adicionar padding-bottom interno ao content para dar espaço ao footer
4. Garantir que o footer tenha altura fixa e não seja cortado

```tsx
// Atual (problemático)
<div className="flex-shrink-0 px-5 pt-3 pb-5 border-t ..." 
     style={{ marginBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)' }}>

// Corrigido
<div className="flex-shrink-0 px-5 pt-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] border-t ...">
```

**Ajuste estrutural:**
- Adicionar `pb-20` ao container scrollável para garantir que o conteúdo não fique escondido atrás do footer

---

## Solução 2: Persistência Automática de Rascunho

### Arquivo: `src/hooks/useNutritionDraft.ts` (NOVO)

Hook dedicado para gerenciar o rascunho no `localStorage`:

```typescript
interface NutritionDraft {
  step: Step;
  selectedMood: string | null;
  selectedHunger: string | null;
  selectedCategory: string | null;
  selectedEnergy: string | null;
  notes: string;
  savedAt: number; // timestamp para expirar após 1 hora
}

export function useNutritionDraft() {
  const STORAGE_KEY = 'nutrition-check-in-draft';
  const EXPIRY_MS = 60 * 60 * 1000; // 1 hora

  const saveDraft = (data: Omit<NutritionDraft, 'savedAt'>) => {...}
  const loadDraft = (): NutritionDraft | null => {...}
  const clearDraft = () => {...}
  const hasDraft = (): boolean => {...}
  
  return { saveDraft, loadDraft, clearDraft, hasDraft };
}
```

### Arquivo: `src/components/nutrition/MealCheckModal.tsx`

**Integração do hook:**

1. **No mount do modal**: verificar se há rascunho válido e restaurar automaticamente
2. **A cada mudança de step (após step 3)**: salvar rascunho automaticamente
3. **Ao completar o registro**: limpar rascunho
4. **Ao fechar o modal**: se estiver após step 3, salvar rascunho antes de fechar

```tsx
// Ao abrir o modal
useEffect(() => {
  if (isOpen) {
    const draft = loadDraft();
    if (draft && ['category', 'energy', 'notes'].includes(draft.step)) {
      // Restaurar estado
      setStep(draft.step);
      setSelectedMood(draft.selectedMood);
      // ... etc
    }
  }
}, [isOpen]);

// Salvar automaticamente após step 3
useEffect(() => {
  if (['category', 'energy', 'notes'].includes(step) && hasData) {
    saveDraft({ step, selectedMood, selectedHunger, selectedCategory, selectedEnergy, notes });
  }
}, [step, selectedMood, selectedHunger, selectedCategory, selectedEnergy, notes]);
```

---

## Resumo das Mudanças

| Arquivo | Mudança |
|---------|---------|
| `src/hooks/useNutritionDraft.ts` | NOVO - hook para persistência em localStorage |
| `src/components/nutrition/MealCheckModal.tsx` | Corrigir footer visibility + integrar draft persistence |

---

## Fluxo do Usuário

1. Usuário abre modal de Alimentação Consciente
2. Preenche Humor (step 1) → Fome (step 2) → Refeição (step 3)
3. **App em background ou fechado acidentalmente**
4. Ao reabrir o modal: "Continuando de onde você parou..." + restaura no step 3 ou posterior
5. Usuário completa e salva → rascunho é limpo

---

## Seção Técnica

### Dependências
- Nenhuma nova dependência

### Padrões a Seguir
- localStorage com prefixo `nutrition-check-in-draft`
- Expiração de 1 hora para rascunhos
- Safe-area usando CSS `env()` dentro de Tailwind `pb-[...]`

### Testes Recomendados
1. Abrir modal, ir até step 5, verificar se botão "Salvar" está visível
2. Ir até step 4, fechar o app, reabrir e verificar restauração automática
3. Completar registro e verificar que rascunho foi limpo
4. Testar em Android Chrome (browser normal) e iOS Safari
