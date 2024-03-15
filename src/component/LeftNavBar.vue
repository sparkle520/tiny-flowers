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
  watch,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

onBeforeMount(() => {});
onMounted(() => {});
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
    name: "关于我",
    path: "/aboutMe",
  },
  {
    index: 3,
    name: "数学",
    path: "/math",
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
  const nav_list_img = document.querySelectorAll(".nav_list li img");
  const nav_list_item = document.querySelectorAll(".nav_list li");
  nav_list_img[index].classList.add("sunny_doll_active");
  nav_list_item[index].classList.add("nav_item_active");
  if (nav_list_img[index].classList.contains("sunny_doll")) {
    nav_list_img[index].classList.remove("sunny_doll");
  }
  if (nav_list_item[index].classList.contains("nav_item")) {
    nav_list_item[index].classList.remove("nav_item");
  }
  pre_active_item.value = index;
};
const switch_nav_active = () => {
  const nav_list_img = document.querySelectorAll(".nav_list li img");
  const nav_list_item = document.querySelectorAll(".nav_list li");
  if (pre_active_item.value != -1) {
    nav_list_item[pre_active_item.value].classList.remove("nav_item_active");
    nav_list_item[pre_active_item.value].classList.add("nav_item");
    nav_list_img[pre_active_item.value].classList.remove("sunny_doll_active");
    nav_list_img[pre_active_item.value].classList.add("sunny_doll");
  }

  nextTick(() => {
    switch (active_item.value) {
      case "home":
        switch_nav_item(0);
        break;
      case "unknownWorldMap":
        switch_nav_item(1);
        break;
      case "aboutMe":
        switch_nav_item(2);
        break;

      case "math":
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
const active_music = () =>{
  music_active.value = !music_active.value
}
const emit = defineEmits(["music_change"]);

const music_active = ref(false)
watch(music_active,(newV,oldV)=>{
  emit('music_change',newV)
})
</script>
<template>
  <div id="main" class="">
    <div class="content flex flex_direction_column relative">
      <!-- <div class="cover_box absolute">
        <div class="absolute me">
          <img src="/src/assets/imgs/me.jpg" alt="" />
        </div>
        <div
          class="github_me absolute flex align_items_center justify_content_center"
          @click="go_github"
        >
          <svg
            t="1704550937774"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6229"
            width="80"
            height="80"
          >
            <path
              d="M850.346667 155.008a42.666667 42.666667 0 0 0-22.741334-23.509333c-8.704-3.754667-85.717333-33.322667-200.32 39.168H396.714667c-114.773333-72.618667-191.701333-42.922667-200.32-39.168a42.88 42.88 0 0 0-22.741334 23.466666c-26.197333 66.218667-18.048 136.448-7.850666 176.896C134.272 374.016 128 413.098667 128 469.333333c0 177.877333 127.104 227.882667 226.730667 246.272a189.568 189.568 0 0 0-13.013334 46.549334A44.373333 44.373333 0 0 0 341.333333 768v38.613333c-19.498667-4.138667-41.002667-11.946667-55.168-26.112C238.08 732.416 188.330667 682.666667 128 682.666667v85.333333c25.002667 0 65.365333 40.362667 97.834667 72.832 51.029333 51.029333 129.066667 55.253333 153.386666 55.253333 3.114667 0 5.376-0.085333 6.528-0.128A42.666667 42.666667 0 0 0 426.666667 853.333333v-82.090666c4.266667-24.746667 20.224-49.621333 27.946666-56.362667a42.666667 42.666667 0 0 0-23.125333-74.581333C293.333333 624.554667 213.333333 591.488 213.333333 469.333333c0-53.12 5.632-70.741333 31.573334-99.285333 11.008-12.117333 14.08-29.568 7.978666-44.8-4.821333-11.904-18.773333-65.450667-6.485333-117.546667 20.650667-1.578667 59.904 4.565333 113.706667 40.96C367.104 253.44 375.466667 256 384 256h256a42.666667 42.666667 0 0 0 23.936-7.338667c54.016-36.522667 92.970667-41.770667 113.664-41.130666 12.330667 52.224-1.578667 105.770667-6.4 117.674666a42.666667 42.666667 0 0 0 8.021333 44.928C805.077333 398.464 810.666667 416.085333 810.666667 469.333333c0 122.581333-79.957333 155.52-218.069334 170.922667a42.666667 42.666667 0 0 0-23.125333 74.709333c19.797333 17.066667 27.861333 32.469333 27.861333 53.034667v128h85.333334v-128c0-20.437333-3.925333-38.101333-9.770667-53.12C769.92 695.765333 896 643.712 896 469.333333c0-56.362667-6.272-95.530667-37.76-137.514666 10.197333-40.405333 18.261333-110.506667-7.893333-176.810667z"
              fill="#ffbb98"
              p-id="6230"
            ></path>
          </svg>
        </div>
        <p class="absolute name">ferris</p>
      </div> -->
      <div class="absolute nav_box flex flex_direction_column">
        <ul class="nav_list flex flex_direction_column">
          <li
          :key="item"
            class="nav_item flex flex_direction_row align_items_center"
            v-for="(item) in nav_list"
            @click="link_to(item.path)"
          >
            <img
              class="sunny_doll"
              src="/src/assets/imgs/sunshine.png"
              alt=""
            />
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="music absolute" @click="active_music">
        <svg v-if="!music_active"
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
        <svg v-if="music_active"
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
#main {
  position: fixed;
  background: #ccd9e2;
  // background: transparent;

  &::after {
    filter: blur(5px);
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    z-index: 2;
  }
  .content {
    width: 100%;
    height: 100vh;
    z-index: 11;
    .cover_box {
      width: 100%;
      height: 450px;
      background: linear-gradient(
        to bottom,
        #d67940,
        rgba(255, 255, 255, 0.336) 70%,
        rgba(255, 255, 255, 0)
      );
      border-radius: 10px;
      top: 0px;
      left: 0px;
      z-index: 0;
      .github_me {
        left: 50%;
        top: 120px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        border: #8888081b 10px solid;
        opacity: 0;
        background: #ffd5af;
        transform: translate(-50%);
        z-index: 20;
        transition: all 1s cubic-bezier(0.215, 0.610, 0.355, 1);
        &:hover {
          opacity: 1;
          top: 100px;
        }
      }
      .me:hover + .github_me {
        opacity: 1;
        top: 100px;
      }

      .me {
        width: 100px;
        height: 100px;
        left: 50%;
        top: 100px;
        border-radius: 50%;
        transform: translate(-50%);
        box-shadow: #44403d 2px 3px 4px;
        border: rgba(221, 241, 241, 0.489) 10px solid;
        z-index: 10;
        img {
          width: 100px;
          height: 100px;
          border-radius: 50%;
        }
      }
      .name {
        color: #285185;
        font-size: 40px;
        left: 50%;
        font-family: "Microsoft YaHei";

        top: 200px;
        transform: translate(-50%);
        font-weight: bold;
        z-index: 11;
      }
    }
    .nav_box {
      top: 50%;
      transform: translateY(-50%);
      .sunny_doll_active {
        opacity: 1;
        width: 20px;
        height: 20px;
        object-fit: cover;
        margin-right: 10px;
        transform: translateY(2px);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      .nav_list {
        align-items: flex-end;
        width: 150px;
        .nav_item_active {
          font-size: 20px;
          color: #6f4849;
          font-weight: 600;
          margin-bottom: 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .nav_item {
          font-size: 15px;
          color: rgb(255, 250, 243);
          font-weight: 600;
          margin-bottom: 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            color: rgb(180, 155, 137);
          }
          .sunny_doll {
            width: 20px;
            height: 20px;
            opacity: 0;
            object-fit: cover;
            margin-right: 10px;
            transform: translateY(2px);
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
    }
    .music {
      left: 50%;
      bottom: 10%;
      transform: translateX(-50%);
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover{
        animation: jump 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      }
    
      .svg_1{
        &:hover{
          filter: drop-shadow(0px 10px 10px rgb(6, 2, 0));
        }
      }
      .svg_2{
        &:hover{
          filter: drop-shadow(0px 10px 10px rgb(240, 121, 74));
        }
      }
    }
  }
}
@keyframes jump {
  0%{
    transform: translate(-50%,10%);

  }40%{
    transform: translate(-50%,-10%);

  }100%{
    transform: translate(-50%,0%);
  }
}
</style>
