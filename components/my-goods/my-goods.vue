<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <image :src="item.goods_small_logo || defaultImg"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <view class="goods-name">{{ item.goods_name }}</view>
      <view class="goods-info-bpx">
        <view class="goods-price">￥{{ item.goods_price | tofixed }}</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data: () => ({
    // 默认的空图片
    defaultImg:
      "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
  }),
  filters: {
    //过滤器函数处理四舍五入保留两位小数
    tofixed: (num) => Number(num).toFixed(2),
  },
  computed: {},
  methods: {},
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
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-left: 5px;
    image {
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right {
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
