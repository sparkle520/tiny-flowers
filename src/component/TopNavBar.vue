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
const router = useRouter();
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
  document.addEventListener("scroll", nav_handle);
});
onUnmounted(() => {
  document.removeEventListener("scroll", nav_handle);
});
const nav_handle = () => {
  let wScrY = window.scrollY;
  const nav_main = document.querySelector(".nav_main");
  const content = document.querySelector(".content");
  if (wScrY > 170) {
    nav_main.classList.add("nav_fixed");
  } else {
    nav_main.classList.remove("nav_fixed");
  }
};
const emits = defineEmits(["music_change"]);

const nav_list = [
  {
    index: 0,
    name: "主页",
    path: "/home",
  },
  {
    index: 1,
    name: "未知世界图",
    path: "/unknownWorldMap",
  },
  {
    index: 2,
    name: "关于",
    path: "/about",
  },
  {
    index: 3,
    name: "你的名字",
    path: "/yourName",
  },
  {
    index: 4,
    name: "更新日志",
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
    switch (active_item.value) {
      case "home":
        switch_nav_item(0);
        break;
      case "unknownWorldMap":
        switch_nav_item(1);
        break;
      case "about":
        switch_nav_item(2);
        break;

      case "yourName":
        switch_nav_item(3);
        break;
      case "updateLog":
        switch_nav_item(4);
        break;
      default:
        switch_nav_item(0);
        break;
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
const current_theme = ref(false)
const theme_change = () => {
  store.theme = !current_theme.value;
};
</script>
<template>
  <div id="main" class="nav_main">
    <div class="content flex flex_direction_row relative">
      <div
        class="absolute nav_box flex flex_direction_row justify_content_space_around"
      >
        <ul class="nav_list flex flex_direction_row">
          <li
            class="nav_item nav_item_com flex flex_direction_row align_items_center"
            v-for="(item, index) in nav_list.slice(0, 2)"
            @click="link_to(item.path)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="flex flex_direction_row">
          <ul class="nav_list flex flex_direction_row">
            <li
              class="nav_item nav_item_com flex flex_direction_row align_items_center"
              v-for="(item, index) in nav_list.slice(2)"
              @click="link_to(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
          <label class="switch" for="theme" >
            <input id="theme" type="checkbox" @click="theme_change" v-model="current_theme"/>
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="music absolute" @click="active_music">
        <svg
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
        </svg>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$nav_bg_color: var(--nav_bg_color, transparent);
$nav_fixed_shadow: var(--nav_fixed_shadow, #8e8e8e30);
$nav_item_color: var(--nav_item_color, #5e6d78);
$nav_item_active_color: var(--nav_item_active_color, #f67d61);
$nav_item_hover_color: var(--nav_item_hover_color, #f76700);

.nav_fixed {
  background: #ffffff40;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  box-shadow: $nav_fixed_shadow 0px 6px 15px 0px;
  -webkit-box-shadow: $nav_fixed_shadow 0px 6px 15px 0px;
  animation: fade_out 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

#main {
  position: fixed;
  background: transparent;
  width: 100vw;
  background: transparent;
  .content {
    width: 100vw;
    height: 70px;
    background: $nav_bg_color;
    z-index: 11;

    .nav_box {
      top: 50%;
      width: 100%;
      transform: translateY(-50%);
      .nav_list {
        .nav_item_active {
          font-size: 15px;
          color: $nav_item_active_color;
          font-weight: 600;
          margin: 0 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .nav_item {
          font-size: 15px;
          color: $nav_item_color;
          font-weight: 600;
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
        width: 3.5em;
        margin-left: 30px;
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
      bottom: 10%;
      transform: translateX(-50%);
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        animation: jump 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }

      .svg_1 {
        &:hover {
          filter: drop-shadow(0px 10px 10px rgb(6, 2, 0));
        }
      }
      .svg_2 {
        &:hover {
          filter: drop-shadow(0px 10px 10px rgb(240, 121, 74));
        }
      }
    }
  }
}
@keyframes jump {
  0% {
    transform: translate(-50%, 10%);
  }
  40% {
    transform: translate(-50%, -10%);
  }
  100% {
    transform: translate(-50%, 0%);
  }
}
@keyframes fade_out {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
