<template>
  <div class="goods-list">
    <block v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
      <!-- 封装自定义goods组件  动态渲染商品列表的值 -->
      <my-goods :item="item"></my-goods>
    </block>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    //请求参数对象
    queryObj: { query: "", cid: "", pagenum: 1, pagesize: 10 },
    goodsList: [], //商品列表的数据
    total: 0, //总数量，用来实现分页
    isLoading: false, //节流阀，是否正在请求数据
  }),
  watch: {},
  computed: {},
  methods: {
    //获取商品列表数据
    async getGoodsList(cb) {
      this.isLoading = true;
      const { data: res } = await uni.$http.get("/api/public/v1/goods/search", this.queryObj);
      if (res.meta.status !== 200) return uni.$showMsg();
      this.isLoading = false;
      // 只要数据请求完毕，就立即按需调用 cb 关闭下拉函数
      cb && cb();
      //新旧数据拼接(上拉加载其他页数据)
      this.goodsList = [...this.goodsList, ...res.message.goods];
      this.total = res.message.total;
    },
    //携带参数跳转到商品详情页面
    gotoDetail(item) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id,
      });
    },
  },
  //将页面传递的参数转存this中
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    this.getGoodsList();
  },
  //页面触底事件  上拉重新加载第二页数据
  onReachBottom() {
    //当前页码值 * 每页多少条数据 >= 总条数
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return uni.$showMsg("数据加载完毕！");
    if (this.isLoading) return; //如果正在请求数据，则不发起而此请求
    this.queryObj.pagenum += 1;
    this.getGoodsList();
  },
  // 页面处理函数--监听用户下拉动作
  onPullDownRefresh() {
    //下拉重置关键数据
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isLoading = false;
    this.goodsList = [];
    //重新发起数据请求，传递关闭下拉的回调函数
    this.getGoodsList(() => uni.stopPullDownRefresh());
  },
  // 页面周期函数--监听页面初次渲染完成
  onReady() {},
  // 页面周期函数--监听页面显示(not-nvue)
  onShow() {},
  // 页面周期函数--监听页面隐藏
  onHide() {},
  // 页面周期函数--监听页面卸载
  onUnload() {},

  // 页面处理函数--监听页面滚动(not-nvue)
  /* onPageScroll(event) {}, */
  // 页面处理函数--用户点击右上角分享
  /* onShareAppMessage(options) {}, */
};
</script>

<style lang="scss"></style>
