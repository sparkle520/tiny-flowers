<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { ref, onBeforeMount, onMounted, nextTick, watch,onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue3'

import { change_theme } from "/src/assets/js/topic.js";
import emitter from "@/assets/config/mitt_bus.js";
// import md_str from '/src/assets/topic_md/topic1.md?raw'
import { useConfigStore } from "../store/config";
import { useTopicStore } from "../store/topic";
const { params } = useRoute();

import { change_layout } from "/src/assets/js/topic.js";
import { select_by_id } from "/src/assets/js/topic.js";
import { storeToRefs } from "pinia";
import { marked } from "marked";
const render = new marked.Renderer();
marked.setOptions({
  renderer: render,
  gfm: false,
  pedantic: false,
  sanitize: true,
});
onUnmounted(()=>{
  clearInterval(watch_height_interval);
})
const init_content = () => {
  get_md_file(params.index);
};
const content = ref("");
function onMathJaxReady() {
  const el = document.getElementById('mathjax')
  renderByMathjax(el)
}
watch(content, (newValue) => {
  content.value = marked(newValue);
  
// initMathJax({}, onMathJaxReady)
nextTick(()=>{
  renderByMathjax(document.getElementById('mathjax'))
  emitter.emit("topic_data", get_topic_data());
  watch_height()

})
});
const config_store = useConfigStore();
const topic_store = useTopicStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
const router = useRouter();
onBeforeMount(() => {});
const img_load_handle = () => {
  emitter.emit("topic_data", get_topic_data());
};
const get_topic_data = () => {

  return {
    topic_data: select_by_id(config.arr, config.id),
  };
};
const config = {
  arr: topic_store.data, //topic_store
  id: params.index,
};
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
  init_content();
  nextTick(() => {
    emitter.emit("topic_data", get_topic_data());
  });
});
const get_md_file = (index) => {
  const _path = `/src/assets/topic_md/${index}.md`;
  const modules = import.meta.glob("/src/assets/topic_md/*.md", { as: "raw" });
  for (const path in modules) {
    if (path == _path) {
      modules[path]().then((mod) => {
        content.value = mod;
      });
    }
  }
};
// 监听高度
let watch_height_interval;
let height;
const check_over = ref(false)

const watch_height = () => {
  if(watch_height_interval)return;
  watch_height_interval = setInterval(() => {
    const mathjax_el = document.getElementById("mathjax");
    if (mathjax_el.clientHeight != height) {
      emitter.emit("topic_data", get_topic_data());
      height = mathjax_el.clientHeight;
      check_over.value = true
    }
    else{
    }
},10000)
}
watch(check_over,(newV)=>{
  if(newV){
    clearInterval(watch_height_interval)
  }
})
//  await import('/src/assets/topic_md/topic'+index+'.md?raw').then((module)=>{
//   content.value = module.default;
//  })

/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="topic_main">
    <TopicBgInterface class="topic_bg"></TopicBgInterface>
    <TopicTopInterface class="topic_top_interface"></TopicTopInterface>
    <div class="topic_container">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content">
        <div class="topic_text">
          
          <div v-html="content" id="mathjax" class="markdown-body" v-highlight></div>
        </div>
        <TopicBottomInterface></TopicBottomInterface>
      </div>
      <TopicRightInterface></TopicRightInterface>
    </div>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>
</style>
