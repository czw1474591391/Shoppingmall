<template>
  <div class="my-search-container" :style="{ 'background-color': bgcolor }">
    <!-- 使用view组件模拟input输入模块样式 -->
    <view
      class="my-search-box"
      :style="{ 'border-radius': radius + 'px' }"
      @click="searchBoxHandler"
    >
      <uni-icons type="search" size="17"></uni-icons>
      <text class="placeholder">搜索</text>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    //接受父组件背景颜色
    bgcolor: {
      type: String,
      default: "#C00000",
    },
    //接受父组件圆角尺寸
    radius: {
      type: Number,
      default: 15,
    },
  },
  data: () => ({}),
  computed: {},
  methods: {
    //点击了模拟的input输入框
    searchBoxHandler() {
      //触发父组件通过@click绑定的事件函数
      this.$emit("click");
    },
  },
  watch: {},
};
</script>

<style lang="scss">
.my-search-container {
  height: 50px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  .my-search-box {
    height: 36px;
    background-color: white;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder {
      font-size: 15px;
      margin-left: 5px;
      // line-height: 36px;
    }
  }
}
</style>
