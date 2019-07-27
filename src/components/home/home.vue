<template>
  <div class="detail-content">
    <div class="product-wrap">
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
        <el-button @click="goDetail(index, item.name)">详情</el-button>
      </div>
    </div>
    <hr style="width: 80%" />
    <div class="chart-section">
      <h2>近期价格走势</h2>
      <div id="gold-price-echart" style="height: 4.50rem;width: 11rem"></div>
    </div>
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
          name: '博时黄金',
          returnRate: '19.73',
          describe: '大牛基金经理',
        },
        {
          name: '存金宝',
          returnRate: '14.93',
          describe: '大牛基金经理',
        },
        {
          name: '华安易富黄金',
          returnRate: '16.48',
          describe: '大牛基金经理',
        },
        {
          name: '易方达黄金',
          returnRate: '17.34',
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
    goDetail(index, name) {
      this.$router.push({ path: '/detail', query: { num: index, name: name } });
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
          value: (parseInt(item[1]) / 28.34) * 6.87,
        });
      }
      return data
        .reverse()
        .slice(0, 90)
        .reverse();
    },
  },
  components: {},
};
</script>

<style lang="less" scoped>
.detail-content {
  .product-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .product {
      width: 500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 30px 0px;
      padding: 0 0.5rem;
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
  .chart-section {
    padding: 0rem 1rem;
    h2 {
      font-size: 0.3rem;
      padding-left: 1rem;
    }
  }
}
</style>
