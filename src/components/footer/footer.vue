<template>
  <div class="footer">
    <div class="footerText">版权所有 © 浙商银行股份有限公司</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footer {
  width: 100%;
  border-radius: 10px;
  position: absolute;
  bottom: 0;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  .footerText {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-align: center;
    font-size: 10pt;
    a {
      color: inherit;
    }
  }
}
</style>
