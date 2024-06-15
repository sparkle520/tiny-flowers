<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:55:59 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  ref,
  toRefs,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import change_theme from "../assets/theme/TopNavBar";
import c_c from "@/assets/js/utils.js"
const router = useRouter();
import { useConfigStore } from "../store/config";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const user_store = useUserStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
  document.addEventListener("scroll", nav_handle);
  document.addEventListener("click", click_handle);
});
onUnmounted(() => {
  document.removeEventListener("click", click_handle);
});
const click_handle = (e) => {
  let music_player_main = document.querySelector("#music_player_main");
  let music = document.querySelector("#top_nav_main .music");
  if (!music_player_main.contains(e.target) && !music.contains(e.target)) {
    music_active.value = false;
  }
};
const nav_handle = () => {
  let wScrY = window.scrollY;
  const top_nav_main = document.querySelector("#top_nav_main");
  // const music_img = document.querySelector(".music img");
  // music_img.style.transform = `rotate(${wScrY%360}deg)`;
  if(wScrY < 70){
    c_c("--nav_bg_color", "transparent")
    top_nav_main.style.transform = `translateY(-100%)`;
    setTimeout(()=>{
      top_nav_main.style.transform = `translateY(0%)`;
    },500)
  }else{
    change_theme(theme.value);
  }
};
const emits = defineEmits(["music_change"]);

const nav_list = [
  {
    index: 0,
    name: "首页",
    e_name: "home",
    path: "/home",
  },
  {
    index: 1,
    name: "笔记",
    e_name: "note",
    path: "/note/1",
  },
  {
    index: 2,
    name: "数学",
    e_name: "math",
    path: "/math/1",
  },
  {
    index: 3,
    name: "文章",
    e_name: "article",
    path: "/article/list/all/1",
  },
  {
    index: 4,
    name: "关于",
    e_name: "about",
    path: "/about",
  },
  {
    index: 5,
    name: "网站导航",
    e_name: "siteNav",
    path: "/siteNav",
  },
  {
    index: 6,
    name: "更新日志",
    e_name: "updateLog",
    path: "/updateLog",
  },
];
const active_item = ref();
const pre_active_item = ref(-1);
const switch_nav_item = (index) => {
  const nav_list_item = document.querySelectorAll(".nav_item_com");
  nav_list_item[index].classList.add("nav_item_active");
  if (nav_list_item[index].classList.contains("nav_item")) {
    nav_list_item[index].classList.remove("nav_item");
  }
  pre_active_item.value = index;
};
const switch_nav_active = () => {
  const nav_list_item = document.querySelectorAll(".nav_item_com");
  if (pre_active_item.value != -1) {
    nav_list_item[pre_active_item.value].classList.remove("nav_item_active");
    nav_list_item[pre_active_item.value].classList.add("nav_item");
  }
  nextTick(() => {
    for (const item of nav_list) {
      if (active_item.value == item.e_name) {
        switch_nav_item(item.index);
        break;
      }
    }
  });
};
watch(
  () => router.currentRoute.value.path,
  (to) => {
    active_item.value =
      to.split("/")[1] != null && to.split("/")[1] != undefined
        ? to.split("/")[1]
        : "home";
    switch_nav_active();
  },
  { immediate: true, deep: true }
);
const link_to = (path) => {
  router.push(path);
};
const go_github = () => {
  window.location.href = "https://github.com/sparkle520";
};
const active_music = () => {
  music_active.value = !music_active.value;
};
const music_active = ref(false);
watch(music_active, (newV, oldV) => {
  emits("music_change", newV);
});
const current_theme = ref(false);
const theme_change = () => {
  store.theme = !current_theme.value;
};
</script>
<template>
  <div id="top_nav_main" class="nav_main">
    <div class="content flex flex_direction_row relative">
    <div class="absolute stave flex flex_direction_column">
      <div v-for="item in 5" :key="item" class="stave_line"></div>
    </div>
      <div
        class="absolute nav_box flex flex_direction_row justify_content_space_between"
      >
        <div class="flex flex_direction_row justify_content_space_around">
          <div class="logo flex align_items_center justify_content_center"
          @click="link_to(nav_list[0].path)"
          >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 200 200" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><path fill="url(&quot;#SvgjsLinearGradient1232&quot;)" fill-rule="evenodd" d="M99.994 183.711C106.781 191.856 113.567 200 127.14 200c31.244 0 40.269-41.556 40.281-72.844 0-13.572 8.144-20.358 16.289-27.144C191.855 93.225 200 86.439 200 72.868c0-31.254-41.616-40.29-72.849-40.29-13.572 0-20.359-8.145-27.145-16.29C93.219 8.145 86.433 0 72.86 0 41.605 0 32.568 41.614 32.568 72.844c0 13.573-8.142 20.359-16.284 27.145C8.142 106.775 0 113.56 0 127.132c0 31.253 41.605 40.29 72.849 40.29 13.572 0 20.359 8.144 27.145 16.288ZM100 137c20.435 0 37-16.565 37-37 0-20.434-16.565-37-37-37-20.434 0-37 16.566-37 37 0 20.435 16.566 37 37 37Z" clip-rule="evenodd"></path><defs><linearGradient gradientTransform="rotate(0 0.5 0.5)" id="SvgjsLinearGradient1232"><stop stop-opacity=" 1" stop-color="rgba(105, 234, 203)" offset="0"></stop><stop stop-opacity=" 1" stop-color="rgba(234, 204, 248)" offset="0.48"></stop><stop stop-opacity=" 1" stop-color="rgba(249, 249, 249)" offset="1"></stop></linearGradient></defs></svg>
            <span> Tiny Flowers </span>
          </div>

          <ul class="nav_list flex flex_direction_row">
            <li
              :key="item"
              class="nav_item nav_item_com flex flex_direction_row align_items_center"
              v-for="item in nav_list.slice(0, 4)"
              @click="link_to(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="flex flex_direction_row">
          <ul class="nav_list flex flex_direction_row">
            <li
              :key="item"
              class="nav_item nav_item_com flex flex_direction_row align_items_center"
              v-for="item in nav_list.slice(4)"
              @click="link_to(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
          <label class="switch" for="theme">
            <input
              id="theme"
              type="checkbox"
              @click="theme_change"
              v-model="current_theme"
            />
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="music absolute" @click="active_music">
        <img :src="user_store.avatar" alt="" />
        <!-- <svg
          v-if="!music_active"
          t="1704963079198"
          class="svg_1"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="13968"
          width="48"
          height="48"
        >
          <path
            d="M1023.969343 511.946281A511.77753 511.77753 0 1 1 626.119623 12.873428a503.76806 503.76806 0 0 1 82.856588 26.376014 512.329907 512.329907 0 0 1 314.993132 472.696839z"
            fill="#123"
            p-id="13969"
          ></path>
          <path
            d="M708.976211 39.249442v472.696839h-82.856588V12.873428a503.76806 503.76806 0 0 1 82.856588 26.376014z"
            fill="#ffff"
            p-id="13970"
          ></path>
          <path
            d="M511.915624 709.006868a197.060587 197.060587 0 1 1 197.060587-197.060587 197.198681 197.198681 0 0 1-197.060587 197.060587z m0-311.264585a114.203998 114.203998 0 1 0 114.203999 114.203998 114.342093 114.342093 0 0 0-114.203999-114.203998z"
            fill="#ffff"
            p-id="13971"
          ></path>
        </svg>
        <svg
          v-if="music_active"
          t="1704963079198"
          class="svg_2"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="13968"
          width="48"
          height="48"
        >
          <path
            d="M1023.969343 511.946281A511.77753 511.77753 0 1 1 626.119623 12.873428a503.76806 503.76806 0 0 1 82.856588 26.376014 512.329907 512.329907 0 0 1 314.993132 472.696839z"
            fill="#EA5D5B"
            p-id="13969"
          ></path>
          <path
            d="M708.976211 39.249442v472.696839h-82.856588V12.873428a503.76806 503.76806 0 0 1 82.856588 26.376014z"
            fill="#F5B4B5"
            p-id="13970"
          ></path>
          <path
            d="M511.915624 709.006868a197.060587 197.060587 0 1 1 197.060587-197.060587 197.198681 197.198681 0 0 1-197.060587 197.060587z m0-311.264585a114.203998 114.203998 0 1 0 114.203999 114.203998 114.342093 114.342093 0 0 0-114.203999-114.203998z"
            fill="#FAD8D7"
            p-id="13971"
          ></path>
        </svg> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$nav_bg_color: var(--nav_bg_color, #0ebd7d);
$nav_fixed_shadow: var(--nav_fixed_shadow, #8e8e8e30);
$nav_item_color: var(--nav_item_color, #5e6d78);
$nav_item_active_color: var(--nav_item_active_color, #f67d61);
$nav_item_hover_color: var(--nav_item_hover_color, #f76700);


@font-face {
  font-family: "orbitron-black";
  src: url("/src/assets/font/orbitron-black.ttf");
}
@font-face {
  font-family: "orbitron-light";
  src: url("/src/assets/font/orbitron-light.ttf");
}
#top_nav_main {
  position: fixed;
  width: 100vw;
  // box-shadow: #30313617 2px 0px 10px;
  transition: all 10s cubic-bezier(0.075, 0.82, 0.165, 1);
  font-family: "orbitron-black";
  height: 80px;

  .content {
    width: 100%;
    z-index: 11;
    background: $nav_bg_color;
    height: inherit;
    transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
   
    .nav_box {
      top: 50%;
      left:50%;
      width: 1200px;
      transform: translate(-50%,-50%);
      .logo {
        font-family: "orbitron-light";
        color: $nav_item_color;
        span {
          margin:0 16px;
          user-select: none;
        }
        .icon{
          path{
            fill: $nav_item_active_color;
          }
        }
      }
      .nav_list {
        padding: 0;
        user-select: none;
        .nav_item_active {
          font-size: 15px;
          color: $nav_item_active_color;
          font-weight: 900;
          margin: 0 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .nav_item {
          font-size: 15px;
          color: $nav_item_color;
          font-weight: 900;

          margin: 0 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            color: $nav_item_hover_color;
          }
        }
      }

      .switch {
        font-size: 17px;
        position: relative;
        margin: auto 0;
        margin-left: 128px;

        width: 3.5em;
        height: 2em;
      }

      .switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f4f4f5;
        transition: 0.4s;
        border-radius: 30px;
        &::before {
          position: absolute;
          content: "";
          height: 1.4em;
          width: 1.4em;
          border-radius: 20px;
          left: 0.3em;
          bottom: 0.3em;
          background: linear-gradient(40deg, #ff0080, #ff8c00 70%);
          transition: 0.4s;
        }
      }

      input:checked + .slider {
        background-color: #303136;
      }
      input:checked + .slider:before {
        transform: translateX(1.5em);
        background: #303136;
        box-shadow: inset -3px -2px 5px -2px #8983f7,
          inset -10px -5px 0 0 #a3dafb;
      }
    }
    .music {
      left: 50%;
      top: 8px;
      transform: translateX(-50%);
      &:hover {
        &::after {
          opacity: 1;
          bottom: -30px;
        }
      }
      &::after {
        content: "播放本地音频";
        position: absolute;
        bottom: -20px;
        opacity: 0;
        background: #ffff;
        left: 50%;
        transform: translateX(-50%);
        width: 120%;
        box-shadow: #3031361a 0 0 10px;
        font-size: 11px;
        border-radius: 15px;
        color: #5e6d78;
        padding: 8px 8px;
        transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      img {
        width: 58px;
        height: 58px;
        margin: auto 0;
        border-radius: 50%;
        box-shadow: rgba(17, 34, 51, 0.189) 0 0 10px;
        &:hover {
          box-shadow: rgba(3, 27, 50, 0.763) 0 0 2px;
        }
      }

      .svg_1 {
        &:hover {
        }
      }
      .svg_2 {
        &:hover {
        }
      }
    }
  }
}
</style>
