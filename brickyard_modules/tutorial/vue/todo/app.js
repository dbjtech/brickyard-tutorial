// import 'babel-polyfill'
import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

new Vue({
  store, // inject store to all children
  el: '#brickyard-app',
  render: h => h(App)
})
