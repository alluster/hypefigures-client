
module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: true, // or 'media' or 'class'
	theme: {

		extend: {

			fontFamily: {
				'sans': ['Rubik', 'sans-serif']
			}
		}

	},
	variants: {
		extend: {},
	},
	plugins: [],
};