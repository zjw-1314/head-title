<template>
  <van-cell class="article-item">
    <!--
      Style内置样式
      van-multi-ellipsis--l2
      这是一段最多显示两行的文字，多余的内容会被省略
     -->
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <!-- 展示三张图片文章 -->
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image :src="img" class="cover-image" />
        </div>
      </div>
      <div class="cover-content">
        <span>置顶</span>
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 展示一张图片的文章 -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      :src="article.cover.images[0]"
      fit="cover"
      class="right-image"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-image {
    width: 232px;
    height: 146px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      /*
      & 表示父元素，这里指.cover-item
      :not(:last-child)指不包括最后一个元素
      */
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-image {
        width: 100%;
        height: 146px;
      }
    }
  }
  .cover-content {
    font-size: 22px;
    span {
      margin-right: 25px;
    }
    span:nth-child(1) {
      color: #e22829;
      font-size: 25px;
    }
  }
}
</style>
