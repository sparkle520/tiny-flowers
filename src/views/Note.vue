<!-- @Author: LT -->
<!-- @Date: 2024-01-05 23:20:31 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  ref,
  toRefs,
  onBeforeMount,
  onMounted,
  watch,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useConfigStore } from "../store/config";
import { useUserStore } from "../store/user";
import { useNoteStore } from "../store/note";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const user_store = useUserStore();

const store = useConfigStore();
const { params } = useRoute();
const note_store = useNoteStore();
const { data } = storeToRefs(note_store);
const show_filter_search_box = ref(false);
const current_filter_list = ref([]);
const search_text = ref();
watch(search_text, (new_val, old_val) => {
  if (new_val == "") {
    current_filter_list.value = [];
    show_filter_search_box.value = false;
    return;
  }
  show_filter_search_box.value = true;
  current_filter_list.value = [];
  const query_start = performance.now();
  loop(note_store.data, 0, new_val);
  const query_end = performance.now();
  const query_text = document.querySelector(".query_text");

  const query_diff = query_end - query_start;
  query_text.innerHTML = "查询耗时: " + query_diff + "ms";
});
onUnmounted(() => {
  document.removeEventListener("click", click_handle);
});
const loop = (arr, current_index, search_text) => {
  if (current_index > arr.length - 1) return;
  search_text.toLowerCase();
  let per_num = Math.min(10, arr.length - current_index);
  window.requestAnimationFrame(() => {
    for (let i = 0; i < per_num; i++) {
      if (
        arr[current_index + i].name.toLowerCase().indexOf(search_text) == -1 &&
        arr[current_index + i].tags.toLowerCase().indexOf(search_text) == -1
      )
        continue;
      current_filter_list.value.push(arr[current_index + i]);
    }
    loop(arr, current_index + per_num, search_text);
  });
};
const search_focus_handle = () => {
  if (search_text.value.length == 0) return;
  show_filter_search_box.value = true;
};

const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);
  document.addEventListener("click", click_handle);
  init();
});
const init = () => {
  init_re_note_book_list();
};
const current_page = ref(params.page);
const init_re_note_book_list = () => {
  const re_note_book_list = document.querySelectorAll(".re_note_item");
  re_note_book_list.forEach((element,index) => {
    element.style.transform='scale(1.1)';
    setTimeout(()=>{
      element.style.transform = `scale(1) rotate(${
      Math.floor(Math.random() * 20) * (Math.random() > 0.5 ? -1 : 1)
    }deg) translateZ(0)`;
    },(index+1)*200)
  
    
  });
};

const recommend_note_list = [
  {
    id: 3,
    name: "线性代数",
    link: "/note/noteInfo/3",
    img: "https://pic.imgdb.cn/item/65e2eb629f345e8d031af15c.png",
  },
  {
    id: 2,
    name: "高等数学",
    link: "/note/noteInfo/2",
    img: "https://pic.imgdb.cn/item/65e2edd59f345e8d0321db0d.png",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "/note/noteInfo/1",
    img: "https://pic.imgdb.cn/item/65e2f0b89f345e8d0329f381.png",
  },
  {
    id: 1,
    name: "MySQL高级篇",
    link: "/note/noteInfo/4",
    img: 'https://pic.imgdb.cn/item/65f5d5bf9f345e8d03e639bd.png',
  },
];
const click_handle = (e) => {
  let search_box = document.querySelector(".search_box");
  if (!search_box.contains(e.target)) {
    show_filter_search_box.value = false;
  }
};
const go_to = (id) => {
  router.push("/note/noteInfo/" + id);
};
</script>
<template>
  <div id="note_main" class="r f f_d_c">
    <svg class="fixed note_bg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800" opacity="1"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="vvvortex-grad"><stop stop-color="hsl(1.4, 100%, 67%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(167, 52%, 78%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><g stroke="url(#vvvortex-grad)" fill="none" stroke-linecap="square"><circle r="883.5" cx="400" cy="400" stroke-width="13" stroke-dasharray="29 21" stroke-dashoffset="25" transform="rotate(239, 400, 400)" opacity="0.05"></circle><circle r="837" cx="400" cy="400" stroke-width="12" stroke-dasharray="26 40" stroke-dashoffset="25" transform="rotate(295, 400, 400)" opacity="0.10"></circle><circle r="790.5" cx="400" cy="400" stroke-width="12" stroke-dasharray="29 20" stroke-dashoffset="25" transform="rotate(31, 400, 400)" opacity="0.16"></circle><circle r="744" cx="400" cy="400" stroke-width="12" stroke-dasharray="18 35" stroke-dashoffset="25" transform="rotate(18, 400, 400)" opacity="0.21"></circle><circle r="697.5" cx="400" cy="400" stroke-width="11" stroke-dasharray="20 27" stroke-dashoffset="25" transform="rotate(323, 400, 400)" opacity="0.26"></circle><circle r="651" cx="400" cy="400" stroke-width="11" stroke-dasharray="25 18" stroke-dashoffset="25" transform="rotate(293, 400, 400)" opacity="0.31"></circle><circle r="604.5" cx="400" cy="400" stroke-width="11" stroke-dasharray="49 55" stroke-dashoffset="25" transform="rotate(17, 400, 400)" opacity="0.37"></circle><circle r="558" cx="400" cy="400" stroke-width="10" stroke-dasharray="41 48" stroke-dashoffset="25" transform="rotate(302, 400, 400)" opacity="0.42"></circle><circle r="511.5" cx="400" cy="400" stroke-width="10" stroke-dasharray="18 19" stroke-dashoffset="25" transform="rotate(59, 400, 400)" opacity="0.47"></circle><circle r="465" cx="400" cy="400" stroke-width="10" stroke-dasharray="30 13" stroke-dashoffset="25" transform="rotate(289, 400, 400)" opacity="0.53"></circle><circle r="418.5" cx="400" cy="400" stroke-width="9" stroke-dasharray="22 46" stroke-dashoffset="25" transform="rotate(125, 400, 400)" opacity="0.58"></circle><circle r="372" cx="400" cy="400" stroke-width="9" stroke-dasharray="13 49" stroke-dashoffset="25" transform="rotate(89, 400, 400)" opacity="0.63"></circle><circle r="325.5" cx="400" cy="400" stroke-width="9" stroke-dasharray="15 21" stroke-dashoffset="25" transform="rotate(274, 400, 400)" opacity="0.68"></circle><circle r="279" cx="400" cy="400" stroke-width="8" stroke-dasharray="42 43" stroke-dashoffset="25" transform="rotate(230, 400, 400)" opacity="0.74"></circle><circle r="232.5" cx="400" cy="400" stroke-width="8" stroke-dasharray="39 25" stroke-dashoffset="25" transform="rotate(265, 400, 400)" opacity="0.79"></circle><circle r="186" cx="400" cy="400" stroke-width="8" stroke-dasharray="11 22" stroke-dashoffset="25" transform="rotate(279, 400, 400)" opacity="0.84"></circle><circle r="139.5" cx="400" cy="400" stroke-width="7" stroke-dasharray="23 17" stroke-dashoffset="25" transform="rotate(206, 400, 400)" opacity="0.89"></circle><circle r="93" cx="400" cy="400" stroke-width="7" stroke-dasharray="22 25" stroke-dashoffset="25" transform="rotate(70, 400, 400)" opacity="0.95"></circle><circle r="46.5" cx="400" cy="400" stroke-width="7" stroke-dasharray="36 16" stroke-dashoffset="25" transform="rotate(142, 400, 400)" opacity="1.00"></circle></g></svg>
    <div class="container">
      <div class="top_box r">
        <div class="top_box_bg a"></div>

        <div class="note_book_box f f_d_c">
          <span class="title">推荐笔记</span>
          <ul class="note_book_ul f f_d_r">
            <li
              @click="go_to(item.id)"
              v-for="item in recommend_note_list"
              :key="item"
              class="re_note_item r"
            >
              <svg
                t="1708067792440"
                class="icon note_icon a"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5623"
                width="32"
                height="32"
              >
                <path
                  d="M266.24 61.44h491.52a122.88 122.88 0 0 1 122.88 122.88v675.84a102.4 102.4 0 0 1-102.4 102.4H245.76a102.4 102.4 0 0 1-102.4-102.4V184.32a122.88 122.88 0 0 1 122.88-122.88z"
                  fill="#cca3cc"
                  p-id="5624"
                ></path>
                <path
                  d="M819.2 778.24v81.92l-0.1024 3.072A40.96 40.96 0 0 1 778.24 901.12H245.76l-3.072-0.1024A40.96 40.96 0 0 1 204.8 860.16v-40.96l0.1024-3.072A40.96 40.96 0 0 1 245.76 778.24h573.44zM665.6 184.32a30.72 30.72 0 0 1 0 61.44h-307.2a30.72 30.72 0 0 1 0-61.44h307.2z"
                  fill="#fff"
                  p-id="5625"
                ></path>
              </svg>
              <div class="img_box">
                <img :src="item.img" alt="" />
              </div>
              <div class="text_area_box a f a_c j_c_c ">
                <div class="circle_breath"></div>
                <svg xmlns="http://www.w3.org/2000/svg" class="a text_area_bg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 700 700" style="overflow: hidden; display: block;" width="700" height="700"><defs><linearGradient id="two-3" x1="350" y1="-350" x2="350" y2="350" spreadMethod="pad" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="hsl(1.4, 100%, 67%)" stop-opacity="1"></stop><stop offset="100%" stop-color="hsl(167, 52%, 78%)" stop-opacity="1"></stop></linearGradient></defs><g id="two-0" transform="matrix(1 0 0 1 0 0)" opacity="1"><path transform="matrix(1 0 0 1 350 350)" id="two-567" d="M 310.555355 128.63624 C 306.400805 171.137859 268.511154 212.04721 229.565653 229.565653 C 188.202424 248.171638 133.810286 204.555171 92.291539 222.811485 C 48.655877 241.998632 47.581261 331.059812 0 333.930552 C -45.05357 336.648788 -75.987926 278.570213 -99.404807 239.98443 C -118.884576 207.886128 -102.427118 155.426648 -130.552816 130.552815 C -164.108127 100.877133 -228.436691 135.965488 -264.673736 109.63145 C -297.477546 85.792399 -311.06588 39.513576 -320.180025 0 C -329.955891 -42.382412 -343.833519 -96.674588 -318.165284 -131.788376 C -289.49744 -171.005587 -225.212699 -164.921162 -178.600295 -178.600295 C -147.667467 -187.678013 -115.425805 -195.855944 -83.882995 -202.511464 C -56.408311 -208.308612 -28.047214 -215.442513 -0.000001 -216.791211 C 28.81017 -218.176597 58.407909 -208.356695 87.1747 -210.458346 C 140.591115 -214.360853 196.695758 -267.414196 245.619532 -245.619533 C 285.987457 -227.636346 310.860744 -173.210991 311.48933 -129.023106 C 312.174182 -80.8799 243.472953 -48.147958 243.36591 -0.000001 C 243.259437 47.891629 315.214585 80.971671 310.555355 128.63624 Z " fill="hsl(10, 75%, 40%)" stroke="undefined" stroke-width="1" stroke-opacity="1" fill-opacity="1" visibility="visible" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4"></path></g></svg>
              </div>
              <div class="text_area f a">
                <span class="r">{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="top_right_box f f_d_r">
          <div class=""></div>
          <div></div>
        </div>
      </div>
      <div class="note_box r f f_d_c">
        <div class="search_box f r a_c">
          <svg
            t="1708088494282"
            class="search_icon a"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="10840"
            width="22"
            height="22"
          >
            <path
              d="M428.218182 993.745455H207.127273C132.654545 993.745455 69.818182 930.909091 69.818182 856.436364v-230.4C69.818182 551.563636 132.654545 488.727273 207.127273 488.727273h221.090909c74.472727 0 137.309091 62.836364 137.309091 137.309091v230.4c0 76.8-60.509091 137.309091-137.309091 137.309091z"
              fill="#e96969"
              opacity=".15"
              p-id="10841"
            ></path>
            <path
              d="M693.527273 193.163636H223.418182c-13.963636 0-27.927273 13.963636-27.927273 27.927273s11.636364 27.927273 27.927273 27.927273h470.109091c13.963636 0 27.927273-11.636364 27.927272-27.927273 0-13.963636-13.963636-27.927273-27.927272-27.927273zM223.418182 386.327273h330.472727c13.963636 0 27.927273-11.636364 27.927273-27.927273 0-13.963636-11.636364-27.927273-27.927273-27.927273H223.418182c-13.963636 0-27.927273 11.636364-27.927273 27.927273s13.963636 27.927273 27.927273 27.927273zM693.527273 470.109091H223.418182c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927272h470.109091c13.963636 0 27.927273-11.636364 27.927272-27.927272s-13.963636-27.927273-27.927272-27.927273zM553.890909 607.418182H223.418182c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927272h330.472727c13.963636 0 27.927273-11.636364 27.927273-27.927272-2.327273-13.963636-13.963636-27.927273-27.927273-27.927273z"
              fill="#e96969"
              p-id="10842"
            ></path>
            <path
              d="M986.763636 18.618182H525.963636 86.109091c-13.963636 0-27.927273 11.636364-27.927273 27.927273v267.636363h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927273h20.945454v100.072727h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927272h20.945454v100.072728h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927272 0 13.963636 11.636364 27.927273 27.927273 27.927273h20.945454v100.072727h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927273h20.945454v139.636363c0 13.963636 11.636364 27.927273 27.927273 27.927273h900.654545c16.290909 0 27.927273-11.636364 27.927273-27.927273V46.545455c0-16.290909-11.636364-27.927273-27.927273-27.927273z m-25.6 907.636363c0 13.963636-4.654545 23.272727-18.618181 23.272728H130.327273c-9.309091 0-13.963636-4.654545-16.290909-11.636364-2.327273-4.654545-2.327273-9.309091-2.327273-13.963636V97.745455c0-13.963636 4.654545-23.272727 18.618182-23.272728h812.218182c9.309091 0 13.963636 4.654545 16.290909 11.636364 2.327273 4.654545 2.327273 9.309091 2.327272 13.963636v826.181818z"
              fill="#e96969"
              p-id="10843"
            ></path>
          </svg>
          <input
            v-model="search_text"
            @focus="search_focus_handle"
            @input="filter_search_handle"
            @keyup.enter="topic_search_handle"
            id="note_search"
            type="text"
            class="search"
            placeholder="在此键入搜索(书名或标签)"
          />
          <div
            class="filter_search_box a"
            v-show="show_filter_search_box"
          >
            <ul class="f f_d_c">
              <li
                v-for="item in current_filter_list"
                :key="item"
                @click="router.push(`/note/noteInfo/${item.id}`)"
              >
                {{ item.name }}
              </li>
            </ul>
            <div class="query_time"><span class="query_text"></span></div>
          </div>
        </div>
        <div
          class="book_list_box r f f_d_c a_c"
        >
          <ul class="book_list_ul grid r">
            <li
              @click="go_to(item.id)"
              v-for="item in data"
              class="book_item r"
              :key="item"
            >
              <div class="book_item_inner r f f_d_r">
                <div class="book_img_box">
                  <img
                    @click="go_to(item.id)"
                    v-if="item.img != ''"
                    class="book_img"
                    :src="item.img"
                    alt=""
                  />
                  <img
                    v-else
                    class="book_img"
                    src="https://pic.imgdb.cn/item/65b3c514871b83018a87b510.png"
                    alt=""
                  />
                </div>
                <div class="book_text_area f f_d_c">
                  <div class="book_name">
                    {{ item.name }}
                  </div>
                  <div class="short_message">{{ item.short_message }}</div>
                  <div
                    class="book_item_bottom f justify_content_space_between"
                  >
                    <div
                      v-if="(item, update_date != '')"
                      class="book_update_time"
                    >
                      更新于 {{ item.update_date.split("?")[0] }}-{{
                        item.update_date.split("?")[1]
                      }}-{{ item.update_date.split("?")[2] }}
                      {{ item.update_date.split("?")[3] }}
                    </div>
                    <div v-if="!item.is_finished" class="load_status">
                      连载中...
                    </div>
                    <div v-else class="finished_status">已完结</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <Pagination
            :current_page="current_page"
            page_size="12"
            @current_change="current_page_change"
            :total="data.length"
          >
          </Pagination>
        </div>
      </div>
    </div>
   
  </div>
  <div
      class="note_foot r f f_d_r a_c j_c_c"
    >
      <div class="left_foot f f_d_c j_c_c">
        <span class="title_foot">人生格言</span>
        <span class="text_foot" v-html="user_store.aphorism"></span>
      </div>
      <div class="mid_foot f f_d_c">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot f f_d_c j_c_c">
        <span class="title_foot">联系我</span>
        <span class="text_foot">邮箱: {{ user_store.e_mail }}</span>
        <span class="text_foot"
          >GitHub Account: {{ user_store.github_account }}</span
        >
        <span class="text_foot">小红书ID: {{ user_store.red_book_ID }}</span>
      </div>
    </div>
</template>
<style lang="scss" scoped>
$load_status_color: var(--load_status_color, #0ebd7d);
$finished_status_color: var(--finished_status_color, #32cdcd);
$img_shadow: var(--img_shadow, #d3010130);
$search_box_color: var(--search_box_color, #4d4949);
#note_main {
  width: max(1440px,100vw);
  background:  $fill_body;
  min-height: 100vh;
 
font-family: 'misans';

 .note_bg{
  width: 100vw;
  height: 100vh;
  opacity: .2;
  stop:first-child{
    stop-color: $primary;
  }
  stop:last-child{
    stop-color: $primary_mix_6;
  }
 }
  .container {
    width: 1100px;
    align-self: center;
    z-index: 1;
    margin-top: 90px;
    margin-bottom: 36px;
    .top_box {
      width: 1100px;
      height: 340px;
      animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      border-radius: 15px;
      -webkit-backdrop-filter: blur(6px);
      box-shadow: $fill_shadow 0 0 5px;
      &::after {
        content: "";
        position: absolute;
        width: 288px;
        height: 288px;
        left: 0;
        bottom: 0;
        opacity: .5;
        border-radius: 50%;
        background: $fill_body;
        filter: blur(58px);
      }
      &::before {
        content: "";
        position: absolute;
        width: 115px;
        height: 115px;
        right: 58px;
        bottom: 58px;
        border-radius: 50%;
        background: $primary;
        z-index: 1;
        filter: blur(86px);
      }
      .top_box_bg {
        width: 1100px;
        z-index: -1;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        background: $fill_body;

        height: 340px;
        border-radius: inherit;
        object-fit: cover;
      }
      .note_book_box {
        z-index: 1;
        .title {
          font-size: 1.5em;
          font-weight: 900;
          color: $primary;
          margin: 16px;
          height: 30px;
        }
        .note_book_ul {
          width: 880px;
          height: 276px;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 16px;
          .re_note_item{
            width: 208px;
            height: 276px;
            border-radius: 10px;
            z-index: 10;
            background: #ffff;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            box-shadow: $fill_shadow 0px 6px 15px 0px;
           
            &:hover{
              .text_area{
                height: 100px;
              }
             
            }

            .note_icon{
              left: 8px;
              top: 8px;
            }
            .img_box{
              width: 208px;
              height: 276px;
              pointer-events: none;
              img{
                width: 208px;
              height: 276px;
              object-fit: cover;
              border-radius: 10px;
              }
            }
            .text_area_box{
              width: 208px;
              height: 276px;
              left: 0;
              top: 0;
              overflow: hidden;
              border-radius: 10px;
              &:hover{
                .circle_breath {
                  opacity: .6;
                }
              }
              .circle_breath {
                opacity: 0;

            box-shadow: 0 0 0 0 $primary_mix_3;
            height:32px;
            width: 32px;
            
            border-radius: 50%;
            animation: circle_breath 2.4s infinite;
        }

      
              .text_area_bg{
                bottom: -350px;
                transform: scale(.4);
                left: -240px;
                pointer-events: none;
                filter: blur(40px);
                path{
                  fill: $primary_mix_4;
                }
              }
            }
            .text_area{
              width: 176px;
              padding: 0 16px;
              padding-bottom:8px;
              font-weight: 800;
              pointer-events: none;
              height: 36px;
              z-index: 11;
              align-items: center;
              transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

              bottom: 0;
              color: $fill_primary;
              left: 0;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
             
            }
          }
        }
       
      }
    }
    .top_right_box {
    }
    .note_box {
      width: 1100px;
      border-radius: 15px;
      margin-top: 32px;
      background: $fill_body;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      -webkit-backdrop-filter: blur(6px);
      box-shadow:$fill_shadow 0 0 5px;
      .search_box {
        width: 550px;
        height: 38px;
        margin: 16px auto;
        margin-bottom: 0px;
        .filter_search_box {
          width: 100%;
          max-height: 226px;
          background: $fill;
          bottom: 0;
          z-index: 100;
          transform: translateY(120%);
          box-shadow: $fill_shadow 2px 3px 10px;
          border-radius: 10px;
          overflow-y: scroll;
          .query_time {
            margin-left: 16px;
            margin-bottom: 8px;
            color: $primary;
            font-size: 12px;
          }
          ul {
            list-style: none;
            margin:16px 16px;
            padding: 0;
            gap: 8px;
            li {
              word-wrap: break-word;
              color: $text_secondary;
              font-size: 14px;
              cursor: pointer;
              &:hover {
                color: $primary;
              }
            }
          }
        }
        .search_icon {
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          path {
            fill: $primary;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
          }
        }

        .search {
          width: 486px;
          height: 38px;
          border-radius: 10px;
          outline: none;
          padding: 0 32px;
          background: $fill;
          color: $search_box_color;

          border: none;
          font-size: 1.1em;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: $primary 0 0 0 1px;

          &:hover {
            background: $fill;
            box-shadow: $primary 0px 4px 5px;
          }
          &:focus {
            background: $fill;
            box-shadow: $primary 0px 4px 5px;
          }
          &::placeholder{
            color: $text_placeholder;
          }
        }
      }
      .book_list_box {
        width: 1100px;
        margin-top: 16px;
        border-radius: inherit;
        min-height: 300px;

        .book_list_ul {
          z-index: 20;
          width: 1064px;
          margin: 0 auto;
          height: 100%;
          padding: 0;
          padding-top: 16px;
          border-top: $primary_mix_4 2px solid;
          grid-template-columns: repeat(3, 1fr);
          flex-wrap: wrap;
          gap: 16px;

          .book_item {
            list-style: none;
            border-radius: 10px;
            box-shadow: $fill_shadow 0px 6px 15px 0px;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            &::before {
              content: "";
              height: 100%;
              width: 100%;
              background: transparent;
              border-radius: inherit;
              position: absolute;
              top: 0;
              z-index: -2;
            }
            &:hover {
              box-shadow: $fill_shadow 0px 3px 10px 0px;
              transform: scale(0.96);
              &::before {
              }
              .book_img_box {
                transform: scale(1.25) rotateZ(10deg);
              }
              .book_text_area {
              }
            }
            height: 150px;
            background: $fill;
            .book_item_inner {
              margin: 8px;
              z-index: 11;
              gap: 16px;
              .book_img_box {
                width: 98px;
                height: 134px;
                border-radius: 10px;
                background: #fff;
                z-index: 11;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                img {
                  width: inherit;
                  height: inherit;
                  border-radius: inherit;
                  object-fit: cover;
                  box-shadow: $primary_mix_6 3px 5px 10px 0px;
                }
              }
              .book_text_area {
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

                .book_name {
                  cursor: pointer;
                  margin: 8px 0;
                  font-size: 1.2em;
                  font-weight: 600;
                  user-select: none;
                  color: $text_title;
                  &:hover {
                    color: $primary;
                  }
                }
                .short_message {
                  height: 48px;
                  width: 100%;
                  font-size: 0.9em;
                  overflow-y: scroll;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  color: $text;
                }
                .book_item_bottom {
                  margin-top: auto;
                  .book_update_time {
                    font-size: 0.8em;
                    color: $text_secondary;
                  }
                  .load_status {
                    font-size: 0.8em;
                    color: $load_status_color;
                    font-weight: 900;
                    margin-right: 10px;
                  }
                  .finished_status {
                    font-size: 0.8em;
                    color: $finished_status_color;
                    font-weight: 900;
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }
        .pagination {
          margin: 32px 0;
        }
      }
    }
  }
  
}
.note_foot {
  width: max(1440px,100vw);
  background: $fill_body;
    z-index: 10;
    width: inherit;
    height: 200px;
    gap:16px;
    .title_foot {
      font-size: 16px;
      color: $primary;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $primary;
    }
    .left_foot {
      width: 300px;
      height: 152px;
      gap: 8px;
      line-height: 26px;
    }
    .mid_foot {
      width: 300px;
      height: 152px;
    }
    .right_foot {
      width: 300px;
      height: 152px;
      gap: 8px;
      line-height: 22px;

    }
  }
@keyframes content_box {
  0% {
    opacity: 0;
  }
  100% {
  }
}
@media (max-width: 600px) {
  #note_main {
  width: 100vw;
  background:  $fill_body;
  min-height: 100vh;
 
font-family: 'misans';

 .note_bg{
  width: 100vw;
  height: 100vh;
  opacity: .2;
  stop:first-child{
    stop-color: $primary;
  }
  stop:last-child{
    stop-color: $primary_mix_6;
  }
 }
  .container {
    width: calc(100vw - 20px);
    align-self: center;
    z-index: 1;
    margin-top: 90px;
    margin-bottom: 36px;
    .top_box {
      display: none;
      width: 1100px;
      height: 340px;
      animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      border-radius: 15px;
      -webkit-backdrop-filter: blur(6px);
      box-shadow: #27262619 0px 6px 15px 0px;
      &::after {
        content: "";
        position: absolute;
        width: 288px;
        height: 288px;
        left: 0;
        bottom: 0;
        opacity: .5;
        border-radius: 50%;
        background: $fill_body;
        filter: blur(58px);
      }
      &::before {
        content: "";
        position: absolute;
        width: 115px;
        height: 115px;
        right: 58px;
        bottom: 58px;
        border-radius: 50%;
        background: $primary;
        z-index: 1;
        filter: blur(86px);
      }
      .top_box_bg {
        width: 1100px;
        z-index: -1;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        background: $fill;

        height: 340px;
        border-radius: inherit;
        object-fit: cover;
      }
      .note_book_box {
        z-index: 1;
        .title {
          font-size: 1.5em;
          font-weight: 900;
          color: $primary;
          margin: 16px;
          height: 30px;
        }
        .note_book_ul {
          width: 880px;
          height: 276px;
          list-style: none;
          padding: 0;
          margin: 0;
          gap: 16px;
          .re_note_item{
            width: 208px;
            height: 276px;
            border-radius: 10px;
            z-index: 10;
            background: #ffff;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            box-shadow: $fill_shadow 0px 6px 15px 0px;
           
            &:hover{
              .text_area{
                height: 100px;
              }
             
            }

            .note_icon{
              left: 8px;
              top: 8px;
            }
            .img_box{
              width: 208px;
              height: 276px;
              pointer-events: none;
              img{
                width: 208px;
              height: 276px;
              object-fit: cover;
              border-radius: 10px;
              }
            }
            .text_area_box{
              width: 208px;
              height: 276px;
              left: 0;
              top: 0;
              overflow: hidden;
              border-radius: 10px;
              &:hover{
                .circle_breath {
                  opacity: .6;
                }
              }
              .circle_breath {
                opacity: 0;

            box-shadow: 0 0 0 0 $primary_mix_3;
            height:32px;
            width: 32px;
            
            border-radius: 50%;
            animation: circle_breath 2.4s infinite;
        }

      
              .text_area_bg{
                bottom: -350px;
                transform: scale(.4);
                left: -240px;
                pointer-events: none;
                filter: blur(40px);
                path{
                  fill: $primary_mix_4;
                }
              }
            }
            .text_area{
              width: 176px;
              padding: 0 16px;
              padding-bottom:8px;
              font-weight: 800;
              pointer-events: none;
              height: 36px;
              z-index: 11;
              align-items: center;
              transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

              bottom: 0;
              color: $fill_primary;
              left: 0;
              border-bottom-left-radius: 10px;
              border-bottom-right-radius: 10px;
             
            }
          }
        }
       
      }
    }
    .top_right_box {
    }
    .note_box {
      width: calc(100vw - 20px);
      border-radius: 15px;
      background: $fill;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin-top: 0;
      animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      -webkit-backdrop-filter: blur(6px);
      box-shadow:$fill_shadow 0px 6px 15px 0px;
      .search_box {
        width: calc(100vw - 20px);
        height: 38px;
        margin: 8px auto;
        margin-bottom: 0px;
        svg{
          display: none;
        }
        .filter_search_box {
          width: 100%;
          max-height: 226px;
          background: $fill;
          bottom: 0;
          z-index: 100;
          transform: translateY(120%);
          box-shadow: $fill_shadow 2px 3px 10px;
          border-radius: 10px;
          overflow-y: scroll;
          .query_time {
            margin-left: 16px;
            margin-bottom: 8px;
            color: $primary;
            font-size: 12px;
          }
          ul {
            list-style: none;
            margin:16px 16px;
            padding: 0;
            gap: 8px;
            li {
              word-wrap: break-word;
              color: $text_secondary;
              font-size: 12px;
              cursor: pointer;
              &:hover {
                color: $primary;
              }
            }
          }
        }
        .search_icon {
          right: 10px;
          top: 50%;
          
          transform: translateY(-50%);
          path {
            fill: $primary;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
          }
        }

        .search {
          width: calc(100vw - 104px);
          height: 38px;
          border-radius: 10px;
          outline: none;
          padding: 0 32px;
          background: $fill;
          color: $search_box_color;
          margin-left: 10px;
          border: none;
          font-size: 14px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: $primary 0 0 0 1px;

          &:hover {
            background: $fill;
            box-shadow: $primary 0px 4px 5px;
          }
          &:focus {
            background: $fill;
            box-shadow: $primary 0px 4px 5px;
          }
          &::placeholder{
            color: $text_placeholder;
          }
        }
      }
      .book_list_box {
        width: calc(100vw - 20px);
        margin-top: 16px;
        border-radius: inherit;
        min-height: 300px;
        .book_list_ul {
          z-index: 20;
          width: calc(100vw - 20px);
          margin: 0 auto;
          height: 100%;
          padding: 0;
          padding-top: 16px;
          border-top: $primary_mix_4 2px solid;
          grid-template-columns: repeat(1, 1fr);
          flex-wrap: wrap;
          gap: 8px;

          .book_item {
            
            list-style: none;
            border-radius: 10px;
            box-shadow: $fill_shadow 0px 6px 15px 0px;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            &::before {
              content: "";
              height: 100%;
              width: 100%;
              background: transparent;
              border-radius: inherit;
              position: absolute;
              top: 0;
              z-index: -2;
            }
            &:hover {
              box-shadow: $fill_shadow 0px 3px 10px 0px;
              transform: scale(0.96);
              &::before {
              }
              .book_img_box {
                transform: scale(1.25) rotateZ(10deg);
              }
              .book_text_area {
              }
            }
            height: 150px;
            background: $fill;
            .book_item_inner {
              margin: 8px;
              z-index: 11;
              gap: 16px;
              .book_img_box {
                width: 98px;
                height: 134px;
                border-radius: 10px;
                background: #fff;
                z-index: 11;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                img {
                  width: inherit;
                  height: inherit;
                  border-radius: inherit;
                  object-fit: cover;
                  box-shadow: $primary_mix_6 3px 5px 10px 0px;
                }
              }
              .book_text_area {
                width: 100%;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

                .book_name {
                  cursor: pointer;
                  margin: 8px 0;
                  font-size: 14px;
                  font-weight: 600;
                  user-select: none;
                  color: $text_title;
                  &:hover {
                    color: $primary;
                  }
                }
                .short_message {
                  height: 48px;
                  width: 100%;
                  font-size: 12px;
                  overflow-y: scroll;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  color: $text;
                }
                .book_item_bottom {
                  margin-top: auto;
                  .book_update_time {
                    font-size: 12px;
                    color: $text_secondary;
                  }
                  .load_status {
                    font-size: 12px;
                    color: $load_status_color;
                    font-weight: 900;
                    margin-right: 10px;
                  }
                  .finished_status {
                    font-size: 12px;
                    color: $finished_status_color;
                    font-weight: 900;
                    margin-right: 10px;
                  }
                }
              }
            }
          }
        }
        .pagination {
          margin: 32px 0;
        }
      }
    }
  }
  
}
.note_foot {
  width: calc(100vw - 20px);
  padding: 0 10px;
  height: 130px;
  gap:8px;
  z-index: 1;
  color: $primary;
  background: $fill_body;
  .title_foot {
    font-size: 12px;
  }
  .text_foot {
    font-size: 10px;
    font-weight: 700;
  }
  .left_foot {
    width: calc((100vw - 24px)/2);
    height: auto;
    gap: 4px;
    line-height: 15px;
  }
  .mid_foot {
    width: 0;
    height: 152px;
  }
  .right_foot {
    width: calc((100vw - 24px)/2);
    height: auto;
    gap: 4px;
    line-height: 15px;
  }
}
}
</style>
