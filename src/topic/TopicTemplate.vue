<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TopicTitle from "/src/component/TopicTitle.vue";
import { change_theme } from "/src/assets/js/topic.js";
import emitter from "@/assets/config/mitt_bus.js";

import { useConfigStore } from "../store/config";
import { useTopicStore } from "../store/topic";
import { change_layout } from "/src/assets/js/topic.js";

import { storeToRefs } from "pinia";
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
    dom_data: Array.from(document.querySelectorAll(".topic_text *")),
    topic_data: select_by_id(topic_store.technique, 1),
  };
};
const select_by_id = (arr, id) => {
  console.log(id);
  if (arr.length == 0) return -1;
  let l = 0;
  let r = arr.length;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid].id == id) return arr[mid];
    else if (arr[mid].id > id) l = mid + 1;
    else r = mid;
  }
  return -1;
};
//change scss var
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
  emitter.emit("topic_data", get_topic_data());
});

/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="topic_main" class="flex flex_direction_column">
    <TopicTopInterface></TopicTopInterface>
    <div class="topic_container flex flex_direction_row">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content flex flex_direction_column">
        <div class="topic_text flex flex_direction_column">
          
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
