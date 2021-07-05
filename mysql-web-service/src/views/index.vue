<template>
  <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/showDatabases">数据集</a></el-breadcrumb-item>
      </el-breadcrumb>
      <h1>index</h1>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  mounted() {
  },
  setup: () => {
  }
})
</script>

<style scoped lang="scss">
</style>
