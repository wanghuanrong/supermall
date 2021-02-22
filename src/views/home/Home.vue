<template>
  <div id="home" class="wrapper">
    <navbar  class="home-nav">
      <div slot="conter">购物车</div>
    </navbar>

    <scroll class="content" 
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <homeSwiper :banners="banners"></homeSwiper>

      <recommendview :recommends="recommends"></recommendview>

      <featureView></featureView>

      <tabcontrol
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tabcontrol>

      <good-list :goods="showGoods"></good-list>
    </scroll>

    
    <backtop @click.native="backClick" v-show="isShowBackTop"></backtop>
  </div>
</template>

<script>
// 头部导航栏（购物街）组件
import navbar from "@/components/common/navbar/NavBar";

// 得到首页数据的函数
import { getHomeMultidata, getHomeGoods } from "@/network/home";

// 封装好的轮播图组件
// import {Swiper, SwiperItem} from '@/components/common/swiper/index'
import homeSwiper from "@/views/home/childComps/homeSwiper";

// 推荐信息组件
import recommendview from "@/views/home/childComps/RecommendView";
import featureView from "./childComps/FeatureView";

// 流行、新款、精选 导航栏
import tabcontrol from "@/components/content/tabControl/TabControl";

// 列表组件
import GoodList from "@/components/content/goods/GoodsList";

// 滚动组件（better-scroll）
import scroll from "@/components/common/scroll/Scroll";

// 返回顶部组件
import backtop from '@/components/content/backTop/BackTop'

export default {
  name: "Home",
  components: {
    navbar,
    homeSwiper,
    recommendview,
    featureView,
    tabcontrol,
    GoodList,
    scroll,
    backtop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
    };
  },
  created() {
    // 请求导航栏数据（图片、文字）
    this.getHomeMultidata();

    // 请求列表数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted () {
    this.$refs.scroll.finishPullUp()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    /**
     * 事件监听相关的方法
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 800;
    },
    loadMore() {
      console.log('上拉了！');
      this.getHomeGoods(this.currentType);
      // this.$refs.scroll.scroll.refresh()
    },
    /**
     * 网络请求相关的方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
