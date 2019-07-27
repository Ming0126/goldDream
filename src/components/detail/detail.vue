<template>
  <div class="detail">
    <div class="detail-header">
      <span>{{ companyName }}</span>
      <el-button @click="showPurchaseComp" type="primary">立即申购</el-button>
    </div>
    <div class="detail-content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基金净值" name="netValue">
          <div class="tab-content-title">基金净值</div>
          <div id="net-value-echart" style="height: 4.50rem;width: 11rem"></div>
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
          <div class="manager-row">
            <img src="~@/assets/bu.jpg" />
            <p>
              <span>卜迪先生：</span>
              &nbsp;&nbsp;&nbsp;&nbsp;中国国籍，硕士研究生。
              1997年至2001年在中国石油大学计算数学及其应用软件专业学习，获学士学位。
              2001年至2004年在广州大学应用数学系学习，获硕士学位。
              2003年12月至2010年8月在Morningstar晨星中国基金研究中心工作，
              任量化组负责人兼资深分析师。2010年8月31日加入博时基金管理有限公司，历任股票投资部量化分析师兼任基金经理助理、
              博时标普500指数基金基金经理助理和博时深证基本面200ETF基金及其联接基金基金经理助理，
              博时特许价值股票基金基金经理(2013年9月13日至2015年2月9日)、
              博时招财一号保本基金基金经理（2015年4月29日至2016年5月30日）、
              博时中证淘金大数据100基金基金经理（2015年5月4日至2016年5月30日）、
              博时沪深300指数基金基金经理（2015年5月5日至2016年5月30日）。
              现任博时深证基本面200ETF基金兼博时深证基本面200ETF联接基金（2012年11月13日至今）、
              上证企债30ETF基金（2013年7月11日至今）、
              博时证券保险指数分级基金（2015年5月19日至今）、
              博时黄金ETF基金（2015年10月8日至今）、博时上证50ETF基金（2015年10月8日至今）、
              博时上证50ETF联接基金（2015年10月8日至今）、博时银行分级基金(2015年10月8日至今)、
              博时黄金ETF联接基金（2016年5月27日至今）的基金经理。
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="费用信息" name="fee">
          <div class="tab-content-title">费用信息</div>
          <el-table :data="feeTable">
            <el-table-column prop="name" width="300"></el-table-column>
            <el-table-column prop="value"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <Purchase :companyName="companyName" :companyId="companyId"></Purchase>
  </div>
</template>

<script>
import echarts from 'echarts';
import goldPrice from '@/data/goldPrice.json';
import Purchase from '@/common/components/purchase';
import vm from '@/common/js/bus.js';

export default {
  mounted() {
    this.companyId = this.$route.query.num;
    this.infoTable = this.infoTables[this.companyId];
    this.companyName = this.$route.query.name;
    this.initEchart();
    window.onresize = this.echart.resize;
  },
  methods: {
    handleClick() {},
    showPurchaseComp() {
      vm.$emit('showPurchaseDialog');
    },
    initEchart() {
      let myChart = echarts.init(document.getElementById('net-value-echart'));
      let data = this.formatEchartData(this.goldPrice);
      let date = data.map(item => item.name);
      let value = data.map(item => item.value);
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

      myChart.setOption(option);
      this.echart = myChart;
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
  components: {
    Purchase,
  },
  data() {
    return {
      echart: null,
      activeName: 'netValue',
      infoTable: [],
      companyId: '',
      companyName: '',

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
            value: '博时黄金',
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
            value: '存金宝',
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
            value: '华安易富黄金',
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
            value: '易方达黄金',
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
    .manager-row {
      display: flex;
      img {
        width: 120px;
        height: 180px;
        margin: 30px;
        margin-top: 50px;
      }
      p {
        font-size: 16px;
        margin: 30px 0px;
        span {
          display: block;
          font-size: 28px;
        }
      }
    }
    #pane-netValue {
      display: flex;
      flex-direction: column;
      #net-value-echart {
        div {
          width: 100% !important;
        }
      }
    }
  }
}
</style>
