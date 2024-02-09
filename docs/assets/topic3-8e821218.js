const n=`#安装pinia\r
\`\`\`\r
npm install pinia\r
\`\`\`\r
#配置pinia\r
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
#创造store\r
在src目录下新建一个store文件夹  \r
并在store下新建一个config.js用于配置我们主题的全局状态\r
#定义store\r
通过***defineStore***来定义store.\r
第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的.\r
***defineStore***() 的第二个参数可接受两类值：Setup函数或Option对象.\r
这里采用的是option对象.\r
你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).`;export{n as default};
