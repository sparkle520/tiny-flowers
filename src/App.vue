<script setup>
import { ref,watch } from "vue";
import { clickEffect } from "/src/assets/js/mouse.js";
import { useRoute } from "vue-router";
const route = useRoute()
const transition = ['fade', 'fade']
// watch(
//   () => router.currentRoute.value.path,
//   () => {
    
//     console.log(router.currentRoute.value.meta.index);
//     console.log(router.back);
//     if (true) {
//           transitionName.value = transition[0] 
//         } else {
//           transitionName.value = transition[1]
//         }
//   },{immediate: true,deep: true}
// );
watch(()=>route.path,(to,from)=>{
 
  text.value = false
  setTimeout(()=>{
    text.value = true
  },100)
})
// router.beforeEach((to, from, next) => {
//     if (to.meta.index > from.meta.index) {
//       transitionName.value = transition[0]
//     } else {
//       transitionName.value = transition[1]

//     }
// })
clickEffect();
const text = ref(true)
</script>

<template>
  <div id="main" class="f f_d_c">
    <!-- <keep-alive>
    <div  :class="['fixed','animation_router',text?'animation':'']"></div>
  </keep-alive> -->
    <TopNavBar  class="nav"></TopNavBar>
    <router-view class="router_view"  :key="$route.fullPath"  v-slot="{ Component }">
      <transition name="fade" mode="out-in">
          <component v-if="text" :is="Component"  />
        </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-to {
}
.fade-enter-to {
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-leave-active,.fade-enter-active {
  transition: all 0.5s ease-out;
}


#main {
  background: $fill_body;
  width: max(1440px,100vw);
  ::selection {
    color:$fill_primary !important;
    background-color: $primary !important;
  }
  
 
  .nav {
    z-index: 100000000;
    transition: transform .5s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .animation{
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) wipe-out-down both;
  }
  
 
}
@media (max-width: 600px) {
    #main{
      width: 100vw;
    }
  }
</style>
