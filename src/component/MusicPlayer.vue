<!-- @Author: LT -->
<!-- @Date: 2024-01-11 17:14:28 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import { storeToRefs } from "pinia";
import { useConfigStore } from "../store/config.js";
import { useUserStore } from "../store/user";
const user_store = useUserStore();
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
});
onUnmounted(() => {
});

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
  current_play.value.index = 0;
  change_current_play_by_index();
  is_play.value = !is_play.value;
  if (is_play.value === true) {
    nextTick(() => {
      play();
    });
  } else {
    pause();
  }
};
const play = () => {
  const music_img = document.querySelector(".record img");
  music_img.classList.add("record_img_active");
  let audio = document.querySelector(".audio");
  audio.play();
};
const pause = () => {
  const music_img = document.querySelector(".record img");
  music_img.classList.remove("record_img_active");
  let audio = document.querySelector(".audio");
  audio.pause();
};
const show_music_list = ref(false);
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
  index: -1,
  name: "",
  url: "",
});
watch(
  () => current_play.value.index,
  (newV, oldV) => {
    const item_list = document.querySelectorAll(".list_item .item");
    if (oldV != -1) {
      item_list[oldV].classList.remove("item_active");
    }
    if (newV != -1) {
      item_list[newV].classList.add("item_active");
    }
  },
  { deep: true }
);
const update_music_files = ref();
const switch_play_mode = () => {
  if (current_play_mode.value === 2) {
    current_play_mode.value = 0;
  } else {
    current_play_mode.value += 1;
  }
};
const remove_music = (index) => {
  if (index === current_play.value.index) {
    current_play.value = { index: -1, name: "", url: "" };
    is_play.value = false;
    pause();
    music_list.value.splice(index, 1);
  } else if (index > current_play.value.index) {
    music_list.value.splice(index, 1);
  } else {
    current_play.value.index -= 1;
    music_list.value.splice(index, 1);
  }
};
const remove_all_music = () => {
  current_play.value = { index: -1, name: "", url: "" };
  is_play.value = false;
  music_list.value.splice(0, music_list.value.length);
};
const switch_current_play = (item, index) => {
  current_play.value.name = item.name;
  current_play.value.url = item.url;
  current_play.value.index = index;
  is_play.value = true;
  nextTick(() => {
    play();
  });
};
const switch_music_list = () => {
  show_music_list.value = !show_music_list.value;
};
const start_time_play = () => {
  let audio = document.querySelector(".audio");
  audio.currentTime = 0;
};
const pre_play = () => {
  if (music_list.value.length === 0) {
    return;
  }
  if (current_play.value === -1 || music_list.value.length === 1) {
    start_time_play();
    return;
  }
  filter_blur_music_name();
  if (current_play.value.index === 0) {
    current_play.value.index = music_list.value.length - 1;
  } else {
    current_play.value.index -= 1;
  }
  change_current_play_by_index();
  nextTick(() => {
    play();
    is_play.value = true;
  });
};
const next_play = () => {
  if (music_list.value.length === 0) {
    return;
  }
  if (current_play.value === -1 || music_list.value.length === 1) {
    start_time_play();
    return;
  }
  filter_blur_music_name();
  switch (current_play_mode.value) {
    case PLAY_MODE.LIST:
      list_single_strategy();
      break;
    case PLAY_MODE.RANDOM:
      random_strategy();
      break;
    case PLAY_MODE.SINGLE:
      list_single_strategy();
      break;
    default:
      break;
  }
  is_play.value = true;
};
const list_single_strategy = () => {
  if (current_play.value.index === music_list.value.length - 1) {
    current_play.value.index = 0;
  } else {
    current_play.value.index += 1;
  }
  change_current_play_by_index();
  nextTick(() => {
    play();
  });
};
const random_strategy = () => {
  if (music_list.value.length === 2) {
    current_play.value.index = current_play.value.index === 1 ? 0 : 1;
  } else {
    let random = Math.floor(Math.random() * (music_list.value.length - 1));
    while (random == current_play.value.index) {
      random = Math.floor(Math.random() * (music_list.value.length - 1));
    }
    current_play.value.index = random;
  }
  change_current_play_by_index();
  nextTick(() => {
    play();
  });
};
const update_time_handle = () => {
  const music_audio = document.querySelector(".audio");
  if (music_audio.currentTime >= music_audio.duration - 1) {
    if (current_play_mode.value === PLAY_MODE.SINGLE) {
      music_audio.currentTime = 0;
    } else {
      next_play();
    }
  }
};
const change_current_play_by_index = () => {
  current_play.value.name = music_list.value[current_play.value.index].name;
  current_play.value.url = music_list.value[current_play.value.index].url;
};
const filter_blur_music_name = () => {
  const music_name = document.querySelector(".music_name span");
  music_name.style.filter = "blur(10px)";
  setTimeout(() => {
    music_name.style.filter = "blur(0px)";
  }, 500);
};

//change scss var
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--record_bg", "#292d3e");
    c_c("--record_div_color", "#8e8e8e0f");
    c_c("--file_label_bg", "#323547");
    c_c("--file_label_color", "#ffff ");
    c_c("--circle_border", "#f6f2f833");
    c_c("--music_name_color", "#e8eaeb");
    c_c("--list_item_color", "#f7f3f5");
    c_c("--list_item_hover_color", "#343d53");
    c_c("--list_item_active_color", "#f67d61");
    c_c("--player_bg", "#140d28");
    c_c("--play_btn_fill", "#b5b9d6");
    c_c("--left_right_btn_path_1", "#e8eeee");
    c_c("--left_right_btn_path_2", "#e8eeee");
    c_c("--music_list_fill", "#b5b9d6");
    c_c("--music_player_main_box_shadow_color", "#140d28");
  } else {
    c_c("--record_bg", "#fcb071");
    c_c("--record_div_color", "#ffffff");
    c_c("--file_label_bg", "#fceee2");
    c_c("--file_label_color", "#d2736c");
    c_c("--circle_border", "#b8f5fb5e");
    c_c("--music_name_color", "#837881");
    c_c("--list_item_color", "#4d6782");
    c_c("--list_item_hover_color", "#ffb8b8");
    c_c("--list_item_active_color", "#fd1212");
    c_c("--player_bg", "#f5f5f5");
    c_c("--play_btn_fill", "#f9785f");
    c_c("--left_right_btn_path_1", "#fcb071");
    c_c("--left_right_btn_path_2", "#fc9f88");
    c_c("--music_list_fill", "#FF2C2C");
    c_c("--music_player_main_box_shadow_color", "#8e8e8e30");
  }
};
</script>
<template>
  <div id="music_player_main">
    <audio
      class="audio"
      :src="current_play.url"
      @timeupdate="update_time_handle"
    ></audio>
    <div class="content flex flex_direction_row relative">
      <!-- <img class="play_bg_img" src="https://pic.imgdb.cn/item/65a3e579871b83018a7efee6.jpg" alt=""> -->

      <div class="margin_4_percent">
        <div
          class="record flex align_items_center justify_content_center relative"
        >
          <img
            v-show="contain_music"
            class="record_img"
            :src="user_store.avatar"
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
            @click="pre_play"
            t="1704967907505"
            class="icon left_btn"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="918"
            width="32"
            height="32"
          >
            <path
              class="path_1"
              d="M381.44 577.28l346.88 240.64c34.56 24.32 83.2-1.28 83.2-43.52V293.12c0-42.24-47.36-67.84-83.2-43.52L381.44 490.24c-30.72 20.48-30.72 65.28 0 87.04z"
              p-id="919"
            ></path>
            <path
              class="path_2"
              d="M320 828.16c-21.76 0-38.4-16.64-38.4-38.4v-512c0-21.76 16.64-38.4 38.4-38.4s38.4 16.64 38.4 38.4v512c0 20.48-16.64 38.4-38.4 38.4z"
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
                p-id="8312"
              ></path>
            </svg>
          </div>

          <!-- right -->
          <svg
            @click="next_play"
            t="1704967967501"
            class="icon right_btn"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1227"
            width="32"
            height="32"
          >
            <path
              class="path_1"
              d="M686.08 448L339.2 207.36c-34.56-24.32-83.2 1.28-83.2 43.52v481.28c0 42.24 47.36 67.84 83.2 43.52l346.88-240.64c29.44-21.76 29.44-66.56 0-87.04z"
              p-id="1228"
            ></path>
            <path
              class="path_2"
              d="M746.24 785.92c-21.76 0-38.4-16.64-38.4-38.4v-512c0-21.76 16.64-38.4 38.4-38.4s38.4 16.64 38.4 38.4v512c0 20.48-16.64 38.4-38.4 38.4z"
              p-id="1229"
            ></path>
          </svg>

          <div
            class="flex align_items_center justify_content_center"
            @click="switch_play_mode"
          >
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
                class="play_mode"
                d="M405.76 738.56h-57.6C209.92 738.56 98.56 627.2 98.56 488.96s111.36-249.6 249.6-249.6h76.8L396.8 195.84c-11.52-17.92-6.4-42.24 11.52-52.48 17.92-11.52 42.24-6.4 52.48 11.52l65.28 103.68c7.68 11.52 7.68 26.88 1.28 39.68s-19.2 20.48-33.28 20.48H348.16c-94.72 0-172.8 78.08-172.8 172.8s78.08 172.8 172.8 172.8h57.6c21.76 0 38.4 16.64 38.4 38.4s-17.92 35.84-38.4 35.84zM596.48 846.08c-12.8 0-25.6-6.4-32-17.92L499.2 724.48c-7.68-11.52-7.68-26.88-1.28-39.68s19.2-20.48 33.28-20.48h145.92c94.72 0 172.8-78.08 172.8-172.8s-78.08-172.8-172.8-172.8h-57.6c-21.76 0-38.4-16.64-38.4-38.4s16.64-38.4 38.4-38.4h57.6c138.24 0 249.6 111.36 249.6 249.6s-111.36 249.6-249.6 249.6h-76.8l28.16 43.52c11.52 17.92 6.4 42.24-11.52 52.48-6.4 6.4-14.08 8.96-20.48 8.96z"
                p-id="2719"
              ></path>
            </svg>
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
                  class="play_mode"
                  d="M405.76 738.56h-57.6C209.92 738.56 98.56 627.2 98.56 488.96s111.36-249.6 249.6-249.6h76.8L396.8 195.84c-11.52-17.92-6.4-42.24 11.52-52.48 17.92-11.52 42.24-6.4 52.48 11.52l65.28 103.68c7.68 11.52 7.68 26.88 1.28 39.68s-19.2 20.48-33.28 20.48H348.16c-94.72 0-172.8 78.08-172.8 172.8s78.08 172.8 172.8 172.8h57.6c21.76 0 38.4 16.64 38.4 38.4s-17.92 35.84-38.4 35.84zM596.48 846.08c-12.8 0-25.6-6.4-32-17.92L499.2 724.48c-7.68-11.52-7.68-26.88-1.28-39.68s19.2-20.48 33.28-20.48h145.92c94.72 0 172.8-78.08 172.8-172.8s-78.08-172.8-172.8-172.8h-57.6c-21.76 0-38.4-16.64-38.4-38.4s16.64-38.4 38.4-38.4h57.6c138.24 0 249.6 111.36 249.6 249.6s-111.36 249.6-249.6 249.6h-76.8l28.16 43.52c11.52 17.92 6.4 42.24-11.52 52.48-6.4 6.4-14.08 8.96-20.48 8.96z"
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
                class="play_mode"
                d="M262.4 768h-99.84c-21.76 0-38.4-16.64-38.4-38.4s16.64-38.4 38.4-38.4h99.84c88.32 0 144.64-90.88 204.8-186.88 64-104.96 138.24-224 268.8-224h28.16l-20.48-25.6c-12.8-16.64-10.24-40.96 6.4-53.76s40.96-10.24 53.76 6.4l69.12 87.04c8.96 11.52 10.24 26.88 3.84 40.96s-19.2 21.76-34.56 21.76h-107.52c-88.32 0-144.64 90.88-203.52 186.88-64 104.96-136.96 224-268.8 224z"
                p-id="2873"
              ></path>
              <path
                class="play_mode"
                d="M843.52 666.88h-107.52c-70.4 0-120.32-57.6-167.68-130.56-5.12 7.68-8.96 15.36-14.08 21.76-10.24 15.36-20.48 32-30.72 48.64 52.48 74.24 117.76 136.96 212.48 136.96h28.16l-20.48 25.6c-12.8 16.64-10.24 40.96 6.4 53.76 6.4 5.12 15.36 7.68 24.32 7.68 11.52 0 23.04-5.12 30.72-14.08l69.12-87.04c8.96-11.52 10.24-26.88 3.84-40.96s-20.48-21.76-34.56-21.76zM162.56 332.8h99.84c78.08 0 130.56 70.4 183.04 153.6l6.4-6.4c12.8-20.48 25.6-40.96 39.68-62.72C436.48 332.8 368.64 256 262.4 256h-99.84c-21.76 0-38.4 16.64-38.4 38.4s16.64 38.4 38.4 38.4z"
                p-id="2874"
              ></path>
            </svg>
          </div>
          <!-- music list -->
          <svg
            @click="switch_music_list"
            t="1704979471090"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2425"
            width="32"
            height="32"
          >
            <path
              class="music_list_fill"
              d="M838.99432863 162.40722482l-186.33127437 38.02037807c-13.51137403 2.82796201-23.25213204 14.61113702-23.25213205 28.43672906v412.09690783c0 23.09502305-15.86800901 43.20497508-38.49170507 48.54668107L534.04575904 702.86218588c-34.24976206 8.01255901-61.27251012 37.39194207-61.42961915 72.58435814-0.31421799 48.07535409 44.30473808 83.58198817 90.96611119 72.74146715l29.85071007-6.91279599c48.70379009-11.31184801 83.26777017-53.73127811 85.62440516-103.22061322h0.47132701v-372.34833075c0-10.84052103 7.69834101-20.26706103 18.38175304-22.46658704l150.35331329-30.63625506c10.84052103-2.19952601 18.69597103-11.78317502 18.69597104-22.93791404v-104.47748521c0.15710901-14.76824603-13.35426503-25.76587604-27.96540206-22.78080504zM166.72491631 255.88708001h375.96183773v33.14999904H166.72491631zM166.72491631 387.38731327h375.96183773v33.14999905H166.72491631z"
              p-id="2426"
            ></path>
            <path
              class="music_list_fill"
              d="M166.72491631 518.88754654h375.96183773V552.03754558H166.72491631zM166.72491631 650.3877798h202.98482839v33.14999904H166.72491631z"
              p-id="2427"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <!-- music list box -->
    <div
      class="music_list_box flex flex_direction_column"
      v-show="show_music_list"
    >
      <div class="margin_2_percent">
        <div
          class="flex width_full justify_content_space_around flex_direction_row"
        >
          <label
            for="input_file"
            class="gap_0_2_em flex flex_direction_row align_items_center"
          >
            <svg
              t="1705036717774"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3134"
              width="32"
              height="32"
            >
              <path
                class="music_list_fill"
                d="M785.066667 460.8 563.2 460.8 563.2 238.933333 460.8 238.933333 460.8 460.8 238.933333 460.8 238.933333 563.2 460.8 563.2 460.8 785.066667 563.2 785.066667 563.2 563.2 785.066667 563.2Z"
                fill="#FF6600"
                p-id="3135"
              ></path>
            </svg>
            添加更多
          </label>
          <div
            class="gap_0_5_em flex flex_direction_row align_items_center"
            @click="remove_all_music"
          >
            <svg
              t="1705037231697"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8246"
              width="18"
              height="18"
            >
              <path
                d="M380.342857 336.457143m-336.457143 0a336.457143 336.457143 0 1 0 672.914286 0 336.457143 336.457143 0 1 0-672.914286 0Z"
                fill="transparent"
                p-id="8247"
              ></path>
              <path
                class="music_list_fill"
                d="M943.542857 219.428571h-863.085714C59.977143 219.428571 43.885714 203.337143 43.885714 182.857143S59.977143 146.285714 80.457143 146.285714h863.085714c20.48 0 36.571429 16.091429 36.571429 36.571429S964.022857 219.428571 943.542857 219.428571zM394.971429 782.628571v-248.685714c0-20.48 16.091429-36.571429 36.571428-36.571428s36.571429 16.091429 36.571429 36.571428v248.685714c0 20.48-16.091429 36.571429-36.571429 36.571429S394.971429 803.108571 394.971429 782.628571z m175.542857 0v-248.685714c0-20.48 16.091429-36.571429 36.571428-36.571428s36.571429 16.091429 36.571429 36.571428v248.685714c0 20.48-16.091429 36.571429-36.571429 36.571429S570.514286 803.108571 570.514286 782.628571zM182.857143 292.571429c20.48 0 36.571429 16.091429 36.571428 36.571428v570.514286c0 27.794286 23.405714 51.2 51.2 51.2h497.371429c27.794286 0 51.2-23.405714 51.2-51.2v-570.514286c0-20.48 16.091429-36.571429 36.571429-36.571428s36.571429 16.091429 36.571428 36.571428v570.514286c0 68.754286-55.588571 124.342857-124.342857 124.342857h-497.371429C201.874286 1024 146.285714 968.411429 146.285714 899.657143v-570.514286C146.285714 308.662857 162.377143 292.571429 182.857143 292.571429z"
                p-id="8248"
              ></path>
              <path
                class="play_mode"
                d="M512 0c57.051429 0 102.4 45.348571 102.4 102.4H409.6c0-57.051429 45.348571-102.4 102.4-102.4z"
                fill="#d2736c"
                p-id="8249"
              ></path>
            </svg>
            清空列表
          </div>
        </div>
        <div class="list_box width_full">
          <div class="list_inner_box">
            <div
              v-for="(item, index) in music_list"
              class="relative list_item flex flex_direction_row align_items_center"
            >
              <div @click="switch_current_play(item, index)" class="item">
                {{ item.name }}
              </div>
              <svg
                @click="remove_music(index)"
                t="1705038830083"
                class="icon absolute"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="11384"
                width="32"
                height="32"
              >
                <path
                  d="M819.2 194.56a10.24 10.24 0 0 1 10.24 10.24v614.4a10.24 10.24 0 0 1-10.24 10.24H204.8a10.24 10.24 0 0 1-10.24-10.24V204.8a10.24 10.24 0 0 1 10.24-10.24z m-10.24 20.48H215.04v593.92h593.92V215.04zM675.84 501.76a10.24 10.24 0 0 1 1.19808 20.40832L675.84 522.24H348.16a10.24 10.24 0 0 1-1.19808-20.40832L348.16 501.76h327.68z"
                  fill="#202020"
                  p-id="11385"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$record_bg: var(--record_bg, #fcb071);
$record_div_color: var(--record_div_color, #ffffff);
$file_label_bg: var(--file_label_bg, #fceee2);
$file_label_color: var(--file_label_color, #d2736c);
$circle_border: var(--circle_border, #b8f5fb5e);
$music_name_color: var(--music_name_color, #837881);
$list_item_color: var(--list_item_color, #4d6782);
$list_item_hover_color: var(--list_item_hover_color, #ffb8b8);
$list_item_active_color: var(--list_item_active_color, #fd1212);
$player_bg: var(--player_bg, #8e8e8e0f);
$play_btn_fill: var(--play_btn_fill, #f9785f);
$left_right_btn_path_1: var(--left_right_btn_path_1, #fcb071);
$left_right_btn_path_2: var(--left_right_btn_path_2, #fc9f88);
$music_list_fill: var(--music_list_fill, #ff2c2c);
$music_player_main_box_shadow_color: var(
  --music_player_main_box_shadow_color,
  #8e8e8e30
);

#music_player_main {
  width: 100%;
  height: 100%;
  background-color: $player_bg;
  // backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  // border: 0.727273px solid rgba(255, 255, 255, 0.18);
  box-shadow: $music_player_main_box_shadow_color 0px 6px 15px 0px;
  // -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
  border-radius: 15px;
  -webkit-border-radius: 15px;

  .play_mode {
    fill: $file_label_color;
  }
  .music_list_fill {
    fill: $music_list_fill;
  }

  .content {
    width: inherit;
    height: inherit;
    overflow: hidden;
    // background: #dae6e727;
    &:hover {
      .play_bg_img {
        transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
        // content: url('https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg');
        transform: scale(1.2);
      }
    }
    .play_bg_img {
      width: 100%;
      height: calc(100% + 40px);
      transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
      position: absolute;
      z-index: -1;
      object-fit: cover;
      opacity: 0.4;
      border-radius: 5px;
    }
    .record {
      width: 7em;
      height: 7em;
      border-radius: 25px;
      background-color: $record_bg;

      box-shadow: $record_bg 2px 3px 10px;

      .record_img_active {
        width: 6em;
        height: 6em;
        border-radius: inherit;
        animation: cycle_rotate 10s linear infinite;
      }
      .record_img {
        width: 7em;
        height: 7em;
        border-radius: inherit;
      }
      .record_div {
        font-weight: bold;
        color: $record_div_color;
        font-size: 14px;
        .file_label {
          width: 4em;
          z-index: 10000;
          height: 4em;
          color: $file_label_color;
        }
      }

      .circle {
        width: 6em;
        height: 6em;

        border-radius: 25px;
        border: $circle_border 1px solid;
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
          color: $music_name_color;
          white-space: nowrap;
          animation: roll 10s linear infinite;
        }
      }
      .music_btn_box {
        gap: 15px;
        bottom: 0%;
        left: 50%;
        transform: translateX(-50%);
        .left_btn,
        .right_btn {
          .path_1 {
            fill: $left_right_btn_path_1;
          }
          .path_2 {
            fill: $left_right_btn_path_2;
          }
          transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

          &:hover {
            transform: scale(1.2);
          }
        }
        .play_pause_btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          .play,
          .pause {
            path {
              fill: $play_btn_fill;
            }
            transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
            &:hover {
              transform: scale(1.09);
            }
          }
          .play {
            transform: translateY(-2px);
            path {
              fill: $play_btn_fill;
            }
          }
        }
        .single_btn {
          span {
            font-size: 7px;
            font-weight: bold;
            color: $file_label_color;
            font-family: "Microsoft YaHei";
          }
        }
      }
    }
  }
  .music_list_box {
    width: inherit;
    height: 300px;
    background-color: $player_bg;
    // backdrop-filter: blur(6px);
    // -webkit-backdrop-filter: blur(6px);
    // border: 0.727273px solid rgba(255, 255, 255, 0.18);
    box-shadow: $music_player_main_box_shadow_color 0px 6px 15px 0px;
    // -webkit-box-shadow: rgba(142, 142, 142, 0.19) 0px 6px 15px 0px;
    border-radius: 25px;
    -webkit-border-radius: 25px;

    margin-top: 10px;
    color: $file_label_color;
    animation: fade_in_out 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .list_box {
      overflow-y: scroll;
      overflow-x: hidden;
      height: calc(300px - 50px);
      background: transparent;
      border-radius: 25px;
      .list_inner_box {
        margin-left: 30px;
        margin-top: 10px;
      }
      .list_item {
        padding-left: 1vw;
        min-height: 25px;
        color: $list_item_color;
        padding-top: 3px;
        padding-bottom: 3px;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        user-select: none;
        svg {
          opacity: 0;
          right: 3em;
        }
        &:hover {
          transform: translateX(0.5vw);
          svg {
            opacity: 1;
          }
        }
      }
      .item_active {
        color: $list_item_active_color;
        &::after {
          width: 0.4vw;
          height: 60%;
          top: 50%;
          transform: translateY(-50%);
          background: $list_item_active_color;
          content: "";
          position: absolute;
          left: -0.4vw;
        }
        font-weight: bold;
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
@keyframes fade_in_out {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
