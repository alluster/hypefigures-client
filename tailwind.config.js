
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	// darkMode: false, // or 'media' or 'class'
	theme: {

		extend: {

			fontFamily: {
				'sans': ['Rubik', 'sans-serif']
			},
			colors: {
				'text-white': '#ffffff',
			},
		}

	},
	variants: {
		extend: {},
	},
	plugins: [],
};