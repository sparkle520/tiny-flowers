<!-- @Author: LT -->
<!-- @Date: 2024-01-13 00:16:43 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted,onUnmounted,nextTick } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import data from "/src/assets/config/data.js";
const { params } = useRoute();
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);

  item_list = Array.from(document.querySelectorAll('.item'))
  document.addEventListener('scroll', scroll_handle)
    scroll_handle()
});
let item_list = []

const  scroll_handle = ()=>{
  for (let i = 0; i < item_list.length; i++) {
  let elem = item_list[i]
  console.log(elem.offsetTop,window.scrollY);
  if (elem.offsetTop  <= window.scrollY + 900) {
    elem.style.opacity = '1'
    elem.classList.add('item_animation')
  }
}
}
onUnmounted(()=>{
  document.removeEventListener('scroll', scroll_handle)

})

onBeforeMount(() => {
  init_data();
});
const per_page_count = 20;
const current_data = ref([]);
const page_data = ref({
  total: 0,
  current_index: params.page + 1,
});
const init_data = () => {
  switch (params.classification) {
    case "学习笔记":
      data_handle(data.study, params.page);
      break;
    case "技术分享":
      data_handle(data.technique, params.page);

      break;
    case "生活随想":
      data_handle(data.life, params.page);

      break;
    case "二次元":
      data_handle(data.acg, params.page);
      break;
    default:
      break;
  }
};
const data_handle = (array, page_num) => {
  if (page_num * per_page_count >= array.length - 20) {
    current_data.value = array.slice(0);
  } else {
    current_data.value = array.slice(
      page_num * per_page_count,
      page_num * per_page_count + per_page_count
    );
  }
  page_data.value.total = Math.ceil(array.length / per_page_count);
};
const jump_to_topic = (path) =>{
  router.push(path)
}
</script>
<template>
  <div id="main">
    
    <div class="topic_box">
      <div
      @click="jump_to_topic(item.link)"
        v-for="(item, index) in current_data"
        class="item flex flex_direction_column relative"
      >
        <div class="item_inner_box margin_2_percent flex flex_direction_column">
          <div>
            <span class="relative title">{{ item.title }}</span>
          </div>
          <span class="short_msg" v-html="item.short_message"></span>
          <div class="data flex flex_direction_row justify_content_center">
            sparkle /
            {{ item.data.split("?")[0] }} / {{ item.data.split("?")[1] }} /
            {{ item.data.split("?")[2] }}
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
  </div>
</template>
<style lang="scss" scoped>
#main {
  background: #f7f3f5;
  width: 100%;
  .topic_box {
    margin-top: 100px;
    margin-left: 20px;
    width: 60vw;
    .item_animation {
      animation: fade_in 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    }
    .item {
      width: 60vw;
      min-height: 200px;
      background: #ffffff;
      margin: 20px 0;
      opacity: 0;
      border-radius: 5px;
      box-shadow: #cacaca4f 2px 3px 10px;
      overflow-y: hidden;
      &:active {
        animation: jelly .5s;
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
        color: #173e6c;

        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 15px;
          background-color: rgba(34, 17, 51, 0.393);
        }
      }
      .short_msg {
        margin-top: 20px;
        line-height: 25px;
        font-weight: 600;
      }
      .data {
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
        background: #dae6e7;
        flex-wrap: wrap;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        .tag {
          margin: 10px;
          color: #dae6e7;
          padding: 10px;
          background: #41a8a8;
          border-radius: 5px;
        }
      }
    }
    .pagination {
      align-self: center;
      height: 50px;
    }
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
 0%{
  transform: translateY(100px);
 }100%{
  transform: translateY(0px);
 }
}
</style>
