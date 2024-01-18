<!-- @Author: LT -->
<!-- @Date: 2024-01-18 14:59:50 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount,onUnmounted, onMounted ,watch,ref} from 'vue'
import { useRouter } from 'vue-router'
import emitter from "@/assets/config/mitt_bus.js";

const router = useRouter()
onBeforeMount(() => {
})
onUnmounted(()=>{
    emitter.off("new_side_view");
})
onMounted(() => {
    change_theme(props.theme)
  change_layout(props.layout);
  emitter.on("new_side_view", (v) => side_view_handle(v));
})
const props = defineProps({
  theme: Boolean,
  layout:Boolean,
});
const show_directory_list = ref(props.layout)
watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
const side_view_handle = (v) => {
  change_layout(v.current_side_view);
};
const change_layout = (flag) => {
  const directory_list_main = document.querySelector("#directory_list_main");

  if (flag) {
    directory_list_main.style.opacity= "1";
    show_directory_list.value = true
  } else {
    directory_list_main.style.opacity= "0";
    show_directory_list.value = false

  }
};
const c_c = (mut_val, color) => {
    document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
  };
 const change_theme = (current_theme) => {
    if (current_theme) {
      //night
      c_c("--directory_list_bg", "#242837");
      
    
    } else {
      c_c("--directory_list_bg", "#f7f3f5");
     
    
  
    }
  }
  
</script>
<template>
    <div v-show="show_directory_list" id="directory_list_main" class="fixed">
    </div>
</template>
<style lang="scss" scoped>
$directory_list_bg: var(--directory_list_bg, #f7f3f5);

#directory_list_main {
    width: 20vw;
    min-height: 100vh;
    border-radius: 5px;
    background: $directory_list_bg;
    right:calc(10vw - 10px);
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
@keyframes move_left {
    0%{
        transform: translateX(100%);

    }100%{
        transform: translateX(0);

    }
}
</style>