<!-- @Author: LT -->
<!-- @Date: 2024-01-08 21:37:11 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onUnmounted,onBeforeMount, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onUnmounted(()=>{
  clearInterval(cycle)
})
onMounted(() => {});
const props = defineProps({
  data: Array,
});
let cycle = setInterval(() => {
  let item = document.querySelector(".item");
  item.style.transform = "translateX(" + position + "px)";
  position = position === -2700 ? 0 : (position -= 900);
}, 3000);
let position = 0;
</script>
<template>
  <div id="main">
    <div class="content relative">
      <div class="item absolute flex flex_direction_row">
        <div class="img_box relative" v-for="(item, index) in data">
          <img :src="item.link" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 900px;
  height: 450px;
  overflow: hidden;
  box-shadow: #e4b198 25px 26px 5px,
  #98cde4 -25px -26px 5px;  

  border-radius: 10px;

  .content {
    width: 900px;
    height: 450px;
    .item {
      height: 450px;
      width: 3600px;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .img_box {
        width: 900px;
        height: 450px;
        border-radius: 10px;
        &::after {
          content: "";
          position: absolute;
          width: 900px;
          height: 200px;
          left: 0;
          bottom: 0;
          background: linear-gradient(
            to top,
            #e4b19897 5%,
            transparent 95%
          );
          border-radius: 10px;
        }
        &::before {
          content: "";
          position: absolute;
          width: 900px;
          height: 200px;
          left: 0;
          top: 0;
          background: linear-gradient(
            to bottom,
            #98c9e449 5%,
            transparent 95%
          );
          border-radius: 10px;
        }
        img {
          width: inherit;
          height: inherit;
          object-fit: cover;
          border-radius: inherit;
        }
      }
    }
  }
}
</style>
