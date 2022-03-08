<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio color="#c00000" :checked="isFullCheck" />全选
    </label>

    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">{{ checkedGoodsAmount }}</text>
    </view>
    <!-- 结算按钮 -->
    <view class="btn-settle" @click="settlement"> 结算{{ checkedCount }}</view>
  </view>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  props: {},
  data: () => ({
    // 倒计时的秒数
    seconds: 3,
    // 定时器的 Id
    timer: null,
  }),
  computed: {
    ...mapGetters("m_cart", ["checkedCount", "total", "checkedGoodsAmount"]),
    //映射收货地址
    ...mapGetters("m_user", ["addstr"]),
    //映射token到组件中
    ...mapState("m_user", ["token"]),
    //是否全选
    isFullCheck() {
      return this.total === this.checkedCount;
    },
  },
  methods: {
    ...mapMutations("m_cart", ["updataAllGoodsState"]),
    ...mapMutations("m_user", ["updataRedirectInfo"]),
    //修改购物车所有商品选中状态
    changeAllState() {
      this.updataAllGoodsState(!this.isFullCheck);
    },
    //点击结算按钮
    settlement() {
      //判断是否勾选商品
      if (!this.checkedCount) return uni.$showMsg("请选择要结算的商品！");
      //判断用户是否输入地址
      if (!this.addstr) return uni.$showMsg("请选择收货地址！");
      //判断用户是否登录
      if (!this.token) return this.delayNavigate();
    },

    delayNavigate() {
      //展示提示信息
      this.showTips(this.seconds);
      this.timer = setInterval(() => {
        this.seconds--;
        //秒数限制并跳转到登录页面
        if (this.seconds <= 0) {
          clearInterval(this.timer);
          uni.switchTab({
            url: "/pages/My/My",
            success: (success) => {
              //成功跳转登录页之后记录跳转的方式以及页面
              this.updataRedirectInfo({
                openType: "switchTab",
                from: "/pages/Cart/Cart",
              });
            },
          });
          return;
        }

        this.showTips(this.seconds);
      }, 1000);
    },
    showTips(n) {
      uni.showToast({
        icon: "none",
        title: "请登录后再结算！" + n + "秒后自动跳转到登录页",
        duration: 1500,
      });
    },
  },
  watch: {},

  // 组件周期函数--监听组件挂载完毕
  mounted() {},
  // 组件周期函数--监听组件数据更新之前
  beforeUpdate() {},
  // 组件周期函数--监听组件数据更新之后
  updated() {},
  // 组件周期函数--监听组件激活(显示)
  activated() {},
  // 组件周期函数--监听组件停用(隐藏)
  deactivated() {},
  // 组件周期函数--监听组件销毁之前
  beforeDestroy() {},
};
</script>

<style lang="scss">
.my-settle-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  .radio {
    display: flex;
    align-items: center;
  }
  .amount {
    color: #c00000;
  }
  .btn-settle {
    height: 50px;
    min-width: 100px;
    background-color: #c00000;
    color: white;
    line-height: 50px;
    text-align: center;
    padding: 0 10px;
  }
}
</style>
