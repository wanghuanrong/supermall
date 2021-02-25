<template>
  <div>
      <img :src="paramInfo.image" alt="">
      <div v-for="(item, index) in paramInfo.infos" :key="index">
          <span>{{item.key}}:{{item.value}}</span>
      </div>
      <div v-for="(item, index) in paramInfo.sizes[0]" :key="index">
          {{item[0]}}:{{item[1]}} {{item[2]}} {{item[3]}}
      </div>
  </div>
</template>

<script>
export default {
    name: 'DetailParamInfo',
    props:{
        paramInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>

<style>

</style>