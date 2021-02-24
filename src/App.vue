<template>
  <div id="app" class="wrapper">
    <!-- keep-alive 防止路由被销毁 include 设置不被销毁组件名（不设置表示所有组件不销毁）-->
    <keep-alive include="Home">
      <router-view />
    </keep-alive>

    <main-tab-bar />
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  name: "app",
  components: {
    MainTabBar,
  },
};
</script>

<style>
@import "./assets/css/base.css";
</style>
