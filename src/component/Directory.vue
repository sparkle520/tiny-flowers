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
const { layout } = storeToRefs(store);

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
let observe = null
onMounted(() => {
  document.addEventListener("scroll", handleScroll);
  setTimeout(()=>{
    titles_list_handle()
    observe = new MutationObserver(m=>{
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
         
          <div class="f f_d_r j_c_c a_c">
            <strong class="f f_d_r a_c" ><svg t="1719710968925"  class="catalog_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1567" width="32" height="32"><path d="M774.2976 178.5344c-18.688-8.2944-40.6016-4.7616-55.7568 8.96l-53.4528 48.4352-110.3872-139.3152c-9.8304-12.9024-25.3952-20.6336-41.5744-20.3776A51.9168 51.9168 0 0 0 471.8592 97.28l-106.496 138.8544-58.2656-50.6368c-15.5136-13.4656-36.7616-16.5888-55.4496-8.0384-18.688 8.4992-30.3104 26.5728-30.3104 47.104v205.4144c1.9456 159.2832 132.096 288.2048 291.84 288.2048s289.8944-128.9728 291.84-288.2048V225.8432c0.1024-20.4288-11.9808-39.0144-30.72-47.3088z" fill="#EB4446" opacity=".4" p-id="1568"></path><path d="M411.0848 910.2336c-16.9472 0-30.72-13.7728-30.72-30.72 0-72.0384-58.624-130.6624-130.6624-130.6624-46.4896 0-89.9072 25.0368-113.2032 65.3312a30.72 30.72 0 0 1-41.984 11.2128 30.72 30.72 0 0 1-11.2128-41.984c34.2528-59.2384 98.048-96 166.4-96 105.9328 0 192.1024 86.1696 192.1024 192.1024 0 16.9472-13.7216 30.72-30.72 30.72zM610.56 910.2336c-16.9472 0-30.72-13.7728-30.72-30.72 0-105.9328 86.1696-192.1024 192.1024-192.1024 68.352 0 132.096 36.8128 166.4 96a30.72 30.72 0 0 1-11.2128 41.984 30.72 30.72 0 0 1-41.984-11.2128c-23.296-40.2944-66.7136-65.3312-113.2032-65.3312-72.0384 0-130.6624 58.624-130.6624 130.6624 0 16.9472-13.7728 30.72-30.72 30.72zM513.28 940.8c-16.9472 0-30.72-13.7728-30.72-30.72v-122.88c0-16.9472 13.7728-30.72 30.72-30.72s30.72 13.7728 30.72 30.72v122.88c0 16.9984-13.7728 30.72-30.72 30.72zM629.1456 330.8544a22.96832 22.96832 0 0 0-24.7296 3.9936l-23.7056 21.504-48.9984-61.8496a22.912 22.912 0 0 0-18.432-9.0624c-7.2192 0.0512-14.0288 3.5328-18.3296 9.3184l-47.2576 61.6448-25.856-22.4768a22.74304 22.74304 0 0 0-24.6272-3.584c-8.2944 3.7888-13.4656 11.776-13.4656 20.8896V442.4192c0.8704 70.7072 58.624 127.9488 129.536 127.9488s128.6656-57.2416 129.536-127.9488V351.7952c0-9.0112-5.376-17.2544-13.6704-20.9408z" fill="#EB4446" p-id="1569"></path></svg>目录</strong>
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


#directory_list_main {
  width: 286px;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  background: $fill_body;
  position: sticky;
  top: 80px;
  border-radius: 5px;
  scrollbar-width: thin;
  font-family: "misans";
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
  color: $text_title;

}

.catalog-card-header {
  text-align: left !important;
  padding-bottom: 15px;
  border-bottom: $primary_mix_4 1px solid;
  justify-content: space-between;
  align-items: center;
  .catalog_icon{
    transform: scale(.8);
    path{
        &:first-child{
          fill: $primary;
        }
        &:last-child{
          fill: $primary;
        }
      }
  }
}



.catalog-card-header div > span {
  font-size: 17px;
  color: $text_title;
}



.catalog-content {
  max-height: calc(100vh - 120px);
  overflow: auto;
  margin-right: -24px;
  padding-right: 20px;
}

.catalog-item {
  color:$text_secondary;
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
  color: $primary;
  font-weight: 900;
}
</style>
