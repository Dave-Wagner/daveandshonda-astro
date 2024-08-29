/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				'great-vibes': ['"Great Vibes"', 'cursive'],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('daisyui'),
	],
	daisyui: {
		themes: [{
			'royal': {
				"primary": "#FFC107",        // Sunflower yellow
				"primary-content": "#1A237E", // Dark navy blue for contrast
				"secondary": "#FFD54F",      // Lighter yellow for secondary elements
				"secondary-content": "#1A237E",
				"accent": "#3D5AFE",         // Bright blue from QR code
				"accent-content": "#FFFFFF",
				"neutral": "#1A237E",        // Dark navy blue background
				"neutral-content": "#FFFFFF",
				"base-100": "#1A237E",       // Dark navy blue
				"base-200": "#283593",       // Slightly lighter navy blue
				"base-300": "#303F9F",       // Even lighter navy blue
				"base-content": "#FFFFFF",   // White text for readability
				"info": "#64B5F6",           // Light blue
				"info-content": "#1A237E",
				"success": "#81C784",        // Green (complementary to the sunflower theme)
				"success-content": "#1A237E",
				"warning": "#FFB74D",        // Orange (related to sunflower color)
				"warning-content": "#1A237E",
				"error": "#E57373",          // Soft red
				"error-content": "#1A237E",
			}
		}],
		darkTheme: 'royal',
		base: true,
		utils: true,
		styled: true,
		logs: true,
	},
}
