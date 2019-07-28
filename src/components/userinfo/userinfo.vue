<template>
  <div class="position-content">
    <h1>
      用户信息
      <el-button type="primary">提交</el-button>
      <el-button type="primary" @click="editInfo">修改</el-button>
    </h1>

    <el-form class="form" :model="userInfo" ref="form" label-width="100px" :disabled="isEdit">
      <!-- 姓名 -->
      <el-form-item class="item" label="姓名:" prop="name">
        <el-input class="class123" v-model="userInfo.name"></el-input>
      </el-form-item>

      <!-- 身份证号 -->
      <el-form-item class="item" label="身份证号:" prop="idcard">
        <el-input class="class123" v-model="userInfo.idCard">{{}}</el-input>
      </el-form-item>

      <!-- 手机号 -->
      <el-form-item class="item" label="手机号:" prop="phone">
        <el-input class="class123" v-model="userInfo.phone"></el-input>
      </el-form-item>

      <!-- 邮箱信息 -->
      <el-form-item class="item" label="邮箱:" prop="email">
        <el-input class="class123" v-model="userInfo.email"></el-input>
      </el-form-item>
      <!-- <el-button type="primary" @click="onSubmit">修改邮箱</el-button> -->

      <!-- 银行卡号 -->
      <el-form-item class="item" label="银行卡号 :" prop="bankaccount">
        <el-input class="class123" v-model="userInfo.bankAccount"></el-input>
      </el-form-item>

      <!-- 账户余额 -->
      <el-form-item class="item" label="账号余额 :" prop="balance">
        <el-input class="class123" v-model="userInfo.balance" disabled></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEdit: true,
      userInfo: {
        name: '灿包',
        idCard: '142736199706072341',
        phone: '18867573737',
        email: '88787232@163.com',
        bankAccount: '683229799723923797',
        balance: '233,556.43',
      },
    };
  },
  methods: {
    editInfo() {
      this.isEdit = false;
    },
  },
};
</script>
<style lang="less" scoped>
.position-content {
  h1 {
    margin-left: 0.5rem;
    margin-right: 1rem;
    font-size: 0.4rem;
  }
  .el-button {
    float: right;
    margin-right: 20px;
    margin-top: 20px;
  }
  .form {
    padding: 1rem 2rem;
    font-size: 0.12rem;
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    text-align: right;
    margin-right: 20px;
    width: 4rem;
  }
  .class123 {
    width: 2.5rem;
  }
}
</style>
