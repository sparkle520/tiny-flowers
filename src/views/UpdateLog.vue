<!-- @Author: LT -->
<!-- @Date: 2024-01-05 22:41:36 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});
const carousel_data = ref([
  // {link:''},
   {link:'https://pic.imgdb.cn/item/65a417d5871b83018a50a4c9.jpg'},
   {link:'https://pic.imgdb.cn/item/65a4181b871b83018a517eb9.jpg'},
   {link:'https://pic.imgdb.cn/item/65a4185f871b83018a5241a0.jpg'},
   {link:'https://pic.imgdb.cn/item/65a4189f871b83018a52ede6.jpg'},
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
    content: ["Features:", "Fixed:", "Changed:", "Refactored:", "Removed:"],
  },
];
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
            <span v-if="item2.startsWith('Features')" class="features">
              {{ item2 }}
            </span>
            <span v-else-if="item2.startsWith('Fixed')" class="fixed_">
              {{ item2 }}
            </span>
            <span v-else-if="item2.startsWith('Changed')" class="changed">
              {{ item2 }}
            </span>
            <span v-else-if="item2.startsWith('Refactored')" class="refactored">
              {{ item2 }}
            </span>
            <span v-else="item2.startsWith('Removed')" class="removed">
              {{ item2 }}
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  background: #f7f3f5;
  .carousel {
    width: 900px;
    margin: 40px auto;
  }
  .content {
    min-height: 80vh;
    width: 90%;
    background: #f7f3f5;
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
        background: #fff;
        box-shadow: 0 0 10px #f4f2f2;
      }
    }
    .striking_title_orange {
      font-size: 30px;
      font-weight: 600;
      color: #f0681e;
      &::after {
        z-index: 100;
        content: "";
        position: absolute;
        width: 120%;
        height: 120%;
        border-radius: 10px;
        background: #ff7b005b;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
.features {
  color: #5a1637;
}
.fixed_ {
  color: #3d1ef0;
}
.changed {
  color: #de1ef0;
}
.refactored {
  color: #adf01e;
}
.removed {
  color: #ff0000;
}
</style>
