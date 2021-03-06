const { resolve } = require('path');

const config = {
	context: resolve(__dirname),
	entry: {
		bundle: 'src/index.ts',
	},
	output: {
		filename: '[name].js',
	},

	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				exclude: /(node_modules|bower_components)/,
				use: 'awesome-typescript-loader'
			},
			{
				test: /\.(s?)css$/,
				use: [
					{
						loader: 'css-loader',
						options: {
							alias: {}
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								// apparently don't need to do separate install
								// since postcss loader installs it
								require('autoprefixer')(),
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							// includePaths: ['node_modules/foundation-sites/scss']
						}
					},
				]
			}
		]
	},

	plugins: [],

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			src: resolve(__dirname, 'src'),
			styles: 'src/styles',
			utils: 'src/utils',
		}
	},

	stats: {
		colors: true
	}
};

module.exports = config;