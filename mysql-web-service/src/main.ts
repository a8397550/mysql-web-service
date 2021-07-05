import * as Vue from 'vue'
import App from './App.vue'
import {log} from '@/utils/log'
import {versionVerify} from '@/utils/version'
import router from '@/src/router/router'
import elementPlugin from '@/src/elementPlugin'
import 'element-ui/lib/theme-chalk/index.css';

const { createApp } = Vue;

if (!App.config) {
  App.config = {}
}

// 自定义插件
const MyLogPlugin = {
  install: function (app, options) {
    console.log(app.version)
    if (versionVerify('3.0.0', app.version) >= 0) {
      app.config.globalProperties.$log = log
      return;
    }
    
    app.prototype.$log = log
  }
}


const app = createApp(App);

app.config.errorHandler = (err, vm, info) => {
  // 监听异常情况
  log.error([err, vm, info])
}
app.use(MyLogPlugin)
app.use(router)
app.use(elementPlugin);
app.mount('#app')
