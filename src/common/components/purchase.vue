<template>
  <el-dialog :title="companyName" :visible.sync="purcheDialogVisible">
    <el-form :model="purcheForm" :rules="rules">
      <el-form-item label="买入克数" :label-width="formLabelWidth" prop="amount" ref="purcheForm">
        <el-input @blur="computeTotal" v-model="purcheForm.amount"></el-input>
      </el-form-item>
      <el-form-item label="买入金额" :label-width="formLabelWidth" prop="total">
        <el-input v-model="purcheForm.total" @blur="computeAmount"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="purcheDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="purcheAction">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import vm from '@/common/js/bus.js';
import currency from '@/common/js/util/currency';
export default {
  props: ['companyId', 'companyName'],
  data() {
    return {
      price: 314.42,
      purcheForm: {
        amount: '',
        total: '',
      },
      purcheDialogVisible: false,
      formLabelWidth: '120px',
      rules: {
        amount: [
          {
            required: true,
            message: '请输入您要购买的克数或金额',
            trigger: 'blur',
          },
          {
            pattern: /^[0-9]+\.?[0-9]*$/,
            message: '请输入正确的克数',
            trigger: 'change',
          },
        ],
        total: [
          {
            required: true,
            message: '请输入您要购买的克数或金额',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  mounted() {
    vm.$on('showPurchaseDialog', () => {
      this.purcheDialogVisible = true;
    });
  },
  methods: {
    computeTotal() {
      if (this.purcheForm.amount !== '') {
        this.purcheForm.total = parseFloat(this.purcheForm.amount) * parseFloat(this.price);
        this.purcheForm.total = this.purcheForm.total.toFixed(2);
        this.purcheForm.total = currency(this.purcheForm.total);
      }
    },
    computeAmount() {
      let total = this.purcheForm.total;
      if (total && total.slice(0, 1) === '¥') {
        total = total.slice(1);
        let totalArray = [];
        for (let i of total) {
          if (i != ',') [totalArray.push(i)];
        }
        this.purcheForm.total = totalArray.join('');
        console.log(total);
      }
      this.purcheForm.amount = parseFloat(this.purcheForm.total) / parseFloat(this.price);
      this.purcheForm.amount = this.purcheForm.amount.toFixed(2);
      this.purcheForm.total = currency(this.purcheForm.total);
    },
    purcheAction() {
      this.purcheDialogVisible = false;
      this.fetch
        .post('/purchase', {
          purchaseAmount: this.purcheForm.amount,
          productType: this.companyId,
          idCardNum: sessionStorage.getItem('userId'),
        })
        .then(res => {
          if (res.errCode == '200') {
            this.$message.success(res.errMsg);
            vm.$emit('purchaseSuccess');
          } else {
            this.$message.error('未知错误');
          }
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-dialog {
  .product-name {
    font-size: 24px;
  }
  .el-input {
    width: 3.3rem;
  }
}
</style>
