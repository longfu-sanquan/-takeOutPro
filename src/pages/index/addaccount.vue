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
        <el-form-item label="账号" prop="pass">
          <el-input type="text" v-model="acc" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="pwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户组">
          <el-select v-model="value" placeholder="请选择活动区域">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitbtn">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { api_regist } from "../../api/apis";
export default {
  data() {
    return {
      acc: "",
      pwd: "",
      value: ""
    };
  },
  methods: {
    submitbtn() {
      api_regist(this.acc, this.pwd, this.value).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，添加成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "添加失败",
            type: "error"
          });
        }
      });
    },
    resetForm() {
      (this.acc = ""), (this.pwd = ""), (this.value = "");//重置输入框
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