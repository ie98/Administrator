import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 表格内的树形组件
import TreeTable from 'vue-table-with-tree-grid'
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
//导入字体图标
import  './assets/fonts/iconfont.css'
//导入axios
import axios from 'axios'
//将axios挂在到vue的原型对象的$http属性上
Vue.prototype.$http = axios
//配置请求根路径
axios.defaults.baseURL = 'http://localhost:8088/'
//axios设置请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token') //设置响应头
  console.log(config)
  return config
}, err => {
  console.log(err)
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
//将'vue-table-with-tree-grid'（依赖）注册为全局组件 
Vue.component('tree-table',TreeTable)