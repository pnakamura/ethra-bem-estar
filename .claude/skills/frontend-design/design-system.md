# ETHRA Design System - Serene Luxury

## Design Philosophy

**Aesthetic Direction**: Luxury Minimalism
**Tone**: Elegant, sophisticated, serene, refined
**Inspiration**: High-end spas, boutique hotels, editorial design

## Color Palette

### Light Mode

#### Primary Colors
- **Primary (Champagne Gold)**: `hsl(36 45% 56%)` - Luxury accent, CTAs
- **Secondary (Sage Green)**: `hsl(90 15% 55%)` - Wellness, nature
- **Accent (Deep Teal)**: `hsl(175 35% 35%)` - Sophistication

#### Neutral Colors
- **Background**: `hsl(40 20% 98%)` - Warm ivory
- **Foreground**: `hsl(30 5% 12%)` - Rich charcoal
- **Muted**: `hsl(40 10% 94%)` - Soft gray
- **Border**: `hsl(40 10% 90%)` - Subtle dividers

### Dark Mode

#### Primary Colors
- **Primary (Luminous Gold)**: `hsl(40 55% 58%)` - Elegant gold
- **Secondary (Soft Sage)**: `hsl(90 18% 50%)` - Muted green
- **Accent (Warm Teal)**: `hsl(175 30% 45%)` - Refined teal

#### Neutral Colors
- **Background**: `hsl(30 8% 7%)` - Rich black
- **Foreground**: `hsl(40 15% 92%)` - Soft ivory
- **Muted**: `hsl(30 8% 15%)` - Deep gray
- **Border**: `hsl(30 8% 18%)` - Subtle borders

### Extended Palette

```css
/* Ivory Scale */
ivory-50: #FFFEFB
ivory-100: #FDFCF7
ivory-200: #FAF9F4
ivory-500: #E0DED6
ivory-900: #666460

/* Charcoal Scale */
charcoal-50: #F7F7F7
charcoal-500: #5C5C5C
charcoal-800: #1F1F1F
charcoal-900: #0D0D0D

/* Champagne Scale */
champagne-50: #FDF9F3
champagne-400: #DFBA7C
champagne-500: #C9A45B
champagne-600: #B8956B
champagne-900: #5E4A32

/* Sage Scale */
sage-50: #F6F7F5
sage-400: #96A08A
sage-500: #7C8C6E
sage-700: #4F5947
```

## Typography

### Font Families
```css
--font-display: 'Playfair Display', serif;  /* Headings */
--font-body: 'DM Sans', sans-serif;         /* Body text */
```

### Type Scale
- **H1**: 48-60px, Playfair Display, weight 500
- **H2**: 36-48px, Playfair Display, weight 500
- **H3**: 28-36px, Playfair Display, weight 500
- **H4**: 24-28px, Playfair Display, weight 500
- **Body**: 16px, DM Sans, weight 400
- **Small**: 14px, DM Sans, weight 400
- **Caption**: 12px, DM Sans, weight 500

### Typography Guidelines
- Letter-spacing: -0.02em for headings, -0.01em for body
- Line-height: 1.2 for headings, 1.7 for body text
- Use `font-display` class for all headings
- Avoid bold weights; prefer medium (500)

## Spacing System

Based on 4px grid:
```css
--space-1: 4px
--space-2: 8px
--space-3: 12px
--space-4: 16px
--space-5: 20px
--space-6: 24px
--space-8: 32px
--space-10: 40px
--space-12: 48px
--space-16: 64px
--space-20: 80px
--space-24: 96px
```

### Spacing Guidelines
- Use generous whitespace for luxury feel
- Minimum padding for cards: 24px
- Section spacing: 80-120px
- Component gaps: 16-24px

## Border Radius

```css
--radius-sm: 8px    /* Small elements */
--radius-md: 12px   /* Default */
--radius-lg: 16px   /* Cards */
--radius-xl: 20px   /* Large cards */
--radius-2xl: 24px  /* Modals */
```

## Shadows

### Light Mode
```css
--shadow-xs: 0 1px 2px hsl(30 10% 20% / 0.03);
--shadow-sm: 0 2px 8px hsl(30 10% 20% / 0.04);
--shadow-md: 0 4px 20px hsl(30 10% 20% / 0.05);
--shadow-lg: 0 8px 40px hsl(30 10% 20% / 0.06);
--shadow-xl: 0 20px 60px hsl(30 10% 20% / 0.08);
```

### Dark Mode
```css
--shadow-xs: 0 1px 2px hsl(0 0% 0% / 0.2);
--shadow-sm: 0 2px 8px hsl(0 0% 0% / 0.25);
--shadow-md: 0 4px 20px hsl(0 0% 0% / 0.3);
--shadow-lg: 0 8px 40px hsl(0 0% 0% / 0.35);
--shadow-xl: 0 20px 60px hsl(0 0% 0% / 0.4);
```

### Glow Effects (Subtle)
```css
--shadow-glow: 0 0 50px hsl(var(--primary) / 0.12);
--shadow-glow-strong: 0 0 80px hsl(var(--primary) / 0.18);
```

## Animation Guidelines

### Timing
- Fast: 200ms (micro-interactions)
- Normal: 300ms (standard transitions)
- Slow: 500ms (page transitions, emphasis)
- Very slow: 800ms+ (ambient animations)

### Easing
```css
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);  /* Primary easing */
--ease-in-out: ease-in-out;                  /* Ambient */
```

### Principles
- Prefer subtle, slow animations for luxury feel
- Use transform and opacity for performance
- Avoid jarring or fast movements
- Stagger animations with 100-200ms delays

## Component Styles

### Buttons
```tsx
// Primary Button
className="bg-primary text-primary-foreground rounded-xl px-5 py-2.5
           font-medium transition-all duration-300
           hover:shadow-md hover:shadow-primary/15 active:scale-[0.98]"

// Outline Button
className="border border-border/60 bg-background rounded-xl px-5 py-2.5
           font-medium transition-all duration-300
           hover:bg-muted/50 hover:border-primary/20"
```

### Cards
```tsx
// Standard Card
className="rounded-xl border border-border/50 bg-card
           shadow-sm transition-all duration-300
           hover:shadow-md"

// Luxury Card (with top accent)
className="rounded-xl border border-border/30 bg-card
           shadow-sm transition-all duration-500
           relative overflow-hidden
           before:absolute before:top-0 before:left-0 before:right-0
           before:h-px before:bg-gradient-to-r
           before:from-transparent before:via-primary/30 before:to-transparent
           before:opacity-0 hover:before:opacity-100"
```

### Inputs
```tsx
className="w-full rounded-xl border border-border/50 bg-background
           px-4 py-3 text-foreground transition-all duration-300
           focus:border-primary/40 focus:ring-2 focus:ring-primary/10
           placeholder:text-muted-foreground"
```

## Iconography

- Use Lucide React icons
- Size: 20px for buttons, 24px for standalone
- Stroke width: 1.5-2
- Color: Use semantic colors (primary, muted-foreground)

## Accessibility

### Color Contrast
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States
```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Touch Targets
- Minimum: 44x44px
- Recommended: 48x48px

## Design Don'ts

1. ❌ Don't use neon or vibrant glow effects
2. ❌ Avoid harsh shadows or dark borders
3. ❌ Don't use Inter, Roboto, or generic fonts
4. ❌ Avoid purple gradients (AI cliché)
5. ❌ Don't use rounded-lg everywhere (prefer xl, 2xl)
6. ❌ Avoid equal spacing - use rhythm
7. ❌ Don't use bold weights excessively
8. ❌ Avoid fast, jarring animations

## Design Do's

1. ✅ Use generous whitespace
2. ✅ Prefer subtle shadows and borders
3. ✅ Use Playfair Display for headings
4. ✅ Apply warm ivory/cream backgrounds
5. ✅ Use champagne gold as accent sparingly
6. ✅ Implement smooth, slow transitions
7. ✅ Create visual hierarchy with typography
8. ✅ Add subtle hover states with border color changes
