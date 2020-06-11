<template>
  <div class="box">
    <el-card class="box-card">
      <h3>系统登录</h3>
      <el-input class="inpu" prefix-icon="el-icon-user" v-model="acc" placeholder="请输入账号"></el-input>
      <el-input
        class="inpu"
        prefix-icon="el-icon-s-cooperation
"
        @keyup.enter.native="jump"
        v-model="pwd"
        show-password
        placeholder="请输入密码"
      ></el-input>
      <el-button class="btn" @click="jump" type="primary">登录</el-button>
    </el-card>
  </div>
</template>
<script>
import { api_logon } from "../api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      flag: true //定义一个flag
    };
  },
  methods: {
    jump() {
      if (this.flag == false) return;
      this.flag = false;
      api_logon(this.acc, this.pwd).then(res => {
        if (res.data.code == 0) {
          //判断返回回来的数据
          localStorage.setItem("ID", res.data.id); //保存当前的id
          localStorage.setItem("token", res.data.token); //保存当前服务器返回回来的token
          localStorage.setItem("user", this.acc); //保存当前用户名
          localStorage.setItem("group", res.data.role); //保存当前用户的身份
          this.$message({
            showClose: true,
            message: "恭喜你，登录成功",
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("index/home");
          }, 1000);
        } else {
          this.$message({
            showClose: true,
            message: "你输入的密码或者账号错误",
            type: "error"
          });
        }
        setTimeout(() => {
          this.flag = true;
        }, 3000); //三秒后变为true
      });
    }
  }
};
</script>
<style lang="less" scoped>
h3 {
  color: #486465;
  text-align: center;
}
.box {
  background-color: #486465;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .box-card {
    width: 350px;
    .inpu {
      margin: 20px 0;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>