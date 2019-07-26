<template>
  <div class="detail-content">
    <div v-for="(item, index) in products" :key="item.name" class="product">
      <h4>{{ item.name }}</h4>
      <div class="rate">
        <span class="num">
          {{ item.returnRate }}
          <span class="percent">%</span>
        </span>
        今年以来收益率
      </div>
      <div>{{ item.describe }}</div>
      <el-button @click="goDetail(index)">详情</el-button>
    </div>
    <div id="gold-price-echart" style="height: 4.50rem;width: 11rem"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import goldPrice from '@/data/goldPrice.json';
export default {
  data() {
    return {
      goldPrice: goldPrice.data,
      echart: null,
      products: [
        {
          name: '博时黄金ETF',
          returnRate: '19.73',
          describe: '大牛基金经理',
        },
        {
          name: '博时黄金基金2',
          returnRate: '19.73',
          describe: '大牛基金经理',
        },
        {
          name: '博时黄金基金3',
          returnRate: '19.73',
          describe: '大牛基金经理',
        },
        {
          name: '博时黄金基金4',
          returnRate: '19.73',
          describe: '大牛基金经理',
        },
      ],
    };
  },
  mounted() {
    this.initEchart();
    window.onresize = this.echart.resize;
  },
  methods: {
    goDetail(index) {
      this.$router.push({ path: '/detail', query: { num: index } });
    },
    initEchart() {
      let myChart = echarts.init(document.getElementById('gold-price-echart'));
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

      // 使用刚指定的配置项和数据显示图表。
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
  components: {},
};
</script>

<style lang="less" scoped>
.detail-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .product {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0px;
    div {
      margin: 20px 0px;
      font-size: 18px;
    }
    .rate {
      .num {
        font-size: 30px;
        color: rgb(209, 43, 20);
        .percent {
          font-size: 25px;
        }
      }
    }
  }
}
</style>
