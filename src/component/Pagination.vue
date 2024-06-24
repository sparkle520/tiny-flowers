<!-- @Author: LT -->
<!-- @Date: 2024-01-07 02:20:47 -->
<!-- @Description:  -->

<script setup>
import {
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
  defineProps,
  watch,
} from "vue";

onBeforeMount(() => {});
onMounted(() => {
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
    class="f f_d_r a_c j_c_c"
  >
    <div class="mid_box f f_d_r">
      <ul class="item_list f f_d_r a_c">
        <li
          class="item r f a_c j_c_c"
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
        color: $text_subtitle;
        border-radius: 5px;
        box-shadow: $fill_shadow 0px 3px 10px;
        background:$fill;

        &:hover {
          color: $fill_primary;
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
            background: $primary_mix_6;
          }
        }
      }
      .item_active {
        padding: 8px 16px;
        user-select: none;
        font-weight: 500;
        color: $fill_primary;
        background: $primary;
        border-radius: 5px;
        span {
          z-index: 2;
        }
      }
    }
  }
}
</style>
