module.exports = {
	includes: ['vue'],
	modules: [
		'framework-frontend/webpack/index-template',
		'tutorial/vue/logger',
		'tutorial/vue/plan/todo',
		'tutorial/vue/todo',
	],
	config: {
		'buildtask-webpack-babel': {
			compileJS: true,
		},
	},
}
