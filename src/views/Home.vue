<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  ref,
  toRefs,
  onBeforeMount,
  onUnmounted,
  onMounted,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  let carousel_img = document.querySelector(".carousel_img");

  carousel_img.style.transform = "scale(1." + flash_img + ")";
  flash_img++;
});
onUnmounted(() => {
  clearInterval(cycle_carousel);
});
const welcome_message = "私人博客";
// const data = {
//   date: "1月6号?2024?7:06",
//   link: "/unknownWorldMap/topic/1",
//   img: "weatheringwithyou",
//   title: "Weathering With you(经典语录)",
//   short_message: "「彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了"
// };
const go_to_unknown_world_map = ()=>{
  router.push('/unknownWorldMap')
}
const carousel_data = ref([
  // {link:''},
  { link: "https://pic.imgdb.cn/item/659c09de871b83018ad377cb.png" },
  { link: "https://pic.imgdb.cn/item/659bfbbb871b83018a8863a4.png" },
  { link: "https://pic.imgdb.cn/item/659c0a3a871b83018ad5736f.png" },
  { link: "https://pic.imgdb.cn/item/659bfd7e871b83018a917e4b.png" },
]);
const current_img = ref(0);
const cycle_carousel = setInterval(() => {
  let carousel_img = document.querySelector(".carousel_img");

  if (flash_img === 4) {
    carousel_img.style.transform = "scale(1." + flash_img + ")";
    carousel_img.style.opacity = "0";
  } else if (flash_img === 5) {
    flash_img = 0;
    carousel_img.style.transform = "scale(1)";
    carousel_img.style.opacity = "0";
    carousel_img.style.transition = "all 0s linear";
    current_img.value = current_img.value === 3 ? 0 : (current_img.value += 1);

    setTimeout(() => {
      carousel_img.style.opacity = "1";
      carousel_img.style.transition = "all 2s linear";
      carousel_img.style.transform = "scale(1.05)";
    }, 500);
  } else {
    carousel_img.style.transform = "scale(1." + flash_img + ")";
  }
  flash_img++;
}, 2000);
let flash_img = 0;
</script>
<template>
  <div id="main" class="flex flex_direction_column">
    <div class="first_page relative">
      <div class="word_box absolute flex flex_direction_column">
        <span class="common first_word">TINY</span>
        <span class="common second_word">FLOWERS</span>
      </div>
      <button class="cta absolute" @click="go_to_unknown_world_map">
        <span class="hover_underline_animation">Unknown World Map</span>
        <svg
          id="arrow-horizontal"
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="20"
          viewBox="0 0 46 16"
        >
          <path
            id="Path_10"
            data-name="Path 10"
            d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
            transform="translate(30)"
            fill="#41A8a8"
          ></path>
        </svg>
      </button>
      <img class="carousel_img" :src="carousel_data[current_img].link" alt="" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100vw;
  background: #f7f3f5;
  .first_page {
    width: 100vw;
    height: 100vh;

    .cta {
      border: none;
      background: none;
      left: 1000px;
      top: 85%;
      z-index: 1000;
      span {
        padding-bottom: 7px;
        letter-spacing: 4px;
        font-size: 18px;
        font-weight: 800;
        padding-right: 15px;
        text-transform: uppercase;
      }
      svg {
        transform: translateX(-8px);
        transition: all 0.3s ease;
      }
      &:hover {
        svg {
          transform: translateX(0);
        }
      }
      &:active {
        svg {
          transform: scale(0.9);
        }
      }
    }

    .hover_underline_animation {
      position: relative;
      color: #41A8a8;
      padding-bottom: 20px;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: #41A8a8;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }
    }

    .cta:hover .hover_underline_animation:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    .word_box {
      left: 300px;
      top: 130px;
      &::after {
        content: "";
        position: absolute;
        width: 900px;
        height: 300px;
        background: #7bc5e33c;
        left: -100px;
        top: 50%;
        transform: translateY(-50%);
      }
      z-index: 100;
      .common {
        font-size: 140px;
        font-weight: 900;
        color: #2b4f7d;
        text-shadow: #3b77b0 10px 0 1px, #7bc5e3 -20px 0 1px;
        z-index: 100;
      }
      .first_word {
      }
      .second_word {
      }
    }
    overflow: hidden;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
      transition: all 2s linear;
    }
  }
}
</style>
