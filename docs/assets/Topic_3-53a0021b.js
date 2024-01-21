import{c as d,a as l,g as y,T as b}from"./TopicTitle-9130e873.js";import{_ as S,u as x,s as p,o as w,c as j,n as T,m as r,d as J,e as q,g as t,q as e,F as C,j as _,y as I,p as A,f as B}from"./index-767a95a2.js";const a=n=>(A("data-v-5849a851"),n=n(),B(),n),M={id:"topic_main",class:"flex flex_direction_row"},$={class:"topic_content"},R={class:"topic_text flex flex_direction_column"},k=a(()=>t("h1",{class:"line_height_30"},"安装pinia",-1)),D={class:"hljs_container",style:{width:"100%"},codetype:""},L=a(()=>t("h1",null,"配置pinia",-1)),N=a(()=>t("span",{class:"normal"},"在main.js配置",-1)),V={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},F=_('<h1 class="line_height_30" data-v-5849a851>创建store</h1><span class="normal" data-v-5849a851>在src目录下新建一个store文件夹</span><span class="normal" data-v-5849a851>并在store下新建一个config.js用于配置我们主题的全局状态</span><img src="https://pic.imgdb.cn/item/65aab24b871b83018a614f60.jpg" style="width:50%;" alt="" data-v-5849a851><h1 class="" data-v-5849a851>定义store</h1><span class="normal" data-v-5849a851>通过defineStore来定义store.<br data-v-5849a851> 第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的.<br data-v-5849a851> defineStore() 的第二个参数可接受两类值：Setup函数或Option对象.<br data-v-5849a851> 这里采用的是option对象.<br data-v-5849a851> 你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).</span>',6),P={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},U=_('<h1 data-v-5849a851>访问state</h1><span class="normal" data-v-5849a851>在组件中访问state,通过use...Store()返回的对象访问,并能直接对其读写.</span><span class="normal" style="line-height:25px;" data-v-5849a851>subscribe中的mutation主要包含三个属性值： <br data-v-5849a851> events：当前state改变的具体数据,包括改变前的值和改变后的值等等数据 <br data-v-5849a851> storeId：是当前store的id <br data-v-5849a851> type：用于记录这次数据变化是通过什么途径,主要有三个分别是 <br data-v-5849a851>     &quot;direct&quot; ：通过 action 变化的<br data-v-5849a851>     &quot;patch object&quot;：通过 $patch 传递对象的方式改变的 <br data-v-5849a851>     &quot;patch function&quot; ：通过 $patch 传递函数的方式改变的 <br data-v-5849a851>     detached:布尔值，默认是 false,正常情况下,当订阅所在的组件被卸载时,订阅将被停止删除, <br data-v-5849a851> 如果设置detached值为 true 时,即使所在组件被卸载,订阅依然在生效</span>',3),E={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},O=a(()=>t("h1",null,"改变state",-1)),z=a(()=>t("span",{class:"normal"},"在切换主题的按钮的点击事件中将我们写好的action作为store的方法调用",-1)),G={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},H=a(()=>t("h1",null,"总结",-1)),K=a(()=>t("span",{class:"normal"},"以上就是全部内容,通过pinia来实现全局主题切换",-1)),Q={__name:"Topic_3",setup(n){const c=x(),{theme:h}=p(c),{layout:u}=p(c);c.$subscribe((v,i)=>{d(i.theme),l(i.layout)}),w(()=>{}),j(()=>{d(h.value),l(u.value),T(()=>{I.emit("new_titles_list",y())})});const m={title:"用pinia实现全局换肤功能",date:"2024-01-19?21:00"},s=[`
      npm install pinia
      `,`import { defineStore } from 'pinia'
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
})`,`
import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

`,`
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
`,`
////store为获取到的实例 也就是 useConfigStore()返回的对象
store.change_g_theme()
`];return(v,i)=>{const o=r("highlightjs"),f=r("DirectoryList"),g=r("Utils");return J(),q(C,null,[t("div",M,[t("div",$,[e(b,{data:m}),t("div",R,[k,t("div",D,[e(o,{style:{width:"700px"},language:"npm",autodetect:!1,code:s[0]},null,8,["code"])]),L,N,t("div",V,[e(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:s[2]},null,8,["code"])]),F,t("div",P,[e(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:s[1]},null,8,["code"])]),U,t("div",E,[e(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:s[3]},null,8,["code"])]),O,z,t("div",G,[e(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:s[4]},null,8,["code"])]),H,K])]),e(f,{class:"directoryList"})]),e(g)],64)}}},Y=S(Q,[["__scopeId","data-v-5849a851"]]);export{Y as default};
