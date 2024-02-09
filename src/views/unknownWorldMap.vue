<!-- @Author: LT -->
<!-- @Date: 2024-01-05 23:20:31 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import data from "/src/assets/config/data.js";
import change_theme from "../assets/theme/UnknownWorldMap";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);
  change_theme(theme.value);
});

const topic_data = {
  topic_count: data.length(),
  visit_count: 100,
};
const classification = [
  { name: "学习笔记" },
  { name: "技术分享" },
  { name: "生活随想" },
  { name: "二次元" },
];
const to_topic_list = (name) => {
  router.push("/unknownWorldMap/list/" + name + "/1");
};
</script>
<template>
  <div id="article_main" class="relative">
    <div class="container absolute"
    @click="to_topic_list(classification[0].name)"
>
      <div class="img1">
      <img
        src="https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg"
        alt=""
      />
     </div>
     <div class="img2">
        <img
        src="https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg"
        alt=""
      />
      </div>
      <div class="img3">
        <img
        src="https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg"
        alt=""
      />
      </div>
      <div

       class="img4"
      >

        <img
        src="https://pic.imgdb.cn/item/65c4bba89f345e8d03bde961.jpg"
        alt=""
      />
      </div>
     <div class="img5">
      <img
        src="https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg"
        alt=""
      />
     </div>
      <div class="img6">
        <img
        src="https://pic.imgdb.cn/item/659e63dc871b83018a2d7de3.jpg"
        alt=""
      />
    </div>
      </div>
  </div>
</template>
<style lang="scss" scoped>
#article_main {
  $bg_color: var(--bg_color, #f7f3f5);
  $color: var(--color, #262220);
  $p: var(--p, #705547);
  $decorate_bg_1: var(--decorate_bg_1, #f0681e);
  $decorate_bg_2: var(--decorate_bg_2, #ed8262);
  $decorate_bg_3: var(--decorate_bg_3, #f89d8a);
  $item_bg: var(--item_bg, #fffbf9);
  $item_shadow: var(--item_shadow, #91919127);
  $item_color: var(--item_color, #f0681e);
  $item_bf_bg: var(--item_bf_bg, #4d678233);
  $item_af_bg: var(--item_af_bg, #99d0d9);
  width: 100%;
  background: $bg_color;
  min-height: 100vh;
  .container {
    display: grid;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: .7vw;
    width: 30vw;
    background: transparent;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 12vh 12vh 15vh 15vh;
    grid-template-areas:
      "img1 img2 img2"
      "img1 img4 img3"
      "img5 img4 img3"
      "img5 img4 img6";
      &:hover{

        div:hover{
          transform: scale(1.04);
        }
        div:not(:hover){
          transform: scale(.96);
        }
      }
      div{
        background: transparent;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        box-shadow: #a3a3a362 2px 3px 10px;

      }
      img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 5px;
      }
    .img1 {
      grid-area: img1;
      animation: img1 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .img2 {
      grid-area: img2;
      animation: img2 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
    .img3 {
      grid-area: img3;
      animation: img3 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
    .img4 {
      grid-area: img4;
      animation: img4 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
    .img5 {
      grid-area: img5;
      animation: img5 2s cubic-bezier(0.075, 0.82, 0.165, 1);


    }
    .img6 {
      grid-area: img6;
      animation: img6 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
  }
}
@keyframes img1 {
  from{
transform: translate(-10vw,-10vh) scale(2);
  }
  to{
    transform: translate(0,0);

  }
}
@keyframes img2 {
  from{
transform: translate(0,-10vh) scale(1.8);
  }
  to{
    transform: translate(0,0);

  }
}
@keyframes img3 {
  from{
transform: translate(10vw,0) scale(1.2);
  }
  to{
    transform: translate(0,0);

  }
}
@keyframes img4 {
  from{
transform: translate(0,10vh) scale(1.6);
  }
  to{
    transform: translate(0,0);

  }
}
@keyframes img5 {
  from{
transform: translate(-10vw,10vh) scale(1.5);
  }
  to{
    transform: translate(0,0);

  }
}
@keyframes img6 {
  from{
transform: translate(10vw,10vh) scale(1.1);
  }
  to{
    transform: translate(0,0);

  }
}
</style>
