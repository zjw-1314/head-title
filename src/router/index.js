import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册路由
Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/',
    // name: 'layout' 如果副路由有默认子路由，那它的name没有意义
    component: () => import('@/views/layout'),
    // 二级路由
    children: [
      {
        path: '', // 默认子路由，只能有1个
        name: 'home',
        // 路由懒加载
        component: () => import('@/views/home')
      },
      {
        path: 'answer',
        name: 'answer',
        // 路由懒加载
        component: () => import('@/views/answer')
      },
      {
        path: 'video',
        name: 'video',
        // 路由懒加载
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        name: 'my',
        // 路由懒加载
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    // 路由懒加载
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  routes
})

export default router
