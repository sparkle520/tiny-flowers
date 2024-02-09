<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { ref, onBeforeMount, onMounted, nextTick, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

import TopicTitle from "/src/component/TopicTitle.vue";
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
  gfm: true,
  pedantic: false,
  sanitize: true,
});

const initContent = () => {
  getAssetsFile(params.index);
};
const content = ref("");
watch(content, (newValue) => {
  content.value = marked(content.value);
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
  arr: topic_store.study, //topic_store
  id: params.index,
};
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
  initContent();
  nextTick(() => {
    emitter.emit("topic_data", get_topic_data());
  });
});
const getAssetsFile = (index) => {
  const _path = `/src/assets/topic_md/topic${index}.md`;
  const modules = import.meta.glob("/src/assets/topic_md/*.md", { as: "raw" });

  for (const path in modules) {
    modules[path]().then((mod) => {
      if (path == _path) {
        content.value = mod;
      }
    });
  }

  //  await import('/src/assets/topic_md/topic'+index+'.md?raw').then((module)=>{
  //   content.value = module.default;
  //  })
};
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
          <div v-html="content" class="markdown-body" v-highlight></div>
        </div>
        <TopicBottomInterface></TopicBottomInterface>
      </div>
      <TopicRightInterface></TopicRightInterface>
    </div>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped></style>
