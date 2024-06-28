import{_ as P,d as r,e as d,p as A,g as S,h as e,b as Q,o as N,a as D,k as O,P as X,s as m,Q as Z,E as C,G as j,c as q,r as R,w as U,v as G,m as T,F as Y,l as tt,n as et,R as st,t as x,u as ot,L as nt,K as M,x as W,H as _t,M as J,N as K,C as s,z as at,D as it}from"./index-f2fa8c98.js";import{H as ct}from"./index-84f3513b.js";import{m as B}from"./marked.esm-98d564e7.js";const rt={},lt=n=>(A("data-v-e2439f48"),n=n(),S(),n),dt={id:"note_top_main",class:"r f a_c j_c_c"},ut=lt(()=>e("img",{class:"note_top_main_bg",src:"https://pic.imgdb.cn/item/666c45e4d9c307b7e930def6.png",alt:""},null,-1)),pt=[ut];function mt(n,c){return r(),d("div",dt,pt)}const ht=P(rt,[["render",mt],["__scopeId","data-v-e2439f48"]]),ft={__name:"NoteBgInterface",setup(n){return Q(),N(()=>{}),D(()=>{}),(c,g)=>{const y=O("Particles");return r(),X(y,{id:"tsparticles",options:m(Z)},null,8,["options"])}}};const vt=n=>(A("data-v-772a2d0b"),n=n(),S(),n),gt={id:"directory_list_main"},Et={class:"catalog-card"},yt={class:"catalog-card-header f"},bt={class:"f j_c_c"},It=vt(()=>e("div",{class:"f f_d_r j_c_c a_c"},[e("strong",null,"目录🌼")],-1)),Tt={class:"catalog-content"},$t=["onClick","title"],xt={__name:"Directory",setup(n){const c=C(),{layout:g}=j(c);q(()=>{document.removeEventListener("scroll",y)});const y=()=>{if(_.value==null||_.value==null)return;let o=[];for(let i=_.value.length-1;i>=0;i--){const t=_.value[i];if(t.scrollTop<=window.scrollY){if(f.value.id===t.id)return;Object.assign(f.value,t),l(t,!0),o.push(t);let a=t.parent;for(;a;)l(a,!0),o.push(a),a=a.parent;for(const $ of _.value)o.includes($)||l($,!1);return}}};let u=null;D(()=>{document.addEventListener("scroll",y),setTimeout(()=>{h(),u=new MutationObserver(i=>{h()});let o=document.querySelector(".markdown-body");u.observe(o,{subtree:!1,attributeFilter:["height"]})},2e3)});const h=()=>{_.value=b()},_=R([]);let f=R({});function b(){let o=[],i=["h1","h2","h3","h4","h5","h6"];if(!document.querySelector(".markdown-body"))return o;let a=Array.from(document.querySelectorAll(".markdown-body *")),$=new Set(a.map(p=>p.tagName.toLowerCase()));for(let p=i.length-1;p>=0;p--)$.has(i[p])||i.splice(p,1);let L=i.map(()=>0),F=document.querySelector("#note_top_main").clientHeight+60;for(let p=0;p<a.length;p++){const w=a[p];let H=w.tagName.toLowerCase(),V=i.indexOf(H);if(V==-1)continue;let v={id:H+"-"+w.innerText+"-"+p,level:V,parent:null,children:[],rawName:w.innerText,scrollTop:w.offsetTop+F};if(o.length>0){let I=o.at(-1);if(I.level<v.level)v.parent=I,I.children.push(v);else if(I.level>v.level){L.fill(0,V+1);let k=I.parent;for(;k;){if(k.level<v.level){k.children.push(v),v.parent=k;break}k=k.parent}}else I.parent&&(v.parent=I.parent,I.parent.children.push(v))}L[V]+=1,v.isVisible=v.parent==null,v.name=w.innerText,o.push(v)}return o}function l(o,i){for(const t of o.children)t.isVisible=i}function E(o){window.scrollTo({top:o+10,behavior:"smooth"})}return(o,i)=>{const t=O("font-awesome-icon");return r(),d("div",gt,[U(e("div",Et,[e("div",yt,[e("div",bt,[e("span",null,[T(t,{icon:["fas","bars-staggered"],class:"catalog-icon"})]),It])]),e("div",Tt,[(r(!0),d(Y,null,tt(_.value,a=>U((r(),d("div",{key:a.id,onClick:$=>E(a.scrollTop),class:et(["catalog-item",m(f).id==a.id?"active":"not-active"]),style:st({paddingLeft:a.level*10+"px"}),title:a.rawName},x(a.name),15,$t)),[[G,a.isVisible]])),128))])],512),[[G,m(g)]])])}}},kt=P(xt,[["__scopeId","data-v-772a2d0b"]]);const z=n=>(A("data-v-60661423"),n=n(),S(),n),Lt={id:"topic_right_main"},wt={class:"personal_item intro f f_d_c a_c"},Rt=["src"],Dt=["textContent"],Vt=["textContent"],Ot={class:"topic_class_box f f_d_r"},Pt={class:"topic_classification_total_box f f_d_c a_c"},At=z(()=>e("h3",null,"文章",-1)),St=["textContent"],Nt=z(()=>e("div",{class:"topic_classification_total_box f f_d_c a_c"},[e("h3",null,"分类"),e("span",null,"3")],-1)),Ct={class:"topic_classification_total_box f f_d_c a_c"},Bt=z(()=>e("h3",null,"笔记",-1)),jt={__name:"NoteRightInterface",setup(n){const c=C(),g=ot(),y=nt(),u=M();N(()=>{}),D(()=>{h(c.layout)}),c.$subscribe((_,f)=>{h(f.layout)});const h=_=>{const f=document.querySelector("#topic_right_main");_?f.style.display="block":f.style.display="none"};return(_,f)=>(r(),d("div",Lt,[e("div",wt,[e("img",{src:m(g).avatar,alt:""},null,8,Rt),e("span",{class:"personal_name",textContent:x(m(g).name)},null,8,Dt),e("span",{class:"personal_signature",textContent:x(m(g).signature)},null,8,Vt),e("div",Ot,[e("div",Pt,[At,e("span",{textContent:x(m(y).length())},null,8,St)]),Nt,e("div",Ct,[Bt,e("span",null,x(m(u).data.length),1)])])]),T(kt,{class:"directory"})]))}},qt=P(jt,[["__scopeId","data-v-60661423"]]);const Mt=n=>(A("data-v-dbaedd52"),n=n(),S(),n),zt={id:"topic_bottom_main"},Ft={class:"note_context_switch_box f f_d_r"},Ht={class:"note_switch_item f f_d_c j_c_c"},Ut={key:0},Gt={key:1},Jt={key:2},Kt={class:"note_switch_item f f_d_c j_c_c"},Qt={key:0},Yt={key:1},Wt={key:2},Xt=Mt(()=>e("div",{id:"gitalk-container"},null,-1)),Zt={__name:"NoteBottomInterface",setup(n){const{params:c}=W(),g=Q();C();const y=M(),u=R({});N(()=>{u.value=y.get_note_by_id(c.id)}),q(()=>{});const h=R(),_=R(),f=()=>{const b=c.index-1;b==0?h.value="--":h.value=u.value.directory_list[b-1].name,b==u.value.directory_list.length-1?_.value="--":_.value=u.value.directory_list[b+1].name};return D(()=>{f(),new _t({clientID:"429076372c73a03552c6",clientSecret:"e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",repo:"TinyFlowersComment",owner:"sparkle520",admin:["sparkle520"],id:u.value.link,language:"zh-CN",distractionFreeMode:!1,proxy:"https://strong-caramel-969805.netlify.app/github_access_token"}).render("gitalk-container")}),(b,l)=>(r(),d("div",zt,[e("div",Ft,[e("div",Ht,[h.value=="--"?(r(),d("div",Ut)):(r(),d("div",Gt,"上一章")),h.value=="--"?(r(),d("div",Jt)):(r(),d("div",{key:3,onClick:l[0]||(l[0]=E=>m(g).push(`/note/book/${m(c).id}/${parseInt(m(c).index)-1}`))},x(h.value),1))]),e("div",Kt,[_.value=="--"?(r(),d("div",Qt)):(r(),d("div",Yt,"下一章")),_.value=="--"?(r(),d("div",Wt)):(r(),d("div",{key:3,onClick:l[1]||(l[1]=E=>m(g).push(`/note/book/${m(c).id}/${parseInt(m(c).index)+1}`))},x(_.value),1))])]),Xt]))}},te=P(Zt,[["__scopeId","data-v-dbaedd52"]]),ee={id:"topic_main"},se={class:"topic_container"},oe={class:"topic_content"},ne=e("div",{class:"topic_text"},[e("div",{id:"n_t",class:"markdown-body"})],-1),re={__name:"NoteInterface",setup(n){const{params:c}=W(),g=new B.Renderer;M(),B.setOptions({renderer:g,gfm:!1,pedantic:!1,sanitize:!0}),q(()=>{});const y=()=>{b(c.id,c.index)},u=C(),{theme:h}=j(u),{layout:_}=j(u);u.$subscribe((l,E)=>{J(E.theme),K(E.layout)}),N(()=>{});const f=(l,E,o)=>{l.innerHTML=B(E,!0),o(l)};D(()=>{J(h.value),K(_.value),y()});const b=(l,E)=>{const o=`/src/assets/note_data/${l}/${E}.md`,i=Object.assign({"/src/assets/note_data/1/1.md":()=>s(()=>import("./1-d32c4d54.js"),[]).then(t=>t.default),"/src/assets/note_data/1/2.md":()=>s(()=>import("./2-34dbbf5b.js"),[]).then(t=>t.default),"/src/assets/note_data/1/3.md":()=>s(()=>import("./3-57d09307.js"),[]).then(t=>t.default),"/src/assets/note_data/1/4.md":()=>s(()=>import("./4-b50e1e00.js"),[]).then(t=>t.default),"/src/assets/note_data/1/5.md":()=>s(()=>import("./5-ca2841c1.js"),[]).then(t=>t.default),"/src/assets/note_data/1/6.md":()=>s(()=>import("./6-d61a61b2.js"),[]).then(t=>t.default),"/src/assets/note_data/1/7.md":()=>s(()=>import("./7-ab8fbab2.js"),[]).then(t=>t.default),"/src/assets/note_data/2/1.md":()=>s(()=>import("./1-e463f04f.js"),[]).then(t=>t.default),"/src/assets/note_data/2/10.md":()=>s(()=>import("./10-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/2/11.md":()=>s(()=>import("./11-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/2/12.md":()=>s(()=>import("./12-fa8373a2.js"),[]).then(t=>t.default),"/src/assets/note_data/2/2.md":()=>s(()=>import("./2-2d95b198.js"),[]).then(t=>t.default),"/src/assets/note_data/2/3.md":()=>s(()=>import("./3-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/2/4.md":()=>s(()=>import("./4-d85cd600.js"),[]).then(t=>t.default),"/src/assets/note_data/2/5.md":()=>s(()=>import("./5-d85cd600.js"),[]).then(t=>t.default),"/src/assets/note_data/2/6.md":()=>s(()=>import("./6-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/2/7.md":()=>s(()=>import("./7-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/2/8.md":()=>s(()=>import("./8-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/2/9.md":()=>s(()=>import("./9-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/3/1.md":()=>s(()=>import("./1-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/3/2.md":()=>s(()=>import("./2-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/3/3.md":()=>s(()=>import("./3-d85cd600.js"),[]).then(t=>t.default),"/src/assets/note_data/3/4.md":()=>s(()=>import("./4-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/3/5.md":()=>s(()=>import("./5-e9220a04.js"),[]).then(t=>t.default),"/src/assets/note_data/3/6.md":()=>s(()=>import("./6-d85cd600.js"),[]).then(t=>t.default)});for(const t in i)t==o&&i[t]().then(a=>{const $=document.querySelector("#n_t");f($,a,L=>{at(()=>{it(L).catch(p=>{})}),L.querySelectorAll("pre code").forEach(p=>{ct.highlightElement(p)})})})};return(l,E)=>{const o=O("TopicLeftInterface"),i=O("Utils");return r(),d(Y,null,[e("div",ee,[T(ft,{class:"topic_bg"}),T(ht,{class:"topic_top_interface"}),e("div",se,[T(o),e("div",oe,[ne,T(te)]),T(qt)])]),T(i)],64)}}};export{re as default};
