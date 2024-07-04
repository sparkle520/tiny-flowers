<!-- @Author: LT -->
<!-- @Date: 2024-01-29 04:33:30 -->
<!-- @Description:  -->

<script setup>
import {  ref, onBeforeMount, onMounted, nextTick ,onUnmounted, watch} from "vue";
import { useTopicStore } from "../store/topic";
const topic_store = useTopicStore();


onBeforeMount(() => {
  props.value = topic_store.data[topic_store.current_topic_index]
});
onUnmounted(()=>{
})
onMounted(() => {
  
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
</script>
<template>
  <div
    id="topic_top_main"
    class="r f a_c j_c_c"
  >
  <img  :src="props.img" class="a t_t_img" alt="">
  <!-- <div class="topic_title r" v-html="props.title"></div> -->

    <div class="f f_d_c topic_info_box a_c j_c_c">
      <!-- <div class="f f_d_r">
        <div class="topic_create_date"></div>
        <div class="topic_update_date"></div>
        <div class="topic_visit">访问<span id="busuanzi_value_site_pv"></span></div>
        <span class="topic_time"></span>
        <span class="topic_classification"></span>
      </div> -->
      <!-- <div
        class="topic_tag_box f f_d_r j_c_c"
      ></div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
  // $normal_color: var(--normal_color, #0f1828);

#topic_top_main {
  width: 1100px;
  margin: 0 auto;
   height: 378px;
  border-radius: 4px;
  margin-top: 90px;
  transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  animation: topic_top_bg 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow:0 0 5px $fill_shadow;

  .t_t_img{
    width: inherit;
    height: inherit;
    object-fit: cover;
    border-radius: inherit;
  }
  .topic_title{
    font-size: 48px;
    font-weight: 900;
    padding: 16px 32px;
    z-index: 10;
    &::before{
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      // background: rgb(231, 228, 228);
      border-radius: 10px;
      filter: blur(20px);
    }
  }
  @keyframes topic_top_bg {
    0% {
      opacity: 0;
      transform:translateY(-50px);
    }
    100% {
      opacity: 1;
      transform:translateY(0);
    }
  }

 }
 @media (max-width: 600px) {
  #topic_top_main {
  width: 100vw;
  margin: 0 auto;
   height: 208px;
  border-radius: 4px;
  margin-top: 90px;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  animation: topic_top_bg 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  box-shadow:0 0 5px $fill_shadow;

  .t_t_img{
    width: inherit;
    height: inherit;
    object-fit: cover;
    border-radius: inherit;
  }
  .topic_title{
    font-size: 48px;
    font-weight: 900;
    padding: 16px 32px;
    z-index: 10;
    &::before{
      content: '';
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: -1;
      // background: rgb(231, 228, 228);
      border-radius: 10px;
      filter: blur(20px);
    }
  }
  @keyframes topic_top_bg {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

 }
 }
</style>
