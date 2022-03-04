export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
  }),
  mutations: {
    //更新收货地址
    updataAddress(state, address) {
      state.address = address;
      //调用存储方法
      this.commit("m_user/saveAddressToStorage");
    },
    //将地址持久化存储到本地
    saveAddressToStorage() {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
  },
  // 数据包装器
  getters: {
    // 收货详细地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) return "";
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
};
