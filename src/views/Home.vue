<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
import Topic from "/src/component/TopicBox.vue";
onBeforeMount(() => {});
onMounted(() => {});
const welcome_message = "欢迎访问我的私人博客";
const data = {
  date: "1月6号?2024?7:06",
  link: "sssss",
  img: "`/src/assets/imgs/weatheringwithyou.png`",
  title: "Weathering With you(经典语录)",
  short_message: "「彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了"
};
</script>
<template>
  <div id="main">
    <div class="content flex flex_direction_column">
      <div class="show_yourself_box relative">
        <!-- <video
          autoplay
          loop
          muted
          src="/src/assets/video/weatheringwithyou.mp4"
        ></video> -->
        <img src="/src/assets/imgs/miku_1.png" alt="" />
      </div>
      <div class="welcome_box width_full flex justify_content_center">
        <span class="relative striking_title_orange">
          {{ welcome_message }}
        </span>
      </div>
      <div class="topic_box flex flex_direction_column align_items_center">
        <Topic :data="data" class="topic"></Topic>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  margin-left: 0px;
  .content {
    .show_yourself_box {
      width: 100%;
      height: 450px;
      box-shadow: -6px 6px 8px -4px rgba(250, 254, 118, 0.75),
        6px 6px 8px -4px rgba(254, 159, 50, 0.75);
      overflow: hidden;
      img {
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }
    .welcome_box {
      margin: 20px 0;
    }
    .topic_box {
      width: 100%;
      .topic {
        width: 60%;
        margin: 20px 0;

      }
    }
  }
}
</style>
