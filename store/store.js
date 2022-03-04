import Vue from "vue";
import Vuex from "vuex";
import moduleCart from "./cart";
import modeleUser from "./user";
Vue.use(Vuex);

//创建store实例对象
const store = new Vuex.Store({
  //挂载store模块
  modules: {
    //挂载购物车的vuex模块，购物车中的cart数组的访问路径是m_cart/cart
    m_cart: moduleCart,
    m_user: modeleUser,
  },
});

export default store;
