<template>
  <h1>error {{ msg }}</h1>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    // 抛出异常会被 app.config.errorHandler 监听到
    testFn();
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped lang="scss">
</style>
