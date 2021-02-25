<template>
  <div>
      <swiper class="detailSwiper">
          <swiper-item v-for="(item, index) in topImages" :key="index">
              <!-- <a href=""> -->
                  <img :src="item" alt="" >
              <!-- </a> -->
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index'

export default {
    name: 'DetailSwiper',
    props:{
        topImages:{
            type: Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    },
    methods:{
        // imgaeLoad(){
        //     this.$emit("imageLoad")
        // }
    }
}
</script>

<style>
.detailSwiper{
    height: 250px;
}
</style>