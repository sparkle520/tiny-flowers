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
const { theme } = storeToRefs(store);
const { layout } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {});
onUnmounted(() => {
  emitter.off("note_data");
  document.removeEventListener("scroll", handleScroll);
});
const handleScroll = () => {
  // let directory_list_main = document.querySelector("#directory_list_main")
  // const start =
  // directory_list_main.getBoundingClientRect().top +
  //   window.scrollY - document.querySelector("#top_nav_main").clientHeight;
    // if (start < window.scrollY ) {
    //   directory_list_main.style.position = "fixed";
    //   directory_list_main.style.top = "70px";
    //   directory_list_main.style.right = "6.5vw";
    // }else{
    //   directory_list_main.style.position = "relative";
    //   directory_list_main.style.top = "0px";
    //   directory_list_main.style.right = "0vw";
    // }
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
};
onMounted(() => {
  change_theme(theme.value);
  emitter.on("note_data", () => titles_list_handle());
  document.addEventListener("scroll", handleScroll);

});
const titles_list_handle = () => {
  current_titles.value = getTitles();
};

const current_titles = ref([]);
watch(current_titles, (newVal) => {
  if(newVal.length>0){
    document.querySelector('#directory_list_main').style.display = 'block';
  }else{
    document.querySelector('#directory_list_main').style.display = 'none';
  }
});
let currentTitle = ref({});
// 获取目录的标题
function getTitles() {
  let titles = [];
  let levels = ["h1", "h2", "h3",'h4','h5','h6'];

  let articleElement = document.querySelector(".markdown-body");
  
  if (!articleElement) {
    return titles;
  }

  let elements = Array.from(document.querySelectorAll(".markdown-body *"));
  // 调整标签等级
  let tagNames = new Set(elements.map((el) => el.tagName.toLowerCase()));
  for (let i = levels.length - 1; i >= 0; i--) {
    if (!tagNames.has(levels[i])) {
      levels.splice(i, 1);
    }
  }

  let serialNumbers = levels.map(() => 0);
  let top_height = document.querySelector("#note_top_main").clientHeight +60;


  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    let tagName = element.tagName.toLowerCase();
    let level = levels.indexOf(tagName);
    if (level == -1) continue;
    let id = tagName + "-" + element.innerText + "-" + i;
    let node = {
      id,
      level,
      parent: null,
      children: [],
      rawName: element.innerText,
      scrollTop: element.offsetTop + top_height  ,
    };

    if (titles.length > 0) {
      let lastNode = titles.at(-1);

      // 遇到子标题
      if (lastNode.level < node.level) {
        node.parent = lastNode;
        lastNode.children.push(node);
      }
      // 遇到上一级标题
      else if (lastNode.level > node.level) {
        serialNumbers.fill(0, level + 1);
        let parent = lastNode.parent;
        while (parent) {
          if (parent.level < node.level) {
            parent.children.push(node);
            node.parent = parent;
            break;
          }
          parent = parent.parent;
        }
      }
      // 遇到平级
      else if (lastNode.parent) {
        node.parent = lastNode.parent;
        lastNode.parent.children.push(node);
      }
    }

    serialNumbers[level] += 1;
    // let serialNumber = serialNumbers.slice(0, level + 1).join(".");

    node.isVisible = node.parent == null;
    // node.name = serialNumber + ". " + element.innerText; before
    node.name = element.innerText; //now
    titles.push(node);
  }
  return titles;
}

const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    //night
  } else {
  }
};

// window.addEventListener("scroll", function () {
//   // progress.value =
//   //   parseInt((window.scrollY / document.documentElement.scrollHeight) * 100) +
//   //   "%";
  
// });

// 设置子节点的可见性
function setChildrenVisible(title, isVisible) {
  for (const child of title.children) {
    child.isVisible = isVisible;
  }
}

// 滚动到指定的位置
function scrollToView(scrollTop) {
  window.scrollTo({ top: scrollTop + 10, behavior: "smooth" });
}
</script>
<template>
  <div id="directory_list_main">
    <div class="catalog-card" v-show="layout">
      <div class="catalog-card-header">
        <div>
          <span
            ><font-awesome-icon
              :icon="['fas', 'bars-staggered']"
              class="catalog-icon"
          /></span>
          <div class="flex flex_direction_row align_items_center">
            <strong >目录</strong>
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
          :style="{ marginLeft: title.level * 10 + 'px' }"
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
$directory_list_cover_bg: var(--directory_list_cover_bg, #e96969);
$normal_color: var(--normal_color, #e96969);

#directory_list_main {
  width: 21vw;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

  position: sticky;
  top: 50px;
}
.catalog-card {
  background: transparent;
  // border-radius: 5px;
  padding: 16px 16px;
  width: 100%;
  box-sizing: border-box;
  // transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

}

.catalog-card-header {
  text-align: left !important;
  margin-bottom: 12px;
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

  border-radius: 0px;
  line-height: 28px;
  cursor: pointer;
  font-size: 14px;
  padding: 2px 26px;
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
  position: relative;
  color: #e96969;
  font-weight: 900;
  &::after{
    content: url('/src/assets/imgs/svg/flower.svg');
    position: absolute;
   
    left: -3px;
    top: 57%;
    transform: translateY(-50%) scale(.6);
    // background: $directory_list_cover_bg;
  }
  &:hover {
    color:$directory_list_cover_bg;
  }
}
</style>
