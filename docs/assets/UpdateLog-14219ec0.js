import{_ as B,D as $,E as U,o as C,b as F,a as z,j as E,c as g,d as w,w as k,v as N,q as V,e as a,F as H,r as P,n as R,P as Y,t as G,p as A,g as D,A as J,l as K,B as Q}from"./index-cce869ac.js";import{m as T}from"./marked.esm-98d564e7.js";const W=r=>(A("data-v-d2ec3618"),r=r(),D(),r),X={id:"directory_list_main"},Z={class:"catalog-card"},ee=W(()=>a("div",{class:"catalog-card-header f"},[a("div",{class:"f j_c_c"},[a("div",{class:"f f_d_r j_c_c a_c"},[a("strong",{class:"f f_d_r a_c"},[a("svg",{t:"1719710664540",class:"catalog_icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"1081",width:"32",height:"32"},[a("path",{d:"M880.7936 323.1744h-224.5632c-28.2112 0-51.0464 22.4768-51.0464 50.2784v286.976c0 22.272 14.6944 41.1136 34.9696 47.7184 8.448 2.7648 17.664 1.536 25.1904-3.1744l87.1936-54.6304c4.1472-2.56 8.704-4.0448 13.3632-4.4544 6.4-0.5632 12.9024 0.9216 18.5856 4.4544l87.2448 54.6816c7.0144 4.4032 15.616 5.9392 23.552 3.6352 21.1456-6.144 36.5568-25.3952 36.5568-48.2304V373.4528c0-27.8016-22.8352-50.2784-51.0464-50.2784z",fill:"#EBAE44",opacity:".5","p-id":"1082"}),a("path",{d:"M663.8592 151.6544H214.7328C158.3104 151.6544 112.64 196.6592 112.64 252.16v543.2832c0 44.4928 29.2864 82.176 69.9392 95.4368 16.8448 5.4784 35.328 3.072 50.3296-6.2976l174.4384-109.312a60.1088 60.1088 0 0 1 63.8464 0l174.5408 109.3632c14.0288 8.8064 31.1808 11.8272 47.104 7.2192 42.24-12.288 73.0624-50.7904 73.0624-96.4096V252.16c0-55.5008-45.6704-100.5056-102.0416-100.5056zM372.736 322.56h133.12c19.7632 0 35.84 16.0256 35.84 35.84 0 9.9328-3.9936 18.8416-10.496 25.344S515.7376 394.24 505.856 394.24h-133.12c-19.8144 0-35.84-16.0256-35.84-35.84s16.0256-35.84 35.84-35.84z m200.448 199.424A35.62496 35.62496 0 0 1 547.84 532.48H332.8c-19.8144 0-35.84-16.0256-35.84-35.84s16.0256-35.84 35.84-35.84h215.04c19.8144 0 35.84 16.0256 35.84 35.84 0 9.9328-3.9936 18.8416-10.496 25.344z",fill:"#EBAE44","p-id":"1083"})]),J("版本索引")])])])],-1)),te={class:"catalog-content"},se=["onClick","title"],oe={__name:"LogDirectoryList",setup(r){const b=$(),{layout:h}=U(b);C(()=>{}),F(()=>{document.removeEventListener("scroll",_)});const _=()=>{let e=[];for(let s=d.value.length-1;s>=0;s--){const t=d.value[s];if(t.scrollTop-window.scrollY<=10){Object.assign(L.value,t),y(t,!0),e.push(t);let n=t.parent;for(;n;)y(n,!0),e.push(n),n=n.parent;for(const v of d.value)e.includes(v)||y(v,!1);return}}};let i=null;z(()=>{document.addEventListener("scroll",_),setTimeout(()=>{m(),i=new MutationObserver(s=>{m()});let e=document.querySelector(".markdown-body");i.observe(e,{subtree:!1,attributeFilter:["height"]})},100)});const m=()=>{d.value=I()},d=E([]);let L=E({});function I(){let e=[],s=["h1","h2"];if(!document.querySelector(".markdown-body"))return e;let n=Array.from(document.querySelectorAll(".markdown-body *")),v=new Set(n.map(l=>l.tagName.toLowerCase()));for(let l=s.length-1;l>=0;l--)v.has(s[l])||s.splice(l,1);let x=s.map(()=>0),O=0;for(let l=0;l<n.length;l++){const u=n[l];let S=u.tagName.toLowerCase(),f=s.indexOf(S);if(f==-1)continue;let j=S+"-"+u.innerText+"-"+l,q=O+u.offsetTop,o={id:j,level:f,parent:null,children:[],rawName:u.innerText,scrollTop:q};if(e.length>0){let c=e.at(-1);if(c.level<o.level)o.parent=c,c.children.push(o);else if(c.level>o.level){x.fill(0,f+1);let p=c.parent;for(;p;){if(p.level<o.level){p.children.push(o),o.parent=p;break}p=p.parent}}else c.parent&&(o.parent=c.parent,c.parent.children.push(o))}x[f]+=1,o.isVisible=o.parent==null,o.name=u.innerText,e.push(o)}return e}function y(e,s){for(const t of e.children)t.isVisible=s}function M(e){window.scrollTo({top:e+10,behavior:"smooth"})}return(e,s)=>(g(),w("div",X,[k(a("div",Z,[ee,a("div",te,[(g(!0),w(H,null,P(d.value,t=>k((g(),w("div",{key:t.id,onClick:n=>M(t.scrollTop),class:R(["catalog-item",V(L).id==t.id?"active":"not-active"]),style:Y({marginLeft:t.level*20+"px"}),title:t.rawName},G(t.name),15,se)),[[N,t.isVisible]])),128))])],512),[[N,V(h)]])]))}},le=B(oe,[["__scopeId","data-v-d2ec3618"]]);const ae=r=>(A("data-v-cbab61ad"),r=r(),D(),r),ne={id:"update_log_main",class:"f f_d_r r"},re=ae(()=>a("div",{class:"log_md_box"},[a("div",{class:"log_md markdown-body"})],-1)),ce={__name:"UpdateLog",setup(r){const b=new T.Renderer;return T.setOptions({renderer:b,gfm:!1,pedantic:!1,sanitize:!0}),C(()=>{}),z(()=>{window.scrollTo(0,0);const h="/src/version_log.md",_=Object.assign({"/src/version_log.md":()=>Q(()=>import("./version_log-377ff6d0.js"),[]).then(i=>i.default)});for(const i in _)i==h&&_[i]().then(m=>{const d=document.querySelector(".log_md");d.innerHTML=T(m,!0)})}),(h,_)=>(g(),w("div",ne,[K(le),re]))}},_e=B(ce,[["__scopeId","data-v-cbab61ad"]]);export{_e as default};