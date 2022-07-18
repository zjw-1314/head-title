import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // user是一个对象，存储当前登录用户信息（token等数据）
    // 从本地存储中获取数据，要把JSON格式的字符串转为对象
    user: getItem(TOKEN_KEY)
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // user: null
  },
  mutations: {
    // 设置用户登录信息
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新导致数据丢失，我们需要把数据备份到本地存储，实现数据的持久化
      // 由于本地存储只能存字符串，所以要把对象转为JSON格式的字符串，通过JSON.stringify()进行转换
      // window.localStorage.setItem(TOKEN_KEY,JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
