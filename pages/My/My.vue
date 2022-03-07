<template>
  <view class="my-container">
    <!-- 用户未登录时 显示登录组件 -->
    <my-login v-if="!token"></my-login>
    <!-- 用户已登录时  显示用户信息组件-->
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import { mapState } from "vuex";
import badgeMix from "@/mixins/tabbar-badge.js";
//导入封装好的mixin模块
export default {
  //混入当前页面中使用
  mixins: [badgeMix],
  computed: {
    ...mapState("m_user", ["token"]),
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.my-container {
  height: 100%;
}
</style>
