<template>
  <div id="login">
    <div class="info-panel hidden-sm-and-down">
      <div class="info-wrapper">
        <div class="header">欢迎使用</div>
        <div class="header">金三顺黄金交易系统</div>
        <p class="support-info">
          &nbsp;&nbsp;&nbsp;&nbsp;If you have a question, use any of the below options to get in
          touch. Commercial license owners, you will be able to access your downloads once you log
          in. Not sure what to do next? Read this
          <a>introduction to Support Area.</a>
        </p>
        <hr />
        <h3>有问题，联系我们</h3>
        <div>
          <i class="el-icon-message"></i>
          <a>contact@czbank.com</a>
        </div>
      </div>
    </div>
    <div class="login-panel">
      <div class="login-wrapper">
        <div class="log-bg">
          <div class="log-logo">请登录</div>
        </div>
        <el-form>
          <el-form-item label="用户名">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-checkbox>记住用户名</el-checkbox>
          <el-button class="login-button" @click="loginAction">Login</el-button>
        </el-form>
        <p>
          Don't have an account?
          <a>Register now</a>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import fetch from '@/common/js/fetch.js';
import vm from '@/common/js/bus.js';
export default {
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        test: 'kiddd',
      },
    };
  },
  methods: {
    loginAction() {
      this.fetch
        .post('/login', {
          userName: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then(res => {
          if (res.errCode == 200) {
            this.$router.push('/home');
          }
        });
    },
  },
  created() {
    vm.$emit('loginPageInit');
  },
  destroyed() {
    vm.$emit('loginPageDestroyed');
  },
};
</script>
<style lang="less" scoped>
#login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: rgb(209, 43, 20);
  margin: 0px;
  display: flex;
  padding-bottom: 70px;
  .info-panel {
    flex: 1;
    .info-wrapper {
      color: #ffffff;
      padding: 100px;
      padding-right: 0px;
      .header {
        font-size: 60px;
      }
      p {
        margin-top: 100px;
        font-size: 18px;
        a {
          color: #eef900;
          text-decoration: underline;
        }
      }
    }
  }
  .login-panel {
    flex: 1;
    .login-wrapper {
      margin: auto;
      align-items: center;
      box-sizing: border-box;
      background-color: #ffffff;
      width: 432px;
      padding: 50px;
      border-radius: 10px;
      .el-form {
        .el-input {
        }
        .el-button {
          width: 100%;
          background-color: rgb(209, 43, 20);
          color: #ffffff;
          font-weight: bold;
          margin: 30px 0px;
        }
      }
      .log-bg {
        .log-logo {
          font-size: 24px;
          font-weight: bold;
        }
      }
      p {
        text-align: right;
        font-size: 18px;
        a {
          text-decoration: underline;
          color: rgb(14, 108, 156);
        }
      }
    }
  }
}
</style>
