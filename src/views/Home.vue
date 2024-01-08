<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});
const welcome_message = "欢迎访问我的私人博客";
const data = {
  date: "1月6号?2024?7:06",
  link: "/unknownWorldMap/topic/1",
  img: "weatheringwithyou",
  title: "Weathering With you(经典语录)",
  short_message: "「彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了"
};
const carousel_data = [
  // {link:''},
  {link:'https://pic.imgdb.cn/item/659c09de871b83018ad377cb.png'},
  {link:'https://pic.imgdb.cn/item/659bfbbb871b83018a8863a4.png'},
  {link:'https://pic.imgdb.cn/item/659c0a3a871b83018ad5736f.png'},
  {link:'https://pic.imgdb.cn/item/659bfd7e871b83018a917e4b.png'},
]
</script>
<template>
  <div id="main">
    <div class="content flex flex_direction_column">
      <div class="carousel relative">
        <!-- <video
          autoplay
          loop
          muted
          src="/src/assets/video/weatheringwithyou.mp4"
        ></video> -->
        <Carousel :data="carousel_data"></Carousel>
      </div>
      <div class="welcome_box width_full flex justify_content_center">
        <span class="relative striking_title_orange">
          {{ welcome_message }}
        </span>
      </div>
      <div class="rectangle_1"></div>

      <div class="topic_box flex flex_direction_column align_items_center">
        <Topic :data="data" class="topic"></Topic>
      </div>
    </div>
    <div class="foot">

    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  background: #f7f3f5;

  .content {
    background: #f7f3f5;
    .carousel {
      margin: 10px auto;
      margin-top: 40px;
    }
    .welcome_box {
      margin: 30px 0;
    }
    .rectangle_1 {
      width: 10px;
      height: 100px;
      background: #f0681e;
      border-radius: 10px;
      margin: 0 auto;
    }
    .topic_box {
      width: 80%;
      margin: 0 auto;
      .topic {
        width: 60%;
        margin: 20px 0;
      }
    }
  }
  .foot{
    width: 100%;
    height: 80px;
    margin-top: 100px;
    background: #f0671e3a;
  }
}
</style>
