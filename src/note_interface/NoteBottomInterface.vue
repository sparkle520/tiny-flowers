<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:24 -->
<!-- @Description:  -->

<script setup>
import { onBeforeMount, ref, onMounted, onUnmounted } from "vue";
import { useNoteStore } from "/src/store/note.js";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

import Gitalk from "gitalk";
const { params } = useRoute();
const router = useRouter();

import { useConfigStore } from "../store/config";
const config_store = useConfigStore();
const note_store = useNoteStore();
const data = ref({});
onBeforeMount(() => {
  data.value = note_store.get_note_by_id(params.id)
});
onUnmounted(() => {
});

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

</script>
<template>
  <div id="topic_bottom_main">
    <div class="note_context_switch_box f f_d_r">
      <div
        class="note_switch_item f f_d_c j_c_c"
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
        class="note_switch_item f f_d_c j_c_c"
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
    box-shadow: $fill_shadow 0px 3px 10px;
    .note_switch_item {
      width: 50%;
      height: inherit;
      div {
        margin-left: 32px;
        transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:first-child {
          font-weight: 900;
          user-select: none;
          margin-bottom: 8px;
        }
        &:last-child {
          color: $text_subtitle;
          font-size: 14px;
          user-select: none;
          font-weight: 900;
          &:hover {
            color: $primary;
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
  
}
</style>
