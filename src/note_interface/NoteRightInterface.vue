<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:58 -->
<!-- @Description:  -->

<script setup>
import {  onBeforeMount, onMounted } from "vue";
import { useUserStore } from "/src/store/user.js";
import { useTopicStore } from "/src/store/topic.js";
import Directory from '/src/component/Directory.vue'
import { useConfigStore } from "../store/config";
import { useNoteStore } from "../store/note";
const config_store = useConfigStore();
const user_store = useUserStore();
const topic_store = useTopicStore();
const note_store = useNoteStore();
onBeforeMount(() => {});
onMounted(() => {
  change_layout(config_store.layout);
});
config_store.$subscribe((mutation, state) => {
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

</script>
<template>
  <div id="topic_right_main">
    <div
      class="personal_item intro f f_d_c a_c"
    >
      <img :src="user_store.avatar" alt="" />
      <span class="personal_name" v-text="user_store.name"></span>
      <span class="personal_signature" v-text="user_store.signature"></span>
      <div class="topic_class_box f f_d_r">
        <div
          class="topic_classification_total_box f f_d_c a_c"
        >
          <h3>文章</h3>
          <span v-text="topic_store.length()"></span>
        </div>
        <div
          class="topic_classification_total_box f f_d_c a_c"
        >
          <h3>分类</h3>
          <span>3</span>
        </div>
        <div
          class="topic_classification_total_box f f_d_c a_c"
        >
          <h3>笔记</h3>
          <span>{{note_store.data.length}}</span>
        </div>
      </div>
    </div>
    <Directory class="directory"></Directory>
  </div>
</template>
<style lang="scss" scoped>

#topic_right_main {
  width: 284px;
  min-height: 100vh;
  
  .personal_item {
    width: inherit;
    background-color: $fill;
    border-radius: 5px;
    box-shadow: $fill_shadow 1px 1px 5px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 30px;
    margin-bottom: 20px;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  }
  .intro {
    img {
      width: 118px;
      height: 118px;
      border-radius: 50%;
      margin: 16px 0;
      box-shadow: none;
      border: $fill_shadow 2px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 1.5em;
      font-weight: 900;
      color: $text;
    }
    .personal_signature {
      margin: 20px 0;
      color: $text;
      font-size: .9em;
    }
    .topic_class_box{
      width: 70%;
    }
    .topic_classification_total_box {
      width: 33.333%;
      h3 {
        color:$primary_mix_2;
        margin: 0;
        font-size: 17px;
      }
      span {
        color: $text;

        font-size: 14px;
        margin-top: 20px;
        font-weight: 900;
      }
    }
  }

}
@keyframes move_left {
  0% {
    transform: translateX(100px) scale(1);
  }
  100% {
    transform: translateX(0px) scale(1);
  }
}
@media (max-width: 600px) {
  #topic_right_main{
    display: none;
    width: 0;
  }
  .directory{
    display: none;
  }
  .personal_item{
    display: none;
  }
}
</style>
