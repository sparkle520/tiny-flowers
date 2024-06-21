
import { createApp } from 'vue'
import App from './App.vue'
import axios from "axios";
import router from './router/index'
import "@/assets/css/normalize.css"
import "@/assets/css/index.scss"
import "@/assets/css/pattern.css"

import GlobalComponents from '/src/component/index'
import { VueLatex } from "vatex"
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue3'
import { createPinia } from 'pinia'
import 'gitalk/dist/gitalk.css'
import hljs from 'highlight.js';
import Particles from "vue3-particles";
import hljsVuePlugin from '@highlightjs/vue-plugin'
const pinia = createPinia()
function onMathJaxReady() {
  const el = document.getElementById('mathjax')
  renderByMathjax(el)
}
initMathJax({}, onMathJaxReady)
const app = createApp(App)
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
app.config.globalProperties.$axios = axios
app.mount('#app')
