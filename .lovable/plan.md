
# Plano: Corrigir Layout Truncado do GardenWidget em Mobile

## Problema Identificado

O widget de gamificação (GardenWidget) exibe elementos truncados e sobrepostos em telas mobile devido ao layout de 3 colunas que não se adapta a telas estreitas (< 375px).

**Elementos afetados:**
- "0 dias" sobreposto com "Nv. 1"
- Nome do estágio truncado ("S...")
- Barra de progresso comprimida
- "Max: 0" sobreposto

---

## Solução Proposta

Reestruturar o layout do GardenWidget para ser responsivo, empilhando elementos verticalmente em telas pequenas.

### Estrutura Atual (Problemática)
```text
┌─────────────────────────────────────┐
│ [Planta] [Stats------] [MiniStats] │  ← 3 colunas horizontais
└─────────────────────────────────────┘
```

### Nova Estrutura (Mobile-First)
```text
┌─────────────────────────────────────┐
│ [Planta]  [Streak + Nível]         │  ← Linha 1: Info principal
│ [Stage name + message-------------]│  ← Linha 2: Descrição full-width
│ [Progress bar--------------------] │  ← Linha 3: Progresso full-width
│ [Max streak] [Points]              │  ← Linha 4: Stats secundários
└─────────────────────────────────────┘
```

---

## Alterações Técnicas

### 1. Reestruturar GardenWidget.tsx

**Mudanças principais:**
- Converter layout de 3 colunas para layout em linhas empilhadas
- Mover estatísticas secundárias (Nv., pts, Max) para uma linha inferior
- Garantir que textos longos tenham espaço adequado
- Usar `flex-wrap` para permitir quebra em telas pequenas

### 2. Corrigir Erro de Build (Bônus)

Os erros de TypeScript em `Home.tsx` e `AnimationStudio.tsx` são causados por `ease: [0.16, 1, 0.3, 1]` (cubic bezier como array) que não é compatível com o tipo `Variants` do Framer Motion.

**Solução:** Usar `ease: "easeOut"` ou definir como `as const` para type assertion.

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/components/dashboard/GardenWidget.tsx` | Reestruturar layout para mobile-first |
| `src/pages/Home.tsx` | Corrigir tipo de `itemVariants.ease` |
| `src/pages/AnimationStudio.tsx` | Corrigir tipo de `ease` nos variants |

---

## Resultado Esperado

- Widget de gamificação legível em todas as telas mobile (320px+)
- Sem truncamento ou sobreposição de texto
- Build sem erros TypeScript
- Mantém visual original em telas maiores
