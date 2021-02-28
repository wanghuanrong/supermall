<template>
  <div class="checked-botton" :class="{IsChecked : isCheckHide}" @click="checkedClick">
      <img src="@/assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
    name: 'BottonList',
    props:{
      isCheckShow:{
        type: Boolean,
        default(){
          return true
        }
      }
    },
    data(){
      return {
        isCheckHide: true
      }
    },
    methods: {
      checkedClick(){
        this.isCheckHide = !this.isCheckHide
      }
    }
}
</script>

<style>
  .checked-botton{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: auto;
    border: 1px solid #ccc;
  }

  .IsChecked{
    background-color: red;
  }
</style>