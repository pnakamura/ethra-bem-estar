

# Plano: Corrigir Visibilidade do Botão Salvar

## Diagnóstico do Problema

Após análise detalhada da screenshot e do código, identifiquei a causa raiz:

**O footer está posicionado corretamente FORA da área scrollável, mas a altura combinada de todos os elementos excede o espaço disponível na viewport.**

### Estrutura Atual
```text
┌─────────────────────────────────────────┐
│ Drag Indicator (pt-3 pb-1)              │
├─────────────────────────────────────────┤
│ Header (sticky, ~70px)                   │
├─────────────────────────────────────────┤
│ Content (flex-1 overflow-y-auto)         │
│   └── Progress bars + labels (~50px)     │
│   └── Title (~30px)                      │
│   └── Step content (textarea, tags)      │
│   └── SEM padding-bottom extra           │  ← PROBLEMA
├─────────────────────────────────────────┤
│ Footer (flex-shrink-0, ~100px)           │  ← CORTADO!
│   └── Texto explicativo                  │
│   └── Botão "Salvar Registro"            │
└─────────────────────────────────────────┘
max-h = 88dvh (não deixa espaço suficiente)
```

### Causa
O `flex-1` no container de conteúdo está "empurrando" o footer para baixo, ultrapassando o limite de `max-h-[min(88dvh,88vh)]`. No dispositivo mostrado na screenshot, o footer fica parcialmente visível (texto sim, botão não).

---

## Solução

### 1. Reduzir max-height do modal e adicionar estrutura mais rígida

Mudar de `max-h-[min(88dvh,88vh)]` para `max-h-[85dvh]` para garantir mais margem.

### 2. Adicionar padding-bottom ao conteúdo scrollável

Garantir que o conteúdo tenha espaço interno para não competir com o footer.

### 3. Usar altura fixa para o footer (não flex)

Evitar que o footer seja "comprimido" ou "empurrado" para fora.

### 4. Remover o inline style de paddingBottom problemático

O `style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 20px))' }}` pode não funcionar corretamente em todos os navegadores. Usar classe Tailwind com fallback.

---

## Mudanças Específicas

### Arquivo: `src/components/nutrition/MealCheckModal.tsx`

**Linha 296-300 - Ajustar container do modal:**
```tsx
// DE:
className={cn(
  "relative w-full max-w-lg flex flex-col overflow-hidden bg-card rounded-t-3xl shadow-xl border-t border-border/50",
  "max-h-[min(88dvh,88vh)]"
)}
style={{ marginBottom: 'max(env(safe-area-inset-bottom, 0px), 0px)' }}

// PARA:
className={cn(
  "relative w-full max-w-lg flex flex-col bg-card rounded-t-3xl shadow-xl border-t border-border/50",
  "max-h-[85dvh]"
)}
// Remover o style inline
```

**Linha 338 - Adicionar padding-bottom ao conteúdo:**
```tsx
// DE:
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4">

// PARA:
<div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 pb-6">
```

**Linhas 651-653 - Simplificar footer:**
```tsx
// DE:
<div 
  className="flex-shrink-0 px-5 pt-3 border-t border-border/30 bg-card shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-[130]"
  style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom, 20px))' }}
>

// PARA:
<div className="flex-shrink-0 px-5 pt-3 pb-6 border-t border-border/30 bg-card shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-[130] safe-area-bottom">
```

**Adicionar classe CSS para safe-area (se não existir):**
No index.css:
```css
.safe-area-bottom {
  padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 1.5rem));
}
```

---

## Arquivos Afetados

| Arquivo | Mudança |
|---------|---------|
| `src/components/nutrition/MealCheckModal.tsx` | Ajustar max-height, padding-bottom e footer |
| `src/index.css` | Adicionar classe `.safe-area-bottom` (se necessário) |

---

## Resultado Esperado

```text
┌─────────────────────────────────────────┐
│ Drag Indicator                          │
├─────────────────────────────────────────┤
│ Header                                   │
├─────────────────────────────────────────┤
│ Content (scrollable, com pb-6)           │
│   └── ...                                │
│   └── Espaço extra no final              │
├─────────────────────────────────────────┤
│ Footer (SEMPRE visível)                  │
│   └── Texto explicativo ✓                │
│   └── Botão "Salvar Registro" ✓          │
└─────────────────────────────────────────┘
max-h = 85dvh (com margem de segurança)
```

---

## Testes Recomendados
1. Abrir modal de nutrição no Android Chrome e verificar se o botão "Salvar" está visível no passo 5
2. Testar com teclado virtual aberto (digitando notas)
3. Testar em diferentes tamanhos de tela
4. Verificar que o conteúdo ainda é scrollável quando necessário

