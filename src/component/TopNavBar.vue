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
          <div class="logo flex align_items_center justify_content_center">
            <svg
              t="1711708792691"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="701"
              width="52"
              height="52"
            >
              <path
                d="M513.052444 865.735111c74.097778-67.072 187.761778-65.365333 271.843556-21.646222-9.671111 2.190222-19.456 4.551111-29.240889 6.940444l-19.626667 4.835556c-75.377778 18.574222-152.405333 36.266667-226.844444 9.870222z m110.734223-128.711111l-6.371556 7.367111c-155.420444 175.36-333.255111 115.370667-400.725333 82.688l-7.850667-3.925333c-12.913778-6.656-20.081778-11.434667-20.081778-11.434667 277.105778 96.995556 427.008-65.678222 434.801778-74.410667l0.227556-0.284444zM149.987556 538.936889c61.212444 51.626667 200.419556 182.784 165.091555 276.849778 0 0-63.260444-24.832-106.723555-78.848-40.220444-50.147556-84.309333-131.356444-58.368-198.001778z m242.858666-134.371556v6.200889c0.199111 61.525333 80.611556 138.24 124.700445 169.955556 3.470222 2.503111 7.281778 5.12 11.349333 7.850666l6.229333 4.124445c53.105778 35.157333 134.314667 84.764444 47.928889 128.369778-53.276444 27.022222-161.848889 6.001778-200.817778-43.690667-44.714667-57.002667-7.367111-206.592 10.609778-272.810667z m316.757334-17.578666c76.942222 33.649778 207.36 74.808889 148.992 191.800889-45.112889 91.306667-123.477333 120.007111-204.316445 148.081777 5.319111-5.347556 10.808889-10.24 16.355556-15.018666l11.064889-9.585778c12.8-11.320889 25.116444-23.580444 34.645333-41.813333 15.701333-30.236444 32.227556-84.878222 34.076444-118.954667 2.645333-48.440889-15.530667-115.484444-40.817777-154.510222z m-24.291556 102.001777c14.705778 58.510222 49.777778 144.213333-41.841778 141.226667-64.910222-2.133333-107.548444-67.498667-124.501333-124.728889l11.832889 18.659556c29.809778 63.203556 117.560889 18.005333 154.510222-35.157334z m-88.775111-37.262222c15.928889-15.246222 46.933333-42.666667 64.483555-14.364444 19.598222 31.715556-23.665778 68.124444-39.395555 88.917333 20.195556-23.779556 9.187556-71.566222-25.088-70.485333z m-19.2-31.943111c-19.370667 23.153778-28.16 52.906667-13.255111 82.062222-25.912889 15.018667-56.120889-19.057778-65.507556-34.503111 12.629333-32.768 45.511111-47.132444 78.791111-47.559111z m-248.177778-252.444444c61.639111-60.216889 217.372444-3.015111 243.285333 75.207111-98.787556-48.412444-217.571556 135.224889-207.36 228.864-52.252444-63.004444-106.325333-234.865778-35.925333-304.071111z m214.101333 139.946666c62.236444-8.590222 118.584889 48.213333 123.676445 110.136889-66.531556-61.070222-140.629333-24.860444-197.973333 24.433778-45.312-37.944889 29.809778-128.369778 74.296888-134.570667z m123.875556-116.366222c52.451556-16.298667 63.488-1.934222 87.552 44.999111 25.514667 49.493333 63.886222 127.061333 67.356444 183.637334-80.668444-40.504889-212.053333-180.821333-310.072888-116.622223l-2.104889 1.422223 5.973333-4.664889c42.723556-34.247111 95.800889-87.068444 143.047111-105.813334z"
                fill="#abf49d"
                p-id="702"
              ></path>
            </svg>
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
      width: 100%;
      transform: translateY(-50%);
      .logo {
        margin-left: 16px;
        font-family: "orbitron-light";
        margin-right: 10vw;
        color: $nav_item_color;
        span {
          margin-left: 0px;
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
        margin-left: calc(10vw + 100px);

        width: 3.5em;
        height: 2em;
        margin-right: 1vw;
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
