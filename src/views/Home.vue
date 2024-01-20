<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import {
  ref,
  onBeforeMount,
  onUnmounted,
  onMounted,
  nextTick,
  watch
} from "vue";
import { useRouter } from "vue-router";
import FullCarousel from "../component/FullCarousel.vue";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const {theme}  = storeToRefs(store);
store.$subscribe((mutation,state)=>{
  change_theme(state.theme)
})
onBeforeMount(() => {});
onMounted(() => {
    change_theme(theme.value)
});
const router = useRouter();
onBeforeMount(() => {});

onUnmounted(() => {});

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



//change scss var 
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--home_bg_color", "#123");
    c_c("--first_page_cover_bg", "#1e243398");
    c_c("--home_color", "#13626d");

  } else {
    c_c("--home_bg_color", "#f7f3f5");
    c_c("--first_page_cover_bg", "transparent");
    c_c("--home_color", "#cd0056");
  
  }
}


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
          ></path>
        </svg>
      </button>
      <FullCarousel :carousel_data="carousel_data"></FullCarousel>
      <div class="first_page_cover absolute"></div>
    </div>
    <div class="second_page relative">

    </div>
  </div>
</template>
<style lang="scss" scoped>
$home_bg_color: var(--home_bg_color, #211e2b);
$home_color: var(--home_color, #1a1814);
$first_page_cover_bg: var(--first_page_cover_bg, #1e243398);
#main {
  width: 100vw;
  background: $home_bg_color;
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
        path{
          fill: $home_color;
        }
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
      color: $home_color;
      padding-bottom: 20px;
      
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 3px;
        bottom: 0;
        left: 0;
        background-color: $home_color;
        transform-origin: bottom right;
        transition: transform 0.25s ease-out;
      }
    }

    .cta:hover .hover_underline_animation:after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
    .word_box {
      left: 100px;
      top: 130px;
      z-index: 1;
      animation: to_right 5s cubic-bezier(0.075, 0.82, 0.165, 1);

      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 900px;
      //   height: 300px;
      //   background: #7bc5e33c;
      //   left: -100px;
      //   top: 50%;
      //   transform: translateY(-50%);
      // }
      .common {
        font-size: 140px;
        font-weight: 900;
        text-shadow: $home_color 0px 4px 2px;
        z-index: 100;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        background: url(https://pic.imgdb.cn/item/65aae8fe871b83018ac8d369.png) repeat #011F42;
    background-size: 300px auto;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-animation: background 12s infinite linear;
    animation: background 12s infinite linear;
      }
    }
    .word_box_2 {
      right: 3%;
      top: 60%;
      z-index: 1;
      animation: to_left 5s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 420px;
      //   height: 60px;
      //   background: #7bc5e33c;
      //   left: -5%;
      //   top: 50%;
      //   transform: translateY(-50%);
      // }
      .common {
        font-size: 40px;
        font-weight: 900;
        z-index: 100;
        text-shadow: $home_color 2px 2px 2px;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        background: url(http://html5book.ru/wp-content/uploads/2016/08/bubbles.png) repeat #011F42;
    background-size: 300px auto;
    -webkit-text-fill-color: transparent;
    text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-animation: background 12s infinite linear;
    animation: background 12s infinite linear;

      }
    }
    overflow: hidden;
    .first_page_cover{
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: 199;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      background: linear-gradient(to right, $first_page_cover_bg 1%,transparent 50%, $first_page_cover_bg 100%);
    }
  }
}
@keyframes to_right {
  0% {
    left: 0;
  }
  100% {
    left: 100px;
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
-webkit-keyframes background {
    from {
        background-position: 0 0%;
    }
    to {
        background-position: 0 -300px;
    }
}
@keyframes background {
    from {
        background-position: 0 0%;
    }
    to {
        background-position: 0 -300px;
    }
}
</style>
