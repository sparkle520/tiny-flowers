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
      <img
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
      />
      <div class="note_top_inner_box flex flex_direction_row">
        <div class="note_top_left_box">
          <img v-if="note_data.img != ''" :src="note_data.img" alt="" />
          <img
            v-else
            src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg"
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
        <div class="note_top_right_box">
          <div class="card flex flex_direction_column"></div>
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
$note_top_mid_box_h1_color: var(--note_top_mid_box_h1_color, #fff);
$note_top_mid_box_p_color: var(--note_top_mid_box_p_color, #ffffffb5);
$note_top_mid_box_span_color: var(--note_top_mid_box_span_color, #ffffffc7);
$load_status_color: var(--load_status_color, #ffffffc7);
$finished_status_color: var(--finished_status_color, #ffffffc7);
$read_btn_color: var(--read_btn_color, #ec3755);
$read_btn_bg: var(--read_btn_bg, #fff);
$foot_bg: var(--foot_bg, #e96969);

#note_info_main {
  width: 100vw;
  min-height: 100vh;
  background: $note_info_main_bg;
  .note_top_box {
    width: inherit;
    height: 70vh;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(30, 33, 40, 0.384);
      z-index: 1;
    }
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
      margin-top: 70px;
      margin-left: 3vw;
      margin-right: 3vw;
      width: inherit;
      gap: 2vw;

      height: calc(100% - 70px);
      .note_top_left_box {
        width: 20vw;
        height: 100%;

        img {
          width: 21vw;
          height: 86%;
          margin: 7% 0;
          background: $note_top_mid_box_h1_color;
          border-radius: 10px;
          object-fit: cover;
          box-shadow: rgba(129, 131, 132, 0.381) 0px 5px 10px;
          animation: shrink 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .note_top_mid_box {
        width: 43vw;
        height: 100%;
        gap: 1vh;
        h1 {
          color: $note_top_mid_box_h1_color;
          margin: 0;
          margin-top: 5%;
          animation: to_top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        p {
          margin: 0;
          margin-bottom: 10vh;
          color: $note_top_mid_box_p_color;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        span {
          color: $note_top_mid_box_span_color;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        .load_status {
          color: $load_status_color;
        }
        .finished_status {
          color: $finished_status_color;
        }
        .read_btn {
          margin-top: auto;
          height: 6vh;
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
      .note_top_right_box {
        width: 26vw;
        height: 100%;
        .card {
          width: 26vw;
          height: 86%;
          margin: 7% auto;
          background: rgba(236, 236, 236, 0.269);
          border-radius: 10px;
        }
      }
    }
  }

  .note_directory_box {
    width: 100vw;
    background: transparent;
    .note_directory {
      background: transparent;
      margin: 5vh auto;
      margin-top: 0;
    }
    h1 {
      width: 60vw;
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
    width: inherit;
    height: 200px;
    gap: 2vw;
    z-index: 1;
    background: $foot_bg;
    .title_foot {
      font-size: 16px;
      color: $note_top_mid_box_h1_color;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $note_top_mid_box_h1_color;
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
    transform: translateY(5vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
