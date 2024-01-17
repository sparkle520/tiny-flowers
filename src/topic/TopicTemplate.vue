<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted ,watch} from "vue";
import { useRouter } from "vue-router";
import TopicTitle from '/src/component/TopicTitle.vue'
import {change_theme} from '/src/assets/js/topic.js'
const router = useRouter();
onBeforeMount(() => {});
const props = defineProps({
  theme: Boolean,
});
watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
//change scss var 
onMounted(()=>{
  change_theme(props.theme)
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
  <div id="main" class="flex  flex_direction_column">
    <div class="content">
    <TopicTitle :data="data"></TopicTitle>
      <div class="text flex flex_direction_column">
       
      </div>
    </div>
  </div>
  <Utils :theme="props.theme"></Utils>
</template>
<style lang="scss" scoped>
  
</style>
