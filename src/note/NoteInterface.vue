<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { ref, onBeforeMount, onMounted, nextTick, watch,onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue3'
import NoteTopInterface from '/src/note_interface/NoteTopInterface.vue'
import NoteBgInterface from '/src/note_interface/NoteBgInterface.vue'
import NoteRightInterface from '/src/note_interface/NoteRightInterface.vue'
import NoteBottomInterface from '/src/note_interface/NoteBottomInterface.vue'
import { change_theme } from "/src/assets/js/topic.js";
import emitter from "@/assets/config/mitt_bus.js";
// import md_str from '/src/assets/topic_md/topic1.md?raw'
import { useConfigStore } from "../store/config";
import { useNoteStore } from "../store/note";
const { params } = useRoute();
import { change_layout } from "/src/assets/js/topic.js";
import { storeToRefs } from "pinia";
import { marked } from "marked";
const render = new marked.Renderer();
const note_store = useNoteStore();
marked.setOptions({
  renderer: render,
  gfm: false,
  pedantic: false,
  sanitize: true,
});
onUnmounted(()=>{
  clearInterval(watch_height_interval)
})
const initContent = () => {
  get_md_file(params.id,params.index);
};
const content = ref("");
function onMathJaxReady() {
  const el = document.getElementById('mathjax')
  renderByMathjax(el)
}
watch(content, (newValue) => {
  content.value = marked(newValue);
  
nextTick(()=>{
  onMathJaxReady()
  watch_height()

  emitter.emit("note_data", note_store.get_note_by_id(params.id));
})
});
const config_store = useConfigStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
const router = useRouter();
onBeforeMount(() => {
  
});
// 监听高度
let watch_height_interval;
let height;
const check_over = ref(false)


const watch_height = () => {
  if(watch_height_interval)return;
  watch_height_interval = setInterval(() => {
    const mathjax_el = document.getElementById("mathjax");
    if (mathjax_el.clientHeight != height) {
      emitter.emit("note_data", note_store.get_note_by_id(params.id));
      height = mathjax_el.clientHeight;
      check_over.value = true

    }
},1000)}
watch(check_over,(newV)=>{
  if(newV){
    clearInterval(watch_height_interval)
  }
})
const img_load_handle = () => {
  emitter.emit("note_data", note_store.get_note_by_id(params.id));
};

onMounted(() => {

  change_theme(theme.value);
  change_layout(layout.value);
  initContent();
});

const get_md_file = (id,index) => {
  const _path = `/src/assets/note_data/${id}/${index}.md`;
  const modules = import.meta.glob(`/src/assets/note_data/*/*.md`, { as: "raw" });
  for (const path in modules) {
    if (path == _path) {
      modules[path]().then((mod) => {
        content.value = mod;
      });
    }
  }
};

</script>
<template>
  <div id="topic_main">
    <NoteBgInterface class="topic_bg"></NoteBgInterface>
    <NoteTopInterface class="topic_top_interface"></NoteTopInterface>
    <div class="topic_container">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content">
        <div class="topic_text">
          
          <div v-html="content" id="mathjax" class="markdown-body" v-highlight></div>
        </div>
        <NoteBottomInterface></NoteBottomInterface>
      </div>
      <NoteRightInterface></NoteRightInterface>
    </div>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>
</style>
