<template>
  <div class="goods-info">
      <div>{{detailInfo.desc}}</div>
      <div v-for="(item, index) in detailInfo.detailImage" :key="index">
          <div>{{item.key}}</div>
          <div v-for="(item2, index2) in item.list" :key="index2" class="img-box">
              <img :src="item2" alt="" @load="imageLoad">
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      dafault() {
        return {};
      },
    },
  },
  methods:{
      imageLoad(){
          this.$emit("imageLoad");
      }
  }
};
</script>

<style>
.goods-info .img-box{
    width: 70%;
    margin: 3px auto;
}
.goods-info .img-box img{
    width: 100%
}
</style>