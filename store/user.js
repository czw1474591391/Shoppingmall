export default {
  //开启命名空间
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync("address") || "{}"),
    //登录之后的token字符串
    token: uni.getStorageSync("token") || "",
    //用户基本信息
    userinfo: JSON.parse(uni.getStorageSync("userinfo") || "{}"),
    //重定向得object对象
    redirectInfo: null,
  }),
  mutations: {
    //更新收货地址
    updataAddress(state, address) {
      state.address = address;
      //调用存储方法
      this.commit("m_user/saveAddressToStorage");
    },
    //将地址持久化存储到本地
    saveAddressToStorage(state) {
      uni.setStorageSync("address", JSON.stringify(state.address));
    },
    //更新用户基本信息
    updataUserInfo(state, userinfo) {
      state.userinfo = userinfo;
      this.commit("m_user/saveUserInfoToStorage");
    },
    //将用户信息持久化存储到本地
    saveUserInfoToStorage(state) {
      uni.setStorageSync("userinfo", JSON.stringify(state.userinfo));
    },
    //更新token字符串
    updataToken(state, token) {
      state.token = token;
      this.commit("m_user/saveTokenStorage");
    },
    //将token字符串保存到本地存储中
    saveTokenStorage(state) {
      uni.setStorageSync("token", state.token);
    },
    //更新重定向的信息对象
    updataRedirectInfo(state, info) {
      state.redirectInfo = info;
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
