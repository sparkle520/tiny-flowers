<!-- @Author: LT -->
<!-- @Date: 2024-01-13 17:19:53 -->
<!-- @Description: 右小角的工具 -->

<script setup>
import {

  onUnmounted,
  onMounted,
} from "vue";
import { useConfigStore } from "../store/config";
const store = useConfigStore();


onMounted(() => {
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


</script>
<template>
  <div class="fixed utils_box f f_d_c">
    <div
      @click="view_change"
      class="to_top_btn f f_d_c a_c j_c_c full"
    >
      <div >
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
          class="utils_path_1"
            d="M586.159273 127.429895m18.243364 0l255.40709 0q18.243364 0 18.243364 18.243364l0 741.592731q0 18.243364-18.243364 18.243363l-255.40709 0q-18.243364 0-18.243364-18.243363l0-741.592731q0-18.243364 18.243364-18.243364Z"
            fill="#747474"
            p-id="35606"
          ></path>
          <path
          class="utils_path_2"
            d="M859.809727 923.6615h-255.40709a36.486727 36.486727 0 0 1-36.486728-36.486727V145.946909a36.486727 36.486727 0 0 1 36.486728-36.486727h255.40709a36.486727 36.486727 0 0 1 36.486728 36.486727v741.227864a36.486727 36.486727 0 0 1-36.486728 36.486727z m0-36.486727zM604.493854 145.946909v741.227864h255.40709V145.946909z"
            fill="#5E5E5E"
            p-id="35607"
          ></path>
          <path
          class="utils_path_2"
            d="M859.809727 923.6615H118.581864a36.486727 36.486727 0 0 1-36.486728-36.486727V145.946909a36.486727 36.486727 0 0 1 36.486728-36.486727h741.227863a36.486727 36.486727 0 0 1 36.486728 36.486727v741.227864a36.486727 36.486727 0 0 1-36.486728 36.486727z m0-36.486727zM118.581864 145.946909v741.227864h741.136647V145.946909z"
            fill="#5E5E5E"
            p-id="35608"
          ></path>
        </svg>
      </div>
    </div>
    <div
      @click="to_top"
      class="to_top_btn to_top_box f f_d_c a_c j_c_c"
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
.utils_path_1{
  fill: $primary;
}
.utils_path_2{
  fill: $primary_mix_5;
}
}
.to_top_box {
  transform: translateX(100px);
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  .to_top_path{
    fill: $primary;
  }
}

.to_top_btn {
   
   width: 35px;
   height: 35px;
   background: $fill;
   border-radius: 5px;
   transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

   z-index: 100;
  
   

   &:hover {
     background-color: $primary_mix_9;
   }
 }
 @media (max-width: 600px) {
  .utils_box{
    display: none;
    width: 0;
    overflow: hidden;
  }
 }
</style>
