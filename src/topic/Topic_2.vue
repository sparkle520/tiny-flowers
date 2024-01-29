<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TopicTitle from "/src/component/TopicTitle.vue";
import { change_theme } from "/src/assets/js/topic.js";
import emitter from "@/assets/config/mitt_bus.js";

import { useConfigStore } from "../store/config";
import { useTopicStore } from "../store/topic";
import { change_layout } from "/src/assets/js/topic.js";

import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
const router = useRouter();
onBeforeMount(() => {});
const img_load_handle = () => {
  emitter.emit("topic_data", get_topic_data());
};
const get_topic_data = () => {
  return {
    dom_data: Array.from(document.querySelectorAll(".topic_text *")),
    topic_data: select_by_id(topic_store.study, 1),
  };
};
const select_by_id = (arr, id) => {
  console.log(id);
  if (arr.length == 0) return -1;
  let l = 0;
  let r = arr.length;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid].id == id) return arr[mid];
    else if (arr[mid].id > id) l = mid + 1;
    else r = mid;
  }
  return -1;
};
//change scss var
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
  emitter.emit("topic_data", get_topic_data());
});
const code = `
    fn digital_root(n: i64) -> i64 {
    if n < 10 {
        n
    } else {
        let mut res: i64 = n;
        loop {
            let mut temp = 0;
            for (_, &single_num) in res.to_string().as_bytes().iter().enumerate() {
                temp += (single_num as char).to_digit(10).unwrap() as i64;
            }
            res = temp;
            if temp < 10 {
                break;
            }
        }
        res
    }
}
    `
/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="topic_main" class="flex flex_direction_column">
    <TopicTopInterface></TopicTopInterface>
    <div class="topic_container flex flex_direction_row">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content flex flex_direction_column">
        <div class="topic_text flex flex_direction_column">
          <span class="normal">        Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
</span>
<span class="normal">翻译:
给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。</span>
         <div class="hljs_container" style="width: 100%; margin: 20px 0;" codetype="Rust" >
        <highlightjs  style="width: 100%;" language="Rust" :autodetect="false" :code="code"></highlightjs>
    </div>
        </div>
        <TopicBottomInterface></TopicBottomInterface>
      </div>
      <TopicRightInterface></TopicRightInterface>
    </div>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>
@import "/src/assets/css/line.scss";

</style>
