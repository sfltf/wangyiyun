import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import ElementUI from 'element-ui'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
