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
    //更新购物车商品的勾选状态
    updataGoodsState(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_state = goods.goods_state;
        this.commit("m_cart/saveToStorage");
      }
    },
    //更新所有商品的勾选状态
    updataAllGoodsState(state, newState) {
      state.cart.forEach((x) => (x.goods_state = newState));
      this.commit("m_cart/saveToStorage");
    },
    //更新购物车中商品的数量
    updateGoodsCount(state, goods) {
      const findResult = state.cart.find((x) => x.goods_id === goods.goods_id);
      if (findResult) {
        findResult.goods_count = goods.goods_count;
        this.commit("m_cart/saveToStorage");
      }
    },
    //删除匹配id的商品对象
    removeGoodsById(state, goods_id) {
      state.cart = state.cart.filter((x) => x.goods_id !== x.goods_id);
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
      let c = 0;
      //统计所有的商品数量  累加返回
      state.cart.forEach((goods) => {
        c += goods.goods_count;
      });
      return c;
    },
    // 勾选的商品的总数量
    checkedCount(state) {
      // 先使用 filter 方法，从购物车中过滤器已勾选的商品
      // 再使用 reduce 方法，将已勾选的商品总数量进行累加
      // reduce() 的返回值就是已勾选的商品的总数量
      return state.cart
        .filter((x) => x.goods_state)
        .reduce((total, item) => (total += item.goods_count), 0);
    },
    checkedGoodsAmount(state) {
      //使用reduce方法 将已勾选的商品数量*单价之后，进行累加（total是第二个参数0）
      //toFixed方法是保留两位小数
      return state.cart
        .filter((x) => x.goods_state)
        .reduce((total, item) => (total += item.goods_price * item.goods_count), 0)
        .toFixed(2);
    },
  },
};
