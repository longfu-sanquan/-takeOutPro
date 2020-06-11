<template>
  <div>
    <div class="title">
      <span>商品列表</span>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="商品图片">
              <img :src="props.row.imgUrl" alt />
            </el-form-item>
            <el-form-item label="商品评价">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.goodsDesc }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="商品价格">
              <span>{{ props.row.price }}</span>
            </el-form-item>
            <el-form-item label="创建时间">
              <span>{{ props.row.ctime }}</span>
            </el-form-item>
            <el-form-item label="商品销量">
              <span>{{ props.row.sellCount }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品分类" prop="category"></el-table-column>
      <el-table-column label="商品价格" prop="price"></el-table-column>
      <el-table-column label="图片" prop="imgUrl">
        <template slot-scope="scope">
          <img :src="myimgsrc+scope.row.imgUrl" width="100px" />
        </template>
      </el-table-column>
      <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确定删除这条数据吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
            <el-button slot="reference" size="mini" type="danger">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="nowPage"
        :page-sizes="[5,10,15,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 模态框 -->
    <div class="modelbox">
      <el-dialog id="box" title="修改商品" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-select v-model="shopsort" placeholder="请选择分类">
              <el-option
                v-for="item in sortData"
                :key="item.cateName"
                :label="item.cateName"
                :value="item.cateName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="price" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片地址" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="shopUrl" :src="myimgsrc+shopUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="desc" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="trueSet">确 定</el-button>
          <!--  -->
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
//
import {
  api_getGoodsList,
  api_delet_goods,
  api_set_goods,
  api_querySort
} from "../../api/apis";
export default {
  data() {
    return {
      tableData: "",
      total: "",
      myimg: "",
      myimgsrc: "http://127.0.0.1:5000/upload/imgs/goods_img/", //拼接地址
      nowPage: 1, //页数
      pageSize: 5, //每页显示多少条
      dialogFormVisible: false, //模态框显示
      //修改数据
      name: "",
      shopsort: "",
      price: "",
      shopUrl: "",
      desc: "",
      sortData: ""
    };
  },
  methods: {
    // 分页模块儿
    handleSizeChange(val) {
      this.pageSize = val;
      api_getGoodsList(this.nowPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.nowPage = val;
      api_getGoodsList(this.nowPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    //删除商品块儿
    handleDelete(i, r) {
      this.tableData.splice(i, 1);
      console.log(r.id);
      api_delet_goods(r.id).then(res => {
        console.log(res);
      });
      api_getGoodsList(this.nowPage, this.pageSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    //编辑
    //修改图片
    handleAvatarSuccess(res) {
      console.log(res.imgUrl);

      this.shopUrl = res.imgUrl;
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
    handleEdit(row) {
      this.dialogFormVisible = true;
      this.id = row.id;
      api_querySort().then(res => {
        this.sortData = res.data.categories;
        console.log(res.data.categories);
      });
      console.log(this.region);
    },
    trueSet() {
      console.log(
        this.name,
        this.shopsort,
        this.price,
        this.myimgsrc + this.shopUrl,
        this.desc,
        this.id
      );

      api_set_goods(
        this.name,
        this.shopsort,
        this.price,
        this.shopUrl,
        this.desc,
        this.id
      ).then(res => {
        console.log(res.data);

        if (res.data.code == 0) {
          this.dialogFormVisible = false;
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
    api_getGoodsList(this.nowPage, this.pageSize).then(res => {
      this.tableData = res.data.data;
      this.total = res.data.total;
    });
  }
};
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.title {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  height: 60px;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #000;
}

.modelbox .el-input {
  width: 500px;
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
</style>