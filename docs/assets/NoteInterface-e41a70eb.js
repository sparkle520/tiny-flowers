import{_ as j,c as H,o as S,d as G,b as C,e as _,f as u,p as M,j as P,g as e,n as R,P as ce,h as v,Q as le,u as q,s as V,N as z,m as T,w as Z,z as U,A as J,v as w,F as ee,r as _e,R as re,S as de,t as N,a as te,I as oe,H as a,l as ne,G as ue,L as K,M as W,y as pe,C as X,D as fe,B as O}from"./index-bd42a444.js";/* empty css                                                                   */import{u as me}from"./note-13c6922f.js";import{m as F}from"./marked.esm-98d564e7.js";const he=s=>(M("data-v-af009678"),s=s(),P(),s),ve={id:"note_top_main",class:"relative flex align_items_center justify_content_center"},ge=he(()=>e("img",{class:"note_top_main_bg",src:"https://pic.imgdb.cn/item/65d5a2f19f345e8d0320a3c9.jpg",alt:""},null,-1)),ye=[ge],be={__name:"NoteTopInterface",setup(s){return H(),S(()=>{}),G(()=>{}),C(()=>{}),(i,g)=>(_(),u("div",ve,ye))}},xe=j(be,[["__scopeId","data-v-af009678"]]),$e={__name:"NoteBgInterface",setup(s){return H(),S(()=>{}),C(()=>{}),(i,g)=>{const x=R("Particles");return _(),ce(x,{id:"tsparticles",options:v(le)},null,8,["options"])}}};const we=s=>(M("data-v-8f5bb5d6"),s=s(),P(),s),ke={id:"directory_list_main"},Ie={class:"catalog-card"},Te={class:"catalog-card-header"},Ne=we(()=>e("div",{class:"flex flex_direction_row align_items_center"},[e("svg",{t:"1705577425453",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"7633",width:"20",height:"20"},[e("path",{d:"M128 96h768a32 32 0 0 1 0 64H128a32 32 0 1 1 0-64z m0 192h768a32 32 0 0 1 0 64H128a32 32 0 1 1 0-64z m0 384h288a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64z m0 192h288a32 32 0 0 1 0 64H128a32 32 0 0 1 0-64z",fill:"#ACB4C0","p-id":"7634"}),e("path",{d:"M704 480h-80a178.24 178.24 0 0 0-16 0.704V544H128a32 32 0 0 1 0-64h576z m-40 64H608z",fill:"#5D6D7E","p-id":"7635"})]),e("span",null,"目录")],-1)),Se={class:"catalog-content"},Ce=["onClick","title"],Be={__name:"Directory",setup(s){const i=q(),{theme:g}=V(i),{layout:x}=V(i);i.$subscribe((o,t)=>{l(t.theme)}),S(()=>{}),G(()=>{z.off("note_data"),document.removeEventListener("scroll",f)});const f=()=>{if(n.value==null||n.value==null)return;let o=[];for(let t=n.value.length-1;t>=0;t--){const m=n.value[t];if(m.scrollTop<=window.scrollY){if(p.value.id===m.id)return;Object.assign(p.value,m),y(m,!0),o.push(m);let c=m.parent;for(;c;)y(c,!0),o.push(c),c=c.parent;for(const E of n.value)o.includes(E)||y(E,!1);return}}};C(()=>{l(g.value),z.on("note_data",()=>r()),document.addEventListener("scroll",f)});const r=()=>{n.value=k()},n=T([]);Z(n,o=>{o.length>0?document.querySelector("#directory_list_main").style.display="block":document.querySelector("#directory_list_main").style.display="none"});let p=T({});function k(){let o=[],t=["h1","h2","h3"];if(!document.querySelector(".markdown-body"))return o;let c=Array.from(document.querySelectorAll(".markdown-body *")),E=new Set(c.map(b=>b.tagName.toLowerCase()));for(let b=t.length-1;b>=0;b--)E.has(t[b])||t.splice(b,1);let A=t.map(()=>0),se=document.querySelector("#note_top_main").clientHeight,ie=document.querySelector("#top_nav_main").clientHeight-20;for(let b=0;b<c.length;b++){const L=c[b];let Y=L.tagName.toLowerCase(),D=t.indexOf(Y);if(D==-1)continue;let h={id:Y+"-"+L.innerText+"-"+b,level:D,parent:null,children:[],rawName:L.innerText,scrollTop:L.offsetTop+se-ie};if(o.length>0){let $=o.at(-1);if($.level<h.level)h.parent=$,$.children.push(h);else if($.level>h.level){A.fill(0,D+1);let I=$.parent;for(;I;){if(I.level<h.level){I.children.push(h),h.parent=I;break}I=I.parent}}else $.parent&&(h.parent=$.parent,$.parent.children.push(h))}A[D]+=1;let ae=A.slice(0,D+1).join(".");h.isVisible=h.parent==null,h.name=ae+". "+L.innerText,o.push(h)}return o}const d=(o,t)=>{document.getElementsByTagName("body")[0].style.setProperty(o,t)},l=o=>{o?d("--directory_list_bg","#2428376c"):d("--directory_list_bg","#ffffff6c")};function y(o,t){for(const m of o.children)m.isVisible=t}function B(o){window.scrollTo({top:o,behavior:"smooth"})}return(o,t)=>{const m=R("font-awesome-icon");return _(),u("div",ke,[U(e("div",Ie,[e("div",Te,[e("div",null,[e("span",null,[w(m,{icon:["fas","bars-staggered"],class:"catalog-icon"})]),Ne])]),e("div",Se,[(_(!0),u(ee,null,_e(n.value,c=>U((_(),u("div",{key:c.id,onClick:E=>B(c.scrollTop),class:re(["catalog-item",v(p).id==c.id?"active":"not-active"]),style:de({marginLeft:c.level*20+"px"}),title:c.rawName},N(c.name),15,Ce)),[[J,c.isVisible]])),128))])],512),[[J,v(x)]])])}}},Ee=j(Be,[["__scopeId","data-v-8f5bb5d6"]]);const Q=s=>(M("data-v-ad29875a"),s=s(),P(),s),Le={id:"topic_right_main"},De={class:"personal_item intro flex flex_direction_column align_items_center"},ze=["src"],He=["textContent"],Re=["textContent"],Ve={class:"topic_class_box flex flex_direction_row"},je={class:"topic_classification_total_box flex flex_direction_column align_items_center"},Me=Q(()=>e("h3",null,"文章",-1)),Pe=["textContent"],qe=Q(()=>e("div",{class:"topic_classification_total_box flex flex_direction_column align_items_center"},[e("h3",null,"分类"),e("span",null,"3")],-1)),Ae=Q(()=>e("div",{class:"topic_classification_total_box flex flex_direction_column align_items_center"},[e("h3",null,"笔记"),e("span",null,"1")],-1)),Oe={__name:"NoteRightInterface",setup(s){const i=q(),g=te(),x=oe();H(),S(()=>{}),C(()=>{r(i.theme),f(i.layout)}),i.$subscribe((n,p)=>{r(p.theme),f(p.layout)});const f=n=>{const p=document.querySelector("#topic_right_main");n?p.style.display="block":p.style.display="none"},r=n=>{n?(a("--bg_color","#0b0e14"),a("--color","#f7f7f7"),a("--item_bg","#242b3d6c"),a("--item_shadow","#242b34"),a("--topic_classification_color","#5e6d78"),a("--topic_classification_num_color","#b5b9d6")):(a("--bg_color","#f7f3f5"),a("--color","#000000"),a("--item_bg","#ffffff6c"),a("--item_shadow","#cacaca4f"),a("--topic_classification_color","#173e6c"),a("--topic_classification_num_color","#e06530"))};return(n,p)=>(_(),u("div",Le,[e("div",De,[e("img",{src:v(g).avatar,alt:""},null,8,ze),e("span",{class:"personal_name",textContent:N(v(g).name)},null,8,He),e("span",{class:"personal_signature",textContent:N(v(g).signature)},null,8,Re),e("div",Ve,[e("div",je,[Me,e("span",{textContent:N(v(x).length())},null,8,Pe)]),qe,Ae])]),w(Ee)]))}},Fe=j(Oe,[["__scopeId","data-v-ad29875a"]]);const Ue=s=>(M("data-v-9d40e759"),s=s(),P(),s),Ge={id:"topic_bottom_main"},Qe={class:"note_context_switch_box flex flex_direction_row"},Ye={class:"note_switch_item flex flex_direction_column justify_content_center"},Je={key:0},Ke={key:1},We={key:2},Xe={class:"note_switch_item flex flex_direction_column justify_content_center"},Ze={key:0},et={key:1},tt={key:2},ot=Ue(()=>e("div",{id:"gitalk-container"},null,-1)),nt={__name:"NoteBottomInterface",setup(s){const{params:i}=ne(),g=H(),x=q();te(),oe(),S(()=>{}),G(()=>{z.off("note_data")}),x.$subscribe((d,l)=>{k(l.theme)});const f=T(),r=T(),n=T(),p=()=>{const d=i.index-1;d==0?r.value="--":r.value=f.value.directory_list[d-1].name,d==f.value.directory_list.length-1?n.value="--":n.value=f.value.directory_list[d+1].name};C(()=>{k(x.theme),z.on("note_data",d=>{f.value=d,p(),new ue({clientID:"429076372c73a03552c6",clientSecret:"e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",repo:"TinyFlowersComment",owner:"sparkle520",admin:["sparkle520"],id:f.value.link,language:"zh-CN",distractionFreeMode:!1,proxy:"https://strong-caramel-969805.netlify.app/github_access_token"}).render("gitalk-container")})});const k=d=>{d?(a("--topic_author_info_box_color","#788086"),a("--topic_author_info_box_bg","#1e2433"),a("--topic_author_info_inner_box_color","#f5f5f5")):(a("--topic_author_info_box_color","#b0c4de"),a("--topic_author_info_box_bg","#f8f8ff"),a("--topic_author_info_inner_box_color","#78c1f8"))};return(d,l)=>(_(),u("div",Ge,[e("div",Qe,[e("div",Ye,[r.value=="--"?(_(),u("div",Je)):(_(),u("div",Ke,"上一章")),r.value=="--"?(_(),u("div",We)):(_(),u("div",{key:3,onClick:l[0]||(l[0]=y=>v(g).push(`/note/book/${v(i).id}/${parseInt(v(i).index)-1}`))},N(r.value),1))]),e("div",Xe,[n.value=="--"?(_(),u("div",Ze)):(_(),u("div",et,"下一章")),n.value=="--"?(_(),u("div",tt)):(_(),u("div",{key:3,onClick:l[1]||(l[1]=y=>v(g).push(`/note/book/${v(i).id}/${parseInt(v(i).index)+1}`))},N(n.value),1))])]),ot]))}},st=j(nt,[["__scopeId","data-v-9d40e759"]]),it={id:"topic_main"},at={class:"topic_container"},ct={class:"topic_content"},lt={class:"topic_text"},_t=["innerHTML"],mt={__name:"NoteInterface",setup(s){const{params:i}=ne(),g=new F.Renderer,x=me();F.setOptions({renderer:g,gfm:!1,pedantic:!1,sanitize:!0});const f=()=>{d(i.id,i.index)},r=T("");Z(r,l=>{r.value=F(l),X(()=>{fe(document.getElementById("mathjax"))}),X(()=>{z.emit("note_data",x.get_note_by_id(i.id))})});const n=q(),{theme:p}=V(n),{layout:k}=V(n);n.$subscribe((l,y)=>{K(y.theme),W(y.layout)}),H(),S(()=>{}),C(()=>{K(p.value),W(k.value),f()});const d=(l,y)=>{const B=`/src/assets/note_data/${l}/${y}.md`,o=Object.assign({"/src/assets/note_data/1/1.md":()=>O(()=>import("./1-34a62ec0.js"),[]).then(t=>t.default),"/src/assets/note_data/1/2.md":()=>O(()=>import("./2-b21a345d.js"),[]).then(t=>t.default),"/src/assets/note_data/2/1.md":()=>O(()=>import("./1-43c4b189.js"),[]).then(t=>t.default)});for(const t in o)t==B&&o[t]().then(m=>{r.value=m})};return(l,y)=>{const B=R("TopicLeftInterface"),o=R("Utils"),t=pe("highlight");return _(),u(ee,null,[e("div",it,[w($e,{class:"topic_bg"}),w(xe,{class:"topic_top_interface"}),e("div",at,[w(B),e("div",ct,[e("div",lt,[U(e("div",{innerHTML:r.value,id:"mathjax",class:"markdown-body"},null,8,_t),[[t]])]),w(st)]),w(Fe)])]),w(o)],64)}}};export{mt as default};