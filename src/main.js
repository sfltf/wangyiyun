// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import moment from 'moment'
import axios from 'axios'
import bus from './clientBus'
import dataset from './dataset'
import commonData from './commData'
import store from './store/index'
Vue.use(bus)
Vue.prototype.$bus = bus
Vue.prototype.dataset = dataset
Vue.prototype.commonData = commonData
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.moment = moment;
axios.defaults.baseURL = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  moment,
  components: { App },
  template: '<App/>'
})
