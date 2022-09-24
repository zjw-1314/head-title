<template>
  <div class="search-history">
    <!-- 单元格 -->
    <van-cell title="搜索历史">
        <span>全部删除</span>
        <span>完成</span>
        <!-- 图标 -->
        <van-icon name="delete"/>
    </van-cell>
    <van-cell title="hello">
        <van-icon name="close"/>
    </van-cell>
    <van-cell title="hello">
        <van-icon name="close"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
    .search-history {
        span {
            margin-right: 10px;
        }
    }
</style>
