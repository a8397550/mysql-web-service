import * as Vue from 'vue'
import App from './App.vue'
import {log} from '@/utils/log'
import {versionVerify} from '@/utils/version'
import router from '@/src/router/router'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import elementPlugin from '@/src/elementPlugin'
import request from '@/src/lib/request'
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
      app.config.globalProperties.$request = request;
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
app.use(ElementPlus);
app.use(elementPlugin);
app.mount('#app')
