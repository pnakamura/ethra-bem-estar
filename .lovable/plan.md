
# Plano: Aumentar Destaque Visual no Dark Mode

## Problema Identificado

Analisando a screenshot, os elementos no dark mode carecem de definição visual:

| Elemento | Problema Atual |
|----------|----------------|
| QuickActionCard | Bordas quase invisíveis (opacity 0.15-0.3) |
| BottomNavigation | Sem contraste com o fundo |
| Cabeçalhos de seção | Texto muito apagado |
| Ícones/ilustrações | Sem glow ou destaque |
| GardenWidget | Borda sutil demais |
| DailyGuidanceCard | Falta definição no contorno |

---

## Solução Proposta

### Fase 1: Aprimorar CSS Dark Mode (`index.css`)

**Novas classes com maior destaque:**

```css
/* Cards com bordas mais visíveis e glow */
.dark .quick-action-card {
  border-color: hsl(var(--border) / 0.5);
  box-shadow: 
    0 4px 20px hsl(0 0% 0% / 0.4),
    inset 0 1px 0 hsl(var(--primary) / 0.08);
}

.dark .quick-action-card:hover {
  border-color: hsl(var(--primary) / 0.4);
  box-shadow: 
    0 8px 32px hsl(0 0% 0% / 0.5),
    0 0 25px hsl(var(--primary) / 0.12);
}

/* Navegação inferior com destaque */
.dark .bottom-nav {
  border-color: hsl(var(--border) / 0.5);
  box-shadow: 0 -4px 24px hsl(0 0% 0% / 0.4);
}

/* Texto de seção com mais contraste */
.dark .section-title {
  color: hsl(var(--muted-foreground));
  text-shadow: 0 0 20px hsl(var(--primary) / 0.2);
}

/* Ícones com glow colorido */
.dark .icon-glow-colored {
  filter: drop-shadow(0 0 10px currentColor);
}
```

### Fase 2: Aprimorar QuickActionCard

**Mudanças:**
- Aumentar opacidade das bordas de 0.15 para 0.4
- Adicionar box-shadow no dark mode
- Aplicar glow sutil nos ícones
- Borda interna com accent gold

### Fase 3: Aprimorar BottomNavigation

**Mudanças:**
- Borda superior mais visível
- Box-shadow para elevação
- Ícones ativos com glow
- Background com mais opacidade

### Fase 4: Aprimorar GardenWidget e DailyGuidanceCard

**Mudanças:**
- Bordas com mais definição
- Glow sutil no hover
- Inner shadow para profundidade

### Fase 5: Aprimorar Textos e Headers

**Mudanças:**
- Cabeçalhos de seção com mais contraste
- Text-shadow sutil em títulos importantes
- Ponto indicador com glow

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/index.css` | Novas classes de dark mode com mais contraste |
| `src/components/dashboard/QuickActionCard.tsx` | Aplicar classes de destaque |
| `src/components/BottomNavigation.tsx` | Aumentar definição visual |
| `src/components/dashboard/GardenWidget.tsx` | Bordas e glow aprimorados |
| `src/components/dashboard/DailyGuidanceCard.tsx` | Melhor contraste |
| `src/pages/Home.tsx` | Classes de seção com destaque |

---

## Comparativo Visual

```text
ANTES (Atual)                     DEPOIS (Proposto)
┌─────────────────────────┐      ┌─────────────────────────┐
│ ┌─────┐ ┌─────┐ ┌─────┐ │      │ ┌═════┐ ┌═════┐ ┌═════┐ │
│ │     │ │     │ │     │ │      │ │ ✧   │ │ ✧   │ │ ✧   │ │
│ │  ○  │ │  ○  │ │  ○  │ │  →   │ │  ○  │ │  ○  │ │  ○  │ │
│ │     │ │     │ │     │ │      │ │glow │ │glow │ │glow │ │
│ └─────┘ └─────┘ └─────┘ │      │ └═════┘ └═════┘ └═════┘ │
│                         │      │        ↑ shadow         │
│ Bordas invisíveis       │      │ Bordas + glow visíveis  │
│ Sem elevação            │      │ Elevação com sombra     │
└─────────────────────────┘      └─────────────────────────┘

Navegação:
┌─────────────────────────┐      ┌═════════════════════════┐
│ ○   ○   ○   ○   ○       │  →   │ ○   ○   ●   ○   ○       │
│ quase invisível         │      │ ↑ glow + borda visível  │
└─────────────────────────┘      └═════════════════════════┘
```

---

## Seção Técnica

### Valores de Opacidade Propostos

| Elemento | Antes | Depois |
|----------|-------|--------|
| Card border | 0.15 | 0.4-0.5 |
| Card border hover | 0.30 | 0.5-0.6 |
| Nav border | 0.40 | 0.6 |
| Icon shadow | none | 0.3-0.4 |
| Section text | 0.55 | 0.7 |

### Box-Shadow Aprimorado

```css
/* Card com elevação rica */
box-shadow: 
  0 4px 20px hsl(0 0% 0% / 0.4),      /* Sombra base */
  0 0 0 1px hsl(var(--border) / 0.3), /* Borda interna */
  inset 0 1px 0 hsl(var(--primary) / 0.06); /* Highlight top */

/* Hover com glow gold */
box-shadow: 
  0 8px 32px hsl(0 0% 0% / 0.5),
  0 0 30px hsl(var(--primary) / 0.1);
```

### Glow em Ícones Coloridos

```css
/* Aplicar em cada cor de ícone */
.dark .icon-joy { filter: drop-shadow(0 0 8px hsl(var(--joy) / 0.5)); }
.dark .icon-calm { filter: drop-shadow(0 0 8px hsl(var(--calm) / 0.5)); }
/* etc... */
```

---

## Resultado Esperado

- Cards claramente delimitados contra o fundo escuro
- Ícones com presença visual através de glow colorido
- Navegação inferior com definição clara
- Textos de seção legíveis e destacados
- Estética luxuosa mantida (não neon, apenas refinado)
- Harmonia geral preservada com acentos gold
