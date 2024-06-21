<!-- @Author: LT -->
<!-- @Date: 2024-01-08 21:37:11 -->
<!-- @Description:  -->

<script setup>
import {
  ref,
  onUnmounted,
  onBeforeMount,
  watch,
  onMounted,
  defineProps,
} from "vue";
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
let position = ref(0);
watch(position, (newVal, oldVal) => {
  let item = document.querySelector(".item");
  item.style.transform = "translateX(" + position.value + "px)";
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
const width = -720
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
  <div id="home_carousel_main" class="r" @mouseenter="enter_handler" @mouseleave="leave_handler">
    <div class="content r">
      <div class="item a f f_d_r">
        <div class="img_box r" v-for="(item, index) in data">
          <img :src="item.link" alt="" />
        </div>
      </div>
    </div>
    <div
      class="a f f_d_r rect_box "
    >
      <div @click="change_position(0)" class="rect"></div>
      <div @click="change_position(width)" class="rect"></div>
      <div @click="change_position(width*2)" class="rect"></div>
      <div @click="change_position(width * 3)" class="rect"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#home_carousel_main {
  width: 720px;
  height: 226px;
  overflow: hidden;
  border-radius: 10px;

  &::after {
    content: "";
    position: absolute;
    width: 720px;
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
    gap: 16px;
    .rect {
      width: 48px;
      height: 4px;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      background: #ffffff55;
      border-radius: 10px;
      margin: 10px 0;
    }
    .rect_active {
      width: 32px;
      height: 4px;
      background: #fff4f4;
      border-radius: 10px;
      margin: 10px 0;
    }
  }

  .content {
    width: 720px;
    height: inherit;
    .item {
      height: inherit;
      width: 2880px;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .img_box {
        width: 720px;
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

</style>
