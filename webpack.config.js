const path = require('path');
const dotenv = require('dotenv');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");


var env = dotenv.config().parsed;
var envKeys = Object.keys(env).reduce(function (prev, next) {
	prev['process.env.' + next] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	mode: 'development',
	entry: './index.js',

	output: {
		publicPath: '/',

		path: path.resolve(__dirname, 'public/dist'),
		filename: '[name].[contenthash].js', // Add [contenthash] to ensure unique filenames
		chunkFilename: '[name].bundle.js', // Define the filename pattern for dynamically imported modules
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index_template.html", // to import index.html file inside index.js
		}),
		new webpack.DefinePlugin(envKeys)
	],
	devtool: 'inline-source-map',
	target: 'web',
	devServer: {
		port: '9500',
		static: ['./public'],
		open: true,
		hot: true,
		liveReload: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.css'],
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-syntax-dynamic-import']
					},
				},
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
};
