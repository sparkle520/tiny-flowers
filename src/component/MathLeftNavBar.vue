<!--
 * @project weatheringwithyou
 * @description 
 * @author LT
 * @date 9/18/2023 18:42:19
 * @version 1.0
-->
<script setup>
import { onMounted, toRef, ref } from "vue";
import { defineEmits } from "vue";
import { useMathDirectoryStore } from "/src/store/MathDirectory.js";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
const math_directory_store = useMathDirectoryStore();
const emit = defineEmits(["book-text"]);

const data = ref(math_directory_store.data);
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--math_left_nav_main_color", "#fff");
    c_c("--left_nav_bg", "#242b3d");
    c_c("--left_nav_active_color", "#b5b9d6");
    c_c("--left_nav_border", "#b5b9d6");
  } else {
    c_c("--math_left_nav_main_color", "#757474");
    c_c("--left_nav_bg", "#ffff");
    c_c("--left_nav_active_color", "#0bb890");
    c_c("--left_nav_border", "#a5e3ba");
    
  }
};
onMounted(() => {
  change_theme(theme.value);
  data.value.forEach((item, index) => {
    Object.assign(item, { show_children: ref(false) });
    Object.assign(item, { active: ref(false) });
  });
});

// const enter_Children = (index, index2) => {
//   document.getElementById(
//     index.toString() + index2.toString()
//   ).style.backgroundColor =  "#edf7fe";
// };
// const leave_Children = (index, index2) => {
//   document.getElementById(
//     index.toString() + index2.toString()
//   ).style.backgroundColor = "#ffff";
// };
const show_children = (item) => {
  item.show_children = !item.show_children;
  item.active = !item.active;
};
</script>
<template>
  <div id="math_left_nav_main">
    <div class="left_nav">
      <h3>导航(未完成)</h3>
      <ul class="left_nav_ul">
        <li v-for="(item, index) in data" :key="item">
          <span
            @click="show_children(item)"
            class="nav_item"
            :class="{ active: item.active }"
            :id="index"
            >{{ item.name }}
          </span>
          <ul>
            <li
              v-for="(sonItem, index2) in item.children"
              v-show="item.show_children"
              :key="sonItem"
            >
              <router-link
                to=""
                @click="router.push('')"
               
                class="nav_item_child "
                :id="index.toString() + index2.toString()"
              >
              <span class="link">{{ sonItem.name }}</span>
                
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$math_left_nav_main_color: var(--math_left_nav_main_color, #757474);
$left_nav_bg: var(--left_nav_bg, #ffff);
$left_nav_active_color: var(--left_nav_active_color, #0bb890);
$left_nav_border: var(--left_nav_border, #a5e3ba);

#math_left_nav_main {
  width:180px;
  position: sticky;
  top: 90px;
  max-height: calc(100vh - 90px);
  margin-left: 16px;
  border-radius: 5px;
  overflow: scroll;
  color: $math_left_nav_main_color;

  .left_nav {
    box-shadow: #0909090c 0px 0px 20px;
    background: $left_nav_bg;
    border-radius: 5px;
    padding: 16px 0;
    padding-top: 0;
    h3{
      margin: 0;
      padding:12px 16px ;
      font-size: 17px;
      height: 38px;
      padding: 16px;
      line-height: 38px;
    }
    .left_nav_ul{
      border-top: $left_nav_border 2px solid;
      margin-top:0 ;
    }

  }
}

.active {
  color: $left_nav_active_color;
}
.nav_item {
  margin-bottom: 2px;
  border-radius: 5px;
  user-select: none;
  padding: 6px 8px;
  display: block;
  width: 164px;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
}

.nav_item_child {
  margin-bottom: 2px;
  border-radius: 5px;
  padding: 8px 16px;
  width: 148px;
  overflow: hidden;
  transform: rotate3d(0, 1, 0, 0);
  display: block;
  overflow: hidden;
  white-space: nowrap;
font-size: 12px;
  text-overflow: ellipsis;
  animation: nav 0.6s ease-in-out;
  position: relative;
  &:hover{
    span{
      &::after{

transform: scaleX(1);
transform-origin: bottom left;
}
    }
   
  }
  span{
    position: relative;
    overflow: hidden;
    &::after{
    content: '';
    background: $math_left_nav_main_color;
    position: absolute;
    max-width: 148px;
    width: 100%;
    opacity: .6;
    height: 3px;
    bottom: -4px;
    left: 0;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-in-out;
  }
  }
  
}

@keyframes nav {
  from {
    transform: translateX(-10px);
    opacity: 0.1;
  }
  to {
    transform: translateX(0px);

    opacity: 1;
  }
}

a {
  color: $math_left_nav_main_color;
  text-decoration: none;
}



ul {
  padding: 0;
}

li {
  list-style-type: none;
}
.link
{
}
.link:hover::after
{
   
}

.link::after
{
   
}
</style>
