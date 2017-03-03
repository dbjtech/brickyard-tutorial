// import 'babel-polyfill'
import Vue from 'vue'
import Counter from './Counter.vue'
import store from './store'

new Vue({
  el: '#brickyard-app',
  store,
  render: h => h(Counter)
})
