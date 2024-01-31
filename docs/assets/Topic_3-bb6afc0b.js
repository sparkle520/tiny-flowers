import{_ as j,u as B,l as J,s as u,a as q,o as R,c as C,D as m,v as i,d as M,e as A,g as t,B as s,F as $,j as N,p as V,f as L,i as l}from"./index-e1936177.js";import{c as b,a as f}from"./topic-fabbf4cb.js";const e=p=>(V("data-v-b3db1b5d"),p=p(),L(),p),k={id:"topic_main",class:"flex flex_direction_column"},D={class:"topic_container flex flex_direction_row"},F={class:"topic_content flex flex_direction_column"},P={class:"topic_text flex flex_direction_column"},U=e(()=>t("h1",{class:"line_height_30"},"安装pinia",-1)),E={class:"hljs_container",style:{width:"100%"},codetype:""},O=e(()=>t("h1",null,"配置pinia",-1)),z=e(()=>t("span",{class:"normal"},"在main.js配置",-1)),G={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},H=e(()=>t("h1",{class:"line_height_30"},"创建store",-1)),K=e(()=>t("span",{class:"normal"},"在src目录下新建一个store文件夹",-1)),Q=e(()=>t("span",{class:"normal"},"并在store下新建一个config.js用于配置我们主题的全局状态",-1)),W=e(()=>t("h1",{class:""},"定义store",-1)),X=e(()=>t("span",{class:"normal"},[l("通过defineStore来定义store."),t("br"),l(" 第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的."),t("br"),l(" defineStore() 的第二个参数可接受两类值：Setup函数或Option对象."),t("br"),l(" 这里采用的是option对象."),t("br"),l(" 你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).")],-1)),Y={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},Z=N('<h1 data-v-b3db1b5d>访问state</h1><span class="normal" data-v-b3db1b5d>在组件中访问state,通过use...Store()返回的对象访问,并能直接对其读写.</span><span class="normal" style="line-height:25px;" data-v-b3db1b5d>subscribe中的mutation主要包含三个属性值： <br data-v-b3db1b5d> events：当前state改变的具体数据,包括改变前的值和改变后的值等等数据 <br data-v-b3db1b5d> storeId：是当前store的id <br data-v-b3db1b5d> type：用于记录这次数据变化是通过什么途径,主要有三个分别是 <br data-v-b3db1b5d>     &quot;direct&quot; ：通过 action 变化的<br data-v-b3db1b5d>     &quot;patch object&quot;：通过 $patch 传递对象的方式改变的 <br data-v-b3db1b5d>     &quot;patch function&quot; ：通过 $patch 传递函数的方式改变的 <br data-v-b3db1b5d>     detached:布尔值，默认是 false,正常情况下,当订阅所在的组件被卸载时,订阅将被停止删除, <br data-v-b3db1b5d> 如果设置detached值为 true 时,即使所在组件被卸载,订阅依然在生效</span>',3),tt={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},et=e(()=>t("h1",null,"改变state",-1)),ot=e(()=>t("span",{class:"normal"},"在切换主题的按钮的点击事件中将我们写好的action作为store的方法调用",-1)),st={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},at=e(()=>t("h1",null,"总结",-1)),ct=e(()=>t("span",{class:"normal"},"以上就是全部内容,通过pinia来实现全局主题切换",-1)),nt={__name:"Topic_3",setup(p){const _=B(),g=J(),{theme:v}=u(_),{layout:y}=u(_);_.$subscribe((a,c)=>{b(c.theme),f(c.layout)}),q(),R(()=>{});const S=()=>{m.emit("topic_data",h())},h=()=>({topic_data:x(g.technique,1)}),x=(a,c)=>{if(a.length==0)return-1;let n=0,r=a.length;for(;n<r;){let o=n+Math.floor((r-n)/2);if(a[o].id==c)return a[o];a[o].id>c?n=o+1:r=o}return-1};C(()=>{b(v.value),f(y.value),m.emit("topic_data",h())});const d=[`
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
`];return(a,c)=>{const n=i("TopicTopInterface"),r=i("TopicLeftInterface"),o=i("highlightjs"),T=i("TopicBottomInterface"),w=i("TopicRightInterface"),I=i("Utils");return M(),A($,null,[t("div",k,[s(n),t("div",D,[s(r),t("div",F,[t("div",P,[U,t("div",E,[s(o,{style:{width:"700px"},language:"npm",autodetect:!1,code:d[0]},null,8,["code"])]),O,z,t("div",G,[s(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[2]},null,8,["code"])]),H,K,Q,t("img",{onLoad:S,src:"https://pic.imgdb.cn/item/65aab24b871b83018a614f60.jpg",style:{width:"50%"},alt:""},null,32),W,X,t("div",Y,[s(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[1]},null,8,["code"])]),Z,t("div",tt,[s(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[3]},null,8,["code"])]),et,ot,t("div",st,[s(o,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[4]},null,8,["code"])]),at,ct]),s(T)]),s(w)])]),s(I)],64)}}},rt=j(nt,[["__scopeId","data-v-b3db1b5d"]]);export{rt as default};
