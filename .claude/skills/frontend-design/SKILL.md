---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
argument-hint: [component-or-page-name]
allowed-tools: Read, Glob, Grep, Edit, Write, Bash(npm *)
---

# Frontend Design Expert - Distinctive & Production-Grade

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:

### Typography
Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.

**FORBIDDEN FONTS (overused):**
- Inter
- Roboto
- Space Grotesk
- Poppins
- Montserrat
- System fonts (unless intentional minimalism)

**ENCOURAGED ALTERNATIVES:**
- Google Fonts: Playfair Display, Cormorant, Crimson Pro, DM Serif Display, Spectral, Libre Baskerville, Archivo, Syne, Cabinet Grotesk, General Sans
- Paid fonts if budget allows: Suisse, Helvetica Now, GT America, Söhne, Untitled Sans
- Display fonts: Fraunces, Zodiak, Domaine Display, Signifier, Canela
- For wellness/spiritual: Cormorant Garamond, Crimson Text, EB Garamond, Lora

### Color & Theme
Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.

**AVOID:**
- Purple gradients on white (cliché AI aesthetic)
- Generic blue (#3b82f6)
- Safe, corporate color schemes
- Evenly distributed rainbow palettes

**EMBRACE:**
- Unexpected color combinations
- Monochromatic with one bold accent
- Earthy, natural tones for wellness
- Rich, saturated colors for energy
- Muted pastels for calm
- High contrast for impact
- Dark themes with neon accents
- Analogous color harmonies

### Motion
Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library (Framer Motion) for React when available.

Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.

**Animation Examples:**
```css
/* Staggered fade-in */
.item {
  animation: fadeInUp 0.6s ease-out backwards;
}
.item:nth-child(1) { animation-delay: 0.1s; }
.item:nth-child(2) { animation-delay: 0.2s; }
.item:nth-child(3) { animation-delay: 0.3s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Hover effects */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

/* Smooth page transitions */
.page-enter {
  opacity: 0;
  transform: translateX(100px);
}
.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 0.4s ease-out;
}
```

### Spatial Composition
Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.

**AVOID:**
- Centered, predictable layouts
- Standard 12-column grids used conventionally
- Equal spacing everywhere
- Everything contained in boxes

**EMBRACE:**
- Asymmetric grids
- Overlapping elements with z-index layering
- Diagonal compositions
- Intentional whitespace vs intentional density
- Breaking the grid strategically
- Full-bleed images and sections
- Masonry layouts
- Bento box layouts

### Backgrounds & Visual Details
Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic.

**Techniques:**
- Gradient meshes
- Noise textures (`background-image: url("data:image/svg+xml,...")`)
- Geometric patterns
- Layered transparencies
- Dramatic shadows (not just box-shadow)
- Decorative borders
- Custom cursors
- Grain overlays
- Glassmorphism (when appropriate)
- Neumorphism (when appropriate)
- Parallax effects
- SVG backgrounds with animation

**Example - Noise Texture:**
```css
.background {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}
.background::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.05;
  mix-blend-mode: overlay;
}
```

## Implementation Guidelines

### For Respiro Zen Context

This is a wellness/meditation app. Appropriate aesthetic directions:

**Option 1: Serene Minimalism**
- Typography: Cormorant Garamond (display) + Crimson Pro (body)
- Colors: Soft sage greens, warm off-whites, muted lavenders
- Motion: Slow, breathing-like animations
- Space: Generous whitespace, centered focal points
- Details: Subtle gradients, soft shadows, organic shapes

**Option 2: Spiritual Maximalism**
- Typography: Spectral (display) + EB Garamond (body)
- Colors: Rich purples, deep teals, gold accents
- Motion: Flowing, organic transitions
- Space: Layered, depth-filled compositions
- Details: Mandalas, geometric patterns, glow effects

**Option 3: Modern Wellness**
- Typography: Syne (headings) + Inter (body, but paired uniquely)
- Colors: Vibrant teals, coral accents, deep navy
- Motion: Crisp, purposeful animations
- Space: Asymmetric cards, grid-breaking hero
- Details: Gradients, subtle grain, rounded corners

**Option 4: Organic Nature**
- Typography: DM Serif Display + Lora
- Colors: Earthy browns, forest greens, sky blues
- Motion: Gentle, natural easing
- Space: Flowing, organic layouts
- Details: Textures, watercolor effects, leaf motifs

### Code Quality Standards

- **Semantic HTML**: Use proper tags (`<article>`, `<section>`, `<nav>`, etc.)
- **Accessibility**: WCAG AA minimum (color contrast, ARIA labels, keyboard nav)
- **Responsive**: Mobile-first, fluid layouts
- **Performance**: Optimize animations (transform/opacity), lazy load images
- **Modern CSS**: CSS Grid, Flexbox, Custom Properties, Container Queries
- **Clean Code**: DRY principles, reusable components, clear naming

### Tailwind CSS Integration

When using Tailwind (detected in Respiro Zen):

1. **Extend the theme** in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['Crimson Pro', 'serif'],
      },
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          // ... custom palette
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out backwards',
        'breathe': 'breathe 4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
}
```

2. **Use utility classes creatively**:
```tsx
<div className="
  relative overflow-hidden
  bg-gradient-to-br from-sage-50 to-lavender-100
  before:absolute before:inset-0 before:bg-noise before:opacity-5
  rounded-3xl p-8
  hover:shadow-2xl hover:-translate-y-1
  transition-all duration-300 ease-out
">
  <h2 className="
    font-display text-4xl font-light
    bg-gradient-to-r from-sage-900 to-sage-700
    bg-clip-text text-transparent
  ">
    Breathing Exercise
  </h2>
</div>
```

3. **Avoid generic patterns**:
- Don't use `rounded-lg` everywhere (vary: `rounded-3xl`, `rounded-tl-3xl rounded-br-3xl`)
- Don't use `shadow-md` default (create custom: `shadow-[0_8px_30px_rgb(0,0,0,0.12)]`)
- Don't use `text-gray-600` (use semantic colors from your palette)

## Deliverables

When completing a design task, provide:

1. **Aesthetic Vision Statement**: Brief description of the chosen direction and why
2. **Implementation Code**: Complete, working code with:
   - All necessary imports
   - Inline styles or separate CSS
   - Comments explaining creative choices
   - Responsive considerations
3. **Font Integration**: Instructions for adding Google Fonts or other fonts
4. **Configuration Updates**: Any needed changes to `tailwind.config.js` or other configs
5. **Before/After**: If redesigning, explain the transformation

## Anti-Patterns to AVOID

❌ **Generic AI Slop:**
- Using Inter/Roboto without intentionality
- Purple gradients on white backgrounds
- Centered layouts with equal spacing
- `rounded-lg` and `shadow-md` everywhere
- Predictable card grids
- Generic blue buttons
- System fonts by default

✅ **Production-Grade Design:**
- Distinctive font choices that match the vibe
- Unexpected color combinations
- Asymmetric, dynamic layouts
- Custom shadows and borders
- Layered compositions with depth
- Motion that delights
- Texture and atmosphere

## Examples

### BAD (Generic AI Slop):
```tsx
<div className="max-w-4xl mx-auto p-6">
  <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
  <div className="grid grid-cols-3 gap-4 mt-6">
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold">Card 1</h2>
    </div>
  </div>
</div>
```

### GOOD (Distinctive Design):
```tsx
<div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-lavender-50 relative overflow-hidden">
  {/* Ambient background */}
  <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />

  {/* Asymmetric layout */}
  <div className="max-w-7xl mx-auto px-6 py-20">
    <h1 className="font-display text-7xl font-light tracking-tight text-sage-900 max-w-2xl leading-[1.1] animate-fade-in-up">
      Find Your
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sage-600 to-teal-600">
        Inner Peace
      </span>
    </h1>

    {/* Staggered card grid */}
    <div className="mt-20 grid grid-cols-12 gap-6">
      <div className="col-span-5 row-span-2 bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-sage-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 animate-fade-in-up animation-delay-100">
        <h2 className="font-display text-3xl text-sage-900">Breathing</h2>
      </div>

      <div className="col-span-7 bg-gradient-to-br from-teal-500 to-teal-600 rounded-[2rem] p-8 text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:scale-[1.02] transition-transform duration-300 animate-fade-in-up animation-delay-200">
        <h2 className="font-display text-3xl">Meditation</h2>
      </div>
    </div>
  </div>
</div>
```

## Remember

Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

**Match implementation complexity to aesthetic vision:** Maximalist designs need elaborate code with extensive animations and effects. Minimalist designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Every design should be unique. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices across generations.
