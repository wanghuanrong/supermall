<template>
  <div class="cart">
    <cart-list :cartList="cartList"></cart-list>
  </div>
</template>

<script>
import CartList from './childComps/CartList'

export default {
  name: "Cart",
  data(){
    return {
      cartList:[]
    }
  },
  components: {
    CartList
  },
  created () {
    console.log(this.cartList);
    this.cartList = this.$store.state.cartList
  }
};
</script>

<style scoped>
.cart {
  width: 100%;
  overflow: hidden;
}

.cart img {
  width: 70%;
}
</style>
