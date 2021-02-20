<template>
  <div class="nav-bar">
      <div class="left"><slot name="left"></slot></div>
      <div class="conter"><slot name="conter"></slot></div>
      <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
    name: 'NavBar'
}
</script>

<style>
    .nav-bar{
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        top: 0;
        display: flex;
        background-color: #ff8198;
    }

    .nav-bar .left{
        flex: 2;
        height: 50px;
    }

    .nav-bar .conter{
        flex: 6;
        height: 50px;
        text-align: center;
        line-height: 50px;
        font-size: 20px;
        font-weight: 600;
        color: white;
    }

    .nav-bar .right{
        flex: 2;
        height: 50px;
    }
</style>