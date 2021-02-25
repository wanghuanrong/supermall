<template>
  <div>
      <!-- {{goods}} -->
      <div v-if="Object.keys(goods).length !== 0" class="base-info">
      <div class="info-title">{{goods.title}}</div>
      <div class="info-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <div class="info-service">
          <span class="info-service-item" 
          v-for="index in goods.services.length-1" :key="index">
            <img :src="goods.services[index - 1].icon">
            <span>{{goods.services[index - 1].name}}</span>
          </span>
      </div>
  </div>
  </div>
</template>

<script>
export default {
    name:'DetailBaseInfo',
    props:{
        goods:{
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>
.base-info{
    margin-top: 15px;
    padding: 0 8px;
    color: #999;
    border-bottom: 5px solid #f2f5f8;
}

.info-title{
    color: #222;
}

.info-price{
    margin-top: 10px;
    /* overflow: hidden; */
}

.info-price .n-price{
    font-size: 24px;
    color: var(--color-high-text);
}

.info-price .o-price{
    font-size: 13px;
    margin-left: 5px;
    text-decoration: line-through;
}

.discount{
    display: inline-block;
    padding: 5px;
    background: red;
    border-radius: 10px;
    color: white;
    font-size: 12px;
    position: relative;
    bottom: 5px;
    left: 5px;
}

.info-other{
    padding: 10px 0;
    display: flex;
    border-bottom: 1px solid #ccc;
}

.info-other span{
    flex: 1;
    text-align: center;
}

.info-service{
    display: flex;
    margin: 20px 0;
    color: black;
    font-size: 16px;
}

.info-service img{
    width: 15px;
    height: 15px;
    margin-top: 5px;
}

.info-service .info-service-item{
    flex: 1;
    text-align: center;
}
</style>