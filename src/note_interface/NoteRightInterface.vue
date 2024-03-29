<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:58 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "/src/store/user.js";
import { useTopicStore } from "/src/store/topic.js";
import c_c from "@/assets/js/utils.js";
import Directory from '/src/component/Directory.vue'
import { useConfigStore } from "../store/config";
import { useNoteStore } from "../store/note";
const config_store = useConfigStore();
const user_store = useUserStore();
const topic_store = useTopicStore();
const note_store = useNoteStore();
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  change_theme(config_store.theme);
  change_layout(config_store.layout);
});
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
const change_layout = (current_layout) => {
  const topic_right_main = document.querySelector("#topic_right_main");
  if (current_layout) {
    topic_right_main.style.display = "block";
  } else {
    topic_right_main.style.display = "none";
  }
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--bg_color", "#0b0e14");
    c_c("--color", "#f7f7f7");
    c_c("--item_bg", "#242b3d");
    c_c("--item_shadow", "#242b34");
    c_c("--topic_classification_color", "#5e6d78");
    c_c("--topic_classification_num_color", "#b5b9d6");
  } else {
    c_c("--bg_color", "#f7f3f5");
    c_c("--color", "#4d4949");
    c_c("--item_bg", "#fff");
    c_c("--item_shadow", "#cacaca4f");
    c_c("--topic_classification_color", "#216eba");
    c_c("--topic_classification_num_color", "#4d4949");
  }
};
</script>
<template>
  <div id="topic_right_main">
    <div
      class="personal_item intro flex flex_direction_column align_items_center"
    >
      <img :src="user_store.avatar" alt="" />
      <span class="personal_name" v-text="user_store.name"></span>
      <span class="personal_signature" v-text="user_store.signature"></span>
      <div class="topic_class_box flex flex_direction_row">
        <div
          class="topic_classification_total_box flex flex_direction_column align_items_center"
        >
          <h3>文章</h3>
          <span v-text="topic_store.length()"></span>
        </div>
        <div
          class="topic_classification_total_box flex flex_direction_column align_items_center"
        >
          <h3>分类</h3>
          <span>3</span>
        </div>
        <div
          class="topic_classification_total_box flex flex_direction_column align_items_center"
        >
          <h3>笔记</h3>
          <span>{{note_store.data.length}}</span>
        </div>
      </div>
    </div>
    <Directory></Directory>
  </div>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #000000);
$item_bg: var(--item_bg, #ffffff6c);
$item_shadow: var(--item_shadow, #cacaca4f);
$topic_classification_color: var(--topic_classification_color, #41a8a8);
$topic_classification_num_color: var(--topic_classification_num_color, #e06530);
#topic_right_main {
  width: 21vw;
  .personal_item {
    width: inherit;
    background-color: $item_bg;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 5px;
    box-shadow: $item_shadow 2px 3px 10px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
  .intro {
    img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      margin: 2vh 0;
      box-shadow: none;
      border: $item_shadow 2px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 1.5em;
      font-weight: 900;
      color: $color;
    }
    .personal_signature {
      margin: 20px 0;
      color: $color;
      font-size: .9em;
    }
    .topic_class_box{
      width: 70%;
    }
    .topic_classification_total_box {
      width: 33.333%;
      h3 {
        color: $topic_classification_color;
        margin: 0;
        font-size: 17px;
      }
      span {
        color: $topic_classification_num_color;

        font-size: 14px;
        margin-top: 20px;
        font-weight: 900;
      }
    }
  }

}
</style>
