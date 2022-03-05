import { mapGetters } from "vuex";

// 导出一个 mixin 对象
export default {
  computed: {
    ...mapGetters("m_cart", ["total"]),
  },
  watch: {
    total() {
      //监听total值的变化，重新修改tabbar右上角徽章
      this.setBadge();
    },
  },
  methods: {
    // 调用 uni.setTabBarBadge() 方法，为购物车设置右上角的徽标
    setBadge() {
      if (this.total === 0) {
        return uni.removeTabBarBadge({ index: 2 });
      }
      uni.setTabBarBadge({
        index: 2,
        text: this.total + "",
      });
    },
  },
  onShow() {
    // 在页面刚展示的时候，设置数字徽标
    this.setBadge();
  },
};
