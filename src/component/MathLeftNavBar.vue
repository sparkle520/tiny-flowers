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
const router = useRouter();
const math_directory_store = useMathDirectoryStore();
const emit = defineEmits(["book-text"]);

const data = ref(math_directory_store.data);

onMounted(() => {
  data.value.forEach((item, index) => {
    Object.assign(item, { show_children: ref(false) });
    Object.assign(item, { active: ref(false) });
  });
});

const enter_Children = (index, index2) => {
  document.getElementById(
    index.toString() + index2.toString()
  ).style.backgroundColor = "#edf7fe";
};
const leave_Children = (index, index2) => {
  document.getElementById(
    index.toString() + index2.toString()
  ).style.backgroundColor = "#ffff";
};
const show_children = (item) => {
  item.show_children = !item.show_children;
  item.active = !item.active;
};
</script>
<template>
  <div id="math_left_nav_main">
    <div class="left_nav">
      <ul>
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
                @mouseleave="leave_Children(index, index2)"
                @mouseenter="enter_Children(index, index2)"
                class="nav_item_child"
                :id="index.toString() + index2.toString()"
              >
                {{ sonItem.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#math_left_nav_main {
  width: calc(15vw - 32px);
  position: sticky;
  top: 90px;
  max-height: calc(99vh - 90px);
  margin-left: 16px;
  border-radius: 5px;
  overflow: scroll;
  color: #757474;

  .left_nav {
    box-shadow: #0909090c 0px 0px 20px;
    background: #ffff;
    border-radius: 5px;
    padding: 16px 0;
  }
}

.active {
  color: #0bb890;
}
.nav_item {
  margin-bottom: 2px;
  border-radius: 5px;
  user-select: none;
  padding: 8px 8px;
  display: block;
  width: calc(15vw - 32px);
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
}

.nav_item_child {
  margin-bottom: 2px;
  border-radius: 5px;
  padding: 8px 16px;
  width: calc(15vw - 80px);
  margin-right: 2px;
  margin-left: 10px;
  transform: rotate3d(0, 1, 0, 0);
  display: block;
  overflow: hidden;
  white-space: nowrap;
font-size: 12px;
  text-overflow: ellipsis;
  animation: nav 0.6s ease-in-out;
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
  color: #757474;
  text-decoration: none;
}

a:hover {
  color: #0bb890;
}

ul {
  padding: 0;
}

li {
  list-style-type: none;
}
</style>
