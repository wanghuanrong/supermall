<template>
  <div class="detail">
    <detail-nav-bar class="detail-title" :title="title"></detail-nav-bar>
    <scroll class="content1" ref="ccc"
    :probeType="3"
    :pullUpLoad="true">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo"  @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import detailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";

// 滚动组件
import Scroll from "@/components/common/scroll/Scroll";

import { Goods, getDetail, Shop, GoodsParam } from "@/network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      title: ["商品", "参数", "评论", "推荐"],
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    };
  },
  components: {
    detailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  created() {
    // 得到路由参数
    this.iid = this.$route.params.iid;

    // 根据iid请求详情页数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      this.topImages = res.result.itemInfo.topImages;

      // 通过封装好的类，把三个数据封装到一个对象中
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

    //   获取店铺信息
      this.shop = new Shop(data.shopInfo);

    // 获取商品详细信息
      this.detailInfo = data.detailInfo;

    //   获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
    });
  },
  methods:{
      imageLoad(){
          this.$refs.ccc.refresh();
        //   console.log(this.$refs.ccc.scroll);
      }
  }
};
</script>

<style>
.detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}

.detail-title{
    position: relative;
    z-index: 99;
    background-color: #fff;
}

.content1{
    height: calc(100% - 44px);
    /* overflow: hidden; */
}
</style>