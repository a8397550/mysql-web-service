<template>
  <div>
    <h1>选择database</h1>
    <table-custom 
      :columns="[{key: 'a', label: 'a'}]" 
      :tableData="[{a: 11}, {a: 22}]" 
      :operator="['查看']"
    />
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
