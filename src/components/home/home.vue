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
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
    goDetail(index) {
      this.$router.push({ path: '/detail', query: { num: index } });
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
