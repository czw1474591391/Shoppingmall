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
import { mapState, mapMutations, mapGetters } from "vuex";
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
  watch: {
    //监听total值的变化，通过第一个形参得到变化后的新值
    total: {
      handler(newVal) {
        //找到购物车按钮的配置对象
        const findResult = this.options.find((x) => x.text === "购物车");
        //动态为购物车按钮的info属性赋值
        if (findResult) findResult.info = newVal;
      },
      // immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
      immediate: true,
    },
    // total(newVal) {},
  },
  computed: {
    //调用mapState方法，把m_cart模块中的cart数组映射到当前页面
    //...mapState('模块的名称',['要映射的数据名称])
    // 注意：今后无论映射 mutations 方法，还是 getters 属性，
    // 还是 state 中的数据，都需要指定模块的名称，才能进行映射。
    ...mapState("m_cart", ["cart"]),
    ...mapGetters("m_cart", ["total"]),
  },
  methods: {
    //把m_cart模块中的addToCart方法映射到当前页面
    ...mapMutations("m_cart", ["addToCart"]),
    //goods—nav组件左侧按钮点击事件
    onClick(e) {
      if (e.content.text === "购物车") {
        uni.switchTab({
          url: "/pages/Cart/Cart",
        });
      }
    },
    //goods—nav组件右侧按钮点击事件
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        // 2. 组织一个商品的信息对象
        const goods = {
          goods_id: this.goods_info.goods_id, // 商品的Id
          goods_name: this.goods_info.goods_name, // 商品的名称
          goods_price: this.goods_info.goods_price, // 商品的价格
          goods_count: 1, // 商品的数量
          goods_small_logo: this.goods_info.goods_small_logo, // 商品的图片
          goods_state: true, // 商品的勾选状态
        };
        this.addToCart(goods);
      }
    },
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
