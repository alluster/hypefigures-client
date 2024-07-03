const tailwindcss = require('tailwindcss');
const postcssPresetEnv = require('postcss-preset-env');
const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		tailwindcss,
		postcssPresetEnv,
		autoprefixer
	],
};
