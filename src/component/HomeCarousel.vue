<!-- @Author: LT -->
<!-- @Date: 2024-01-08 21:37:11 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  onUnmounted,
  onBeforeMount,
  watch,
  onMounted,
  nextTick,
  defineProps,
} from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onUnmounted(() => {
  clearInterval(cycle);
});
onMounted(() => {
  const rect_list = document.querySelectorAll(".rect");
  rect_list[0].classList.add("rect_active");
});
const props = defineProps({
  data: Array,
});
let cycle = setInterval(() => {
  if (position.value === width * 3) {
    position.value = 0;
  } else {
    position.value += width;
  }
}, 4000);
const add_rect_active = (dom_list, index) => {
  dom_list[index].classList.add("rect_active");
};
const remove_rect_active = (dom_list, index) => {
  dom_list[index].classList.remove("rect_active");
};
const change_position = (new_pos) => {
  position.value = new_pos;
};
const current_text = ref("");
let position = ref(0);
watch(position, (newVal, oldVal) => {
  let item = document.querySelector(".item");
  item.style.transform = "translateX(" + position.value + "vw)";
  const rect_list = document.querySelectorAll(".rect");
  if (newVal === 0) {
    add_rect_active(rect_list, 0);
  } else if (newVal ===  width) {
    add_rect_active(rect_list, 1);
  } else if (newVal === width * 2) {
    add_rect_active(rect_list, 2);
  } else if (newVal === width* 3) {
    add_rect_active(rect_list, 3);
  }
  if (oldVal === 0) {
    remove_rect_active(rect_list, 0);
  } else if (oldVal === width) {
    remove_rect_active(rect_list, 1);
  } else if (oldVal === width * 2) {
    remove_rect_active(rect_list, 2);
  } else if (oldVal === width * 3) {
    remove_rect_active(rect_list, 3);
  }
});
const width = -50
const enter_handler = ()=>{
  clearInterval(cycle);
}
const leave_handler = ()=>{
  cycle = setInterval(() => {
  if (position.value === width * 3) {
    position.value = 0;
  } else {
    position.value += width;
  }
}, 4000);
}

</script>
<template>
  <div id="home_carousel_main" class="relative" @mouseenter="enter_handler" @mouseleave="leave_handler">
    <div class="content relative">
      <div class="item absolute flex flex_direction_row">
        <div class="img_box relative" v-for="(item, index) in data">
          <img :src="item.link" alt="" />
        </div>
      </div>
    </div>
    <div
      class="absolute flex flex_direction_row rect_box "
    >
      <div @click="change_position(0)" class="rect"></div>
      <div @click="change_position(width)" class="rect"></div>
      <div @click="change_position(width*2)" class="rect"></div>
      <div @click="change_position(width * 3)" class="rect"></div>
    </div>
    <div class="absolute dyn_text" v-html="current_text"></div>
  </div>
</template>
<style lang="scss" scoped>
#home_carousel_main {
  width: 50vw;
  height: 30vh;
  overflow: hidden;
  // box-shadow: #e4b198 15px 16px 5px, #98cde4 -15px -16px 5px;
  border-radius: 10px;

  &::after {
    content: "";
    position: absolute;
    width: 50vw;
    height: inherit;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, #c0c0c03c 5%, transparent 95%);
    border-radius: 10px;
  }
  
  .rect_box {
    z-index: 1000;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    gap: 1vw;
    .rect {
      width: 48px;
      height: 1vh;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      // border: #ffffff70 1px solid;
      background: #ffffff55;
      border-radius: 10px;
      margin: 10px 0;
    }
    .rect_active {
      width: 32px;
      height: 1vh;
      // border: #0064fb51 1px solid;
      background: #fff4f4;
      border-radius: 10px;
      margin: 10px 0;
    }
  }

  .content {
    width: 50vw;
    height: inherit;
    .item {
      height: inherit;
      width: 160vw;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .img_box {
        width: 50vw;
        height: inherit;
        border-radius: 10px;

        &::before {
          content: "";
          position: absolute;
          width: inherit;
          height: 200px;
          left: 0;
          top: 0;
          background: linear-gradient(to bottom, #0d9ce943 5%, transparent 95%);
          border-radius: 10px;
        }
        img {
          width: inherit;
          height: inherit;
          object-fit: cover;
          border-radius: 10px;
        }
      }
    }
  }
}
@keyframes text_out {
  0% {
    opacity: 0;
    transform: scale(0.3) translate(-50%, -50%);
  }
  100% {
    opacity: 1;
    transform: scale(1) translate(-50%, -50%);
  }
}
</style>
