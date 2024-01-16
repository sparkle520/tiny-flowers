<!-- @Author: LT -->
<!-- @Date: 2024-01-05 23:20:31 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted,watch } from "vue";
import { useRouter } from "vue-router";
import data from "/src/assets/config/data.js"
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  change_theme(props.theme)
});



const topic_data = {
  topic_count: data.data.length,
  visit_count: 100,
};
const classification = [
  {name:'学习笔记'},
  {name:'技术分享'},
  {name:'生活随想'},
  {name:'二次元'},
]
const to_topic_list = (name)=>{
router.push('/unknownWorldMap/list/'+name+'/1')
}
const props = defineProps({
  theme: Boolean,
});
watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
//change scss var 
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    //night
    c_c("--bg_color", "#1e2433");
    c_c("--color", "#e3eae1");
    c_c("--p", "#e3eae1");
    c_c("--decorate_bg_1", "#e3eae1");
    c_c("--decorate_bg_2", "#e3eae1");
    c_c("--decorate_bg_3", "#ffff");
    c_c("--item_bg", "#242b3d");   
    c_c("--item_shadow", "#242b34");
    c_c("--item_color", "#f0e6e4");
    c_c("--item_bf_bg", "#d2c3d522");
    c_c("--item_af_bg", "#94709b");
  } else {
    c_c("--bg_color", "#f7f3f5");
    c_c("--color", "#262220");
    c_c("--p", "#705547");
    c_c("--decorate_bg_1", "#f0681e");
    c_c("--decorate_bg_2", "#ed8262");
    c_c("--decorate_bg_3", "#f89d8a");
    c_c("--item_bg", "#fffbf9");
    c_c("--item_shadow", "#ff7b005b");
    c_c("--item_color", "#f0681e");
    c_c("--item_bf_bg", "#4d678233");
    c_c("--item_af_bg", "#99d0d9");
  }
}
</script>
<template>
  <div id="main" class="relative">
    <div class="decorate flex align_items_center">
      <span>
        I dreamed of a world so far from here that's not on the map.
      </span>
    </div>
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
        {{topic_data.topic_count  }}
      </div>
      <div class="absolute rectangle_2"></div>
      <div class="visit_count flex flex_direction_column align_items_center">
        <p>访问</p>
        {{ topic_data.visit_count }}
      </div>
    </div>
    <div class="content width_full relative flex flex_direction_column">
     <div class="class_box  flex flex_direction_row justify_content_center">
      <div @click="to_topic_list(item.name)" v-for="(item,index) in classification" class="relative item flex align_items_center justify_content_center">
        {{ item.name }}
      </div>
     </div>
    </div>
    <!-- <Pagination
      @page_change="page_handle"
      class="pagination absolute"
      :data="page_data"
    ></Pagination> -->
  </div>
</template>
<style lang="scss" scoped>
#main {
  $bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #262220);
$p: var(--p, #705547);
$decorate_bg_1: var(--decorate_bg_1, #f0681e);
$decorate_bg_2: var(--decorate_bg_2, #ed8262);
$decorate_bg_3: var(--decorate_bg_3, #f89d8a);
$item_bg: var(--item_bg, #fffbf9);
$item_shadow: var(--item_shadow, #91919127);
$item_color: var(--item_color, #f0681e);
$item_bf_bg: var(--item_bf_bg, #4d678233);
$item_af_bg: var(--item_af_bg, #99d0d9);
  width: 100%;
  background: $bg_color;
  min-height: 100vh;
  .decorate {
    position: absolute;
    width: 2vw;
    height: 100%;
    right: 9%;
    color: $bg_color;
    writing-mode: vertical-rl;
    z-index: 0;
    background: linear-gradient(
      to bottom,
      $decorate_bg_1 10%,
      $decorate_bg_2 40%,
      $decorate_bg_3 60%,
      transparent 100%
    );
    span{
      font-weight: 900;
      margin-top: 1em;
      letter-spacing: .2em;
    }
  }

  .top_title {
    margin-top: 70px;
    font-size: 50px;
    font-weight: 700;
    text-align: center;
    line-height: 55px;
    color: $color;
    z-index: 1;
    font-family: "STHupo", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    .rectangle_1 {
      width: 0.7vw;
      height: 100px;
      background: $color;
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
    color: $item_color;
    p {
      color: $p;
    }
    .topic_count {
      margin-right: 150px;
      margin-bottom: 30px;
    }
    .rectangle_2 {
      width: 0.7vw;
      height: 100%;
      left: 50%;
      background-color: $color;
      transform: translateX(-50%);
      border-radius: 10px;
    }
    .visit_count {
      margin-left: 150px;
      margin-bottom: 30px;
    }
  }
  .content {
    z-index: 1;
    margin-bottom: 100px;
    .class_box{
      width: 70%;
      margin: 20px auto;
      margin-bottom: 0;
      gap:10px;
      flex-wrap: wrap;
      .item{
        width: 13em;
        height: 100px;
        border-radius: 10px;
        box-shadow: $item_shadow 2px 3px 10px;
        background: $item_bg;
        color: $item_color;
        font-weight: bold;
        overflow: hidden;
        &:hover{
          &::after{
            transform: scale(1.4);
          }
          &::before{
            transform: translateY(20px);
          }
        }
        &::after{
          content: '';
          position: absolute;
          width: 4em;
          height: 4em;
          background: $item_af_bg;
          border-radius: 50%;
          right: -.4em;
          top: -.6em;
          transition:all  4s cubic-bezier(0.075, 0.82, 0.165, 1);

        }
        &::before{
          content: '';
          position: absolute;
          width: 4em;
          height: 4em;
          background: $item_bf_bg;
          border-radius: 50%;
          right: -1em;
          top: 0em;
          transition:all  4s cubic-bezier(0.075, 0.82, 0.165, 1);

        }
      }
    }
    .topic {
      width: 40%;
      margin: 20px auto;
    }
  }
  .pagination {
    width: 70%;
    z-index: 1;
    left: 50%;
    height: 50px;
    transform: translateX(-50%);
    bottom: 40px;
    background: transparent;
  }
}
</style>
