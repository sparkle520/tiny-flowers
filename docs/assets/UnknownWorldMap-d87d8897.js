import{_ as h,u as b,o as g,a as x,w,b as r,c as f,e as t,f as m,t as n,F as y,r as k,g as I,p as M,d as N}from"./index-406eb884.js";import{d as B}from"./data-61ea2e65.js";const d=o=>(M("data-v-a6477d52"),o=o(),N(),o),W={id:"main",class:"relative"},S=I('<div class="decorate flex align_items_center" data-v-a6477d52><span data-v-a6477d52> I dreamed of a world so far from here that&#39;s not on the map. </span></div><div class="top_title relative flex align_items_center justify_content_center flex_direction_column" data-v-a6477d52> UNKNOWN<br data-v-a6477d52>WORLD<br data-v-a6477d52>MAP <div class="rectangle_1" data-v-a6477d52></div><div class="message" data-v-a6477d52> If only our voices speak at night.<br data-v-a6477d52> Could ever reach the very edge of this world and the time<br data-v-a6477d52> Instead of fading into air and dust.<br data-v-a6477d52> Then what will the words could ever be<br data-v-a6477d52> For all these words from probably. </div></div>',2),j={class:"statistics_box relative flex flex_direction_row justify_content_center relative"},U={class:"topic_count flex flex_direction_column align_items_center"},V=d(()=>t("p",null,"文章",-1)),C=d(()=>t("div",{class:"absolute rectangle_2"},null,-1)),F={class:"visit_count flex flex_direction_column align_items_center"},T=d(()=>t("p",null,"访问",-1)),D={class:"content width_full relative flex flex_direction_column"},E={class:"class_box flex flex_direction_row justify_content_center"},L=["onClick"],O={__name:"UnknownWorldMap",props:{theme:Boolean},setup(o){const v=b();g(()=>{}),x(()=>{i(c.theme)});const _={topic_count:B.data.length,visit_count:100},p=[{name:"学习笔记"},{name:"技术分享"},{name:"生活随想"},{name:"二次元"}],u=a=>{v.push("/unknownWorldMap/list/"+a+"/1")},c=o;w(c,(a,s)=>{i(a.theme)});const e=(a,s)=>{document.getElementsByTagName("body")[0].style.setProperty(a,s)},i=a=>{a?(e("--bg_color","#1e2433"),e("--color","#e3eae1"),e("--p","#e3eae1"),e("--decorate_bg_1","#e3eae1"),e("--decorate_bg_2","#e3eae1"),e("--decorate_bg_3","#ffff"),e("--item_bg","#242b3d"),e("--item_shadow","#242b34"),e("--item_color","#f0e6e4"),e("--item_bf_bg","#d2c3d522"),e("--item_af_bg","#94709b")):(e("--bg_color","#f7f3f5"),e("--color","#262220"),e("--p","#705547"),e("--decorate_bg_1","#f0681e"),e("--decorate_bg_2","#ed8262"),e("--decorate_bg_3","#f89d8a"),e("--item_bg","#fffbf9"),e("--item_shadow","#ff7b005b"),e("--item_color","#f0681e"),e("--item_bf_bg","#4d678233"),e("--item_af_bg","#99d0d9"))};return(a,s)=>(r(),f("div",W,[S,t("div",j,[t("div",U,[V,m(" "+n(_.topic_count),1)]),C,t("div",F,[T,m(" "+n(_.visit_count),1)])]),t("div",D,[t("div",E,[(r(),f(y,null,k(p,(l,P)=>t("div",{onClick:R=>u(l.name),class:"relative item flex align_items_center justify_content_center"},n(l.name),9,L)),64))])])]))}},$=h(O,[["__scopeId","data-v-a6477d52"]]);export{$ as default};