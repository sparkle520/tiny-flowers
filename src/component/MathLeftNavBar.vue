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
      <h3 class="f f_d_r a_c"><svg t="1719703816522" class="left_nav_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11352" width="52" height="52"><path d="M908.3904 608.5632c20.0192-19.456 8.96-53.4528-18.688-57.4464l-61.0816-8.9088a33.59744 33.59744 0 0 1-25.3952-18.3808l-27.3408-55.3984c-12.3392-25.0368-48.0256-25.0368-60.416 0l-27.3408 55.3984a33.70496 33.70496 0 0 1-25.344 18.432l-61.1328 8.8576c-15.2064 2.2016-25.3952 13.4656-28.1088 26.4192-1.6896 7.8848-0.6144 16.384 3.7888 23.808 1.4336 2.56 3.328 5.0176 5.632 7.2192l44.1856 43.1104a33.664 33.664 0 0 1 9.6768 29.8496L626.3808 742.4c-4.7104 27.4944 24.2176 48.4864 48.896 35.4816l54.6816-28.7232c5.2736-2.7648 11.1104-4.0448 16.9472-3.84 4.9664 0.1536 9.8816 1.4848 14.4384 3.84l54.6816 28.7232c24.6784 13.0048 53.6064-7.9872 48.896-35.4816l-10.4448-60.8768c-1.8944-10.9568 1.7408-22.1184 9.6768-29.8496l44.2368-43.1104z" fill="#FE68A2" opacity=".5" p-id="11353"></path><path d="M807.9872 353.792l-135.9872-19.7632c-24.4224-3.5328-45.568-18.8928-56.4736-41.0112l-60.8256-123.2384c-27.4944-55.7056-106.9056-55.7056-134.4 0.0512L359.4752 293.0688a75.0848 75.0848 0 0 1-56.4736 41.0112l-135.9872 19.7632c-61.4912 8.8576-86.016 84.4288-41.5232 127.7952l98.304 95.8976c17.664 17.2544 25.7024 42.0352 21.5552 66.3552l-23.2448 135.424c-10.496 61.2352 53.8112 107.9808 108.7488 79.0528l121.7024-63.9488c21.8624-11.4688 47.9744-11.4688 69.7856 0l121.6512 63.9488c54.9888 28.928 119.2448-17.8176 108.7488-79.0528l-5.8368-33.9968-17.408-101.4272c-4.1472-24.32 3.9424-49.152 21.6064-66.3552l53.1456-51.8144 45.2608-44.1344c44.4928-43.3152 19.968-118.8864-41.5232-127.7952z m-267.6736 270.6432l-41.0624-21.5552a25.216 25.216 0 0 0-23.552 0l-41.0624 21.5552c-18.5344 9.7792-40.2432-5.9904-36.7104-26.6752l7.8336-45.6704c1.4336-8.2432-1.28-16.5888-7.2704-22.4256l-33.1776-32.3584c-15.0016-14.6432-6.7072-40.1408 14.0288-43.1104l45.9264-6.7072c8.2432-1.1776 15.36-6.3488 19.0464-13.824l20.48-41.5744c9.3184-18.8416 36.096-18.8416 45.3632 0l20.5312 41.5744a25.21088 25.21088 0 0 0 19.0464 13.824l45.9264 6.656c20.736 3.0208 29.0304 28.5184 14.0288 43.1616l-33.2288 32.3584a25.20064 25.20064 0 0 0-7.2704 22.4256l4.352 25.4464 3.4816 20.224c0.2048 1.1776 0.3072 2.4064 0.3072 3.584 0.6656 18.8928-19.5584 32.3072-37.0176 23.0912z" fill="#FE68A2" p-id="11354"></path></svg></h3>
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
                @click="router.push(`/math/all/1?sort=${item.id}?${index2 + 1}`)"
               
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
    .left_nav_icon{
      path{
        &:first-child{
          fill: $primary;
        }
        &:last-child{
          fill: $primary;
        }
      }
    }
    h3{
      margin: 0;
      padding:16px 8px ;
      color: $primary;
      font-size: 14px;
      height: 38px;
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
  padding: 4px 8px;
  display: block;
  font-weight: 900;
  font-size: 14px;
  width: 164px;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  text-overflow: ellipsis;
}

.nav_item_child {
  border-radius: 5px;
  padding: 4px 16px;
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
