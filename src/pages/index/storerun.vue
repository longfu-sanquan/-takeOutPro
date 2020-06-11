<template>
  <div class="content">
    <el-card class="box-card">
      <!-- 上面表单 -->
      <div class="top-form">
        <p class="title">
          <span>电铺管理</span>
        </p>
        <div>
          <span>店铺名称</span>
          <el-input v-model="shopname" placeholder="请输入商品名" class="shopname"></el-input>
        </div>
        <div>
          <span>店铺公告</span>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
        </div>
        <div>
          <span>店铺头像</span>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="shopurl+imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div>
          <span>店铺图片</span>
          <div>
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="ifSuccess"
              :file-list="myfileList"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="送达时间">
          <el-input v-model="form.endtime"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="form.score"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="单人精彩套餐" name="type"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-date-picker
            v-model="form.value2"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
            value-format="yyyy-MM-dd hh:mm:ss"
            @change="getdate"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="销售量">
          <el-input v-model="form.allconst"></el-input>
        </el-form-item>
        <el-form-item label="起送价格">
          <el-input v-model="form.startPrice"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="sevedata">保存</el-button>
    </el-card>
  </div>
</template>

<script>
import { api_runshop, api_shop_set } from "../../api/apis";
export default {
  data() {
    return {
      id: "",
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      textarea: "",
      shopname: "",
      shopurl: "http://127.0.0.1:5000/upload/shop/",
      myfileList: [],
      form: {
        name: "",
        score: "",
        type: [],
        resource: "",
        desc: "",
        value2: "",
        price: "",
        allconst: "",
        startPrice: "",
        endtime: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrlp = URL.createObjectURL(file.raw);
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
    ifSuccess(res) {
      this.dialogImageUrl.push(res.imgUrl); //把新上传的图片推入图片数组
    },
    // 删除回调函数
    handleRemove(file, fileList) {
      console.log(file.name, fileList);   
      this.dialogImageUrl.splice(this.dialogImageUrl.indexOf(file.name),1);//
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //保存修改按钮
    sevedata() {
      api_shop_set(
        this.id,
        this.shopname,
        this.textarea,
        this.imageUrl,
        this.form.price,
        this.form.endtime,
        this.form.desc,
        this.form.score,
        this.form.allconst,
        JSON.stringify(this.form.type),
        JSON.stringify(this.form.value2),
        JSON.stringify(this.dialogImageUrl)
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，修改成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改错误",
            type: "error"
          });
        }
      });
    }
  },

  created() {
    //初始化渲染
    api_runshop().then(res => {
      this.myfileList = res.data.data.pics.map(v => {
        return { url: this.shopurl + v, name: v };
      });
      this.shopname = res.data.data.name;
      this.textarea = res.data.data.bulletin;
      this.imageUrl = res.data.data.avatar;
      this.form.name = res.data.data.supports;
      this.form.data1 = res.data.data.deliveryTime;
      this.dialogImageUrl = res.data.data.pics; //图片墙里的图片
      this.form.desc = res.data.data.description;
      this.form.score = res.data.data.score;
      this.form.value2 = res.data.data.date;
      this.form.type = res.data.data.supports;
      this.form.price = res.data.data.deliveryPrice;
      this.form.allconst = res.data.data.sellCount;
      this.form.startPrice = res.data.data.minPrice;
      this.form.endtime = res.data.data.deliveryTime;
      this.id = res.data.data.id;
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
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
}
.content {
  background-color: #fff;
  .box-card {
    .top-form {
      > div {
        width: 400px;
        margin: 25px 0;
        display: flex;
        align-items: center;
        span {
          width: 100px;
        }
      }
    }
    .el-form {
      width: 500px;
    }
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
}
</style>