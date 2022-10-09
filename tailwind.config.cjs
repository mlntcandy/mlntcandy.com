/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'primary': '#FF86DD',
				'secondary': '#FFA48F',
				'seastone': '#30393E',
				'deepslate': '#222222',
				'shallowslate': '#262829'
			}
		},
		fontFamily: {
			'mono': ['DM Mono', 'monospace'],
			'display': ['Inter', 'ui-sans-serif'],
			'sans': ['Inter', 'ui-sans-serif']
		}
	},
	plugins: [],
}
