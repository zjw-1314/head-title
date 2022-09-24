<template>
  <div class="my-container">
    <!-- 登录状态 -->
    <!-- 2. v-if判断vuex容器中有没有用户登录 -->
    <div class="login header" v-if="user">
      <div class="user-info">
        <div class="left">
          <van-image
            round
            class="avatar"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            fit="cover"
          />
          <span>{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>

    <!-- 未登录状态 -->
    <div class="not-login header" v-else>
      <div class="login-btn" @click="loginHandle">
        <img src="~@/assets/img/mobile.png" alt="login-image" />
        <span>登录/注册</span>
      </div>
    </div>

    <!-- 宫格导航 -->
    <van-grid class="grid-nav" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="iconfont icon-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <!-- Cell单元格 -->
    <van-cell title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-cell
      v-if="user"
      clickable
      title="退出登录"
      @click="logoutHandle"
      class="logout-cell"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'My',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    /*
      1. 从vuex容器中查找用户有没有登录，用mapState模块来映射数据
    */
    ...mapState(['user'])
  },
  created () {
    // 3. 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    // 未登录事件
    loginHandle () {
      this.$router.push('/login')
    },
    // 退出登录事件
    logoutHandle () {
      // 退出提示
      // Dialog弹出框，用于消息提示、消息确认
      // 在组件中需要使用this.$dialog来调用弹窗
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // 确认退出：清除登录状态（容器中的user和本地存储中的user）
          console.log('确认执行这里')
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消执行这里')
        })
    },
    // 加载用户信息事件
    async loadUserInfo () {
      try {
        const {
          data: { data }
        } = await getUserInfo()
        console.log(data)
        this.userInfo = data
      } catch (error) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    // 在样式中使用@符号要在前面加~
    background: url("~@/assets/img/banner.png");
    background-size: cover;
    .login-btn {
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 132px;
      }
      span {
        font-size: 28px;
        color: #fff;
        margin-top: 10px;
      }
    }
    .user-info {
      display: flex;
      box-sizing: border-box;
      height: 231px;
      padding: 76px 32px 23px;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        font-size: 30px;
        color: #ffffff;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 1px solid #fff;
        }
      }
    }
    .data-info {
      display: flex;
      height: 100px;
      align-items: center;
      .data-item {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: center;
        color: #ffffff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 10px;
    .grid-item {
      i.iconfont {
        font-size: 40px;
      }
      i.icon-shoucang {
        color: #eb5253;
      }
      i.icon-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 28px;
        color: #333333;
      }
    }
  }
  .logout-cell {
    text-align: center;
    margin-top: 10px;
    color: #f00;
  }
}
</style>
