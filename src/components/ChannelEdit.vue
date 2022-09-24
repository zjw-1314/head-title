<template>
  <div class="channel-detail">
    <!-- 我的频道 -->
    <van-cell>
      <div
        slot="title"
        class="title-text">我的频道</div>
      <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="small"
        @click="editChannel"
        >
        {{ isShow ? '完成' : '编辑'}}
      </van-button>
    </van-cell>
    <!-- Grid 宫格 -->
    <van-grid
      class="my-grid"
      :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in channels"
        :key="channel.id"
        @click="deleteChannel(channel,index)"
      >
        <!--
          v-bind:class（:class） 语法
          一个对象，对象中的 key 表示要作用的类名
                   对象中的 value 表示要计算出的布尔值
                      true则作用该类名
                      false不作用该类名
         -->
        <!-- 单独控制图标，用icon属性不易控制图标的显示与隐藏 -->
        <van-icon
          slot="icon"
          name="clear"
          v-show="isShow && !fiexChannels.includes(channel.id)"
          >
        </van-icon>
        <span
          class="text"
          :class="{ active: index === active }"
          slot="text"
        >
          {{ channel.name }}
        </span>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell>
      <div
        slot="title"
        class="title-text">频道推荐</div>
    </van-cell>
    <!-- Grid 宫格 -->
    <van-grid
      class="recommend-grid"
      :gutter="10">
      <van-grid-item
        class="grid-item"
        v-for="(recommendChannel,index) in recommendChannels"
        :key="index"
        icon="plus"
        :text="recommendChannel.name"
        @click="addChannel(recommendChannel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'

export default {
  name: 'ChannelEdit',
  // 子组件不能修改props里面的值
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  components: {},
  data () {
    return {
      allChannels: [], // 所有频道
      isShow: false, // 控制我的频道中右上角图标的显示与隐藏
      fiexChannels: [0] // 固定频道的id，不允许删除
    }
  },
  computed: {
    // 把容器中的user映射到组件中
    ...mapState(['user']),
    // 计算属性会观测内部依赖数据的变化
    // 如果依赖的数据发生变化，则计算属性会重新执行
    recommendChannels () {
      // 数组的 filter 方法
      // 遍历数组，把符合条件的元素存储到新数组中并返回
      return this.allChannels.filter(channel => {
        // const channels = []
        // 数组的 find 方法
        // 遍历数组，把符合条件的第一个元素返回
        return !this.channels.find(myChannel => {
          return channel.id === myChannel.id
        })
        // return channels
      })
    }
    // recommendChannels(){
    //   const recChannels = []
    //   this.allChannels.forEach(channel => {
    //     // find 遍历数组，找到满足条件的元素项
    //     const result = this.channels.find(myChannel => {
    //       return allChannel.id === channel.id
    //     })
    //     // 如果我的频道中不包含该频道项，则收集到推荐频道中
    //     if (!result) {
    //       recChannels.push(channel)
    //     }
    //   })
    //   // 把计算结果返回
    //   return recChannels
    // }
  },
  methods: {
    // 获取所有频道
    async loadAllChannels () {
      try {
        const { data: { data } } = await getAllChannels()
        console.log(data)
        this.allChannels = data.channels
      } catch (error) {
        this.$toast('数据获取失败')
      }
    },
    // 添加频道事件
    async addChannel (channel) {
      // console.log(channel)
      this.channels.push(channel)

      // 数据持久化处理
      if (this.user) {
        try {
          // 已登录，把数据请求接口放到线上
          await addUserChannel({
            id: channel.id, // 频道ID
            seq: this.channels.length // 序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录，把数据存储到本地
        setItem('TOUTIAO_CHANNELS', this.channels)
      }
    },
    // 编辑频道事件
    editChannel () {
      this.isShow = !this.isShow
    },
    // 删除频道事件
    async deleteChannel (channel, index) {
      // console.log(this.active)
      if (this.isShow) {
        // 如果是固定频道，则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        // 编辑状态，执行删除频道
        // 参数1：要删除的元素的开始索引（包括该索引）
        // 参数2：删除的个数，如果不指定，则从参数1开始一直删除到最后
        // 如果删除的是激活频道之前的频道，则更新激活的频道项
        if (index <= this.active) {
          // 让激活频道的索引 -1
          this.$emit('update-active', this.active - 1, true)
        }
        this.channels.splice(index, 1)

        try {
          // 数据持久化操作
          if (this.user) {
            // 已登录，则将数据更新到线上
            await deleteUserChannel(channel.id)
          } else {
            // 未登录，将数据更新到本地
            setItem('TOUTIAO_CHANNELS', this.channels)
          }
        } catch (error) {
          this.$toast('删除失败，请稍后重试')
        }
      } else {
        // 非编辑状态，执行切换频道
        // 子给父传值用事件
        this.$emit('update-active', index, false)
      }
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scoped>
.channel-detail {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    font-size: 26px;
    color: #f85959;
  }
  :deep(.grid-item) {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      // 文字不换行
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,.text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  :deep(.my-grid) {
    .grid-item {
      .van-icon-clear {
        // 子绝父相，相对于最近的开启定位的父元素
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .active {
        color: red;
      }
    }
  }
  :deep(.recommend-grid) {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
