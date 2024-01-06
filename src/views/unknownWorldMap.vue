<!-- @Author: LT -->
<!-- @Date: 2024-01-05 23:20:31 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});
const data = ref({
  topic_count: 1,
  visit_count: 1,
});
</script>
<template>
  <div id="main">
    <div
      class="top_title flex align_items_center justify_content_center flex_direction_column"
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
    <div class="statistics_box flex flex_direction_row justify_content_center relative">
      <div class="topic_count flex flex_direction_column align_items_center">
        <p>文章</p>
        {{ data.topic_count }}
      </div>
      <div class="absolute rectangle_2">
      </div>
      <div class="visit_count flex flex_direction_column align_items_center">
        <p>访问</p>
        {{ data.visit_count }}
      </div>
      <div class="content">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  background: #f7f3f5;

  .top_title {
    margin-top: 20px;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    line-height: 55px;
    color: #262220;
    font-family: "STHupo", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    .rectangle_1 {
      width: 10px;
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
    color: #f0681e;
    p{
      color: #705547;
    }
    .topic_count{
      margin-right: 150px;
      margin-bottom: 30px;
    }
    .rectangle_2{
      width: 10px;
      height: 100%;
      left: 50%;
      background-color: #262220;
      transform: translateX(-50%);
      border-radius: 10px;

    }
    .visit_count{
      margin-left: 150px;
      margin-bottom: 30px;

    }
  }
}
</style>
