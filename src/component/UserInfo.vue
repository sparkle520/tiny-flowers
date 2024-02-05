<!-- @Author: LT -->
<!-- @Date: 2024-02-02 01:18:15 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTopicStore } from "/src/store/topic.js";
import { useUserStore } from "/src/store/user.js";
import emitter from "@/assets/config/mitt_bus.js";
import change_theme from "@/assets/theme/TopicList.js";

const { params } = useRoute();
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const user_store = useUserStore();
const { theme } = storeToRefs(config_store);
const router = useRouter();
onBeforeMount(() => {
})
onMounted(() => {
})

</script>
<template>
    <div id="user_info_main">
        <div
          class="personal_item intro flex relative flex_direction_column align_items_center"
        >
          <img
            class="avatar_bg absolute"
            src="https://pic.imgdb.cn/item/65a9840f871b83018a77d214.jpg"
            alt=""
          />
          <img :src="user_store.avatar" class="z_index_10" alt="" />
          <span
            class="personal_name z_index_10"
            v-text="user_store.name"
          ></span>
          <span class="personal_signature" v-text="user_store.signature"></span>
          <div class="width_full flex flex_direction_row">
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
              <span v-text="personal_info.classification_total"></span>
            </div>
          </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
#user_info_main {
    width: 100%;
    .personal_item {
    width: 100%;
    background-color: $item_bg;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 5px;
    box-shadow: $item_shadow 2px 3px 10px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
  .intro {
    .avatar_bg {
      top: 0;
      margin: 0;
      object-fit: cover;
     border-radius: 5px;

      z-index: 0;
      width: 20vw;
      height: 20vh;
      pointer-events: none;
      opacity: 0.9;
      border: none;
    }
    img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      margin: 10vh auto 0vh 1vw;
      border: $item_shadow 2px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 1.4em;
      font-weight: 900;
      color: $color;
      transform: translateY(-4vh);
      margin-left: auto;
      margin-right: 4vw;
    }
    .personal_signature {
      margin: 0 0 3vh 0;
      font-size: 0.9em;
      color: $color;
    }
    .topic_classification_total_box {
      width: 50%;
      h3 {
        color: $topic_classification_color;
        margin: 0;
        font-size: 1.2em;
      }
      span {
        color: $topic_classification_num_color;

        font-size: 1.2em;
        margin-top: 2vh;
        font-weight: 900;
      }
    }
  }
}
</style>