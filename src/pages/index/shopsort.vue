<template>
  <div>
    <div class="title">
      <span>商品分类</span>
      <el-button class="btn" @click="addbtn" type="primary">添加分类</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类名称" width="400">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cateName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否启用" width="500">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.value"
            @change="onchange (scope.row)"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        :current-page="handleCurrent"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="handleSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 编辑模态框 -->

    <el-dialog title="修改数据" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <span>分类名称：</span>
        <el-input type="text" v-model="sortVal" style="width:50%" />
      </div>
      <div>
        <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="truSetBtn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
//
import {
  api_getSort,
  api_shopSort,
  api_deletSort,
  api_setSort
} from "../../api/apis";
export default {
  data() {
    return {
      value: true,
      tableData: "", //总数据
      total: "", //
      handleSize: 5, //每页多少条g:
      handleCurrent: 1, //当前页
      sortname: "", //分类名
      swibool: "", //布尔值
      dialogVisible: false,
      sortVal: ""
    };
  },
  methods: {
    //分页设置
    handleSizeChange(index) {
      //监听每页多少条得变化
      console.log("每页多少条" + index);
      this.handleSize = index; //每页多少条赋给变量传入请求
      api_getSort(this.handleCurrent, this.handleSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(index) {
      //监听第几页得变化
      this.handleCurrent = index; //第几页赋给变量在传入请求
      api_getSort(this.handleCurrent, this.handleSize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },

    //添加分类
    onchange(row) {
      this.sortname = row.cateName;
      this.swibool = row.value;
    },
    addbtn() {
      let bool = JSON.stringify(this.swibool);
      console.log(bool, this.sortname);

      api_shopSort(this.sortname, bool).then(res => {
        console.log(res);

        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，添加成功",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "添加错误",
            type: "error"
          });
        }
      });
    },
    // 删除分类
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
      api_deletSort(row.id).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，删除成功",
            type: "success"
          });
        }
      });
    },

    //修改分类
    handleEdit(i, r) {
      this.mowRow = r;
      this.dialogVisible = true;
    },
    truSetBtn() {
      api_setSort(
        this.mowRow.id,
        this.sortVal,
        JSON.stringify(this.value)
      ).then(res => {
        if (res.data.code == 0) {
          //重新渲染
          api_getSort(this.handleCurrent, this.handleSize).then(res => {
            this.tableData = res.data.data; // 赋值总数据
            this.total = res.data.total; //赋值总条数
          });
          this.$message({
            showClose: true,
            message: "恭喜你，修改成功!",
            type: "success"
          });
        } else {
          this.$message({
            showClose: true,
            message: "修改失败",
            type: "error"
          });
        }
      });
    }
  },
  //获取分类
  created() {
    api_getSort(this.handleCurrent, this.handleSize).then(res => {
      this.tableData = res.data.data; // 赋值总数据
      this.total = res.data.total; //赋值总条数
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
  > button {
    height: 40px;
  }
}
.pages {
  background-color: #fff;
  padding: 10px 0;
}
</style>