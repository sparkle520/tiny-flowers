<!-- @Author: LT -->
<!-- @Date: 2024-01-13 17:30:50 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs,defineProps, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
})
const props = defineProps({
    data :{
  title:String,
  date:String,
}
});
</script>
<template>
     <div class="topic_title_box">
        <span class="topic_title relative">
          {{ data.title }}
        </span>
        <div class="topic_time_bar flex flex_direction_row">
          {{ data.date.split('?')[0] }}
          <div class="topic_time flex justify_content_center align_items_center">
            <svg
              t="1704628451767"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4237"
              width="18"
              height="18"
            >
              <path
                d="M512 938.666667c235.637333 0 426.666667-191.029333 426.666667-426.666667S747.637333 85.333333 512 85.333333 85.333333 276.362667 85.333333 512s191.029333 426.666667 426.666667 426.666667zM329.376 649.376L480 498.741333V320a32 32 0 0 1 64 0v192a32 32 0 0 1-9.376 22.624l-160 160a32 32 0 1 1-45.248-45.248z"
                fill="#df4c58"
                p-id="4238"
              ></path>
            </svg>
            {{ data.date.split('?')[1] }}
          </div>
        </div>
      </div>
</template>
<style lang="scss" scoped>

 @import url("/src/assets/css/topic.scss");

</style>