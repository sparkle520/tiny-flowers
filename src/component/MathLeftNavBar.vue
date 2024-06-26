<!--
 * @project weatheringwithyou
 * @description 
 * @author LT
 * @date 9/18/2023 18:42:19
 * @version 1.0
-->
<script setup>
import { onMounted, ref } from "vue";
import { defineEmits } from "vue";
import { useMathDirectoryStore } from "/src/store/MathDirectory.js";
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

#math_left_nav_main {
  width:180px;
  position: sticky;
  top: 90px;
  max-height: calc(100vh - 90px);
  margin-left: 16px;
  border-radius: 5px;
  overflow: scroll;
  color: $text_title;
  font-family: 'misans';
  .left_nav {
    box-shadow: $fill_shadow 0px 0px 20px;
    background: $fill;
    border-radius: 5px;
    padding: 16px 0;
    padding-top: 0;
    h3{
      margin: 0;
      padding:12px 16px ;
      color: $primary;
      font-size: 14px;
      height: 38px;
      padding: 16px;
      line-height: 38px;
    }
    .left_nav_ul{
      border-top: $primary_mix_4 2px solid;
      margin-top:0 ;
    }

  }
}

.active {
  color: $primary;
}
.nav_item {
  margin-bottom: 2px;
  border-radius: 5px;
  user-select: none;
  padding: 6px 8px;
  display: block;
  font-weight: 900;
  width: 164px;
  overflow: hidden;
  white-space: nowrap;

  text-overflow: ellipsis;
}

.nav_item_child {
  border-radius: 5px;
  padding: 8px 16px;
  width: 148px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
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
    &::after{
    content: '';
    background: $text_secondary;
    position: absolute;
    max-width: 148px;
    width: 100%;
    opacity: .6;
    height: 1px;
    bottom: -2px;
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
  color: $text_secondary;
  text-decoration: none;
}



ul {
  padding: 0;
}

li {
  list-style-type: none;
}

</style>
