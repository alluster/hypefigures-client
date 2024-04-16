import path from 'path';
import dotenv from 'dotenv';
import webpack from 'webpack';
var env = dotenv.config().parsed;
var envKeys = Object.keys(env).reduce(function (prev, next) {
	prev['process.env.' + next] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	plugins: [
		new webpack.DefinePlugin(envKeys)
	],
	devtool: 'inline-source-map',
	mode: 'development',
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'main.js',
	},
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
				use: 'babel-loader',
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
};
