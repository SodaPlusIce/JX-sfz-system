<template>
  <div id="app">
    <!--flex弹性盒子模型，justify-content：主抽 -->
    <div
      style="
        display: flex;
        justify-content: center;
        margin-top: 130px;
        margin-bottom: 130px;
      "
    >
      <el-card style="width: 400px">
        <div slot="header" class="clearfix">
          <span>登录</span>
        </div>
        <table>
          <tr>
            <td>用户名</td>
            <td>
              <el-input
                v-model="user.username"
                placeholder="请输入用户名"
              ></el-input>
            </td>
          </tr>
          <tr>
            <td>密码</td>
            <td>
              <el-input
                type="password"
                v-model="user.password"
                placeholder="请输入密码"
                @keydown.enter.native="doLogin"
              ></el-input>
              <!-- @keydown.enter.native="doLogin"当按下enter键的时候也会执行doLogin方法-->
            </td>
          </tr>
          <tr>
            <!-- 占两行-->
            <td colspan="2">
              <!-- 点击事件的两种不同的写法v-on:click和 @click-->
              <el-button style="width: 300px" type="primary" @click="doLogin"
                >登录</el-button
              >
            </td>
          </tr>
        </table>
      </el-card>
    </div>
  </div>
</template>

<script>
import bus from "./eventBus";

export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    this.sessionPre();
  },
  methods: {
    sessionPre() {
      //取出来token
      const token = window.localStorage.getItem("myToken");
      //token有的话 执行这段操作 没有的话  就不添加token了 这样我们就不会把token传给后端了
      //是的 就是这么简单
      if (token) {
        this.axios.interceptors.request.use((config) => {
          // 为请求头添加token字段为服务端返回的token
          config.headers.token = token;
          // return config是固定用法 必须有返回值
          return config;
        });
      }

      //发送get请求
      const api =
        "http://192.168.0.109:8080/login?ID=" +
        this.user.username +
        "&" +
        "password=" +
        this.user.password;
      this.axios.get(api).then((response) => {
        if (response.data.status == "700") bus.$emit("navi", response.data.level);
      });
    },
    doLogin() {
      let that = this;
      // this.axios.defaults.withCredentials = true;

      //取出来token
      const token = window.localStorage.getItem("myToken");
      //token有的话 执行这段操作 没有的话  就不添加token了 这样我们就不会把token传给后端了
      //是的 就是这么简单
      if (token) {
        this.axios.interceptors.request.use((config) => {
          // 为请求头添加token字段为服务端返回的token
          config.headers.token = token;
          // return config是固定用法 必须有返回值
          return config;
        });
      }

      //发送get请求
      const api =
        "http://192.168.0.109:8080/login?id=" +
        this.user.username +
        "&" +
        "password=" +
        this.user.password;
      this.axios.get(api).then((response) => {
        if (response.data.status == "703") {
          //合法的账户和密码
          bus.$emit("navi", response.data.level);
          window.localStorage.setItem("myToken", response.data.token);
        } else if (response.data.status == "702"){
          that.$message.error("请输入正确的用户名和密码！");
        }
      });
    },
  },
};
</script>
<style scoped>
table {
  margin-left: 25px;
  text-align: center;
}
</style>
