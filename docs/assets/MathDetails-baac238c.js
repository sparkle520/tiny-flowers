import{_ as X,l as Y,s as A,m as g,w as E,b as P,G as W,y as F,e as C,f as k,g as o,z as m,q as B,A as v,B as T,p as G,j as $,C as L,D as N}from"./index-bd42a444.js";import{u as q}from"./math-b5eb667e.js";import{m as x}from"./marked.esm-98d564e7.js";const _=u=>(G("data-v-81ab5f23"),u=u(),$(),u),U={class:"math_details_main flex flex_direction_column"},J=_(()=>o("div",{class:"math_top_box flex flex_direction_row"},null,-1)),K={class:"box flex flex_direction_row",ref:"box"},Q={class:"left flex flex_direction_column"},Z=_(()=>o("div",{class:"left_top_box flex flex_direction_row align_items_center"},[o("span",null,"题目描述区")],-1)),ee=["innerHTML"],te=_(()=>o("div",{class:"resize",title:"左右侧边栏"},null,-1)),oe={class:"right"},se={class:"right_top_box"},ne={key:0,class:"show_solution flex align_items_center justify_content_center"},le={class:"right_top_top_box flex flex_direction_row align_items_center"},ie=_(()=>o("span",null,"答案解析区",-1)),ae=[ie],ce=["innerHTML"],_e=_(()=>o("div",{title:"上下侧边栏",class:"move"},null,-1)),re={class:"right_bottom_box flex flex_direction_column"},de={key:0,class:"show_comment flex align_items_center justify_content_center"},me={class:"right_bottom_top_box flex flex_direction_row align_items_center"},ue=_(()=>o("span",null,"评论区 (欢迎分享你的解题思路和答案)",-1)),he=[ue],fe={id:"gitalk-container"},pe={__name:"MathDetails",setup(u){const D=q(),{params:M}=Y(),{data:I}=A(D),h=g(!1),f=g(!1),r=g(""),b=g(""),z=new x.Renderer;x.setOptions({renderer:z,gfm:!1,pedantic:!1,sanitize:!0}),E(r,t=>{r.value=x(t),L(()=>{N(document.getElementById("solution"))})}),E(b,t=>{r.value=x(t),L(()=>{N(document.getElementById("problem"))})}),P(()=>{H(),j(),new W({clientID:"429076372c73a03552c6",clientSecret:"e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",repo:"TinyFlowersComment",owner:"sparkle520",admin:["sparkle520"],id:I.value[0].link,language:"zh-CN",distractionFreeMode:!1,proxy:"https://strong-caramel-969805.netlify.app/github_access_token"}).render("gitalk-container"),O()});function H(){let t=document.getElementsByClassName("resize"),i=document.getElementsByClassName("left"),a=document.getElementsByClassName("right"),n=document.getElementsByClassName("box");for(let e=0;e<t.length;e++)t[e].onmousedown=function(c){let w=c.clientX;return t[e].left=t[e].offsetLeft,document.onmousemove=function(p){let y=p.clientX,s=t[e].left+(y-w)-n[0].offsetLeft,d=n[e].clientWidth-t[e].offsetWidth;s<50&&(s=50),s>d-150&&(s=d-150),t[e].style.left=s;for(let l=0;l<i.length;l++)i[l].style.width=s+"px",a[l].style.width=n[e].clientWidth-s-10+"px"},document.onmouseup=function(p){document.onmousemove=null,document.onmouseup=null,t[e].releaseCapture&&t[e].releaseCapture()},t[e].setCapture&&t[e].setCapture(),!1}}function j(){let t=document.getElementsByClassName("move"),i=document.getElementsByClassName("right_top_box"),a=document.getElementsByClassName("right_bottom_box"),n=document.getElementsByClassName("box");for(let e=0;e<t.length;e++)t[e].onmousedown=function(c){let w=c.clientY;return t[e].top=t[e].offsetTop,document.onmousemove=function(p){let y=p.clientY,s=t[e].top+(y-w)-n[0].offsetTop,d=n[e].clientHeight-t[e].offsetHeight;s<50&&(s=50),s>d-150&&(s=d-150),t[e].style.top=s;for(let l=0;l<i.length;l++)i[l].style.height=s+"px",a[l].style.height=n[e].clientHeight-s-10+"px"},document.onmouseup=function(){document.onmousemove=null,document.onmouseup=null,t[e].releaseCapture&&t[e].releaseCapture()},t[e].setCapture&&t[e].setCapture(),!1}}const R=()=>{h.value=!0},S=()=>{f.value=!0},O=()=>{V(M.id)},V=t=>{const i=`/src/math_data/solution/${t}.md`,a=`/src/math_data/problem/${t}.md`,n=Object.assign({"/src/math_data/problem/1.md":()=>T(()=>import("./1-22481f6c.js"),[]).then(e=>e.default),"/src/math_data/solution/1.md":()=>T(()=>import("./1-48788aff.js"),[]).then(e=>e.default)});for(const e in n)e==i?n[e]().then(c=>{r.value=c}):e==a&&n[e]().then(c=>{b.value=c})};return(t,i)=>{const a=F("highlight");return C(),k("div",U,[J,o("div",K,[o("div",Q,[Z,m(o("div",{innerHTML:b.value,id:"problem",class:"markdown-body solution_problem_box"},null,8,ee),[[a]])]),te,o("div",oe,[o("div",se,[h.value?B("",!0):(C(),k("div",ne,[o("button",{class:"show_solution_btn",onClick:R}," 查看答案解析 ")])),m(o("div",le,ae,512),[[v,h.value]]),m(o("div",{innerHTML:r.value,id:"solution",class:"markdown-body solution_problem_box"},null,8,ce),[[v,h.value],[a]])]),_e,o("div",re,[f.value?B("",!0):(C(),k("div",de,[o("button",{class:"show_comment_btn",onClick:S}," 查看评论区(可能含有答案和解题思路) ")])),m(o("div",me,he,512),[[v,f.value]]),m(o("div",fe,null,512),[[v,f.value]])])])],512)])}}},be=X(pe,[["__scopeId","data-v-81ab5f23"]]);export{be as default};