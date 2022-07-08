<template>
  <div id="app">
    黑马头条
    <i class="iconfont icon-fenxiang"></i>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <router-view/>
  </div>
</template>

<script>
export default {
  // 组件的名字，建议为每个组件添加名字
  name: 'App'
}
</script>

<style lang="less">

</style>
