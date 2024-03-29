import{_ as j,c as S,o as D,d as G,b as R,e as r,f as m,p as q,j as M,g as t,n as C,O as ie,u as z,s as B,N,m as k,B as Z,w as U,v as K,h as g,x as $,F as ee,r as ce,q as le,P as re,t as w,a as te,M as oe,L as se,z as i,A as ne,J as de,D as ue,C as Q,H as me,I as s}from"./index-17aab836.js";import{c as W,a as X}from"./topic-09577f95.js";import{m as H}from"./marked.esm-98d564e7.js";const fe=n=>(q("data-v-4f1e9573"),n=n(),M(),n),pe={id:"note_top_main",class:"relative flex align_items_center justify_content_center"},he=fe(()=>t("img",{class:"note_top_main_bg",src:"https://pic.imgdb.cn/item/65d5a2f19f345e8d0320a3c9.jpg",alt:""},null,-1)),ve=[he],ge={__name:"NoteTopInterface",setup(n){return S(),D(()=>{}),G(()=>{}),R(()=>{}),(a,b)=>(r(),m("div",pe,ve))}},be=j(ge,[["__scopeId","data-v-4f1e9573"]]),ye={__name:"NoteBgInterface",setup(n){return S(),D(()=>{}),R(()=>{}),(a,b)=>{const I=C("Particles");return r(),ie(I,{id:"tsparticles",options:a.options},null,8,["options"])}}};const xe=n=>(q("data-v-3bef51eb"),n=n(),M(),n),Ee={id:"directory_list_main"},Ie={class:"catalog-card"},Te={class:"catalog-card-header"},$e=xe(()=>t("div",{class:"flex flex_direction_row align_items_center"},[t("span",null,"目录")],-1)),we={class:"catalog-content"},Le=["onClick","title"],ke={__name:"Directory",setup(n){const a=z(),{theme:b}=B(a),{layout:I}=B(a);a.$subscribe((o,e)=>{l(e.theme)}),D(()=>{}),G(()=>{N.off("note_data"),document.removeEventListener("scroll",y)});const y=()=>{if(_.value==null||_.value==null)return;let o=[];for(let e=_.value.length-1;e>=0;e--){const h=_.value[e];if(h.scrollTop<=window.scrollY){if(f.value.id===h.id)return;Object.assign(f.value,h),x(h,!0),o.push(h);let c=h.parent;for(;c;)x(c,!0),o.push(c),c=c.parent;for(const O of _.value)o.includes(O)||x(O,!1);return}}};R(()=>{l(b.value),N.on("note_data",()=>d()),document.addEventListener("scroll",y)});const d=()=>{_.value=p()},_=k([]);Z(_,o=>{o.length>0?document.querySelector("#directory_list_main").style.display="block":document.querySelector("#directory_list_main").style.display="none"});let f=k({});function p(){let o=[],e=["h1","h2","h3"];if(!document.querySelector(".markdown-body"))return o;let c=Array.from(document.querySelectorAll(".markdown-body *")),O=new Set(c.map(E=>E.tagName.toLowerCase()));for(let E=e.length-1;E>=0;E--)O.has(e[E])||e.splice(E,1);let F=e.map(()=>0),_e=document.querySelector("#note_top_main").clientHeight-20;for(let E=0;E<c.length;E++){const P=c[E];let Y=P.tagName.toLowerCase(),A=e.indexOf(Y);if(A==-1)continue;let v={id:Y+"-"+P.innerText+"-"+E,level:A,parent:null,children:[],rawName:P.innerText,scrollTop:P.offsetTop+_e};if(o.length>0){let T=o.at(-1);if(T.level<v.level)v.parent=T,T.children.push(v);else if(T.level>v.level){F.fill(0,A+1);let L=T.parent;for(;L;){if(L.level<v.level){L.children.push(v),v.parent=L;break}L=L.parent}}else T.parent&&(v.parent=T.parent,T.parent.children.push(v))}F[A]+=1;let ae=F.slice(0,A+1).join(".");v.isVisible=v.parent==null,v.name=ae+". "+P.innerText,o.push(v)}return o}const u=(o,e)=>{document.getElementsByTagName("body")[0].style.setProperty(o,e)},l=o=>{o?u("--directory_list_bg","#242837"):u("--directory_list_bg","#ffff")};function x(o,e){for(const h of o.children)h.isVisible=e}function V(o){window.scrollTo({top:o,behavior:"smooth"})}return(o,e)=>{const h=C("font-awesome-icon");return r(),m("div",Ee,[U(t("div",Ie,[t("div",Te,[t("div",null,[t("span",null,[$(h,{icon:["fas","bars-staggered"],class:"catalog-icon"})]),$e])]),t("div",we,[(r(!0),m(ee,null,ce(_.value,c=>U((r(),m("div",{key:c.id,onClick:O=>V(c.scrollTop),class:le(["catalog-item",g(f).id==c.id?"active":"not-active"]),style:re({marginLeft:c.level*20+"px"}),title:c.rawName},w(c.name),15,Le)),[[K,c.isVisible]])),128))])],512),[[K,g(I)]])])}}},De=j(ke,[["__scopeId","data-v-3bef51eb"]]);const J=n=>(q("data-v-7a2fd429"),n=n(),M(),n),Re={id:"topic_right_main"},Ve={class:"personal_item intro flex flex_direction_column align_items_center"},Oe=["src"],Pe=["textContent"],Ae=["textContent"],Ne={class:"topic_class_box flex flex_direction_row"},Se={class:"topic_classification_total_box flex flex_direction_column align_items_center"},Ce=J(()=>t("h3",null,"文章",-1)),Be=["textContent"],je=J(()=>t("div",{class:"topic_classification_total_box flex flex_direction_column align_items_center"},[t("h3",null,"分类"),t("span",null,"3")],-1)),qe={class:"topic_classification_total_box flex flex_direction_column align_items_center"},Me=J(()=>t("h3",null,"笔记",-1)),ze={__name:"NoteRightInterface",setup(n){const a=z(),b=te(),I=oe(),y=se();S(),D(()=>{}),R(()=>{_(a.theme),d(a.layout)}),a.$subscribe((f,p)=>{_(p.theme),d(p.layout)});const d=f=>{const p=document.querySelector("#topic_right_main");f?p.style.display="block":p.style.display="none"},_=f=>{f?(i("--bg_color","#0b0e14"),i("--color","#f7f7f7"),i("--item_bg","#242b3d"),i("--item_shadow","#242b34"),i("--topic_classification_color","#5e6d78"),i("--topic_classification_num_color","#b5b9d6")):(i("--bg_color","#f7f3f5"),i("--color","#4d4949"),i("--item_bg","#fff"),i("--item_shadow","#cacaca4f"),i("--topic_classification_color","#216eba"),i("--topic_classification_num_color","#4d4949"))};return(f,p)=>(r(),m("div",Re,[t("div",Ve,[t("img",{src:g(b).avatar,alt:""},null,8,Oe),t("span",{class:"personal_name",textContent:w(g(b).name)},null,8,Pe),t("span",{class:"personal_signature",textContent:w(g(b).signature)},null,8,Ae),t("div",Ne,[t("div",Se,[Ce,t("span",{textContent:w(g(I).length())},null,8,Be)]),je,t("div",qe,[Me,t("span",null,w(g(y).data.length),1)])])]),$(De)]))}},Fe=j(ze,[["__scopeId","data-v-7a2fd429"]]);const He=n=>(q("data-v-2d5e76a7"),n=n(),M(),n),Ue={id:"topic_bottom_main"},Ge={class:"note_context_switch_box flex flex_direction_row"},Je={class:"note_switch_item flex flex_direction_column justify_content_center"},Ye={key:0},Ke={key:1},Qe={key:2},We={class:"note_switch_item flex flex_direction_column justify_content_center"},Xe={key:0},Ze={key:1},et={key:2},tt=He(()=>t("div",{id:"gitalk-container"},null,-1)),ot={__name:"NoteBottomInterface",setup(n){const{params:a}=ne(),b=S(),I=z();te(),oe(),D(()=>{}),G(()=>{N.off("note_data")}),I.$subscribe((u,l)=>{p(l.theme)});const y=k(),d=k(),_=k(),f=()=>{const u=a.index-1;u==0?d.value="--":d.value=y.value.directory_list[u-1].name,u==y.value.directory_list.length-1?_.value="--":_.value=y.value.directory_list[u+1].name};R(()=>{p(I.theme),N.on("note_data",u=>{y.value=u,f(),new de({clientID:"429076372c73a03552c6",clientSecret:"e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",repo:"TinyFlowersComment",owner:"sparkle520",admin:["sparkle520"],id:y.value.link,language:"zh-CN",distractionFreeMode:!1,proxy:"https://strong-caramel-969805.netlify.app/github_access_token"}).render("gitalk-container")})});const p=u=>{u?(i("--topic_author_info_box_color","#788086"),i("--topic_author_info_box_bg","#1e2433"),i("--topic_author_info_inner_box_color","#f5f5f5")):(i("--topic_author_info_box_color","#b0c4de"),i("--topic_author_info_box_bg","#f8f8ff"),i("--topic_author_info_inner_box_color","#78c1f8"))};return(u,l)=>(r(),m("div",Ue,[t("div",Ge,[t("div",Je,[d.value=="--"?(r(),m("div",Ye)):(r(),m("div",Ke,"上一章")),d.value=="--"?(r(),m("div",Qe)):(r(),m("div",{key:3,onClick:l[0]||(l[0]=x=>g(b).push(`/note/book/${g(a).id}/${parseInt(g(a).index)-1}`))},w(d.value),1))]),t("div",We,[_.value=="--"?(r(),m("div",Xe)):(r(),m("div",Ze,"下一章")),_.value=="--"?(r(),m("div",et)):(r(),m("div",{key:3,onClick:l[1]||(l[1]=x=>g(b).push(`/note/book/${g(a).id}/${parseInt(g(a).index)+1}`))},w(_.value),1))])]),tt]))}},st=j(ot,[["__scopeId","data-v-2d5e76a7"]]),nt={id:"topic_main"},_t={class:"topic_container"},at={class:"topic_content"},it={class:"topic_text"},ct=["innerHTML"],mt={__name:"NoteInterface",setup(n){const{params:a}=ne(),b=new H.Renderer,I=se();H.setOptions({renderer:b,gfm:!1,pedantic:!1,sanitize:!0});const y=()=>{u(a.id,a.index)},d=k("");Z(d,l=>{d.value=H(l),Q(()=>{me(document.getElementById("mathjax"))}),Q(()=>{N.emit("note_data",I.get_note_by_id(a.id))})});const _=z(),{theme:f}=B(_),{layout:p}=B(_);_.$subscribe((l,x)=>{W(x.theme),X(x.layout)}),S(),D(()=>{}),R(()=>{W(f.value),X(p.value),y()});const u=(l,x)=>{const V=`/src/assets/note_data/${l}/${x}.md`,o=Object.assign({"/src/assets/note_data/1/1.md":()=>s(()=>import("./1-df6edbfa.js"),[]).then(e=>e.default),"/src/assets/note_data/1/2.md":()=>s(()=>import("./2-831e9083.js"),[]).then(e=>e.default),"/src/assets/note_data/1/4.md":()=>s(()=>import("./4-52af1da7.js"),[]).then(e=>e.default),"/src/assets/note_data/1/5.md":()=>s(()=>import("./5-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/1/6.md":()=>s(()=>import("./6-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/1/7.md":()=>s(()=>import("./7-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/1/8.md":()=>s(()=>import("./8-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/1/9.md":()=>s(()=>import("./9-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/2/1.md":()=>s(()=>import("./1-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/2/10.md":()=>s(()=>import("./10-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/2/11.md":()=>s(()=>import("./11-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/2/12.md":()=>s(()=>import("./12-54226420.js"),[]).then(e=>e.default),"/src/assets/note_data/2/2.md":()=>s(()=>import("./2-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/2/3.md":()=>s(()=>import("./3-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/2/4.md":()=>s(()=>import("./4-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/2/5.md":()=>s(()=>import("./5-52af1da7.js"),[]).then(e=>e.default),"/src/assets/note_data/2/6.md":()=>s(()=>import("./6-52af1da7.js"),[]).then(e=>e.default),"/src/assets/note_data/2/7.md":()=>s(()=>import("./7-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/2/8.md":()=>s(()=>import("./8-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/2/9.md":()=>s(()=>import("./9-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/3/1.md":()=>s(()=>import("./1-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/3/2.md":()=>s(()=>import("./2-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/3/3.md":()=>s(()=>import("./3-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/3/4.md":()=>s(()=>import("./4-e9220a04.js"),[]).then(e=>e.default),"/src/assets/note_data/3/5.md":()=>s(()=>import("./5-d85cd600.js"),[]).then(e=>e.default),"/src/assets/note_data/3/6.md":()=>s(()=>import("./6-d85cd600.js"),[]).then(e=>e.default)});for(const e in o)e==V&&o[e]().then(h=>{d.value=h})};return(l,x)=>{const V=C("TopicLeftInterface"),o=C("Utils"),e=ue("highlight");return r(),m(ee,null,[t("div",nt,[$(ye,{class:"topic_bg"}),$(be,{class:"topic_top_interface"}),t("div",_t,[$(V),t("div",at,[t("div",it,[U(t("div",{innerHTML:d.value,id:"mathjax",class:"markdown-body"},null,8,ct),[[e]])]),$(st)]),$(Fe)])]),$(o)],64)}}};export{mt as default};
