<!-- @Author: LT -->
<!-- @Date: 2024-01-18 14:59:50 -->
<!-- @Description:  -->

<script setup>
import {
  onBeforeMount,
  onUnmounted,
  onMounted,
} from "vue";
import { useRouter } from "vue-router";
import NoteDirectoryItem from "/src/component/NoteDirectoryItem.vue";
import change_theme from "../assets/theme/NoteDirectoryItem";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const router = useRouter();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onMounted(() => {
  change_theme(theme.value);
});
onBeforeMount(() => {});
onUnmounted(() => {});
const props = defineProps({
  data: Array,
  col: Number,
  id: Number,
});

const get_col = () => {
  return `repeat(${props.col},1fr)`;
};
</script>
<template>
  <div id="directory_list_main">
    <div
      class="Note_inner_directory_box"
      :style="{ gridTemplateColumns: get_col() }"
    >
      <NoteDirectoryItem
        v-for="(item, index) in data"
        @click="router.push(`/note/book/${id}/${index + 1}`)"
        :data="item"
        level="1"
        :key="item"
      ></NoteDirectoryItem>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#directory_list_main {
  width: 860px;
  border-radius: 5px;
  @font-face {
  font-family: "misans";
  src: url("/src/assets/font/misans.ttf");
}
font-family: 'misans';
  .Note_inner_directory_box {
    column-count: 3;
    width: 860px;
   font-weight: 900;
    column-gap: 8px;
  }
}
</style>
