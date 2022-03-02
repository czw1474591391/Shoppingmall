<template>
  <!-- 检测属性值是否存在  解决闪烁undefined的问题 -->
  <view v-if="goods_info.goods_name" class="goods-detail-container">
    <swiper indicator-dots autoplay :interval="3000" circular>
      <swiper-item v-for="(item, i) in goods_info.pics" :key="i">
        <image :src="item.pics_big" @click="previewImg(i)"></image>
      </swiper-item>
    </swiper>
    <view class="goods-info-box">
      <view class="price">￥{{ goods_info.goods_price }}</view>
      <view class="goods-info-body">
        <view class="goods-name">{{ goods_info.goods_name }}</view>
        <view class="favi">
          <uni-icons type="star" color="gray" size="18" />
          <text>收藏</text>
        </view>
      </view>
      <view class="yf">快递:免运费</view>
    </view>
    <rich-text :nodes="goods_info.goods_introduce"></rich-text>
    <!-- 商品导航组件 -->
    <!-- 商品导航组件 -->
    <view class="goods_nav">
      <!-- fill 控制右侧按钮的样式 -->
      <!-- options 左侧按钮的配置项 -->
      <!-- buttonGroup 右侧按钮的配置项 -->
      <!-- click 左侧按钮的点击事件处理函数 -->
      <!-- buttonClick 右侧按钮的点击事件处理函数 -->
      <uni-goods-nav
        :fill="true"
        :options="options"
        :buttonGroup="buttonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goods_info: {},
      // 左侧按钮组的配置对象
      options: [
        {
          icon: "shop",
          text: "店铺",
        },
        {
          icon: "cart",
          text: "购物车",
          info: 0,
        },
      ],
      // 右侧按钮组的配置对象
      buttonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "#ff0000",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "#ffa200",
        },
      ],
    };
  },
  methods: {
    onClick(e) {
      if (e.content.text === "购物车") {
        uni.switchTab({
          url: "/pages/Cart/Cart",
        });
      }
    },
    buttonClick(e) {},
    //请求商品详情方法
    async getGoodsDetail(goods_id) {
      const { data: res } = await uni.$http.get("/api/public/v1/goods/detail?goods_id", {
        goods_id,
      });
      if (res.meta.status !== 200) return uni.$showMsg();
      // 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
      res.message.goods_introduce = res.message.goods_introduce
        // .replace(/<img /g, '<img style="display:block;" ')
        .replace(/webp/g, "jpg");
      this.goods_info = res.message;
    },
    //放大预览轮播图片
    previewImg(i) {
      uni.previewImage({
        current: i,
        urls: this.goods_info.pics.map((x) => x.pics_big),
      });
    },
  },
  onLoad(options) {
    this.getGoodsDetail(options.goods_id);
  },
};
</script>

<style lang="scss">
swiper {
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.goods-info-box {
  padding: 10px;
  .price {
    color: #c00000;
    font-size: 18px;
    margin: 10px 0;
  }
  .goods-info-body {
    display: flex;
    justify-content: space-between;
    .goods-name {
      font-size: 13px;
      padding-right: 10px;
    }
    .favi {
      width: 120px;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-left: 1px solid #efefef;
      color: gray;
    }
  }
  .yf {
    margin: 10px 0;
    font-size: 12px;
    color: gray;
  }
}
.goods-detail-container {
  // 给页面外层的容器，添加 50px 的内padding，
  // 防止页面内容被底部的商品导航组件遮盖
  padding-bottom: 50px;
}
.goods_nav {
  // 为商品导航组件添加固定定位
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
