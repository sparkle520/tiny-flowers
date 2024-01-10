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
const go_to_unknown_world_map = () => {
  router.push("/unknownWorldMap");
};
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
</script>
<template>
  <div id="main" class="flex flex_direction_column">
    <div class="first_page relative">
      <div class="word_box absolute flex flex_direction_column">
        <span class="common">TINY</span>
        <span class="common">FLOWERS</span>
      </div>
      <div class="word_box_2 absolute">
        <span class="common">PRIVATE BLOG</span>
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
      right: 4%;
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
      color: #41a8a8;
      padding-bottom: 20px;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: #41a8a8;
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
      z-index: 100;
      animation: to_right 5s cubic-bezier(0.075, 0.82, 0.165, 1);

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
      .common {
        font-size: 140px;
        font-weight: 900;
        color: #2b4f7d;
        text-shadow: #3b77b0 10px 0 1px, #7bc5e3 -20px 0 1px;
        z-index: 100;
      }
    }
    .word_box_2 {
      right: 3%;
      top: 60%;
      z-index: 100;
      animation: to_left 5s cubic-bezier(0.075, 0.82, 0.165, 1);

      &::after {
        content: "";
        position: absolute;
        width: 420px;
        height: 60px;
        background: #7bc5e33c;
        left: -5%;
        top: 50%;
        transform: translateY(-50%);
      }
      .common {
        font-size: 40px;
        font-weight: 900;
        color: #2b4f7d;
        text-shadow: #3b77b0 3px 0 1px, #7bc5e3 -7px 0 1px;
        z-index: 100;
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
@keyframes to_right {
  0% {
    left: 0;
  }
  100% {
    left: 300px;
  }
}
@keyframes to_left {
  0% {
    right: -3%;
  }
  100% {
    right: 3%;
  }
}
</style>
