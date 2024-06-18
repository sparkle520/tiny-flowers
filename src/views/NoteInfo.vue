<!-- @Author: LT -->
<!-- @Date: 2024-02-17 21:01:46 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useNoteStore } from "../store/note";
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
import change_theme from "../assets/theme/NoteInfo";
import { useConfigStore } from "../store/config";
const config_store = useConfigStore();
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const note_store = useNoteStore();
const user_store = useUserStore();
const { params } = useRoute();

const { data } = storeToRefs(note_store);
const router = useRouter();
const note_data = ref();
onBeforeMount(() => {
  note_data.value = note_store.get_note_by_id(params.id);
});
onMounted(() => {
change_theme(config_store.theme);
  window.scrollTo(0, 0);
});
</script>
<template>
  <div id="note_info_main" class="flex flex_direction_column">
    <div class="note_top_box flex flex_direction_row relative">
      <!-- <img
        class="top_box_bg absolute"
        v-if="note_data.img != ''"
        :src="note_data.img"
        alt=""
      />
      <img
        class="top_box_bg absolute"
        v-else
        src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg"
        alt=""
      /> -->
      <div class="note_top_inner_box flex flex_direction_row">
        <div class="note_top_left_box relative">
          <img class="note_top_inner_box_img" v-if="note_data.img != ''" :src="note_data.img" alt="" />
          <img
            v-else
            src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg"
            class="note_top_inner_box_img"
            alt=""
          />
          <img class="note_top_inner_box_img_bg" v-if="note_data.img != ''" :src="note_data.img" alt="" />
          <img
            v-else
            src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg" 
            class="note_top_inner_box_img_bg"
            alt=""
          />
        </div>
        <div class="note_top_mid_box flex flex_direction_column">
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
            class="read_btn relative"
            @click="router.push(`/note/book/${note_data.id}/1`)"
          >
            点击阅读
          </button>
        </div>
       
      </div>
    </div>
    <div class="note_directory_box flex flex_direction_column relative">
      <h1 class="relative">目录</h1>
      <NoteDirectoryList
        :id="note_data.id"
        :data="note_data.directory_list"
        class="note_directory"
        col="3"
      ></NoteDirectoryList>
    </div>
  </div>
  <div
      class="note_info_foot relative flex flex_direction_row align_items_center justify_content_center"
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
$note_info_main_bg: var(--note_info_main_bg, #fdfbfb);
$note_top_mid_box_h1_color: var(--note_top_mid_box_h1_color, #363333b5);
$note_top_mid_box_color: var(--note_top_mid_box_color, #363333b5);
$load_status_color: var(--load_status_color, #71c138c7);
$finished_status_color: var(--finished_status_color, #51a0fac7);
$read_btn_color: var(--read_btn_color, #ec3755);
$read_btn_bg: var(--read_btn_bg, #fff);
$foot_bg: var(--foot_bg, #e96969);

#note_info_main {
  width: max(1440px,100vw);
  min-height: 100vh;
  background: $note_info_main_bg;
  .note_top_box {
    width: inherit;
    height: 500px;
    overflow: hidden;
   
    .top_box_bg {
      width: 130%;
      height: 130%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      object-fit: cover;
      filter: blur(30px);
    }
    .note_top_inner_box {
      z-index: 2;
      margin: 0 auto;
      margin-top: 70px;
     gap: 32px;
      width: 1000px;

      height: calc(100% - 70px);
      .note_top_left_box {
        width: 268px;
        height: 100%;

        .note_top_inner_box_img {
          width: 268px;
          height: 86%;
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
          position: absolute;
          width: 268px;
          height: 86%;
          top:16px;
          filter:blur(20px) ;
          left: 0px;
        }
      }
      .note_top_mid_box {
        width: 600px;
        height: 100%;
        gap: 16px;
        h1 {
          color: $note_top_mid_box_h1_color;
          margin: 0;
          margin-top: 5%;
          animation: to_top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        p {
          margin: 0;
          margin-bottom: 32px;
          color: $note_top_mid_box_color;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        span {
          color: $note_top_mid_box_color;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .load_status {
          font-weight: bold;
          color: $load_status_color;
        }
        .finished_status {
          font-weight: bold;
          color: $finished_status_color;
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
          color: $read_btn_color;
          background: $read_btn_bg;
          box-shadow: #0b090918 0px 3px 10px;
          margin-bottom: 8%;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          animation: shrink 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          .button::before{
  position: absolute;
  content: '';
  left: -2em;
  right: -2em;
  top: -2em;
  bottom: -2em;
  pointer-events: none;
  transition: ease-in-out .5s;
  background-repeat: no-repeat;
  background-image: radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%),
  /*  */
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%),
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%), 
  radial-gradient(circle, #ff0081 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%,
  15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
  83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
  animation: bubbles ease-in-out .75s forwards;
}

.button:active {
  transform: scale(0.95);
  background-color: #f3037c;
  box-shadow: 0 2px 25px rgba(233, 30, 99, 0.5);
}
.button:active::before {
  animation: none;
  background-size: 0;
}
@keyframes bubbles {
  0% {
    background-position: 18% 40%, 20% 31%, 30% 30%, 40% 30%, 50% 30%, 57% 30%, 65% 30%, 80% 32%, 15% 60%,
  83% 60%, 18% 70%, 25% 70%, 41% 70%, 50% 70%, 64% 70%, 80% 71%;
  }
  50% {
    background-position: 10% 44%, 0% 20%, 15% 5%, 30% 0%, 42% 0%, 62% -2%, 75% 0%, 95% -2%, 0% 80%,
  95% 55%, 7% 100%, 24% 100%, 41% 100%, 55% 95%, 68% 96%, 95% 100%;
  }
  100% {
    background-position: 5% 44%, -5% 20%, 7% 5%, 23% 0%, 37% 0, 58% -2%, 80% 0%, 100% -2%, -5% 80%,
  100% 55%, 2% 100%, 23% 100%, 42% 100%, 60% 95%, 70% 96%, 100% 100%;
    background-size: 0% 0%;
  }
}

          &:hover {
            color: $read_btn_bg;
            box-shadow: $read_btn_color 0px 3px 2px;

            &::after {
              transform: skewX(-45deg) scale(1);
              transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
          }
          &::after {
            content: "";
            background: $read_btn_color;
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
    width: max(1440px,100vw);
    background: transparent;
    .note_directory {
      background: transparent;
      margin: 36px auto;
      margin-top: 0;
    }
    h1 {
      width: 900px;
      margin: 32px auto;
      font-size: 1.5em;
      color: $read_btn_color;
      &::after{
        content: '';
        position: absolute;
        width: 6px;
        height: 80%;
        background:$read_btn_color ;
        left: -10px;
        top: 55%;
        transform: translateY(-50%);
      }
    }
  }
  
}
.note_info_foot {
  width: max(1440px,100vw);
  height: 200px;
    gap: 16px;
    z-index: 1;
    background: $foot_bg;
    .title_foot {
      font-size: 16px;
      color: $read_btn_bg;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $read_btn_bg;
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
</style>
