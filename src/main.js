// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import bus from './clientBus'
import dataset from './dataset'
import commonData from './store'
Vue.use(bus)
Vue.prototype.$bus = bus
Vue.prototype.dataset = dataset
Vue.prototype.commonData = commonData
Vue.config.productionTip = false
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
