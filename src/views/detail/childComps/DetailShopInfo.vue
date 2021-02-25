<template>
  <div class="detail-shop-info">
      <!-- 店铺 -->
      <div class="shop-name">
          <div>
              <img :src="shop.logo" alt="">
          </div>
          <div>
              {{shop.name}}
          </div>
      </div>

      <!-- 详情 -->
      <div class="shop-info">
          <!-- 左边 -->
          <div class="left">
              <div>
                  <div>{{shop.sells}}</div>
                  <div>总产量</div>
              </div>
              <div>
                  <div>{{shop.goodsCount}}</div>
                  <div>全部宝贝</div>
              </div>
          </div>
            <!-- 右边 -->
          <div class="right">
              <div v-for="(item, index) in shop.score" :key="index">
                  <span>{{item.name}}</span>
                  <span>{{item.score}}</span>
                  <span>{{item.isBetter}}</span>
              </div>
          </div>
      </div>

      <!-- 进店逛逛 -->
      <div class="jd-btn">
          进店逛逛
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailShopInfo',
    props:{
        shop:{
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>
    .detail-shop-info{
        width: 100%;
        height: 300px;
    }


    .shop-name{
        font-size: 20px;
        line-height: 35px;
        overflow: hidden;
    }

    .shop-name div{
        float: left;
    }
    .shop-name img{
        width: 30px;
        height: 30px;
    }

    .shop-info{
        display: flex;
    }

    .shop-info .left
    {
        flex: 1;
    }
    .shop-info .right
    {
        flex: 1;
    }

    .jd-btn{
        margin: 15px 0;
        border: 1px solid red;
    }
</style>