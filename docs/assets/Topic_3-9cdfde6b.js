import{_ as B,u as q,l as J,s as m,E as f,G as g,a as R,o as C,c as M,q as A,v as c,d as $,e as N,g as t,B as o,F as V,j as k,H as b,p as L,f as E,i as l}from"./index-1ba7c20a.js";/* empty css                                                                   */const e=_=>(L("data-v-d2be98c0"),_=_(),E(),_),F={id:"topic_main",class:"flex flex_direction_column"},P={class:"topic_container flex flex_direction_row"},U={class:"topic_content flex flex_direction_column"},D={class:"topic_text flex flex_direction_column"},G=e(()=>t("h1",{class:"line_height_30"},"安装pinia",-1)),H={class:"hljs_container",style:{width:"100%"},codetype:""},O=e(()=>t("h1",null,"配置pinia",-1)),z=e(()=>t("span",{class:"normal"},"在main.js配置",-1)),K={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},Q=e(()=>t("h1",{class:"line_height_30"},"创建store",-1)),W=e(()=>t("span",{class:"normal"},"在src目录下新建一个store文件夹",-1)),X=e(()=>t("span",{class:"normal"},"并在store下新建一个config.js用于配置我们主题的全局状态",-1)),Y=e(()=>t("h1",{class:""},"定义store",-1)),Z=e(()=>t("span",{class:"normal"},[l("通过defineStore来定义store."),t("br"),l(" 第一个参数是你的应用中store的唯一ID,要求它是独一无二的,必须传入的."),t("br"),l(" defineStore() 的第二个参数可接受两类值：Setup函数或Option对象."),t("br"),l(" 这里采用的是option对象."),t("br"),l(" 你可以认为 state 是 store 的数据 (data)，而 actions 则是方法 (methods).")],-1)),tt={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},et=k('<h1 data-v-d2be98c0>访问state</h1><span class="normal" data-v-d2be98c0>在组件中访问state,通过use...Store()返回的对象访问,并能直接对其读写.</span><span class="normal" style="line-height:25px;" data-v-d2be98c0>subscribe中的mutation主要包含三个属性值： <br data-v-d2be98c0> events：当前state改变的具体数据,包括改变前的值和改变后的值等等数据 <br data-v-d2be98c0> storeId：是当前store的id <br data-v-d2be98c0> type：用于记录这次数据变化是通过什么途径,主要有三个分别是 <br data-v-d2be98c0>     &quot;direct&quot; ：通过 action 变化的<br data-v-d2be98c0>     &quot;patch object&quot;：通过 $patch 传递对象的方式改变的 <br data-v-d2be98c0>     &quot;patch function&quot; ：通过 $patch 传递函数的方式改变的 <br data-v-d2be98c0>     detached:布尔值，默认是 false,正常情况下,当订阅所在的组件被卸载时,订阅将被停止删除, <br data-v-d2be98c0> 如果设置detached值为 true 时,即使所在组件被卸载,订阅依然在生效</span>',3),ot={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},st=e(()=>t("h1",null,"改变state",-1)),at=e(()=>t("span",{class:"normal"},"在切换主题的按钮的点击事件中将我们写好的action作为store的方法调用",-1)),ct={class:"hljs_container",style:{width:"100%"},codetype:"JavaScript"},nt=e(()=>t("h1",null,"总结",-1)),it=e(()=>t("span",{class:"normal"},"以上就是全部内容,通过pinia来实现全局主题切换",-1)),dt={__name:"Topic_3",setup(_){const h=q(),v=J(),{theme:y}=m(h),{layout:S}=m(h);h.$subscribe((s,n)=>{f(n.theme),g(n.layout)}),R(),C(()=>{});const x=()=>{b.emit("topic_data",u())},u=()=>({topic_data:T(v.technique,1)}),T=(s,n)=>{if(s.length==0)return-1;let i=0,r=s.length;for(;i<r;){let a=i+Math.floor((r-i)/2);if(s[a].id==n)return s[a];s[a].id>n?i=a+1:r=a}return-1};M(()=>{f(y.value),g(S.value),A(()=>{b.emit("topic_data",u())})});const d=[`
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
`];return(s,n)=>{const i=c("TopicBgInterface"),r=c("TopicTopInterface"),a=c("TopicLeftInterface"),p=c("highlightjs"),I=c("TopicBottomInterface"),w=c("TopicRightInterface"),j=c("Utils");return $(),N(V,null,[t("div",F,[o(i,{class:"topic_bg"}),o(r),t("div",P,[o(a),t("div",U,[t("div",D,[G,t("div",H,[o(p,{style:{width:"700px"},language:"npm",autodetect:!1,code:d[0]},null,8,["code"])]),O,z,t("div",K,[o(p,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[2]},null,8,["code"])]),Q,W,X,t("img",{onLoad:x,src:"https://pic.imgdb.cn/item/65aab24b871b83018a614f60.jpg",style:{width:"50%"},alt:""},null,32),Y,Z,t("div",tt,[o(p,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[1]},null,8,["code"])]),et,t("div",ot,[o(p,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[3]},null,8,["code"])]),st,at,t("div",ct,[o(p,{style:{width:"700px"},language:"JavaScript",autodetect:!1,code:d[4]},null,8,["code"])]),nt,it]),o(I)]),o(w)])]),o(j)],64)}}},lt=B(dt,[["__scopeId","data-v-d2be98c0"]]);export{lt as default};
