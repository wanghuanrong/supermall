<template>
  <div>
      <nav-bar>
          <div slot="left" >
              <img src="@/assets/img/common/back.svg" alt="" class="left-img" @click="backClick">
          </div>
          <div slot="center" class="title">
              <div v-for="(item, index) in title" :key="index" @click="datailClick(index)" :class="{focus: currIndex == index}">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
    name: 'DateilNavBar',
    props:{
        title:{
            type: Array,
            default(){
                return []
            }
        },
    },
    data(){
        return{
            currIndex: 0
        }
    },
    components:{
        NavBar
    },
    methods:{
        datailClick(index){
            this.currIndex = index
            this.$emit("navBarClick", index)
        },
        backClick(){
            this.$router.replace("/home");
        }
    }
}
</script>

<style>
.title{
    display: flex;
}

.title div{
    flex: 1;
}

.focus{
    color: red
}

.left-img{
    margin-top: 10px;
}
</style>