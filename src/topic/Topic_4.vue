<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, watch,nextTick } from "vue";
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
import { marked } from 'marked'
const render = new marked.Renderer()
marked.setOptions({
  renderer: render, 
  gfm: true, 
  pedantic: false, 
  sanitize: true 
})
const config  = {
  arr:topic_store.life, //topic_store
  id:1,
}
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
const router = useRouter();
onBeforeMount(() => {

});
const img_load_handle = () => {
  emitter.emit("topic_data", get_topic_data());
};
const get_topic_data = () => {
  return {
    topic_data: select_by_id(config.arr, config.id),
  };
};
const select_by_id = (arr, id) => {
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
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
nextTick(()=>{
  emitter.emit("topic_data", get_topic_data());
})
});

/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="topic_main">
    <TopicBgInterface class="topic_bg"></TopicBgInterface>

    <TopicTopInterface></TopicTopInterface>
    <div class="topic_container">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content">
        <div class="topic_text">
          <span class="normal">&emsp;&emsp;从零搭建确实挺累的，不如套别人的模板二次开发，但有的时候就是喜欢这种从头到尾的感觉，一切都是可测的。
        一开始也没想部署上去,但是github可以免费部署静态网页。我就尝试了一下，除了一开始加载慢一点好像也没啥问题。就这样我就开始一步一步的搭建，中间也是做过无数次的修改和重构，
        现在也算是基本完成了，虽然还有很多不完善的地方，但是已经可以用了，后续也会继续完善。<br>
        &emsp;&emsp;搭建这个博客主要是为了记录自己的学习过程，分享自己的学习心得，同时也希望能够帮助到一些需要帮助的人。
        <br>
       
       </span>
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
