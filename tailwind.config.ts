import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
        body: ['Crimson Pro', 'serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Emotion colors
        calm: {
          DEFAULT: "hsl(var(--calm))",
          light: "hsl(var(--calm-light))",
        },
        energy: {
          DEFAULT: "hsl(var(--energy))",
          light: "hsl(var(--energy-light))",
        },
        grounding: {
          DEFAULT: "hsl(var(--grounding))",
          light: "hsl(var(--grounding-light))",
        },
        panic: {
          DEFAULT: "hsl(var(--panic))",
          light: "hsl(var(--panic-light))",
        },
        meditate: {
          DEFAULT: "hsl(var(--meditate))",
          light: "hsl(var(--meditate-light))",
        },
        // Plutchik emotion colors
        joy: "hsl(var(--joy))",
        trust: "hsl(var(--trust))",
        fear: "hsl(var(--fear))",
        surprise: "hsl(var(--surprise))",
        sadness: "hsl(var(--sadness))",
        disgust: "hsl(var(--disgust))",
        anger: "hsl(var(--anger))",
        anticipation: "hsl(var(--anticipation))",
        // Landing page colors
        landing: {
          bg: "hsl(var(--landing-bg))",
          lavender: "hsl(var(--landing-lavender))",
          sage: "hsl(var(--landing-sage))",
          serene: "hsl(var(--landing-serene))",
          text: "hsl(var(--landing-text))",
        },
        // Serene Nature Wellness palette
        sage: {
          50: '#f6f7f6',
          100: '#e3e7e3',
          200: '#c7cfc7',
          300: '#a3b0a3',
          400: '#7d8f7d',
          500: '#5f735f',
          600: '#4a5b4a',
          700: '#3d4a3d',
          800: '#323d32',
          900: '#2a332a',
        },
        earth: {
          50: '#faf9f7',
          100: '#f2ede6',
          200: '#e5dace',
          300: '#d4c2ac',
          400: '#c0a588',
          500: '#a88b6c',
          600: '#8b7256',
          700: '#6f5a45',
          800: '#5a4937',
          900: '#4a3d2f',
        },
        cream: {
          50: '#fdfcfb',
          100: '#faf8f4',
          200: '#f5f1e8',
          300: '#ebe5d7',
          400: '#ddd4c1',
          500: '#ccc0a8',
          600: '#b3a68f',
          700: '#958871',
          800: '#786d5c',
          900: '#635a4d',
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'glow-strong': 'var(--shadow-glow-strong)',
        'soft': 'var(--shadow-md)',
        'elevated': 'var(--shadow-lg)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "var(--shadow-glow)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "var(--shadow-glow-strong)",
            transform: "scale(1.02)"
          }
        },
        "fade-blur-in": {
          "0%": { opacity: "0", filter: "blur(10px)", transform: "scale(0.95)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "scale(1)" }
        },
        "ripple": {
          "0%": { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2)", opacity: "0" }
        },
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        },
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" }
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        },
        "glow-pulse-purple": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(270 65% 55% / 0.3)",
            transform: "scale(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(270 65% 55% / 0.5)",
            transform: "scale(1.03)"
          }
        },
        "float-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" }
        },
        "scale-bounce": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "60%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "glow-pulse-teal": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(168 60% 50% / 0.3)",
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(168 60% 50% / 0.6)",
          }
        },
        "border-glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 12px hsl(168 80% 55% / 0.4)",
          },
          "50%": { 
            boxShadow: "0 0 25px hsl(168 80% 55% / 0.65)",
          }
        },
        "glow-pulse-intense": {
          "0%, 100%": { 
            boxShadow: "0 0 35px hsl(168 80% 55% / 0.5)",
          },
          "50%": { 
            boxShadow: "0 0 70px hsl(168 80% 55% / 0.8)",
          }
        },
        "neon-flicker": {
          "0%, 100%": { opacity: "1" },
          "48%": { opacity: "1" },
          "50%": { opacity: "0.85" },
          "52%": { opacity: "1" },
          "75%": { opacity: "0.92" },
          "77%": { opacity: "1" }
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.05)", opacity: "0.95" }
        },
        "breathe-slow": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.08)" }
        },
        "float-organic": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "33%": { transform: "translateY(-8px) rotate(1deg)" },
          "66%": { transform: "translateY(-4px) rotate(-1deg)" }
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-blur-in": "fade-blur-in 0.5s ease-out",
        "ripple": "ripple 2s ease-out infinite",
        "shimmer": "shimmer 2s ease-in-out infinite",
        "float-gentle": "float-gentle 4s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        "glow-pulse-purple": "glow-pulse-purple 3s ease-in-out infinite",
        "float-subtle": "float-subtle 3s ease-in-out infinite",
        "scale-bounce": "scale-bounce 0.4s ease-out",
        "glow-pulse-teal": "glow-pulse-teal 2.5s ease-in-out infinite",
        "border-glow-pulse": "border-glow-pulse 2s ease-in-out infinite",
        "glow-pulse-intense": "glow-pulse-intense 2.5s ease-in-out infinite",
        "neon-flicker": "neon-flicker 4s ease-in-out infinite",
        "breathe": "breathe 4s ease-in-out infinite",
        "breathe-slow": "breathe-slow 6s ease-in-out infinite",
        "float-organic": "float-organic 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out backwards",
        "slide-in-right": "slide-in-right 0.5s ease-out backwards",
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
