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

const log = [
  //   {
  //     version: "1.0.0",
  //     date: "2024-01-04",
  //     content: ["Features:", "Fixed:", "Changed:", "Refactored:", "Removed:"],
  //   },
  {
    version: "1.1.0",
    date: "2024-06-21",
    content: [
      "1. 移除本地音乐播放功能",
      "2. 修改导航栏样式",
      "3. 修复若干BUG",
    ],
  },
  {
    version: "1.0.0",
    date: "2024-06-18",
    content: [
      "1. 优化UI和交互体验",
      "2. 移除看板娘功能",
      "3. 修复若干BUG",
    ],
  },
];



</script>
<template>
  <div id="update_log_main" class="f f_d_c">
 


    <img
      src="https://pic.imgdb.cn/item/65b00809871b83018a6489f8.png"
      class="absolute_center fixed w_w_y"
      alt=""
    />
    <div class="content f margin_0_auto f_d_c">
      <div class="margin_0_auto">
        <span class="striking_title_orange margin_0_auto r"
          >更新日志</span
        >
      </div>
      <ul>
        <li v-for="(item, index) in log">
          [ <span class="version">{{ item.version }}</span> ] - {{ item.date
          }}<br />
          <span
            v-for="(item2, index2) in item.content"
            class="text f f_d_c"
            v-html="item2"
          >
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
  width: max(1440px,100vw);
  color: $color;
  background: $bg_color;
  min-height: 100vh;
  li{
  list-style: none;
  padding: 0 0;
  margin-bottom: 16px;
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
    width: 1100px;
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
        width: 1068px;
        padding: 16px;
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
.text {
  color: $color;
  margin-top: 8px;
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
