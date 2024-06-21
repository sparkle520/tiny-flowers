<!-- @Author: LT -->
<!-- @Date: 2024-01-18 14:59:50 -->
<!-- @Description:  -->

<script setup>
import {
  onUnmounted,
  onMounted,
  ref,
} from "vue";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
const { layout } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
});
const handleScroll = () => {  
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
  document.addEventListener("scroll", handleScroll);
  setTimeout(()=>{
    titles_list_handle()
    let observe = new MutationObserver(m=>{
    titles_list_handle()
  })
  let m_b = document.querySelector(".markdown-body");
  observe.observe(m_b,{subtree:false,attributeFilter:['height']})
  },2000)
});
const titles_list_handle = () => {
  current_titles.value = getTitles();
};

const current_titles = ref([]);

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

    node.isVisible = node.parent == null;
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
      <div class="catalog-card-header f">
        <div class="f j_c_c">
          <span
            ><font-awesome-icon
              :icon="['fas', 'bars-staggered']"
              class="catalog-icon"
          /></span>
          <div class="f f_d_r j_c_c a_c">
            <strong >目录🌼</strong>
          </div>
        </div>
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
          :style="{ paddingLeft: title.level * 10 + 'px' }"
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
$directory_list_cover_bg: var(--directory_list_cover_bg, #ffffff);
$directory_active_color: var(--directory_active_color, #1772f6);

$directory_color: var(--directory_color, #8491a5);

#directory_list_main {
  width: 286px;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  background: $directory_list_cover_bg;
  position: sticky;
  top: 80px;
  border-radius: 5px;
  scrollbar-width: thin;
    *::-webkit-scrollbar {
    width: 5px;
    height: 10px;
}
*::-webkit-scrollbar-thumb {
    background: hsl(0deg 0% 90%);
    border-radius: 3px;
}
}
.catalog-card {
  background: transparent;
  padding: 20px 24px;
  width: 100%;
  box-sizing: border-box;

}

.catalog-card-header {
  text-align: left !important;
  padding-bottom: 15px;
  border-bottom: #8491a5 1px solid;
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
  color: $directory_active_color;
}



.catalog-content {
  max-height: calc(100vh - 120px);
  overflow: auto;
  margin-right: -24px;
  padding-right: 20px;
}

.catalog-item {
  color: $directory_color;
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
    text-decoration: underline;
  }
}

.active {
  position: relative;
  color: $directory_active_color;
  font-weight: 900;
  &::after{
    content: url('/src/assets/imgs/svg/flower.svg');
    position: absolute;
   
    left: -3px;
    top: 57%;
    transform: translateY(-50%) scale(.6);
  }
  &:hover {
    color:$directory_active_color;
  }
}
</style>
