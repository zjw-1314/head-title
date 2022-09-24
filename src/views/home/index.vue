<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-var"
      fixed>
      <!-- slot自定义插槽,可以插入任何内容-->
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表--Tab标签页 -->
    <!--
      通过 v-model 绑定当前激活标签对应的索引值，默认情况下启用第一个标签。
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
     -->
    <van-tabs
      v-model="active"
      animated
      swipeable
      class="channel-tabs"
    >
      <van-tab
        v-for="item in channels"
        :title="item.name"
        :key="item.id"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="item" />
      </van-tab>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont icon-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <!-- 频道编辑 -->
      <ChannelEdit
        :channels="channels"
        :active="active"
        @update-active="onUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
import ArticleList from '@/components/ArticleList'
import ChannelEdit from '@/components/ChannelEdit.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false // 控制编辑频道弹出层的显示状态
    }
  },
  computed: {
    // 把vuex容器中的user映射到组件中
    ...mapState(['user'])
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取我的频道列表
    async getChannels () {
      try {
        // const {
        //   data: { data },
        // } = await getUserChannels();
        // console.log(data)
        // this.channels = data.channels;

        // 已登录，请求获取用户频道列表
        if (this.user) {
          const { data: { data } } = await getUserChannels()
          this.channels = data.channels
        } else {
          // 未登录，判断是否有本地的频道列表数据
          const localChannels = getItem('TOUTIAO_CHANNELS')
          // 有，拿来使用
          if (localChannels) {
            this.channels = localChannels
          } else {
            // 没有，请求获取默认频道列表
            const { data: { data } } = await getUserChannels()
            this.channels = data.channels
          }
        }
      } catch (error) {
        this.$toast('获取频道数据失败')
      }
    },
    // 通过事件接收子传给父的值
    onUpdateActive (index, isClose = true) {
      // console.log('home',index);
      // 改变父元素的active的值
      // 更新激活的频道项
      this.active = index
      // 是否关闭频道弹出层
      this.isChannelEditShow = isClose
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  /*
    固定定位的底部标签栏脱离页面的文档流，导致覆盖了页面
    的底部视图，加上底部的内边距让内容显示出来
    从浏览器中读出的高度大小是布局视口的大小，所以真正的大小要乘2(50*2px)
  */
  padding-bottom: 100px;
  padding-top: 170px;
  .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /*
    当 <style> 标签有 scoped 属性时，它的 CSS 只作用于当前组件中的元素，父组件的样式将不会渗透到子组件。
    如果你希望 scoped 样式中的一个选择器能够作用得“更深”，例如影响子组件，你可以使用深度选择器。

    在style经常用scoped属性实现组件的私有化时，要改变第三方组件库的某个深层元素或其他深层样式时，
    需要用到以下深度作用选择器
    >>>（元素css支持），sass/less的话可能无法识别
    /deep/（sass/less可识别，在vue3.0会报错）
    ::v-deep（--vue 3.0支持，编译速度快）
    :deep()
  */
  :deep(.channel-tabs) {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 82px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active {
      color: #333333;
    }
    .van-tabs__line {
      width: 31px !important;
      background-color: #3296fa;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      text-align: center;
      i.iconfont {
        font-size: 30px;
      }
    }
  }
}
</style>
