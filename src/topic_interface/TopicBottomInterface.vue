<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:24 -->
<!-- @Description:  -->

<script setup>
import { onBeforeMount, ref, onMounted, nextTick, onUnmounted } from "vue";
import { useUserStore } from "/src/store/user.js";
import { useTopicStore } from "/src/store/topic.js";
import c_c from "@/assets/js/utils.js";
import emitter from "@/assets/config/mitt_bus.js";
import Gitalk from "gitalk";

import { useConfigStore } from "../store/config";
const config_store = useConfigStore();
const user_store = useUserStore();
const topic_store = useTopicStore();
onBeforeMount(() => {});
onUnmounted(() => {
  emitter.off("topic_data");
});
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const data = ref();
const link_pre = "https://sparkle520.github.io/TinyFlowers/#";
onMounted(() => {
  change_theme(config_store.theme);

  emitter.on("topic_data", (_data) => {
    data.value = _data;
    const topic_author = document.querySelector(".topic_author");
    const topic_link = document.querySelector(".topic_link");
    if (
      data.value.topic_data.author == undefined ||
      data.value.topic_data.author == ""
    ) {
      topic_author.innerHTML = user_store.name;
    } else {
      topic_author.innerHTML = `${data.value.topic_data.author}`;
    }
    if (
      data.value.topic_data.link == undefined ||
      data.value.topic_data.link == ""
    ) {
      topic_link.innerHTML = "未知错误";
    } else {
      topic_link.innerHTML = `${link_pre}${data.value.topic_data.link}`;
    }
    let gitalk = new Gitalk({
      clientID: "429076372c73a03552c6",
      clientSecret: "e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",
      repo: "TinyFlowersComment",
      owner: "sparkle520",
      admin: ["sparkle520"],
      id: data.value.topic_data.link, // 请确保你的 location 连接小于 50 个字符，否则，插件会生成失败
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
    <div class="topic_author_info_box flex">
      <div class="topic_author_info_inner_box flex flex_direction_column">
        <div>文章作者:<span class="topic_author"></span></div>
        <div>文章链接:<span class="topic_link"></span></div>
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
    .topic_link {
      text-decoration: underline;
    }
  }
}
</style>
