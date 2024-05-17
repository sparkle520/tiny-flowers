<script setup>
import {
  ref,
  onMounted,
  watch,
  onUnmounted,
  onBeforeMount,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMathStore } from "/src/store/math.js";
import { useConfigStore } from "../store/config";
import { useUserStore } from "../store/user";
import "/src/assets/css/markdown.scss";
import MathLeftNavBar from "../component/MathLeftNavBar.vue";
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
import { marked, parse } from "marked";
import change_theme from "../assets/theme/Math";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const user_store = useUserStore();
const { theme } = storeToRefs(config_store);
const { params } = useRoute();
const search_text = ref("");
const route = useRoute();
const router = useRouter();
const tags_list = ref([]);
const modules = import.meta.glob("/src/math_data/*/*.md", { as: "raw" });

// const current_subject = ref("");
// const current_difficult = ref("");
// const switch_tag_box = ref(false);
const math_store = useMathStore();
const current_page = ref(params.page);
const init_content =  () => {
  const subject_list = document.querySelectorAll(".subject_context");
  const subject_solution_context = document.querySelectorAll(
    ".subject_solution_context"
  );
  for (let i = 0; i < subject_list.length; i++) {
    const id = current_data.value[i].id;
    const solution_path = `/src/math_data/solution/${id}.md`;
    const problem_path = `/src/math_data/problem/${id}.md`;
    for (const path in modules) {
      if (path == solution_path) {
        modules[path]().then((mod) => {
          subject_solution_context[i].innerHTML =  marked(mod,true)
          nextTick(() => {
            setTimeout(() => {
              renderByMathjax(subject_solution_context[i]).catch(err=>{
          });
            },1000)
            
          });
        });
      } else if (path == problem_path) {
        modules[path]().then((mod) => {
          subject_list[i].innerHTML = marked(mod);
          nextTick(() => {
            renderByMathjax(subject_list[i]).catch(err=>{
          });;
          });
        });
      }
    }
  }
};

config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {
  tags_list.value = math_store.get_tags();
});
onUnmounted(() => {
  document.removeEventListener("click", click_handle);
});
onMounted(() => {
  change_theme(theme.value);
  init_data();
  window.scrollTo(0, 0);
  document.addEventListener("click", click_handle);

  current_page.value = params.page;
});
// const show_tag_box = () => {
//   switch_tag_box.value = true;
//   cover.value = true;
// };
// const close_tag_box = () => {
//   switch_tag_box.value = false;
//   cover.value = false;
// };
// const deleteTagByIndex = (index) => {
//   select_tag_list.value.push(tag_list.value[index]);
//   tag_list.value.splice(index, 1);
// };
// const undo_tag_by_index = (index) => {
//   tag_list.value.push(select_tag_list.value[index]);
//   select_tag_list.value.splice(index, 1);
// };

const current_page_change = (current) => {
  let path_ = route.fullPath.split("/");
  const query = route.query;
  path_[2] = current;
  router.push({ path: path_.join("/"), query: query });
};
const page_num = ref(1);
//  change scss var

// const cover = ref(false);
const show_all_tag = () => {
  const select_tag_ul = document.querySelector(".select_tag ul");
  select_tag_ul.style.height = "auto";
  show_all_tag_flag.value = true;
};
const close_all_tag = () => {
  const select_tag_ul = document.querySelector(".select_tag ul");
  select_tag_ul.style.height = "39px";
  show_all_tag_flag.value = false;
};
const show_all_tag_flag = ref(false);
const show_filter_search_box = ref(false);
const current_filter_list = ref([]);
const search_focus_handle = () => {
  if (search_text.value.length == 0) return;
  show_filter_search_box.value = true;
};
const loop = (arr, current_index, search_text) => {
  if (current_index > arr.length - 1) return;
  search_text.toLowerCase();
  let per_num = Math.min(10, arr.length - current_index);
  window.requestAnimationFrame(() => {
    for (let i = 0; i < per_num; i++) {
      if (
        arr[current_index + i].id
          .toString()
          .slice(0, 0)
          .concat("m", arr[current_index + i].id)
          .indexOf(search_text) == -1 &&
        arr[current_index + i].tags.toLowerCase().indexOf(search_text) == -1
      )
        continue;
      current_filter_list.value.push(arr[current_index + i]);
    }
    loop(arr, current_index + per_num, search_text);
  });
};
watch(search_text, (new_val, old_val) => {
  if (new_val == "") {
    current_filter_list.value = [];
    show_filter_search_box.value = false;
    return;
  }
  show_filter_search_box.value = true;
  current_filter_list.value = [];
  const query_start = performance.now();
  loop(math_store.data, 0, new_val);

  const query_end = performance.now();
  const query_text = document.querySelector(".query_text");
  const query_diff = query_end - query_start;
  query_text.innerHTML = "查询耗时: " + query_diff + "ms";
});
const click_handle = (e) => {
  let search_box = document.querySelector(".search_box");
  if (!search_box.contains(e.target)) {
    show_filter_search_box.value = false;
  }
};
const current_data = ref([]);
const init_data = () => {
  current_data.value = math_store.get_data(route);
  current_data.value.forEach((item) => {
    Object.assign(item, { show_solution: ref(false) });
  });
  nextTick(() => {
    init_content();
  });
};

const cover_flag = ref(false);
</script>
<template>
  <div id="math_main" class="flex flex relative">
    <div class="cover" v-show="cover_flag"></div>
    <div class="note_left_nav_bar">
      <MathLeftNavBar></MathLeftNavBar>
    </div>
    <div>
      <div
        id="top_box"
        class="flex flex_direction_column com_box align_items_center relative"
      >
        <div class="flex flex_direction_row top_top_box align_items_center">
          <div class="search_box relative">
            <input
              v-model="search_text"
              @focus="search_focus_handle"
              @input="filter_search_handle"
              @keyup.enter="topic_search_handle"
              id="math_search"
              type="text"
              class="search"
              placeholder="在此键入搜索"
            />

            <div
              class="filter_search_box absolute"
              v-show="show_filter_search_box"
            >
              <ul class="flex flex_direction_column">
                <li
                  v-for="item in current_filter_list"
                  :key="item"
                  @click="router.push(`/math/details/${item.id}`)"
                >
                  M{{ item.id }}
                  <div class="search_result_text"></div>
                </li>
              </ul>
              <div class="query_time"><span class="query_text"></span></div>
            </div>
            <label class="search_icon absolute" for="math_search"
              ><svg
                t="1708934777476"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6287"
                width="52"
                height="52"
              >
                <path
                  d="M900.311266 0H123.688734C65.769106 0 19.029036 46.621138 19.029036 104.421835v814.680604C19.029036 976.903136 65.888037 1024 123.807666 1024H123.688734h776.622532c57.800697 0 104.659698-47.096864 104.659698-104.897561v-814.680604C1004.970964 46.621138 958.230894 0 900.311266 0z m52.329849 919.102439c0 28.900348-23.310569 52.567712-52.329849 52.567712H123.688734c-28.900348 0-52.329849-23.667364-52.329849-52.567712v-814.680604c0-28.900348 23.786295-52.44878 52.329849-52.44878v0.356794h776.622532c28.900348 0 52.329849 23.191638 52.329849 52.091986v814.680604z"
                  fill="#3BC06D"
                  p-id="6288"
                ></path>
                <path
                  d="M399.609756 828.119861c-7.016957 0-13.558188-2.735424-18.55331-7.730546l-58.990012-58.990012-58.990011 58.990012c-4.995122 4.995122-11.536353 7.730546-18.55331 7.730546s-13.558188-2.735424-18.55331-7.730546c-4.995122-4.995122-7.730546-11.536353-7.730546-18.55331s2.735424-13.558188 7.730546-18.55331l58.990011-58.990012-58.990011-58.990012c-10.228107-10.228107-10.228107-26.878513 0-37.10662 4.995122-4.995122 11.536353-7.730546 18.55331-7.730546s13.558188 2.735424 18.55331 7.730546l58.990011 58.990012 58.990012-58.990012c4.995122-4.995122 11.536353-7.730546 18.55331-7.730546s13.558188 2.735424 18.55331 7.730546c10.228107 10.228107 10.228107 26.878513 0 37.10662L359.173055 724.292683l58.990011 58.990012c10.228107 10.228107 10.228107 26.878513 0 37.10662-4.995122 4.995122-11.536353 7.730546-18.55331 7.730546z"
                  fill="#3BC06D"
                  p-id="6289"
                ></path>
                <path
                  d="M322.066434 448.728455c-14.50964 0-26.283856-11.774216-26.283856-26.283856V338.954704h-83.489895c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h83.489895v-83.489896c0-14.50964 11.774216-26.283856 26.283856-26.283856 14.50964 0 26.283856 11.774216 26.283856 26.283856V286.624855H431.721254c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856h-83.489895v83.489895c0 14.271777-11.774216 26.045993-26.164925 26.045993zM701.933566 846.673171c-17.245064 0-31.278978-14.033914-31.278978-31.278978s14.033914-31.397909 31.278978-31.39791 31.278978 14.033914 31.278978 31.39791c0.118931 17.126132-13.914983 31.278978-31.278978 31.278978zM592.278746 746.176074c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h219.428571c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856H592.278746zM701.933566 657.572125c-17.245064 0-31.278978-14.033914-31.278978-31.278977s14.033914-31.397909 31.278978-31.39791 31.278978 14.033914 31.278978 31.39791c0.118931 17.245064-13.914983 31.278978-31.278978 31.278977z"
                  fill="#C6F4CB"
                  p-id="6290"
                ></path>
                <path
                  d="M592.278746 398.420441c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h219.428571c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856H592.278746zM592.278746 279.726829c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h219.428571c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856H592.278746z"
                  fill="#3BC06D"
                  p-id="6291"
                ></path></svg
            ></label>
          </div>
        </div>
        <div class="flex flex_direction_column select_tag">
          <h4 class="">标签：</h4>
          <ul class="flex flex_direction_row relative">
            <div
              @click="show_all_tag"
              v-show="!show_all_tag_flag"
              class="absolute show_all_tag flex flex_direction_row align_items_center"
            >
              展开全部<svg
                t="1708943924609"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10332"
                width="18"
                height="18"
              >
                <path
                  d="M737.701647 149.865412l47.104 37.647059v0.12047L520.372706 519.830588 255.879529 187.572706l46.98353-37.707294 217.449412 273.829647 217.389176-273.829647zM520.131765 785.106824l217.328941-273.829648 47.104 37.707295-264.432941 332.257882-264.493177-332.257882 46.98353-37.707295 217.509647 273.829648z"
                  fill="#A9B8C0"
                  p-id="10333"
                ></path>
              </svg>
            </div>
            <li
              @click="router.push(`/math/1?tag=${item[0]}`)"
              v-for="item in tags_list"
              :key="item"
              class="relative"
            >
              {{ item[0] }}
              <span class="count"> {{ item[1] }} </span>
            </li>
            <div
              @click="close_all_tag"
              v-show="show_all_tag_flag"
              class="close_all_tag flex flex_direction_row align_items_center"
            >
              收起<svg
                t="1708943924609"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10332"
                width="18"
                height="18"
              >
                <path
                  d="M737.701647 149.865412l47.104 37.647059v0.12047L520.372706 519.830588 255.879529 187.572706l46.98353-37.707294 217.449412 273.829647 217.389176-273.829647zM520.131765 785.106824l217.328941-273.829648 47.104 37.707295-264.432941 332.257882-264.493177-332.257882 46.98353-37.707295 217.509647 273.829648z"
                  fill="#A9B8C0"
                  p-id="10333"
                ></path>
              </svg>
            </div>
          </ul>
        </div>
      </div>
      <div
        id="content_box"
        class="flex flex_direction_column align_items_center"
      >
        <!-- width：100% -->
        <ul class="content_mid_box flex flex_direction_column">
          <li
            v-for="item in current_data.slice(0, 10)"
            :key="item"
            class="content_item_box flex flex_direction_column"
          >
            <div class="flex flex_direction_row content_item_top_box">
              ID:{{ item.id }}
            </div>

            <div
              @click="item.show_solution = !item.show_solution"
              class="subject_context markdown-body"
              v-highlight
            ></div>
            <div
              v-show="item.show_solution"
              class="subject_solution_context markdown-body"
              v-highlight
            ></div>
            <div class="content_tag_box flex align_items_center">
              <div
                v-for="item2 in item.tags.split('?')"
                class="flex content_tag_item align_items_center justify_content_center"
                :key="item2"
              >
                {{ item2 }}
              </div>
            </div>
            <div class="content_item_bottom_box flex flex_direction_row">
              <button
                @click="router.push(`/math/details/${item.id}`)"
                class="content_item_bottom_btn"
              >
                查看详情
              </button>
            </div>
          </li>
        </ul>
        <div
          class="content_bottom_box flex align_items_center justify_content_center"
        >
          <Pagination
            style="z-index: 100"
            :current_page="current_page"
            page_size="10"
            @current_change="current_page_change"
            :total="math_store.current_data.data.length"
          >
          </Pagination>
        </div>
      </div>
    </div>
  
  </div>
  <div
      class="math_foot relative flex flex_direction_row align_items_center justify_content_center"
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
@import url("/src/assets/css/math.scss");

$math_bg_color: var(--math_bg_color, #fdfbfb);
$math_bg_opacity: var(--math_bg_opacity, 1);
$math_bg_top: var(--math_bg_top, #fdfbfb);
$math_li_bg: var(--math_li_bg, #f5f1ec);
$math_li_color: var(--math_li_color, #fdffff);
$math_com_box_bg: var(--math_com_box_bg, #ffff);
$math_com_box_shadow: var(--math_com_box_shadow, #d0cfcf45);
$condition_box: var(--condition_box, #464879);
$tag_sure_btn_color: var(--tag_sure_btn_color, #3cd500);
$tag_sure_btn_bg: var(--tag_sure_btn_bg, #f4fff9);
$math_color: var(--math_color, #282525);
$subject_hover_name_color: var(--subject_hover_name_color, #002661);
$subject_name_color: var(--subject_name_color, #806262);
$content_item_box_hover: var(--content_item_box_hover, #d9c9c3);
$content_tag_item_bg: var(--content_tag_item_bg, #6235a1);
$content_tag_item_color: var(--content_tag_item_color, #d9c9c3);
$content_item_box_color: var(--content_item_box_color, #fbfdfd);
$normal_color: var(--normal_color, #fbfdfd);
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

#math_main {
  width: 100vw;
  min-height: 100vh;
  color: $math_color;
  background: linear-gradient($math_bg_top 50%,$math_bg_color);

  gap: 16px;
  .cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 1000000;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
  }
  .note_left_nav_bar {
    z-index: 10000;
  }
  &::after {
    width: 100vw;
    height: 100vh;
    content: "";
    left: 0;
    top: 0;
    position: fixed;
    z-index: 0;
    opacity: 0.05;
    background: url("https://pic.imgdb.cn/item/65dc38fc9f345e8d03e7728a.png")
      repeat;
  }
  

  .select_tag {
    width: calc(100% - 32px);
    justify-items: flex-start;
    .show_all_tag {
      right: 0;
      user-select: none;
      font-size: 14px;
      height: 40px;
      border-radius: 15px;
      color: $subject_name_color;
      padding: 0 8px;
      background: linear-gradient(90deg, transparent 0%, $math_com_box_bg 10%);
      z-index: 11;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .close_all_tag {
      width: 100%;
      user-select: none;
      color: $subject_name_color;
      font-size: 14px;
      justify-content: flex-end;
      svg {
        transform: rotate(180deg);
      }
    }
    h4 {
      margin: 0;
    }

    ul {
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
      height: 39px;
      overflow: hidden;
      list-style: none;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      li {
        user-select: none;
        background: $math_li_bg;
        padding: 10px;
        font-weight: 900;
        border-radius: 10px;
        color: $math_li_color;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        .count {
          font-size: 12px;
          font-weight: 400;
        }
        &:hover {
          background: $math_li_color;
          color: $math_li_bg;
        }
      }
    }
  }

  .com_box {
    border-radius: 10px;
    box-shadow: #2825250c 0px 0px 20px;
    background: $math_com_box_bg;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    .top_top_box {
      width: calc(100% - 32px);
      height: 60px;
      margin-bottom: 16px;
      font-weight: 600;
      color: $condition_box;

      border-bottom: $condition_box 2px solid;
      .search_box {
        margin: auto auto;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        .search {
          height: 40px;

          width: 40vw;
          color: $subject_name_color;
          background: transparent;
          border: none;
          font-size: 1.2em;
          padding-left: 20px;
          border-radius: 10px;
          font-family: "miscrsoft yahei";
          box-shadow: $condition_box 0 0 0 1px;

          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          &:focus {
            box-shadow: $condition_box 0px 4px 5px;

            outline: none;
          }
          &:hover {
            box-shadow: $condition_box 0px 4px 5px;
          }
          &::placeholder {
            color: rgb(138, 148, 148);
            font-size: 0.9em;
          }
        }

        .search_icon {
          right: 0;
          bottom: 0;
          transform: rotate(10deg) translateZ(0);
          svg {
            path:nth-child(1) {
              fill: $subject_hover_name_color;
            }
            path:nth-child(2) {
              fill: $subject_hover_name_color;
            }
            path:nth-child(3) {
              fill: $condition_box;
            }
            path:nth-child(4) {
              fill: $subject_hover_name_color;
            }
          }
        }
        .filter_search_box {
          width: 100%;
          max-height: 30vh;
          background: $math_com_box_bg;
          bottom: 0;
          z-index: 10000;
          transform: translateY(120%);
          box-shadow: #8787872f 2px 3px 10px;
          border-radius: 10px;
          overflow-y: scroll;
          .query_time {
            margin-left: 2vw;
            margin-bottom: 1vh;
            color: $math_color;
            font-size: 0.7em;
          }
          ul {
            list-style: none;
            margin: 2vh 2vw;
            padding: 0;
            gap: 1vh;
            li {
              word-wrap: break-word;
              color: $subject_hover_name_color;
              user-select: none;
              font-size: 1.1em;
              &:hover {
                color: $math_color;
              }
            }
          }
        }
      }
    }
  }

  #top_box {
    margin-top: 90px;
    width: 70vw;
    z-index: 100000000;
  }

  #content_box {
    margin-top: 30px;
    width: 70vw;
    z-index: 1;
    margin-bottom: 20px;

    .content_mid_box {
      width: 100%;
      height: auto;
      margin: 0;
      padding: 0px;
      margin-bottom: 30px;
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;
      gap: 16px;
      .content_item_box {
        min-height: 60px;
        z-index: 100;
        border-radius: 5px;
        background: $content_item_box_color;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        box-shadow: #2825250c 0px 0px 20px;

        .content_item_top_box {
          width: calc(100% - 32px);
          background: $math_li_bg;
          padding: 8px 16px;
          color: $math_li_color;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .content_item_bottom_box {
          width: calc(100% - 32px);
          background: $content_item_box_color;
          padding: 8px 16px;
          color: $math_li_color;
          justify-content: flex-end;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          .content_item_bottom_btn {
            background: $content_item_box_color;
            border: 1px solid $math_li_bg;
            font-size: 12px;
            padding: 4px 12px;
            color: $math_color;
            transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
            &:hover {
              background: $math_color;
              color: $content_item_box_color;
            }
          }
        }
        &:hover {
          box-shadow: $content_tag_item_bg 0px 0px 0px 4px;
        }

        .subject-num {
          font-family: 600;
          color: #7db8b8;
        }

        .difficulty_hard {
          color: #c54c4c;
          font-weight: 700;
        }
        .difficulty_easy {
          color: #66a321;
          font-weight: 700;
        }
        .difficulty_mid {
          color: #f19742;
          font-weight: 700;
        }

        .subject_context {
          width: calc(100% - 32px);
          padding: 8px 16px;
          color: $normal_color;
        }
        .subject_solution_context {
          width: calc(100% - 48px);
          margin: 8px 16px;
          height: auto;
          border-radius: 5px;
          padding: 8px 8px;
          background: $math_com_box_shadow;
          color: $normal_color;
        }
        .content_tag_box {
          flex-wrap: wrap;
          border-bottom: $tag_sure_btn_color 1px solid;
          .content_tag_item {
            width: auto;
            padding: 0 5px;
            height: 30px;
            align-self: start;
            margin: 5px 0px 3px 3px;
            border-radius: 5px;
            color: $tag_sure_btn_bg;
            font-size: 12px;
            font-weight: 700;
            background: $content_tag_item_bg;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
    }

    .content_bottom_box {
      margin-top: auto;
      margin-bottom: 10px;
      width: 100%;
    }
  }
 
}
.math_foot {
    width: 100vw;
    background: $math_bg_color;
    z-index: 10;
    width: inherit;
    height: 200px;
    gap: 2vw;
    .title_foot {
      font-size: 16px;
      color: $condition_box;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $condition_box;
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
@keyframes move_top {
  0% {
    transform: translate(-50%, -10%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
@keyframes content_box {
  0% {
    opacity: 0;
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
../component/MathLeftNavBar.vue
