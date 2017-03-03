module.exports = {
	modules: [
		'buildtask/install',
		// 'buildtask/build-script/typescript',
		'buildtask/webpack/build',
		'buildtask/webpack/split-vendor',
		'buildtask/webpack/resource',
		'buildtask/webpack-angular2',
		'framework/webserver/webpack-dev-server',
		'buildtask/watch',
		'buildtask/run',

		'framework-frontend/angular2/common',
		'framework-frontend/webpack/index-template',
		'tutorial/angular2',
	],
	config: {
	},
}
