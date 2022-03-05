<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 自定义地址组件 -->
    <my-address></my-address>
    <!-- 购物车商品列表标题 -->
    <view class="cart-title">
      <uni-icons type="shop" size="18" />
      <text class="cart-totle-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <uni-swiper-action>
      <!-- uni-swiper-action最外层包裹的容器 -->
      <block v-for="(item, index) in cart" :key="index">
        <!-- uni-swiper-action-item可以为其子节点提供滑动操作 -->
        <uni-swipe-action-item
          :right-options="options"
          name="index"
          @click="swipeActionClickHandler(item)"
        >
          <my-goods
            :item="item"
            showNum
            showRadio
            @radio-change="radioChangeHandler"
            @num-change="numberChangeHandler"
          ></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swiper-action>

    <!-- 自定义商品结算组件 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <image class="empty-img" src="/static/cart_empty@2x.png"> </image>
    <text class="tip-text">空空如也</text>
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
    return {
      options: [
        {
          text: "删除", // 显示的文本内容
          style: {
            backgroundColor: "#C00000", // 按钮的背景颜色
          },
        },
      ],
    };
  },
  methods: {
    ...mapMutations("m_cart", ["updataGoodsState", "updateGoodsCount", "removeGoodsById"]),
    //购物车单选框事件
    radioChangeHandler(e) {
      this.updataGoodsState(e);
    },
    //numbox数字组件更改事件
    numberChangeHandler(e) {
      this.updateGoodsCount(e);
    },
    //右滑删除操作
    swipeActionClickHandler(e) {
      this.removeGoodsById(e);
    },
  },
};
</script>

<style lang="scss">
.cart-container {
  padding-bottom: 50px;
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
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
