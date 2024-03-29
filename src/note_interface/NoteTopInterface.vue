<!-- @Author: LT -->
<!-- @Date: 2024-01-29 04:33:30 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, nextTick ,onUnmounted} from "vue";
import { useRouter } from "vue-router";
import emitter from "@/assets/config/mitt_bus.js";

const router = useRouter();
onBeforeMount(() => {});
// const data = ref();
onUnmounted(()=>{
    // emitter.off("note_data")
})
onMounted(() => {
  // emitter.on("note_data", (_data) => {
  //   data.value = _data;
  //       const note_top_main = document.querySelector("#note_top_main");
  //       const note_top_main_bg = document.querySelector(".note_top_main_bg");
  //       if (
  //      data.value.img == undefined ||
  //      data.value.img == ""
  //    ) {
  //     note_top_main_bg.src = `https://pic.imgdb.cn/item/65d5a2f19f345e8d0320a3c9.jpg`;
  //    } else {
  //     note_top_main_bg.src = `${data.value.img}`;
  //    }
  // })

  //   data.value = _data;
  //   const note_top_main = document.querySelector("#note_top_main");
  //   const note_title = document.querySelector(".note_title");
  //   const note_create_date = document.querySelector(".note_create_date");
  //   const note_update_date = document.querySelector(".note_update_date");
  //   const note_time = document.querySelector(".note_time");
  //   const note_classification = document.querySelector(
  //     ".note_classification"
  //   );
  //   const note_tag_box = document.querySelector(".note_tag_box");

  //   if (
  //     data.value.note_data.img == undefined ||
  //     data.value.note_data.img == ""
  //   ) {
  //       note_top_main.style.backgroundImage = `url(https://pic.imgdb.cn/item/65a3e060871b83018a64b716.jpg)`;
  //   } else {
  //       note_top_main.style.backgroundImage = `url(${data.value.note_data.img})`;
  //   }
  //   if (
  //     data.value.note_data.title == undefined ||
  //     data.value.note_data.title == ""
  //   ) {
  //     note_title.innerHTML = `未知错误`;
  //   } else {
  //     note_title.innerHTML = data.value.note_data.title;
  //   }
  //   if (
  //     data.value.note_data.create_date == undefined ||
  //     data.value.note_data.create_date == ""
  //   ) {
  //     note_create_date.innerHTML = ''
  //     note_create_date.innerHTML = `未知错误`;
  //   } else {
  //     note_create_date.innerHTML = ''
  //     note_create_date.innerHTML += `发表于${data.value.note_data.create_date.split("?")[0]}-${
  //       data.value.note_data.create_date.split("?")[1]
  //     }-${data.value.note_data.create_date.split("?")[2]}`;
  //   }
  //   if (
  //     data.value.note_data.update_date == undefined ||
  //     data.value.note_data.update_date == ""
  //   ) {
  //     note_update_date.style.display = "none";
  //   } else {
  //     note_update_date.style.display = "block";
  //     note_update_date.innerHTML = ''
  //     note_update_date.innerHTML += `更新于${data.value.note_data.create_date.split("?")[0]}-${
  //       data.value.note_data.create_date.split("?")[1]
  //     }-${data.value.note_data.create_date.split("?")[2]}`;
  //   }
  //   if (
  //     data.value.note_data.create_date == undefined ||
  //     data.value.note_data.create_date == ""
  //   ) {
  //       note_time.innerHTML = ''
  //     note_time.innerHTML = `未知错误`;
  //   } else {
  //       note_time.innerHTML  = ''
  //     note_time.innerHTML += `${data.value.note_data.create_date.split("?")[3]}`;
  //   }
  //   if (
  //     data.value.note_data.classification == undefined ||
  //     data.value.note_data.classification == ""
  //   ) {
  //       note_classification.innerHTML = ''
  //     note_classification.innerHTML = `未知错误`;
  //   } else {
  //       note_classification.innerHTML = ''
  //     note_classification.innerHTML += `${data.value.note_data.classification}`;
  //   }
  //   if (
  //     data.value.note_data.tags == undefined ||
  //     data.value.note_data.tags == ""
  //   ) {
  //       note_tag_box.innerHTML = ''
  //     note_tag_box.innerHTML = `未知错误`;
  //   } else {
  //       note_tag_box.innerHTML = ''
  //     data.value.note_data.tags.split("?").forEach((element) => {
  //       note_tag_box.innerHTML += `<span style=" font-size: 1em;
  //     background: rgb(  ${Math.floor(Math.random() * 256)},  ${Math.floor(
  //         Math.random() * 256
  //       )},  ${Math.floor(Math.random() * 256)});
  //     padding: 5px 6px;
  //     border-radius: 5px;
  //   ">${element}</span>`;
  //     });
  //   }
  // });
});
</script>
<template>
  <div
    id="note_top_main"
    class="relative flex align_items_center justify_content_center"
  >
   <img class="note_top_main_bg" src="https://pic.imgdb.cn/item/65d5a2f19f345e8d0320a3c9.jpg" alt="">
  </div>
</template>
<style lang="scss" scoped>

#note_top_main {
  width: 100vw;
  margin: 0 auto;
  height: 50vh;
  margin-top: 90px;
  border-radius: 5px;
  box-shadow: #1815151c 0px 4px 10px;
  // animation: note_top_bg 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 80%;
    background: linear-gradient(to bottom,transparent,rgba(34, 23, 23, 0.139));
    bottom: 0;
    left: 0;
  }
  @keyframes note_top_bg {
    0%{
      transform: scaleX(0);
    }100%{
      transform: scaleX(1);

    }
  }
  .note_top_main_bg{
    width: 100vw;
    height: inherit;
    border-radius: 5px;
    object-fit: cover;

  }
 
 
}
</style>
