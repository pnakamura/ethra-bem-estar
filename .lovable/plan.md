

# Plano: Correção Definitiva do Botão Salvar e Restauração

## Problemas Identificados

### 1. Botão "Salvar" não aparece na etapa 5
Analisando o código, o botão **está no lugar certo** (linhas 651-664, dentro do step `notes`), logo após a textarea. Se você chega na etapa 5 e vê a textarea mas não vê o botão, o problema é de **scroll/visibilidade**:

- O container scrollável (`flex-1 min-h-0 overflow-y-auto`) pode não estar dando espaço suficiente para mostrar o botão
- A altura do modal (`max-h-[80dvh]`) combinada com todos os elementos internos pode estar causando o botão ficar "cortado"

**Solução**: Adicionar `pb-24` (padding-bottom) ao container scrollável para garantir que o botão tenha espaço e seja visível sem precisar rolar até o fim.

### 2. Restauração voltando para etapa 3 (deveria ser 4)
A lógica atual (linhas 126-134):
```tsx
if (draft.selectedEnergy && !hasNotes) {
  restoreStep = 'energy';
}
...
if (restoreStep === 'energy' && !draft.selectedEnergy) {
  restoreStep = 'category';  // <-- ESTE É O BUG!
}
```

O problema é que **`draft.selectedEnergy` está chegando como `null`** na restauração, fazendo a segunda condição cair em `category`.

Por que `selectedEnergy` está null no draft?
- No `handleEnergySelect`, o draft é salvo ANTES do `setSelectedEnergy` atualizar o estado
- O `saveDraft` está usando `selectedEnergy` do estado atual (que ainda é null) em vez do `energyId` recém-selecionado

**Olhando linha 200-206**:
```tsx
saveDraft({
  step: 'energy',
  ...
  selectedEnergy: energyId,  // ✓ Correto, usa energyId
  ...
});
```

Mas o auto-save (linhas 148-162) pode estar sobrescrevendo logo em seguida com o estado anterior!

**Causa raiz**: O `useEffect` de auto-save roda quando `step` muda. Quando `goToStep('notes')` é chamado, o auto-save detecta `step='notes'` mas o estado `selectedEnergy` ainda não foi atualizado pelo React, então salva com `selectedEnergy: null`.

---

## Soluções

### Solução 1: Garantir visibilidade do botão
Adicionar padding-bottom suficiente ao container scrollável para garantir que o botão sempre apareça:

**Arquivo**: `src/components/nutrition/MealCheckModal.tsx`  
**Linha 377**:
```tsx
// DE:
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">

// PARA:
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 pb-24">
```

### Solução 2: Corrigir a lógica de auto-save para não sobrescrever
O problema é que o auto-save usa o estado `selectedEnergy` que ainda não foi atualizado. Precisamos:

1. **Desabilitar auto-save no step `notes` quando `selectedEnergy` está null**
2. **OU** Confiar apenas no save explícito do `handleEnergySelect` e não deixar o auto-save sobrescrever

**Mudança no auto-save (linhas 148-162)**:
```tsx
useEffect(() => {
  // Só salvar se temos dados válidos para o step atual
  if (['category', 'energy', 'notes'].includes(step) && hasData) {
    // NÃO SALVAR se estamos em notes/energy mas selectedEnergy está null
    // (significa que o estado ainda não foi atualizado)
    if ((step === 'notes' || step === 'energy') && !selectedEnergy) {
      return; // Não sobrescrever - o handleEnergySelect já salvou corretamente
    }
    
    const stepToSave = (step === 'notes' && !notes.trim()) ? 'energy' : step;
    
    saveDraft({...});
  }
}, [...]);
```

### Solução 3: Simplificar a lógica de restauração
Remover a condição que manda para `category` quando `selectedEnergy` está null no step `energy`, pois isso não deveria acontecer:

**Mudança na restauração (linhas 131-135)**:
```tsx
// REMOVER esta condição:
// if (restoreStep === 'energy' && !draft.selectedEnergy) {
//   restoreStep = 'category';
// }

// NOVA LÓGICA MAIS SIMPLES:
// Se o draft indica 'energy' ou 'notes' mas não tem selectedEnergy válido,
// mantemos em 'energy' e deixamos o usuário selecionar novamente
```

---

## Mudanças Específicas

### Arquivo: `src/components/nutrition/MealCheckModal.tsx`

**Mudança 1 - Padding para visibilidade (linha 377)**:
```tsx
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 pb-24">
```

**Mudança 2 - Auto-save não sobrescreve quando selectedEnergy é null (linhas 148-162)**:
```tsx
useEffect(() => {
  if (['category', 'energy', 'notes'].includes(step) && hasData) {
    // Prevenir que o auto-save sobrescreva o draft quando
    // estamos em notes/energy mas selectedEnergy ainda não foi atualizado
    if ((step === 'notes' || step === 'energy') && !selectedEnergy) {
      return;
    }
    
    const stepToSave = (step === 'notes' && !notes.trim()) ? 'energy' : step;
    
    saveDraft({
      step: stepToSave,
      selectedMood,
      selectedHunger,
      selectedCategory,
      selectedEnergy,
      notes,
    });
  }
}, [step, selectedMood, selectedHunger, selectedCategory, selectedEnergy, notes, hasData, saveDraft]);
```

**Mudança 3 - Remover fallback para category na restauração (linhas 131-135)**:
```tsx
// Remover estas linhas:
// if (restoreStep === 'energy' && !draft.selectedEnergy) {
//   restoreStep = 'category';
// }
```

---

## Arquivos Afetados
| Arquivo | Mudança |
|---------|---------|
| `src/components/nutrition/MealCheckModal.tsx` | Adicionar pb-24, corrigir auto-save, simplificar restauração |

---

## Checklist de Validação
1. Abrir modal → ir até step 5: botão "Salvar Registro" **visível sem precisar rolar**
2. Ir até step 4 → selecionar energia → fechar imediatamente → reabrir: deve voltar em **step 4 (Energia)**
3. Escrever nota no step 5 → fechar → reabrir: pode voltar em **step 5**
4. Step 3 → selecionar categoria → fechar → reabrir: deve voltar em **step 3 (Refeição)**

