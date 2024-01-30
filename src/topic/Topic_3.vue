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
onBeforeMount(() => {
});
const img_load_handle = () => {
  emitter.emit("topic_data", get_topic_data());
};
const get_topic_data = () => {
  return {
    topic_data: select_by_id(topic_store.technique, 1),
  };
};
const select_by_id = (arr, id) => {
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
const code = [
  `
      npm install pinia
      `,
  `import { defineStore } from 'pinia'
//为了养成习惯性的用法，将返回的函数命名为 use...是一个符合组合式函数风格的约定.
export const useConfigStore = defineStore('config', {
    state: () => ({
        theme: false,
    }),
    actions: {
        change_g_theme() {
            this.theme = !this.theme;
        },
    }
})`,
  `
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

`,
  `
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
//store为获取到的实例
const store = useConfigStore();
//由于解构会让其失去响应式
//这里需要通过storeToRefs()函数使其变为响应式.
const {theme}  = storeToRefs(store);
//通过 store 的 $subscribe() 方法侦听 state 及其变化
//当然你也可以通过watch()来监听state的变化
store.$subscribe((mutation,state)=>{
  //每一次变化切换主题
  change_theme(state.theme)
})
onBeforeMount(() => {});
//在onMounted对主题进行初始化
//这里注意必须用 .value 因为是响应式数据
onMounted(() => {
  change_theme(theme.value)
});
`,
  `
////store为获取到的实例 也就是 useConfigStore()返回的对象
store.change_g_theme()
`,
];
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
          <h1 class="line_height_30">安装pinia</h1>
          <div class="hljs_container" style="width: 100%" codetype="">
            <highlightjs
              style="width: 700px"
              language="npm"
              :autodetect="false"
              :code="code[0]"
            ></highlightjs>
          </div>
          <h1>配置pinia</h1>
          <span class="normal">在main.js配置</span>
          <div class="hljs_container" style="width: 100%" codetype="JavaScript">
            <highlightjs
              style="width: 700px"
              language="JavaScript"
              :autodetect="false"
              :code="code[2]"
            ></highlightjs>
          </div>
          <h1 class="line_height_30">创建store</h1>
          <span class="normal">在src目录下新建一个store文件夹</span>
          <span class="normal"
            >并在store下新建一个config.js用于配置我们主题的全局状态</span
          >
          <img
            @load="img_load_handle"
            src="https://pic.imgdb.cn/item/65aab24b871b83018a614f60.jpg"
            style="width: 50%"
            alt=""
          />
          <h1 class="">定义store</h1>
          <span class="normal"
            >通过defineStore来定义store.<br />
            第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的.<br />

            defineStore() 的第二个参数可接受两类值：Setup函数或Option对象.<br />

            这里采用的是option对象.<br />

            你可以认为 state 是 store 的数据 (data)，而 actions 则是方法
            (methods).</span
          >
          <div class="hljs_container" style="width: 100%" codetype="JavaScript">
            <highlightjs
              style="width: 700px"
              language="JavaScript"
              :autodetect="false"
              :code="code[1]"
            ></highlightjs>
          </div>
          <h1>访问state</h1>
          <span class="normal"
            >在组件中访问state,通过use...Store()返回的对象访问,并能直接对其读写.</span
          >
          <span class="normal" style="line-height: 25px"
            >subscribe中的mutation主要包含三个属性值： <br />
            events：当前state改变的具体数据,包括改变前的值和改变后的值等等数据
            <br />
            storeId：是当前store的id <br />
            type：用于记录这次数据变化是通过什么途径,主要有三个分别是 <br />
            &emsp14;&emsp14;&emsp14;&emsp14;"direct" ：通过 action 变化的<br />
            &emsp14;&emsp14;&emsp14;&emsp14;"patch object"：通过 $patch
            传递对象的方式改变的 <br />
            &emsp14;&emsp14;&emsp14;&emsp14;"patch function" ：通过 $patch
            传递函数的方式改变的 <br />
            &emsp14;&emsp14;&emsp14;&emsp14;detached:布尔值，默认是
            false,正常情况下,当订阅所在的组件被卸载时,订阅将被停止删除, <br />
            如果设置detached值为 true 时,即使所在组件被卸载,订阅依然在生效</span
          >
          <div class="hljs_container" style="width: 100%" codetype="JavaScript">
            <highlightjs
              style="width: 700px"
              language="JavaScript"
              :autodetect="false"
              :code="code[3]"
            ></highlightjs>
          </div>
          <h1>改变state</h1>
          <span class="normal"
            >在切换主题的按钮的点击事件中将我们写好的action作为store的方法调用</span
          >
          <div class="hljs_container" style="width: 100%" codetype="JavaScript">
            <highlightjs
              style="width: 700px"
              language="JavaScript"
              :autodetect="false"
              :code="code[4]"
            ></highlightjs>
          </div>
          <h1>总结</h1>
          <span class="normal"
            >以上就是全部内容,通过pinia来实现全局主题切换</span
          >
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
