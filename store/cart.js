export default {
  namespaced: true, //为当前模块开启命名空间
  state: () => ({
    // 存放购物车相关信息
    cart: JSON.parse(uni.getStorageSync("cart") || "[]"), //本地存储没有购物车信息的话，默认为[]
  }),
  //模块的mutations同步方法
  mutations: {
    //根据提交的商品id  查询购物车是否存在该商品，存在直接数量+1  不存在直接push
    addToCart(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (!findResult) {
        state.cart.push(goods);
      } else {
        findResult.goods_count++;
      }
      this.commit("m_cart/saveToStorage");
    },
    //将购物车中的数据持久化存储到本地
    saveToStorage(state) {
      uni.setStorageSync("cart", JSON.stringify(state.cart));
    },
  },
  //   模块的getters属性
  getters: {
    //统计购物车中商品总数量
    total(state) {
      console.log(1);
      let c = 0;
      //统计所有的商品数量  累加返回
      state.cart.forEach((goods) => {
        c += goods.goods_count;
      });
      return c;
    },
  },
};
