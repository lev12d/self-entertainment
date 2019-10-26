// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'
import Vant from 'vant'
import 'vant/lib/index.css'
import  api from './api/index.js'
import './icons/index.js'

Vue.config.productionTip = false

Vue.prototype.$api = api
Vue.use(Vant)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
