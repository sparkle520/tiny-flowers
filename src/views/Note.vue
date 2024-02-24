<!-- @Author: LT -->
<!-- @Date: 2024-01-05 23:20:31 -->
<!-- @Description:  -->

<script setup>
import { reactive, ref, toRefs, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import change_theme from "../assets/theme/UnknownWorldMap";
import { useConfigStore } from "../store/config";
import { useNoteStore } from "../store/note";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const note_store = useNoteStore();
const { theme } = storeToRefs(store);
const { data } = storeToRefs(note_store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);
  change_theme(theme.value);
  init();
});
const init = () => {
  // init_book_list();
  init_re_note_book_list();
};
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
    id: 1,
    name: "概率论与数理统计",
    link: "",
    img: "https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "",
    img: "https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "",
    img: "https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "",
    img: "https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg",
  },
];
const go_to = (id) => {
  router.push("/note/noteInfo/"+id);
};
</script>
<template>
  <div id="article_main" class="relative flex flex_direction_column">
    <div class="container">
      <div class="grid top_box relative">
        <div class="top_box_bg absolute"></div>

        <div class="note_book_box flex flex_direction_column">
          <span class="title">推荐笔记</span>
          <ul class="flex flex_direction_row">
            <li
            @click="go_to(item.id)"
              v-for="item in recommend_note_list"
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
                  fill="#dc143c"
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
              fill="#6495ed"
              opacity=".15"
              p-id="10841"
            ></path>
            <path
              d="M693.527273 193.163636H223.418182c-13.963636 0-27.927273 13.963636-27.927273 27.927273s11.636364 27.927273 27.927273 27.927273h470.109091c13.963636 0 27.927273-11.636364 27.927272-27.927273 0-13.963636-13.963636-27.927273-27.927272-27.927273zM223.418182 386.327273h330.472727c13.963636 0 27.927273-11.636364 27.927273-27.927273 0-13.963636-11.636364-27.927273-27.927273-27.927273H223.418182c-13.963636 0-27.927273 11.636364-27.927273 27.927273s13.963636 27.927273 27.927273 27.927273zM693.527273 470.109091H223.418182c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927272h470.109091c13.963636 0 27.927273-11.636364 27.927272-27.927272s-13.963636-27.927273-27.927272-27.927273zM553.890909 607.418182H223.418182c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927272h330.472727c13.963636 0 27.927273-11.636364 27.927273-27.927272-2.327273-13.963636-13.963636-27.927273-27.927273-27.927273z"
              fill="#6495ed"
              p-id="10842"
            ></path>
            <path
              d="M986.763636 18.618182H525.963636 86.109091c-13.963636 0-27.927273 11.636364-27.927273 27.927273v267.636363h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927273h20.945454v100.072727h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927272h20.945454v100.072728h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927272 0 13.963636 11.636364 27.927273 27.927273 27.927273h20.945454v100.072727h-20.945454c-13.963636 0-27.927273 11.636364-27.927273 27.927273 0 13.963636 11.636364 27.927273 27.927273 27.927273h20.945454v139.636363c0 13.963636 11.636364 27.927273 27.927273 27.927273h900.654545c16.290909 0 27.927273-11.636364 27.927273-27.927273V46.545455c0-16.290909-11.636364-27.927273-27.927273-27.927273z m-25.6 907.636363c0 13.963636-4.654545 23.272727-18.618181 23.272728H130.327273c-9.309091 0-13.963636-4.654545-16.290909-11.636364-2.327273-4.654545-2.327273-9.309091-2.327273-13.963636V97.745455c0-13.963636 4.654545-23.272727 18.618182-23.272728h812.218182c9.309091 0 13.963636 4.654545 16.290909 11.636364 2.327273 4.654545 2.327273 9.309091 2.327272 13.963636v826.181818z"
              fill="#6495ed"
              p-id="10843"
            ></path>
          </svg>
          <input type="text" class="search" placeholder="在此键入搜索" />
        </div>
        <div class="book_list_box relative flex flex_direction_column align_items_center">
          <ul class="book_list_ul grid relative"> 
            <li             @click="go_to(item.id)"
 v-for="item in data" class="book_item relative">
              <div class="book_item_inner flex flex_direction_row">
                <div class="book_img_box">
                  <img v-if="item.img != ''" :src="item.img" alt="" />
                  <img
                    v-else
                    src="https://pic.imgdb.cn/item/65b3c514871b83018a87b510.png"
                    alt=""
                  />
                </div>
                <div class="book_text_area flex flex_direction_column">
                  <div class="book_name">{{ item.name }}</div>
                  <div class="short_message">{{ item.short_message }}</div>
                  <div class="book_item_bottom flex justify_content_space_between">
                    <div
                    v-if="(item, update_date != '')"
                    class="book_update_time"
                  >
                    更新于 {{ item.update_date.split("?")[0] }}-{{
                      item.update_date.split("?")[1]
                    }}-{{ item.update_date.split("?")[2] }}
                    {{ item.update_date.split("?")[3] }}
                  </div>
                    <div
                    v-if="!item.is_finished"
                    class="load_status"
                  >
                   连载中...
                  </div>
                    <div
                    v-else
                    class="finished_status"
                  >
                   已完结
                  </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <el-pagination
          background
          :page-size="1"
          class="pagination"
          @current-change="current_page_change"
          layout="prev, pager, next"
          :total="parseInt(data.length/10)"
        >
        </el-pagination>
        </div>
      </div>
    </div>
    <div class="foot"></div>
  </div>
</template>
<style lang="scss" scoped>
#article_main {
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
  width: 100vw;
  background: $bg_color;
  min-height: 100vh;

  .container {
    width: 96vw;
    background: $bg_color;
    align-self: center;
    z-index: 1;
    .top_box {
      width: inherit;
      height: 45vh;
      grid-template-columns: 4fr 2fr;
      // backdrop-filter: blur(6px);
      border-radius: 15px;
      -webkit-backdrop-filter: blur(6px);
      // border: 0.727273px solid rgba(255, 255, 255, 0.18);
      box-shadow: #8e8e8e30 0px 6px 15px 0px;
      // -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
      &::after {
        content: "";
        position: absolute;
        width: 20vw;
        height: 20vw;
        left: 0vw;
        border-radius: 50%;
        background: #f0768b;
        filter: blur(4vw);
      }
      &::before {
        content: "";
        position: absolute;
        width: 20vw;
        height: 20vw;
        right: 0;
        border-radius: 50%;
        background: #9acd32;
        filter: blur(8vw);
      }
      .top_box_bg {
        width: 96vw;
        height: 45vh;
        border-radius: inherit;
        object-fit: cover;

        background: linear-gradient(-45deg, #f5cae62c 10%, #c2d3fd20);
      }
      .note_book_box {
        z-index: 1;
        .title {
          font-size: 1.5em;
          font-weight: 900;
          color: #6495ed;
          margin: 1vh 2vw;
        }
        ul {
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
          margin-top: 1vh;
        }
        .re_note_item {
          width: 100%;
          margin: 0 0.5vw;
          transition: all 0.5s cubic-bezier(0.075, 0.82, 0.1);
          background: linear-gradient(180deg, transparent, #716b69 100%);
          border-radius: 20px;
          height: 36vh;
          border-radius: 15px;
          box-shadow: 0 8px 15px #ae406c26;
          transform: translateZ(0);
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 36vh;
            border-radius: 21px;
            left: -8px;
            top: -8px;
            transform: scale(1.5);
            opacity: 0;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            border: #dc143cad 8px dotted;
          }
          &:hover {
            box-shadow: 0 3px 5px #b8799d33;
            &::after {
              opacity: 1;
              transform: scale(1);
            }
            img {
              transform: scale(1.1);
            }
          }
          &:active {
            &::after {
              opacity: 0;
              transform: scale(2);
            }
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
            height: inherit;
            border-radius: inherit;
          }
          img {
            width: inherit;
            height: inherit;
            border-radius: inherit;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
          .text_area {
            bottom: 0;
            overflow: hidden;
            background: linear-gradient(to top, #ffc0cb 30%, transparent);
            width: calc(100% - 1vw);
            color: #ffffe2;
            height: 20vh;
            padding: 1vh 0.5vw;
            border-bottom-left-radius: inherit;
            border-bottom-right-radius: inherit;
            span {
              display: block;
              font-size: 1.1em;
              width: 3.3em;
              top: 9vh;
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
                background: #f0681e;
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
                background: #d90a29;
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
      width: 96vw;
      min-height: 40vh;
      border-radius: 15px;
      margin-top: 13vh;
      -webkit-backdrop-filter: blur(6px);
      // border: 0.727273px solid rgba(255, 255, 255, 0.18);
      box-shadow: #8e8e8e30 0px 6px 15px 0px;
      .search_box {
        width: 50%;
        height: 5vh;
        margin: 1vh auto;
        .search_icon {
          right: 10px;
          top: 50%;
          transform: translateY(calc(-50% + 2px));
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
          border: none;
          font-size: 1.1em;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          font-family: "miscrsoft yahei";
          border: transparent 2px solid;

          &:hover {
            border: #6495ed 2px solid;
          }
          &:focus {
            border: #6495ed 2px solid;
          }
        }
      }
      .book_list_box {
        width: 100%;
        margin-top: 3vh;
        border-radius: inherit;
        min-height: 20vh;
        &::after{
          content: '';
          position: absolute;
          opacity: 1;
          width: 100%;
          top: 0;
          left: 0;
          opacity: .04;
          height: 100%;
        background: url("https://pic.imgdb.cn/item/65d0a5589f345e8d035d9d4b.png") repeat-y;
        background-size:cover; 
        }
        .book_list_ul {
          z-index: 20;
          width: 96%;
          margin: 0 auto;
          height: 100%;
          padding: 0;
          grid-template-columns: repeat(3, 1fr);
          flex-wrap: wrap;
          gap: 1vw;

          .book_item {
            list-style: none;
            border-radius: 15px;
            box-shadow: #8e8e8e30 0px 6px 15px 0px;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            &::before{
              content: '';
              height: 100%;
              width: 100%;
              background: transparent;
              border-radius: inherit;
              position: absolute;
              top: 0;
              z-index: -2;
            }
            &:hover {
              box-shadow: #8e8e8e30 0px 6px 5px 0px;
              transform: scale(0.96);
              &::before{
              }
              .book_img_box {
                transform: scale(1.25) rotateZ(10deg);
              }
              .book_text_area {
              }
            }
            height: 20vh;
            background: #fff;
            .book_item_inner {
              margin: 10px;
              position: relative;
              z-index: 11;
              gap: 1vw;
              .book_img_box {
                width: 13vh;
                height: calc(20vh - 20px);
                border-radius: 10px;
                z-index: 11;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                img {
                  width: inherit;
                  height: inherit;
                  border-radius: inherit;
                  box-shadow: #d3010130 0px 6px 15px 0px;
                }
              }
              .book_text_area {
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                
                .book_name {
                  margin: 1vh 0;
                  font-size: 1.2em;
                  font-weight: 600;
                  color: #ffb3c5;
                  &:hover{
                    color: #d5b3ff;
                  }
                }
                .short_message{
                  height: 9vh;
                  font-size: .9em;
                  overflow-y: scroll;
                  color: #cca3cc;
                }
                .book_item_bottom{
                  margin-top: auto;
                  .book_update_time{
                  font-size: .8em;
                  color: #a09090;
                }
                .load_status{
                  font-size: .8em;
                  color: #9acd32;
                  font-weight: 900;
                  margin-right: 10px;
                }
                .finished_status{
                  font-size: .8em;
                  color: #32cdcd;
                  font-weight: 900;
                  margin-right: 10px;

                }
                }
               
              }
            }
          }
        }
        .pagination{
          margin: 32px 0;
        }
      }
    }
  }
  .foot {
    width: 100vw;
    height: 30vh;
    margin-top: 10vh;
    background: #ffc0cb;
  }
}
</style>
