
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import router from './router/index'
import "@/assets/css/normalize.css"
import "@/assets/css/index.scss"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css' 
// let g_current_index = 0

const app = createApp(App)
// app.provide('g_current_index', g_current_index)
// app.config.globalProperties.$g_current_index = g_current_index
app.use(router)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios
app.mount('#app')
