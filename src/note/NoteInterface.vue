<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { ref, onBeforeMount, onMounted, nextTick, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import MathJax, { initMathJax, renderByMathjax } from 'mathjax-vue3'
import NoteTopInterface from '/src/note_interface/NoteTopInterface.vue'
import NoteBgInterface from '/src/note_interface/NoteBgInterface.vue'
import NoteRightInterface from '/src/note_interface/NoteRightInterface.vue'
import NoteBottomInterface from '/src/note_interface/NoteBottomInterface.vue'
import { change_theme } from "/src/assets/js/topic.js";
import hljs from 'highlight.js';
import NoteFootInterface from "../note_interface/NoteFootInterface.vue";

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
onUnmounted(() => {
})
const initContent = () => {
  get_md_file(params.id, params.index);
};
const config_store = useConfigStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
onBeforeMount(() => {

});
const render_marked_latex = (dom, mod, callback) => {
  dom.innerHTML = marked(mod, true)
  callback(dom)
}
onMounted(() => {
  if (window.innerWidth >= 600) {
    change_layout(layout.value);

  }
  change_theme(theme.value);
  initContent();
});

const get_md_file = (id, index) => {
  const _path = `/src/store_data/note_data/${id}/${index}.md`;
  const modules = import.meta.glob(`/src/store_data/note_data/*/*.md`, { as: "raw" });
  for (const path in modules) {
    if (path == _path) {
      modules[path]().then((mod) => {
        const dom = document.querySelector('#n_t')
        render_marked_latex(dom, mod, (dom) => {
          nextTick(() => {
            renderByMathjax(dom).catch(err => {
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
    <NoteBgInterface class="topic_bg"></NoteBgInterface>
    <NoteTopInterface class="topic_top_interface"></NoteTopInterface>
    <div class="topic_container">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content">
        <div class="topic_text">
          <div id="n_t" class="markdown-body"></div>
        </div>
        <NoteBottomInterface></NoteBottomInterface>
      </div>
      <NoteRightInterface></NoteRightInterface>
    </div>
    <NoteFootInterface></NoteFootInterface>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped></style>
