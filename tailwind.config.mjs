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
		themes: ["sunset"],
		darkTheme: 'sunset',
		base: true,
		utils: true,
		styled: true,
		logs: true,
	},
}
