<!-- @Author: LT -->
<!-- @Date: 2024-01-05 22:41:36 -->
<!-- @Description:  -->

<script setup>
import {  onBeforeMount,  onMounted } from "vue";

onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);
});

const log = [
  //   {
  //     version: "1.0.0",
  //     date: "2024-01-04",
  //     content: ["Features:", "Fixed:", "Changed:", "Refactored:", "Removed:"],
  //   },
  {
    version: "1.3.0",
    date: "2024-06-30",
    content: [
      "1. 现已适配移动端(仅支持基本功能)",
      "2. 优化UI和交互体验",
      "3. 优化搜索功能",
      "4. 修复若干BUG",
    ],
  },
  {
    version: "1.2.0",
    date: "2024-06-26",
    content: [
      "1. 现已支持换肤功能(导航栏内)",
      "2. 优化UI和交互体验",
      "3. 修复若干BUG",
    ],
  },
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
#update_log_main {
  width: max(1440px,100vw);
  color: $text;
  background: $fill_body;
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
 
  .content {
    width: 1100px;
    margin: 80px auto;
    z-index: 1;
    animation: move_top 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    div:first-child{
      margin-bottom: 16px;
    }
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
        background: $fill;

        box-shadow: 0 0 5px $fill_shadow;
      }
    }
    .striking_title_orange {
      font-size: 30px;
      font-weight: 600;
      color: $primary;
      &::after {
        z-index: 100;
        content: "";
        position: absolute;
        width: 120%;
        height: 20%;
        border-radius: 5px;
        background: $primary_mix_7;
        left: 50%;
        bottom: -10px;
        transform: translateX(-50%);
      }
    }
  }
}
.text {
  color: $text;
  margin-top: 8px;
}


@keyframes move_top {
  0% {
    transform: translateY(48px);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 600px) {
  #update_log_main {
  width: 100vw;
  color: $text;
  background: $fill_body;
  min-height: 100vh;
  li{
  list-style: none;
  padding: 0 0;
  margin-bottom: 8px;
}
  .w_w_y {
    width: 450px;
    opacity: 0.8;
    z-index: 0;
    // filter:drop-shadow(3px 3px 4px rgba(97, 85, 79, 0.731));
  }
 
  .content {
    width: calc(100vw - 20px );
    margin: 60px auto;
    z-index: 1;
    animation: move_top 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    div:first-child{
      margin-bottom: 16px;
    }
    ul {
      padding: 0;
      .version {
        font-size: 19px;
        font-weight: 900;
      }
      li {
        line-height: 25px;
        width: calc(100vw - 36px );
        padding: 8px;
        border-radius: 5px;
        background: $fill;

        box-shadow: 0 0 5px $fill_shadow;
      }
    }
    .striking_title_orange {
      font-size: 22px;
      font-weight: 600;
      color: $primary;
      &::after {
        z-index: 100;
        content: "";
        position: absolute;
        width: 120%;
        height: 20%;
        border-radius: 5px;
        background: $primary_mix_7;
        left: 50%;
        bottom: -10px;
        transform: translateX(-50%);
      }
    }
  }
}
.text {
  color: $text;
  margin-top: 0px;
  font-size: 12px;
}
}
</style>
