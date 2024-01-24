<!-- @Author: LT -->
<!-- @Date: 2024-01-18 14:59:50 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onUnmounted,
  onMounted,
  watch,
  ref,
} from "vue";
import { useRouter } from "vue-router";
import emitter from "@/assets/config/mitt_bus.js";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const {theme}  = storeToRefs(store);
const {layout}  = storeToRefs(store);
store.$subscribe((mutation,state)=>{
  change_theme(state.theme)
  change_layout(state.layout)
})
const router = useRouter();
onBeforeMount(() => {});
onUnmounted(() => {
  emitter.off("new_titles_list");
});
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
  emitter.on("new_titles_list", (v) => titles_list_handle(v));
});
const titles_list_handle = (v) => {
  current_titles.value = v;
};
const props = defineProps({
  titles: Array,
});
const current_titles = ref(props.titles);
let currentTitle = ref({});
// let progress = ref(0);


const change_layout = (flag) => {
  const directory_list_main = document.querySelector("#directory_list_main");

  if (flag) {
    directory_list_main.style.opacity = "1";
    directory_list_main.style.transform = "translateX(0)";

  } else {
    directory_list_main.style.opacity = "0";
    directory_list_main.style.transform = "translateX(100%)";
  }
};
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    //night
    c_c("--directory_list_bg", "#242837");
  } else {
    c_c("--directory_list_bg", "#f7f3f5");
  }
};

window.addEventListener("scroll", function () {
  // progress.value =
  //   parseInt((window.scrollY / document.documentElement.scrollHeight) * 100) +
  //   "%";
  if (current_titles.value == undefined || current_titles.value == null) {
    return;
  }
  let visibleTitles = [];

  for (let i = current_titles.value.length - 1; i >= 0; i--) {
    const title = current_titles.value[i];
    if (title.scrollTop <= window.scrollY) {
      if (currentTitle.value.id === title.id) return;

      Object.assign(currentTitle.value, title);

      // 展开节点
      setChildrenVisible(title, true);
      visibleTitles.push(title);

      // 展开父节点
      let parent = title.parent;
      while (parent) {
        setChildrenVisible(parent, true);
        visibleTitles.push(parent);
        parent = parent.parent;
      }

      // 折叠其余节点
      for (const t of current_titles.value) {
        if (!visibleTitles.includes(t)) {
          setChildrenVisible(t, false);
        }
      }
      return;
    }
  }
});

// 设置子节点的可见性
function setChildrenVisible(title, isVisible) {
  for (const child of title.children) {
    child.isVisible = isVisible;
  }
}

// 滚动到指定的位置
function scrollToView(scrollTop) {
  window.scrollTo({ top: scrollTop, behavior: "smooth" });
}
</script>
<template>
  <div id="directory_list_main" class="fixed">
    <div class="catalog-card" v-show="layout">
      <div class="catalog-card-header">
        <div>
          <span
            ><font-awesome-icon
              :icon="['fas', 'bars-staggered']"
              class="catalog-icon"
          /></span>
       <div class="flex flex_direction_row align_items_center">
        <svg
              t="1705577425453"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="7633"
              width="20"
              height="20"
            >
              <path
                d="M128 96h768a32 32 0 0 1 0 64H128a32 32 0 1 1 0-64z m0 192h768a32 32 0 0 1 0 64H128a32 32 0 1 1 0-64z m0 384h288a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64z m0 192h288a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64z"
                fill="#ACB4C0"
                p-id="7634"
              ></path>
              <path
                d="M704 480h-80a178.24 178.24 0 0 0-16 0.704V544H128a32 32 0 0 1 0-64h576z m-40 64H608z"
                fill="#5D6D7E"
                p-id="7635"
              ></path></svg
            >
        <span
            >目录</span
          >
       </div>
        </div>
        <!-- <span class="progress">{{ progress }}</span> -->
      </div>

      <div class="catalog-content">
        <div
          v-for="title in current_titles"
          :key="title.id"
          @click="scrollToView(title.scrollTop)"
          :class="[
            'catalog-item',
            currentTitle.id == title.id ? 'active' : 'not-active',
          ]"
          :style="{ marginLeft: title.level * 20 + 'px' }"
          v-show="title.isVisible"
          :title="title.rawName"
        >
          {{ title.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$directory_list_bg: var(--directory_list_bg, #f7f3f5);
$directory_list_cover_bg: var(--directory_list_cover_bg, #e06530);
$normal_color: var(--normal_color, #e06530);

#directory_list_main {
  width: 20vw;
  border-radius: 5px;
  background: transparent;
  right: calc(10vw - 10px);
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  animation: move_left 4s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.catalog-card {
  background: transparent;
  border-left: $directory_list_cover_bg 2px solid;
 // border-radius: 5px;
  padding: 20px 24px;
  width: 100%;
  box-sizing: border-box;
}

.catalog-card-header {
  text-align: left !important;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.catalog-icon {
  font-size: 18px;
  margin-right: 10px;
  color: dodgerblue;
}

.catalog-card-header div > span {
  font-size: 17px;
  color: $normal_color;
}

.progress {
  color: $normal_color;
  font-style: italic;
  font-size: 140%;
}

.catalog-content {
  max-height: calc(100vh - 120px);
  overflow: auto;
  margin-right: -24px;
  padding-right: 20px;
}

.catalog-item {
  color: $normal_color;
  margin: 5px 0;
  transition: color 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  border-radius: 5px;
  line-height: 28px;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 6px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

  &:hover {
    color: $directory_list_cover_bg;
  }
}

.active {
  background-color: $directory_list_cover_bg;
  color: white;

  &:hover {
    background-color: $directory_list_cover_bg;
    color: white;
  }
}
@keyframes move_left {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
