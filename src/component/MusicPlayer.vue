<!-- @Author: LT -->
<!-- @Date: 2024-01-11 17:14:28 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});
const contain_music = ref(false);
const PLAY_MODE = {
  LIST: 0,
  SINGLE: 1,
  RANDOM: 2,
};
const current_play_mode = ref(0);
const is_play = ref(false);
const play_music_handle = () => {
  if (music_list.value.length === 0) {
    return;
  }

  is_play.value = !is_play.value;
  if (is_play.value === true) {
    play();
  } else {
    pause();
  }
};
const play = () => {
  const music_img = document.querySelector(".record img");
  music_img.classList.add("record_img_active");
  current_play.value.url = music_list.value[0].url;
  current_play.value.name = music_list.value[0].name;
  let audio = document.querySelector(".audio");
  audio.play();
};
const pause = () => {
  const music_img = document.querySelector(".record img");
  music_img.classList.remove("record_img_active");
  let audio = document.querySelector(".audio");
  audio.pause();
};
const music_list = ref([]);
watch(
  music_list,
  (newV, oldV) => {
    if (newV.length > 0) {
      contain_music.value = true;
    } else {
      contain_music.value = false;
    }
  },
  { deep: true }
);
const music_file_handle = () => {
  for (let i = 0; i < update_music_files.value.files.length; ++i) {
    music_list.value.push({
      url: URL.createObjectURL(update_music_files.value.files[i]),
      name: update_music_files.value.files[i].name.split(".")[0],
    });
  }
};
const current_play = ref({
  name: "",
  url: "",
});
const update_music_files = ref();
</script>
<template>
  <div id="main">
    <audio class="audio" :src="current_play.url" autoplay loop></audio>
    <div class="content flex flex_direction_row relative">
      <div class="margin_4_percent">
        <div
          class="record flex align_items_center justify_content_center relative"
        >
          <img
            v-show="contain_music"
            class="record_img"
            src="https://pic.imgdb.cn/item/659e63dc871b83018a2d7de3.jpg"
            alt=""
          />
          <div
            v-show="!contain_music"
            class="record_div flex align_items_center justify_content_center"
          >
            <label
              for="input_file"
              class="file_label relative flex align_items_center justify_content_center"
            >
            点我上传
              <input
                type="file"
                id="input_file"
                accept=".flac, .mp4, .mp3"
                multiple="multiple"
                ref="update_music_files"
                @input="music_file_handle"
                class="none"
              />
            </label>
          </div>
          <div class="circle absolute_center absolute"></div>
          <div class="circle absolute_center absolute"></div>
          <div class="circle absolute_center absolute"></div>
        </div>
      </div>
      <div
        class="music_play_box flex relative flex_direction_column margin_4_percent"
      >
        <div class="music_name relative">
          <span class="absolute">{{ current_play.name }}</span>
        </div>
        <div
          class="music_btn_box absolute flex flex_direction_row align_items_center"
        >
          <!-- left -->
          <svg
            t="1704967907505"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="918"
            width="32"
            height="32"
          >
            <path
              d="M381.44 577.28l346.88 240.64c34.56 24.32 83.2-1.28 83.2-43.52V293.12c0-42.24-47.36-67.84-83.2-43.52L381.44 490.24c-30.72 20.48-30.72 65.28 0 87.04z"
              fill="#fcb071"
              p-id="919"
            ></path>
            <path
              d="M320 828.16c-21.76 0-38.4-16.64-38.4-38.4v-512c0-21.76 16.64-38.4 38.4-38.4s38.4 16.64 38.4 38.4v512c0 20.48-16.64 38.4-38.4 38.4z"
              fill="#fc9f88"
              p-id="920"
            ></path>
          </svg>
          <div
            class="play_pause_btn flex align_items_center justify_content_center"
            @click="play_music_handle"
          >
            <!-- play -->
            <svg
              v-show="!is_play"
              t="1704967954435"
              class="icon play"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="1073"
              width="32"
              height="32"
            >
              <path
                d="M943.36 472.32L433.92 119.04c-49.92-34.56-117.76 1.28-117.76 61.44v706.56c0 60.16 67.84 96 117.76 61.44l509.44-353.28c42.24-29.44 42.24-93.44 0-122.88z"
                fill="#f9785f"
                p-id="1074"
              ></path>
            </svg>
            <!-- pause -->
            <svg
              v-show="is_play"
              t="1704968147614"
              class="icon pause"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8311"
              width="22"
              height="22"
            >
              <path
                d="M819.2 0c84.832 0 153.6 63.68 153.6 142.2336v739.5328C972.8 960.32 904.032 1024 819.2 1024s-153.6-63.68-153.6-142.2336V142.2336C665.6 63.68 734.368 0 819.2 0zM204.8 0c84.832 0 153.6 63.68 153.6 142.2336v739.5328C358.4 960.32 289.632 1024 204.8 1024s-153.6-63.68-153.6-142.2336V142.2336C51.2 63.68 119.968 0 204.8 0z"
                fill="#f9785f"
                p-id="8312"
              ></path>
            </svg>
          </div>

          <!-- right -->
          <svg
            t="1704967967501"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1227"
            width="32"
            height="32"
          >
            <path
              d="M686.08 448L339.2 207.36c-34.56-24.32-83.2 1.28-83.2 43.52v481.28c0 42.24 47.36 67.84 83.2 43.52l346.88-240.64c29.44-21.76 29.44-66.56 0-87.04z"
              fill="#fcb071"
              p-id="1228"
            ></path>
            <path
              d="M746.24 785.92c-21.76 0-38.4-16.64-38.4-38.4v-512c0-21.76 16.64-38.4 38.4-38.4s38.4 16.64 38.4 38.4v512c0 20.48-16.64 38.4-38.4 38.4z"
              fill="#fc9f88"
              p-id="1229"
            ></path>
          </svg>
          <!--  list -->
          <svg
            v-show="current_play_mode === PLAY_MODE.LIST"
            t="1704968029133"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2718"
            width="30"
            height="30"
          >
            <path
              d="M405.76 738.56h-57.6C209.92 738.56 98.56 627.2 98.56 488.96s111.36-249.6 249.6-249.6h76.8L396.8 195.84c-11.52-17.92-6.4-42.24 11.52-52.48 17.92-11.52 42.24-6.4 52.48 11.52l65.28 103.68c7.68 11.52 7.68 26.88 1.28 39.68s-19.2 20.48-33.28 20.48H348.16c-94.72 0-172.8 78.08-172.8 172.8s78.08 172.8 172.8 172.8h57.6c21.76 0 38.4 16.64 38.4 38.4s-17.92 35.84-38.4 35.84zM596.48 846.08c-12.8 0-25.6-6.4-32-17.92L499.2 724.48c-7.68-11.52-7.68-26.88-1.28-39.68s19.2-20.48 33.28-20.48h145.92c94.72 0 172.8-78.08 172.8-172.8s-78.08-172.8-172.8-172.8h-57.6c-21.76 0-38.4-16.64-38.4-38.4s16.64-38.4 38.4-38.4h57.6c138.24 0 249.6 111.36 249.6 249.6s-111.36 249.6-249.6 249.6h-76.8l28.16 43.52c11.52 17.92 6.4 42.24-11.52 52.48-6.4 6.4-14.08 8.96-20.48 8.96z"
              fill="#d2736c"
              p-id="2719"
            ></path>
          </svg>
          <div class="flex align_items_center justify_content_center">
            <!--  single -->
            <div
              class="relative single_btn flex align_items_center justify_content_center"
              v-show="current_play_mode === PLAY_MODE.SINGLE"
            >
              <span class="absolute absolute_center">1</span>
              <svg
                t="1704968029133"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2718"
                width="30"
                height="30"
              >
                <path
                  d="M405.76 738.56h-57.6C209.92 738.56 98.56 627.2 98.56 488.96s111.36-249.6 249.6-249.6h76.8L396.8 195.84c-11.52-17.92-6.4-42.24 11.52-52.48 17.92-11.52 42.24-6.4 52.48 11.52l65.28 103.68c7.68 11.52 7.68 26.88 1.28 39.68s-19.2 20.48-33.28 20.48H348.16c-94.72 0-172.8 78.08-172.8 172.8s78.08 172.8 172.8 172.8h57.6c21.76 0 38.4 16.64 38.4 38.4s-17.92 35.84-38.4 35.84zM596.48 846.08c-12.8 0-25.6-6.4-32-17.92L499.2 724.48c-7.68-11.52-7.68-26.88-1.28-39.68s19.2-20.48 33.28-20.48h145.92c94.72 0 172.8-78.08 172.8-172.8s-78.08-172.8-172.8-172.8h-57.6c-21.76 0-38.4-16.64-38.4-38.4s16.64-38.4 38.4-38.4h57.6c138.24 0 249.6 111.36 249.6 249.6s-111.36 249.6-249.6 249.6h-76.8l28.16 43.52c11.52 17.92 6.4 42.24-11.52 52.48-6.4 6.4-14.08 8.96-20.48 8.96z"
                  fill="#d2736c"
                  p-id="2719"
                ></path>
              </svg>
            </div>
            <!-- random -->
            <svg
              v-show="current_play_mode === PLAY_MODE.RANDOM"
              t="1704968053440"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2872"
              width="30"
              height="30"
            >
              <path
                d="M262.4 768h-99.84c-21.76 0-38.4-16.64-38.4-38.4s16.64-38.4 38.4-38.4h99.84c88.32 0 144.64-90.88 204.8-186.88 64-104.96 138.24-224 268.8-224h28.16l-20.48-25.6c-12.8-16.64-10.24-40.96 6.4-53.76s40.96-10.24 53.76 6.4l69.12 87.04c8.96 11.52 10.24 26.88 3.84 40.96s-19.2 21.76-34.56 21.76h-107.52c-88.32 0-144.64 90.88-203.52 186.88-64 104.96-136.96 224-268.8 224z"
                fill="#d2736c"
                p-id="2873"
              ></path>
              <path
                d="M843.52 666.88h-107.52c-70.4 0-120.32-57.6-167.68-130.56-5.12 7.68-8.96 15.36-14.08 21.76-10.24 15.36-20.48 32-30.72 48.64 52.48 74.24 117.76 136.96 212.48 136.96h28.16l-20.48 25.6c-12.8 16.64-10.24 40.96 6.4 53.76 6.4 5.12 15.36 7.68 24.32 7.68 11.52 0 23.04-5.12 30.72-14.08l69.12-87.04c8.96-11.52 10.24-26.88 3.84-40.96s-20.48-21.76-34.56-21.76zM162.56 332.8h99.84c78.08 0 130.56 70.4 183.04 153.6l6.4-6.4c12.8-20.48 25.6-40.96 39.68-62.72C436.48 332.8 368.64 256 262.4 256h-99.84c-21.76 0-38.4 16.64-38.4 38.4s16.64 38.4 38.4 38.4z"
                fill="#d2736c"
                p-id="2874"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  height: 100%;
  .content {
    width: inherit;
    height: inherit;
    background: #dae6e7;
    border-radius: 10px;
    .record {
      width: 7em;
      height: 7em;
      border-radius: 50%;
      background-color: #fcb071;

      box-shadow: #fcb071 2px 3px 10px;

      .record_img_active {
        width: 4em;
        height: 4em;
        border-radius: inherit;
        animation: cycle_rotate 10s linear infinite;
      }
      .record_img {
        width: 4em;
        height: 4em;
        border-radius: inherit;
      }
      .record_div {
        font-weight: bold;
        color: #ffffff;
        font-size: 14px;
        .file_label {
          width: 4em;
          z-index: 10000;
          height: 4em;
          border-radius: 50%;
          background: #fceee2;
            color: #d2736c;
          
        }
      }
      .circle {
        width: 6em;
        height: 6em;

        border-radius: 50%;
        border: #b8f5fb5e 1px solid;
        &:nth-child(1) {
          width: 6em;
          height: 6em;
        }
        &:nth-child(2) {
          width: 5em;
          height: 5em;
        }
        &:nth-child(3) {
          width: 4.9em;
          height: 4.9em;
        }
      }
    }
    .music_play_box {
      overflow: hidden;

      width: calc(100% - 8%);
      .music_name {
        margin-top: 10px;
        font-weight: bold;
        font-size: 18px;
        height: 1ch;

        span {
          color: #837881;
          white-space: nowrap;
          animation: roll 10s linear infinite;
        }
      }
      .music_btn_box {
        gap: 15px;
        bottom: 0%;
        left: 50%;
        transform: translateX(-50%);
        .play_pause_btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          .play,
          .pause {
            transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
            &:hover {
              transform: scale(1.09);
            }
          }
          .play {
            transform: translateY(-2px);
          }
        }
        .single_btn {
          span {
            font-size: 7px;
            font-weight: bold;
            color: #d2736c;
            font-family: "Microsoft YaHei";
          }
        }
      }
    }
  }
}
@keyframes cycle_rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes roll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
