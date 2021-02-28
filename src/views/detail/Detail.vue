<template>
  <div class="detail">
    <!-- 头部 -->
    <detail-nav-bar
      class="detail-title"
      :title="title"
      @navBarClick="navBarClick"
      ref="navbar"
    ></detail-nav-bar>

    <!-- 滚动组件 -->
    <scroll
      class="content1"
      ref="ccc"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="scroll"
    >
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"></detail-swiper>

      <!-- 三个商品信息组件 -->
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>

      <!-- 参数组件 -->
      <detail-param-info
        :paramInfo="paramInfo"
        ref="paramInfo"
      ></detail-param-info>

      <!-- 评论组件 -->
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="commentInfo"
      ></detail-comment-info>

      <!-- 推荐组件 -->
      <div class="tj-title">推荐</div>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>

    <!-- 返回顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

    <!-- 底部 -->
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import detailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

// 公共组件
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import {
  Goods,
  getDetail,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
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
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      isShowBackTop: false,
    };
  },
  components: {
    detailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    BackTop,
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

      //   获取商品详细信息
      this.detailInfo = data.detailInfo;

      //   获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      //   获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 获取推荐信息
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.ccc.refresh();
      //   console.log(this.$refs.ccc.scroll);

      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.paramInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop);

      // console.log(this.themeTopYs)
    },
    navBarClick(index) {
      // console.log(index);
      this.$refs.ccc.scrollTo(0, -this.themeTopYs[index], 200);
    },
    scroll(position) {
      // console.log(position);
      // 1、获取y值
      const positionY = -position.y;

      // console.log(positionY);

      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY > this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY > this.themeTopYs[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.navbar.currIndex = this.currentIndex;
        }
      }

      this.isShowBackTop = -position.y > 800;
    },
    backClick() {
      this.$refs.ccc.scrollTo(0, 0);
    },
    addToCart(){
      // console.log("xx");
      // 点击加入购物车之后得到，该商品信息，并保存到vuex中
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // console.log(product);
      this.$store.commit("addCart", product)
    }
  },
};
</script>

<style>
.detail {
  position: relative;
  z-index: 99;
  background-color: #fff;
  height: 100vh;
}

.detail-title {
  position: relative;
  z-index: 99;
  background-color: #fff;
}

.content1 {
  height: calc(100% - 44px - 50px);
  /* overflow: hidden; */
}

.tj-title {
  height: 40px;
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  line-height: 40px;
  margin: 10px 0;
}
</style>