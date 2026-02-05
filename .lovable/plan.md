
# Plano: Aumentar Destaque Visual no Dark Mode ✅ CONCLUÍDO

## Alterações Implementadas

### CSS (`index.css`)
- Adicionadas classes `.quick-action-card` com bordas visíveis (0.5 opacity) e box-shadow em dark mode
- Classe `.bottom-nav` com bordas mais definidas e elevação
- Classe `.section-title` com melhor contraste de texto
- Classe `.section-indicator` com glow para o ponto indicador
- Classe `.garden-widget` com bordas e shadow aprimorados
- Classe `.daily-guidance-card` com glow dourado sutil
- Classes `.icon-glow-*` para cada cor (joy, calm, meditate, trust, nutrition, etc.)
- Enhanced dark mode para `.guide-bubble`, `.guide-card`, `.header-blur`, `.input-area-blur`

### Componentes Modificados
- `QuickActionCard.tsx` - Aplica `.quick-action-card` + icon glow classes dinâmicas
- `BottomNavigation.tsx` - Aplica `.bottom-nav`, `.bottom-nav-bg`, `.nav-icon-active`
- `GardenWidget.tsx` - Aplica `.garden-widget`
- `DailyGuidanceCard.tsx` - Aplica `.daily-guidance-card`
- `Home.tsx` - Aplica `.section-title` e `.section-indicator` nos headers

## Resultado
- Bordas de cards visíveis (opacity 0.5-0.6)
- Navegação inferior com definição clara e shadow
- Ícones com glow colorido específico para cada ação
- Textos de seção com melhor contraste
- Ponto indicador com glow dourado
- Estética luxuosa mantida com harmonia
