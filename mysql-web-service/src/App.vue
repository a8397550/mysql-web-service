<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ErrorComponentTest from './components/errorComponent/errorTest.vue';

export default defineComponent({
  name: 'App',
  components: {
    ErrorComponentTest
  }
})
</script>

<style>
</style>
