import{_,u as a,o as l,a as u,b as d,c as i,p as r,d as p,e as c}from"./index-406eb884.js";const n=e=>(r("data-v-280b390b"),e=e(),p(),e),m={id:"main"},f=n(()=>c("input",{type:"file",id:"file",multiple:"",accept:".mp4"},null,-1)),b=n(()=>c("audio",{id:"music",controls:"",autoplay:"",loop:""},null,-1)),h=[f,b],y={__name:"Test",setup(e){return a(),l(()=>{}),u(()=>{let o=document.querySelector("#file");o.addEventListener("change",()=>{const t=o.files;let s=URL.createObjectURL(t[0]);console.log(s),document.querySelector("#music").src=s,console.log(document.querySelector("#music").src)})}),(o,t)=>(d(),i("div",m,h))}},S=_(y,[["__scopeId","data-v-280b390b"]]);export{S as default};