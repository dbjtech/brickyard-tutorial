module.exports = {
	includes: ['vue'],
	modules: [
		'framework-frontend/webpack/index-template',
		'tutorial/vue/plan/counter',
		'tutorial/vue/counter',
	],
	config: {
		'buildtask-webpack-babel': {
			compileJS: true,
		},
	},
}
