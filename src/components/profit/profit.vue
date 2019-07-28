<template>
  <div class="profit-content">
    <h1>我的收益</h1>
    <div class="chart-wrap">
      <div id="chart1"></div>
      <div id="chart2"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import goldPrice from '@/data/goldPrice.json';

export default {
  data() {
    return {
      echart1: null,
      echart2: null,
      goldPrice: goldPrice.data,
    };
  },
  mounted() {
    this.initEchart1();
    this.initEchart2();
    window.onresize = this.echartResize;
  },
  methods: {
    echartResize() {
      console.log(333);
      this.echart1.resize();
      this.echart2.resize();
    },
    initEchart1() {
      let myChart = echarts.init(document.getElementById('chart1'));
      let option = {
        title: {
          text: '我的收益分布',
          x: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['博时黄金', '存金宝', '华安易富黄金', '易方达黄金'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: '博时黄金' },
              { value: 234, name: '存金宝' },
              { value: 135, name: '华安易富黄金' },
              { value: 1548, name: '易方达黄金' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      };

      myChart.setOption(option);
      this.echart = myChart;
    },
    initEchart2() {
      let myChart = echarts.init(document.getElementById('chart2'));
      let data = this.formatEchartData2(this.goldPrice);
      let date = data.map(item => item.name);
      let value = data.map(item => item.value);
      let option = {
        title: {
          text: '我的收益走势图',
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
            show: true,
            type: 'inside',
            xAxisIndex: 0,
            filterMode: 'empty',
            start: 10,
            end: 100,
          },
          {
            handleIcon:
              'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            start: 10,
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
      this.echart2 = myChart;
    },

    formatEchartData2(goldPrice) {
      let data = [];
      for (let item of goldPrice) {
        let date = new Date(item[0]);
        date = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        data.push({
          name: date,
          value: parseInt(item[1]) * 6.87,
        });
      }
      return data
        .reverse()
        .slice(0, 90)
        .reverse();
    },
  },
};
</script>

<style lang="less" scoped>
.profit-content {
  h1 {
    margin-left: 0.5rem;
    font-size: 0.4rem;
  }
  .chart-wrap {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 1rem;
    #chart1 {
      height: 4rem;
      width: 5rem;
    }
    #chart2 {
      height: 4rem;
      width: 5rem;
    }
  }
}
</style>
