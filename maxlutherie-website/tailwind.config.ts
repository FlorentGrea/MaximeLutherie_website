import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'brandy-punch': {
          '50': '#fbf8ef',
          '100': '#f3e8d2',
          '200': '#e6d0a1',
          '300': '#d9b470',
          '400': '#d09d4f',
          '500': '#c58139',
          '600': '#af6630',
          '700': '#924c2b',
          '800': '#773d29',
          '900': '#633424',
          '950': '#381910',
        },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "slide-bottom": {
            "0%": {
                transform: "translateY(15%)",
                opacity: "0"
            },
            to: {
                transform: "translateY(0%)",
                opacity: "1"
            }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-bottom": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-bottom-d1": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.2s both",
        "slide-bottom-d2": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.3s both",
        "slide-bottom-d3": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.4s both",
        "slide-bottom-d4": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.5s both",
        "slide-bottom-d5": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.6s both",
        "slide-bottom-d6": "slide-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) 0.7s both",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config