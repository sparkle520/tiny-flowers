<!-- @Author: LT -->
<!-- @Date: 2024-01-16 13:59:42 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, ref, onMounted, watch } from "vue";
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
    change_theme(props.theme)

})
//change scss var 
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const props = defineProps({
  theme: Boolean,
});

watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--bg_color", "#1e2433");
   
  } else {
    c_c("--bg_color", "#f7f3f5");
   
  }
}
</script>
<template>
    <div id="main">
    </div>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);

#main {
    width: 100%;
    background: $bg_color;
    height: 100vh;
}
</style>