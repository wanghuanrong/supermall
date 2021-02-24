<template>
  <div>
      <detail-nav-bar :title="title"></detail-nav-bar>
      <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import detailNavBar from "./childComps/DetailNavBar"
import DetailSwiper from "./childComps/DetailSwiper"

import {getDetail} from '@/network/detail'
export default {
    name:'Detail',
    data(){
        return{
            iid: null,
            title:['商品', '参数', '评论', '推荐'],
            topImages: []
        }
    },
    components:{
        detailNavBar,
        DetailSwiper
    },
    created(){
        // 得到路由参数
        this.iid = this.$route.params.iid

        // 根据iid请求详情页数据
        getDetail(this.iid).then(res => {
            // console.log(res);

            this.topImages = res.result.itemInfo.topImages
        })
    }
}
</script>

<style>

</style>