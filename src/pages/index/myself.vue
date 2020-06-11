<template>
  <div>
    <el-card>
      <div class="title">
        <span>管理员信息</span>
      </div>
      <span>管理员ID：{{id}}</span>
      <el-divider></el-divider>
      <span>账号：{{acc}}</span>
      <el-divider></el-divider>
      <span>用户组：{{userGroup}}</span>
      <el-divider></el-divider>
      <span>创建时间：{{ctime}}</span>
      <el-divider></el-divider>
      <div class="imgbox">
        <span>当前管理员头像：</span>
        <img :src="img" />
      </div>
      <el-divider></el-divider>
      <div class="updataimg">
        <span>更新头像：</span>
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="data"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <el-button type="primary" class="upimgBtn" @click="upBtn">点击刷新</el-button>
    </el-card>
  </div>
</template>

<script>
import { api_mySelf } from "../../api/apis";
export default {
  data() {
    return {
      id: "",
      acc: "",
      userGroup: "",
      ctime: "",
      img: "",
      imageUrl: "",
      data: { id: localStorage.getItem("ID") }
    };
  },
  methods: {
    //更新头像块儿
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    upBtn() {
      window.location.reload(); //刷新
    }
  },

  created() {
    //渲染信息赋值数据
    //请求个人信息
    let id = localStorage.getItem("ID");
    api_mySelf(id).then(res => {
      this.id = res.data.accountInfo.id;
      this.acc = res.data.accountInfo.account;
      this.userGroup = res.data.accountInfo.userGroup;
      this.ctime = res.data.accountInfo.ctime;
      this.img = res.data.accountInfo.imgUrl;
    });
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  margin-bottom: 10px;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
}
// 头像上传块儿
i {
  border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
//当前头像块儿
.imgbox {
  display: flex;
  align-items: center;
  > img {
    width: 100px;
    border: 1px solid #000;
  }
}
.updataimg {
  display: flex;
  align-items: center;
}
.upimgBtn {
  margin: 20px 0 0 110px;
}
</style>