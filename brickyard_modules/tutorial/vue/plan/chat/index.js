module.exports = {
	includes: ['vue'],
	modules: [
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
