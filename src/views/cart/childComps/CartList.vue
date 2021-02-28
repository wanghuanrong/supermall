<template>
  <div class="cart-list">
      <div v-for="(item, index) in cartList" :key="index">
          <div class="cartList-item">
              <div class="check-btn">
                  <botton-list :isCheck="item.isCheck"></botton-list>
              </div>
              <div class="cart-img">
                  <img :src="item.image" alt="">
              </div>
              <div class="cart-content">
                  <span>{{item.title}}</span>
                  <div>{{item.price}} X{{item.count}}</div>
                  <!-- <span></span> -->
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import BottonList from '@/components/common/bottonlist/BottonList'

export default {
    name: 'CartList',
    props:{
        cartList:{
            type: Array,
            default(){
                return []
            }
        }
    },
    components: {
        BottonList
    },
    methods: {
        // checkedClick(){
        //     console.log(this.cartList)
        //     this.cartList.isCheck = !this.cartList.isCheck;
        // }
    }
}
</script>

<style>
.cartList-item{
    width: 100%;
    display: flex;
}

.cartList-item .check-btn{
    flex: 1;
    padding-top: 40px;
}

.cartList-item .cart-img{
    flex: 3;
}

.cartList-item .cart-img img{
    width: 100px;
    height: 100px;
}

.cartList-item .cart-content{
    flex: 6;
}
</style>