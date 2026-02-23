/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		fontFamily: {
			'display': ["Chakra Petch", 'system-ui'],
			'body': ["Questrial", 'sans-serif'],
		},
		extend: {
			colors: {
				custom: {
					light: "#cdcac5",
					dark: "#383838"
				}
			}
		},
	},
	plugins: [],
}
