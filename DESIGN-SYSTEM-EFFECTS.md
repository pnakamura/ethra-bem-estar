# 🎨 Design System - Efeitos Visuais

> **Prompt para redesign de bordas, sombras, glows e efeitos visuais**  
> Mantenha as cores existentes, redefina completamente os efeitos.

---

## 📋 Índice

1. [Objetivo](#objetivo)
2. [Cores a Manter](#cores-a-manter)
3. [Shadows](#shadows)
4. [Borders & Border-Radius](#borders--border-radius)
5. [Glow Effects](#glow-effects)
6. [Glass Effects](#glass-effects)
7. [Gradients](#gradients)
8. [Keyframe Animations](#keyframe-animations)
9. [Component Styles](#component-styles)
10. [Tailwind Config](#tailwind-config)
11. [Diretrizes de Estilo](#diretrizes-de-estilo)
12. [Checklist de Implementação](#checklist-de-implementação)

---

## Objetivo

Redesenhar completamente a parte visual de **efeitos** do aplicativo, mantendo a paleta de cores existente. O objetivo é criar uma experiência visual coesa, elegante no modo claro e vibrante/neon no modo escuro.

**IMPORTANTE:** Não altere as cores da paleta. Apenas redefina:
- Sombras (shadows)
- Bordas (borders & border-radius)
- Efeitos de brilho (glow)
- Efeitos de vidro (glass)
- Gradientes
- Animações (keyframes)
- Classes utilitárias de efeitos

---

## Cores a Manter

### Light Mode (`:root`)

```css
:root {
  /* Paleta Base */
  --background: 0 0% 98%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 174 62% 47%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 174 62% 47%;

  /* Cores Emocionais */
  --calm: 171 47% 53%;
  --energy: 15 75% 60%;
  --grounding: 200 35% 23%;
  --panic: 0 70% 50%;
  --meditate: 260 60% 65%;
  --nutrition: 142 71% 45%;
  --water: 199 89% 48%;

  /* Plutchik */
  --joy: 45 93% 58%;
  --trust: 142 71% 45%;
  --fear: 263 70% 58%;
  --surprise: 33 100% 50%;
  --sadness: 217 91% 60%;
  --disgust: 158 64% 40%;
  --anger: 0 84% 60%;
  --anticipation: 24 95% 53%;

  /* Onboarding */
  --onboarding-primary: 270 70% 60%;
  --onboarding-secondary: 280 65% 55%;
  --onboarding-accent: 290 60% 65%;
  --onboarding-glow: 275 80% 70%;
}
```

### Dark Mode (`.dark`)

```css
.dark {
  /* Paleta Base */
  --background: 240 10% 6%;
  --foreground: 0 0% 95%;
  --card: 240 10% 9%;
  --card-foreground: 0 0% 95%;
  --popover: 240 10% 9%;
  --popover-foreground: 0 0% 95%;
  --primary: 174 72% 50%;
  --primary-foreground: 240 10% 6%;
  --secondary: 240 5% 18%;
  --secondary-foreground: 0 0% 95%;
  --muted: 240 5% 18%;
  --muted-foreground: 240 5% 60%;
  --accent: 280 70% 55%;
  --accent-foreground: 0 0% 98%;
  --destructive: 0 70% 50%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5% 20%;
  --input: 240 5% 20%;
  --ring: 174 72% 50%;

  /* Cores Emocionais */
  --calm: 174 72% 50%;
  --energy: 15 85% 60%;
  --grounding: 200 45% 35%;
  --panic: 0 80% 55%;
  --meditate: 280 70% 60%;
  --nutrition: 142 76% 45%;
  --water: 199 92% 55%;

  /* Plutchik */
  --joy: 45 95% 60%;
  --trust: 142 76% 50%;
  --fear: 270 80% 65%;
  --surprise: 33 100% 55%;
  --sadness: 217 95% 65%;
  --disgust: 158 70% 45%;
  --anger: 0 85% 60%;
  --anticipation: 24 98% 55%;

  /* Paleta Neon */
  --neon-teal: 174 90% 50%;
  --neon-purple: 280 90% 60%;
  --neon-magenta: 320 90% 55%;
  --neon-cyan: 185 95% 55%;
  --neon-orange: 25 95% 55%;
  --neon-green: 145 90% 50%;
}
```

---

## Shadows

### Light Mode

```css
:root {
  /* Sombras Suaves e Elegantes */
  --shadow-xs: 0 1px 2px 0 hsl(0 0% 0% / 0.03);
  --shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.05), 
               0 1px 2px -1px hsl(0 0% 0% / 0.05);
  --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.07), 
               0 2px 4px -2px hsl(0 0% 0% / 0.05);
  --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.08), 
               0 4px 6px -4px hsl(0 0% 0% / 0.05);
  --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.08), 
               0 8px 10px -6px hsl(0 0% 0% / 0.04);
  --shadow-2xl: 0 25px 50px -12px hsl(0 0% 0% / 0.15);
  
  /* Sombras Coloridas (Sutis) */
  --shadow-primary: 0 4px 14px -3px hsl(var(--primary) / 0.25);
  --shadow-accent: 0 4px 14px -3px hsl(var(--accent) / 0.20);
  
  /* Sombra Interna */
  --shadow-inner: inset 0 2px 4px 0 hsl(0 0% 0% / 0.05);
}
```

### Dark Mode

```css
.dark {
  /* Sombras Profundas com Brilho Sutil */
  --shadow-xs: 0 1px 2px 0 hsl(0 0% 0% / 0.2);
  --shadow-sm: 0 1px 3px 0 hsl(0 0% 0% / 0.3), 
               0 1px 2px -1px hsl(0 0% 0% / 0.25);
  --shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.4), 
               0 2px 4px -2px hsl(0 0% 0% / 0.3);
  --shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.5), 
               0 4px 6px -4px hsl(0 0% 0% / 0.35);
  --shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.6), 
               0 8px 10px -6px hsl(0 0% 0% / 0.4);
  --shadow-2xl: 0 25px 50px -12px hsl(0 0% 0% / 0.7);
  
  /* Sombras Neon/Glow */
  --shadow-glow: 0 0 15px hsl(var(--primary) / 0.3),
                 0 0 30px hsl(var(--primary) / 0.15);
  --shadow-glow-strong: 0 0 20px hsl(var(--primary) / 0.5),
                        0 0 40px hsl(var(--primary) / 0.25),
                        0 0 60px hsl(var(--primary) / 0.1);
  --shadow-glow-purple: 0 0 15px hsl(var(--neon-purple) / 0.4),
                        0 0 30px hsl(var(--neon-purple) / 0.2);
  --shadow-glow-magenta: 0 0 15px hsl(var(--neon-magenta) / 0.4),
                         0 0 30px hsl(var(--neon-magenta) / 0.2);
  
  /* Sombra Interna Escura */
  --shadow-inner: inset 0 2px 4px 0 hsl(0 0% 0% / 0.3);
}
```

---

## Borders & Border-Radius

```css
:root {
  /* Border Radius */
  --radius-none: 0;
  --radius-sm: 0.375rem;    /* 6px */
  --radius-md: 0.5rem;      /* 8px */
  --radius-lg: 0.75rem;     /* 12px */
  --radius-xl: 1rem;        /* 16px */
  --radius-2xl: 1.5rem;     /* 24px */
  --radius-3xl: 2rem;       /* 32px */
  --radius-full: 9999px;
  
  /* Border Width */
  --border-thin: 1px;
  --border-medium: 2px;
  --border-thick: 3px;
}

/* Bordas com Gradiente (Dark Mode) */
.dark {
  --border-gradient: linear-gradient(
    135deg,
    hsl(var(--primary) / 0.5),
    hsl(var(--accent) / 0.5)
  );
}
```

### Classes de Borda

```css
/* Borda Sutil */
.border-subtle {
  border: 1px solid hsl(var(--border) / 0.5);
}

/* Borda com Glow (Dark Mode) */
.dark .border-glow {
  border: 1px solid hsl(var(--primary) / 0.3);
  box-shadow: 0 0 10px hsl(var(--primary) / 0.15);
}

/* Borda Gradiente */
.border-gradient {
  position: relative;
  border: none;
  background: linear-gradient(var(--card), var(--card)) padding-box,
              linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))) border-box;
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
}
```

---

## Glow Effects

### Variáveis CSS (Dark Mode)

```css
.dark {
  /* Glow Base */
  --glow-primary: 0 0 20px hsl(var(--primary) / 0.4);
  --glow-secondary: 0 0 20px hsl(var(--secondary) / 0.3);
  --glow-accent: 0 0 20px hsl(var(--accent) / 0.4);
  
  /* Glow Neon */
  --glow-purple: 0 0 25px hsl(var(--neon-purple) / 0.5);
  --glow-magenta: 0 0 25px hsl(var(--neon-magenta) / 0.5);
  --glow-cyan: 0 0 25px hsl(var(--neon-cyan) / 0.5);
  --glow-teal: 0 0 25px hsl(var(--neon-teal) / 0.5);
  
  /* Glow Emocional */
  --glow-joy: 0 0 20px hsl(var(--joy) / 0.4);
  --glow-trust: 0 0 20px hsl(var(--trust) / 0.4);
  --glow-fear: 0 0 20px hsl(var(--fear) / 0.4);
  --glow-calm: 0 0 20px hsl(var(--calm) / 0.4);
  
  /* Text Glow */
  --text-glow-primary: 0 0 10px hsl(var(--primary) / 0.6),
                       0 0 20px hsl(var(--primary) / 0.4),
                       0 0 30px hsl(var(--primary) / 0.2);
  --text-glow-accent: 0 0 10px hsl(var(--accent) / 0.6),
                      0 0 20px hsl(var(--accent) / 0.4);
  
  /* Border Glow */
  --border-glow-primary: 0 0 5px hsl(var(--primary) / 0.3),
                         0 0 10px hsl(var(--primary) / 0.2);
}
```

### Classes Utilitárias de Glow

```css
/* ===== TEXT GLOW ===== */
.dark .text-glow {
  text-shadow: 0 0 10px hsl(var(--primary) / 0.6),
               0 0 20px hsl(var(--primary) / 0.4),
               0 0 30px hsl(var(--primary) / 0.2);
}

.dark .text-glow-secondary {
  text-shadow: 0 0 10px hsl(var(--secondary) / 0.5),
               0 0 20px hsl(var(--secondary) / 0.3);
}

.dark .text-glow-purple {
  text-shadow: 0 0 10px hsl(var(--neon-purple) / 0.7),
               0 0 20px hsl(var(--neon-purple) / 0.5),
               0 0 40px hsl(var(--neon-purple) / 0.3);
}

.dark .text-glow-magenta {
  text-shadow: 0 0 10px hsl(var(--neon-magenta) / 0.7),
               0 0 20px hsl(var(--neon-magenta) / 0.5),
               0 0 40px hsl(var(--neon-magenta) / 0.3);
}

/* Efeito Neon Vibrante */
.dark .text-neon {
  text-shadow: 
    0 0 5px hsl(var(--primary)),
    0 0 10px hsl(var(--primary)),
    0 0 20px hsl(var(--primary)),
    0 0 40px hsl(var(--primary) / 0.8),
    0 0 80px hsl(var(--primary) / 0.6);
}

/* ===== CARD GLOW ===== */
.dark .card-glow {
  box-shadow: 0 0 20px hsl(var(--primary) / 0.15),
              0 0 40px hsl(var(--primary) / 0.1);
}

.dark .card-glow-purple {
  box-shadow: 0 0 20px hsl(var(--neon-purple) / 0.2),
              0 0 40px hsl(var(--neon-purple) / 0.1);
}

.dark .card-neon {
  border: 1px solid hsl(var(--primary) / 0.4);
  box-shadow: 
    0 0 10px hsl(var(--primary) / 0.2),
    0 0 20px hsl(var(--primary) / 0.1),
    inset 0 0 20px hsl(var(--primary) / 0.05);
}

/* ===== ICON GLOW ===== */
.dark .icon-glow {
  filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.6));
}

.dark .icon-glow-purple {
  filter: drop-shadow(0 0 6px hsl(var(--neon-purple) / 0.6));
}

/* ===== BUTTON GLOW ===== */
.dark .btn-glow {
  box-shadow: 0 0 15px hsl(var(--primary) / 0.4),
              0 4px 15px hsl(0 0% 0% / 0.3);
}

.dark .btn-glow:hover {
  box-shadow: 0 0 25px hsl(var(--primary) / 0.6),
              0 6px 20px hsl(0 0% 0% / 0.4);
}

/* ===== INPUT GLOW ===== */
.dark .input-glow:focus {
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2),
              0 0 15px hsl(var(--primary) / 0.15);
}

/* ===== BADGE GLOW ===== */
.dark .badge-glow {
  box-shadow: 0 0 10px currentColor / 0.3;
}

/* ===== ANIMATED GLOW ===== */
.dark .glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}

.dark .glow-breathe {
  animation: glow-breathe 4s ease-in-out infinite;
}
```

---

## Glass Effects

### Variáveis CSS

```css
:root {
  --glass-bg: hsl(0 0% 100% / 0.7);
  --glass-border: hsl(0 0% 100% / 0.3);
  --glass-blur: 12px;
}

.dark {
  --glass-bg: hsl(240 10% 10% / 0.6);
  --glass-border: hsl(0 0% 100% / 0.08);
  --glass-blur: 16px;
}
```

### Classes de Glass

```css
/* Glass Básico */
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
}

/* Glass Card */
.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
}

/* Glass com Glow (Dark Mode) */
.dark .glass-glow {
  background: hsl(240 10% 10% / 0.5);
  backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--primary) / 0.2);
  box-shadow: 0 0 30px hsl(var(--primary) / 0.1);
}

/* Glass Navigation */
.glass-nav {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--glass-border);
}

.dark .glass-nav {
  background: hsl(240 10% 8% / 0.8);
  border-top: 1px solid hsl(0 0% 100% / 0.05);
}
```

---

## Gradients

### Light Mode

```css
:root {
  /* Gradientes de Fundo */
  --gradient-background: linear-gradient(
    180deg,
    hsl(0 0% 98%) 0%,
    hsl(210 40% 96%) 100%
  );
  
  --gradient-card: linear-gradient(
    135deg,
    hsl(0 0% 100%) 0%,
    hsl(210 40% 98%) 100%
  );
  
  /* Gradientes de Destaque */
  --gradient-primary: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(174 62% 40%) 100%
  );
  
  --gradient-secondary: linear-gradient(
    135deg,
    hsl(var(--secondary)) 0%,
    hsl(210 40% 90%) 100%
  );
  
  --gradient-accent: linear-gradient(
    135deg,
    hsl(var(--accent)) 0%,
    hsl(210 40% 85%) 100%
  );
  
  /* Gradiente Sutil */
  --gradient-subtle: linear-gradient(
    180deg,
    hsl(0 0% 100% / 0) 0%,
    hsl(0 0% 0% / 0.02) 100%
  );
}
```

### Dark Mode

```css
.dark {
  /* Gradientes de Fundo */
  --gradient-background: linear-gradient(
    180deg,
    hsl(240 10% 6%) 0%,
    hsl(240 15% 4%) 100%
  );
  
  --gradient-card: linear-gradient(
    135deg,
    hsl(240 10% 10%) 0%,
    hsl(240 10% 8%) 100%
  );
  
  /* Gradientes Neon */
  --gradient-primary: linear-gradient(
    135deg,
    hsl(var(--primary)) 0%,
    hsl(var(--neon-cyan)) 100%
  );
  
  --gradient-accent: linear-gradient(
    135deg,
    hsl(var(--neon-purple)) 0%,
    hsl(var(--neon-magenta)) 100%
  );
  
  --gradient-glow: linear-gradient(
    135deg,
    hsl(var(--primary) / 0.2) 0%,
    hsl(var(--accent) / 0.2) 100%
  );
  
  /* Gradiente Onboarding */
  --gradient-onboarding: linear-gradient(
    135deg,
    hsl(var(--onboarding-primary)) 0%,
    hsl(var(--onboarding-secondary)) 50%,
    hsl(var(--onboarding-accent)) 100%
  );
  
  /* Gradiente de Overlay */
  --gradient-overlay: linear-gradient(
    180deg,
    hsl(240 10% 6% / 0) 0%,
    hsl(240 10% 6% / 0.8) 100%
  );
  
  /* Gradiente Radial para Orbs */
  --gradient-orb-primary: radial-gradient(
    circle,
    hsl(var(--primary) / 0.3) 0%,
    hsl(var(--primary) / 0) 70%
  );
  
  --gradient-orb-accent: radial-gradient(
    circle,
    hsl(var(--accent) / 0.3) 0%,
    hsl(var(--accent) / 0) 70%
  );
}
```

---

## Keyframe Animations

### Breathing & Pulsing

```css
/* Respiração Suave */
@keyframes breathe {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* Pulso Suave */
@keyframes pulse-soft {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Pulso com Glow */
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 5px hsl(var(--primary) / 0.3);
  }
  50% {
    box-shadow: 0 0 20px hsl(var(--primary) / 0.6),
                0 0 40px hsl(var(--primary) / 0.3);
  }
}

/* Glow Respirando (Neon) */
@keyframes glow-breathe-neon {
  0%, 100% {
    box-shadow: 
      0 0 10px hsl(var(--primary) / 0.3),
      0 0 20px hsl(var(--primary) / 0.2);
    filter: brightness(1);
  }
  50% {
    box-shadow: 
      0 0 20px hsl(var(--primary) / 0.5),
      0 0 40px hsl(var(--primary) / 0.3),
      0 0 60px hsl(var(--primary) / 0.2);
    filter: brightness(1.1);
  }
}
```

### Movement & Entry

```css
/* Fade In Up */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Fade In Scale */
@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Slide In Right */
@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Float Suave */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Float Gentil */
@keyframes float-gentle {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-5px) rotate(1deg);
  }
  66% {
    transform: translateY(-3px) rotate(-1deg);
  }
}

/* Bounce Suave */
@keyframes bounce-soft {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}
```

### Animated Glows

```css
/* Glow Pulse */
@keyframes glow-pulse {
  0%, 100% {
    box-shadow: 0 0 10px hsl(var(--primary) / 0.3);
  }
  50% {
    box-shadow: 0 0 25px hsl(var(--primary) / 0.5),
                0 0 50px hsl(var(--primary) / 0.3);
  }
}

/* Neon Flicker */
@keyframes neon-flicker {
  0%, 100% {
    opacity: 1;
  }
  41% {
    opacity: 1;
  }
  42% {
    opacity: 0.8;
  }
  43% {
    opacity: 1;
  }
  45% {
    opacity: 0.3;
  }
  46% {
    opacity: 1;
  }
}

/* Text Glow Pulse */
@keyframes text-glow-pulse {
  0%, 100% {
    text-shadow: 0 0 10px hsl(var(--primary) / 0.5);
  }
  50% {
    text-shadow: 0 0 20px hsl(var(--primary) / 0.8),
                 0 0 30px hsl(var(--primary) / 0.5);
  }
}

/* Border Glow Rotate */
@keyframes border-glow-rotate {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

### Special Effects

```css
/* Shimmer */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    hsl(var(--muted) / 0) 0%,
    hsl(var(--muted) / 0.5) 50%,
    hsl(var(--muted) / 0) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

/* Ripple */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

/* Spin Slow */
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Gradient Shift */
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Orb Float */
@keyframes orb-float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  33% {
    transform: translate(30px, -30px) scale(1.1);
    opacity: 0.5;
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
    opacity: 0.4;
  }
}
```

---

## Component Styles

### Cards

```css
/* Card Elevado */
.card-elevated {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.card-elevated:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.dark .card-elevated {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  box-shadow: var(--shadow-lg);
}

.dark .card-elevated:hover {
  border-color: hsl(var(--primary) / 0.3);
  box-shadow: var(--shadow-glow);
}

/* Emotion Card */
.emotion-card {
  background: linear-gradient(
    135deg,
    hsl(var(--card)) 0%,
    hsl(var(--muted) / 0.5) 100%
  );
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-xl);
  padding: 1rem;
  transition: all 0.3s ease;
}

.emotion-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
}

.dark .emotion-card {
  background: linear-gradient(
    135deg,
    hsl(var(--card)) 0%,
    hsl(240 10% 12%) 100%
  );
}

.dark .emotion-card:hover {
  border-color: hsl(var(--primary) / 0.4);
  box-shadow: 0 0 20px hsl(var(--primary) / 0.2);
}

/* Card Selected State */
.card-selected {
  border: 2px solid hsl(var(--primary));
  box-shadow: 0 0 0 4px hsl(var(--primary) / 0.1);
}

.dark .card-selected {
  border: 2px solid hsl(var(--primary));
  box-shadow: 0 0 20px hsl(var(--primary) / 0.3);
}
```

### Navigation

```css
/* Navigation Item */
.nav-item {
  position: relative;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: hsl(var(--muted));
}

.nav-item.active {
  background: hsl(var(--primary) / 0.1);
  color: hsl(var(--primary));
}

.dark .nav-item:hover {
  background: hsl(var(--muted));
}

.dark .nav-item.active {
  background: hsl(var(--primary) / 0.15);
  color: hsl(var(--primary));
  box-shadow: 0 0 15px hsl(var(--primary) / 0.2);
}

/* Bottom Navigation */
.bottom-nav {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  border-top: 1px solid hsl(var(--border) / 0.5);
}

.dark .bottom-nav {
  background: hsl(240 10% 8% / 0.9);
  border-top: 1px solid hsl(0 0% 100% / 0.05);
  box-shadow: 0 -5px 20px hsl(0 0% 0% / 0.3);
}
```

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: linear-gradient(135deg, hsl(var(--primary)), hsl(174 62% 40%));
  color: hsl(var(--primary-foreground));
  border: none;
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-md);
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.dark .btn-primary {
  box-shadow: 0 4px 15px hsl(var(--primary) / 0.3);
}

.dark .btn-primary:hover {
  box-shadow: 0 6px 25px hsl(var(--primary) / 0.5);
}

/* Ghost Button */
.btn-ghost {
  background: transparent;
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  padding: 0.75rem 1.5rem;
  transition: all 0.2s ease;
}

.btn-ghost:hover {
  background: hsl(var(--muted));
  border-color: hsl(var(--muted-foreground) / 0.3);
}

.dark .btn-ghost:hover {
  background: hsl(var(--muted));
  border-color: hsl(var(--primary) / 0.3);
}
```

### Inputs

```css
/* Input Base */
.input-base {
  background: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-lg);
  padding: 0.75rem 1rem;
  transition: all 0.2s ease;
}

.input-base:focus {
  outline: none;
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.1);
}

.dark .input-base {
  background: hsl(var(--card));
  border-color: hsl(var(--border));
}

.dark .input-base:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsl(var(--primary) / 0.2),
              0 0 15px hsl(var(--primary) / 0.1);
}

/* Premium Input (com glow) */
.dark .input-premium:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2),
              0 0 20px hsl(var(--primary) / 0.15),
              inset 0 0 10px hsl(var(--primary) / 0.05);
}
```

### Breathing Circle

```css
/* Círculo de Respiração */
.breathing-circle {
  border-radius: 50%;
  background: radial-gradient(
    circle at 30% 30%,
    hsl(var(--primary) / 0.8),
    hsl(var(--primary))
  );
  box-shadow: 
    0 0 30px hsl(var(--primary) / 0.3),
    inset 0 0 30px hsl(0 0% 100% / 0.1);
  transition: all 0.3s ease;
}

.dark .breathing-circle {
  background: radial-gradient(
    circle at 30% 30%,
    hsl(var(--primary)),
    hsl(174 72% 35%)
  );
  box-shadow: 
    0 0 40px hsl(var(--primary) / 0.5),
    0 0 80px hsl(var(--primary) / 0.3),
    inset 0 0 30px hsl(0 0% 100% / 0.1);
}

/* Ripple Rings */
.ripple-ring {
  border: 2px solid hsl(var(--primary) / 0.3);
  border-radius: 50%;
  animation: ripple-expand 2s ease-out infinite;
}

@keyframes ripple-expand {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

---

## Tailwind Config

Adicione ao seu `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      // Border Radius
      borderRadius: {
        none: "0",
        sm: "0.375rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        full: "9999px",
      },
      
      // Box Shadows
      boxShadow: {
        xs: "0 1px 2px 0 hsl(0 0% 0% / 0.03)",
        sm: "0 1px 3px 0 hsl(0 0% 0% / 0.05), 0 1px 2px -1px hsl(0 0% 0% / 0.05)",
        md: "0 4px 6px -1px hsl(0 0% 0% / 0.07), 0 2px 4px -2px hsl(0 0% 0% / 0.05)",
        lg: "0 10px 15px -3px hsl(0 0% 0% / 0.08), 0 4px 6px -4px hsl(0 0% 0% / 0.05)",
        xl: "0 20px 25px -5px hsl(0 0% 0% / 0.08), 0 8px 10px -6px hsl(0 0% 0% / 0.04)",
        "2xl": "0 25px 50px -12px hsl(0 0% 0% / 0.15)",
        glow: "0 0 15px hsl(var(--primary) / 0.3), 0 0 30px hsl(var(--primary) / 0.15)",
        "glow-strong": "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.25)",
        "glow-purple": "0 0 15px hsl(var(--neon-purple) / 0.4), 0 0 30px hsl(var(--neon-purple) / 0.2)",
        inner: "inset 0 2px 4px 0 hsl(0 0% 0% / 0.05)",
      },
      
      // Animations
      animation: {
        "breathe": "breathe 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "glow-breathe": "glow-breathe-neon 4s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
        "fade-in-scale": "fade-in-scale 0.3s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "float": "float 6s ease-in-out infinite",
        "float-gentle": "float-gentle 8s ease-in-out infinite",
        "bounce-soft": "bounce-soft 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
        "ripple": "ripple 1s ease-out",
        "spin-slow": "spin-slow 8s linear infinite",
        "gradient-shift": "gradient-shift 3s ease infinite",
        "orb-float": "orb-float 20s ease-in-out infinite",
        "neon-flicker": "neon-flicker 3s infinite",
        "text-glow-pulse": "text-glow-pulse 2s ease-in-out infinite",
      },
      
      // Keyframes
      keyframes: {
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary) / 0.3)" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary) / 0.6), 0 0 40px hsl(var(--primary) / 0.3)" },
        },
        "glow-breathe-neon": {
          "0%, 100%": {
            boxShadow: "0 0 10px hsl(var(--primary) / 0.3), 0 0 20px hsl(var(--primary) / 0.2)",
            filter: "brightness(1)",
          },
          "50%": {
            boxShadow: "0 0 20px hsl(var(--primary) / 0.5), 0 0 40px hsl(var(--primary) / 0.3), 0 0 60px hsl(var(--primary) / 0.2)",
            filter: "brightness(1.1)",
          },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-scale": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-5px) rotate(1deg)" },
          "66%": { transform: "translateY(-3px) rotate(-1deg)" },
        },
        "bounce-soft": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ripple": {
          "0%": { transform: "scale(0)", opacity: "0.5" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "orb-float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.3" },
          "33%": { transform: "translate(30px, -30px) scale(1.1)", opacity: "0.5" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)", opacity: "0.4" },
        },
        "neon-flicker": {
          "0%, 100%": { opacity: "1" },
          "41%": { opacity: "1" },
          "42%": { opacity: "0.8" },
          "43%": { opacity: "1" },
          "45%": { opacity: "0.3" },
          "46%": { opacity: "1" },
        },
        "text-glow-pulse": {
          "0%, 100%": { textShadow: "0 0 10px hsl(var(--primary) / 0.5)" },
          "50%": { textShadow: "0 0 20px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--primary) / 0.5)" },
        },
      },
      
      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "40px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

---

## Diretrizes de Estilo

### Light Mode
- Sombras suaves e sutis
- Bordas discretas (opacidade 10-30%)
- Sem efeitos de glow
- Transições elegantes e refinadas
- Foco em legibilidade e clareza

### Dark Mode
- Sombras profundas com glow neon sutil
- Bordas podem ter leve brilho
- Efeitos de glow nas interações (hover, focus)
- Cores vibrantes para destaques
- Atmosfera imersiva e futurística

### Transições
- Duração padrão: 200-300ms
- Easing: `ease`, `ease-out`, ou `cubic-bezier`
- Evitar transições muito longas (>500ms)
- Hover states devem ser rápidos (150-200ms)

### Performance
- Preferir `transform` e `opacity` para animações
- Evitar animar `box-shadow` diretamente (use pseudo-elementos)
- Limitar o uso de `backdrop-filter` em mobile
- Usar `will-change` com moderação

### Consistência
- Manter hierarquia visual clara
- Usar tokens de design consistentemente
- Evitar valores arbitrários em componentes
- Documentar variações e estados

---

## Checklist de Implementação

### Configuração Base
- [ ] Adicionar variáveis CSS ao `index.css`
- [ ] Configurar `tailwind.config.ts` com extensões
- [ ] Instalar `tailwindcss-animate` se necessário

### Light Mode
- [ ] Implementar shadows suaves
- [ ] Configurar border-radius padrão
- [ ] Definir gradientes sutis
- [ ] Testar transições

### Dark Mode
- [ ] Implementar shadows com glow
- [ ] Adicionar efeitos neon
- [ ] Configurar glass effects
- [ ] Testar animações de glow

### Componentes
- [ ] Aplicar estilos em Cards
- [ ] Estilizar Buttons
- [ ] Configurar Inputs
- [ ] Atualizar Navigation

### Animações
- [ ] Implementar keyframes base
- [ ] Adicionar animações de entrada
- [ ] Configurar efeitos de hover
- [ ] Testar em mobile

### QA Final
- [ ] Verificar contraste e acessibilidade
- [ ] Testar em diferentes dispositivos
- [ ] Validar performance
- [ ] Documentar customizações

---

## Notas Adicionais

- Este design system foi extraído do projeto ETHRA
- Otimizado para aplicações de bem-estar e meditação
- Compatível com React + Tailwind CSS + Shadcn UI
- Testado em dispositivos móveis via WhatsApp In-App Browser

---

*Gerado em: Janeiro 2026*  
*Versão: 1.0*
