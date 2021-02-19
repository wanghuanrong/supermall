<template>
  <div class="wrapper" ref="aaaa">
    分类
  </div>
</template>

<script>

  export default {
    name: "Category",
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      btnClick() {
        console.log('btnClick');
      },
      divClick() {
        console.log('divClick');
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background-color: red;

    overflow: hidden;
    /*overflow-y: scroll;*/
  }
</style>
