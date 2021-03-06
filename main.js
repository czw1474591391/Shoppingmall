import App from "./App";
import store from "./store/store";
import { $http } from "@escook/request-miniprogram";
uni.$http = $http;
//配置请求根路径
$http.baseUrl = "https://api-hmugo-web.itheima.net";
//请求拦截器
$http.beforeRequest = (options) => {
  uni.showLoading({
    title: "数据请求中",
  });
  // 判断请求是否为有权限的API接口;
  if (options.url.indexOf("wxlogin") !== -1) {
    //为为请求头添加身份认证字段（携带token）
    options.header = {
      Authorization: store.state.m_user.token,
    };
  }
};
//响应拦截器
$http.afterRequest = () => {
  uni.hideLoading();
};

//封装全局请求失败提示框
uni.$showMsg = (title = "数据加载失败！", duration = 1500) => {
  uni.showToast({
    title,
    icon: "none",
    duration,
    mask: true,
  });
};

// #ifndef VUE3
import Vue from "vue";

Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
  store,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
// #endif
