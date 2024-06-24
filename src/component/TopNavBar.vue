<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:55:59 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  ref,
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
  top_nav_main  = document.querySelector("#top_nav_main");

});
onUnmounted(() => {
  document.removeEventListener("scroll", nav_handle);
});

let top_nav_main;
const nav_handle = () => {
  let wScrY = window.scrollY;
  let sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
  top_nav_main.style.left=sl+'px';
  if(wScrY < 70){
    c_c("--nav_bg_color", "transparent")
  }else{
    change_theme(theme.value);
  }
};
const emits = defineEmits(["music_change"]);

const nav_list = [
  {
    index: 0,
    name: "主页",
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


const current_theme = ref(false);
const theme_change = () => {
  store.theme = !current_theme.value;
};
</script>
<template>
  <div id="top_nav_main" class="nav_main f a_c j_c_c">
    <div class="content f f_d_r r">
    <div class="a stave f f_d_c">
      <div v-for="item in 5" :key="item" class="stave_line"></div>
    </div>
      <div
        class="a nav_box f f_d_r justify_content_space_between"
      >
        <div class="f f_d_r justify_content_space_around">
          <div class="logo f a_c j_c_c"
          @click="link_to(nav_list[0].path)"
          >
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 200 200" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><path fill="url(&quot;#SvgjsLinearGradient1232&quot;)" fill-rule="evenodd" d="M99.994 183.711C106.781 191.856 113.567 200 127.14 200c31.244 0 40.269-41.556 40.281-72.844 0-13.572 8.144-20.358 16.289-27.144C191.855 93.225 200 86.439 200 72.868c0-31.254-41.616-40.29-72.849-40.29-13.572 0-20.359-8.145-27.145-16.29C93.219 8.145 86.433 0 72.86 0 41.605 0 32.568 41.614 32.568 72.844c0 13.573-8.142 20.359-16.284 27.145C8.142 106.775 0 113.56 0 127.132c0 31.253 41.605 40.29 72.849 40.29 13.572 0 20.359 8.144 27.145 16.288ZM100 137c20.435 0 37-16.565 37-37 0-20.434-16.565-37-37-37-20.434 0-37 16.566-37 37 0 20.435 16.566 37 37 37Z" clip-rule="evenodd"></path><defs><linearGradient gradientTransform="rotate(0 0.5 0.5)" id="SvgjsLinearGradient1232"><stop stop-opacity=" 1" stop-color="rgba(105, 234, 203)" offset="0"></stop><stop stop-opacity=" 1" stop-color="rgba(234, 204, 248)" offset="0.48"></stop><stop stop-opacity=" 1" stop-color="rgba(249, 249, 249)" offset="1"></stop></linearGradient></defs></svg>
          </div>

          <ul class="nav_list f f_d_r">
            <li
              :key="item"
              class="nav_item nav_item_com f r f_d_r a_c"
              v-for="item in nav_list"
              @click="link_to(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="f f_d_r">           
          <label class="switch r" for="theme">
            <input
              id="theme"
              type="checkbox"
              @click="theme_change"
              v-model="current_theme"
            />
            <span class="slider a"></span>
          </label>
        </div>
      </div>
     
    </div>
  </div>
</template>
<style lang="scss" scoped>
$nav_bg_color: var(--nav_bg_color, #0ebd7d);
$nav_fixed_shadow: var(--nav_fixed_shadow, #8e8e8e30);
$nav_item_color: var(--nav_item_color, #5e6d78);
$nav_item_active_color: var(--nav_item_active_color, #f67d61);

#top_nav_main {
  position: fixed;
  width: max(1440px,100vw);
  // box-shadow: #30313617 2px 0px 10px;
  transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
  height: 60px;
  top: 16px;
  .content {
    width: max(1100px,60vw);
    z-index: 11;
    background: $nav_bg_color;
    height: inherit;
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
   border-radius: 60px;
    .nav_box {
      top: 50%;
      left:50%;
      width: max(1036px,60vw);
      transform: translate(-50%,-50%);
      .logo {
        .icon{
        transform: scale(.6);
        }
      }
      .nav_list {
        padding: 0;
        user-select: none;
        .nav_item_active {
          font-size: 14px;
          color: $nav_item_active_color;
          margin: 0 10px;
          font-weight: 900;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          &::after{
            width: 100%;
            height: 4px;
            content: '';
            position: absolute;
            background:$nav_item_active_color;
            top: -22px;
          }
        }
        .nav_item {
          font-size: 14px;
          color: $nav_item_color;
          font-weight: 900;
          margin: 0 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            opacity: .5;
          }
        }
      }

      .switch {
        font-size: 14px;
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
  }
}
</style>
