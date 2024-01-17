<!-- @Author: LT -->
<!-- @Date: 2024-01-17 19:35:50 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted ,watch} from "vue";
import { useRouter } from "vue-router";
import c_c from "@/assets/js/utils.js"
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
    change_theme(props.theme)
});
const props = defineProps({
  theme: Boolean,
});

watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
const change_theme = (current_theme) =>{
  if (current_theme) {
    c_c("--bg_color", "#0b0e14");
    c_c("--color", "#f7f7f7");
   

  } else {
    c_c("--bg_color", "#f7f3f5");
    c_c("--color", "#000000");
  }
}
</script>
<template>
  <div id="main">
    
  </div>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #000000);
#main {
  width: 100%;
  min-height: 100vh;
  background: $bg_color;
  color: $color;
}
</style>
