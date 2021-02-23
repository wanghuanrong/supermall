<template>
  <div id="home" class="wrapper">
    <navbar class="home-nav">
      <div slot="center">购物车</div>
    </navbar>

    <tabcontrol
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tabcontrol>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <homeSwiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></homeSwiper>

      <recommendview :recommends="recommends"></recommendview>

      <featureView></featureView>

      <tabcontrol
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
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
import backtop from "@/components/content/backTop/BackTop";

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
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  created() {
    // 请求导航栏数据（图片、文字）
    this.getHomeMultidata();

    // 请求列表数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

    // 监听图片加载之后发送过来的时间
    // this.$bus.$on("itemImageLoad", () => {
    //   console.log("---");
    //   this.$refs.scroll.refresh();
    // });
  },
  mounted() {
    // 防抖动，如果每次加载图片之后都刷新滚动高度，非常印象效率。
    // 使用这种方法，如果一小段时间内没有图片加载，再来执行
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    // this.$refs.scroll.finishPullUp()
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
    swiperImageLoad() {
      // console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 800;

      // if(this.tabOffsetTop <= -position.y){
      //   this.isTabFixed = true
      // }else{
      //   this.isTabFixed = false
      // }

      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    loadMore() {
      console.log("上拉了！");
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

        this.$refs.scroll.finishPullUp();
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

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 999;
}
/*.content {*/
/*height: calc(100% - 93px);*/
/*overflow: hidden;*/
/*margin-top: 44px;*/
/*}*/
</style>
