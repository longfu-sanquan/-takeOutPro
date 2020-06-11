<template>
  <div class="content-all">
    <div>
      <div class="top">
        <div>
          <span>订单号</span>
          <el-input v-model="orderno" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>收货人</span>
          <el-input v-model="collect" placeholder="请输入内容"></el-input>
        </div>
        <div>
          <span>手机号</span>
          <el-input v-model="phone" placeholder="请输入内容"></el-input>
        </div>
        <div class="selectsta">
          <span>订单状态</span>
          <el-form>
            <el-select v-model="state" placeholder="请选择订单状态">
              <el-option label="已完成" value="已完成"></el-option>
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
            </el-select>
          </el-form>
        </div>
      </div>
      <div class="content-buttom">
        <span>选择时间</span>
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
          value-format="yyyy-MM-dd hh:mm:ss"
        ></el-date-picker>
        <el-button class="submitBtn" @click="submitBtn" type="primary">查询</el-button>
      </div>
    </div>
    <div class="mycontent">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="orderNo" label="订单号" width="120" height="50"></el-table-column>
        <el-table-column prop="orderTime" label="下单时间" width="150"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
        <el-table-column prop="deliverAddress" label="配送地址" width="350"></el-table-column>
        <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
        <el-table-column prop="remarks" label="用户备注" width="190"></el-table-column>
        <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
        <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" @click="setClick(scope.row)" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentpage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 模态框 -->
    <div>
      <el-dialog id="box" title="查看" :visible.sync="dialogFormVisible">
        <el-card>
          <div>
            <div>
              <span>订单号：</span>
              <span>{{odrnum}}</span>
            </div>
            <div>
              <span>下单时间：</span>
              <span>{{odrtime}}</span>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <div>
              <span>联系电话：</span>
              <span>{{odrpho}}</span>
            </div>
            <div>
              <span>收货人：</span>
              <span>{{odrconsignee}}</span>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <div>
              <span>送达时间：</span>
              <span>{{odrdeliveryTime}}</span>
            </div>
            <div>
              <span>备注：</span>
              <span>{{remarks}}</span>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <div>
              <span>订单金额：</span>
              <span>￥{{orderAmount}}</span>
            </div>
            <div>
              <span>订单状态：</span>
              <span>{{odrState}}</span>
            </div>
            <el-divider></el-divider>
          </div>
          <div>
            <span>收货地址：</span>
            <span>{{Address}}</span>
          </div>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 编辑模态框 -->
    <div class="setbox">
      <el-dialog id="box" title="查看" :visible.sync="dialogFormVisible1">
        <el-card>
          <el-radio-group v-model="labelPosition" size="small">
            <el-radio-button label="left">左对齐</el-radio-button>
            <el-radio-button label="right">右对齐</el-radio-button>
            <el-radio-button label="top">顶部对齐</el-radio-button>
          </el-radio-group>
          <div style="margin: 20px;"></div>
          <el-form :label-position="labelPosition" label-width="80px" :model="form">
            <el-form-item label="订单号">
              <el-input v-model="form.num"></el-input>
            </el-form-item>
            <el-form-item label="下单时间">
              <div>时间{{form.value}}</div>
              <el-date-picker
                v-model="form.value"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
                value-format="yyyy-MM-dd hh:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="收货人">
              <el-input v-model="form.takeMan"></el-input>
            </el-form-item>
            <el-form-item label="送货地址">
              <el-input v-model="form.drees"></el-input>
            </el-form-item>
            <el-form-item label="送达时间">
              <el-date-picker
                v-model="form.value2"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
                value-format="yyyy-MM-dd hh:mm:ss"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="form.tips"></el-input>
            </el-form-item>
            <el-form-item label="订单金额">
              <el-input v-model="form.money"></el-input>
            </el-form-item>
            <div>
              <el-form>
                <el-form-item label="订单状态">
                  <el-select v-model="form.state" placeholder="请选择订单状态">
                    <el-option label="已完成" value="已完成"></el-option>
                    <el-option label="已受理" value="已受理"></el-option>
                    <el-option label="派送中" value="派送中"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </el-form>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="ordertrueSet">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// api_set_order
import { api_getOrder, api_watchData, api_set_order } from "../../api/apis.js";
// import moment from "moment";
export default {
  data() {
    return {
      tableData: "",
      total: "",
      pagesize: 5, //每页多少条
      currentpage: 1, //当前页
      orderno: "", //订单号
      collect: "", //收货人
      value1: "", //选择时间
      phone: "", //手机号
      state: "", //订单状态
      dialogFormVisible: false, //查看模态框状态
      dialogFormVisible1: false, //编辑模态框
      //查询订单
      odrnum: "",
      odrtime: "",
      odrpho: "",
      odrconsignee: "",
      Address: "",
      odrdeliveryTime: "",
      remarks: "",
      orderAmount: "",
      odrState: "",
      //编辑
      labelPosition: "right",

      form: {
        num: "",
        value: "",
        phone: "",
        takeMan: "",
        drees: "",
        value2: "",
        tips: "",
        money: "",
        state: ""
      }
    };
  },
  methods: {
    // 查看
    handleClick(row) {
      this.dialogFormVisible = true;
      api_watchData(row.id).then(res => {
        this.odrnum = res.data.data.orderNo;
        this.odrtime = res.data.data.orderTime;
        this.odrpho = res.data.data.phone;
        this.odrconsignee = res.data.data.consignee;
        this.Address = res.data.data.deliverAddress;
        this.odrdeliveryTime = res.data.data.deliveryTime;
        this.remarks = res.data.data.remarks;
        this.orderAmount = res.data.data.orderAmount;
        this.odrState = res.data.data.orderState;
      });
    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      api_getOrder(this.currentpage, this.pagesize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      api_getOrder(this.currentpage, this.pagesize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    // 查询
    submitBtn() {
      api_getOrder(
        this.currentpage,
        this.pagesize,
        this.orderno,
        this.collect,
        this.phone,
        this.state,
        this.value1
      ).then(res => {
        console.log(res);
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    },
    //打开编辑
    setClick(setrow) {
      this.dialogFormVisible1 = true;
      this.setrow = setrow;
    },
    //确定编辑
    ordertrueSet() {
      api_set_order(
        this.setrow.id,
        this.form.num,
        this.form.value,
        this.form.phone,
        this.form.takeMan,
        this.form.drees,
        this.form.value2,
        this.form.tips,
        this.form.money,
        this.form.state
      ).then(res => {
        if (res.data.code == 0) {
          this.$message({
            showClose: true,
            message: "恭喜你，修改成功",
            type: "success"
          });
          this.dialogFormVisible1 = false;
        } else {
          this.$message({
            showClose: true,
            message: "修改错误",
            type: "error"
          });
        }
      });
      //重新加载
      api_getOrder(this.currentpage, this.pagesize).then(res => {
        this.tableData = res.data.data;
        this.total = res.data.total;
      });
    }
  },

  created() {
    //加载页面数据分页
    api_getOrder(this.currentpage, this.pagesize).then(res => {
      this.tableData = res.data.data;
      this.total = res.data.total;
    });
  }
};
</script>

<style lang="less" scoped>
.setbox .el-input {
  width: 500px;
}
.content-all {
  .el-table-column {
    height: 50px;
  }
  background-color: #fff;
  height: 100%;
  .content-buttom {
    text-align: left;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    span {
      margin-right: 15px;
    }
  }
  .mycontent {
    margin-top: 25px;
  }
  .el-pagination {
    margin-top: 25px;
  }
}
.submitBtn {
  margin-left: 20px;
}
.top {
  display: flex;
  > div {
    margin: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    .el-input {
      height: 50px;
      line-height: 50px;
    }
    span {
      display: block;
      width: 100px;
      height: 20px;
      line-height: 20px;
      margin: 0 15px;
    }
  }
}
</style>