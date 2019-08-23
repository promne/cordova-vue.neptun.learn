import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/components/Profile')
    },
    {
      path: '/neptune',
      name: 'neptune',
      component: () => import('@/components/Neptune')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/components/NeptuneLogin')
    }
  ]
})
