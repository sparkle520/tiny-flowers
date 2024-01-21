<!-- @Author: LT -->
<!-- @Date: 2024-01-21 16:02:01 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  onUnmounted,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import c_c from "@/assets/js/utils.js";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
});
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--game_2048_bg_color", "#0b0e14");
    c_c("--game_2048_color", "#f7f7f7");
    c_c("--game_2048_box_bg", "#f7f7f7");
  } else {
    c_c("--game_2048_bg_color", "#fdf0f4");
    c_c("--game_2048_color", "#000000");
    c_c("--game_2048_box_bg", "#d3d3df");
  }
};
</script>
<template>
  <div
    id="main_diana"
    class="flex align_items_center justify_content_center"
  >
  
  </div>
</template>
<style lang="scss" scoped>
$game_2048_bg_color: var(--game_2048_bg_color, #211e2b);
$game_2048_color: var(--game_2048_color, #1a1814);
$game_2048_box_bg: var(--game_2048_box_bg, #facaaa);
#main_diana {
  width: 100vw;
  height: 100vh;
  background: $game_2048_bg_color;
  color: $game_2048_color;
  user-select: none;
}
</style>
