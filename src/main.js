
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import topicBox from '/src/component/TopicBox.vue'
import router from './router/index'
import "@/assets/css/normalize.css"
import "@/assets/css/index.scss"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import GlobalComponents from '/src/component/index'
import {VueLatex} from "vatex"

import 'highlight.js/styles/github.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'


// let g_current_index = 0
const app = createApp(App)
// app.provide('g_current_index', g_current_index)
// app.config.globalProperties.$g_current_index = g_current_index
GlobalComponents(app)
app.use(router)
app.use(hljsVuePlugin)
app.use(VueLatex)

app.use(ElementPlus)
app.config.globalProperties.$axios = axios
app.mount('#app')
