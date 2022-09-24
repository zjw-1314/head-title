<template>
  <div class="search-container">
    <!--
      Tips: 在 van-search 外层增加 form 标签，且 action 不为空，即可在 iOS 输入法中显示搜索按钮。
     -->
     <!-- 搜索栏 -->
    <form class="search-form" action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 搜索结果 -->
    <SearchResult
      v-if="isResultShow"
      :search-text="searchText"
    />

    <!-- 联想建议 -->
    <SearchSuggestion
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    />

    <!-- 搜索历史记录 -->
    <SearchHistory
      v-else
      :searchText="searchText"
    />

  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  data () {
    return {
      searchText: '',
      // 控制搜索结果的显示
      isResultShow: false
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.searchText = val
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      // 从哪个页面来就会哪个页面去
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
  .search-container {
    padding-top: 108px;
    .van-search__action {
      color: #fff;
    }
    .search-form {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
</style>
