<template>
  <div class="search-suggestion">
    <!-- 单元格 -->
    <van-cell
        v-for="(text,index) in suggestions"
        icon="search"
        :key="index"
        @click="$emit('search',text)"
    >
    <div slot="title" v-html="highLight(text)"></div>
  </van-cell>

    <!-- v-text相当于{{htmlStr}}只显示纯文本，不解析html标签 -->
    <p v-text="htmlStr"></p>

    <!-- v-html会解析文本中的html标签 -->
    <p v-html="htmlStr"></p>

  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
// 按需加载有好处：只会把使用到的成员打包到结果中
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: [], // 存储请求的联想数据
      htmlStr: '<div style="color:red">hello</div>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当searchText发生改变的时候就会调用handler函数
      // 注意：handler函数名称是固定的
      // handler(val){
      //     console.log(val)
      //     this.loadSearchSuggestion(val)
      // },
      // 进行防抖优化
      // 参数1：一个函数
      // 参数2：延迟函数，单位是毫秒
      // 返回值：防抖之后的函数
      // 在200毫秒内持续输入，则重新计算时间不发送请求，输入间隔大于200毫秒才会发送请求
      handler: debounce(function (val) {
        console.log(val)
        this.loadSearchSuggestion(val)
      }, 200),
      immediate: true // 该回调将会在侦听开始之后就立即调用
    }
  },
  methods: {
    // 请求获取搜索建议的数据
    async loadSearchSuggestion (q) {
      try {
        const { data: { data } } = await getSearchSuggestion(q)
        console.log(data)
        this.suggestions = data.options
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    highLight (text) {
      const highlightstr = `<span class="active">${this.searchText}</span>`
      // 正则表达式 //中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动new RegExpl
      // RegExp正则表达式构造函数
      //      参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //      参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightstr)
    }
  }
}
</script>

<style lang="less" scoped>
  .search-suggestion {
    // 深度作用
    :deep(span.active) {
      color: red;
    }
  }
</style>
