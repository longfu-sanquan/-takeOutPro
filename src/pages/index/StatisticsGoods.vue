<template>
  <div>
    <el-card>
      <span>时间范围：{{value1}}</span>
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        format="yyyy 年 MM 月 dd 日 hh 时 mm 分 ss 秒"
        value-format="yyyy-MM-dd hh:mm:ss"
      ></el-date-picker>
      <el-button type="primary" @click="querydata">点击查询</el-button>
    </el-card>
    <div id="box"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { api_query_data } from "../../api/apis";
export default {
  data() {
    return {
      data: "",
      value1: "",
      orderTime: [],
      orderAmount: []
    };
  },
  methods: {
    querydata() {
      api_query_data(JSON.stringify(this.value1)).then(res => {
        this.data = res.data;
        this.orderTime = this.data.data.map(v => {
          return v.orderTime;
        });
        this.orderAmount = this.data.data.map(v => {
          return v.orderAmount;
        });
        console.log();

        var myChart = echarts.init(document.getElementById("box"));
        let option = {
          title: {
            text: "堆叠区域图"
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985"
              }
            }
          },
          legend: {
            data: ["订单金额"]
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: this.orderTime
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "邮件营销",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: this.orderAmount
            },

            {
              name: "搜索引擎",
              type: "line",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "top"
                }
              },
              areaStyle: {},
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        myChart.setOption(option);
      });
    }
  },
  mounted() {
    api_query_data(JSON.stringify(this.value1)).then(res => {
      this.data = res.data;
      this.orderTime = this.data.data.map(v => {
        return v.orderTime;
      });
      this.orderAmount = this.data.data.map(v => {
        return v.orderAmount;
      });
      console.log();

      var myChart = echarts.init(document.getElementById("box"));
      let option = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["订单金额"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.orderTime
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: this.orderAmount
          },

          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      };
      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
.el-button {
  margin-left: 25px;
}
#box {
  width: 100%;
  height: 700px;
}
</style>