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
    name: "留言板",
    path: "/messageBoard",
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
     
      case "messageBoard":
        switch_nav_item(3);
        break;
      case "updateLog":
        switch_nav_item(4);
        break;
      default:
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
</script>
<template>
  <div id="main" class="">
    <div class="content flex flex_direction_column relative">
      <div class="cover_box absolute">
          <img src="/src/assets/imgs/me.jpg" class="absolute me" alt="" />
          <p class="absolute name">ferris</p>
        </div>
      <div class="absolute nav_box flex flex_direction_column">
        <ul class="nav_list flex flex_direction_column">
          <li
            class="nav_item flex flex_direction_row align_items_center"
            v-for="(item, index) in nav_list"
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
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  position: fixed;
    background: rgba(65, 121, 170, 0.708);
    
    &::after{
      filter: blur(5px);
      content: "";
    width:100%;
    height:100%;
    position: absolute;
    left:0;
    top:0;
    background: inherit;
    z-index: 2;
    }  
  .content {
    width: 100%;
    height: 100%;
    z-index: 11;
    .cover_box {
        width: 100%;
        height: 450px;
        background: linear-gradient(
          to bottom,
          rgba(209, 131, 131, 0.911),
          rgba(255, 255, 255, 0.336) 70%,
          rgba(255, 255, 255, 0)
        );
        border-radius: 10px;
        top: 0px;
        left: 0px;
        z-index: 0;
        .me {
          left: 50%;
          top: 100px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
		  transform: translate(-50%);
          border: rgba(221, 241, 241, 0.489) 10px solid;
          z-index: 10;
        }
        .name {
          color: rgb(74, 27, 51);
          font-size: 40px;
          left: 50%;
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
          color: rgb(239, 99, 17);
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
  }
}
</style>
