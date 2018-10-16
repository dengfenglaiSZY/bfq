import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from 'vue-router'
import Recommend from '@/views/recommend/index.vue'
import Singer from '@/views/singer/index.vue'
import Rank from '@/views/rank'
import Search from '@/views/search'
import RecommendDetail from '@/views/singer/detail'
import SingerDetail from '@/views/singer/detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/',
      component:Recommend
    },
    {
      path:'/recommend',
      component:Recommend,
      children:[
        {
          path:'/recommend/:id',
          component:RecommendDetail
        }
      ]
    },
    {
      path:'/singer',
      component:Singer,
      children:[
        {
          path:'/singer/:id',
          component:SingerDetail
        }
      ]
    },
    {
      path:'/rank',
      component:Rank
    },
    {
      path:'/search',
      component:Search
    },
  ]
})
