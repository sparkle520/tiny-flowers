<!-- @Author: LT -->
<!-- @Date: 2024-02-18 18:18:20 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import change_theme_ from "../assets/theme/NoteDirectoryItem";

import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const { theme } = storeToRefs(config_store);

const router = useRouter();
onBeforeMount(() => {
  next_level.value = parseInt(props.level) + 1;
});
onMounted(() => {

});
const next_level = ref();
const props = defineProps({
  data: Object,
  level: Number,
});



</script>
<template>
  <div id="note_directory_item_main">
    <span  :class="{ chapter_title: level == 1 ,span_hover:level ==1}">{{ data.name }}</span>
    <NoteDirectoryItem
    :key="item"
      v-if="data.children != undefined && data.children.length > 0"
      v-for="item in data.children"
      :data="item"
      :level="next_level"
      :style="{ marginLeft: level * .5 + 'ch' }"
    >
    </NoteDirectoryItem>
  </div>
</template>
<style lang="scss" scoped>
$note_directory_item_main_color: var(--note_directory_item_main_color, #4d4949);
$note_directory_item_main_hover_color: var(--note_directory_item_main_hover_color, #e96969);

#note_directory_item_main {
  break-inside: avoid;
  span {
    display: block;
    margin-bottom: 16px;
    color: $note_directory_item_main_color;
   user-select: none;
  }
  .span_hover{
    &:hover{
        color: $note_directory_item_main_hover_color;
    }
  }
  .chapter_title {
    font-weight: 900;
  }
}
</style>
