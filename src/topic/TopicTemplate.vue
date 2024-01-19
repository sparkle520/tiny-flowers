<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted ,watch} from "vue";
import { useRouter } from "vue-router";
import TopicTitle from '/src/component/TopicTitle.vue'
import {change_theme} from '/src/assets/js/topic.js'
import { useConfigStore } from "../store/config";
import {change_layout} from '/src/assets/js/topic.js'

import { storeToRefs } from "pinia";
const store = useConfigStore();
const {theme}  = storeToRefs(store);
const {layout}  = storeToRefs(store);
store.$subscribe((mutation,state)=>{
  change_theme(state.theme)
  change_layout(state.layout)
})
const router = useRouter();
onBeforeMount(() => {});


//change scss var 
onMounted(()=>{
  change_theme(theme.value)
  change_layout(layout.value)
})
const data = {
  title:'HELLO WORLD',
  date:'2024-01-06?7:06'
}
/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="topic_main" class="flex  flex_direction_row">
    <div class="topic_content">
    <TopicTitle :data="data"></TopicTitle>
    <div class="topic_text flex flex_direction_column">
       
      </div>
    </div>
    <DirectoryList class="directoryList"></DirectoryList>

  </div>
  <Utils ></Utils>
</template>
<style lang="scss" scoped>
  
</style>
