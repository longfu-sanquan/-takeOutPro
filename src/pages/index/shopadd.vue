<template>
  <div>
    <el-card class="box-card">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="商品名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-select v-model="form.region" placeholder="请选择分类">
            <el-option
              v-for="item in sortData"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="myimgsrc+imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加商品</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { api_querySort, api_addShop } from "../../api/apis";
export default {
  data() {
    return {
      imageUrl: "",
      num: 1,
      sortData: "",
      myimgsrc: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res, file);
      this.imageUrl = res.imgUrl;
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
    onSubmit() {
      api_addShop(
        this.form.name,
        this.form.region,
        this.num,
        this.imageUrl,
        this.form.desc
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，添加成功!",
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
    }
  },
  // name, category, price, imgUrl, goodsDesc

  created() {
    api_querySort().then(res => {
      this.sortData = res.data.categories;
      console.log(res.data.categories);
    });
    console.log(this.region);
  }
};
</script>

<style lang="less" scoped>
.box-card {
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
  .el-form {
    width: 450px;
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
  i {
    border: 1px dashed #d9d9d9;
  }
}
</style>