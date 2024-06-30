<!-- @Author: LT -->
<!-- @Date: 2024-01-18 14:59:50 -->
<!-- @Description:  -->

<script setup>
import {
  onBeforeMount,
  onUnmounted,
  onMounted,
  ref,
} from "vue";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { layout } = storeToRefs(store);

onBeforeMount(() => {});
onUnmounted(() => {
  document.removeEventListener("scroll", handleScroll);
});
const handleScroll = () => {
  
  let visibleTitles = [];

  for (let i = current_titles.value.length - 1; i >= 0; i--) {
    const title = current_titles.value[i];
    if (title.scrollTop-window.scrollY <=10 ) {

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
  let levels = ["h1", "h2", "h3","h4", "h5", "h6"];

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
  let top_height = document.querySelector("#topic_top_main").clientHeight+60;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    let tagName = element.tagName.toLowerCase();
    let level = levels.indexOf(tagName);
    if (level == -1) continue;
    let id = tagName + "-" + element.innerText + "-" + i;
    let height = top_height + element.offsetTop;
    let node = {
      id,
      level,
      parent: null,
      children: [],
      rawName: element.innerText,
      scrollTop: height ,
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
    let serialNumber = serialNumbers.slice(0, level + 1).join(".");

    node.isVisible = node.parent == null;
    node.name = serialNumber + ". " + element.innerText;
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
  window.scrollTo({ top: scrollTop+10, behavior: "smooth" });
}
</script>
<template>
  <div id="directory_list_main">
    <div class="catalog-card" v-show="layout">
      <div class="catalog-card-header f">
        <div class="f j_c_c">
          
          <div class="f f_d_r j_c_c a_c">
           
            <strong class="f f_d_r a_c"><svg t="1719710664540" class="catalog_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1081" width="32" height="32"><path d="M880.7936 323.1744h-224.5632c-28.2112 0-51.0464 22.4768-51.0464 50.2784v286.976c0 22.272 14.6944 41.1136 34.9696 47.7184 8.448 2.7648 17.664 1.536 25.1904-3.1744l87.1936-54.6304c4.1472-2.56 8.704-4.0448 13.3632-4.4544 6.4-0.5632 12.9024 0.9216 18.5856 4.4544l87.2448 54.6816c7.0144 4.4032 15.616 5.9392 23.552 3.6352 21.1456-6.144 36.5568-25.3952 36.5568-48.2304V373.4528c0-27.8016-22.8352-50.2784-51.0464-50.2784z" fill="#EBAE44" opacity=".5" p-id="1082"></path><path d="M663.8592 151.6544H214.7328C158.3104 151.6544 112.64 196.6592 112.64 252.16v543.2832c0 44.4928 29.2864 82.176 69.9392 95.4368 16.8448 5.4784 35.328 3.072 50.3296-6.2976l174.4384-109.312a60.1088 60.1088 0 0 1 63.8464 0l174.5408 109.3632c14.0288 8.8064 31.1808 11.8272 47.104 7.2192 42.24-12.288 73.0624-50.7904 73.0624-96.4096V252.16c0-55.5008-45.6704-100.5056-102.0416-100.5056zM372.736 322.56h133.12c19.7632 0 35.84 16.0256 35.84 35.84 0 9.9328-3.9936 18.8416-10.496 25.344S515.7376 394.24 505.856 394.24h-133.12c-19.8144 0-35.84-16.0256-35.84-35.84s16.0256-35.84 35.84-35.84z m200.448 199.424A35.62496 35.62496 0 0 1 547.84 532.48H332.8c-19.8144 0-35.84-16.0256-35.84-35.84s16.0256-35.84 35.84-35.84h215.04c19.8144 0 35.84 16.0256 35.84 35.84 0 9.9328-3.9936 18.8416-10.496 25.344z" fill="#EBAE44" p-id="1083"></path></svg>目录</strong>
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

#directory_list_main {
  width: 286px;
  border-radius: 5px;
  background: $fill_body;
  position: sticky;
  top: 80px;
  font-family: "misans";

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
  color: $text_secondary;
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
  color: $primary_mix_1;
  font-weight: 900;
}
</style>
