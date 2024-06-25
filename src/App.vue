<script setup>

import { clickEffect } from "/src/assets/js/mouse.js";



clickEffect();
</script>

<template>
  <div id="main" class="f f_d_c">
    
    <TopNavBar  class="nav"></TopNavBar>
    <div v-if="!$route.meta.screenFull" class="park"></div>
    <router-view :key="$route.fullPath" class="router_view"></router-view>
  </div>
</template>

<style lang="scss" scoped>
$bg_color: var(--bg_color, #fdfbfb);

#main {
  background: $bg_color;
  width: max(1440px,100vw);
  ::selection {
    color:$fill_primary !important;
    background-color: $primary !important;
  }
 
  .nav {
    z-index: 10000000000;
    transition: transform .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .park {
    width: max(1440px,100vw);
    z-index: 99;
    height: 70px;
    top: 0;
    background: transparent;
  }
 
}

</style>
