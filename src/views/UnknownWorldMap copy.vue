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
  <div id="main" class="relative">
    <div class="decorate flex align_items_center">
      <span>
        I dreamed of a world so far from here that's not on the map.
      </span>
    </div>
    <div
      class="top_title relative flex align_items_center justify_content_center flex_direction_column"
    >
      <span class="top_head">UNKNOWN<br />WORLD<br />MAP</span>
      <div class="rectangle_1"></div>
      <div class="message">
        If only our voices speak at night.<br />
        Could ever reach the very edge of this world and the time<br />
        Instead of fading into air and dust.<br />
        Then what will the words could ever be<br />
        For all these words from probably.
      </div>
    </div>
    <div
      class="statistics_box relative flex flex_direction_row justify_content_center relative"
    >
      <div class="topic_count flex flex_direction_column align_items_center">
        <p>文章</p>
        {{ topic_data.topic_count }}
      </div>
      <div class="absolute rectangle_2"></div>
      <div class="visit_count flex flex_direction_column align_items_center">
        <p>访问</p>
        <span id="busuanzi_value_site_pv"></span>
      </div>
    </div>
    <div class="content width_full relative flex flex_direction_column">
      <div class="class_box flex flex_direction_row justify_content_center">
        <div
          @click="to_topic_list(item.name)"
          v-for="(item, index) in classification"
          class="relative item flex align_items_center justify_content_center"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <!-- <Pagination
      @page_change="page_handle"
      class="pagination absolute"
      :data="page_data"
    ></Pagination> -->
  </div>
</template>
<style lang="scss" scoped>
#main {
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
  .decorate {
    position: absolute;
    width: 2vw;
    height: 100%;
    right: 9%;
    color: $bg_color;
    writing-mode: vertical-rl;
    animation: move_bottom 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: 0;
    background: linear-gradient(
      to bottom,
      $decorate_bg_1 10%,
      $decorate_bg_2 40%,
      $decorate_bg_3 60%,
      transparent 100%
    );
    span {
      font-weight: 900;
      margin-top: 1em;
      letter-spacing: 0.2em;
    }
  }

  .top_title {
    margin-top: 70px;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    line-height: 55px;
    color: $color;
    z-index: 1;
    font-family: "STHupo", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    .top_head {
      animation: move_bottom 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .rectangle_1 {
      width: 0.7vw;
      height: 100px;
      background: $color;
      border-radius: 10px;
      animation: move_top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .message {
      margin-top: 10px;
      font-family: "Microsoft YaHei";
      font-size: 15px;
      line-height: 20px;
      animation: move_top 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }
  .statistics_box {
    width: 100%;
    font-family: "Microsoft YaHei";
    font-size: 30px;
    font-weight: 800;
    margin-top: 20px;
    z-index: 1;
    color: $item_color;
    animation: move_top 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    p {
      color: $p;
    }
    .topic_count {
      margin-right: 150px;
      margin-bottom: 30px;
    }
    .rectangle_2 {
      width: 0.7vw;
      height: 100%;
      margin: 0 auto;
      background-color: $color;

      border-radius: 10px;
    }
    .visit_count {
      margin-left: 150px;
      margin-bottom: 30px;
    }
  }
  .content {
    z-index: 1;

    .class_box {
      width: 70%;
      margin: 20px auto 0 auto;
      gap: 10px;
      flex-wrap: wrap;
      .item {
        width: 13em;
        height: 100px;
        border-radius: 10px;
        box-shadow: $item_shadow 2px 3px 10px;
        background: $item_bg;
        color: $item_color;
        font-weight: bold;
        overflow: hidden;
        animation: move_top 2.4s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
          &::after {
            transform: scale(1.4);
          }
          &::before {
            transform: translateY(20px);
          }
        }
        &::after {
          content: "";
          position: absolute;
          width: 4em;
          height: 4em;
          background: $item_af_bg;
          border-radius: 50%;
          right: -0.4em;
          top: -0.6em;
          transition: all 4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &::before {
          content: "";
          position: absolute;
          width: 4em;
          height: 4em;
          background: $item_bf_bg;
          border-radius: 50%;
          right: -1em;
          top: 0em;
          transition: all 4s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
    }
  }
}
@keyframes move_bottom {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes move_top {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
