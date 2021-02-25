<template>
  <div>
    <div class="param-title">参数</div>
    <img :src="paramInfo.image" alt="" />
    <div v-for="(item, index) in paramInfo.infos" :key="index">
      <span>{{ item.key }}:{{ item.value }}</span>
    </div>
    <div v-if="paramInfo.sizes">
      <div v-for="(item, index) in paramInfo.sizes[0]" :key="'param2' + index">
        {{ item[0] }}:{{ item[1] }} {{ item[2] }} {{ item[3] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
    
<style>
.param-title {
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    line-height: 25px;
}
</style>