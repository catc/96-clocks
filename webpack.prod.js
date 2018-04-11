const { resolve } = require('path');
const {
	readFile,
	writeFile,
	unlinkSync,
	readdirSync,
	mkdirSync,
	lstatSync
} = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

// config
const config = require('./webpack.base');
const {
	ASSETS_DIR,
	BUILD_PUBLIC_PATH
} = require('./config');
const OUTPUT_DIR = resolve(__dirname, ASSETS_DIR)

clearAssetsDir();


// set mode
config.mode = 'production'

config.output = {
	// path: config.output.path,
	path: OUTPUT_DIR,

	// required for chunks to be loaded from `/assets/` dir correctly
	publicPath: BUILD_PUBLIC_PATH,
	
	// fingerprinting
	filename: '[name].[chunkhash].js',
	chunkFilename: '[name].[chunkhash].js'
};



// css
const extractRegularCSS = new ExtractTextPlugin({
	filename: 'main.[contenthash].css',

	// combines chunked css into main css
	allChunks: true,
});

// optimizations (uglify + chunk splitting)
config.optimization = {
	// minimize: false, // for debugging
	splitChunks: {
		cacheGroups: {
			// splits node_module dependencies into separate vendor chunk
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendor',
				chunks: 'initial'
			},
			/*otherChunk: {
				test: (module, chunk) => {
					module.context // path of module
					module.resource // module file
				},
			}*/
		}
	}
};

// add build plugins
[].push.apply(config.plugins, [
	// extract css
	extractRegularCSS,

	// retains hashnames for unmodified chunks
	new webpack.HashedModuleIdsPlugin(),

	// define env variables
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),

	// generate manifest
	new AssetsPlugin({
		filename: 'manifest.json',
		path: OUTPUT_DIR
	}),
]);

if (process.env.NODE_ANALYZE){
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
	config.plugins.push(new BundleAnalyzerPlugin({
		analyzerMode: 'static'
	}))
}

// css
const ExtractCSS = extractRegularCSS.extract({
	use: [
		{
			loader: 'css-loader',
		},
		{
			loader: 'postcss-loader',
			options: {
				plugins: [
					require('autoprefixer')({
						browsers: [
							'> 1%',
							'Safari 8',
							'Last 2 versions'
						]
					}),
					// bundled with `css-loader`
					require('cssnano')({
						reduceIdents: false,
						discardUnused: false
					}),
				]
			}
		},
		{
			loader: 'sass-loader',
		}
	]
});
config.module.rules[1].use = ExtractCSS;


// build
webpack(config, (err, stats) => {
	if (err){
		console.error(err)
		throw new Error('Error building bundle')
	}
	console.log(`Successfully built bundle in "${config.output.path}"`);

	// handle errors + warnings
	const info = stats.toJson();
	const br = '----------------------';
	if (stats.hasErrors()) {
		console.error(`${br}\n`, info.errors, `\n${br}`);
	}
	if (stats.hasWarnings()) {
		console.error(`${br}\n`, info.warnings, `\n${br}`);
	}

	// log stats
	console.log(`${br}\n`, stats.toString({
		chunks: true,
		colors: true,
		modules: false,
		chunkModules: false
		// hash: true
	}))

	copyHTML();
})

function copyHTML(){
	const manifest = require(resolve(OUTPUT_DIR, 'manifest.json'));
	
	// copy `index.html` to /dist
	const HTML_ENTRY = resolve(__dirname, 'index.html');
	const HTML_OUTPUT = resolve(OUTPUT_DIR, 'index.html');
	readFile(HTML_ENTRY, 'utf8', function(err, html) {
		if (err) {
			return console.log(err);
		}

		let result = html.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
		if (manifest.vendor){
			result = result.replace(/<!-- VENDOR_JS -->/, createScript(manifest.vendor.js))
		}
		result = result.replace(/<!-- BUNDLE_JS -->/, createScript(manifest.bundle.js))
		result = result.replace(/<!-- BUNDLE_CSS -->/, createStylesheet(manifest.bundle.css))

		writeFile(HTML_OUTPUT, result, 'utf8', function (err) {
			if (err){
				return console.log(err)
			};
		});
	});

	function createScript(path){
		return `<script defer src="${path}"></script>`
	}
	function createStylesheet(path){
		return `<link rel="stylesheet" type="text/css" href="${path}">`
	}
}

function clearAssetsDir(){
	try {
		if (lstatSync(OUTPUT_DIR)){
			// remove everything in output directory
			console.log(`Removing everything in "${OUTPUT_DIR}"...`)
			readdirSync(OUTPUT_DIR)
				.forEach(filename => {
					const filepath = resolve(OUTPUT_DIR, filename)
					if (lstatSync(filepath).isFile()){
						unlinkSync(filepath)
					}
				})
		}
	} catch (err){
		mkdirSync(OUTPUT_DIR);
	}
}