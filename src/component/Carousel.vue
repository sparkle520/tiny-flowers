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
const width = -90
const text_list = [
  `<span style="color: #ABDCFF;text-shadow: #0396FF 1px 1px 5px;">Words like "tomorrow" or "future" or "fate".</span>`,
  `<span style="color: #FEB692;text-shadow: #EA5455 1px 1px 5px;">No matter how far they extend their hands.</span>`,
  `<span style="color: #90F7EC;text-shadow: #32CCBC 1px 1px 5px;">Let's breathe, and dream.</span>`,
  `<span style="color: #FFD3A5;text-shadow: #FD6585 1px 1px 5px;">We'll play together in this place.</span>`,
  `<span style="color: #F6CEEC;text-shadow: #D939CD 1px 1px 5px;">What do you say?</span>`,
  // `<span style="color: #FEC163;text-shadow: #DE4313 1px 1px 5px;">呼唤着:“出发吧” </span>`,
  // `<span style="color: #ABDCFF;text-shadow: #0396FF 1px 1px 5px;">为了梦想<br>我们扬帆起航<br>为了明日的降临 跨越无尽黑夜</span>`,
  // `<span style="color: #FEB692;text-shadow: #EA5455 1px 1px 5px;">满怀期待 肩并着肩<br>无论遇见什么困难<br>我们总会有办法解决</span>`,
  // `<span style="color: #90F7EC;text-shadow: #32CCBC 1px 1px 5px;">我们并非无畏 只是不愿停滞不前</span>`,
  // `<span style="color: #FFD3A5;text-shadow: #FD6585 1px 1px 5px;">即便危机抢先到达<br>我们也不会受其左右</span>`,
  // `<span style="color: #F6CEEC;text-shadow: #D939CD 1px 1px 5px;">我们的爱情呼唤 我们的声音</span>`,
  // `<span style="color: #FEC163;text-shadow: #DE4313 1px 1px 5px;">呼唤着:“出发吧” </span>`,
];
const play_dyn_text = () => {
  if (current_text.value === "") {
    let pos = 0;
    const text = document.querySelector(".dyn_text");
   let play = setInterval(() => {
      if (pos === text_list.length) {
        current_text.value = "";
        clearInterval(play);
      } else {
        current_text.value = text_list[pos];
        text.style.transition = "none";
        text.style.opacity = 0;
        text.style.transform = "scale(.7) translate(-50%,-50%)";
        nextTick(() => {
          setTimeout(() => {
            text.style.transition =
              "all 2s cubic-bezier(0.19, 1, 0.22, 1)";
            text.style.opacity = 1;
            if(pos %2 === 0){
              let random = Math.random() * 10 + 5;
              let random2 = Math.random() * 10 + 60;
              text.style.transform = "scale(1) translate(-"+random2+"%,-50%) rotateX(0deg) skewY("+random+"deg)";
            }else{
              let random = Math.random() * 10 + 5;
              let random2= Math.random() * 10 + 30;

              text.style.transform = "scale(1) translate(-"+random2+"%,-50%) rotateX(0deg) skewY(-"+random+"deg)";

            }
          }, 500);
          setTimeout(() => {
            text.style.opacity = 0;
            text.style.transform = "scale(.7) translate(-50%,-50%)";
          }, 2500);
        });
        pos++;
      }
    }, 3000);
  }
};
</script>
<template>
  <div id="main" class="relative" @mouseenter="play_dyn_text">
    <div class="content relative">
      <div class="item absolute flex flex_direction_row">
        <div class="img_box relative" v-for="(item, index) in data">
          <img :src="item.link" alt="" />
        </div>
      </div>
    </div>
    <div
      class="absolute flex flex_direction_column rect_box justify_content_center"
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
#main {
  width: 90vw;
  height: 500px;
  overflow: hidden;
  // box-shadow: #e4b198 15px 16px 5px, #98cde4 -15px -16px 5px;
  border-radius: 5px;

  &::after {
    content: "";
    position: absolute;
    width: 90vw;
    height: inherit;
    right: 0;
    bottom: 0;
    background: linear-gradient(to left, #000000be 5%, transparent 95%);
    border-radius: 5px;
  }
  .dyn_text {
    font-size: 30px;
    letter-spacing: 3px;
    font-weight: 900;
    font-family: "Microsoft YaHei";
    line-height: 35px;
    white-space: nowrap;
    top: 50%;
    z-index: 100;
    text-align: center;
    left: 50%;
    transition: all 2s cubic-bezier(0.19, 1, 0.22, 1);
    opacity: 0;
    transform: scale(0.7) translate(-50%,-50%);
  }
  .rect_box {
    right: 10px;
    z-index: 1000;
    height: 100%;
    bottom: 10px;
    .rect {
      width: 10px;
      height: 10px;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      // border: #ffffff70 1px solid;
      background: #ffffff55;
      border-radius: 50%;

      margin: 10px 0;
    }
    .rect_active {
      width: 10px;
      height: 10px;
      // border: #0064fb51 1px solid;
      background: #e1e0e0;
      border-radius: 50%;
      margin: 10px 0;
    }
  }

  .content {
    width: 90vw;
    height: inherit;
    .item {
      height: inherit;
      width: 360vw;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .img_box {
        width: 90vw;
        height: inherit;
        border-radius: 5px;

        &::before {
          content: "";
          position: absolute;
          width: inherit;
          height: 200px;
          left: 0;
          top: 0;
          background: linear-gradient(to bottom, #0d9ce943 5%, transparent 95%);
          border-radius: 5px;
        }
        img {
          width: 90vw;
          height: 670px;
          object-fit: cover;
          border-radius: inherit;
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
