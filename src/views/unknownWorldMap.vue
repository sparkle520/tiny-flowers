<!-- @Author: LT -->
<!-- @Date: 2024-01-05 23:20:31 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});

const page_data = ref({
    total: 1,
    current_index: 1,
})
const page_handle = (page_index) =>{
  console.log(page_index);
}
const topic_data = {
  topic_count: 1,
  visit_count: 1,
  date: "1月6号?2024?7:06",
  link: "/unknownWorldMap/topic/1",
  img: "https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg",
  title: "Weathering With you(经典语录)",
  short_message: "「彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br>那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了"
};
</script>
<template>
  <div id="main" class="relative">
    <div class="decorate"></div>
    <div
      class="top_title relative flex align_items_center justify_content_center flex_direction_column"
    >
      UNKNOWN<br />WORLD<br />MAP
      <div class="rectangle_1"></div>
      <div class="message">
        If only our voices speak at night.<br />
        Could ever reach the very edge of this world and the time<br />
        Instead of fading into air and dust.<br />
        Then what will the words could ever be<br />
        For all these words from probably.
      </div>
    </div>
    <div
      class="statistics_box relative flex flex_direction_row justify_content_center relative"
    >
      <div class="topic_count flex flex_direction_column align_items_center">
        <p>文章</p>
        {{ topic_data.topic_count }}
      </div>
      <div class="absolute rectangle_2"></div>
      <div class="visit_count flex flex_direction_column align_items_center">
        <p>访问</p>
        {{ topic_data.visit_count }}
      </div>
    </div>
    <div class="content relative flex flex_direction_column">
      <Topic :data="topic_data" class="topic"></Topic>
      <Topic :data="topic_data" class="topic"></Topic>
      <Topic :data="topic_data" class="topic"></Topic>
      <Topic :data="topic_data" class="topic"></Topic>
    </div>
    <Pagination @page_change="page_handle" class="pagination absolute" :data="page_data"></Pagination>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  background: #f7f3f5;
  .decorate{
    content: '';
    position: absolute;
    width: 2vw;
      height: 100%;
    right: 9%;
    z-index: 0;
    background: linear-gradient(to bottom,#f0681e 10%,#ed8262 40%,#f89d8a 60%,transparent 100%);
  }

  .top_title {
    margin-top: 20px;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    line-height: 55px;
    color: #262220;
    z-index: 1;
    font-family: "STHupo", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    .rectangle_1 {
      width: .7vw;
      height: 150px;
      background: #262220;
      border-radius: 10px;
    }
    .message {
      margin-top: 10px;
      font-family: "Microsoft YaHei";
      font-size: 15px;
      line-height: 20px;
    }
  }
  .statistics_box {
    width: 100%;
    font-family: "Microsoft YaHei";
    font-size: 30px;
    font-weight: 800;
    margin-top: 20px;
    z-index: 1;
    color: #f0681e;
    p {
      color: #705547;
    }
    .topic_count {
      margin-right: 150px;
      margin-bottom: 30px;
    }
    .rectangle_2 {
      width: .7vw;
      height: 100%;
      left: 50%;
      background-color: #262220;
      transform: translateX(-50%);
      border-radius: 10px;
    }
    .visit_count {
      margin-left: 150px;
      margin-bottom: 30px;
    }
  }
  .content{
    z-index: 1;
    margin-bottom: 100px;
    .topic{
      width: 40%;
        margin: 20px auto;
    }
  }
  .pagination{
    width: 70%;
    z-index: 1;
    left:50%;
    height: 50px;
    transform: translateX(-50%);
    bottom: 40px;
    background: transparent;
  }
}
</style>