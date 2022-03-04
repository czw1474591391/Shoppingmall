<template>
  <view class="my-address">
    <!-- 选择收货地址的盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="btnChooseAddress" @click="chooseAddress">
        请选择收货地址+
      </button>
    </view>

    <!-- 渲染收货信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          <view class="username"
            >收货人：<text>{{ address.userName }}</text></view
          >
        </view>
        <view class="row1-right">
          <view class="phone"
            >电话：<text>{{ address.telNumber }}</text></view
          >
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">收货地址：</view>
        <view class="row2-right">{{ addstr }}</view>
      </view>
    </view>

    <!-- 底部的边框线 -->
    <image src="/static/cart_border@2x.png" class="address-border"></image>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    //映射state（在data中定义无法被wetch到）
    ...mapState("m_user", ["address"]),
    //映射getters属性，返回拼接后的地址
    ...mapGetters("m_user", ["addstr"]),
  },
  methods: {
    //将模块中的函数映射到当前组件
    ...mapMutations("m_user", ["updataAddress"]),
    // 选择收货地址
    async chooseAddress() {
      // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
      //    返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
      const [err, succ] = await uni.chooseAddress().catch((err) => err);

      // 2. 用户成功的选择了收货地址
      if (err === null && succ.errMsg === "chooseAddress:ok") {
        // 为 data 里面的收货地址对象赋值
        console.log(succ);
        this.updataAddress(succ);
      }
      // 如果在选择收货地址的时候，用户点击了取消授权，则需要进行特殊的处理，否则用户将无法再次选择收货地址！
      //3.用户没有授权
      // if (err && err.errMsg === "chooseAddress:fail auth deny") {

      // }
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
// 底部边框线的样式
.address-border {
  display: block;
  width: 100%;
  height: 5px;
}

// 选择收货地址的盒子
.address-choose-box {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
}

// 渲染收货信息的盒子
.address-info-box {
  font-size: 12px;
  height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5px;

  // 第一行
  .row1 {
    display: flex;
    justify-content: space-between;

    .row1-right {
      display: flex;
      align-items: center;

      .phone {
        margin-right: 5px;
      }
    }
  }

  // 第二行
  .row2 {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .row2-left {
      white-space: nowrap;
    }
  }
}
</style>
