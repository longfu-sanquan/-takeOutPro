<template>
  <div>
    <div class="content-top">
      <div>
        <img src="../../assets/imgs/home1.png" alt />
        <div>
          <p>总订单</p>
          <p>{{totalOrder}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/imgs/home2.png" alt />
        <div>
          <p>销售总额</p>
          <p>{{totalAmount}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/imgs/home3.png" alt />
        <div>
          <p>今日订单数</p>
          <p>{{todayOrder}}</p>
        </div>
      </div>
      <div>
        <img src="../../assets/imgs/home4.png" alt />
        <div>
          <p>今日销售额</p>
          <p>{{totayAmount}}</p>
        </div>
      </div>
    </div>
    <div id="Ebox"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { api_home_echar } from "../../api/apis";

export default {
  data() {
    return {
      totalOrder: "",
      totalAmount: "",
      todayOrder: "",
      totayAmount: ""
    };
  },
  mounted() {
    api_home_echar().then(res => {
      console.log(res.data);

      this.totalOrder = res.data.totalOrder;
      this.totalAmount = res.data.totalAmount;
      this.todayOrder = res.data.todayOrder;
      this.totayAmount = res.data.totayAmount;
      //
      let { xData, orderData, amountData } = res.data;
      /*ECharts图表*/
      var myChart = echarts.init(document.getElementById("Ebox"));
      let option = {
        title: {
          text: "数据统计"
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
          data: ["订单数据", "金额数据"]
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
            data: xData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: orderData
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: amountData
          }
        ]
      };

      myChart.setOption(option);
    });
  }
};
</script>

<style lang="less" scoped>
#Ebox {
  margin: 20px auto;
  width: 100%;
  height: 700px;
}
.content-top {
  display: flex;
  justify-content: space-around;
  > div {
    height: 150px;
    width: 24%;
    background-color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    p {
      height: 20px;
      line-height: 20px;
      &:first-child {
        font-weight: bold;
        font-size: 20px;
        color: purple;
      }
      &:nth-child(2) {
        font-size: 18px;
        font-weight: bold;
      }
    }
    > img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>