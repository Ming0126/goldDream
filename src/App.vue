<template>
  <div id="app">
    <Header></Header>
    <transition class="app-main-content" name="fade">
      <router-view class="page-content" />
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
  mounted() {
    window.addEventListener('resize', this.pageAdapt);
  },
  methods: {
    pageAdapt() {
      console.log(document.body.clientWidth);
      let clientWidth = document.body.clientWidth;
      console.log(document.querySelector('html').style.fontSize);
      document.querySelector('html').style.fontSize = `${(625 * parseInt(clientWidth)) / 1440}%`;
      console.log(document.querySelector('html').style.fontSize);
    },
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
  position: relative;
  min-height: 100%;

  .page-content {
    width: 100%;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 16pt;
    color: #003366;
    padding-top: 61px;
    padding-bottom: 30px;
  }
}
</style>
