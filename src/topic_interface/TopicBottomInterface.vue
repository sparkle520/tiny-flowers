<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:24 -->
<!-- @Description:  -->

<script setup>
import { onBeforeMount, ref, onMounted, nextTick, onUnmounted } from "vue";
import { useUserStore } from "/src/store/user.js";
import { useTopicStore } from "/src/store/topic.js";
import Gitalk from "gitalk";

import { useConfigStore } from "../store/config";
const config_store = useConfigStore();
const user_store = useUserStore();
const topic_store = useTopicStore();
onBeforeMount(() => {
  props.value = topic_store.data[topic_store.current_topic_index]
});
onUnmounted(() => {
});

topic_store.$subscribe((mutation, state) => {
});
const props =ref({
  id: 2,
  title: '未知错误',
  link: '未知错误',
  create_date: '未知错误',
  img: 'https://pic.imgdb.cn/item/66746ba6d9c307b7e9af3651.png',
  author: '',
  tags: '未知错误',
  classification: '未知错误',
  short_message: '未知错误',
  update_date: '未知错误',
  is_visible: true
})
const link_pre = "https://sparkle520.top/#";
onMounted(() => {

    const topic_author = document.querySelector(".topic_author");
    const topic_link = document.querySelector(".topic_link");
    if (
      props.value.author == ""
    ) {
      topic_author.innerHTML = user_store.name;
    } else {
      topic_author.innerHTML = `${props.value.author}`;
    }
      topic_link.innerHTML = `${link_pre}${props.value.link}`;
    
    let gitalk = new Gitalk({
      clientID: "429076372c73a03552c6",
      clientSecret: "e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",
      repo: "TinyFlowersComment",
      owner: "sparkle520",
      admin: ["sparkle520"],
      id: props.value.link, // 请确保你的 location 连接小于 50 个字符，否则，插件会生成失败
      language: "zh-CN",
      distractionFreeMode: false, // 专注模式
      proxy: "https://strong-caramel-969805.netlify.app/github_access_token",
    });
    gitalk.render("gitalk-container");
});

</script>
<template>
  <div id="topic_bottom_main">
    <div class="topic_author_info_box f">
      <div class="topic_author_info_inner_box f f_d_c">
        <div>文章作者:<span class="topic_author"></span></div>
        <div>文章链接:<span class="topic_link"></span></div>
      </div>
    </div>
    <div id="gitalk-container"></div>
  </div>
</template>
<style lang="scss" scoped>


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
    background: $fill;
    border-radius: 4px;
    box-shadow: 0 0 5px $fill_shadow;
    font-weight: 900;
    margin: 2vh auto;
    color: $primary;
    .topic_author_info_inner_box {
      margin: 1.5vw;
      gap: 1vh;
    }
    span {
      color: $text_link;
      margin-left: 0.5vw;
    }
    .topic_link {
      text-decoration: underline;
    }
  }
}
@media (max-width: 600px) {
  #topic_bottom_main {
  width: calc(100vw - 20px);
  img {
    box-shadow: none;
  }
  #gitalk-container {
    width: 90%;
    margin: 0 auto;
  }
  .topic_author_info_box {
    width: calc(100vw - 28px);
    background: $fill;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 0 0 5px $fill_shadow;
    font-weight: 900;
    margin: 8px auto;
    color: $primary;
    .topic_author_info_inner_box {
      margin: 8px;
      gap: 4px;
    }
    span {
      color: $text_link;
      word-break: break-all;
      font-size: 12px;
      margin-left: 4px;
    }
    .topic_link {
      text-decoration: underline;
    }
  }
}
}
</style>
