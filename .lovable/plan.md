
# Plano: Harmonizar Dark Mode e Melhorar Contraste/Glow

## Problema Identificado

### 1. Inconsistência de Cores entre Páginas

A página `/guide` e seus componentes usam **cores hardcoded** que não adaptam ao dark mode, enquanto outras páginas como Home usam variáveis semânticas corretamente.

**Páginas com cores hardcoded (NÃO funcionam em dark mode):**
- `GuideChat.tsx` - Background, header, textos, bordas
- `GuideSelect.tsx` - Mesmo padrão
- `MessageBubble.tsx` - Bolhas de mensagem
- `GuideCard.tsx` - Cards de seleção
- `TypingIndicator.tsx` - Indicador de digitação
- `SuggestedQuestions.tsx` - Sugestões
- `Onboarding.tsx` - Telas de onboarding

**Exemplo do problema:**
```text
┌─────────────────────────────────────────┐
│ GuideChat.tsx (ERRADO - Hardcoded)      │
├─────────────────────────────────────────┤
│ bg-gradient-to-br from-cream-50...      │ ← Não muda em dark
│ text-sage-900                           │ ← Sempre escuro
│ border-sage-300/30                      │ ← Sempre claro
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Home.tsx (CORRETO - Variáveis)          │
├─────────────────────────────────────────┤
│ bg-background                           │ ← Adapta ao tema
│ text-foreground                         │ ← Adapta ao tema
│ border-border/40                        │ ← Adapta ao tema
└─────────────────────────────────────────┘
```

### 2. Contraste e Glow Insuficientes no Dark Mode

O CSS já define classes de glow elegantes:
- `.dark .text-glow` - Brilho sutil em textos
- `.dark .border-glow` - Brilho em bordas
- `.dark .card-glow` - Brilho em cards
- `.dark .btn-glow-primary` - Brilho em botões

**Porém estas classes NÃO estão sendo aplicadas nos componentes!**

---

## Solução Proposta

### Fase 1: Refatorar Cores para Variáveis Semânticas

**Mapeamento de cores:**

| De (Hardcoded)        | Para (Semântico)                          |
|-----------------------|-------------------------------------------|
| `bg-cream-50`         | `bg-card` ou `bg-background`              |
| `text-sage-900`       | `text-foreground`                         |
| `text-sage-600/700`   | `text-muted-foreground`                   |
| `border-sage-xxx`     | `border-border` com dark variants         |
| Gradients inline      | CSS variables ou dark: variants           |

### Fase 2: Adicionar Efeitos de Glow e Contraste

**Cards e containers:**
```tsx
// Antes
className="bg-cream-50/80 border-sage-300/30"

// Depois
className="bg-card/90 border-border/50 dark:border-border/30 dark:card-glow"
```

**Textos importantes:**
```tsx
// Antes
className="text-sage-900"

// Depois  
className="text-foreground dark:text-glow"
```

**Botões primários:**
```tsx
// Antes
style={{ background: 'linear-gradient(135deg, #7d8f7d...)' }}

// Depois
className="bg-gradient-to-br from-secondary to-secondary/80 dark:btn-glow-primary"
```

### Fase 3: Melhorar Definição Visual no Dark Mode

**Adicionar ao CSS (`index.css`):**
```css
/* Enhanced Dark Mode Borders */
.dark .border-enhanced {
  border-color: hsl(var(--border) / 0.4);
  box-shadow: inset 0 0 0 1px hsl(var(--primary) / 0.05);
}

/* Subtle Card Elevation in Dark */
.dark .card-elevated-dark {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border) / 0.3);
  box-shadow: 
    0 4px 20px hsl(0 0% 0% / 0.3),
    0 0 0 1px hsl(var(--primary) / 0.05);
}

/* Guide-specific accent for message bubbles */
.dark .guide-bubble {
  background: hsl(var(--card) / 0.95);
  border: 1px solid hsl(var(--border) / 0.25);
  box-shadow: 
    0 2px 12px hsl(0 0% 0% / 0.25),
    0 0 20px hsl(var(--secondary) / 0.05);
}
```

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/index.css` | Adicionar novas classes de dark mode |
| `src/pages/GuideChat.tsx` | Refatorar cores para variáveis semânticas |
| `src/pages/GuideSelect.tsx` | Refatorar cores para variáveis semânticas |
| `src/components/guide/MessageBubble.tsx` | Aplicar dark mode + glow |
| `src/components/guide/GuideCard.tsx` | Aplicar dark mode + glow |
| `src/components/guide/GuideAvatar.tsx` | Usar variáveis CSS |
| `src/components/guide/TypingIndicator.tsx` | Aplicar dark mode |
| `src/components/guide/SuggestedQuestions.tsx` | Aplicar dark mode |
| `src/pages/Onboarding.tsx` | Refatorar cores hardcoded |

---

## Resultado Esperado

### Visual em Dark Mode

```text
ANTES                           DEPOIS
┌─────────────────┐            ┌─────────────────┐
│ Fundo claro     │   →        │ Fundo escuro    │
│ fixo (cream)    │            │ rico (charcoal) │
├─────────────────┤            ├─────────────────┤
│ Textos escuros  │   →        │ Textos claros   │
│ baixo contraste │            │ com glow sutil  │
├─────────────────┤            ├─────────────────┤
│ Bordas quase    │   →        │ Bordas visíveis │
│ invisíveis      │            │ com halo gold   │
├─────────────────┤            ├─────────────────┤
│ Botões sem      │   →        │ Botões com      │
│ destaque        │            │ glow elegante   │
└─────────────────┘            └─────────────────┘
```

### Princípios Mantidos

- **Estética luxuosa** - Glows sutis, não neon
- **Harmonia de cores** - Acentos em champagne gold
- **Legibilidade** - Contraste adequado (4.5:1+)
- **Consistência** - Mesmo padrão em todas as páginas

---

## Seção Técnica

### Variáveis CSS Utilizadas

```css
/* Dark mode colors from index.css */
--background: 30 8% 7%;        /* Rich black */
--foreground: 40 15% 92%;      /* Soft ivory */
--card: 30 8% 10%;             /* Slightly lighter */
--border: 30 8% 18%;           /* Visible borders */
--primary: 40 55% 58%;         /* Luminous gold */
--secondary: 90 18% 50%;       /* Soft sage */
```

### Classes de Glow Existentes

```css
.dark .text-glow { text-shadow: var(--text-glow-primary); }
.dark .border-glow { box-shadow: var(--border-glow); }
.dark .card-glow:hover { box-shadow: var(--glow-primary); }
.dark .btn-glow-primary { box-shadow: 0 0 20px hsl(var(--primary) / 0.15); }
```

### Estratégia de Gradientes

Para os gradientes inline que usam `#7d8f7d` e `#5f735f`, criar:

```css
.gradient-guide {
  background: linear-gradient(135deg, 
    hsl(var(--secondary)) 0%, 
    hsl(var(--secondary) / 0.8) 100%
  );
}

.dark .gradient-guide {
  background: linear-gradient(135deg, 
    hsl(var(--secondary) / 0.9) 0%, 
    hsl(var(--secondary) / 0.7) 100%
  );
  box-shadow: 0 4px 20px hsl(var(--secondary) / 0.15);
}
```
