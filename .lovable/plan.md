
# Plano: Aumentar Tamanho de Fonte e Contraste no Dark Mode

## Resumo das Mudanças

O usuário deseja:
1. **Tamanhos de fonte maiores** - o "normal" atual deve ser o que é hoje "extra grande" (125%)
2. **Textos mais claros e destacados** no modo escuro

---

## Fase 1: Atualizar Escala de Fontes

### Valores Atuais vs Novos

| Opção | Valor Atual | Novo Valor |
|-------|-------------|------------|
| Normal | 100% | **125%** |
| Grande | 112% | **140%** |
| Extra | 125% | **156%** |

### Arquivos a Modificar

**`src/index.css`** - Ajustar os valores das classes CSS:
```css
/* De */
html.font-scale-normal { font-size: 100%; }
html.font-scale-large { font-size: 112%; }
html.font-scale-xlarge { font-size: 125%; }

/* Para */
html.font-scale-normal { font-size: 125%; }
html.font-scale-large { font-size: 140%; }
html.font-scale-xlarge { font-size: 156%; }
```

**`src/pages/Settings.tsx`** - Atualizar labels de porcentagem:
- Normal: "125%"
- Grande: "140%"
- Extra: "156%"

---

## Fase 2: Melhorar Contraste de Texto no Dark Mode

### Variáveis CSS a Ajustar

| Variável | Valor Atual | Novo Valor | Descrição |
|----------|-------------|------------|-----------|
| `--foreground` | `40 15% 92%` | `40 18% 96%` | Texto principal mais brilhante |
| `--muted-foreground` | `40 10% 55%` | `40 12% 68%` | Texto secundário mais visível |
| `--card-foreground` | `40 15% 92%` | `40 18% 96%` | Texto em cards |

### Novas Classes de Texto com Glow

Adicionar classes para textos importantes com destaque extra:

```css
/* Títulos com glow forte */
.dark .text-title-glow {
  color: hsl(40 20% 98%);
  text-shadow: 0 0 20px hsl(var(--primary) / 0.25);
}

/* Texto importante destacado */
.dark .text-highlight {
  color: hsl(40 18% 96%);
  text-shadow: 0 0 12px hsl(40 20% 90% / 0.15);
}

/* Texto muted com mais contraste */
.dark .text-muted-enhanced {
  color: hsl(40 12% 72%);
}
```

### Aplicar Classes aos Componentes

| Componente | Elemento | Classe a Adicionar |
|------------|----------|-------------------|
| `Home.tsx` | Títulos de seção | `dark:text-title-glow` |
| `BottomNavigation.tsx` | Labels | `dark:text-highlight` |
| `QuickActionCard.tsx` | Títulos | `dark:text-title-glow` |
| `DailyGuidanceCard.tsx` | Texto | `dark:text-highlight` |

---

## Arquivos a Modificar

| Arquivo | Alteração |
|---------|-----------|
| `src/index.css` | Aumentar font-size das escalas + novas classes de texto |
| `src/pages/Settings.tsx` | Atualizar labels de porcentagem |
| `src/pages/Home.tsx` | Aplicar classes de glow nos títulos |
| `src/components/BottomNavigation.tsx` | Melhorar contraste dos labels |
| `src/components/dashboard/QuickActionCard.tsx` | Texto mais destacado |
| `src/components/dashboard/DailyGuidanceCard.tsx` | Texto mais destacado |

---

## Comparativo Visual

```text
ANTES (Fonte Normal = 100%)          DEPOIS (Fonte Normal = 125%)
┌─────────────────────────┐         ┌─────────────────────────┐
│ Texto pequeno           │    →    │ Texto maior e           │
│ difícil de ler          │         │ mais legível            │
└─────────────────────────┘         └─────────────────────────┘

ANTES (Dark Mode Apagado)            DEPOIS (Dark Mode Brilhante)
┌─────────────────────────┐         ┌─────────────────────────┐
│ Texto cinza escuro      │    →    │ Texto ivory claro       │
│ contraste baixo         │         │ com glow sutil          │
└─────────────────────────┘         └─────────────────────────┘
```

---

## Seção Técnica

### Valores HSL do Dark Mode

**Foreground (Texto Principal)**
- Atual: `40 15% 92%` → `hsl(40, 15%, 92%)` = Ivory suave
- Novo: `40 18% 96%` → `hsl(40, 18%, 96%)` = Ivory brilhante

**Muted Foreground (Texto Secundário)**
- Atual: `40 10% 55%` → `hsl(40, 10%, 55%)` = Cinza médio
- Novo: `40 12% 68%` → `hsl(40, 12%, 68%)` = Cinza claro

### Cálculo das Novas Escalas de Fonte

O usuário quer que "normal" seja 125%. Mantendo proporção similar:

- Base (125%) × 1.12 = 140% (grande)
- Base (125%) × 1.25 = 156% (extra grande)

### Classes de Glow para Texto

```css
/* Text shadow values para destaque */
--text-glow-strong: 0 0 20px hsl(var(--primary) / 0.25);
--text-glow-soft: 0 0 12px hsl(40 20% 90% / 0.15);
```
