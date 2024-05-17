
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import router from './router/index'
import "@/assets/css/normalize.css"
import "@/assets/css/index.scss"
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import GlobalComponents from '/src/component/index'
// import "/src/assets/untils/mathjax";
// import "mathjax/es5/tex-mml-chtml";
import { VueLatex } from "vatex"
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue3'

import { createPinia } from 'pinia'
// import 'highlight.js/styles/github-dark.css'
import 'gitalk/dist/gitalk.css'
import hljs from 'highlight.js';
//import "github-markdown-css";
// import "highlight.js/styles/github.css";
import Particles from "vue3-particles";
// import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
const pinia = createPinia()
// let g_current_index = 0
function onMathJaxReady() {
  const el = document.getElementById('mathjax')
  renderByMathjax(el)
}
initMathJax({}, onMathJaxReady)
const app = createApp(App)
// app.provide('g_current_index', g_current_index)
// app.config.globalProperties.$g_current_index = g_current_index
app.directive('highlight', function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
})
GlobalComponents(app)
app.use(router)
app.use(hljsVuePlugin)
app.use(Particles)
app.use(MathJax)
app.use(VueLatex)
app.use(pinia)
app.use(ElementPlus)
app.config.globalProperties.$axios = axios
app.mount('#app')
