<template>
  <div class="position-content">
    <h1>我的持仓</h1>
    <div class="table-wrap">
      <el-table :data="positionData" width="80%">
        <el-table-column label="基金名称" prop="name"></el-table-column>
        <el-table-column label="持有克数" prop="amount"></el-table-column>
        <el-table-column label="黄金价值" prop="value"></el-table-column>
        <el-table-column label="昨日收益" prop="yestoryIncome"></el-table-column>
        <el-table-column label="累计收益" prop="totalIncome"></el-table-column>
        <el-table-column label="操作">
          <div>
            <el-button type="primary hidden-sm-and-down" @click="purcheDialogVisible = true">补仓</el-button>
            <el-button type="primary" @click="redemptionDialogVisible = true">赎回</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :title="companyName" :visible.sync="purcheDialogVisible">
      <el-form>
        <el-form-item label="买入克数" :label-width="formLabelWidth">
          <el-input @blur="computeTotal" v-model="amount"></el-input>
        </el-form-item>
        <el-form-item label="买入金额" :label-width="formLabelWidth">
          <el-input v-model="total" @blur="computeAmount"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="purcheDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="purche">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="赎回" :visible.sync="redemptionDialogVisible">
      <el-form :model="form">
        <el-form-item label="基金名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="companyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="赎回金额" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="redemptionAmount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="redemptionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="redemptionDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
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
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
        {
          name: '博时黄金',
          amount: '3.45',
          value: '1048.24',
          yestoryIncome: '3.45',
          totalIncome: '87.42',
        },
      ],
    };
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
