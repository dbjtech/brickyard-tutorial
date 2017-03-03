// import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import { getAllMessages } from './store/actions'

Vue.config.debug = true

Vue.filter('time', timestamp => {
  return new Date(timestamp).toLocaleTimeString()
})

new Vue({
  el: '#brickyard-app',
  store,
  render: h => h(App)
})

getAllMessages(store)
