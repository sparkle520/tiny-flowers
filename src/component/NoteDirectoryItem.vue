<!-- @Author: LT -->
<!-- @Date: 2024-02-18 18:18:20 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
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
    <span :class="{ chapter_title: level == 1 }">{{ data.name }}</span>
    <NoteDirectoryItem
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
#note_directory_item_main {
  break-inside: avoid;
  span {
    display: block;
    margin-bottom: 1vh;
    &:hover{
        color: #ff0e54;
    }
  }
  .chapter_title {
    font-weight: 900;
  }
}
</style>
