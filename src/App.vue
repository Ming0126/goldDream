<template>
  <div id="app">
    <Header></Header>
    <transition class="app-main-content" name="fade">
      <router-view class="content" />
    </transition>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/header/header';
import Footer from '@/components/footer/footer';
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="less">
@import './common/style/public.less';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    width: 100%;
    height: calc(100% - 61px - 19px);
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 16pt;
    color: #003366;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
