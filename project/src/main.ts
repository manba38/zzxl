// main.ts
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import axios from 'axios';
import gloablComponent from './components/index.ts';
import './styles/index.scss';
import router from './router/index.ts';
// 获取应用实例对象
const app = createApp(App)
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn
})
// 引入仓库
import pinia from './store/index.ts';
// svg的引入
// 注册模板的路由
app.use(router);
// 安装自定义插件
app.use(gloablComponent);
// 安装仓库
app.use(pinia)
// 测试假的接口

axios.post('/api/user/login', {
  username: 'admin',
  password: '111111'
})
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.error('Login request failed:', error);
  });
// 引入路由鉴权文件
import './peimisstion.ts'

import { isHasButton } from './directive/has.ts';
isHasButton(app)

// 将引用挂在到挂载点上
app.mount('#app')

