import{A as V,m as k,B as w,u as A,M,s as f,c as P,o as j,b as C,C as h,n as e,D as H,e as N,f as F,g as n,x as o,w as S,F as U,N as T,H as $,I as _}from"./index-17aab836.js";import{c as g,a as v,s as z}from"./topic-09577f95.js";import{m as p}from"./marked.esm-98d564e7.js";const q={id:"topic_main"},G={class:"topic_container"},J={class:"topic_content"},K={class:"topic_text"},Q=["innerHTML"],tt={__name:"TopicInterface",setup(W){const{params:m}=V(),I=new p.Renderer;p.setOptions({renderer:I,gfm:!1,pedantic:!1,sanitize:!0});const B=()=>{L(m.index)},a=k("");w(a,s=>{a.value=p(s),h(()=>{$(document.getElementById("mathjax")),T.emit("topic_data",l())})});const r=A(),E=M(),{theme:R}=f(r),{layout:x}=f(r);r.$subscribe((s,c)=>{g(c.theme),v(c.layout)}),P(),j(()=>{});const l=()=>({topic_data:z(u.arr,u.id)}),u={arr:E.data,id:m.index};C(()=>{g(R.value),v(x.value),B(),h(()=>{T.emit("topic_data",l())})});const L=s=>{const c=`/src/assets/topic_md/${s}.md`,i=Object.assign({"/src/assets/topic_md/1.md":()=>_(()=>import("./1-104bd961.js"),[]).then(t=>t.default),"/src/assets/topic_md/2.md":()=>_(()=>import("./2-fdd324f3.js"),[]).then(t=>t.default),"/src/assets/topic_md/3.md":()=>_(()=>import("./3-52af1da7.js"),[]).then(t=>t.default),"/src/assets/topic_md/4.md":()=>_(()=>import("./4-28261dbf.js"),[]).then(t=>t.default)});for(const t in i)t==c&&i[t]().then(d=>{a.value=d})};return(s,c)=>{const i=e("TopicBgInterface"),t=e("TopicTopInterface"),d=e("TopicLeftInterface"),b=e("TopicBottomInterface"),D=e("TopicRightInterface"),y=e("Utils"),O=H("highlight");return N(),F(U,null,[n("div",q,[o(i,{class:"topic_bg"}),o(t,{class:"topic_top_interface"}),n("div",G,[o(d),n("div",J,[n("div",K,[S(n("div",{innerHTML:a.value,id:"mathjax",class:"markdown-body"},null,8,Q),[[O]])]),o(b)]),o(D)])]),o(y)],64)}}};export{tt as default};
