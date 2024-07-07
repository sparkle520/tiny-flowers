<!-- @Author: LT -->
<!-- @Date: 2024-02-17 21:01:46 -->
<!-- @Description:  -->

<script setup>
import {  onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useNoteStore } from "../store/note";
import { useUserStore } from "../store/user";

const note_store = useNoteStore();
const user_store = useUserStore();
const { params } = useRoute();

const router = useRouter();
const note_data = ref();
onBeforeMount(() => {
  note_data.value = note_store.get_note_by_id(params.id);
});
onMounted(() => {
  window.scrollTo(0, 0);
});
</script>
<template>
  <div id="note_info_main" class="r f f_d_c">
    <svg class="note_info_main_bg fixed" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 2400 800" opacity="1"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="sssurf-grad"><stop stop-color="hsl(208, 77%, 50%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(208, 74%, 93%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><g fill="url(#sssurf-grad)" transform="matrix(1,0,0,1,0,-1293.7449645996094)"><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,150)" opacity="0.05"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,300)" opacity="0.11"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,450)" opacity="0.17"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,600)" opacity="0.23"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,750)" opacity="0.29"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,900)" opacity="0.35"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1050)" opacity="0.41"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1200)" opacity="0.47"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1350)" opacity="0.53"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1500)" opacity="0.58"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1650)" opacity="0.64"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1800)" opacity="0.70"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,1950)" opacity="0.76"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,2100)" opacity="0.82"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,2250)" opacity="0.88"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,2400)" opacity="0.94"></path><path d="M 0 287.4899586871937 Q 200 581.9614480652971 266.6666666666667 296.958576876747 Q 466.6666666666667 570.7052342571067 533.3333333333334 301.96951019397613 Q 733.3333333333334 545.4657541974557 800 350.6556740451803 Q 1000.0000000000001 642.711840399194 1066.6666666666667 349.0564699988413 Q 1266.6666666666667 530.7868249264285 1333.3333333333335 294.1846422063475 Q 1533.3333333333333 507.28535269030385 1600 327.31141708354664 Q 1800 576.5075667778106 1866.6666666666667 314.2380294457312 Q 2066.666666666667 509.0996273549818 2133.3333333333335 358.110071936116 Q 2333.3333333333335 573.9164041993431 2400 332.1663346517331 L 2400 800 L 0 800 L 0 334.7162292875359 Z" transform="matrix(1,0,0,1,0,2550)" opacity="1.00"></path></g></svg>
    <div class="note_top_box f f_d_r r">
     
      <div class="note_top_inner_box f f_d_r">
        <div class="note_top_left_box r f a_c j_c_c">
          <img class="note_top_inner_box_img" v-if="note_data.img != ''" :src="note_data.img" alt="" />
          <img
            v-else
            src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg"
            class="note_top_inner_box_img"
            alt=""
          />
          <img class="note_top_inner_box_img_bg a" v-if="note_data.img != ''" :src="note_data.img" alt="" />
          <img
            v-else
            src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg" 
            class="note_top_inner_box_img_bg a"
            alt=""
          />
        </div>
        <div class="note_top_mid_box f f_d_c">
          <h1>{{ note_data.name }}</h1>
          <p>{{ note_data.short_message }}</p>
          <span>
            状态：<span v-if="!note_data.is_finished" class="load_status"
              >连载中...
            </span>
            <span v-else class="finished_status">已完结 </span></span
          >
          <span
            >更新时间：{{ note_data.update_date.split("?")[0] }}-{{
              note_data.update_date.split("?")[1]
            }}-{{ note_data.update_date.split("?")[2] }}
            {{ note_data.update_date.split("?")[3] }}</span
          >
          <span
            >作者：<span v-if="note_data.author != ''">{{
              note_data.author
            }}</span>
            <span v-else>{{ user_store.name }}</span></span
          >
          <span>分类：{{ note_data.classification }}</span>
          <span
            >标签：<span 
            :key="item"
            v-for="item in note_data.tags.split('?')"
              >{{ item }}&ensp;</span
            ></span
          >
          <button
            class="read_btn r"
            @click="router.push(`/note/book/${note_data.id}/1`)"
          >
            点击阅读
          </button>
        </div>
       
      </div>
    </div>
    <div class="note_directory_box f f_d_c r">
      <h1 class="r">目录</h1>
      <NoteDirectoryList
        :id="note_data.id"
        :data="note_data.directory_list"
        class="note_directory"
        col="3"
      ></NoteDirectoryList>
    </div>
  </div>
  <PageFoot></PageFoot>
</template>
<style lang="scss" scoped>
#note_info_main {
  width: max(1440px,100vw);
  min-height: 100vh;
  background: $fill_body;
 
font-family: 'misans';
.note_info_main_bg{
  width: 100vw;
    height: 100vh;
    opacity: .2;
    transform: scale(2);
  stop:first-child{
    stop-color: $primary;
  }
  stop:last-child{
    stop-color: $primary_mix_6;
  }
}
  .note_top_box {
    width: 1100px;
    overflow: hidden;
margin: 90px auto 32px auto;
border-radius: 10px;
background: $fill;
box-shadow: $fill_shadow  0 0 5px;
    .note_top_inner_box {
      z-index: 2;
      margin: 0 auto;
     gap: 32px;
      width: 1000px;
     
      height: calc(100% - 70px);
      .note_top_left_box {
        width: 268px;
        height: 342px;
        box-shadow: $fill_shadow 0px 0px 5px;
        margin: auto 0;
        border-radius: 10px;
        transform: translateY(-10px);
        .note_top_inner_box_img {
          top: 0;
          width: 268px;
          height: 342px;
          --n:4;
          --r:0deg;
          --d:0%;
          -webkit-mask:
    linear-gradient(var(--r), transparent var(--d), red 0 calc(100% - var(--d)), transparent 0),
    linear-gradient(calc(var(--r) + 90deg), transparent var(--d), red 0 calc(100% - var(--d)), transparent 0);
  -webkit-mask-size: calc(100%/var(--n)) calc(100%/var(--n));
  -webkit-mask-composite: source-in;
          margin: 7% 0;
          background: #ffff;
          border-radius: 10px;
          object-fit: cover;
          animation: note_top_inner_box_img 1s;
        }
        .note_top_inner_box_img_bg{
          width: 268px;
          height: 342px;
          filter:blur(20px) ;

        }
      }
      .note_top_mid_box {
        width: 600px;
        height: 100%;
        gap: 16px;
        h1 {
          color: $primary;
          margin: 0;
          margin-top: 5%;
          animation: to_top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        p {
          margin: 0;
          margin-bottom: 32px;
          color: $text;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        span {
          color: $text;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .load_status {
          font-weight: bold;
          color: green;
        }
        .finished_status {
          font-weight: bold;
          color: blue;
        }
        .read_btn {
          margin-top: auto;
          height: 48px;
          width: 100%;
          margin-left: auto;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
          font-size: 1.2em;
          font-weight: 900;
          color: $primary;
          background: $fill_primary;
          box-shadow: $fill_shadow 0px 3px 10px;
          margin-bottom: 8%;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          animation: shrink 1s cubic-bezier(0.075, 0.82, 0.165, 1);
         

          &:hover {
            color: $fill_primary;
            box-shadow: $primary 0px 3px 2px;

            &::after {
              transform: skewX(-45deg) scale(1);
              transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
          }
          &::after {
            content: "";
            background: $primary;
            position: absolute;
            z-index: -1;
            left: -20%;
            right: -20%;
            top: 0;
            bottom: 0;
            transform: skewX(-45deg) scale(0, 1);
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
       
    }
  }

  .note_directory_box {
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 32px;
    border-radius: 10px;
    z-index: 1;
    background: $fill;
    box-shadow: $fill_shadow 0 0 5px;
    .note_directory {
      background: transparent;
      margin: 36px auto;
      margin-top: 0;
    }
    h1 {
      width: 900px;
      margin: 32px auto;
      font-size: 1.5em;
      color: $primary;
      &::after{
        content: '';
        position: absolute;
        width: 6px;
        height: 80%;
        background:$primary ;
        left: -10px;
        top: 55%;
        transform: translateY(-50%);
      }
    }
  }
  
}

@keyframes shrink {
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes to_top {
  0% {
    transform: translateY(128px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
  }
}
@property --d {
  syntax: "<percentage>";
    initial-value: 0%;
    inherits: false;
}
@property --r {
  syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
}
@keyframes note_top_inner_box_img {
  0%{
    --d: 0%
  }
  100%{
    --d: 0%;
    --r: 90deg
  }
  50%{
    --d: 20%
  }
}
@media (max-width: 600px) {
  #note_info_main {
  width: 100vw;
  min-height: 100vh;
  background: $fill_body;
 
font-family: 'misans';
.note_info_main_bg{
  width: 100vw;
    height: 100vh;
    opacity: .2;
    transform: scale(2);
  stop:first-child{
    stop-color: $primary;
  }
  stop:last-child{
    stop-color: $primary_mix_6;
  }
}
  .note_top_box {
    width: calc(100vw - 20px);
    overflow: hidden;
margin: 90px auto 16px auto;
border-radius: 10px;
background: $fill;
box-shadow: $fill_shadow  0 0 5px;
    .note_top_inner_box {
      z-index: 2;
      margin: 0 auto;
     gap: 8px;
     width: calc(100vw - 28px);
     padding: 0 4px;
      height: calc(100% - 70px);
      .note_top_left_box {
        width: 30vw;
        height: calc(30vw * 1.6);
        box-shadow: $fill_shadow 0px 0px 5px;
        margin: auto 0;
        border-radius: 10px;
        transform: translateY(-10px);
        .note_top_inner_box_img {
          top: 0;
          width: 30vw;
          height: calc(30vw * 1.6);
          --n:4;
          --r:0deg;
          --d:0%;
          -webkit-mask:
    linear-gradient(var(--r), transparent var(--d), red 0 calc(100% - var(--d)), transparent 0),
    linear-gradient(calc(var(--r) + 90deg), transparent var(--d), red 0 calc(100% - var(--d)), transparent 0);
  -webkit-mask-size: calc(100%/var(--n)) calc(100%/var(--n));
  -webkit-mask-composite: source-in;
          margin: 7% 0;
          background: #ffff;
          border-radius: 10px;
          object-fit: cover;
          animation: note_top_inner_box_img 1s;
        }
        .note_top_inner_box_img_bg{
          width: 268px;
          height: 342px;
          filter:blur(20px) ;

        }
      }
      .note_top_mid_box {
        width: 600px;
        height: 100%;
        gap: 4px;
        h1 {
          color: $primary;
          margin: 0;
          font-size: 16px;
          margin-top: 5%;
          animation: to_top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        p {
          margin: 0;
          font-size: 14px;
          margin-bottom: 16px;
          color: $text;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        span {
          color: $text;
          font-size: 12px;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .load_status {
          font-weight: bold;
          color: green;
        }
        .finished_status {
          font-weight: bold;
          color: blue;
        }
        .read_btn {
          height: 30px;
          width: 100%;
          border: none;
          border-radius: 20px;
          cursor: pointer;
          overflow: hidden;
          z-index: 1;
          font-size: 14px;
          font-weight: 900;
          color: $primary;
          background: $fill_primary;
          box-shadow: $fill_shadow 0px 3px 10px;
          margin: 0;
          margin: 8px 0;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          animation: shrink 1s cubic-bezier(0.075, 0.82, 0.165, 1);
         

          &:hover {
            color: $fill_primary;
            box-shadow: $primary 0px 3px 2px;

            &::after {
              transform: skewX(-45deg) scale(1);
              transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
          }
          &::after {
            content: "";
            background: $primary;
            position: absolute;
            z-index: -1;
            left: -20%;
            right: -20%;
            top: 0;
            bottom: 0;
            transform: skewX(-45deg) scale(0, 1);
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
       
    }
  }

  .note_directory_box {
    width: calc(100vw - 20px);
    margin: 0 auto;
    margin-bottom: 32px;
    border-radius: 10px;
    z-index: 1;
    background: $fill;
    box-shadow: $fill_shadow 0 0 5px;
    .note_directory {
      background: transparent;
      margin: 16px auto;
      margin-top: 0;
    }
    h1 {
      width: calc(100vw - 28px);
      margin: 16px auto;
      font-size: 16px;
      color: $primary;
      &::after{
        content: '';
        position: absolute;
        width: 3px;
        height: 80%;
        background:$primary ;
        left: -4px;
        top: 55%;
        transform: translateY(-50%);
      }
    }
  }
  
}

}
</style>
