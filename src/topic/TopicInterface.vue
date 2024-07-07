<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { ref, onBeforeMount, onMounted, nextTick, watch,onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue3'
import hljs from 'highlight.js';

import { change_theme } from "/src/assets/js/topic.js";
import { useConfigStore } from "../store/config";
import { useTopicStore } from "../store/topic";
const { params } = useRoute();

import { change_layout } from "/src/assets/js/topic.js";
import { select_by_id } from "/src/assets/js/topic.js";
import { storeToRefs } from "pinia";
import { marked } from "marked";
const render_marked_latex = (dom,mod,callback)=>{
  dom.innerHTML =  marked(mod,true)
  callback(dom)
}
const render = new marked.Renderer();
marked.setOptions({
  renderer: render,
  gfm: false,
  pedantic: false,
  sanitize: true,
});
onUnmounted(()=>{
})
const init_content = () => {
  get_md_file(params.index);
};


const config_store = useConfigStore();
const topic_store = useTopicStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
onBeforeMount(() => {get_topic_data()});
const get_topic_data = () => {
topic_store.current_topic_index  = topic_store.length()-select_by_id(config.id)
};
const config = {
  id: params.index,
};
onMounted(() => {
  if(window.innerWidth >= 600){
    change_layout(layout.value);
  }
  change_theme(theme.value);
  init_content();

});
const get_md_file = (index) => {
  const _path = `/src/store_data/topic_data/${index}.md`;
  const modules = import.meta.glob("/src/store_data/topic_data/*.md", { as: "raw" });
  for (const path in modules) {
  
    if (path == _path) {

      modules[path]().then((mod) => {
        // content.value =  marked(mod);
        const dom = document.querySelector('#t_t')
        render_marked_latex(dom,mod,(dom)=>{
          nextTick(() => {
              renderByMathjax(dom).catch(err=>{
          }
        ); 
          });
          let blocks = dom.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightElement(block)
  })
        })
      });
    }
  }
};

</script>
<template>
  <div id="topic_main">
    <TopicBgInterface class="topic_bg"></TopicBgInterface>
    <TopicTopInterface class="topic_top_interface"></TopicTopInterface>
    <div class="topic_container">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content">
        <div class="topic_text">
          
          <div  id="t_t" class="markdown-body"></div>
        </div>
        <TopicBottomInterface></TopicBottomInterface>
      </div>
      <TopicRightInterface></TopicRightInterface>
    </div>
    <TopicFootInterface></TopicFootInterface>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>

</style>
