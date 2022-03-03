<template>
  <view>
    <view class="cart-title">
      <uni-icons type="shop" size="18" />
      <text class="cart-totle-text">购物车</text>
    </view>
    <block v-for="(item, index) in cart" :key="{ index }">
      <my-goods
        :item="item"
        showNum
        showRadio
        @radio-change="radioChangeHandler"
        @num-change="numberChangeHandler"
      ></my-goods>
    </block>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import badgeMix from "@/mixins/tabbar-badge.js";
//导入封装好的mixin模块
export default {
  //混入当前页面中使用
  mixins: [badgeMix],
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations("m_cart", ["updataGoodsState", "updateGoodsCount"]),
    //购物车单选框事件
    radioChangeHandler(e) {
      this.updataGoodsState(e);
    },
    //numbox数字组件更改事件
    numberChangeHandler(e) {
      this.updateGoodsCount(e);
    },
  },
};
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
</style>
