// import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import { currency } from './currency'

Vue.filter('currency', currency)

new Vue({
  el: '#brickyard-app',
  store,
  render: h => h(App)
})
