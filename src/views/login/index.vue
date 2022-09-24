<template>
  <div class="login-container">
    <!-- 导航栏组件 -->
    <van-nav-bar
      title="登录"
      class="page-nav-var">
      <!--
        Icon图标
        slot为插槽，用于自定义内容
        -->
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      />
    </van-nav-bar>

    <!-- 表单组件 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <!-- 用户名输入框 -->
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <!-- 通过slot属性自定义图标位置 -->
        <i slot="left-icon" class="iconfont icon-shouji"></i>
      </van-field>
      <!-- 验证码输入框 -->
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type="password"
        maxlength="6"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="iconfont icon-yanzhengma"></i>
        <!-- 插入按钮 native-type="button"属性防止触发表单提交 -->
        <template #button>
          <van-button
            class="get-msg-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="onSendSms"
          >
          <!--
            time: 倒计时时长
            format: 时间格式
            @finish: 倒计时结束时触发
           -->
            <van-count-down
              v-if="isCountDownShow"
              :time="1000 * 3"
              format="ss s"
              @finish="isCountDownShow = false"
            />
            <span v-else>获取验证码</span>
          </van-button>
        </template>
      </van-field>
      <div class="login">
        <van-button class="login-btn" block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
// 按需导入请求模块接口
import { login, sendSms } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      // 用户表单输入
      user: {
        mobile: '13811111111', // 手机号
        code: '246810' // 验证码
      },
      // 表单验证
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 是否展示倒计时
      isCountDownShow: false
    }
  },
  methods: {
    // 登录按钮方法
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      console.log(user)
      // 2. 表单验证

      // 在组件中必须通过this.$toast来调用Toast轻提示组件
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间，默认是2000，如果为0，持续展示
      })
      // 3. 提交表单请求登录
      try {
        const { data } = await login(user)
        // 把用户数据存储到Vuex容器中
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        // 路由跳转
        this.$router.push('/my')
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败，请稍后再试', error)
        }
      }
      // 4. 根据请求响应结果处理后续操作
    },
    // 发送验证码方法
    async onSendSms () {
      console.log('on')
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
        console.log('验证通过')
      } catch (error) {
        return console.log('验证失败', error)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
    margin-right: 30px;
  }
  .get-msg-btn {
    width: 162px;
    height: 46px;
    font-size: 22px;
    line-height: 46px;
    background-color: #ededed;
    color: #666;
  }
  .login {
    padding: 53px 33px 0;
    .login-btn {
      font-size: 30px;
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
