<!-- @Author: LT -->
<!-- @Date: 2024-01-17 19:35:50 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import c_c from "@/assets/js/utils.js";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
const router = useRouter();
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
});

const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--bg_color", "#0d1c2b");
    c_c("--color", "#f7f7f7");
    c_c("--site_content_color", "#8d8d93");
    c_c("--site_item_color", "#f19742");
  } else {
    c_c("--bg_color", "#fdfbfb");
    c_c("--color", "#000000");
    c_c("--site_content_color", "#c5b4e5");
    c_c("--site_item_color", "#4d1225");
    c_c("--site_item_hover_color", "#917979");
  }
};
const go_to = (url) => {
  window.open(url);
};
const site_data = [
  {
    collect_name: "Reference",
    site_list: [
      {
        name: "Rust",
        url: "https://doc.rust-lang.org/stable/reference/notation.html",
        img: "",
      },
      {
        name: "Rust std",
        url: "https://doc.rust-lang.org/std/all.html",
        img: "",
      },
      { name: "C++", url: "https://en.cppreference.com/w/", img: "" },
    ],
  },
  {
    collect_name: "Study",
    site_list: [
      {
        name: "Rust 语言圣经",
        url: "https://course.rs/about-book.html",
        img: "",
      },
      { name: "Learn C++", url: "https://www.learncpp.com/", img: "" },
    ],
  },
  {
    collect_name: "Repository",
    site_list: [
      { name: "create.io", url: "https://crates.io/", img: "" },
      { name: "maven", url: "https://mvnrepository.com/", img: "" },
    ],
  },
  {
    collect_name: "Practice",
    site_list: [
      { name: "leet code", url: "https://leetcode.cn/leetbook/", img: "" },
    ],
  },
];
</script>
<template>
  <div id="site_nav_main" class="flex">
    <!-- <div id="sky" class="absolute absolute_center">
    <div class="bird">
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="bird_body">
            <div class="bird_head"></div>
            <div class="bird_wing_left">
                <div class="bird_wing_left_top"></div>
            </div>
            <div class="bird_wing_right">
                <div class="bird_wing_right_top"></div>
            </div>
            <div class="bird_tail_left"></div>
            <div class="bird_tail_right"></div>
        </div>
    </div>
</div> -->
    <!-- <img src="https://pic.imgdb.cn/item/65b0127d871b83018a75ffc4.png" class="miku  fixed absolute_center" alt=""> -->
    <!-- <img src="https://pic.imgdb.cn/item/65afa1e5871b83018ae90cd9.png" class="flower  fixed absolute_center" alt=""> -->
    <div class="site_content flex flex_direction_column">
      <div class="site_item" v-for="item in site_data">
        <h1>{{ item.collect_name }}</h1>
        <ul class="flex flex_direction_row">
          <li v-for="item2 in item.site_list" @click="go_to(item2.url)">
            <span class="relative">
              {{ item2.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #000000);
$site_content_color: var(--site_content_color, #8d8d93);
$site_item_color: var(--site_item_color, #4d1225);
$site_item_hover_color: var(--site_item_hover_color, #917979);
#site_nav_main {
  width: 100%;
  min-height: 100vh;
  background: $bg_color;
  overflow: hidden;
  color: $color;
  &::after {
    width: 100vw;
    height: 100vh;
    content: "";
    left: 0;
    top: 0;
    position: fixed;
    z-index: 0;
    opacity: 0.3;
    background: url("https://pic.imgdb.cn/item/65d765569f345e8d03dac4f9.png")
      repeat;

    background-size: 725px 707px;
  }
  // -webkit-mask-image: url("/src/assets/imgs/svg/flower.svg");
  // -webkit-mask-size: 10%;
  // -webkit-mask-position: center;
  // -webkit-mask-repeat: no-repeat;
  // animation: scene-transition 4s linear forwards;

  // @keyframes scene-transition {
  //   100% {
  //     -webkit-mask-size: 2000%;
  //   }
  // }
  .miku {
    opacity: 0.4;
    z-index: 1;
    width: 600px;
    // filter:drop-shadow(10px 10px 4px rgb(52, 50, 50));
    animation: miku 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  .flower {
    width: 1300px;
    opacity: 0.4;
    z-index: 0;
    left: 54%;
    top: 55%;
    // filter:drop-shadow(10px 10px 4px rgb(52, 50, 50));
    animation: flower 4s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  @keyframes miku {
    0% {
      transform: translate(-50%, -50%) scale(2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  @keyframes flower {
    0% {
      transform: translate(-50%, -50%) scale(0.4);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  .site_content {
    z-index: 2;
    width: 80vw;
    min-height: 40vh;
    overflow: hidden;
    margin: 0px auto;
    color: $site_content_color;
    .site_item {
      &:last-child {
        margin-bottom: 200px;
      }
      margin-left: 20px;
      ul {
        margin: 0;
        padding: 0;

        li {
          width: 30%;
          font-size: 16px;
          color: $site_item_color;
          font-weight: 700;
          span {
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 2px;
              background: $site_item_color;
              left: 0;
            }
            &:hover {
              color: $site_item_hover_color;
              &::after {
                background: $site_item_hover_color;
              }
            }
          }
        }
      }
      &:first-child {
        margin-top: 100px;
      }
    }
  }
}
</style>
