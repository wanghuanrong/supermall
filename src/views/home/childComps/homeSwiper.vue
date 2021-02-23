<template>
  <div class="homeSwiper">
      <swiper>
      <swiper-item v-for="(item, id) in banners" :key="id">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
// 封装好的轮播图组件
  import {Swiper, SwiperItem} from '@/components/common/swiper/index'

export default {
    name: 'homeSwiper',
    props:['banners'],
    components: {
        Swiper,SwiperItem
    },
    methods: {
      imageLoad(){
        this.$emit("swiperImageLoad");
      }
    }
}
</script>

<style>
/* .homeSwiper{
  margin-top: 50px;
} */
</style>