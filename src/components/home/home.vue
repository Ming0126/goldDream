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
          returnRate: '14.93',
          describe: '收益稳定，风险低',
        },
        {
          name: '存金宝',
          returnRate: '19.73',
          describe: '今年以来同类基金收益率最高',
        },
        {
          name: '华安易富黄金',
          returnRate: '16.48',
          describe: '基金成立以来从未亏损',
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
    this.queryData();
    this.initEchart();
    window.onresize = this.echart.resize;
  },
  methods: {
    queryData() {
      this.fetch.get('/queryProductInfo').then(res => {
        console.log(res);
      });
    },
    goDetail(index, name) {
      this.$router.push({ path: '/detail', query: { num: index, name: name } });
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
      width: 5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0.5rem 0px;
      padding: 0 0.6rem;
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
