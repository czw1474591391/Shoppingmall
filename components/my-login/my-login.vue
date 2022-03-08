<template>
  <view class="login-container">
    <uni-icon type="contact-filled" size="100" color="#afafaf"></uni-icon>
    <button type="primary" @click="getUserProfile" class="btn-login">一键登录</button>
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {},
  data: () => ({}),
  computed: {
    ...mapState("m_user", ["redirectInfo"]),
  },
  methods: {
    ...mapMutations("m_user", ["updataUserInfo", "updataToken", "updataRedirectInfo"]),
    //获取微信用户的基本信息
    getUserProfile(e) {
      uni.getUserProfile({
        desc: "用于完善个人资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          // 3. 将用户的基本信息存储到 vuex 中
          this.updataUserInfo(res.userInfo);

          // 获取登录成功后的 Token 字符串
          this.getToken(res);
        },
        fail: (res) => {
          return uni.$showMsg("您取消了登录授权");
        },
      });
    },
    async getToken(info) {
      const [err, res] = await uni.login().catch((err) => err);
      if (err || res.errMsg !== "login:ok") return uni.$showMsg("登录失败！");
      // 准备参数对象
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };
      // 换取 token
      // const { data: loginResult } = await uni.$http.post("/api/public/v1/users/wxlogin", query);
      // if (loginResult.meta.status !== 200) return uni.$showMsg("登录失败！");
      uni.$showMsg("登录成功");
      //此处使用假token进行登录,因为接口无法返回token
      this.updataToken(
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
      );
      // //登录成功之后跳转到购物车页面
      this.navigateBack();
    },
    //登录之后返回原页面
    navigateBack() {
      // redirectInfo 不为 null，并且导航方式为 switchTab
      console.log(this.redirectInfo);
      if (this.redirectInfo && this.redirectInfo.openType === "switchTab") {
        //重新导航到原页面
        uni.switchTab({
          url: this.redirectInfo.from,
          //无论成功或者失败都将user模块中的重定向对象清空
          complete: () => {
            this.updataRedirectInfo(null);
          },
        });
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
.login-container {
  //登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;
  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }
  //登录按钮样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background: #c00000;
  }
  //按钮下方提示
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
