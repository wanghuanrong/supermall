import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload){
      // console.log(payload);
      // 把该商品保存到vuex中，在之前需要进行判断，是否已经存在
      let oldProduct = state.cartList.find(item => item.iid === payload.iid);

      if(oldProduct){
        oldProduct.count += 1
      }else{
        payload.count = 1;
        payload.isCheck = true;
        state.cartList.push(payload);
      }

      console.log(state.cartList);
    }
  },
  actions: {
  },
  modules: {
  }
})
