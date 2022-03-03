<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio
        :checked="item.goods_state"
        @click="radioClickHandler"
        color="#c00000"
        v-if="showRadio"
      />
      <image :src="item.goods_small_logo || defaultImg"></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <view class="goods-name">{{ item.goods_name }}</view>
      <view class="goods-info-box">
        <view class="goods-price">￥{{ item.goods_price | tofixed }}</view>
        <!-- 商品数量 -->
        <uni-number-box
          :min="1"
          :value="goods.goods_count"
          @change="numChangeHandler"
          v-if="showNum"
        ></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    //父级传递的goods对象
    item: {
      type: Object,
      default: {},
    },
    //是否显示单选框
    showRadio: {
      type: Boolean,
      default: false,
    },
    //是否显示右侧number数字组件
    showNum: {
      type: Boolean,
      default: false,
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
  methods: {
    radioClickHandler() {
      //触发父级的自定义事件，同时传递商品id与最新勾选状态
      this.$emit("radio-change", {
        goods_id: this.item.goods_id,
        goods_state: !this.item.goods_state,
      });
    },
    //bumberBox组件的change事件处理
    numChangeHandler(val) {
      //拿到最新的数量传递到父组件
      this.$emit("num-change", {
        goods_id: this.item.goods_id,
        goods_count: +val,
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
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;
  .goods-item-left {
    margin-left: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    image {
      width: 100px;
      height: 100px;
    }
  }
  .goods-item-right {
    margin-left: 10px;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
    }
    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
