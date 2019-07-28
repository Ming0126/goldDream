<template>
  <div class="position-content">
    <h1>交易记录</h1>
    <div class="table-wrap">
      <el-table :data="positionData" width="80%">
        <el-table-column label="基金名称" prop="name"></el-table-column>
        <el-table-column label="克数" prop="amount"></el-table-column>
        <el-table-column label="黄金价值" prop="value"></el-table-column>
        <el-table-column label="操作时间" prop="time"></el-table-column>
        <el-table-column label="操作类型">
          <div>
            <el-tag>买入</el-tag>
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      purcheDialogVisible: false,
      redemptionDialogVisible: false,
      redemptionAmount: '',
      formLabelWidth: '120px',

      companyName: '博时黄金',

      price: 314.42,
      amount: '',
      total: '',
      positionData: [
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          time: '2019/07/26',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          time: '2019/07/26',
        },
      ],
    };
  },
  mounted() {
    this.queryData();
  },
  methods: {
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
    queryData() {},
  },
};
</script>

<style lang="less" scoped>
.position-content {
  h1 {
    margin-left: 0.5rem;
    font-size: 0.4rem;
  }
  .table-wrap {
    padding: 0 1rem;
  }
  .el-dialog {
    .el-input {
      width: 3.3rem;
    }
  }
}
</style>
