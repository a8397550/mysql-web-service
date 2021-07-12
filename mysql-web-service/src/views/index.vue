<template>
  <div>
    <h1>查看表内容</h1>
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
      <el-radio-button label="top">top</el-radio-button>
      <el-radio-button label="right">right</el-radio-button>
      <el-radio-button label="bottom">bottom</el-radio-button>
      <el-radio-button label="left">left</el-radio-button>
    </el-radio-group>

    <el-tabs :tab-position="tabPosition" style="height: 200px;">
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <table-custom 
      :columns="columns" 
      :tableData="tableData" 
      :operator="['查看']"
    />
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      columns: [{key: 'a', label: 'a'}],
      tableData: [],
    }
  },
  mounted() {
  },
  setup: () => {
  }
})
</script>

<style scoped lang="scss">
</style>
