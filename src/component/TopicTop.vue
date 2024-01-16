<!-- @Author: LT -->
<!-- @Date: 2024-01-13 17:19:53 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
const show_to_top_btn = ref(false);
import "/src/assets/css/to_top.scss"
onMounted(() => {
  window.scrollTo(0, 0);
  document.addEventListener("scroll", () => {
    let wScrY = window.scrollY;

    if (wScrY > 700) {
      show_to_top_btn.value = true;
    } else {
      show_to_top_btn.value = false;
    }
  });
});
const to_top = () => {
  let t = setInterval(() => {
    let wScrY = window.scrollY - 50;
    window.scrollTo(0, wScrY);
    if (wScrY <= 0) {
      clearInterval(t);
    }
  }, 2);
};
</script>
<template>
  <div
    @click="to_top"
    class="to_top_btn flex flex_direction_column align_items_center justify_content_center"
    v-if="show_to_top_btn"
  >
    <div class="top">
      <svg
        t="1705419843821"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5575"
        width="32"
        height="32"
      >
        <path
        class="to_top_path"
          d="M128.8 864.76h766.4c80.38 0 125.62-92.44 76.3-156L573.38 196.58a96.62 96.62 0 0 0-154.74 2.88L50.34 711.72C4.38 775.64 50 864.76 128.8 864.76z"
          p-id="5576"
        ></path>
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>



</style>
