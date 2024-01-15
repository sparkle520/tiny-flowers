<!-- @Author: LT -->
<!-- @Date: 2024-01-05 22:41:36 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  change_theme(props.theme)

});
const carousel_data = ref([
  // {link:''},
  { link: "https://pic.imgdb.cn/item/65a417d5871b83018a50a4c9.jpg" },
  { link: "https://pic.imgdb.cn/item/65a4181b871b83018a517eb9.jpg" },
  { link: "https://pic.imgdb.cn/item/65a4185f871b83018a5241a0.jpg" },
  { link: "https://pic.imgdb.cn/item/65a4189f871b83018a52ede6.jpg" },
  //   { link: "https://pic.imgdb.cn/item/65a3e576871b83018a7eeee4.jpg" },
  //   { link: "https://pic.imgdb.cn/item/65a3e577871b83018a7ef617.jpg" },
  //   { link: "https://pic.imgdb.cn/item/65a3e579871b83018a7efee6.jpg" },
  //   { link: "https://pic.imgdb.cn/item/65a3e57b871b83018a7f0821.jpg" },
]);
const log = [
  //   {
  //     version: "1.0.0",
  //     date: "2024-01-04",
  //     content: ["Features:", "Fixed:", "Changed:", "Refactored:", "Removed:"],
  //   },
  {
    version: "1.0.0",
    date: "2024-01-04",
    content: [
      "Features:",
      "Fixed:",
      "Changed: Translated the background color of the music player.",
      "Refactored: Rebuilt Navigation Bar.",
      "Removed:",
    ],
  },
];
const props = defineProps({
  theme: Boolean,
});

watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
//change scss var 
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--bg_color", "#1e2433");
    c_c("--color", "#f7f3f5");
    c_c("--li", "#242b3d");
    c_c("--li_shadow", "#242b34");
    c_c("--striking_title_orange_color", "#f7f3f5");
    c_c("--striking_title_orange_bg", "#f7f3f5");
  } else {
    c_c("--bg_color", "#f7f3f5");
    c_c("--color", "#000000");
    c_c("--li", "#fff");
    c_c("--li_shadow", "#f4f2f2");
    c_c("--striking_title_orange_color", "#f0681e");
    c_c("--striking_title_orange_bg", "#ff7b005b");
  }
}
</script>
<template>
  <div id="main" class="flex flex_direction_column">
    <Carousel :data="carousel_data" class="carousel"></Carousel>
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
$li: var(--li, #fff);
$li_shadow: var(--li_shadow, #f4f2f2);
$striking_title_orange_color: var(--striking_title_orange_color, #f0681e);
$striking_title_orange_bg: var(--striking_title_orange_bg, #ff7b005b);
#main {
  width: 100%;
  color: $color;
  background: $bg_color;
  .carousel {
    width: 100vw;
    margin: 0 auto;
  }
  .content {
    min-height: 80vh;
    width: 90%;
    margin-top: 50px;
    background: $bg_color;
    ul {
      .version {
        font-size: 19px;
        font-weight: 900;
      }
      li {
        line-height: 25px;
        margin: 10px 0;
        padding: 10px;
        border-radius: 10px;
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
        border-radius: 10px;
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
</style>
