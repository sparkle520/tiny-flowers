<script setup>
import { useRoute } from "vue-router";
import { inject, onMounted, watch, ref,onUnmounted,nextTick } from "vue";
import { clickEffect} from "/src/assets/js/mouse.js";
import emitter from "@/assets/config/mitt_bus.js"

const route = useRoute();
// const change_current_index =(index) =>{
//     g_current_index = index
// }
// let g_side_bar = inject('g_side_bar')
let current_side_view = true;
onMounted(() => {
    emitter.emit('new_side_view', {current_side_view:current_side_view})
});
//鼠标特效
onUnmounted(()=>{
  emitter.all.clear()
})
const side_view_handle = () => {
  current_side_view = !current_side_view
  emitter.emit('new_side_view', {current_side_view:current_side_view})
}
emitter.on('side_view_change', () => side_view_handle())

clickEffect();
const music = ref(false);
const music_handle = (status) => {
  music.value = status;
};
const theme_handle = (status) => {
  current_theme.value = status;
};
const current_theme = ref(false);
watch(current_theme, (newV, oldV) => {
  if (newV.theme) {
    c_c("--bg_color", "#1e2433");
    document.body.style.background = "#1e2433";
  } else {
    c_c("--bg_color", "#f7f3f5");
    document.body.style.background = "#f7f3f5";
  }
});
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
</script>

<template>
  <div id="main" class="flex flex_direction_column">
    <!-- <LeftNavBar @music_change="music_handle" class="nav"></LeftNavBar> -->
    <TopNavBar
      @music_change="music_handle"
      class="nav"
      @theme_change="theme_handle"
      :theme="current_theme"
    ></TopNavBar>
    <div v-if="!$route.meta.screenFull" class="park"></div>
    <router-view
      :key="$route.path"
      class="router_view"
      :theme="current_theme"
      :layout="current_side_view"
    ></router-view>
    <MusicPlayer
      v-show="music"
      class="music_player absolute"
      :theme="current_theme"
    ></MusicPlayer>
  </div>
</template>

<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);

#main {
  background: $bg_color;
  width: 100vw;
  .nav {
    z-index: 1000000;
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .park {
    width: 100vw;
    z-index: 99;
    height: 70px;
    top: 0;
    background: transparent;
  }
  .router_view {
  }
  .music_player {
    width: 400px;
    right: 0;
    top: 100px;
    height: 150px;
    z-index: 1000;
    position: fixed;
    animation: move 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
}
@keyframes move {
  0% {
    right: -100%;
  }
  100% {
    right: 0;
  }
}
</style>
