
module.exports = {
	/*********
		BASE
	**********/
	FILE_NAME: 'bundle.js',


	/*********
		DEV
	**********/
	DEV_SERVER_PORT: 7015,
	// if changing this, update the paths in index.html
	PUBLIC_PATH: '/assets/',
	EXTERNAL_PROXY_PORT: 2222,


	/*********
		PROD
	**********/
	// assets directory relative to root of project
	ASSETS_DIR: './docs',
	// directory where build assets will be resolved to on server.
	// so if your static assets are server from `/static/vendor.js`,
	// then change to `/static/`
	BUILD_PUBLIC_PATH: '/96-clocks/'
}
