<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted ,onUnmounted,watch} from "vue";
import { useRouter } from "vue-router";
import TopicTitle from '/src/component/TopicTitle.vue'
import {change_theme} from '/src/assets/js/topic.js'
import {change_layout} from '/src/assets/js/topic.js'
import emitter from "@/assets/config/mitt_bus.js";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const {theme}  = storeToRefs(store);
const {layout}  = storeToRefs(store);
store.$subscribe((mutation,state)=>{
  change_theme(state.theme)
  change_layout(state.layout)
})
const router = useRouter();
onBeforeMount(() => {});
onMounted(()=>{
  change_theme(theme.value)
  change_layout(layout.value)

})


onUnmounted(()=>{
})
 



const data = {
  title:'Rust写的第一个算法',
  date:'2024-01-14?11:06'
}
/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
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
</script>
<template>
  <div id="topic_main" class="flex  flex_direction_row">
    <div class="topic_content">
    <TopicTitle :data="data"></TopicTitle>
      <div class="topic_text flex flex_direction_column">
        <span class="normal">        Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer.
</span>
<span class="normal">翻译:
给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。</span>
         <div class="hljs_container" style="width: 100%; margin: 20px 0;" codetype="Rust" >
        <highlightjs  style="width: 100%;" language="Rust" :autodetect="false" :code="code"></highlightjs>
    </div>
      </div>
    </div>
    <!-- <DirectoryList class="directoryList"></DirectoryList> -->

  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>
@import "/src/assets/css/line.scss";



</style>
