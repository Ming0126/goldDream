<template>
  <div class="mall-content">
    <h1>黄金商城</h1>
    <div class="card-wrap">
      <el-card v-for="i in 14" :key="i" class="box-card">
        <div v-for="o in 4" :key="o" class="text item">{{ '列表内容 ' + o }}</div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.mall-content {
  h1 {
    margin-left: 0.5rem;
    font-size: 0.4rem;
  }
  .card-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .box-card {
      width: 5rem;
      margin: 0.2rem;
    }
  }
}
</style>
