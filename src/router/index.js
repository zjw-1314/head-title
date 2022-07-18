import Vue from 'vue'
import VueRouter from 'vue-router'

// 注册路由
Vue.use(VueRouter)

// 配置路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    // 路由懒加载
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
