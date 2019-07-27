<template>
  <div class="position-content">
    <h1>我的持仓</h1>
    <div class="table-wrap">
      <el-table :data="positionData" width="80%">
        <el-table-column label="基金名称" prop="name"></el-table-column>
        <el-table-column label="持有克数" prop="amount"></el-table-column>
        <el-table-column label="黄金价值" prop="value"></el-table-column>
        <el-table-column label="昨日收益" prop="yesterdayProfit"></el-table-column>
        <el-table-column label="累计收益" prop="totalProfit"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary hidden-sm-and-down" @click="showPurchaseComp(scope.row)">补仓</el-button>
            <el-button type="primary" @click="showRedemptionDialog">赎回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="赎回" :visible.sync="redemptionDialogVisible" ref="redemptionForm">
      <el-form :model="redemptionForm" :rules="rules">
        <el-form-item label="基金名称" :label-width="formLabelWidth">
          <el-input autocomplete="off" v-model="companyName" disabled></el-input>
        </el-form-item>
        <el-form-item label="赎回金额" :label-width="formLabelWidth" prop="redemptionAmount">
          <el-input autocomplete="off" v-model="redemptionForm.redemptionAmount"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="redemptionDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="redemptionAction">确 定</el-button>
      </div>
    </el-dialog>
    <Purchase :companyName="companyName" :companyId="companyId"></Purchase>
  </div>
</template>

<script>
import Purchase from '@/common/components/purchase';
import vm from '@/common/js/bus.js';

export default {
  components: {
    Purchase,
  },
  data() {
    return {
      purcheDialogVisible: false,
      redemptionDialogVisible: false,
      redemptionForm: {
        redemptionAmount: '',
      },
      formLabelWidth: '120px',

      companyName: '博时黄金',

      price: 314.42,
      amount: '',
      total: '',
      rules: {
        redemptionAmount: [
          { required: true, message: '请输入要赎回的金额', trigger: 'change' },
          {
            pattern: /^[0-9]+\.?[0-9]*$/,
            message: '请输入正确的金额',
            trigger: 'change',
          },
        ],
      },
      positionData: [
        {
          amount: '1',
          companyId: '2',
          name: '存金宝',
          value: 295.882,
          yesterdayProfit: 222,
          totalProfit: 222,
        },
        {
          amount: '1',
          companyId: '1',
          name: '博时黄金',
          value: 295.882,
          yesterdayProfit: 1,
          totalProfit: 1,
        },
      ],
    };
  },
  mounted() {
    this.fetch
      .post('/queryUserHoldRecord', {
        idCardNum: sessionStorage.getItem('userId'),
      })
      .then(res => {
        if (res.errCode == '200') {
          let positionData = [];
          for (let item of res.myGoldHoldInfoList) {
            positionData.push({
              amount: item.holdAmount,
              companyId: item.productType,
              name: item.productName,
              value: item.totalWorth,
              yesterdayProfit: item.yesterdayProfit,
              totalProfit: item.totalProfit,
            });
          }
          this.positionData = positionData;
        }
      });
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
    redemptionAction() {
      this.fetch.post('/sell', {});
    },
    showPurchaseComp(row) {
      this.companyName = row.name;
      this.companyId = row.companyId;
      vm.$emit('showPurchaseDialog');
    },
    showRedemptionDialog(row) {},
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
