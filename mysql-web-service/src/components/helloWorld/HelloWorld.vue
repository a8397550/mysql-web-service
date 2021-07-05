<template>
  <h1>666{{ msg }}</h1>

  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a
      href="https://marketplace.visualstudio.com/items?itemName=octref.vetur"
      target="_blank"
    >
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import {testFn} from './index'
// 显式加载资源为一个 URL
/**
  *导入内容参考 https://vitejs.cn/guide/features.html#url-%E5%AF%BC%E5%85%A5
*/
import assetAsURL from './index.ts?url'
import imgUrl from '../assets/logo.png';
console.log('base64', imgUrl); // 这玩意会输出路径，build后也是路径
console.log('assetAsURL', assetAsURL); // 运行态时是路径，build后，是base64的文件


export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  mounted() {
    testFn();
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped lang="scss">
$fontSize: 40px;
a {
  color: #42b983;
  font-size: $fontSize;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
