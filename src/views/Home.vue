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
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
  init_s_animation_map();
  update_s_animation_map_style();

  window.addEventListener("scroll", scroll_handle);
});
const router = useRouter();
onBeforeMount(() => {});

onUnmounted(() => {
  window.removeEventListener("scroll", scroll_handle);
});
const scroll_handle = () => {
  update_s_animation_map_style();
};
const go_to_unknown_world_map = () => {
  router.push("/unknownWorldMap");
};
// const carousel_data = ref([
//   {link:''},
//   {link:''},
//   {link:''},
//   {link:'https://pic.imgdb.cn/item/65b0ff67871b83018adff204.jpg'},
//   // { link: "https://pic.imgdb.cn/item/659c09de871b83018ad377cb.png" },
//   // { link: "https://pic.imgdb.cn/item/65b0e41d871b83018a7822bf.webp" },
//   // { link: "https://pic.imgdb.cn/item/659c0a3a871b83018ad5736f.png" },
//   // { link: "https://pic.imgdb.cn/item/659bfd7e871b83018a917e4b.png" },
// ]);

const s_animation_map = new Map();
const init_s_animation_map = () => {
  const animation_item = document.querySelectorAll(".animation_item");
  const start =
    document.querySelector(".second_page").getBoundingClientRect().top +
    window.scrollY;
  const end =
    document.querySelector(".second_page").getBoundingClientRect().bottom +
    window.scrollY -
    window.innerHeight;
  for (const item of animation_item) {
    s_animation_map.set(item, get_s_dom_animation(start, end, item));
  }
};
const get_s_dom_animation = (start, end, dom) => {
  const opacity_animation = create_animation(start, end, 0, 1);
  const ul = document.querySelector(".s_animation_box ul");
  const { clientWidth, clientHeight, offsetTop, offsetLeft } = dom;
  const rect = ul.getBoundingClientRect();
  const opacity = (x) => {
    return opacity_animation(x);
  };
  start += dom.dataset.order * 500;
  const transform = (scroll_y) => {
    return `translate(${create_animation(
      start,
      end,
      rect.width / 2 - clientWidth / 2 - offsetLeft,
      0
    )(scroll_y)}px,${create_animation(
      start,
      end,
      rect.height / 2 - clientHeight / 2 - offsetTop,
      0
    )(scroll_y)}PX) scale(${create_animation(start, end, 0.2, 1)(scroll_y)})`;
  };
  return {
    opacity,
    transform,
  };
};
const update_s_animation_map_style = () => {
  const scroll_y = window.scrollY;
  const more = document.querySelector(".more");
  const first_page = document.querySelector(".first_page");
  const s_animation_box_bg_2 = document.querySelector(".s_animation_box_bg_2");
  const start =
    document.querySelector(".second_page").getBoundingClientRect().top +
    window.scrollY;
  const end =
    document.querySelector(".second_page").getBoundingClientRect().bottom +
    window.scrollY -
    window.innerHeight;
  first_page.style.opacity =
    first_page.getBoundingClientRect().bottom / first_page.clientHeight;
  s_animation_box_bg_2.style.webkitMaskPosition = `${create_animation(
    start,
    end,
    0,
    100
  )(scroll_y)}% ${create_animation(start, end, 100, 0)(scroll_y)}%`;

  if (scroll_y > 0) {
    more.style.opacity = 0;
  } else {
    more.style.opacity = 1;
  }
  for (const [dom, animations] of s_animation_map) {
    for (const prop in animations) {
      const v = animations[prop](scroll_y);
      dom.style[prop] = v;
    }
  }
};
//change scss var
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const create_animation = (start, end, s_v, e_v) => {
  return (x) => {
    if (x < start) {
      return s_v;
    }
    if (x > end) {
      return e_v;
    }
    return s_v + ((e_v - s_v) * (x - start)) / (end - start);
  };
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--home_bg_color", "#123");
    c_c("--first_page_cover_bg", "#1e243398");
    c_c("--home_color", "#f0f8ff");
    c_c("--u_w_m_btn_color", "#f0f8ff");
    c_c("--word_box_color", "#f0f8ff");
  } else {
    c_c("--home_bg_color", "#f7f3f5");
    c_c("--first_page_cover_bg", "transparent");
    c_c("--home_color", "#e60000");
    c_c("--u_w_m_btn_color", "#ff80bf");
    c_c("--word_box_color", "#003153");
  }
};
</script>
<template>
  <div id="home_main" class="">
    <div class="first_page relative">
      <div class="word_box absolute flex flex_direction_column">
        <span class="common">TINY</span>
        <span class="common">FLOWERS</span>
      </div>
      <div class="word_box_2 absolute">
        <span class="common">PRIVATE BLOG<br /></span>
      </div>
      <!-- <button class="u_w_m_btn absolute" @click="go_to_unknown_world_map">
        Unknown World Map
      </button> -->

      <img
        class="f_bg"
        src="https://pic.imgdb.cn/item/65b0f614871b83018ab94e81.png"
        alt=""
      />
      <svg
        t="1706081571224"
        class="icon absolute more"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="14155"
        width="52"
        height="52"
      >
        <path
          d="M500.408996 544.70045c3.684558 3.684558 8.674063 5.757121 13.893853 5.757121 5.21979 0 10.209295-2.072564 13.893853-5.757121L717.567616 355.406297c7.676162-7.676162 7.676162-20.111544 0-27.787706-7.676162-7.676162-20.111544-7.676162-27.787706 0L514.302849 503.018891 333.682759 322.398801c-7.676162-7.676162-20.111544-7.676162-27.787707 0-7.676162 7.676162-7.676162 20.111544 0 27.787706l194.513944 194.513943z m189.370914-59.874063L514.302849 660.303448 333.682759 479.606597c-7.676162-7.676162-20.111544-7.676162-27.787707 0-7.676162 7.676162-7.676162 20.111544 0 27.787706l194.513944 194.513943c3.684558 3.684558 8.674063 5.757121 13.893853 5.757121 5.21979 0 10.209295-2.072564 13.893853-5.757121l189.370914-189.370915c4.989505-4.989505 6.908546-12.205097 5.066267-18.96012-1.842279-6.755022-7.138831-12.051574-13.893853-13.893853-6.755022-1.765517-13.970615 0.153523-18.96012 5.143029z m0 0"
          fill="#cdcdcd"
          p-id="14156"
        ></path>
      </svg>
      <div class="first_page_cover absolute"></div>
    </div>
    <div class="second_page relative">
      <div class="s_animation_box">
       <div class="s_animation_box_bg_box absolute">
        <img
          src="https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg"
          class="s_animation_box_bg_1 absolute "
          alt=""
        />
        <div class="s_animation_box_bg_2 absolute "></div>
       </div>
        <span class="absolute">喜欢的作品</span>
        <ul class="flex flex_direction_row absolute ">
          <li data-order="0" class="animation_item relative">
            <img
              src="https://pic.imgdb.cn/item/65b15382871b83018a4d9b0b.webp"
              alt=""
            />
          </li>
          <li data-order="1" class="animation_item relative">
            <img
              src="https://pic.imgdb.cn/item/65b152e5871b83018a4c46be.webp"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="third_page relative">
      <div class="t_animation_box relative">
        <div class="t_circle absolute"></div>
        <div class="t_circle absolute"></div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$home_bg_color: var(--home_bg_color, #384f89);
$home_color: var(--home_color, #1a1814);
$first_page_cover_bg: var(--first_page_cover_bg, #1e243398);
$u_w_m_btn_color: var(--u_w_m_btn_color, #ff80bf);
$word_box_color: var(--word_box_color, #003153);
#home_main {
  width: 100vw;
  height: 100vh;
  // scroll-snap-type: y mandatory;
  background: $home_bg_color;
  .first_page {
    width: 100vw;
    height: 100vh;
    // scroll-snap-align: start;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    animation: first_page 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    // &::after{
    //   width: 100vw;
    //   height: 30vh;
    //   background: linear-gradient(to top,rgb(182, 183, 183),transparent);
    //   content: '';
    //   position: absolute;
    //   bottom: 0;
    // }
    .u_w_m_btn {
      font-family: inherit;
      width: 8em;
      height: 2.6em;
      z-index: 1000;
      line-height: 2.5em;
      background: transparent;
      margin: 20px;
      transform: translateY(65vh) translateX(2em);
      position: relative;
      border: 2px solid $u_w_m_btn_color;
      transition: color 0.5s;
      font-size: 17px;
      border-radius: 6px;
      font-weight: 500;
      color: $u_w_m_btn_color;
      &::before {
        content: "";
        position: absolute;
        z-index: -1;
        background: $u_w_m_btn_color;
        height: 150px;
        width: 200px;
        border-radius: 50%;
        top: 100%;
        left: 100%;
        transition: all 0.7s;
      }
      &:hover {
        color: #ffff;
        &::before {
          top: -30px;
          left: -30px;
        }
      }
      &:active {
        &::before {
          background: $u_w_m_btn_color;
          transition: background 0s;
        }
      }
    }
    .f_bg {
      position: absolute;
      right: 3em;
      width: 70vw;
      height: 80vh;
      top: 50%;
      border-radius: 0.3em;
      transform: translateY(-50%);
    }

    .word_box {
      left: 3em;
      top: 40%;
      z-index: 1;
      transform: translateY(-50%);

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
        font-size: 4.9em;
        font-weight: 900;
        line-height: 1em;
        color: $word_box_color;
        z-index: 100;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        // animation: word_1 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        // background: url(https://pic.imgdb.cn/item/65aae8fe871b83018ac8d369.png)
        // // background: url(https://pic.imgdb.cn/item/65b0d75c871b83018a4c3d9e.png)
        //   repeat #011f42;
        // background-size: 300px auto;
        // -webkit-text-fill-color: transparent;
        // text-fill-color: transparent;
        // -webkit-background-clip: text;
        // background-clip: text;
        // -webkit-animation: background 12s infinite linear;
        // animation: background 12s infinite linear;
      }
      // @keyframes word_1 {
      //   0% {
      //     line-height: 2em;
      //   }
      //   100% {
      //     line-height: 1em;
      //   }
      // }
    }
    .word_box_2 {
      left: 4em;
      top: 51%;
      color: $word_box_color;
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
        font-size: 1em;
        font-weight: 900;
        z-index: 100;
        // text-shadow: #e60000 -.1em .0em 2px;
        // filter: drop-shadow(0 0 10px #efb0b0);
        // text-shadow: $home_color 2px 2px 1px;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        // background: url(http://html5book.ru/wp-content/uploads/2016/08/bubbles.png)
        //   repeat #011f42;
        // background-size: 300px auto;
        // -webkit-text-fill-color: transparent;
        // text-fill-color: transparent;
        // -webkit-background-clip: text;
        // background-clip: text;
        // -webkit-animation: background 12s infinite linear;
        // animation: background 12s infinite linear;
      }
    }
    .first_page_cover {
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: 19;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      background: linear-gradient(
        to right,
        $first_page_cover_bg 1%,
        transparent 50%,
        $first_page_cover_bg 100%
      );
    }
  }

  .more {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: more 2s infinite linear both;
    z-index: 20;
    path {
      fill: #a7a7eb;
    }
  }
  @keyframes more {
    0% {
      transform: translateY(0);
    }
    90% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
    }
  }
  .second_page {
    width: 100vw;
    height: 400vh;
    
    background: $home_bg_color;

    // scroll-snap-align: start;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .s_animation_box {
      position: sticky;
      width: 100vw;
      height: 100vh;
      top: 0;
      color: #fff;

      background: $home_bg_color;
      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 100vw;
      //   height: 40vh;
      //   background: linear-gradient(to top, rgb(38, 41, 44), transparent);
      //   bottom: 0;
      // }
      .s_animation_box_bg_box{
        width: 100vw;
        height: 68vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -40%);
        background: $home_bg_color;
        overflow: hidden;

        &::after{
          content: '';
          position: absolute;
          background: none;
          width: 110%;
          background: $home_bg_color;
          height: 200px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 100%;
          bottom: -25%;
          box-shadow: inset 2px 3px 20px #123;
        }
        &::before{
          content: '';
          position: absolute;
          background: none;
          width: 110%;
          background: $home_bg_color;
          height: 200px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 100%;
          top: -25%;
          z-index: 1;
          
        }
      }

      .s_animation_box_bg_1 {
        width: 100vw;
        border-radius: 5px;
        opacity: 1;
        
      }
      .s_animation_box_bg_2 {
        width: 100vw;
        height: 68vh;
        opacity: 1;
        border-radius: 5px;
        
        background-size: cover;
        background-image: url(https://pic.imgdb.cn/item/65b21d96871b83018a08d73b.png);
        -webkit-mask-image: linear-gradient(
          to right,
          transparent 47.5%,
          #fff 52.5%
        );
        background-repeat: no-repeat;
        -webkit-mask-size: 210%;
        -webkit-mask-position: left;
      }
      ul {
        margin: 0;
        padding: 0;
        width: calc(51vw + 20px);
        height: 64vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
        gap: 20px;
        .animation_item {
          width: 25.5vw;
          height: 64vh;
          border-radius: 5px;
          overflow: hidden;
          &::after {
            position: absolute;
            left: -140%;
            content: "";
            top: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.5),
              rgba(255, 255, 255, 0)
            );
            transform: skew(-30deg);
          }
          &:hover {
            &::after {
              left: 140%;
              transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }
          img {
            width: inherit;
            object-fit: cover;
            height: inherit;
            border-radius: inherit;
            box-shadow: #003153 4px 5px 10px;
          }
        }
      }
      .show_text {
        font-size: 4em;
      }
      span {
        top: 4.5em;
        font-weight: 900;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2em;
        color: #003153;
      }
    }
  }
  .third_page {
    width: 100vw;
    height: 300vh;
    background: $home_bg_color;
     .t_animation_box {
      width: 100vw;
      height: 100vh;
      top: 0;
      position: sticky;
      background: #dfeef9;
      overflow: hidden;
      .t_circle{
        width: 25vw;
        height: 25vw;
        border-radius: 50%;
        background: #ff5232;
        filter: blur(110px);
        top: 50%;
        transform: translateY(-50%);
        &:first-child{
          left: 4em;
        }
        &:last-child{
          right: 4em;
          background: #00aaff;

        }
      }
     
    }
    // scroll-snap-align: start;
  }
}
// @keyframes to_right {
//   0% {
//     left: 0;
//   }
//   100% {
//     left: 100px;
//   }
// }
// @keyframes to_left {
//   0% {
//     right: -3%;
//   }
//   100% {
//     right: 3%;
//   }
// }
// -webkit-keyframes background {
//   from {
//     background-position: 0 0%;
//   }
//   to {
//     background-position: 0 -300px;
//   }
// }
// @keyframes background {
//   from {
//     background-position: 0 0%;
//   }
//   to {
//     background-position: 0 -300px;
//   }
// }
@keyframes first_page {
  0% {
    transform: rotateZ(20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
</style>
