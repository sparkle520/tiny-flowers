<!-- @Author: LT -->
<!-- @Date: 2024-01-05 22:41:36 -->
<!-- @Description:  -->

<script setup>
import {  onBeforeMount,  onMounted } from "vue";
import { marked } from "marked";
const render = new marked.Renderer();
import LogDirectoryList from '/src/component/LogDirectoryList.vue'
marked.setOptions({
  renderer: render,
  gfm: false,
  pedantic: false,
  sanitize: true,
});
onBeforeMount(() => {
  
});
onMounted(() => {
  window.scrollTo(0, 0);
  const _path = `/src/version_log.md`;
  const modules = import.meta.glob(`/src/version_log.md`, { as: "raw" });
  for (const path in modules) {
    if (path == _path) {
      modules[path]().then((mod) => {
        const dom  = document.querySelector('.log_md')
        dom.innerHTML = marked(mod, true)
})
    }
    }
});





</script>
<template>
  <div id="update_log_main" class="f f_d_r r">
    <LogDirectoryList></LogDirectoryList>
    <div class="log_md_box">
      <div class="log_md markdown-body">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#update_log_main {
  width: 100vw;
  color: $text;
  margin-top: 90px;
  background: $fill_body;
  .log_md_box{
    margin-left: 286px;
    padding: 16px;
    width: calc(100vw - 318px );
  }
}


</style>
