module.exports = {
	includes: ['vue'],
	modules: [
		'framework-frontend/webpack/index-template',
		'tutorial/vue/logger',
		'tutorial/vue/plan/shopping-cart',
		'tutorial/vue/shopping-cart',
	],
	config: {
		'buildtask-webpack-babel': {
			compileJS: true,
		},
	},
}
