// 请求模块
import axios from 'axios'
// 默认找@/store下的index.js，所以后面的index.js可以省略
import store from '@/store'
const request = axios.create({
  // 接口的基准路径
  baseURL: 'http://toutiao.itheima.net'
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config:本次请求的请求配置对象
  // console.log('config',config);
  const { user } = store.state
  if (user && user.token) {
    // 对需要授权的接口做统一处理，这样就不要为每个接口写单独的
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意，这里务必返回config配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
