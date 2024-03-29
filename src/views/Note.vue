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
import change_theme from "../assets/theme/Note";
import { useConfigStore } from "../store/config";
import { useUserStore } from "../store/user";
import { useNoteStore } from "../store/note";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const user_store = useUserStore();
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const store = useConfigStore();
const { params } = useRoute();
const note_store = useNoteStore();
const { theme } = storeToRefs(store);
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
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);
  change_theme(theme.value);
  document.addEventListener("click", click_handle);
  init();
});
const init = () => {
  // init_book_list();
  init_re_note_book_list();
};
const current_page = ref(params.page);
const init_re_note_book_list = () => {
  const re_note_book_list = document.querySelectorAll(".re_note_item");
  re_note_book_list.forEach((element) => {
    element.style.transform = `rotate(${
      Math.floor(Math.random() * 20) * (Math.random() > 0.5 ? -1 : 1)
    }deg) translateZ(0)`;
    // setTimeout(() => {
    //   element.style.transform = `rotate(0deg)`;
    //   element.style.transitionDelay = `${Math.floor(Math.random()*3)}s`;
    // }, 100);
  });
};
// const init_book_list = () => {
//   const book_item_list = document.querySelectorAll(".book_item");
//   book_item_list.forEach((element) => {
//     element.style.backgroundColor = `rgba(  ${Math.floor(
//       Math.random() * 256
//     )},  ${Math.floor(Math.random() * 256)},  ${Math.floor(
//       Math.random() * 256
//     )},.1)`;
//   });
// };
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
    name: "概率论与数理统计",
    link: "/note/noteInfo/1",
    img: "https://pic.imgdb.cn/item/65e2d81a9f345e8d03e2fbba.jpg",
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
  <div id="note_main" class="relative flex flex_direction_column">
    <div class="container">
      <div class="grid top_box relative">
        <div class="top_box_bg absolute"></div>

        <div class="note_book_box flex flex_direction_column">
          <span class="title">推荐笔记</span>
          <ul class="flex flex_direction_row">
            <li
              @click="go_to(item.id)"
              v-for="item in recommend_note_list"
              :key="item"
              class="re_note_item relative"
            >
              <svg
                t="1708067792440"
                class="icon note_icon absolute"
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
              <div class="text_area absolute">
                <span class="relative">{{ item.name }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="top_right_box flex flex_direction_row">
          <div class=""></div>
          <div></div>
        </div>
      </div>
      <div class="note_box relative flex flex_direction_column">
        <div class="search_box relative">
          <svg
            t="1708088494282"
            class="search_icon absolute"
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
            class="filter_search_box absolute"
            v-show="show_filter_search_box"
          >
            <ul class="flex flex_direction_column">
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
          class="book_list_box relative flex flex_direction_column align_items_center"
        >
          <ul class="book_list_ul grid relative">
            <li
              @click="go_to(item.id)"
              v-for="item in data"
              class="book_item relative"
              :key="item"
            >
              <div class="book_item_inner flex flex_direction_row">
                <div class="book_img_box">
                  <img
                    @click="go_to(item.id)"
                    v-if="item.img != ''"
                    :src="item.img"
                    alt=""
                  />
                  <img
                    v-else
                    src="https://pic.imgdb.cn/item/65b3c514871b83018a87b510.png"
                    alt=""
                  />
                </div>
                <div class="book_text_area flex flex_direction_column">
                  <div class="book_name">
                    {{ item.name }}
                  </div>
                  <div class="short_message">{{ item.short_message }}</div>
                  <div
                    class="book_item_bottom flex justify_content_space_between"
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
      class="note_foot relative flex flex_direction_row align_items_center justify_content_center"
    >
      <div class="left_foot flex flex_direction_column justify_content_center">
        <span class="title_foot">人生格言</span>
        <span class="text_foot" v-html="user_store.aphorism"></span>
      </div>
      <div class="mid_foot flex flex_direction_column">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot flex flex_direction_column justify_content_center">
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
$note_bg_color: var(--note_bg_color, #fdfbfb);
$note_bg_opacity: var(--note_bg_opacity, 1);
$note_bg_top: var(--note_bg_top, #fdfbfb);
$box_bg: var(--box_bg, #ffff);
$note_book_box_title_color: var(--note_book_box_title_color, #e96969);
$re_note_item_bg: var(--re_note_item_bg, #e55656);
$text_area_color: var(--text_area_color, #ffffe2);
$text_area_before_bg: var(--text_area_before_bg, #f0681e);
$text_area_after_bg: var(--text_area_after_bg, #ffb3c5);
$filter_search_box_color: var(--filter_search_box_color, #726c65);
$filter_search_box_hover_color: var(--filter_search_box_hover_color, #fa2121);
$book_name_color: var(--book_name_color, #ffb3c5);
$book_name_hover_color: var(--book_name_hover_color, #d5b3ff);
$short_message_color: var(--short_message_color, #cca3cc);
$book_update_time_color: var(--book_update_time_color, #a09090);
$load_status_color: var(--load_status_color, #0ebd7d);
$finished_status_color: var(--finished_status_color, #32cdcd);
$foot_bg: var(--foot_bg, #ffc0cb);
$img_shadow: var(--img_shadow, #d3010130);
$search_box_color: var(--search_box_color, #4d4949);
#note_main {
  width: 100vw;
  background: linear-gradient($note_bg_top, $foot_bg);
  min-height: 100vh;
  ::selection {
    color: $book_name_color;
    background-color: $text_area_color;
  }
  &::after {
    content: "";
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    opacity: $note_bg_opacity;
    background: url("https://pic.imgdb.cn/item/65d0a5589f345e8d035d9d4b.png")
      repeat;
  }
  .container {
    width: 80vw;
    align-self: center;
    z-index: 1;
    margin-top: 90px;
    margin-bottom: 36px;
    .top_box {
      width: inherit;
      height: 45vh;
      animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      grid-template-columns: 4fr 1fr;
      // backdrop-filter: blur(6px);
      border-radius: 15px;
      -webkit-backdrop-filter: blur(6px);
      // border: 0.727273px solid rgba(255, 255, 255, 0.18);
      box-shadow: #27262619 0px 6px 15px 0px;
      // -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      &::after {
        content: "";
        position: absolute;
        width: 20vw;
        height: 20vw;
        left: 0vw;
        bottom: 0;
        border-radius: 50%;
        background: $re_note_item_bg;
        filter: blur(4vw);
      }
      &::before {
        content: "";
        position: absolute;
        width: 8vw;
        height: 8vw;
        right: 4vw;
        bottom: 4vw;
        border-radius: 50%;
        background: $text_area_after_bg;
        z-index: 1;
        filter: blur(6vw);
      }
      .top_box_bg {
        width: 80vw;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        background: $box_bg;

        height: 45vh;
        border-radius: inherit;
        object-fit: cover;
      }
      .note_book_box {
        z-index: 1;
        .title {
          font-size: 1.5em;
          font-weight: 900;
          color: $note_book_box_title_color;
          margin: 16px;
        }
        ul {
          
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .re_note_item {
          width: 100%;
          margin: 0 0.5vw;
          transition: all 0.5s cubic-bezier(0.075, 0.82, 0.1);
          background: linear-gradient(40deg, transparent, $re_note_item_bg);
          border-radius: 20px;
          height: 36vh;
          border-radius: 15px;
          box-shadow: #27262639 0px 6px 15px 0px;
          transform: translateZ(0);
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          &:hover {
            box-shadow: #27262639 0px 3px 5px 0px;
          }

          .note_icon {
            left: 10px;
            top: 10px;
            z-index: 11;
            transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
          .img_box {
            overflow: hidden;
            width: inherit;
            background: #fff;
            height: inherit;
            border-radius: inherit;
          }
          img {
            width: inherit;
            object-fit: cover;
            height: inherit;
            border-radius: inherit;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
          .text_area {
            bottom: 0;
            overflow: hidden;

            width: calc(100% - 1vw);
            color: $text_area_color;

            height: inherit;
            padding: 1vh 0.5vw;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
            span {
              display: block;
              font-size: 1.1em;
              width: 3.3em;
              top: 22vh;
              left: 0vw;
              word-break: normal;
              line-height: 1.5em;
              font-weight: 900;
              transform-style: preserve-3d;
              &::before {
                content: "";
                position: absolute;
                width: 150%;
                height: 150%;
                filter: blur(10px);
                background: $text_area_before_bg;
                border-radius: 50%;
                left: -4vw;
                top: 2vh;
                transform: translateZ(-1px);
              }
              &::after {
                content: "";
                position: absolute;
                width: 120%;
                height: 120%;
                filter: blur(10px);
                background: $text_area_after_bg;
                border-radius: 50%;
                right: 0vw;
                bottom: 0;
                transform: translateZ(-2px);
              }
            }
          }
        }
      }
    }
    .top_right_box {
    }
    .note_box {
      width: 80vw;
      min-height: 40vh;
      border-radius: 15px;
      margin-top: 32px;
      background: $box_bg;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      -webkit-backdrop-filter: blur(6px);
      // border: 0.727273px solid rgba(255, 255, 255, 0.18);
      box-shadow: #27262619 0px 6px 15px 0px;
      .search_box {
        width: 50%;
        height: 5vh;
        margin: 1vh auto;
        .filter_search_box {
          width: 100%;
          max-height: 30vh;
          background: $box_bg;
          bottom: 0;
          z-index: 100;
          transform: translateY(120%);
          box-shadow: #8787872f 2px 3px 10px;
          border-radius: 10px;
          overflow-y: scroll;
          .query_time {
            margin-left: 2vw;
            margin-bottom: 1vh;
            color: $note_book_box_title_color;
            font-size: 0.7em;
          }
          ul {
            list-style: none;
            margin: 2vh 2vw;
            padding: 0;
            gap: 1vh;
            li {
              word-wrap: break-word;
              color: $filter_search_box_color;
              font-size: 1.1em;
              &:hover {
                color: $filter_search_box_hover_color;
              }
            }
          }
        }
        .search_icon {
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          path {
            fill: $book_name_color;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
          }
        }

        .search {
          width: calc(100% - 4vw);
          height: 5vh;
          border-radius: 10px;
          outline: none;
          padding: 0 2vw;
          background: $box_bg;
          color: $search_box_color;

          border: none;
          font-size: 1.1em;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          font-family: "miscrsoft yahei";
          box-shadow: $note_book_box_title_color 0 0 0 1px;

          &:hover {
            background: $box_bg;
            box-shadow: $note_book_box_title_color 0px 4px 5px;
          }
          &:focus {
            background: $box_bg;
            box-shadow: $note_book_box_title_color 0px 4px 5px;
          }
        }
      }
      .book_list_box {
        width: 100%;
        margin-top: 32px;
        border-radius: inherit;
        min-height: 20vh;

        .book_list_ul {
          z-index: 20;
          width: calc(100% - 32px);
          margin: 0 auto;
          height: 100%;
          padding: 0;
          grid-template-columns: repeat(3, 1fr);
          flex-wrap: wrap;
          gap: 1vw;

          .book_item {
            list-style: none;
            border-radius: 10px;
            box-shadow: #27262619 0px 6px 15px 0px;
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
              box-shadow: #27262619 0px 3px 10px 0px;
              transform: scale(0.96);
              &::before {
              }
              .book_img_box {
                transform: scale(1.25) rotateZ(10deg);
              }
              .book_text_area {
              }
            }
            height: 20vh;
            background: $box_bg;
            .book_item_inner {
              margin: 10px;
              position: relative;
              z-index: 11;
              gap: 1vw;
              .book_img_box {
                width: 13vh;
                height: calc(20vh - 20px);
                border-radius: 10px;
                background: #fff;
                z-index: 11;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                img {
                  width: inherit;
                  height: inherit;
                  border-radius: inherit;
                  object-fit: cover;
                  box-shadow: $img_shadow 0px 6px 15px 0px;
                }
              }
              .book_text_area {
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

                .book_name {
                  margin: 1vh 0;
                  font-size: 1.2em;
                  font-weight: 600;
                  user-select: none;
                  color: $book_name_color;
                  &:hover {
                    color: $book_name_hover_color;
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
                  color: $short_message_color;
                }
                .book_item_bottom {
                  margin-top: auto;
                  .book_update_time {
                    font-size: 0.8em;
                    color: $book_update_time_color;
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
    width: 100vw;
    background: $foot_bg;
    z-index: 10;
    width: inherit;
    height: 200px;
    gap: 2vw;
    .title_foot {
      font-size: 16px;
      color: $short_message_color;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $short_message_color;
    }
    .left_foot {
      width: 20vw;
      height: 20vh;
      gap: 8px;
      line-height: 26px;
    }
    .mid_foot {
      width: 20vw;
      height: 20vh;
    }
    .right_foot {
      width: 20vw;
      height: 20vh;
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
</style>
