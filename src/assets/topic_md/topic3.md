#安装pinia
```
npm install pinia
```
#配置pinia
在main.js中引入pinia
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```
#创造store
在src目录下新建一个store文件夹  
并在store下新建一个config.js用于配置我们主题的全局状态
#定义store
通过***defineStore***来定义store.
第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的.
***defineStore***() 的第二个参数可接受两类值：Setup函数或Option对象.
这里采用的是option对象.
你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).