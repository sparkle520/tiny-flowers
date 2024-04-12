<!-- @Author: LT -->
<!-- @Date: 2024-01-29 04:33:30 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, nextTick ,onUnmounted} from "vue";
import { useRouter } from "vue-router";
import emitter from "@/assets/config/mitt_bus.js";

const router = useRouter();
onBeforeMount(() => {});
const data = ref();
onUnmounted(()=>{
    emitter.off("topic_data")
})
onMounted(() => {
  emitter.on("topic_data", (_data) => {
    data.value = _data;
    const topic_top_main = document.querySelector("#topic_top_main");
    const topic_title = document.querySelector(".topic_title");
    const topic_create_date = document.querySelector(".topic_create_date");
    const topic_update_date = document.querySelector(".topic_update_date");
    const topic_time = document.querySelector(".topic_time");
    const img_list = document.querySelectorAll(".topic_content img");
    const topic_classification = document.querySelector(
      ".topic_classification"
    );
    const topic_tag_box = document.querySelector(".topic_tag_box");
    if (
      data.value.topic_data.img == undefined ||
      data.value.topic_data.img == ""
    ) {
        topic_top_main.style.backgroundImage = `url(https://pic.imgdb.cn/item/65a3e060871b83018a64b716.jpg)`;
    } else {
        topic_top_main.style.backgroundImage = `url(${data.value.topic_data.img})`;
    }
    if (
      data.value.topic_data.title == undefined ||
      data.value.topic_data.title == ""
    ) {
      topic_title.innerHTML = `未知错误`;
    } else {
      topic_title.innerHTML = data.value.topic_data.title;
    }
    if (
      data.value.topic_data.create_date == undefined ||
      data.value.topic_data.create_date == ""
    ) {
      topic_create_date.innerHTML = ''
      topic_create_date.innerHTML = `未知错误`;
    } else {
      topic_create_date.innerHTML = ''
      topic_create_date.innerHTML += `发表于${data.value.topic_data.create_date.split("?")[0]}-${
        data.value.topic_data.create_date.split("?")[1]
      }-${data.value.topic_data.create_date.split("?")[2]}`;
    }
    if (
      data.value.topic_data.update_date == undefined ||
      data.value.topic_data.update_date == ""
    ) {
      topic_update_date.style.display = "none";
    } else {
      topic_update_date.style.display = "block";
      topic_update_date.innerHTML = ''
      topic_update_date.innerHTML += `更新于${data.value.topic_data.create_date.split("?")[0]}-${
        data.value.topic_data.create_date.split("?")[1]
      }-${data.value.topic_data.create_date.split("?")[2]}`;
    }
    if (
      data.value.topic_data.create_date == undefined ||
      data.value.topic_data.create_date == ""
    ) {
        topic_time.innerHTML = ''
      topic_time.innerHTML = `未知错误`;
    } else {
        topic_time.innerHTML  = ''
      topic_time.innerHTML += `${data.value.topic_data.create_date.split("?")[3]}`;
    }
    if (
      data.value.topic_data.classification == undefined ||
      data.value.topic_data.classification == ""
    ) {
        topic_classification.innerHTML = ''
      topic_classification.innerHTML = `未知错误`;
    } else {
        topic_classification.innerHTML = ''
      topic_classification.innerHTML += `${data.value.topic_data.classification}`;
    }
    if (
      data.value.topic_data.tags == undefined ||
      data.value.topic_data.tags == ""
    ) {
        topic_tag_box.innerHTML = ''
      topic_tag_box.innerHTML = `未知错误`;
    } else {
        topic_tag_box.innerHTML = ''
      data.value.topic_data.tags.split("?").forEach((element) => {
        topic_tag_box.innerHTML += `<span style=" font-size: 1em;
      background: rgb(  ${Math.floor(Math.random() * 256)},  ${Math.floor(
          Math.random() * 256
        )},  ${Math.floor(Math.random() * 256)});
      padding: 5px 6px;
      border-radius: 5px;
    ">#${element}</span>`;
      });
    }
  });
});
</script>
<template>
  <div
    id="topic_top_main"
    class="relative flex align_items_center justify_content_center"
  >
    <div class="flex flex_direction_column topic_info_box align_items_center justify_content_center">
      <span class="topic_title"></span>
      <div class="flex flex_direction_row">
        <div class="topic_create_date"></div>
        <div class="topic_update_date"></div>
        <div class="topic_visit">访问<span id="busuanzi_value_site_pv"></span></div>
        <span class="topic_time"></span>
        <span class="topic_classification"></span>
      </div>
      <div
        class="topic_tag_box flex flex_direction_row justify_content_center"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  $normal_color: var(--normal_color, #0f1828);

#topic_top_main {
  width: 80vw;
  margin: 0 auto;
   height: 40vh;
  border-radius: 10px;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 90px;
  background-position: center center;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  animation: topic_top_bg 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  @keyframes topic_top_bg {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .topic_info_box {
    width: 86vw;
    height: 40vh;
    word-wrap: break-word;
    animation: topic_top_bg 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    z-index: 1;
    color: #ffff;

    .topic_title {
      max-width: 80vw;
      line-height: 1em;
      text-align: center;
      margin-top: 15vh;
      font-size: 3em;
      color: #ffffff;
      text-shadow: #0f1828 2px 10px 10px;
      width: 86vw;
    }
    .topic_create_date {
      margin: 16px 0;
      font-size: 1em;
      background: #7b68ee;
      padding: 5px 6px;
      border-radius: 5px;
      margin-right: 0.4vw;
    }
    .topic_update_date{
      margin-top: 16px 0;
      font-size: 1em;
      
      background: #12710d;
      padding: 5px 6px;
      border-radius: 5px;
      margin-right: 0.4vw;
    }
    .topic_visit{
      margin: 16px 0;
      font-size: 1em;
      background: #973011;
      padding: 5px 6px;
      border-radius: 5px;
      margin-right: 0.4vw;
    }
    .topic_time {
      margin: 16px 0;
      font-size: 1em;
      background: #993255;
      padding: 5px 6px;
      margin-right: 0.4vw;
      border-radius: 5px;
    }
    .topic_classification {
      margin: 16px 0;
      font-size: 1em;
      background: #ff6b00;
      padding: 5px 6px;
      border-radius: 5px;
    }
    .topic_tag_box {
      width: 60vw;
      margin-top: auto;
      margin-bottom: 16px;
      overflow: scroll;
      flex-wrap: wrap;
      gap: 0.4vw;
          }
  }
}
</style>
