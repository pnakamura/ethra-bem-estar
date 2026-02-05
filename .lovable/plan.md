# Plano: Harmonizar Dark Mode e Melhorar Contraste/Glow

## ✅ CONCLUÍDO

---

## Resumo das Alterações Realizadas

### Fase 1: CSS Classes Adicionadas (`index.css`)

Novas classes utilitárias para dark mode:
- `.guide-bubble` - Bolhas de mensagem com glow sutil
- `.user-bubble` - Bolha do usuário com gradiente
- `.guide-card` / `.guide-card-selected` - Cards de seleção de guia
- `.header-blur` / `.input-area-blur` - Áreas com blur adaptativo
- `.guide-avatar` + estados (`-thinking`, `-speaking`, `-empathic`) - Avatar com glow
- `.typing-dot` - Pontos do indicador de digitação
- `.suggestion-btn` - Botões de sugestão
- `.onboarding-card` - Cards do onboarding
- `.btn-primary-gradient` - Botão com gradiente e glow

### Fase 2: Componentes Refatorados

| Componente | Cores Hardcoded Removidas | Classes Semânticas Aplicadas |
|------------|---------------------------|------------------------------|
| `MessageBubble.tsx` | `cream-50`, `sage-*`, inline styles | `guide-bubble`, `user-bubble`, `text-foreground` |
| `GuideCard.tsx` | `cream-50/80`, `sage-*` | `guide-card`, `guide-card-selected`, `text-foreground` |
| `GuideAvatar.tsx` | Inline gradient styles | `guide-avatar`, estados dinâmicos |
| `TypingIndicator.tsx` | `rgba(95, 115, 95, *)` | `guide-bubble`, `typing-dot`, `text-muted-foreground` |
| `SuggestedQuestions.tsx` | `cream-50/80`, `sage-*` | `suggestion-btn`, `text-foreground` |

### Fase 3: Páginas Refatoradas

| Página | Alterações |
|--------|------------|
| `GuideChat.tsx` | Background `bg-background`, header `header-blur`, input `input-area-blur`, botões `btn-primary-gradient` |
| `GuideSelect.tsx` | Mesmo padrão de GuideChat, orbs com CSS variables |
| `Onboarding.tsx` | Background semântico, `onboarding-card`, botões e badges com classes utilitárias |

---

## Resultado Visual

### Light Mode
- Mantém estética original com tons cream/sage
- Contraste adequado para legibilidade
- Bordas visíveis mas sutis

### Dark Mode
- Background rich black (`--background: 30 8% 7%`)
- Textos ivory com glow sutil (`dark:text-glow`)
- Bordas com halo gold em hover (`dark:border-glow`)
- Cards com elevação sofisticada (`dark:card-elevated-dark`)
- Botões primários com glow (`dark:btn-glow-primary`)
- Orbs de fundo com opacidade reduzida (`dark:opacity-40`)

### Princípios Mantidos
- ✅ Estética luxuosa - Glows sutis, não neon
- ✅ Harmonia de cores - Acentos em champagne gold
- ✅ Legibilidade - Contraste adequado (4.5:1+)
- ✅ Consistência - Mesmo padrão em todas as páginas
