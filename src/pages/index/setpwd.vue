<template>
  <div>
    <el-card class="box-card">
      <div class="title">
        <span>添加账号</span>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="pass">
          <el-input type="password" v-model="oldPwd" @blur="pwDtest" autocomplete="off"></el-input>
          <span v-if="flag" style="color:red">{{text}}</span>
        </el-form-item>
        <el-form-item label="新密码" prop="checkPass">
          <el-input type="password" v-model="newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="age">
          <el-input type="password" v-model="trueNewPwd" @blur="truepwd" autocomplete="off"></el-input>
          <span style="color:red" v-if="flag2">两次输入密码不一致</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitbtn">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { api_testPwd, api_updataPwd } from "../../api/apis";
export default {
  data() {
    return {
      oldPwd: "",
      newPwd: "",
      trueNewPwd: "",
      text: "密码正确",
      flag: false, //是否显示旧密码文本
      stateflag: false, //判断旧密码状态
      newPwdFlag: false, //判断两次密码是否一至
      flag2: false //是否显示两次密码不一致文本
    };
  },
  methods: {
    //验证旧密码 失去焦点触发
    pwDtest() {
      let id = localStorage.getItem("ID");
      api_testPwd(this.oldPwd, id).then(res => {
        //验证旧密码请求
        if (res.data.code == 0) {
          this.flag = true;
          this.stateflag = true;
          this.text = "密码正确";
        } else {
          this.flag = true;
          this.stateflag = false;
          this.text = "没有此密码";
        }
      });
    },
    //判断两次密码是否一致
    truepwd() {
      if (this.newPwd == this.trueNewPwd) {
        this.newPwdFlag = true;
        this.flag2 = false;
      } else {
        this.flag2 = true;
        this.newPwdFlag = false;
      }
    },

    //修改密码
    submitbtn() {
      //修改密码请求
      let id = localStorage.getItem("ID");
      if (this.stateflag && this.newPwdFlag) {
        api_updataPwd(this.newPwd, id).then(res => {
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "恭喜你，修改成功!请重新登录",
              type: "success"
            });
            this.$router.push("/"); //回到登录界面重新登录
          } else {
            this.$message({
              showClose: true,
              message: "你输入密码错误",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "你输入密码错误",
          type: "error"
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  width: 450px;
  margin-top: 30px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
}
</style>