<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :background-color="login ? '#fff' : 'rgb(209, 43, 20)'"
  >
    <el-menu-item v-if="login" index="1" class="banner">金三顺黄金交易系统</el-menu-item>
    <el-menu-item v-else index="1" class="banner">
      <img :src="banner" />
    </el-menu-item>
    <el-menu-item index="2">
      <template slot="title"
        >查看行情</template
      >
    </el-menu-item>
    <el-menu-item index="4">订单管理</el-menu-item>
    <el-menu-item class="user">
      <i class="el-icon-user"></i>
      金三顺
    </el-menu-item>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex';
import banner from '@/assets/banner.png';
import vm from '@/common/js/bus.js';

export default {
  data() {
    return {
      banner,
      login: false,
    };
  },
  computed: {
    ...mapGetters('cart', ['cartTotalPrice']),
  },
  created() {
    vm.$on('loginPageInit', () => {
      this.login = true;
    });
    vm.$on('loginPageDestroyed', () => {
      this.login = false;
    });
  },
};
</script>
<style lang="less" scoped>
.el-menu {
  .banner {
    font-size: 30px;
  }
  .el-menu-item {
  }
}
.user {
  font-size: 20px;
  float: right;
  display: flex;
  align-items: center;
  i {
    margin-bottom: 3px;
  }
}
</style>
