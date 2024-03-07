<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:24 -->
<!-- @Description:  -->

<script setup>
import { onBeforeMount, ref, onMounted, nextTick, onUnmounted } from "vue";
import { useUserStore } from "/src/store/user.js";
import { useTopicStore } from "/src/store/topic.js";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import c_c from "@/assets/js/utils.js";
import emitter from "@/assets/config/mitt_bus.js";
import Gitalk from "gitalk";
const { params } = useRoute();
const router = useRouter();

import { useConfigStore } from "../store/config";
const config_store = useConfigStore();
const user_store = useUserStore();
const topic_store = useTopicStore();
onBeforeMount(() => {});
onUnmounted(() => {
  emitter.off("note_data");
});
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const data = ref();
const link_pre = "https://sparkle520.github.io/TinyFlowers/#";
const pre = ref();
const next = ref();
const init_pre_next = () => {
  const index = params.index - 1;
  if (index == 0) {
    pre.value = "--";
  } else {
    pre.value = data.value.directory_list[index - 1].name;
  }
  if (index == data.value.directory_list.length - 1) {
    next.value = "--";
  } else {
    next.value = data.value.directory_list[index + 1].name;
  }
};
onMounted(() => {
  change_theme(config_store.theme);

  emitter.on("note_data", (_data) => {
    data.value = _data;
    init_pre_next();
    let gitalk = new Gitalk({
      clientID: "429076372c73a03552c6",
      clientSecret: "e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",
      repo: "TinyFlowersComment",
      owner: "sparkle520",
      admin: ["sparkle520"],
      id: data.value.link, // 请确保你的 location 连接小于 50 个字符，否则，插件会生成失败
      language: "zh-CN",
      distractionFreeMode: false, // 专注模式
      proxy: "https://strong-caramel-969805.netlify.app/github_access_token",
    });
    gitalk.render("gitalk-container");
  });
});
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--topic_author_info_box_color", "#788086");
    c_c("--topic_author_info_box_bg", "#1e2433");
    c_c("--topic_author_info_inner_box_color", "#f5f5f5");
  } else {
    c_c("--topic_author_info_box_color", "#b0c4de");
    c_c("--topic_author_info_box_bg", "#f8f8ff");
    c_c("--topic_author_info_inner_box_color", "#78c1f8");
  }
};
</script>
<template>
  <div id="topic_bottom_main">
    <div class="note_context_switch_box flex flex_direction_row">
      <div
        class="note_switch_item flex flex_direction_column justify_content_center"
      >
        <div v-if="pre == '--'"></div>
        <div v-else>上一章</div>
        <div v-if="pre == '--'"></div>
        <div
          v-else
          @click="
            router.push(`/note/book/${params.id}/${parseInt(params.index) - 1}`)
          "
        >
          {{ pre }}
        </div>
      </div>
      <div
        class="note_switch_item flex flex_direction_column justify_content_center"
      >
        <div v-if="next == '--'"></div>
        <div v-else>下一章</div>
        <div v-if="next == '--'"></div>
        <div
          v-else
          @click="
            router.push(`/note/book/${params.id}/${parseInt(params.index) + 1}`)
          "
        >
          {{ next }}
        </div>
      </div>
    </div>
    <div id="gitalk-container"></div>
  </div>
</template>
<style lang="scss" scoped>
$topic_author_info_box_color: var(--topic_author_info_box_color, #b0c4de);
$topic_author_info_box_bg: var(--topic_author_info_box_bg, #f8f8ff);
$topic_author_info_inner_box_color: var(
  --topic_author_info_inner_box_color,
  #1e2433
);

#topic_bottom_main {
  width: 100%;
  img {
    box-shadow: none;
  }
  .note_context_switch_box {
    width: 96%;
    margin: 0 auto;
    border-radius: 10px;
    height: 12vh;
    box-shadow: #5a5a5a27 0px 3px 10px;
    .note_switch_item {
      width: 50%;
      height: inherit;
      div {
        margin-left: 10vh;
        margin-bottom: 1vh;
        transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:first-child {
          font-weight: 900;
          user-select: none;
        }
        &:last-child {
          color: #4e4840;
          font-size: 14px;
          user-select: none;
          font-weight: 900;
          &:hover {
            color: #00cbff;
          }
        }
      }
      &:first-child {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      &:last-child {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
  #gitalk-container {
    width: 90%;
    margin: 0 auto;
  }
  .topic_author_info_box {
    width: 90%;
    background: $topic_author_info_box_bg;
    border-radius: 5px;
    box-shadow: 0 0 5px $topic_author_info_box_color;
    font-weight: 900;
    margin: 2vh auto;
    color: $topic_author_info_box_color;
    .topic_author_info_inner_box {
      margin: 1.5vw;
      gap: 1vh;
    }
    span {
      color: $topic_author_info_inner_box_color;
      margin-left: 0.5vw;
    }
  }
}
</style>
