<script setup>
import { ref, onMounted, watch, onUnmounted, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMathStore } from "/src/store/math.js";
import { useConfigStore } from "../store/config";
import change_theme from "../assets/theme/Math";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const { theme } = storeToRefs(config_store);
const { params } = useRoute();
const search_text = ref("");
const route = useRoute();
const router = useRouter();
const tags_list = ref([]);

// const current_subject = ref("");
// const current_difficult = ref("");
// const switch_tag_box = ref(false);
const math_store = useMathStore();
const current_page = ref(params.page);
const { data } = storeToRefs(math_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {
  tags_list.value = math_store.get_tags();
  console.log(tags_list.value);
});
onUnmounted(()=>{
  document.removeEventListener("click", click_handle);

})
onMounted(() => {
  change_theme(theme.value);
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
  router.push(`/math/${current}`);
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
        arr[current_index + i].id.toString().indexOf(search_text) == -1 &&
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
</script>
<template>
  <div
    id="math_main"
    class="flex flex_direction_column align_items_center relative"
  >
    <!-- <div class="cover" v-if="cover"></div> -->
    <!-- <div
      v-if="switch_tag_box"
      class="fixed tag-choose-box flex flex_direction_column align_items_center"
    >
      <div class="choose-top flex flex_direction_row align_items_center">
        <div @click="close_tag_box" class="close-btn">
          <svg
            t="1697596075825"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="14147"
            width="32"
            height="32"
          >
            <path
              d="M707.55328 870.61504h-0.03072a28.79488 28.79488 0 0 1-20.5312-8.51968l-176.5376-176.5376L335.9232 860.0576a29.09184 29.09184 0 0 1-41.04192 0.01024L162.816 727.98208a28.7744 28.7744 0 0 1-8.52992-20.52096c0-7.77216 3.03104-15.07328 8.54016-20.55168L337.3056 512.4096 161.77152 336.88576a29.14304 29.14304 0 0 1-0.01024-41.05216l134.11328-134.16448c11.14112-11.10016 29.952-11.08992 41.08288-0.02048L512.512 337.21344l175.53408-175.53408c11.12064-11.12064 29.92128-11.12064 41.0624 0l132.07552 132.096a28.7744 28.7744 0 0 1 8.50944 20.49024 28.8768 28.8768 0 0 1-8.50944 20.59264L685.6704 510.38208 862.208 686.8992v-0.01024 0.01024c5.49888 5.48864 8.51968 12.8 8.50944 20.5824a28.8256 28.8256 0 0 1-8.52992 20.52096L728.08448 862.11584a28.75392 28.75392 0 0 1-20.5312 8.4992zM510.45376 660.8384c2.62144 0 5.24288 1.00352 7.24992 3.00032l183.79776 183.79776a8.41728 8.41728 0 0 0 6.0416 2.49856h0.01024a8.40704 8.40704 0 0 0 6.03136-2.48832l134.15424-134.16448a8.48896 8.48896 0 0 0 2.5088-6.0416 8.47872 8.47872 0 0 0-2.5088-6.06208v-0.01024L663.95136 517.62176a10.22976 10.22976 0 0 1 0-14.47936l182.75328-182.77376a8.54016 8.54016 0 0 0 0.02048-12.09344l-132.096-132.11648c-3.06176-3.05152-9.04192-3.05152-12.10368 0L519.75168 358.93248c-3.82976 3.84-10.62912 3.85024-14.47936 0l-182.79424-182.784c-3.06176-3.03104-9.09312-3.04128-12.15488 0.01024L176.25088 310.29248a8.62208 8.62208 0 0 0 0.02048 12.1344l182.75328 182.74304a10.22976 10.22976 0 0 1 0 14.47936l-181.72928 181.76a8.45824 8.45824 0 0 0-0.02048 12.07296l132.08576 132.096a8.57088 8.57088 0 0 0 12.09344-0.01024l181.76-181.72928a10.20928 10.20928 0 0 1 7.23968-3.00032z"
              p-id="14148"
            ></path>
          </svg>
        </div>
      </div>
      <div class="to-choose flex flex_direction_column">
        <span class="label-choose">请选择标签</span>
        <div class="flex tag-item-box">
          <div
            @click="deleteTagByIndex(index)"
            v-for="(item, index) in tag_list"
            :id="item.tagId"
            class="tag-item flex align_items_center justify_content_center"
          >
            {{ item.tag_name }}
          </div>
        </div>
      </div>
      <div class="have-choose flex flex_direction_column">
        <span class="label-choose">已选择标签</span>
        <div class="flex tag-item-box">
          <div
            @click="undo_tag_by_index(index)"
            v-for="(item, index) in select_tag_list"
            :id="item.tagId"
            class="tag-item flex align_items_center justify_content_center"
          >
            {{ item.tag_name }}
          </div>
        </div>
      </div>
      <div class="choose-bottom flex align_items_center">
        <button @click="click_tag_sure" class="tag-sure-btn">确定</button>
      </div>
    </div> -->
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
                @click="router.push(`/math/details/${item.id}`)"
              >
                M{{ item.id }} <vue-latex
              style="font-size: 13px"
              :display-mode="true"
              :expression="item.question"
            >
            </vue-latex>
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
            @click="undo_tag_by_index(index)"
            v-for="(item, index) in tags_list"
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
      class="flex flex_direction_column com_box align_items_center"
    >
      <!-- width：96% -->
      <div class="content_top_box grid content_grid_com">
        <div class="flex align_items_center justify_content_center">题号</div>
        <div class="flex align_items_center">题目名称</div>
        <div class="flex align_items_center">标签</div>
        <div class="flex align_items_center justify_content_center">难度</div>
      </div>
      <div class="content_mid_box">
        <div
          @click="router.push(`/math/details/${item.id}`)"
          v-for="(item, index) in data.slice(0, 10)"
          class="content_item_box grid content_grid_com"
        >
          <div
            class="subject-num flex align_items_center justify_content_center"
          >
            M{{ item.id }}
          </div>
          <div
            class="subject_name flex align_items_center justify_content_center"
          >
            <vue-latex
              style="font-size: 13px"
              :display-mode="true"
              :expression="item.question"
            >
            </vue-latex>
          </div>
          <div class="content_tag_box flex align_items_center">
            <div
              v-for="(item2, index) in item.tags.split('?')"
              class="flex content_tag_item align_items_center justify_content_center"
            >
              {{ item2 }}
            </div>
          </div>
          <div
            v-if="item.difficulty == '困难'"
            class="flex align_items_center justify_content_center difficulty_hard"
          >
            {{ item.difficulty }}
          </div>
          <div
            v-if="item.difficulty == '简单'"
            class="flex align_items_center justify_content_center difficulty_easy"
          >
            {{ item.difficulty }}
          </div>
          <div
            v-if="item.difficulty == '中等'"
            class="flex align_items_center justify_content_center difficulty_mid"
          >
            {{ item.difficulty }}
          </div>
        </div>
      </div>
      <div
        class="content_bottom_box flex align_items_center justify_content_center"
      >
        <Pagination
          :current_page="current_page"
          page_size="10"
          @current_change="current_page_change"
          :total="data.length"
        >
        </Pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("/src/assets/css/math.scss");
$math_bg_color: var(--math_bg_color, #fdfbfb);
$math_li_bg: var(--math_li_bg, #f5f1ec);
$math_li_color: var(--math_li_color, #fdffff);
$math_com_box_bg: var(--math_com_box_bg, #ffff);
$math_com_box_shadow: var(--math_com_box_shadow, #d0cfcf45);
$condition_box: var(--condition_box, #464879);
// $tag_btn_color: var(--tag_btn_color, #146e57);
// $tag_btn_bg: var(--tag_btn_bg, #d5e2e8);
// $tag_choose_box_border: var(--tag_choose_box_border, #6b6b6b);
// $tag_choose_box_bg: var(--tag_choose_box_bg, #ffffffeb);
// $tag_item_bg: var(--tag_item_bg, #e3e9f0);
// $tag_item_hover_bg: var(--tag_item_hover_bg, #8d88e5);
// $choose_top: var(--choose_top, #a7a7a7);
$tag_sure_btn_color: var(--tag_sure_btn_color, #3cd500);
$tag_sure_btn_bg: var(--tag_sure_btn_bg, #f4fff9);
$math_color: var(--math_color, #282525);
$subject_hover_name_color: var(--subject_hover_name_color, #002661);
$subject_name_color: var(--subject_name_color, #806262);
$content_item_box_hover: var(--content_item_box_hover, #d9c9c3);
$content_tag_item_bg: var(--content_tag_item_bg, #6235a1);
$content_tag_item_color: var(--content_tag_item_color, #d9c9c3);
$content_item_box_color: var(--content_item_box_color, #fbfdfd);
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
  background: $math_bg_color;
  color: $math_color;
  &::after {
    width: 100vw;
    height: 100vh;
    content: "";
    left: 0;
    top: 0;
    position: fixed;
    z-index: 0;
    opacity: 0.1;
    background: url("https://pic.imgdb.cn/item/65daf42d9f345e8d035803ea.png")
      repeat;
  }

  // .cover {
  //   width: 100vw;
  //   height: 100vh;
  //   position: fixed;
  //   background: #6d6d6e40;
  //   z-index: 10;
  // }
  // .tag-choose-box {
  //   width: 65vw;
  //   height: 70vh;
  //   left: 50%;
  //   top: 50%;
  //   border: $tag_choose_box_border 1px solid;
  //   border-radius: 10px;
  //   background-color: $tag_choose_box_bg;

  //   transform: translate(-50%, -50%);
  //   z-index: 10;
  //   animation: move_top 1s cubic-bezier(0.165, 0.84, 0.44, 1);
  //   .tag-item {
  //     color: $subject_name_color;
  //     background-color: $tag_item_bg;
  //     border-radius: 10px;
  //     padding: 0 10px;
  //     height: 40px;
  //     margin: 5px 5px;
  //     user-select: none;
  //     transform: skewX(-15deg);
  //     animation: sparkle 1s cubic-bezier(0.165, 0.84, 0.44, 1);

  //     @keyframes sparkle {
  //       0% {
  //         opacity: 0;
  //       }

  //       100% {
  //         opacity: 1;
  //       }
  //     }

  //     &:hover {
  //       color: $tag_item_bg;
  //       background: $tag_item_hover_bg;
  //     }
  //   }

  //   .tag-item-box {
  //     width: 100%;
  //     flex-wrap: wrap;
  //   }

  //   .choose-top {
  //     width: 100%;
  //     border-bottom: $choose_top 2px solid;
  //     height: 50px;
  //     border-top-right-radius: inherit;
  //     border-top-left-radius: inherit;

  //     .close-btn {
  //       margin-left: auto;
  //       margin-right: 10px;
  //       svg {
  //         path {
  //           fill: $subject_name_color;
  //         }
  //       }
  //       &:hover {
  //         transform: scale(1.1);
  //       }

  //       &:active {
  //         transform: scale(1.2);
  //       }
  //     }
  //   }

  //   .to-choose {
  //     width: 98%;
  //     overflow-y: auto;
  //     height: 270px;
  //     margin-top: 10px;
  //     background-image: transparent;
  //     border-bottom: $choose_top 2px solid;
  //   }

  //   .label-choose {
  //     margin: 10px 10px;
  //   }

  //   .have-choose {
  //     width: 98%;
  //     overflow-y: auto;
  //     margin: 10px 0;
  //     height: 180px;
  //     background-image: transparent;
  //   }

  //   .choose-bottom {
  //     width: 100%;
  //     height: 60px;
  //     border-bottom-right-radius: inherit;
  //     border-bottom-left-radius: inherit;
  //     .tag-sure-btn {
  //       width: 150px;
  //       height: 40px;
  //       margin-left: auto;
  //       display: flex;
  //       align-items: center;
  //       justify-content: center;
  //       margin-right: 10px;
  //       background-color: $tag_sure_btn_bg;
  //       z-index: 1;
  //       position: relative;
  //       color: $tag_sure_btn_color;
  //       border: 3px solid $tag_sure_btn_color;
  //       font-family: Arial;
  //       font-weight: 800;
  //       border-radius: 10px;
  //       font-size: 1.05em;
  //       transition: transform 0.3s ease, color 0.5s ease;
  //       &::before {
  //         content: "";
  //         inset: 0 0 0 0;
  //         height: 0px;
  //         width: 0px;
  //         position: absolute;
  //         background-color: $tag_sure_btn_color;
  //         z-index: -1;
  //         left: 50%;
  //         top: 50%;
  //         border-radius: 10px;
  //         transform: translate(-50%, -50%);
  //         transition: all 0.3s ease;
  //       }

  //       &:active {
  //         transform: scale(0.9);
  //       }

  //       &:hover {
  //         color: $tag_sure_btn_bg;
  //         &::before {
  //           height: calc(100% + 6px);
  //           width: calc(100% + 6px);
  //         }
  //       }
  //     }
  //   }
  // }
  // .margin-0-10 {
  //   margin: 0 10px;
  // }

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
    box-shadow: 9px 9px 10px $math_com_box_shadow;
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
          z-index: 100;
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

      // .tag-box {
      //   margin: 0 16px;
      //   .tag-btn {
      //     width: 100px;
      //     height: 30px;
      //     border: none;
      //     border-radius: 10px;
      //     font-size: 14px;
      //     font-weight: 600;
      //     color: $tag_btn_color;
      //     background: $tag_btn_bg;
      //     transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      //     &:hover {
      //       transform: scale(1.05);
      //     }

      //     &:active {
      //       animation: extend 1s cubic-bezier(0.165, 0.84, 0.44, 1);

      //       @keyframes extend {
      //         0% {
      //           transform: rotateY(30deg);
      //         }

      //         100% {
      //           transform: rotateY(0);
      //         }
      //       }
      //     }
      //   }
      // }
    }
  }

  #top_box {
    margin-top: 90px;
    width: 80vw;
    z-index: 9;
    animation: content_box 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  #content_box {
    margin-top: 30px;
    width: 80vw;
    z-index: 1;
    margin-bottom: 20px;
    animation: content_box 1.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    .content_grid_com {
      grid-template-columns: 5% 65% 20% 10%;
      gap: 10px;
    }

    .content_top_box {
      width: 98%;
      height: 60px;
      background: #f9fffc38;
      margin-top: 10px;
      border-bottom: $tag_sure_btn_color 2px solid;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
    }

    .content_mid_box {
      width: 98%;
      height: auto;
      margin-bottom: 30px;
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;

      .content_item_box {
        min-height: 60px;
        background: $content_item_box_color;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
          background: $content_item_box_hover;

          .subject_name {
            color: $subject_hover_name_color;
          }
        }

        &:last-child {
          border-bottom-right-radius: inherit;
          border-bottom-left-radius: inherit;
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

        .subject_name {
          justify-self: flex-start;
          color: $subject_name_color;
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
