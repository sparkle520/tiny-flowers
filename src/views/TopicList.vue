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
const { params } = useRoute();
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const user_store = useUserStore();
const { layout } = storeToRefs(config_store);
const { list_layout } = storeToRefs(config_store);
const router = useRouter();
config_store.$subscribe((mutation, state) => {
  change_layout(state.layout);
  change_list_layout(state.list_layout);
});
onBeforeMount(() => {});
onMounted(() => {
  init();
  document.addEventListener("click", click_handle);
  document.addEventListener("scroll", scroll_handle);

});
const r_o_a_i = (d)=>{
  if(d.classList.contains('fade_out')){
    d.classList.remove('fade_out')
    d.classList.add('fade_in')
  }
}
const r_i_a_o = (d)=>{
  if(d.classList.contains('fade_in')){
    d.classList.remove('fade_in')
    d.classList.add('fade_out')
  }
}
const change_list_layout = (v) => {
  const layout_list = document.querySelectorAll(".layout");
  const topic_grid_box = document.querySelector(".topic_grid_box");
  const topic_list_box = document.querySelector(".topic_list_box");
  if (v) {
    layout_list[0].classList.add("layout_active");
    layout_list[1].classList.remove("layout_active");
    topic_grid_box.style.transform = "translateY(-36px)";
    topic_grid_box.style.opacity = 0.5;
    topic_list_box.style.opacity = 1;
  } else {
    layout_list[1].classList.add("layout_active");
    layout_list[0].classList.remove("layout_active");
    topic_grid_box.style.transform = " translateY(0)";
    topic_grid_box.style.opacity = 1;
    topic_list_box.style.opacity = 0;
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
  change_list_layout(list_layout.value);
  scroll_handle();
  run_time(birthday_date);
};
const change_layout = (flag) => {
  const topic_box = document.querySelector(".topic_box");
  const topic_grid_inner_box = document.querySelector(".topic_grid_inner_box");

  if (flag) {
    topic_box.style.width = "866px";
    show_personal_info.value = true;
    topic_grid_inner_box.style.width = "866px";
  } else {
    topic_box.style.width = "1100px";
    show_personal_info.value = false;
    topic_grid_inner_box.style.width = "1100px";
  }
};
let item_list;
const scroll_handle = () => {
  if(item_list == null){
      item_list = document.querySelectorAll(".topic_item")
  }
  for (let i = 0; i < item_list.length; i++) {
    if ( window.scrollY >=
    item_list[i].offsetTop - window.innerHeight / 1.2) {
      r_o_a_i(item_list[i])
    }else{
      r_i_a_o(item_list[i])
    }
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
  current_data.value = topic_store.current_data;
  data_handle(current_data.value, params.page);
  
};

const data_handle = (array, page_num) => {
  if (page_num * per_page_count >= array.length) {
    current_data.value = array.slice(
      page_num * per_page_count - per_page_count
    );
  } else {
    current_data.value = array.slice(
      (page_num - 1) * per_page_count,
      (page_num - 1) * per_page_count + per_page_count
    );
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
  <div id="topic_list_main" class="f f_d_c r">
    <div class="topic_search_box r">
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
      <label class="search_icon a" for="topic_search">
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
      <div class="filter_search_box a" v-show="show_filter_search_box">
        <ul class="f f_d_c">
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
      class="width_full f f_d_r justify_content_center gap_16 z_index_10"
    >
      <div class="topic_box">
        <div
          class="layout_box f f_d_r a_c r"
        >
          <div
            class="layout list_layout r"
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
            class="layout f a_c j_c_c grid_layout r"
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
       <div class="topic_list_box">
        <div
          v-show="list_layout"
          @click="jump_to_topic(item.link)"
          v-for="(item, ) in current_data"
          :key="item"

          class="topic_item  fade_out f f_d_c r"
        >
          <div class="item_inner_box f f_d_r">
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
            <div class="item_content f f_d_c">
              <span
                class="r title f f_d_r a_c"
                ><span class="item_classification r">{{
                  item.classification
                }}</span
                >{{ item.title }}</span
              >
              <span class="short_msg" v-html="item.short_message"></span>
              <div class="date f f_d_r justify_content_center">
                {{ user_store.name }} /
                {{ item.create_date.split("?")[1].replace(/^0+/, "") }}月{{
                  item.create_date.split("?")[2].replace(/^0+/, "")
                }}日 / {{ item.create_date.split("?")[0] }} /
                {{ item.create_date.split("?")[3] }}
              </div>
            </div>
          </div>
          <div class="a tag_box f f_d_r">
            <span class="tag" v-for="item in item.tags.split('?')" :key="item"
              >#{{ item }}</span
            >
          </div>
        </div>
       </div>
        <div class="topic_grid_box f f_d_r">
          <div
            class="topic_grid_inner_box margin_0_auto f f_d_r warp"
          >
            <div
              v-show="!list_layout"
              @click="jump_to_topic(item.link)"
              v-for="item in current_data"
              :key="item"
              class="topic_item_grid  r"
            >
              <div class="img_box r">
                <img v-if="item.img != ''" :src="item.img" alt="" />
                <img
                  v-else
                  src="https://pic.imgdb.cn/item/65c5a15f9f345e8d03c1f6a4.jpg"
                  alt=""
                />
              </div>
              <div class="topic_item_inner_grid f f_d_c">
                <div class="f f_d_r a_c">
                  <span class="classification_box">{{
                    item.classification
                  }}</span>
                  <span class="date r f f_d_r a_c"
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
                <div class="tags_box f f_d_r">
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
        class="personal_box f f_d_c"
      >
        <div
          class="personal_item intro f r f_d_c a_c"
        >
          <!-- <img
            class="avatar_bg a"
            src="https://pic.imgdb.cn/item/65a9840f871b83018a77d214.jpg"
            alt=""
          /> -->
          <div
            class="avatar_bg a"
          >
          </div>
          <img :src="user_store.avatar" class="z_index_10" alt="" />
          <span
            class="personal_name z_index_10"
            v-text="user_store.name"
          ></span>
          <span class="personal_signature" v-text="user_store.signature"></span>
          <div class="width_full f f_d_r">
            <div
              class="topic_classification_total_box f f_d_c a_c"
            >
              <h3>文章</h3>
              <span v-text="topic_store.length()"></span>
            </div>
            <div
              class="topic_classification_total_box f f_d_c a_c"
            >
              <h3>分类</h3>
              <span v-text="personal_info.classification_total"></span>
            </div>
          </div>
        </div>

        <div
          class="personal_item new_topic_box f f_d_c a_c"
        >
          <h3 class="l_title r">最新文章</h3>
          <ul class="f f_d_c">
            <li
              @click="$router.push(item.link)"
              v-for="item in personal_info.new_topic"
              class="f f_d_c"
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
          class="personal_item classification_box f f_d_c a_c"
        >
          <h3 class="l_title r">分类</h3>
          <ul class="f f_d_c">
            <li
              v-for="classification in topic_store.classification"
              :key="classification"
              @click="classification_handle(classification)"
              class="f f_d_r"
            >
              <span>{{ classification }}</span>
            </li>
          </ul>
        </div>
        <div
          class="personal_item site_info_box f f_d_c a_c"
        >
          <h3 class="l_title r">网站信息</h3>
          <ul class="f f_d_c">
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
  </div>
  <Utils></Utils>
  <div
      class="topic_list_foot r f f_d_r a_c justify_content_center"
    >
      <div class="left_foot f f_d_c  justify_content_center">
        <span class="title_foot">人生格言</span>
        <span class="text_foot" v-html="user_store.aphorism"></span>
      </div>
      <div class="mid_foot f f_d_c">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot f f_d_c justify_content_center">
        <span class="title_foot">联系我</span>
        <span class="text_foot">邮箱: {{user_store.e_mail}}</span>
        <span class="text_foot">GitHub Account: {{user_store.github_account}}</span>
        <span class="text_foot">小红书ID: {{user_store.red_book_ID}}</span>
      </div>
    </div>
</template>
<style lang="scss" scoped>

#topic_list_main {
  @font-face {
  font-family: "misans";
  src: url("/src/assets/font/misans.ttf");
}
  background: $fill_body;
  font-family: "misans";
  width: max(1440px,100vw);
  min-height: 100vh;
  color: $text;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    opacity: 0.08;
    top: 0;
    height: 100%;

    background: url("https://pic.imgdb.cn/item/65d765569f345e8d03dac4f9.png")
      repeat;
    background-size: contain;
  }
  li {
    list-style: none;
    padding: 0 0;
  }
  .l_title {
    font-size: 1em;
    align-self: flex-start;
    margin-left: 18px;
    color: $primary_mix_1;
    &::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 100%;
      background: $primary_mix_3;
      left: -8px;
      bottom: 0;
      opacity: 0.6;
    }
  }
  .topic_list_main_bg {
    position: fixed;
    width: max(1440px,100vw);
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

    width: 550px;
    height: 36px;
    margin: 16px auto;
    margin-top: 90px;
    
    .filter_search_box {
      width: 550px;
      max-height: 226px;

      background: $fill;
      bottom: 0;
      transform: translateY(120%);
      box-shadow: $fill_shadow 2px 3px 10px;
      border-radius: 10px;
      overflow-y: scroll;
      .query_time {
        margin-left: 32px;
        margin-bottom: 16px;
        color: $primary;
        font-size: 0.7em;
      }
      ul {
        margin-left: 32px;
        padding: 0;
        gap: 16px;
        li {
          word-wrap: break-word;
          color: $text_secondary;
          font-size: 1.1em;
          &:hover {
            color: $primary;
          }
        }
      }
    }

    .search_icon {
      width: 72px;
      right: 0;
      bottom: -4px;
      z-index: 11;
      transform: translateX(48px) rotate(15deg);
      svg {
        path {
          fill: $primary_mix_3;
        }
      }
    }
    .topic_search {
      width: inherit;
      height: inherit;
      
      border-radius: 10px;
      background: $fill;
      padding-left: 16px;
      border: none;
      outline: none;
      color: $primary;
      font-size: 1.1em;
      box-shadow: $primary 0 0 0 1px;

      caret-color: $primary;
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        box-shadow: $primary 0px 6px 5px;
      }
      &:focus {
        box-shadow: $primary 0px 6px 5px;
      }
      &::placeholder{
        color: $text_placeholder;
      }
    }
  }
  .topic_box {
    width: 866px;
    padding-bottom: 32px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .layout_box {
      transform: translateY(-8px);
      gap: 4px;
      z-index: 10;

      .list_layout {
        svg {
          path {
            fill: $primary_mix_6;
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
          box-shadow: $fill_shadow 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .grid_layout {
        svg {
          path {
            fill: $primary_mix_6;
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
        
        border-radius: 5px;
        &:hover {
          background: $primary_mix_9;
        }
      }
    }
    .layout_active {
      background: $primary_mix_9;
    }
   
    .topic_item {
      width: 100%;
      height: 200px;
      background: $fill;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin: 0 0 16px 0;
      border-radius: 10px;
      box-shadow: 0px 13px 15px $fill_shadow;
      overflow-y: hidden;
     
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 3px 5px #1f2d3d33;
        .tag_box {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .item_inner_box {
        width: 834px;
        height: 168px;
        padding: 16px;
        .item_img {
          max-width: 250px;
          height: 168px;
          border-radius: 10px;
          object-fit: cover;
          margin-right: 16px;
        }
        .item_content {
          .item_classification {
            font-size: 14px;
            padding: 4px 4px;
            border-radius: 5px;
            margin-right: 8px;
            color: $fill_primary;
            background: $primary_mix_2;
          }
        }
      }
      .title {
        font-size: 1.2em;
        font-weight: 600;
        margin-top: 10px;
        color: $text_title;
        cursor: pointer;
        &:hover{
          color: $primary;
        }
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
        background: $primary_mix_8;
        flex-wrap: wrap;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        .tag {
          margin: 4px;
          color: $fill_primary;
          padding: 10px;
          background: $primary;
          border-radius: 5px;
        }
      }
    }

    .topic_grid_box {
      width: 100%;
      flex-wrap: wrap;
      margin-bottom: 128px;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .topic_grid_inner_box {
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        width: 100%;
        gap: 16px;

      }
      .topic_item_grid {
        width: 32%;
        border-radius: 10px;
        height: 370px;
        background: $fill;
        box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 3px 5px rgba(31, 45, 61, 0.2);
        }
        .img_box {
          width: 100%;
          height: 210px;

          img {
            width: inherit;
            height: inherit;
            object-fit: cover;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
        }
        .topic_item_inner_grid {
          width: calc(100% - 32px);
          height: 128px;
          margin: 16px;
          .classification_box {
            background: $primary_mix_2;
            font-size: 0.6em;
            color: $fill_primary;
            padding: 5px 7px;
            font-weight: bold;
            border-radius: 10px;
          }
          .date {
            height: 24px;
            font-size: 0.7em;
            font-weight: 500;
            margin-left: 16px;
            &::after {
              content: "";
              position: absolute;
              width: 2px;
              height: 16px;
              background: $primary_mix_4;
              top: 4px;
              left: -8px;
            }
          }
          .topic_title {
            margin: 8px 0;
            display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: $text_title;
                    cursor: pointer;
            &:hover {
              color: $primary;
            }
          }
          .topic_short_msg {
            font-size: 0.8em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: $text_subtitle;
          }
          .tags_box {
            margin-top: auto;
            gap: 0;
            height: 30px;
            overflow: hidden;

            .tag_item {
              font-size: 1em;
              transform: scale(0.8);
              flex-shrink: 0;

              background: $primary_mix_9;
              color: $primary;
              padding: 4px 8px;

              border-radius: 100px;
              &:hover {
                color: $fill_primary;
                background: $primary;
              }
            }
          }
        }
      }
    }

    .pagination {
      align-self: center;
      margin-top: 128px;
    }
  }
}

//personal info
.personal_box {
  width: 288px;
  .personal_item {
    width: 288px;
    background-color: $fill;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 10px;
    box-shadow: $fill_shadow 2px 3px 10px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 32px;
    margin-bottom: 16px;
  }
  .intro {
    .avatar_bg {
      top: 0;
      margin: 0;
      object-fit: cover;
      border-radius: 10px;
      background:linear-gradient( $primary_mix_8,$fill);
      z-index: 0;
      width: 288px;
      height: 152px;
      pointer-events: none;
      opacity: 0.9;
      border: none;
    }
    img {
      width: 118px;
      height: 118px;
      border-radius: 50%;
      margin: 74px auto 0 16px;
      border: $fill_shadow 1px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 1.4em;
      font-weight: 900;
      color: $text;
      transform: translateY(-32px);
      margin-left: auto;
      margin-right: 32px;
    }
    .personal_signature {
      margin: 0 0 32px 0;
      font-size: 0.9em;
      color: $text;
    }
    .topic_classification_total_box {
      width: 50%;
      h3 {
        color: $primary;
        margin: 0;
        font-size: 1.2em;
      }
      span {
        color: $text;

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
      color: $text_subtitle;
      li {
        span {
          margin: 4px;
          font-size: 0.9em;
          font-weight: 900;
          cursor: pointer;
        }
        &:hover {
          color: $primary;
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
          color: $text_subtitle;
          // &:last-child {
          //   margin-left: auto;
          // }
          transition: margin 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &:hover {
          background: $primary_mix_2;
          border-radius: 5px;
          span {
            margin-left: 16px;
            color: $fill_primary;

          
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
          margin: 4px 0;
          font-size: 0.9em;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: $text_title;
        }
      }
    }
  }
}
.topic_list_foot {
  width: max(1440px,100vw);
  background: $fill_body;
  color: $primary;
    z-index: 10;
    height: 200px;
    gap: 16px;
    .title_foot {
      font-size: 16px;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
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
  .topic_list_box{
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

  }
@keyframes move_left {
  0% {
    transform: translateX(100px) scale(1);
  }
  100% {
    transform: translateX(0px) scale(1);
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
.fade_in{
  opacity: 1;
  transform: translate(0);
}
.fade_out{
  opacity: 0;
  transform: translateY(48px);
}
</style>
