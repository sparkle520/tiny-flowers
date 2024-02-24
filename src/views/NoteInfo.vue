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
            >标签：<span v-for="item in note_data.tags.split('?')"
              >{{ item }}&ensp;</span
            ></span
          >
          <button class="read_btn relative" @click="router.push(`/note/book/${note_data.id}/1`)">点击阅读</button>
        </div>
        <div class="note_top_right_box">
          <div class="card flex flex_direction_column"></div>
        </div>
      </div>
    </div>
    <div class="note_directory_box flex flex_direction_column relative">
      <h1>目录</h1>
      <NoteDirectoryList :id="note_data.id" :data="note_data.directory_list" class="note_directory" col=3></NoteDirectoryList>
    </div>
    <div class="foot"></div>
  </div>
</template>
<style lang="scss" scoped>
#note_info_main {
  width: 100vw;
  min-height: 100vh;
  .note_top_box {
    width: inherit;
    height: 70vh;
    overflow: hidden;
    &::after{
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.171);
      z-index: 1;
    }
    .top_box_bg{
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
          width: 20vw;
          height: 86%;
          margin: 7% 0;
          border-radius: 10px;
          box-shadow: rgba(129, 131, 132, 0.381) 0px 5px 10px;
          animation: shrink 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        
      }
      .note_top_mid_box {
        width: 44vw;
        height: 100%;
        gap: 1vh;
        h1 {
          color: #fff;
          margin: 0;
          margin-top: 5%;
          animation: to_top 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        p {
          margin: 0;
          margin-bottom: 10vh;
          color: #ffffffb5;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        }
        span {
          color: #ffffffc7;
          animation: to_top 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        }
        .load_status {
          color: #a0e798b9;
        }
        .finished_status {
          color: #4ca6eb;
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
          color: #ff0e54;
          background: #ffffff;
          box-shadow: #ffffff71 0px 3px 10px;
          margin-bottom: 8%;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          animation: shrink 1s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            color: #fff;
            box-shadow: #ff0e54 0px 3px 2px;

            &::after {
              transform: skewX(-45deg) scale(1);
              transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
            }
           
          }
          &::after {
            content: "";
            background:#ff0e54;
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
        .card{
          width: 26vw;
          height: 86%;
          margin: 7% auto;
          background: rgba(236, 236, 236, 0.269);
          border-radius: 10px;
        }
      }
    }
  }
  
  .note_directory_box{
   width: 100vw;
   background: transparent;
   .note_directory{
    background: transparent;
    margin: 5vh auto;
    margin-top: 0;
   }
    h1{
      margin: 3vh auto;
      font-size: 1.5em;
      color: #ff0e54;
    }
  }
  .foot{
    width: 100vw;
    height: 30vh;
    background: #ff0e54;
  }
}
@keyframes shrink {
          0%{
            opacity: 0;
            transform: scale(1.5);
          }
          100%{
            opacity: 1;
            transform: scale(1);
          }
        }
@keyframes to_top {
  0%{
    transform: translateY(5vh);
  }100%{
    transform: translateY(0);
  }
}
</style>
