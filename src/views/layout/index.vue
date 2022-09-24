<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />

    <!-- 标签导航栏 -->
    <!--
      route属性用于开启路由模式
     -->
    <van-tabbar class="layout-tabbar" route>
      <van-tabbar-item to="/">
        <!-- 自定义图标 -->
        <i slot="icon" class="iconfont icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/answer">
        <!-- 自定义图标 -->
        <i slot="icon" class="iconfont icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <!-- 自定义图标 -->
        <i slot="icon" class="iconfont icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <!-- 自定义图标 -->
        <i slot="icon" class="iconfont icon-wode"></i>
        <!--
          当从vuex容器获取状态次数少时，我们直接使用$store.state获取状态
          反之使用mapState来映射状态
          -->
        <span class="text">{{ $store.state.user ? "我的" : "未登录"}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
    .layout-tabbar {
        i.iconfont {
            font-size: 40px;
        }
        span.text {
            font-size: 20px;
        }
    }
}
</style>
