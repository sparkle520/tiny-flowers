<!-- @Author: LT -->
<!-- @Date: 2024-01-06 17:07:17 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted, defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});
const props = defineProps({
  data: {
    date: String,
    link: String,
    img: String,
    title: String,
    short_message: String,
  },
});
const link_handle = (path) =>{
  router.push(path)
}
</script>
<template>
  <div id="main" class="flex flex_direction_column" @click="link_handle(data.link)">
    <div class="img_box relative">
      <img :src="data.img" alt="" />
    </div>
    <div class="letter_box flex flex_direction_column">
      <div class="title_box">
        <span class="title relative">{{ data.title }}</span>
      </div>
      <span class="short_message" v-html="data.short_message"></span>
      <div class="flex"></div>
    </div>
    <div class="date_box flex justify_content_space_around">
      <div class="flex flex_direction_row justify_content_center">
        <svg
          t="1704539694442"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4249"
          width="18"
          height="18"
        >
          <path
            d="M378.857631 467.61921l-88.76158 0 0 88.76158 88.76158 0L378.857631 467.61921zM556.38079 467.61921l-88.76158 0 0 88.76158 88.76158 0L556.38079 467.61921zM733.903949 467.61921l-88.76158 0 0 88.76158 88.76158 0L733.903949 467.61921zM822.665529 156.952658l-44.38079 0 0-88.76158-88.76158 0 0 88.76158L334.475817 156.952658l0-88.76158-88.76158 0 0 88.76158-44.38079 0c-49.262984 0-88.317465 39.942711-88.317465 88.76158l-0.444115 621.332081c0 48.818869 39.498596 88.76158 88.76158 88.76158l621.332081 0c48.818869 0 88.76158-39.942711 88.76158-88.76158L911.427108 245.714238C911.427108 196.895369 871.484398 156.952658 822.665529 156.952658zM822.665529 867.046319 201.333448 867.046319 201.333448 378.857631l621.332081 0L822.665529 867.046319z"
            p-id="4250"
            fill="#7e7e7e"
          ></path>
        </svg>
        <span>{{ data.date.split("?")[0] }}</span>
      </div>
      <div class="flex flex_direction_row justify_content_center">
        <span class="year">{{ data.date.split("?")[1] }}</span>
      </div>
      <div class="flex flex_direction_row justify_content_center">
        <svg
          t="1704540055995"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6371"
          width="18"
          height="18"
        >
          <path
            d="M675.328 117.717333A425.429333 425.429333 0 0 0 512 85.333333C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667 426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667c0-56.746667-11.093333-112-32.384-163.328a21.333333 21.333333 0 0 0-39.402667 16.341333A382.762667 382.762667 0 0 1 896 512c0 212.074667-171.925333 384-384 384S128 724.074667 128 512 299.925333 128 512 128c51.114667 0 100.8 9.984 146.986667 29.12a21.333333 21.333333 0 0 0 16.341333-39.402667zM533.333333 362.666667a21.333333 21.333333 0 0 0-42.666666 0v170.666666a21.333333 21.333333 0 0 0 6.250666 15.082667l128 128a21.333333 21.333333 0 0 0 30.165334-30.165333L533.333333 524.501333V362.666667z"
            fill="#7e7e7e"
            p-id="6372"
          ></path>
        </svg>
        <span>{{ data.date.split("?")[2] }}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  background: #f1f7f0;
  height: 100%;
  border-radius: 10px;
  box-shadow: 2.5px 0.6px 5.5px -18px rgba(203, 66, 66, 0.112),
    6.1px 1.5px 3.6px -18px rgba(71, 7, 117, 0.14),
    11.5px 2.9px 1.7px -18px rgba(95, 218, 169, 0.161),
    20.5px 5.1px 1.4px -18px rgba(9, 8, 6, 0.185),
    38.4px 9.6px 4.8px -18px rgba(228, 126, 58, 0.223),
    92px 23px 33px -18px rgba(191, 33, 33, 0.34);
  .img_box {
    overflow: hidden;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    &:hover {
      &::after {
        background: linear-gradient(to bottom, transparent, rgb(65, 62, 74));
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    &::after {
      content: "";
      pointer-events: none;
      position: absolute;
      width: 100%;
      height: 200px;
      bottom: 0;
      left: 0;
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      background: linear-gradient(to bottom, transparent, rgb(37, 62, 94));
    }
    img {
      width: 100%;
      height: 60%;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      object-fit: cover;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .letter_box {
    font-size: 25px;
    font-weight: 700;
    span {
      margin-left: 20px;
      margin-top: 10px;
    }
    .title_box {
      margin-top: 10px;
      color: #173e6c;
      .title {
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 15px;
          background-color: rgba(34, 17, 51, 0.393);
        }
      }
    }
    .short_message {
      width: 90%;
      font-size: 14px;
      font-weight: 500;
      line-height: 25px;
      margin-bottom: 20px;
      //    color: #369abe;
      &:hover {
        animation: flow 5s infinite linear;
      }
      background: -webkit-linear-gradient(
        135deg,
        #0eaf6d,
        #ff6ac6 25%,
        #369abe 50%,
        #e6d205 55%,
        #2cc4e0 60%,
        #8b2ce0 80%,
        #ff6384 95%,
        #08dfb4
      );
      -webkit-text-fill-color: transparent;
      background-clip: text;
      background-size: 200% 100%;
      animation: flow 18s infinite linear;
    }
  }
  .date_box {
    margin-bottom: 15px;
    color: #7e7e7e;
    span{
        margin-left: 5px;
    }
    .year{
        font-size: 20px;
        font-weight: 600;
        color: #8b2ce0;
    }
  }
}
@keyframes flow {
  0% {
    background-position: 0 0;
  }

  100% {
    background-position: -400% 0;
  }
}
</style>
