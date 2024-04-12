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
import { useTopicStore } from "/src/store/topic.js";
import { useUserStore } from "/src/store/user.js";
import emitter from "@/assets/config/mitt_bus.js";
import change_theme from "@/assets/theme/TopicList.js";
const { params } = useRoute();
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const user_store = useUserStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
const { list_layout } = storeToRefs(config_store);
const router = useRouter();
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
  change_list_layout(state.list_layout);
});
onBeforeMount(() => {});
onMounted(() => {
  init();
  document.addEventListener("click", click_handle);
});
const change_list_layout = (v) => {
  const layout_list = document.querySelectorAll(".layout");
  const topic_grid_box = document.querySelector(".topic_grid_box");
  if (v) {
    layout_list[0].classList.add("layout_active");
    layout_list[1].classList.remove("layout_active");
    topic_grid_box.style.transform = "translateY(-20vw)";
    topic_grid_box.style.opacity = 0.5;
  } else {
    layout_list[1].classList.add("layout_active");
    layout_list[0].classList.remove("layout_active");
    topic_grid_box.style.transform = " translateY(0)";
    topic_grid_box.style.opacity = 1;
  }
};
const click_handle = (e) => {
  let topic_search_box = document.querySelector(".topic_search_box");
  if (!topic_search_box.contains(e.target)) {
    show_filter_search_box.value = false;
  }
};
const init = () => {
  window.scrollTo(0, 0);
  change_layout(layout.value);
  change_theme(theme.value);
  change_list_layout(list_layout.value);
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
  const topic_grid_inner_box = document.querySelector(".topic_grid_inner_box");

  if (flag) {
    topic_box.style.width = "60vw";
    show_personal_info.value = true;
    topic_grid_inner_box.style.width = "100%";
  } else {
    topic_box.style.width = "80vw";
    show_personal_info.value = false;
    topic_grid_inner_box.style.width = "92%";
  }
};

const scroll_handle = () => {
  for (let i = 0; i < item_list.length; i++) {
    let elem = item_list[i];
    // console.log(elem.offsetTop,window.scrollY);
    if (elem.offsetTop - window.innerHeight <= window.scrollY) {
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
  document.removeEventListener("click", click_handle);
});

onBeforeMount(() => {
  init_data();
});
const show_personal_info = ref(true);
const per_page_count = 12;
const current_data = ref();
const page_data = ref({
  total: 0,
  page_size: per_page_count,
  current_index: params.page,
});
const init_data = () => {
  topic_store.select_all_from_classification(params.classification);
  remove_all_animation();
  current_data.value = topic_store.current_data;
  data_handle(current_data.value, params.page);
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
  page_data.value.total = array.length;
};
const jump_to_topic = (path) => {
  router.push(path);
};

const page_handle = (index) => {
  router.push(`/article/list/${params.classification}/` + index);
  nextTick(() => {
    window.scrollTo(0, 0);
    page_data.value.current_index = index;
  });
};

const classification_handle = (classification) => {
  router.push(`/article/list/${classification}/1`);

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
  let date_array = [];
  date_array = topic_store.data
    .slice(0, 4)
    .map((item) => format_date(item.create_date));
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
    date.split("?")[0] +
    "-" +
    date.split("?")[1] +
    "-" +
    date.split("?")[2] +
    "-" +
    date.split("?")[3].split(":")[0] +
    "-" +
    date.split("?")[3].split(":")[1]
  );
};
let interval_run_time = setInterval(() => {
  run_time(birthday_date);
}, 60000);
const personal_info = {
  classification_total: 4,
  new_topic: topic_store.data.slice(0, 4),
  site_info: {
    name: "Tiny Flowers",
    run_time: current_run_time,
    last_update: last_update(),
  },
};

const topic_search_handle = (e) => {
  let key_code = window.event ? e.keyCode : e.which;
  if (key_code == 13) {
    // search_text.value = "";
    // router.push({ path: "/unknownWorldMap/list", query: { search_text: search_text.value } });
  }
};
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
  loop(topic_store.get_all(), 0, new_val);
  const query_end = performance.now();
  const query_text = document.querySelector(".query_text");

  const query_diff = query_end - query_start;
  query_text.innerHTML = "查询耗时: " + query_diff + "ms";
});
const loop = (arr, current_index, search_text) => {
  if (current_index > arr.length - 1) return;
  search_text.toLowerCase();
  let per_num = Math.min(10, arr.length - current_index);
  window.requestAnimationFrame(() => {
    for (let i = 0; i < per_num; i++) {
      if (
        arr[current_index + i].title.toLowerCase().indexOf(search_text) == -1 &&
        arr[current_index + i].tags.toLowerCase().indexOf(search_text) == -1
      )
        continue;
      current_filter_list.value.push(arr[current_index + i]);
    }
    loop(arr, current_index + per_num, search_text);
  });
};
const show_filter_search_box = ref(false);
const search_focus_handle = () => {
  if (search_text.value.length == 0) return;
  show_filter_search_box.value = true;
};
</script>
<template>
  <div id="topic_list_main" class="flex flex_direction_column relative">
    <div class="topic_search_box relative">
      <input
        id="topic_search"
        class="topic_search"
        v-model="search_text"
        @focus="search_focus_handle"
        @input="filter_search_handle"
        @keyup.enter="topic_search_handle"
        type="text"
        placeholder="在此键入搜索"
      />
      <label class="search_icon absolute" for="topic_search">
        <svg
          t="1709027338854"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9410"
          width="72"
          height="72"
        >
          <path
            d="M549.660444 56.888889a30.72 30.72 0 0 1 21.617778 8.988444l205.425778 205.482667c5.688889 5.688889 8.988444 13.425778 8.988444 21.560889v271.132444a244.337778 244.337778 0 0 0-316.245333 347.989334H144.327111A30.492444 30.492444 0 0 1 113.777778 881.493333V87.438222C113.777778 70.542222 127.431111 56.888889 144.327111 56.888889h405.333333zM387.811556 477.013333H212.195556a7.623111 7.623111 0 0 0-7.623112 7.68v45.795556c0 4.209778 3.413333 7.623111 7.623112 7.623111h175.616c4.209778 0 7.623111-3.413333 7.623111-7.623111V484.693333a7.623111 7.623111 0 0 0-7.623111-7.68z m190.862222-129.763555H212.195556a7.623111 7.623111 0 0 0-7.623112 7.623111v45.795555c0 4.209778 3.413333 7.623111 7.623112 7.623112h366.478222c4.209778 0 7.623111-3.413333 7.623111-7.623112v-45.795555a7.623111 7.623111 0 0 0-7.623111-7.623111z m-43.064889-219.932445v179.598223h179.655111L535.608889 127.317333z m372.394667 832.398223l-89.031112-89.031112a167.992889 167.992889 0 1 0-41.585777 38.912l90.339555 90.453334a7.395556 7.395556 0 0 0 5.347556 2.161778 7.68 7.68 0 0 0 5.347555-2.218667l29.582223-29.582222a7.566222 7.566222 0 0 0 0-10.695111z m-223.004445-83.512889a106.837333 106.837333 0 1 1 0-213.788445 106.837333 106.837333 0 1 1 0 213.788445z"
            fill="#98fb98"
            p-id="9411"
          ></path>
        </svg>
      </label>
      <div class="filter_search_box absolute" v-show="show_filter_search_box">
        <ul class="flex flex_direction_column">
          <li
            v-for="item in current_filter_list"
            :key="item"

            @click="jump_to_topic(item.link)"
          >
            {{ item.title }}
          </li>
        </ul>
        <div class="query_time"><span class="query_text"></span></div>
      </div>
    </div>
    <div
      class="width_full flex flex_direction_row justify_content_center gap_1vw z_index_10"
    >
      <div class="topic_box">
        <div
          class="layout_box flex flex_direction_row align_items_center relative"
        >
          <div
            class="layout list_layout relative"
            @click="config_store.change_g_list_layout(true)"
          >
            <svg
              t="1707409279938"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="13268"
              width="22"
              height="22"
            >
              <path
                d="M192 304a48 48 0 0 1 48-48h544a48 48 0 0 1 0 96H240a48 48 0 0 1-48-48z"
                fill="#e96969"
                p-id="13269"
              ></path>
              <path
                d="M192 528a48 48 0 0 1 48-48h192a48 48 0 0 1 0 96H240a48 48 0 0 1-48-48z m352 0a48 48 0 0 1 48-48h192a48 48 0 0 1 0 96H592a48 48 0 0 1-48-48z"
                fill="#e96969"
                p-id="13270"
              ></path>
              <path
                d="M192 752a48 48 0 0 1 48-48h544a48 48 0 0 1 0 96H240a48 48 0 0 1-48-48z"
                fill="#e96969"
                p-id="13271"
              ></path>
            </svg>
          </div>
          <div
            class="layout grid_layout relative"
            @click="config_store.change_g_list_layout(false)"
          >
            <svg
              t="1707408621772"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5142"
              width="22"
              height="22"
            >
              <path
                d="M450.56 563.2a10.24 10.24 0 0 1 10.16832 9.04192L460.8 573.44v245.76a10.24 10.24 0 0 1-9.04192 10.16832L450.56 829.44H204.8a10.24 10.24 0 0 1-10.16832-9.04192L194.56 819.2V573.44a10.24 10.24 0 0 1 9.04192-10.16832L204.8 563.2h245.76z m368.64 0a10.24 10.24 0 0 1 10.24 10.24v245.76a10.24 10.24 0 0 1-10.24 10.24H573.44a10.24 10.24 0 0 1-10.24-10.24V573.44a10.24 10.24 0 0 1 10.24-10.24z m-378.89024 20.48h-225.28v225.28h225.28V583.68z m368.64 0h-225.28v225.28h225.28V583.68zM450.56 194.56a10.24 10.24 0 0 1 10.24 10.24v245.76a10.24 10.24 0 0 1-10.24 10.24H204.8a10.24 10.24 0 0 1-10.24-10.24V204.8a10.24 10.24 0 0 1 10.24-10.24z m368.64 0a10.24 10.24 0 0 1 10.16832 9.04192L829.44 204.8v245.76a10.24 10.24 0 0 1-9.04192 10.16832L819.2 460.8H573.44a10.24 10.24 0 0 1-10.16832-9.04192L563.2 450.56V204.8a10.24 10.24 0 0 1 9.04192-10.16832L573.44 194.56h245.76z m-378.89024 20.48h-225.28v225.28h225.28V215.04z m368.64 0h-225.28v225.28h225.28V215.04z"
                fill="#e96969"
                p-id="5143"
              ></path>
            </svg>
          </div>
        </div>
        <div
          v-show="list_layout"
          @click="jump_to_topic(item.link)"
          v-for="(item, ) in current_data"
          :key="item"

          class="topic_item flex flex_direction_column relative"
        >
          <div class="item_inner_box flex flex_direction_row">
            <img
              v-if="item.img != ''"
              class="item_img"
              :src="item.img"
              alt=""
            />
            <img
              v-else
              class="item_img"
              src="https://pic.imgdb.cn/item/65c5a15f9f345e8d03c1f6a4.jpg"
              alt=""
            />
            <div class="item_content flex flex_direction_column">
              <span
                class="relative title flex flex_direction_row align_items_center"
                ><span class="item_classification relative">{{
                  item.classification
                }}</span
                >{{ item.title }}</span
              >
              <span class="short_msg" v-html="item.short_message"></span>
              <div class="date flex flex_direction_row justify_content_center">
                {{ user_store.name }} /
                {{ item.create_date.split("?")[1].replace(/^0+/, "") }}月{{
                  item.create_date.split("?")[2].replace(/^0+/, "")
                }}日 / {{ item.create_date.split("?")[0] }} /
                {{ item.create_date.split("?")[3] }}
              </div>
            </div>
          </div>
          <div class="absolute tag_box flex flex_direction_row">
            <span class="tag" v-for="item in item.tags.split('?')" :key="item"
              >#{{ item }}</span
            >
          </div>
        </div>
        <div class="topic_grid_box flex flex_direction_row">
          <div
            class="topic_grid_inner_box margin_0_auto flex flex_direction_row warp"
          >
            <div
              v-show="!list_layout"
              @click="jump_to_topic(item.link)"
              v-for="item in current_data"
              :key="item"
              class="topic_item_grid relative"
            >
              <div class="img_box relative">
                <img v-if="item.img != ''" :src="item.img" alt="" />
                <img
                  v-else
                  src="https://pic.imgdb.cn/item/65c5a15f9f345e8d03c1f6a4.jpg"
                  alt=""
                />
              </div>
              <div class="topic_item_inner_grid flex flex_direction_column">
                <div class="flex flex_direction_row align_items_center">
                  <span class="classification_box">{{
                    item.classification
                  }}</span>
                  <span class="date relative"
                    >{{ item.create_date.split("?")[0] }}-{{
                      item.create_date.split("?")[1]
                    }}-{{ item.create_date.split("?")[2] }}</span
                  >
                </div>
                <span class="topic_title">{{ item.title }}</span>
                <span
                  class="topic_short_msg"
                  v-html="item.short_message"
                ></span>
                <div class="tags_box flex flex_direction_row">
                  <span
                    v-for="tag in item.tags.split('?')"
                    class="tag_item"
                    :key="tag"
                    >#{{ tag }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          :current_page="page_data.current_index"
          :page_size="page_data.page_size"
          @current_change="page_handle"
          :total="page_data.total"
        >
        </Pagination>
        <!-- <Pagination
          @page_change="page_handle"
          class="pagination"
          :data="page_data"
        ></Pagination> -->
      </div>

      <!-- personal info -->
      <div
        v-show="show_personal_info"
        class="personal_box flex flex_direction_column"
      >
        <div
          class="personal_item intro flex relative flex_direction_column align_items_center"
        >
          <!-- <img
            class="avatar_bg absolute"
            src="https://pic.imgdb.cn/item/65a9840f871b83018a77d214.jpg"
            alt=""
          /> -->
          <div
            class="avatar_bg absolute"
          >
          </div>
          <img :src="user_store.avatar" class="z_index_10" alt="" />
          <span
            class="personal_name z_index_10"
            v-text="user_store.name"
          ></span>
          <span class="personal_signature" v-text="user_store.signature"></span>
          <div class="width_full flex flex_direction_row">
            <div
              class="topic_classification_total_box flex flex_direction_column align_items_center"
            >
              <h3>文章</h3>
              <span v-text="topic_store.length()"></span>
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
          <h3 class="l_title relative">最新文章</h3>
          <ul class="flex flex_direction_column">
            <li
              @click="$router.push(item.link)"
              v-for="item in personal_info.new_topic"
              class="flex flex_direction_column"
              :key="item.link"
            >
              <span> {{ item.title }} </span>
              <span class="new_topic_date">
                {{ item.create_date.split("?")[0] }}-{{
                  item.create_date.split("?")[1]
                }}-{{ item.create_date.split("?")[2] }}
              </span>
            </li>
          </ul>
        </div>
        <div
          class="personal_item classification_box flex flex_direction_column align_items_center"
        >
          <h3 class="l_title relative">分类</h3>
          <ul class="flex flex_direction_column">
            <li
              v-for="classification in topic_store.classification"
              :key="classification"
              @click="classification_handle(classification)"
              class="flex flex_direction_row"
            >
              <span>{{ classification }}</span>
            </li>
          </ul>
        </div>
        <div
          class="personal_item site_info_box flex flex_direction_column align_items_center"
        >
          <h3 class="l_title relative">网站信息</h3>
          <ul class="flex flex_direction_column">
            <li>
              <span>网站名称: Tiny Flowers</span>
            </li>
            <li>
              <span
                >存活时间: {{ personal_info.site_info.run_time.value }}</span
              >
            </li>
            <li>
              <span
                >上次更新时间: {{ personal_info.site_info.last_update }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <img class="topic_list_main_bg" src="https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg" alt=""> -->
    <!-- <img class="topic_list_main_bg" src="https://pic.imgdb.cn/item/65b9140d871b83018ad891c7.jpg" alt=""> -->
    <!-- <img
      class="topic_list_main_bg"
      src="https://pic.imgdb.cn/item/65ba5060871b83018a46c69f.jpg"
      alt=""
    /> -->
  </div>
  <Utils></Utils>
  <div
      class="topic_list_foot relative flex flex_direction_row align_items_center justify_content_center"
    >
      <div class="left_foot flex flex_direction_column  justify_content_center">
        <span class="title_foot">人生格言</span>
        <span class="text_foot" v-html="user_store.aphorism"></span>
      </div>
      <div class="mid_foot flex flex_direction_column">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot flex flex_direction_column justify_content_center">
        <span class="title_foot">联系我</span>
        <span class="text_foot">邮箱: {{user_store.e_mail}}</span>
        <span class="text_foot">GitHub Account: {{user_store.github_account}}</span>
        <span class="text_foot">小红书ID: {{user_store.red_book_ID}}</span>
      </div>
    </div>
</template>
<style lang="scss" scoped>
$topic_bg_color: var(--topic_bg_color, #fdfbfb);
$topic_bg_top: var(--topic_bg_top, #fdfbfb);
$topic_list_bg: var(--topic_list_bg, #f7f3f5);
$color: var(--color, #000000);
$item_bg: var(--item_bg, #ffffffa2);
$item_shadow: var(--item_shadow, #1f2d3d26);
$title_color: var(--title_color, #173e6c);
$title_af_bg: var(--title_af_bg, #22113364);
$tag_box_bg: var(--tag_box_bg, #dae6e7);
$tag_bg: var(--tag_bg, #41a8a8);
$topic_classification_color: var(--topic_classification_color, #41a8a8);
$topic_classification_num_color: var(--topic_classification_num_color, #e06530);
$item_classification_bg: var(--item_classification_bg, #00cbff);
$filter_search_box_bg: var(--filter_search_box_bg, #ffffff);
$tag_item_bg: var(--tag_item_bg, #a5e3ba);
$tag_item_color: var(--tag_item_color, #00cbff);
$layout_hover: var(--layout_hover, #f3acac);

#topic_list_main {
  // background: url("https://pic.imgdb.cn/item/65d0a5589f345e8d035d9d4b.png") repeat-y;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    opacity: 0.08;
    top: 0;
    height: 100%;

    background: url("https://pic.imgdb.cn/item/65d0a7e89f345e8d0368e174.png")
      repeat;
    background-size: contain;
  }
  background: linear-gradient($topic_bg_top 50%,$topic_bg_color);

  width: 100vw;
  min-height: 100vh;
  color: $color;
  li {
    list-style: none;
    padding: 0 0;
  }
  .l_title {
    font-size: 1em;
    align-self: flex-start;
    margin-left: 18px;
    color: $tag_bg;
    &::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 100%;
      background: $tag_bg;
      left: -8px;
      bottom: 0;
      opacity: 0.6;
    }
  }
  .topic_list_main_bg {
    position: fixed;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    left: 0;
    top: 0;
    opacity: 0.7;
  }
  .topic_search_box {
    z-index: 11;
    scrollbar-color: rgba(144, 147, 153, 0.3) transparent; /* 滑块颜色  滚动条背景颜色 */
    scrollbar-width: thin;
    animation: search_item 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(144, 147, 153, 0.3);
      cursor: pointer;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-corner {
      display: none;
    }
    &::-webkit-resizer {
      display: none;
    }

    width: 50vw;
    height: 7vh;
    margin: 3vh auto;
    margin-top: 90px;

    .filter_search_box {
      width: 52vw;
      max-height: 30vh;

      background: $filter_search_box_bg;
      bottom: 0;
      transform: translateY(120%);
      box-shadow: $item_shadow 2px 3px 10px;
      border-radius: 10px;
      overflow-y: scroll;
      .query_time {
        margin-left: 32px;
        margin-bottom: 16px;
        color: $color;
        font-size: 0.7em;
      }
      ul {
        margin-left: 32px;
        padding: 0;
        gap: 16px;
        li {
          word-wrap: break-word;
          color: $title_color;
          font-size: 1.1em;
          &:hover {
            color: $topic_classification_num_color;
          }
        }
      }
    }

    .search_icon {
      width: 5vw;
      right: 0;
      bottom: -0.6vh;
      z-index: 11;
      transform: translateX(3vw) rotate(15deg);
      svg {
        path {
          fill: $tag_bg;
        }
      }
    }
    .topic_search {
      width: inherit;
      height: inherit;
      
      border-radius: 10px;
      background: $item_bg;
      padding-left: 2vw;
      border: none;
      outline: none;
      color: $color;
      font-size: 1.3em;
      box-shadow: $tag_bg 0 0 0 1px;

      caret-color: $color;
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        box-shadow: $tag_bg 0px 6px 5px;
      }
      &:focus {
        box-shadow: $tag_bg 0px 6px 5px;
      }
    }
  }
  .topic_box {
    min-height: calc(100vh);
    width: 60vw;
    padding-bottom: 30px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .layout_box {
      transform: translateY(-1vh);
      gap: 0.2vw;
      z-index: 10;

      .list_layout {
        svg {
          path {
            fill: $tag_bg;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }
        &::after {
          content: "列表";
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          color: #868484;

          font-size: 11px;
          background: #ffff;
          box-shadow: #86848466 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .grid_layout {
        svg {
          path {
            fill: $tag_bg;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }
        &::after {
          content: "网格";
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          color: #868484;

          font-size: 11px;
          background: #fff;
          box-shadow: #86848466 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .layout {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        &:hover {
          background: $layout_hover;
        }
      }
    }
    .layout_active {
      background: $layout_hover;
    }
    .item_animation {
      animation: fade_in 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .topic_item {
      width: 100%;
      min-height: 200px;
      max-height: 200px;
      background: $item_bg;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin: 0 0 2vh 0;
      opacity: 0;
      border-radius: 10px;
      box-shadow: 0px 13px 15px $item_shadow;
      overflow-y: hidden;
      &:active {
        animation: jelly 0.5s;
      }
      &:hover {
        transform: translateY(-1vh);
        box-shadow: 0 3px 5px #1f2d3d33;
        .tag_box {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .item_inner_box {
        width: 96%;
        min-height: 200px;
        .item_img {
          max-width: 30%;
          margin: 16px;
          border-radius: 10px;
          object-fit: cover;
        }
        .item_content {
          margin: 16px;
          .item_classification {
            font-size: 14px;
            padding: 4px 4px;
            border-radius: 5px;
            margin-right: 8px;
            color: #ffff;
            background: $item_classification_bg;
          }
        }
      }
      .title {
        font-size: 1.2em;
        font-weight: 600;
        margin-top: 10px;
        color: $title_color;
      }
      .short_msg {
        margin-top: 20px;
        line-height: 25px;
        font-size: 0.9em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .date {
        font-size: 0.6em;
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
          margin: 4px;
          color: #ffff;
          padding: 10px;
          background: $tag_bg;
          border-radius: 5px;
        }
      }
    }

    .topic_grid_box {
      width: 100%;
      flex-wrap: wrap;
      margin-bottom: 10vh;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .topic_grid_inner_box {
        width: 92%;
        gap: 2%;
      }
      .topic_item_grid {
        width: 32%;
        border-radius: 10px;
        height: 50vh;
        background: $filter_search_box_bg;
        box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
          // transform: translateY(-0.6vh);
          transform: translateY(-1vh);
          box-shadow: 0 3px 5px rgba(31, 45, 61, 0.2);
        }
        .img_box {
          width: 100%;
          height: 30vh;

          img {
            width: inherit;
            height: inherit;
            object-fit: cover;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
        }
        .topic_item_inner_grid {
          width: 94%;
          height: calc(94% - 30vh);
          margin: 3%;
          .classification_box {
            background: $item_classification_bg;
            font-size: 0.6em;
            color: #fff;
            padding: 5px 7px;
            font-weight: bold;
            border-radius: 10px;
          }
          .date {
            font-size: 0.7em;
            font-weight: 500;
            margin-left: 1vw;
            &::after {
              content: "";
              position: absolute;
              width: 0.2vw;
              height: 100%;
              background: $item_classification_bg;
              top: 0;
              left: -0.4vw;
            }
          }
          .topic_title {
            margin: 8px 0;
            overflow: scroll;

            &:hover {
              color: $item_classification_bg;
            }
          }
          .topic_short_msg {
            font-size: 0.8em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .tags_box {
            margin-top: auto;
            gap: 0.4vw;
            height: 30px;
            overflow: scroll;

            .tag_item {
              font-size: 1em;
              transform: scale(0.8);
              flex-shrink: 0;

              background: $tag_item_bg;
              color: $tag_item_color;
              padding: 4px 8px;

              border-radius: 100px;
              &:hover {
                color: #fff;
                background: #00cbff;
              }
            }
          }
        }
      }
    }

    .pagination {
      align-self: center;
      margin-top: 16vh;
    }
  }
}

//personal info
.personal_box {
  width: 20vw;
  .personal_item {
    width: 100%;
    background-color: $item_bg;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 10px;
    box-shadow: $item_shadow 2px 3px 10px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 30px;
    margin-bottom: 20px;
  }
  .intro {
    .avatar_bg {
      top: 0;
      margin: 0;
      object-fit: cover;
      border-radius: 10px;
      background:linear-gradient( $layout_hover,$item_bg);
      z-index: 0;
      width: 20vw;
      height: 20vh;
      pointer-events: none;
      opacity: 0.9;
      border: none;
    }
    img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
      margin: 10vh auto 0vh 1vw;
      border: $item_shadow 2px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 1.4em;
      font-weight: 900;
      color: $title_color;
      transform: translateY(-4vh);
      margin-left: auto;
      margin-right: 32px;
    }
    .personal_signature {
      margin: 0 0 32px 0;
      font-size: 0.9em;
      color: $title_color;
    }
    .topic_classification_total_box {
      width: 50%;
      h3 {
        color: $topic_classification_color;
        margin: 0;
        font-size: 1.2em;
      }
      span {
        color: $title_color;

        font-size: 1.2em;
        margin-top: 16px;
        font-weight: 900;
      }
    }
  }
  .new_topic_box {
    ul {
      width: calc(100% - 32px);
      padding: 0;
      margin: 0;

      gap: 8px;
      color: $title_color;
      li {
        span {
          margin: 0.4vh;
          font-size: 0.9em;
          font-weight: 900;
        }
        &:hover {
          color: $topic_classification_num_color;
        }
      }
    }
    .new_topic_date {
      font-size: 0.5em;
      color: #959596;
    }
  }
  .classification_box {
    ul {
      width: calc(100% - 32px);
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        span {
          font-size: 0.9em;
          padding: 8px;
          padding-left: 4px;
          font-weight: 900;
          color: $title_color;

          // &:last-child {
          //   margin-left: auto;
          // }
          transition: margin 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &:hover {
          background: $topic_classification_num_color;
          border-radius: 5px;
          span {
            margin-left: 16px;
            color: #ffff;

            // &:last-child {
            //   margin-left: auto;
            //   margin-right: 1vw;
            // }
          }
        }
      }
    }
  }
  .site_info_box {
    ul {
      width: calc(100% - 32px);
      padding: 0;
      gap: 16px;
      margin: 0;

      li {
        span {
          margin: 1vw 0;
          font-size: 0.9em;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: $title_color;
        }
      }
    }
  }
}
.topic_list_foot {
    width: 100vw;
    background: $topic_bg_color;
    z-index: 10;
    width: inherit;
    height: 200px;
    gap: 2vw;
    .title_foot {
      font-size: 16px;
      color: $tag_bg;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $tag_bg;
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
@keyframes move_left {
  0% {
    transform: translateX(100px) scale(1);
  }
  100% {
    transform: translateX(0px) scale(1);
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
@keyframes search_item {
  0% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
  }
}
@keyframes topic_grid_box_animation {
  0% {
    transform: scale(2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
