<!-- @Author: LT -->
<!-- @Date: 2024-01-13 17:19:53 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs,ref, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
const show_to_top_btn = ref(false);

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
          t="1704637028569"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11841"
          width="32"
          height="32"
        >
          <path
            d="M806.771214 961.506103l-62.493897 62.493897-232.177327-232.177326-232.177326 232.177326-62.493897-62.493897 294.671223-294.671224 294.671224 294.671224z"
            fill="#8FB3FF"
            p-id="11842"
          ></path>
          <path
            d="M806.771214 294.771214l-62.493897 62.493897-232.177327-232.177327-232.177326 232.177327-62.493897-62.493897L512.09999 0.09999l294.671224 294.671224z"
            fill="#043EB8"
            p-id="11843"
          ></path>
          <path
            d="M806.771214 628.138658l-62.493897 62.493897-232.177327-232.177326-232.177326 232.177326-62.493897-62.493897 294.671223-294.671223 294.671224 294.671223z"
            fill="#2868F0"
            p-id="11844"
          ></path>
        </svg>
      </div>
    </div>
</template>
<style lang="scss" scoped>
#main {
    width: 100%;
    .to_top_btn {
  position: fixed;
  right: 40px;
  bottom: 60px;
  width: 4%;
  height: 10%;
  background: #edf3f2;
  border-radius: 5px;

  z-index: 100;
  animation: show 2s cubic-bezier(0.075, 0.82, 0.165, 1);

  @keyframes show {
    0% {
      bottom: -60px;
      opacity: 0;
    }

    100% {
      opacity: 1;
      bottom: 60px;
    }
  }

  &:hover {
    background-color: #7e96ec;
  }
}
}
</style>