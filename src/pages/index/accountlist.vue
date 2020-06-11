<template>
  <div>
    <el-card class="box-card">
      <div class="title">
        <span>账号列表</span>
      </div>
      <el-table
        :data="acclist"
        highlight-current-row="true"
        @selection-change="checklist"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="250">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.account }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户组" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userGroup }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="300">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.ctime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 12, 18, 24]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="datatotal"
      ></el-pagination>
      <div class="btn-box">
        <el-button type="warning" @click="deleteSelect">批量删除</el-button>
        <el-button type="primary">取消删除</el-button>
      </div>
    </el-card>
    <!-- 模态框 -->
    <div>
      <el-dialog id="box" title="修改密码" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="账户名" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="权限" :label-width="formLabelWidth">
            <el-select v-model="region" placeholder="请选择你的管理权限">
              <el-option label="普通管理员" value="普通管理员"></el-option>
              <el-option label="超级管理员" value="超级管理员"></el-option>
            </el-select>
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
import {
  api_acclist,
  api_deletOne,
  api_deletSel,
  api_setAcc
} from "../../api/apis";

export default {
  data() {
    return {
      acclist: "", //整个数据
      datatotal: "", //数据的总条数
      currentPage: 1, //当前页码
      pageSize: 6, //每页条数
      arr: [], //保存选中的id
      dialogTableVisible: false,
      dialogFormVisible: false,
      name: "",
      region: "",
      nowId: "",
      form: {
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "90px"
    };
  },
  methods: {
    //修改账号
    //设置按钮
    handleEdit(index, row) {
      this.row = row;
      this.nowId = row.id;
      this.name = row.account;
      this.region = row.userGroup;
      this.dialogFormVisible = true;
    },
    //修改
    trueSet() {
      this.row.account = this.name; //相当于刷新页面显示新的数据
      this.row.userGroup = this.region; //相当于刷新页面显示新的数据
      api_setAcc(this.nowId, this.row.account, this.row.userGroup).then(res => {
        //发送请求
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，修改成功",
            type: "success"
          });
          this.dialogFormVisible = false;
        } else {
          this.$message({
            showClose: true,
            message: "修改错误",
            type: "error"
          });
        }
      });
    },
    //删除
    handleDelete(index, row) {
      var flag = confirm("你确定要删除吗？");
      if (flag) {
        this.acclist.splice(index, 1);
        api_deletOne(row.id).then(res => {
          //发送删除请求  row 当前数组对象 index当前数组索引
          if (res.data.code == 0) {
            this.$message({
              showClose: true,
              message: "恭喜你，删除成功",
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
      } else {
        return;
      }
    },

    //批量删除
    checklist(selection) {
      for (let obj of selection) {
        this.arr.push(obj.id);
        console.log(this.arr);
      }
    },
    deleteSelect() {
      //批量删除请求
      let arr = JSON.stringify(this.arr); //转化成字符串
      api_deletSel(arr).then(res => {
        console.log(res);
      });
      //重新调用一下刷新
      api_acclist(this.currentPage, this.pageSize).then(res => {
        this.acclist = res.data.data;
        this.datatotal = res.data.total;
      });
    },

    //分页
    handleSizeChange(val) {
      console.log("当前多少条" + val);
      this.pageSize = val;
      api_acclist(this.currentPage, this.pageSize).then(res => {
        this.acclist = res.data.data;
        this.datatotal = res.data.total;
      });
    },
    handleCurrentChange(val) {
      console.log("页数" + val);
      this.currentPage = val;
      api_acclist(this.currentPage, this.pageSize).then(res => {
        this.acclist = res.data.data;
        this.datatotal = res.data.total;
      });
    }
  },

  created() {
    // 用户列表
    api_acclist(this.currentPage, this.pageSize).then(res => {
      this.acclist = res.data.data;
      this.datatotal = res.data.total;
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
.btn-box {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 15px;
}
#box {
  width: 500;
}
</style>