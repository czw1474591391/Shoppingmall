<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper indicator-dots autoplay circular>
      <!-- 渲染轮播图的item项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator
          class="swiper-item"
          :url="`/subpkg/goods_detail/goods_detail?goods_id=` + item.goods_id"
        >
          <!-- 动态绑定图片的src属性 -->
          <image :src="item.image_src" />
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view class="nav-item" @click="navClickHandler(item)" v-for="(item, i) in navList" :key="i">
        <image :src="item.image_src" />
      </view>
    </view>
    <!-- 楼层区域 -->
    <view class="floor-list">
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="floor-title" />
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            />
            <!-- 图片裁剪、缩放的模式,widthFix	宽度不变，高度自动变化，保持原图宽高比不变 -->
          </navigator>
          <view class="right-img-box">
            <!-- navigator组件绑定url跳转路径 -->
            <navigator
              class="right-img-item"
              v-for="(item2, i2) in item.product_list"
              :key="i2"
              v-if="i2 !== 0"
              :url="item2.url"
            >
              <!-- 这里v-if i2！==0是因为前面的左侧图片已经渲染，剔除掉0下标，避免左侧图片渲染多次 -->
              <image
                :src="item2.image_src"
                mode="widthFix"
                :style="{ width: item2.image_width + 'rpx' }"
              ></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import badgeMix from "@/mixins/tabbar-badge.js";
//导入封装好的mixin模块
export default {
  //混入当前页面中使用
  // mixins: [badgeMix],
  data() {
    return {
      swiperList: [], //定义轮播图列表
      navList: [], //分类导航的数据列表
      floorList: [], //楼层区域的数据列表
    };
  },
  methods: {
    //获取轮播图
    async getSwiperList() {
      const { data: res } = await uni.$http.get("/api/public/v1/home/swiperdata");
      //请求失败调用全局封装的提示框
      if (res.meta.status !== 200) return uni.$showMsg();
      this.swiperList = res.message; //请求成功之后赋值给data中的数组
    },
    //获取nav导航区域
    async getNavList() {
      const { data: res } = await uni.$http.get("/api/public/v1/home/catitems");
      //请求失败调用全局封装的提示框
      if (res.meta.status !== 200) return uni.$showMsg();
      this.navList = res.message;
    },
    //获取楼层区域
    async getFloorList() {
      const { data: res } = await uni.$http.get("/api/public/v1/home/floordata");
      //请求失败调用全局封装的提示框
      if (res.meta.status !== 200) return uni.$showMsg();

      res.message.forEach((floor) => {
        floor.product_list.forEach((prod) => {
          prod.url = "/subpkg/goods_list/goods_list?" + prod.navigator_url.split("?")[1];
        });
      });
      this.floorList = res.message;
    },
    // 跳转到分类tabbar
    navClickHandler(item) {
      if (item.name === "分类") {
        uni.switchTab({ url: "/pages/Cate/Cate" });
      }
    },
    // 跳转到分包中的搜索页面
    gotoSearch() {
      uni.navigateTo({ url: "/subpkg/search/search" });
    },
  },
  onLoad() {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },
};
</script>

<style lang="scss">
.search-box {
  //设置定位效果为"吸顶"
  position: sticky;
  top: 0;
  z-index: 999;
}
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  .nav-item > image {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}
.floor-img-box {
  display: flex;
}
.right-img-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
