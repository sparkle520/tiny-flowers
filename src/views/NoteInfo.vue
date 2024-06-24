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
  <div id="note_info_main" class="r f f_d_c">
    <div class="note_top_box f f_d_r r">
     
      <div class="note_top_inner_box f f_d_r">
        <div class="note_top_left_box r">
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
  <div
      class="note_info_foot r f f_d_r a_c j_c_c"
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
  @font-face {
  font-family: "misans";
  src: url("/src/assets/font/misans.ttf");
}
font-family: 'misans';
  .note_top_box {
    width: 1100px;
    overflow: hidden;
margin: 70px auto 32px auto;
border-radius: 10px;
    .note_top_inner_box {
      z-index: 2;
      margin: 0 auto;
     gap: 32px;
      width: 1000px;
     
      height: calc(100% - 70px);
      .note_top_left_box {
        width: 268px;
        height: 100%;

        .note_top_inner_box_img {
          width: 268px;
          height: 362px;
          --n:4;
          --r:0deg;
          --d:0%;
          box-shadow: #0b090918 0px 3px 10px;

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
    width: 1100px;
    margin: 0 auto;
    margin-bottom: 32px;
    border-radius: 10px;
    z-index: 1;
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
