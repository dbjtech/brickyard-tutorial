module.exports = {
	modules: [
		'buildtask/install',
		'buildtask/webpack/build',
		'buildtask/webpack/babel',
		'buildtask/webpack/common-shim',
		'buildtask/webpack/split-vendor',
		'buildtask/webpack/resource',
		'buildtask/webpack/css',
		'buildtask/webpack-vue',
		'framework/webserver/webpack-dev-server',
		'buildtask/watch',
		'buildtask/run',

		'framework-frontend/webpack/index-template',
		'tutorial/vue/logger',
		'tutorial/vue/plan/chat',
		'tutorial/vue/chat',
	],
	config: {
		'buildtask-webpack-babel': {
			compileJS: true,
		},
	},
}
