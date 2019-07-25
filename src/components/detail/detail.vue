<template>
  <div class="detail">
    <div class="detail-header">
      <span>{{ companyName }}</span>
      <el-button @click="purcheDialogVisible = true" type="primary">立即申购</el-button>
    </div>
    <div class="detail-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基金净值" name="netValue">
          <div class="tab-content-title">基金净值</div>
          <div id="net-value-echart" style="height: 450px;width: 1100px"></div>
        </el-tab-pane>
        <el-tab-pane label="基金信息" name="info">
          <div class="tab-content-title">基金信息</div>
          <el-table :data="infoTable">
            <el-table-column prop="name" width="300"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="投资回报" name="payBack">
          <div class="tab-content-title">投资收益率</div>
          <el-table :data="payBackTable">
            <el-table-column prop="name" width="300"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="基金经理" name="manager">
          <div class="tab-content-title">基金经理</div>
        </el-tab-pane>
        <el-tab-pane label="费用信息" name="fee">
          <div class="tab-content-title">费用信息</div>
          <el-table :data="feeTable">
            <el-table-column prop="name" width="300"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="基金公告" name="notice">基金公告</el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      :title="companyName"
      :visible.sync="purcheDialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-form :inline="true" label-width="90px" label-position="left">
        <el-form-item label="买入克数">
          <el-input @blur="computeTotal" v-model="amount"></el-input>
        </el-form-item>
        <el-form-item label="买入金额">
          <el-input v-model="total" @blur="computeAmount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="purcheDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="purche">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts';
import goldPrice from '@/data/goldPrice.json';
export default {
  mounted() {
    this.companyId = this.$route.query.num;
    this.infoTable = this.infoTables[this.companyId];
    this.companyName = this.infoTable[0].value;
    this.initEchart();
  },
  methods: {
    handleClick() {},
    purche() {
      this.purcheDialogVisible = false;
      this.fetch
        .post('/purche', {
          amount: this.amount,
          product: this.companyId,
        })
        .then(res => {
          console.log(res);
        });
    },
    computeTotal() {
      if (this.amount !== '') {
        this.total = parseFloat(this.amount) * parseFloat(this.price);
        this.total = this.total.toFixed(2);
      }
    },
    computeAmount() {
      if (this.total !== '') {
        this.amount = parseFloat(this.total) / parseFloat(this.price);
        this.amount = this.amount.toFixed(2);
      }
    },
    initEchart() {
      let myChart = echarts.init(document.getElementById('net-value-echart'));
      let data = this.formatEchartData(this.goldPrice);
      let date = data.map(item => item.name);
      let value = data.map(item => item.value);
      console.log(data);
      let option = {
        title: {
          text: '',
        },
        tooltip: {},

        xAxis: {
          data: date,
          scale: true,
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          scale: true,
          splitLine: {
            show: false,
          },
        },
        dataZoom: [
          {
            show: false,
            type: 'slider',
            xAxisIndex: 0,
            filterMode: 'empty',
            start: 0,
            end: 100,
          },
          {
            show: false,
            type: 'slider',
            yAxisIndex: 0,
            filterMode: 'empty',
            start: 0,
            end: 100,
          },
        ],
        series: [
          {
            name: '销量',
            type: 'line',
            showSymbol: false,
            data: value,
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    formatEchartData(goldPrice) {
      let data = [];
      for (let item of goldPrice) {
        let date = new Date(item[0]);
        date = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`;
        data.push({
          name: date,
          value: parseInt(item[1]) / 1000,
        });
      }
      return data;
    },
  },
  data() {
    return {
      purcheDialogVisible: false,
      activeName: 'netValue',
      infoTable: [],
      companyId: '',
      companyName: '',
      price: 314.42,
      amount: '',
      total: '',
      goldPrice: goldPrice.data,
      payBackTable: [
        {
          name: '最近7天',
          value: '0.08%',
        },
        {
          name: '最近一个月',
          value: '0.52%',
        },
        {
          name: '最近半年',
          value: '5.62%',
        },
        {
          name: '最近一年',
          value: '13.21%',
        },
        {
          name: '成立以来',
          value: '87.59%',
        },
      ],
      feeTable: [
        {
          name: '管理费率（年费率）',
          value: '0.50%',
        },
        {
          name: '托管费率（年费率）',
          value: '0.10%',
        },
        {
          name: '申购与赎回的对价和费用',
          value:
            '投资者在申购或赎回基金份额时，申购代理机构可按照不超过0.50%的标准收取佣金，具体规定请参照申购代理机构、证券交易所、登记结算机构相关规定',
        },
      ],
      infoTables: [
        [
          {
            name: '基金名称',
            value: '博时黄金ETF',
          },
          {
            name: '基金代码',
            value: '159937',
          },
          {
            name: '基金类型',
            value: '指数型',
          },
        ],
        [
          {
            name: '基金名称',
            value: '国泰黄金ETF',
          },
          {
            name: '基金代码',
            value: '518800',
          },
          {
            name: '基金类型',
            value: '指数型',
          },
        ],
        [
          {
            name: '基金名称',
            value: '华夏上证50ETF',
          },
          {
            name: '基金代码',
            value: '510050',
          },
          {
            name: '基金类型',
            value: '指数型',
          },
        ],
        [
          {
            name: '基金名称',
            value: '南方中证500ETF',
          },
          {
            name: '基金代码',
            value: '510500',
          },
          {
            name: '基金类型',
            value: '指数型',
          },
        ],
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.detail {
  .detail-header {
    margin: 80px;
    font-size: 38px;
    .el-button {
      font-size: 20px;
      margin: auto;
      float: right;
      color: #fff;
    }
  }
  .detail-content {
    margin: 80px;
    .tab-content-title {
      margin-top: 30px;
    }
    #pane-netValue {
      display: flex;
      #net-value-echart {
        div {
          width: 100% !important;
        }
      }
    }
  }
  .el-dialog {
    width: 900px;
    .product-name {
      font-size: 24px;
    }
    .el-input {
      width: 240px;
    }
  }
}
</style>
