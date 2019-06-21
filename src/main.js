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
import cookies from 'js-cookie'
import ElmentUI from 'element-ui'
Vue.use(bus)
Vue.use(ElmentUI)
Vue.prototype.$bus = bus
Vue.prototype.dataset = dataset
Vue.prototype.commonData = commonData
Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.moment = moment;
Vue.prototype.Cookies = cookies;
//Vue.prototype.Cookies = cookies;
axios.defaults.baseURL = 'http://localhost:3000'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  moment,
  cookies,
  components: { App },
  template: '<App/>'
})
