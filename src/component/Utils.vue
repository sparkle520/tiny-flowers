<!-- @Author: LT -->
<!-- @Date: 2024-01-13 17:19:53 -->
<!-- @Description: 右小角的工具 -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  watch,
  onBeforeMount,
  onUnmounted,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const {theme}  = storeToRefs(store);
const {layout}  = storeToRefs(store);
store.$subscribe((mutation,state)=>{
  change_theme(state.theme)
})

const router = useRouter();
onBeforeMount(() => {});
import "/src/assets/css/utils.scss";
onMounted(() => {
  change_theme(theme.value);

  window.scrollTo(0, 0);
  document.addEventListener("scroll", scroll_handle);
});
onUnmounted(() => {
  document.removeEventListener("scroll", scroll_handle);

});
const scroll_handle = ()=>{

    let wScrY = window.scrollY;
    if (wScrY > 700) {
      const to_top_box = document.querySelector(".to_top_box");
      to_top_box.style.transform = "translateX(0)";
    } else {
      const to_top_box = document.querySelector(".to_top_box");
      to_top_box.style.transform = "translateX(100px)";
    }
  }

const to_top = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

};
const view_change = () => {
  store.change_g_layout();
};


const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    //night
    c_c("--to_top_btn_fill", "#94709b");
    c_c("--to_top_btn_bg", "#2d3041");
    c_c("--to_top_btn_hover_bg", "#9fa3bc");
  } else {
    c_c("--to_top_btn_fill", "#c0c0c0");
    c_c("--to_top_btn_bg", "#ffffff");
    c_c("--to_top_btn_hover_bg", "#e2e2e2");
  }
};
</script>
<template>
  <div class="fixed utils_box flex flex_direction_column">
    <div
      @click="view_change"
      class="to_top_btn flex flex_direction_column align_items_center justify_content_center"
    >
      <div class="">
        <svg
          t="1705472090600"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="35605"
          width="16"
          height="16"
        >
          <path
            d="M586.159273 127.429895m18.243364 0l255.40709 0q18.243364 0 18.243364 18.243364l0 741.592731q0 18.243364-18.243364 18.243363l-255.40709 0q-18.243364 0-18.243364-18.243363l0-741.592731q0-18.243364 18.243364-18.243364Z"
            fill="#747474"
            p-id="35606"
          ></path>
          <path
            d="M859.809727 923.6615h-255.40709a36.486727 36.486727 0 0 1-36.486728-36.486727V145.946909a36.486727 36.486727 0 0 1 36.486728-36.486727h255.40709a36.486727 36.486727 0 0 1 36.486728 36.486727v741.227864a36.486727 36.486727 0 0 1-36.486728 36.486727z m0-36.486727zM604.493854 145.946909v741.227864h255.40709V145.946909z"
            fill="#5E5E5E"
            p-id="35607"
          ></path>
          <path
            d="M859.809727 923.6615H118.581864a36.486727 36.486727 0 0 1-36.486728-36.486727V145.946909a36.486727 36.486727 0 0 1 36.486728-36.486727h741.227863a36.486727 36.486727 0 0 1 36.486728 36.486727v741.227864a36.486727 36.486727 0 0 1-36.486728 36.486727z m0-36.486727zM118.581864 145.946909v741.227864h741.136647V145.946909z"
            fill="#5E5E5E"
            p-id="35608"
          ></path>
        </svg>
      </div>
    </div>
    <div
      @click="to_top"
      class="to_top_btn to_top_box flex flex_direction_column align_items_center justify_content_center"
    >
      <div class="top">
        <svg
          t="1705419843821"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5575"
          width="16"
          height="16"
        >
          <path
            class="to_top_path"
            d="M128.8 864.76h766.4c80.38 0 125.62-92.44 76.3-156L573.38 196.58a96.62 96.62 0 0 0-154.74 2.88L50.34 711.72C4.38 775.64 50 864.76 128.8 864.76z"
            p-id="5576"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.utils_box {
  right: 40px;
  bottom: 60px;
  gap: 10px;
  z-index:100;

}
.to_top_box {
  transform: translateX(100px);
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
}
</style>
