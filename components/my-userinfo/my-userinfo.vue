<template>
  <view class="my-userinfo-container">
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{ userinfo.nickName }}</view>
    </view>
    <!-- 面板的列表区域 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">我的订单</view>
        <view class="panel-body">
          <!-- 面板主体中的 item 项 -->
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapState("m_user", ["userinfo"]),
  },
  methods: {
    ...mapMutations("m_user", ["updataAddress", "updataUserInfo", "updataToken"]),
    //用户退出登录
    async logout() {
      const [err, succ] = await uni
        .showModal({
          content: "确定退出登录吗？",
          title: "提示",
        })
        .catch((err) => err);
      // 当用户确认退出的操作，清空存储中的用户信息以及token
      if (succ && succ.confirm) {
        this.updataUserInfo({});
        this.updataToken("");
        this.updataAddress({});
      }
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
.my-userinfo-container {
  height: 100%;
  background-color: #f4f4f4;
  .top-box {
    height: 400px;
    background: #c00000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .avatar {
      display: block;
      width: 90px;
      height: 90px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 1px 5px black;
    }
    .nickname {
      color: white;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }
  }
  .panel-list {
    padding: 0 10px;
    position: relative;
    top: -10px;
    .panel {
      background: white;
      border-radius: 3px;
      margin-bottom: 8px;
      .panel-title {
        line-height: 45px;
        padding-left: 10px;
        font-size: 15px;
        border-bottom: 1px solid #f4f4f4;
      }
      .panel-body {
        display: flex;
        justify-content: space-around;
        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          padding: 10px 0;
          .icon {
            width: 35px;
            height: 35px;
          }
        }
      }
      .panel-list-item {
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 15px;
        padding: 0 10px;
      }
    }
  }
}
</style>
