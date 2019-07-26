<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    :background-color="login ? '#fff' : 'rgb(209, 43, 20)'"
  >
    <el-menu-item v-if="login" index="1" class="banner" style="color: #909399"
      >金三顺黄金交易系统</el-menu-item
    >
    <el-menu-item v-else index="1" class="banner">
      <router-link to="/home">
        <img :src="banner" />
      </router-link>
    </el-menu-item>
    <el-menu-item index="2" class="hidden-xs-only">
      <router-link to="home">所有产品</router-link>
    </el-menu-item>
    <el-menu-item index="3" class="hidden-xs-only">
      <router-link to="position">我的持仓</router-link>
    </el-menu-item>
    <el-menu-item index="4"></el-menu-item>
    <el-menu-item class="user">
      <el-submenu index="5" class="user-popup">
        <template slot="title">
          <i class="el-icon-user"></i>
        </template>
        <el-menu-item index="5-1" style="width: 100px;">我的信息</el-menu-item>
        <el-menu-item index="5-2" style="width: 100px;">我的收益</el-menu-item>
        <el-menu-item index="5-3">
          <router-link to="record" class="hidden-xs-only">交易记录</router-link>
        </el-menu-item>
      </el-submenu>
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  .banner {
    font-size: 0.3rem;
  }
  .el-menu-item {
    color: #fff;
    font-size: 0.2rem;
    .el-submenu__title {
      padding: 0px;
    }
  }
}
.user {
  font-size: 0.2rem;
  float: right;
  display: flex;
  align-items: center;
  i {
    margin-bottom: 3px;
    padding-right: 5px;
  }
}
</style>
