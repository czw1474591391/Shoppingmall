<template>
  <view>
    <view class="search-box">
      <!-- cancelButton是否显示取消按钮 -->
      <uni-search-bar @input="input" :radius="15" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 展示搜索列表 -->
    <view class="sugg-list">
      <view
        class="sugg-item"
        v-for="(item, i) in searchResults"
        :key="i"
        @click="gotoDetail(item.goods_id)"
      >
        <view class="goods-name">{{ item.goods_name }}</view>
      </view>
    </view>
    <!-- 搜索历史 -->
    <view class="history-box">
      <view class="history-title">
        <text> 搜索历史 </text>
        <uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
      </view>
      <view class="history-list">
        <uni-tag
          v-for="(item, i) in historyList"
          :text="item"
          :key="i"
          @click="gotoGoodsList(item)"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data: () => ({
    //延时器的timer
    timer: null,
    kw: "",
    searchResults: [],
    historyList: ["a", "app", "apple"],
  }),
  onLoad() {
    //加载本地存储的搜索历史记录
    this.historyList = JSON.parse(uni.getStorageSync("kw") || "[]");
  },
  methods: {
    // 实现input事件的防抖节流
    input(e) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.kw = e;
        //根据关键词，查询搜索建议列表
        this.getSearchList();
      }, 500);
      //输入的值从头插入新数组  排序后赋值给搜索历史列表
      if (e !== "") this.historyList = [...new Set([e, ...this.historyList])];
      //调用uni.setStorageSync将搜索历史记录持久化存储到本地
      uni.setStorageSync("kw", JSON.stringify(this.historyList));
    },
    //获取搜索建议列表
    async getSearchList() {
      if (this.kw === "") {
        this.searchResults = [];
        return;
      }
      const { data: res } = await uni.$http.get("/api/public/v1/goods/qsearch", {
        query: this.kw,
      });
      if (res.meta.status !== 200) return uni.$showMsg();
      this.searchResults = res.message;
    },
    //携带参数跳转到商品详情页面
    gotoDetail(goods_id) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + goods_id,
      });
    },
    //携带参数跳转商品列表页面
    gotoGoodsList(kw) {
      uni.navigateTo({
        url: "/subpkg/goods_list/goods_list?query=" + kw,
      });
    },
    //点击清除按钮，清空data以及本地存储中的历史列表
    clearHistory() {
      this.historyList = [];
      uni.setStorageSync("kw", []);
    },
  },
};
</script>

<style lang="scss" scoped>
.uni-searchbar {
  background-color: #c00000 !important;
}
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;
  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .goods-name {
      //单行文字不允许换行
      white-space: nowrap;
      overflow: hidden;
      //文字溢出使用...代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 5px;
  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
    .history-list {
      display: flex;
      justify-content: space-between;
    }
  }
}
//css使用>>>进行组件样式穿透  less或者scss使用/deep/或者::v-deep来进行穿透
.history-list ::v-deep .uni-tag {
  margin-top: 5px;
  margin-right: 5px;
}
</style>
