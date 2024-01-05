<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {});
</script>
<template>
  <div id="main">
    <div class="content flex flex_direction_column">
      <div class="show_yourself_box relative">
        <video
          autoplay
          loop
          muted
          src="/src/assets/video/weatheringwithyou.mp4"
        ></video>

        
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  margin-left: 0px;
  .content {
    .show_yourself_box {
      width: 100%;
      height: 450px;
      box-shadow: -6px -6px 8px -4px rgba(250, 254, 118, 0.75),
        6px -6px 8px -4px rgba(254, 159, 50, 0.75),
        6px 6px 8px -4px rgba(255, 255, 0, 0.75),
        6px 6px 8px -4px rgba(0, 0, 255, 2.75);
      overflow: hidden;
      video {
        width: inherit;
        height: inherit;
        object-fit: cover;
      }

     
    }
  }
}
</style>
