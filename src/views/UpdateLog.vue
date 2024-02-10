<!-- @Author: LT -->
<!-- @Date: 2024-01-05 22:41:36 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import change_theme from "../assets/theme/UpdateLog";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
const router = useRouter();
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);

  window.scrollTo(0, 0);
});
//const carousel_data = ref([
// {link:''},
// { link: "https://pic.imgdb.cn/item/65a97eb8871b83018a6fc35c.jpg" },
// { link: "https://pic.imgdb.cn/item/65a417d5871b83018a50a4c9.jpg" },
// { link: "https://pic.imgdb.cn/item/65a4185f871b83018a5241a0.jpg" },
// { link: "https://pic.imgdb.cn/item/65a616a9871b83018acf90af.jpg" },
//   { link: "https://pic.imgdb.cn/item/65a3e576871b83018a7eeee4.jpg" },
//   { link: "https://pic.imgdb.cn/item/65a3e577871b83018a7ef617.jpg" },
//   { link: "https://pic.imgdb.cn/item/65a3e579871b83018a7efee6.jpg" },
//   { link: "https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg" },
//]);
const log = [
  //   {
  //     version: "1.0.0",
  //     date: "2024-01-04",
  //     content: ["Features:", "Fixed:", "Changed:", "Refactored:", "Removed:"],
  //   },
  {
    version: "1.0.0已发布",
    date: "2024-02-10",
    content: [
      "Features:",
      "Fixed:",
      "Changed: Translated the background color of the music player.",
      "Refactored: Rebuilt Navigation Bar.",
      "Removed:",
    ],
  },
];



// const particlesInit = async engine => {
//     //await loadFull(engine);
//     await loadSlim(engine);
// };



</script>
<template>
  <div id="update_log_main" class="flex flex_direction_column">
 


    <img
      src="https://pic.imgdb.cn/item/65b00809871b83018a6489f8.png"
      class="absolute_center fixed w_w_y"
      alt=""
    />
    <!-- <Carousel :data="carousel_data" class="carousel"></Carousel> -->
    <div class="content flex margin_0_auto flex_direction_column">
      <div class="margin_0_auto">
        <span class="striking_title_orange margin_0_auto relative"
          >更新日志</span
        >
      </div>
      <ul>
        <li v-for="(item, index) in log">
          [ <span class="version">{{ item.version }}</span> ] - {{ item.date
          }}<br />
          <span
            v-for="(item2, index2) in item.content"
            class="flex flex_direction_column"
          >
            <div
              v-if="item2.startsWith('Features')"
              class="features flex flex_direction_column"
              v-html="item2"
            ></div>
            <div
              v-else-if="item2.startsWith('Fixed')"
              class="fixed_ flex flex_direction_column"
              v-html="item2"
            ></div>
            <div
              v-else-if="item2.startsWith('Changed')"
              class="changed flex flex_direction_column"
              v-html="item2"
            ></div>
            <div
              v-else-if="item2.startsWith('Refactored')"
              class="refactored flex flex_direction_column"
              v-html="item2"
            ></div>
            <div
              v-else="item2.startsWith('Removed')"
              class="removed flex flex_direction_column"
              v-html="item2"
            ></div>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #000000);
$li: var(--li, #242b3d12);
$li_shadow: var(--li_shadow, #f4f2f2);
$striking_title_orange_color: var(--striking_title_orange_color, #f0681e);
$striking_title_orange_bg: var(--striking_title_orange_bg, #ff7b005b);
#update_log_main {
  width: 100%;
  color: $color;
  background: $bg_color;
  min-height: 100vh;
  li{
  list-style: none;
  padding: 0 0;
}
  .w_w_y {
    width: 450px;
    opacity: 0.8;
    z-index: 0;
    // filter:drop-shadow(3px 3px 4px rgba(97, 85, 79, 0.731));
  }
  .carousel {
    width: 90vw;
    margin: 0 auto;
    animation: move_bottom 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .content {
    width: 90%;
    margin: 80px auto;
    z-index: 1;
    animation: move_top 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    ul {
      padding: 0;
      .version {
        font-size: 19px;
        font-weight: 900;
      }
      li {
        line-height: 25px;
        margin: 10px 0;
        padding: 10px;
        border-radius: 5px;
        background: $li;

        box-shadow: 0 0 10px $li_shadow;
      }
    }
    .striking_title_orange {
      font-size: 30px;
      font-weight: 600;
      color: $striking_title_orange_color;
      &::after {
        z-index: 100;
        content: "";
        position: absolute;
        width: 120%;
        height: 20%;
        border-radius: 5px;
        background: $striking_title_orange_bg;
        left: 50%;
        bottom: -10px;
        transform: translateX(-50%);
      }
    }
  }
}
.features {
  color: #eb4d99;
}
.fixed_ {
  color: #3d1ef0;
}
.changed {
  color: #de1ef0;
}
.refactored {
  color: #718e31;
}
.removed {
  color: #ff0000;
}
@keyframes move_bottom {
  0% {
    transform: translateY(-100vh);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes move_top {
  0% {
    transform: translateY(100vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
