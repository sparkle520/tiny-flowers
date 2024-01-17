<!-- @Author: LT -->
<!-- @Date: 2024-01-17 02:58:02 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref,onBeforeMount, onUnmounted,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onMounted(() => {
  init();
});
onUnmounted(() => {
  clearInterval(cycle_carousel);
});
const init = () => {
  let carousel_img = document.querySelector(".carousel_img");

  carousel_img.style.transform = "scale(1." + flash_img + ")";
  flash_img++;
};
const current_img = ref(0);
const cycle_carousel = setInterval(() => {
  let carousel_img = document.querySelector(".carousel_img");

  if (flash_img === 4) {
    carousel_img.style.transform = "scale(1." + flash_img + ")";
    carousel_img.style.opacity = "0";
  } else if (flash_img === 5) {
    flash_img = 0;
    carousel_img.style.transform = "scale(1)";
    carousel_img.style.transition = "all 0s linear";

    carousel_img.style.opacity = "0";
    current_img.value = current_img.value === 3 ? 0 : (current_img.value += 1);
    setTimeout(() => {
      carousel_img.style.opacity = "1";
      carousel_img.style.transition = "all 2s linear";
      carousel_img.style.transform = "scale(1.05)";
    }, 1000);
  } else {
    carousel_img.style.transform = "scale(1." + flash_img + ")";
  }
  flash_img++;
}, 2000);
let flash_img = 0;
const props = defineProps({
  carousel_data: Array,
})
</script>
<template>
    <div id="main">
        <img class="carousel_img" :src="carousel_data[current_img].link" alt="" />
    </div>
</template>
<style lang="scss" scoped>
#main {
    width: 100vw;
    height: 100vh;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      transition: all 2s linear;
    }
}
</style>