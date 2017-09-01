module.exports = {
	includes: ['vue'],
	modules: [
		'framework-frontend/webpack/index-template',
		'tutorial/vue/plan/counter-hot',
		'tutorial/vue/counter-hot',
	],
	config: {
		'buildtask-webpack-babel': {
			compileJS: true,
		},
	},
}
