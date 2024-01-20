<!-- @Author: LT -->
<!-- @Date: 2024-01-13 00:16:43 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import data from "/src/assets/config/data.js";
import emitter from "@/assets/config/mitt_bus.js";
import change_theme from "@/assets/theme/TopicList.js";

const { params } = useRoute();
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
const { layout } = storeToRefs(store);
const router = useRouter();
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
onBeforeMount(() => {});
onMounted(() => {
  init();
});
const init = () => {
  window.scrollTo(0, 0);
  change_layout(layout.value);
  change_theme(theme.value);
  item_list = Array.from(document.querySelectorAll(".topic_item"));
  document.addEventListener("scroll", scroll_handle);
  scroll_handle();
  run_time(birthday_date);
};
let item_list = [];
const side_view_handle = (v) => {
  change_layout(v.current_side_view);
};
const change_layout = (flag) => {
  const topic_box = document.querySelector(".topic_box");

  if (flag) {
    topic_box.style.width = "60vw";
    topic_box.style.margin = "100px 0 0 60px";
    show_personal_info.value = true;
  } else {
    topic_box.style.width = "80vw";
    topic_box.style.margin = "100px auto 0 auto";
    show_personal_info.value = false;
  }
};
const classification = [
  { name: "学习笔记" },
  { name: "技术分享" },
  { name: "生活随想" },
  { name: "二次元" },
];
const scroll_handle = () => {
  for (let i = 0; i < item_list.length; i++) {
    let elem = item_list[i];
    // console.log(elem.offsetTop,window.scrollY);
    if (elem.offsetTop <= window.scrollY + 900) {
      elem.style.opacity = "1";
      elem.classList.add("item_animation");
    }
  }
};
const remove_all_animation = () => {
  for (let i = 0; i < item_list.length; i++) {
    let elem = item_list[i];
    elem.style.opacity = "0";
    elem.classList.remove("item_animation");
  }
};
onUnmounted(() => {
  document.removeEventListener("scroll", scroll_handle);
  clearInterval(interval_run_time);
});

onBeforeMount(() => {
  init_data();
});
const show_personal_info = ref(true);
const per_page_count = 10;
const current_data = ref([]);
const page_data = ref({
  total: 0,
  page_size: per_page_count,
  current_index: params.page,
});
const init_data = () => {
  switch (params.classification) {
    case "学习笔记":
      data_handle(data.study, page_data.value.current_index);
      break;
    case "技术分享":
      data_handle(data.technique, page_data.value.current_index);

      break;
    case "生活随想":
      data_handle(data.life, page_data.value.current_index);

      break;
    case "二次元":
      data_handle(data.acg, page_data.value.current_index);
      break;
    default:
      break;
  }
  remove_all_animation();

  nextTick(() => {
    item_list = Array.from(document.querySelectorAll(".topic_item"));
    document.addEventListener("scroll", scroll_handle);
    scroll_handle();
  });
};
const data_handle = (array, page_num) => {
  // console.log(page_num);
  if (page_num * per_page_count >= array.length) {
    current_data.value = array.slice(
      page_num * per_page_count - per_page_count
    );
    // console.log(array.length);
    // console.log(current_data.value);
  } else {
    current_data.value = array.slice(
      (page_num - 1) * per_page_count,
      (page_num - 1) * per_page_count + per_page_count
    );
    // console.log(array.length);
  }
  page_data.value.total = Math.ceil(array.length / per_page_count);
};
const jump_to_topic = (path) => {
  router.push(path);
};

const page_handle = (index) => {
  switch (params.classification) {
    case "学习笔记":
      router.push("/unknownWorldMap/list/学习笔记/" + index);
      break;
    case "技术分享":
      router.push("/unknownWorldMap/list/技术分享/" + index);

      break;
    case "生活随想":
      router.push("/unknownWorldMap/list/生活随想/" + index);

      break;
    case "二次元":
      router.push("/unknownWorldMap/list/二次元/" + index);
      break;
    default:
      break;
  }
  nextTick(() => {
    window.scrollTo(0, 0);
    page_data.value.current_index = index;
    init_data();
  });
};

let new_topic_data = [];
const new_topic = () => {
  new_topic_data.push(data.life[0]);
  new_topic_data.push(data.study[0]);
  new_topic_data.push(data.technique[0]);
  new_topic_data.push(data.acg[0]);
};
new_topic();
const classification_handle = (classification) => {
  router.push(`/unknownWorldMap/list/${classification}/1`);

  // params.classification = classification;
  // nextTick(()=>{
  //   router.go(0);

  // })
  // params.page = 1
};
const birthday_date = "2024-01-05 11:01:01";
const current_run_time = ref("");
const run_time = (date) => {
  let date_start = new Date(date);
  let date_end = new Date();
  let date_diff = date_end.getTime() - date_start.getTime();
  let day_diff = Math.floor(date_diff / (24 * 3600 * 1000));
  let leave1 = date_diff % (24 * 3600 * 1000);
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000);
  let seconds = Math.round(leave3 / 1000);
  current_run_time.value = `${day_diff}天${hours}小时${minutes}分钟`;
};
const last_update = () => {
  let date_array = [
    format_date(data.life[0].date),
    format_date(data.study[0].date),
    format_date(data.technique[0].date),
    format_date(data.acg[0].date),
  ];
  let date_array_sort = date_array.sort((a, b) => {
    let temp_1 = b.split("-");
    let temp_2 = a.split("-");
    return (
      new Date(temp_1[0], temp_1[1] - 1, temp_1[2], temp_1[3], temp_1[4]) -
      new Date(temp_2[0], temp_2[1] - 1, temp_2[2], temp_2[3], temp_2[4])
    );
  });
  let temp = date_array_sort[0].split("-");

  let date_start = new Date(temp[0], temp[1] - 1, temp[2], temp[3], temp[4]);
  let date_end = new Date();

  let date_diff = date_end.getTime() - date_start.getTime();
  let day_diff = Math.floor(date_diff / (24 * 3600 * 1000));

  let leave1 = date_diff % (24 * 3600 * 1000);
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  if (day_diff == 0 && hours < 24) {
    if (hours === 0) {
      return minutes + "分钟前";
    } else {
      return hours + "小时前";
    }
  } else {
    return day_diff + "天前";
  }
};
// xx月xx号?xxxx?xx:xx  ..?年?时:分 -> xxxx-xx-xx-xx-xx  年-月-日-时-分
const format_date = (date) => {
  return (
    date.split("?")[1] +
    "-" +
    date.split("?")[0].split("月")[0] +
    "-" +
    date.split("?")[0].split("月")[1].split("号")[0] +
    "-" +
    date.split("?")[2].split(":")[0] +
    "-" +
    date.split("?")[2].split(":")[1]
  );
};
let interval_run_time = setInterval(() => {
  run_time(birthday_date);
}, 60000);
const personal_info = {
  img: "https://pic.imgdb.cn/item/659e63dc871b83018a2d7de3.jpg",
  name: "花降らし",
  signature: "人一旦失去重要的东西，就很难再获得了",
  topic_total: data.length(),
  classification_total: 4,
  new_topic: new_topic_data,
  site_info: {
    name: "Tiny Flowers",
    run_time: current_run_time,
    last_update: last_update(),
  },
};
</script>
<template>
  <div id="main" class="flex flex-direction-row">
    <div class="topic_box">
      <div
        @click="jump_to_topic(item.link)"
        v-for="(item, index) in current_data"
        class="topic_item flex flex_direction_column relative"
      >
        <div class="item_inner_box margin_2_percent flex flex_direction_column">
          <div>
            <span class="relative title">{{ item.title }}</span>
          </div>
          <span class="short_msg" v-html="item.short_message"></span>
          <div class="date flex flex_direction_row justify_content_center">
            sparkle /
            {{ item.date.split("?")[0] }} / {{ item.date.split("?")[1] }} /
            {{ item.date.split("?")[2] }}
          </div>
        </div>
        <div class="absolute tag_box flex flex_direction_row">
          <span class="tag" v-for="(item, index) in item.tags.split('?')">{{
            item
          }}</span>
        </div>
      </div>
      <Pagination
        @page_change="page_handle"
        class="pagination"
        :data="page_data"
      ></Pagination>
    </div>

    <!-- personal info -->
    <div
      v-show="show_personal_info"
      class="personal_box flex flex_direction_column"
    >
      <div
        class="personal_item intro flex flex_direction_column align_items_center"
      >
        <img :src="personal_info.img" alt="" />
        <span class="personal_name" v-text="personal_info.name"></span>
        <span
          class="personal_signature"
          v-text="personal_info.signature"
        ></span>
        <div class="width_full flex flex_direction_row">
          <div
            class="topic_classification_total_box flex flex_direction_column align_items_center"
          >
            <h3>文章</h3>
            <span v-text="personal_info.topic_total"></span>
          </div>
          <div
            class="topic_classification_total_box flex flex_direction_column align_items_center"
          >
            <h3>分类</h3>
            <span v-text="personal_info.classification_total"></span>
          </div>
        </div>
      </div>

      <div
        class="personal_item new_topic_box flex flex_direction_column align_items_center"
      >
        <h3>最新文章</h3>
        <ul class="flex flex_direction_column">
          <li
            @click="$router.push(item.link)"
            v-for="item in personal_info.new_topic"
            class="flex flex_direction_column"
            :key="item.link"
          >
            <span> {{ item.title }} </span>
            <span class="new_topic_date">
              {{ item.date.split("?")[1] }}-{{
                item.date.split("?")[0].split("月")[0]
              }}-{{ item.date.split("?")[0].split("号")[0].split("月")[1] }}
            </span>
          </li>
        </ul>
      </div>
      <div
        class="personal_item classification_box flex flex_direction_column align_items_center"
      >
        <h3>分类</h3>
        <ul class="flex flex_direction_column">
          <li
            @click="classification_handle(classification[0].name)"
            class="flex flex_direction_row"
          >
            <span>学习笔记</span>
            <span>{{ data.study.length }}</span>
          </li>
          <li
            @click="classification_handle(classification[1].name)"
            class="flex flex_direction_row"
          >
            <span>技术分享</span>
            <span>{{ data.technique.length }}</span>
          </li>
          <li
            @click="classification_handle(classification[2].name)"
            class="flex flex_direction_row"
          >
            <span>生活随想</span>
            <span>{{ data.life.length }}</span>
          </li>
          <li
            @click="classification_handle(classification[3].name)"
            class="flex flex_direction_row"
          >
            <span>二次元</span>
            <span>{{ data.acg.length }}</span>
          </li>
        </ul>
      </div>
      <div
        class="personal_item site_info_box flex flex_direction_column align_items_center"
      >
        <h3>网站信息</h3>
        <ul class="flex flex_direction_column">
          <li>
            <span>网站名称: Tiny Flowers</span>
          </li>
          <li>
            <span>存活时间: {{ personal_info.site_info.run_time.value }}</span>
          </li>
          <li>
            <span>上次更新时间: {{ personal_info.site_info.last_update }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #000000);
$item_bg: var(--item_bg, #ffffff);
$item_shadow: var(--item_shadow, #cacaca4f);
$title_color: var(--title_color, #173e6c);
$title_af_bg: var(--title_af_bg, #22113364);
$tag_box_bg: var(--tag_box_bg, #dae6e7);
$tag_bg: var(--tag_bg, #41a8a8);
$topic_classification_color: var(--topic_classification_color, #41a8a8);
$topic_classification_num_color: var(--topic_classification_num_color, #e06530);
#main {
  background: $bg_color;
  width: 100%;
  color: $color;

  .topic_box {
    margin: 100px 0 0 60px;
    min-height: calc(100vh);
    width: 60vw;
    padding-bottom: 30px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    .item_animation {
      animation: fade_in 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .topic_item {
      width: 100%;
      min-height: 200px;
      background: $item_bg;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin: 20px 0;
      opacity: 0;
      border-radius: 5px;
      box-shadow: $item_shadow 2px 3px 10px;
      overflow-y: hidden;
      &:active {
        animation: jelly 0.5s;
      }
      &:hover {
        .tag_box {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .item_inner_box {
        width: 96%;
        min-height: 200px;
      }
      .title {
        font-size: 1.5em;
        font-weight: 900;
        margin-top: 10px;
        color: $title_color;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 15px;
          background-color: $title_af_bg;
        }
      }
      .short_msg {
        margin-top: 20px;
        line-height: 25px;
        font-weight: 600;
      }
      .date {
        font-weight: 900;
        letter-spacing: 0.1em;
        margin-top: auto;
        align-self: flex-start;
      }
      .tag_box {
        bottom: 0;
        opacity: 0;
        transform: translateY(100%);
        width: 100%;
        background: $tag_box_bg;
        flex-wrap: wrap;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        .tag {
          margin: 10px;
          color: $tag_box_bg;
          padding: 10px;
          background: $tag_bg;
          border-radius: 5px;
        }
      }
    }
    .pagination {
      align-self: center;
    }
  }
}

//personal info
.personal_box {
  width: calc(40vw - 160px);
  margin-left: 40px;
  margin-top: 120px;
  .personal_item {
    width: 100%;
    background-color: $item_bg;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 5px;
    box-shadow: $item_shadow 2px 3px 10px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
  .intro {
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: 30px 0;
      border: $item_shadow 2px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 25px;
      font-weight: 900;
      color: $color;
    }
    .personal_signature {
      margin: 20px 0;
      color: $color;
    }
    .topic_classification_total_box {
      width: 50%;
      h3 {
        color: $topic_classification_color;
        margin: 0;
        font-size: 25px;
      }
      span {
        color: $topic_classification_num_color;

        font-size: 20px;
        margin-top: 20px;
        font-weight: 900;
      }
    }
  }
  .new_topic_box {
    ul {
      width: 90%;
      padding: 0;
      gap: 10px;
      li {
        span {
          margin: 5px;
          font-weight: 900;
        }
        &:hover {
          color: $topic_classification_num_color;
        }
      }
    }
    .new_topic_date {
      font-size: 12px;
      color: $title_color;
    }
  }
  .classification_box {
    ul {
      width: 90%;
      padding: 0;
      li {
        width: 100%;

        span {
          padding: 10px;
          font-weight: 900;
          &:last-child {
            margin-left: auto;
          }
          transition: margin 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &:hover {
          color: $bg_color;
          background: $topic_classification_num_color;
          border-radius: 5px;
          span {
            margin-left: 10px;
            &:last-child {
              margin-left: auto;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
  .site_info_box {
    ul {
      width: 90%;
      padding: 0;
      gap: 15px;
      li {
        span {
          margin: 5px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }
      }
    }
  }
}

@keyframes move_left {
  0% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0px);
  }
}
@keyframes jelly {
  0%,
  100% {
    transform: scale(1, 1);
  }

  33% {
    transform: scale(0.9, 1.1);
  }

  66% {
    transform: scale(1.1, 0.9);
  }
}
@keyframes fade_in {
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
