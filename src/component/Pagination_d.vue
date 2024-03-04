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
  init();
  change_theme(theme.value);
});
const init = () => {
  switch_left_right_button_status(current_page_index.value);

  if (Math.ceil(props.data.total / 10) <= current_page_index.value) {
    for (
      let i = (current_page_index.value - 1) * 10 + 1;
      i <= props.data.total;
      ++i
    ) {
      page_array.value.push(i);
    }
  } else {
    for (
      let i = (current_page_index.value - 1) * 10 + 1;
      i <= current_page_index.value * 10;
      ++i
    ) {
      page_array.value.push(i);
    }
  }
  nextTick(() => {
    let last_number = parseInt(
      current_page.value
        .toString()
        .charAt(current_page.value.toString().length - 1)
    );
    let item_list = document.querySelectorAll(".item_list li");
    let item;
    if (last_number === 0) {
      item = item_list[9];
    } else {
      item = item_list[last_number - 1];
    }
    dom__add_class(item, "item_active");
    dom__remove_class(item, "item");
  });
};
const emit = defineEmits(["page_change"]);
const props = defineProps({
  data: {
    total: Number,
    page_size: Number,
    current_page: Number,
  },
});
const page_array = ref([]);
const current_page = ref(props.data.current_page);
watch(current_page, (newV, oldV) => {
  emit("page_change", current_page.value);
  switch_item_status(newV, oldV);
});
const switch_item_status = (newV, oldV) => {
  let last_number_new = parseInt(
    newV.toString().charAt(newV.toString().length - 1)
  );
  let last_number_old = parseInt(
    oldV.toString().charAt(oldV.toString().length - 1)
  );
  let item_list = document.querySelectorAll(".item_list li");
  let item_new;
  let item_old;
  if (last_number_new === 0) {
    item_new = item_list[9];
  } else {
    item_new = item_list[last_number_new - 1];
  }
  if (last_number_old === 0) {
    item_old = item_list[9];
  } else {
    item_old = item_list[last_number_old - 1];
  }
  dom__add_class(item_old, "item");
  dom__remove_class(item_old, "item_active");
  dom__add_class(item_new, "item_active");
  dom__remove_class(item_new, "item");
};
const current_page_index = ref(Math.ceil(props.data.current_page / 10));
watch(current_page_index, (newV, oldV) => {
  switch_left_right_button_status(newV);
});
const switch_left_right_button_status = (newV) => {
  const left_button = document.querySelectorAll(".left_right_button")[0];
  const right_button = document.querySelectorAll(".left_right_button")[1];
  if (newV <= 1) {
    dom__add_class(left_button, "left_button_limit");
    dom__remove_class(left_button, "left_button");
  } else {
    dom__add_class(left_button, "left_button");
    dom__remove_class(left_button, "left_button_limit");
  }
  if (props.data.total / 10 - newV <= 0) {
    dom__add_class(right_button, "right_button_limit");
    dom__remove_class(right_button, "right_button");
  } else {
    dom__add_class(right_button, "right_button");
    dom__remove_class(right_button, "right_button_limit");
  }
};
const dom__add_class = (dom, class_name) => {
  if (!dom.classList.contains(class_name)) {
    dom.classList.add(class_name);
  }
};
const dom__remove_class = (dom, class_name) => {
  if (dom.classList.contains(class_name)) {
    dom.classList.remove(class_name);
  }
};
const page_handle = (page_index) => {
  current_page.value = page_index;
};
const PAGE_BUTTON_MODE = {
  LEFT: 0,
  RIGHT: 1,
};
const switch_page_handle = (mode) => {
  switch (mode) {
    case PAGE_BUTTON_MODE.LEFT:
      if (page_array.value[0] === 1) {
        return;
      }
      if (page_array.value.length === 10) {
        for (let index = 0; index < page_array.value.length; index++) {
          page_array.value[index] -= 10;
        }
      } else {
        let temp = (page_array.value[0] -= 10);
        page_array.value = [];
        for (let index = temp; index < temp + 10; index++) {
          page_array.value.push(index);
        }
      }
      break;
    case PAGE_BUTTON_MODE.RIGHT:
      if (props.data.total <= page_array.value[page_array.value.length - 1]) {
        return;
      }
      if (
        page_array.value[page_array.value.length - 1] + 10 <=
        props.data.total
      ) {
        for (let index = 0; index < page_array.value.length; index++) {
          page_array.value[index] += 10;
        }
      } else {
        let temp = page_array.value[0] + 10;
        page_array.value = [];
        for (let i = temp; i <= props.data.total; ++i) {
          page_array.value.push(i);
        }
      }
      break;
    default:
      break;
  }
  current_page.value = page_array.value[0];
  current_page_index.value = parseInt((current_page.value + 9) / 10);
};

//change scss var
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--page_item_active_color", "#efe3df");
    c_c("--page_item_active_bg", "#9b9fb8");
    c_c("--page_item_color", "#969696");
    c_c("--page_item_bg", "#3d3d3f");
  } else {
    c_c("--page_item_active_color", "#f2eaea");
    c_c("--page_item_active_bg", "#e35904");
    c_c("--page_item_color", "#2b2a2a");
    c_c("--page_item_bg", "#dcdcdc");
  }
};
</script>
<template>
  <div
    id="main"
    class="flex flex_direction_row align_items_center justify_content_center"
  >
    <div
      class="left_button left_button_limit left_right_button"
      @click="switch_page_handle(PAGE_BUTTON_MODE.LEFT)"
    >
      <svg
        t="1704600168318"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5826"
        width="32"
        height="32"
      >
        <path
          d="M613.888 715.264h-41.984C448.512 715.264 348.16 614.912 348.16 491.52s99.84-223.232 223.232-223.232h41.984c123.392 0 223.232 99.84 223.232 223.232 0.512 123.392-99.328 223.744-222.72 223.744z"
          fill="#ff7b006b"
          opacity=".2"
          p-id="5827"
        ></path>
        <path
          d="M549.376 135.68c0-7.68-3.584-15.36-9.728-19.968a25.3952 25.3952 0 0 0-35.84 4.608L198.656 512l305.152 375.296c8.704 10.752 25.088 12.8 35.84 3.584 10.752-8.704 12.8-25.088 3.584-35.84L264.192 510.976l280.064-359.936c3.584-4.096 5.12-9.728 5.12-15.36z"
          fill="#f0681e"
          p-id="5828"
        ></path>
        <path
          d="M825.856 135.68c0-7.68-3.584-15.36-9.728-19.968a25.3952 25.3952 0 0 0-35.84 4.608L475.136 512l305.152 375.296c8.704 10.752 25.088 12.8 35.84 3.584 10.752-8.704 12.8-25.088 3.584-35.84l-279.552-343.552 280.064-359.936c4.096-4.608 5.632-10.24 5.632-15.872z"
          fill="#ff7b005b"
          opacity=".5"
          p-id="5829"
        ></path>
      </svg>
    </div>
    <div class="mid_box flex flex_direction_row">
      <ul class="item_list flex flex_direction_row align_items_center">
        <li
          class="item relative flex align_items_center justify_content_center"
          v-for="(item, index) in page_array"
          @click="page_handle(item)"
        >
          <span>
            {{ item }}
          </span>
        </li>
      </ul>
    </div>
    <div
      class="right_button right_button_limit left_right_button"
      @click="switch_page_handle(PAGE_BUTTON_MODE.RIGHT)"
    >
      <svg
        t="1704600168318"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="5826"
        width="32"
        height="32"
      >
        <path
          d="M613.888 715.264h-41.984C448.512 715.264 348.16 614.912 348.16 491.52s99.84-223.232 223.232-223.232h41.984c123.392 0 223.232 99.84 223.232 223.232 0.512 123.392-99.328 223.744-222.72 223.744z"
          fill="#ff7b006b"
          opacity=".2"
          p-id="5827"
        ></path>
        <path
          d="M549.376 135.68c0-7.68-3.584-15.36-9.728-19.968a25.3952 25.3952 0 0 0-35.84 4.608L198.656 512l305.152 375.296c8.704 10.752 25.088 12.8 35.84 3.584 10.752-8.704 12.8-25.088 3.584-35.84L264.192 510.976l280.064-359.936c3.584-4.096 5.12-9.728 5.12-15.36z"
          fill="#f0681e"
          p-id="5828"
        ></path>
        <path
          d="M825.856 135.68c0-7.68-3.584-15.36-9.728-19.968a25.3952 25.3952 0 0 0-35.84 4.608L475.136 512l305.152 375.296c8.704 10.752 25.088 12.8 35.84 3.584 10.752-8.704 12.8-25.088 3.584-35.84l-279.552-343.552 280.064-359.936c4.096-4.608 5.632-10.24 5.632-15.872z"
          fill="#ff7b005b"
          opacity=".5"
          p-id="5829"
        ></path>
      </svg>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$page_item_active_color: var(--page_item_active_color, #f2eaea);
$page_item_active_bg: var(--page_item_active_bg, #e35904);
$page_item_color: var(--page_item_color, #2b2a2a);
$page_item_bg: var(--page_item_bg, #dcdcdc);

#main {
  width: 100%;
  .right_button {
    width: 32px;
    height: 32px;
    transform: rotateY(180deg);
    &:hover svg {
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform: scaleY(0.5);
    }
    &:active svg {
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform: scaleY(0.5) translateX(-6px);
    }
  }
  .right_button_limit {
    width: 32px;
    height: 32px;
    filter: grayscale(100%); /*fire*/
    -webkit-filter: grayscale(100%);
    transform: rotateY(180deg);
  }
  .left_button {
    width: 32px;
    height: 32px;
    &:hover svg {
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform: scaleY(0.5);
    }
    &:active svg {
      transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform: scaleY(0.5) translateX(-6px);
    }
  }
  .left_button_limit {
    width: 32px;
    height: 32px;
    filter: grayscale(100%); /*fire*/
    -webkit-filter: grayscale(100%);
  }

  .mid_box {
    .item_list {
      padding: 0;
      gap: 5px;
      .item {
        width: 40px;
        height: 40px;
        user-select: none;
        font-weight: 700;
        color: $page_item_color;
        border-radius: 5px;

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
        width: 40px;
        height: 40px;
        user-select: none;
        font-weight: 700;
        color: $page_item_active_color;
        background: transparent;
        border-radius: 5px;
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
  }
}
</style>
