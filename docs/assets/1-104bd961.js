const r=`# 安装pinia\r
\`\`\`\r
npm install pinia\r
\`\`\`\r
# 配置pinia\r
在main.js中引入pinia\r
\`\`\`javascript\r
import { createApp } from 'vue'\r
import App from './App.vue'\r
import { createPinia } from 'pinia'\r
const pinia = createPinia()\r
const app = createApp(App)\r
\r
app.use(pinia)\r
app.mount('#app')\r
\`\`\`\r
# 创造store\r
在src目录下新建一个store文件夹  \r
并在store下新建一个config.js用于配置我们主题的全局状态 \r
\r
![](https://pic.imgdb.cn/item/65aab24b871b83018a614f60.jpg)\r
\r
# 定义store\r
通过***defineStore***来定义store.\r
第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的.\r
defineStore() 的第二个参数可接受两类值：Setup函数或Option对象.\r
这里采用的是option对象.\r
你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).\r
\`\`\`javascript\r
import { defineStore } from 'pinia'\r
//为了养成习惯性的用法，将返回的函数命名为 use...是一个符合组合式函数风格的约定.\r
export const useConfigStore = defineStore('config', {\r
    state: () => ({\r
        theme: false,\r
    }),\r
    actions: {\r
        change_g_theme() {\r
            this.theme = !this.theme;\r
        },\r
    }\r
})\r
\`\`\`\r
# 访问state\r
在组件中访问state,通过use...Store()返回的对象访问,并能直接对其读写. \r
subscribe中的mutation主要包含三个属性值：  \r
events：当前state改变的具体数据,包括改变前的值和改变后的值等等数据  \r
storeId：是当前store的id  \r
type：用于记录这次数据变化是通过什么途径,主要有三个分别是  \r
* "direct" ：通过 action 变化的  \r
* "patch object"：通过 $patch 传递对象的方式改变的  \r
* "patch function" ：通过 $patch 传递函数的方式改变的\r
* detached:布尔值，默认是***false***,正常情况下,当订阅所在的组件被卸载时,订阅将被停止删除,\r
如果设置detached值为 true 时,即使所在组件被卸载,订阅依然在生效\r
\`\`\`javascript\r
import { useConfigStore } from "../store/config";\r
import { storeToRefs } from "pinia";\r
//store为获取到的实例\r
const store = useConfigStore();\r
//由于解构会让其失去响应式\r
//这里需要通过storeToRefs()函数使其变为响应式.\r
const {theme}  = storeToRefs(store);\r
//通过 store 的 $subscribe() 方法侦听 state 及其变化\r
//当然你也可以通过watch()来监听state的变化\r
store.$subscribe((mutation,state)=>{\r
  //每一次变化切换主题\r
  change_theme(state.theme)\r
})\r
onBeforeMount(() => {});\r
//在onMounted对主题进行初始化\r
//这里注意必须用 .value 因为是响应式数据\r
onMounted(() => {\r
  change_theme(theme.value)\r
});\r
\`\`\`\r
# 改变state\r
在切换主题的按钮的点击事件中将我们写好的action作为store的方法调用\r
\`\`\`javascript\r
//store为获取到的实例 也就是 useConfigStore()返回的对象\r
store.change_g_theme()\r
\`\`\``;export{r as default};
