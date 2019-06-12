import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import rightMain from '@/components/findMusic/songList/rightMain/rightMain'
import Son from '@/components/findMusic/songList/son/son'
import Son1 from '@/components/findMusic/songList/son1/son1'
import Son2 from '@/components/findMusic/songList/son2/son2'
import Son3 from '@/components/findMusic/songList/son3/son3'
import SecondSon from '@/components/findMusic/songList/son/secondSon/secondSon'
import SecondSon1 from '@/components/findMusic/songList/son/secondSon1/secondSon1'
import SecondSon2 from '@/components/findMusic/songList/son1/secondSon2/secondSon2'
import SecondSon3 from '@/components/findMusic/songList/son1/secondSon3/secondSon3'
import ElementUI from 'element-ui'

/* 网易云音乐路由 */
import SongDetail from '@/components/findMusic/songDetail/songDetail'
import RecommendSon from '@/components/findMusic/recommend/recommendSon'
Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  routes: [{
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        component: RecommendSon
      },
      { 
        name: 'song',
        path: 'song',
        component: SongDetail
      },
      {
        path: 'home',
        name: 'home',
        //component: rightMain
      },
      /* {
        path: 'son',
        name: 'Son',
        component: Son,
        children: [{
            path: 'secondSon',
            name: 'SecondSon',
            //component: SecondSon
          },
          {
            path: 'secondSon1',
            name: 'SecondSon1',
            //component: SecondSon1
          }
        ]
      },
      {
        path: 'son1',
        name: 'Son1',
        component: Son1,
        children: [{
            path: 'secondSon2',
            name: 'SecondSon2',
            //component: SecondSon2
          },
          {
            path: 'secondSon3',
            name: 'SecondSon3',
            //component: SecondSon3
          }
        ]
      },
      {
        path: '/son2',
        name: 'Son2',
        //component: Son2
      },
      {
        path: '/son3',
        name: 'Son3',
        //component: Son3
      } */
    ]
  }]
})
