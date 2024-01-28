import{c as l,a as p,g as _,T as x}from"./TopicTitle-c4307e06.js";import{_ as w,u as T,s as h,o as j,c as J,q,v as r,d as A,e as C,g as t,w as s,F as I,j as B,A as u,p as M,f as $,i as c}from"./index-2b281e3f.js";const e=i=>(M("data-v-c9fdb26e"),i=i(),$(),i),L={id:"topic_main",class:"flex flex_direction_row"},N={class:"topic_content"},R={class:"topic_text flex flex_direction_column"},V=e(()=>t("h1",{class:"line_height_30"},"安装pinia",-1)),k={class:"hljs_container",style:{width:"100%"},codetype:""},D=e(()=>t("h1",null,"配置pinia",-1)),F=e(()=>t("span",{class:"normal"},"在main.js配置",-1)),P={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},U=e(()=>t("h1",{class:"line_height_30"},"创建store",-1)),E=e(()=>t("span",{class:"normal"},"在src目录下新建一个store文件夹",-1)),O=e(()=>t("span",{class:"normal"},"并在store下新建一个config.js用于配置我们主题的全局状态",-1)),z=e(()=>t("h1",{class:""},"定义store",-1)),G=e(()=>t("span",{class:"normal"},[c("通过defineStore来定义store."),t("br"),c(" 第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的."),t("br"),c(" defineStore() 的第二个参数可接受两类值：Setup函数或Option对象."),t("br"),c(" 这里采用的是option对象."),t("br"),c(" 你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).")],-1)),H={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},K=B('<h1 data-v-c9fdb26e>访问state</h1><span class="normal" data-v-c9fdb26e>在组件中访问state,通过use...Store()返回的对象访问,并能直接对其读写.</span><span class="normal" style="line-height:25px;" data-v-c9fdb26e>subscribe中的mutation主要包含三个属性值： <br data-v-c9fdb26e> events：当前state改变的具体数据,包括改变前的值和改变后的值等等数据 <br data-v-c9fdb26e> storeId：是当前store的id <br data-v-c9fdb26e> type：用于记录这次数据变化是通过什么途径,主要有三个分别是 <br data-v-c9fdb26e>     &quot;direct&quot; ：通过 action 变化的<br data-v-c9fdb26e>     &quot;patch object&quot;：通过 $patch 传递对象的方式改变的 <br data-v-c9fdb26e>     &quot;patch function&quot; ：通过 $patch 传递函数的方式改变的 <br data-v-c9fdb26e>     detached:布尔值，默认是 false,正常情况下,当订阅所在的组件被卸载时,订阅将被停止删除, <br data-v-c9fdb26e> 如果设置detached值为 true 时,即使所在组件被卸载,订阅依然在生效</span>',3),Q={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},W=e(()=>t("h1",null,"改变state",-1)),X=e(()=>t("span",{class:"normal"},"在切换主题的按钮的点击事件中将我们写好的action作为store的方法调用",-1)),Y={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},Z=e(()=>t("h1",null,"总结",-1)),tt=e(()=>t("span",{class:"normal"},"以上就是全部内容,通过pinia来实现全局主题切换",-1)),et={__name:"Topic_3",setup(i){const n=T(),{theme:m}=h(n),{layout:f}=h(n);n.$subscribe((b,d)=>{l(d.theme),p(d.layout)}),j(()=>{});const g=()=>{u.emit("new_titles_list",_())};J(()=>{l(m.value),p(f.value),q(()=>{u.emit("new_titles_list",_())})});const v={title:"用pinia实现全局换肤功能",date:"2024-01-19?21:00"},o=[`
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
`];return(b,d)=>{const a=r("highlightjs"),y=r("DirectoryList"),S=r("Utils");return A(),C(I,null,[t("div",L,[t("div",N,[s(x,{data:v}),t("div",R,[V,t("div",k,[s(a,{style:{width:"700px"},language:"npm",autodetect:!1,code:o[0]},null,8,["code"])]),D,F,t("div",P,[s(a,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:o[2]},null,8,["code"])]),U,E,O,t("img",{onLoad:g,src:"https://pic.imgdb.cn/item/65aab24b871b83018a614f60.jpg",style:{width:"50%"},alt:""},null,32),z,G,t("div",H,[s(a,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:o[1]},null,8,["code"])]),K,t("div",Q,[s(a,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:o[3]},null,8,["code"])]),W,X,t("div",Y,[s(a,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:o[4]},null,8,["code"])]),Z,tt])]),s(y,{class:"directoryList"})]),s(S)],64)}}},at=w(et,[["__scopeId","data-v-c9fdb26e"]]);export{at as default};
