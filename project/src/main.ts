// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue';
import axios from 'axios';
import gloablComponent from './components/index.ts';
import './styles/index.scss';
import router from './router/index.ts';
const app = createApp(App)
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
app.use(ElementPlus, {
  locale: zhCn
})

import pinia from './store/index.ts';
app.use(ElementPlus)
// svg的引入
// import 'virtual:svg-icons-register'
// 注册模板的路由
app.use(router);
// 安装仓库
app.use(gloablComponent);

app.use(pinia)
// 测试假的接口

axios({
  url: '/api/user/login',
  method: "post",
  data: {
    username: 'admin',
    password: '111111'
  }
})



app.mount('#app')
