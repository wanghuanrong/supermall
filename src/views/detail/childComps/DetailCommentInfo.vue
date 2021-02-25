<template>
  <div v-if="Object.keys(commentInfo).length !== 0">
      <div class="comment-title">评论</div>
      <div>
          <img :src="commentInfo.user.avatar" alt="">
          <span>{{commentInfo.user.uname}}</span>
      </div>
      <div>
          <p>{{commentInfo.content}}</p>
          <div>
              <span>{{commentInfo.created | showDate}}</span>
              <span>{{commentInfo.style}}</span>
          </div>
          <div>
              <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" alt="">
          </div>
      </div>
  </div>
</template>

<script>
import {formatDate} from '@/common/utils.js';

export default {
    name:'DetailCommentInfo',
    props:{
        commentInfo:{
            type: Object,
            default(){
                return {}
            }
        }
    },
    // 过滤器
    filters:{
        showDate(value){
            // 把时间戳转成date对象
            const date = new Date(value * 1000)

            // 将date进行格式化
            return formatDate(date, 'yyyy-MM-dd')
        }
    }
}
</script>

<style>
.comment-title{
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    line-height: 25px;
}
</style>