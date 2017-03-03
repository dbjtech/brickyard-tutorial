module.exports = {
	modules: [
		'buildtask/install',
		'buildtask/webpack/build',
		'buildtask/webpack/split-vendor',
		'buildtask/webpack/css',
		'buildtask/webpack/json',
		'buildtask/webpack/resource',
		'buildtask/webpack-react-native',
		'buildtask/watch',
		'buildtask/run',
		'framework/webserver/webpack-dev-server',
		'framework-frontend/react-native-web-polyfill',
		'framework-frontend/webpack/index-template',

		'tutorial/react-native',
	],
	config: {
	},
}