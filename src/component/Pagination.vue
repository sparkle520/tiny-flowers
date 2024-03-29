<!-- @Author: LT -->
<!-- @Date: 2024-01-07 02:20:47 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
  defineProps,
  watch,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const { theme } = storeToRefs(store);
store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
  init();
});

const props = defineProps({
  total: Number,
  page_size: Number,
  current_page: Number,
});

const page_list = ref([]);
const current_page = ref(props.current_page);
const total_page = ref(Math.ceil(props.total / props.page_size));
const {total} = toRefs(props)
watch(total, (new_val, old_val) => {
  total_page.value = Math.ceil(new_val / props.page_size);
  current_page.value=props.current_page
    init()
});
//change scss var
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--page_item_active_color", "#efe3df");
    c_c("--page_item_active_bg", "#9b9fb8");
    c_c("--page_item_color", "#969696");
    c_c("--page_item_bg", "#5e5e5e");
    c_c("--page_item_box_shadow", "transparent");
  } else {
    c_c("--page_item_active_color", "#ffff");
    c_c("--page_item_active_bg", "#b7d4d8");
    c_c("--page_item_color", "#5e5e5e");
    c_c("--page_item_bg", "#ffff");
    c_c("--page_item_box_shadow", "#dcdcdc49");
  }
};
const init = () => {
  init_page_list();
};
const init_page_list = () => {
  page_list.value = [];
  if (total_page.value <= 7) {
    for (let i = 1; i <= total_page.value; i++) {
      page_list.value.push(i);
    }
    return;
  } else {
    const offset = 3;
    let start = 0;
    let end = 0;
    if (parseInt(current_page.value) <= 3) {
      end = 6;
    } else {
      end = Math.min(total_page.value, parseInt(current_page.value) + offset);
    }
    if (parseInt(current_page.value) >= total_page.value - 2) {
      start = total_page.value - 5;
    } else {
      start = Math.max(1, parseInt(current_page.value) - offset);
    }

    for (let i = start; i <= end; i++) {
      page_list.value.push(i);
    }
    return;
  }
};
const emit = defineEmits("current_change");
const page_handle = (current) => {
  current_page.value = current;
  emit("current_change", current_page.value);
};
</script>
<template>
  <div
    id="pagination_main"
    class="flex flex_direction_row align_items_center justify_content_center"
  >
    <div class="mid_box flex flex_direction_row">
      <ul class="item_list flex flex_direction_row align_items_center">
        <li
          class="item relative flex align_items_center justify_content_center"
          v-for="(current, index) in page_list"
          :class="{
            item_active: current == current_page,
          }"
          :key="index"
          @click="page_handle(current)"
        >
          <span>
            {{ current }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$page_item_active_color: var(--page_item_active_color, #b46565);
$page_item_active_bg: var(--page_item_active_bg, #e35904);
$page_item_color: var(--page_item_color, #5e5e5e);
$page_item_bg: var(--page_item_bg, #dcdcdc);
$page_item_box_shadow: var(--page_item_box_shadow, #dcdcdc49);

#pagination_main {
  width: 100%;
  .mid_box {
    .item_list {
      padding: 0;
      gap: 8px;
      .item {
        padding: 8px 16px;
        user-select: none;
        font-weight: 500;
        color: $page_item_color;
        border-radius: 5px;
        box-shadow: $page_item_box_shadow 0px 3px 10px;
        background: $page_item_bg;

        &:hover {
          color: $page_item_active_color;
          background: transparent;
          span {
            z-index: 2;
          }
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            z-index: 1;
            height: 100%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            border-radius: 5px;
            background: $page_item_active_bg;
          }
        }
      }
      .item_active {
        padding: 8px 16px;
        user-select: none;
        font-weight: 500;
        color: $page_item_active_color;
        background: $page_item_active_bg;
        border-radius: 5px;
        span {
          z-index: 2;
        }
      }
    }
  }
}
</style>
