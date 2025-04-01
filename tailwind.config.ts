
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Windows-inspired colors with 70s retro palette
				win95: {
					'bg': '#0F4C81', // Dark Blue
					'window': '#1E1E1E',
					'title': '#0F4C81', // Dark Blue
					'button': '#C0C0C0',
					'accent': '#FDB44B', // Gold
					'highlight': '#FF5E5B', // Red
					'text-green': '#48B5AF' // Turquoise
				},
				// Windows XP inspired colors
				winxp: {
					'bg': '#235BD5', // XP Blue
					'window': '#FFFFFF',
					'title': '#0A246A', // XP Title Bar
					'button': '#ECE9D8',
					'accent': '#2A90DA', // XP Accent
					'highlight': '#4CC3FF', // XP Highlight
					'text-green': '#67CC7A' // XP Green
				},
				// Windows 98 inspired colors
				win98: {
					'bg': '#008080', // Teal
					'window': '#C0C0C0',
					'title': '#000080', // Navy
					'button': '#C0C0C0',
					'accent': '#008080', // Teal
					'highlight': '#0000FF', // Blue
					'text-green': '#008000' // Green
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'scanline': {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(100%)' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'pixel-fade-in': {
					'0%': { opacity: '0', transform: 'scale(0.98)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scanline': 'scanline 8s linear infinite',
				'blink': 'blink 1s step-end infinite',
				'pixel-fade-in': 'pixel-fade-in 0.3s ease-out'
			},
			fontFamily: {
				'pixel': ['"Press Start 2P"', 'cursive'],
				'mono': ['"IBM Plex Mono"', 'monospace']
			},
			boxShadow: {
				'win95-inset': 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
				'win95-outset': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
				'winxp-inset': 'inset -1px -1px #ffffff, inset 1px 1px #888888, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a',
				'winxp-outset': 'inset -1px -1px #888888, inset 1px 1px #ffffff, inset -2px -2px #0a0a0a, inset 2px 2px #dfdfdf',
				'win98-inset': 'inset -1px -1px #ffffff, inset 1px 1px #0a0a0a, inset -2px -2px #dfdfdf, inset 2px 2px #808080',
				'win98-outset': 'inset -1px -1px #0a0a0a, inset 1px 1px #ffffff, inset -2px -2px #808080, inset 2px 2px #dfdfdf'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
