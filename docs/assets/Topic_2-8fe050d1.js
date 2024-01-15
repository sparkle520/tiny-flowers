import{_,u as d,o as l,r as g,a as r,b as p,c as u,m as w,p as h,e as m,d as e,t as n,f as v,k as x,l as c,F as T}from"./index-f77209d5.js";const y=t=>(h("data-v-d6dc842a"),t=t(),m(),t),S=y(()=>e("div",{class:"top"},[e("svg",{t:"1704637028569",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"11841",width:"32",height:"32"},[e("path",{d:"M806.771214 961.506103l-62.493897 62.493897-232.177327-232.177326-232.177326 232.177326-62.493897-62.493897 294.671223-294.671224 294.671224 294.671224z",fill:"#8FB3FF","p-id":"11842"}),e("path",{d:"M806.771214 294.771214l-62.493897 62.493897-232.177327-232.177327-232.177326 232.177327-62.493897-62.493897L512.09999 0.09999l294.671224 294.671224z",fill:"#043EB8","p-id":"11843"}),e("path",{d:"M806.771214 628.138658l-62.493897 62.493897-232.177327-232.177326-232.177326 232.177326-62.493897-62.493897 294.671223-294.671223 294.671224 294.671223z",fill:"#2868F0","p-id":"11844"})])],-1)),I=[S],$={__name:"TopicTop",setup(t){d(),l(()=>{});const s=g(!1);r(()=>{window.scrollTo(0,0),document.addEventListener("scroll",()=>{window.scrollY>700?s.value=!0:s.value=!1})});const a=()=>{let i=setInterval(()=>{let o=window.scrollY-50;window.scrollTo(0,o),o<=0&&clearInterval(i)},2)};return(i,o)=>s.value?(p(),u("div",{key:0,onClick:a,class:"to_top_btn flex flex_direction_column align_items_center justify_content_center"},I)):w("",!0)}},b=_($,[["__scopeId","data-v-d6dc842a"]]);const B=t=>(h("data-v-60d3ca5d"),t=t(),m(),t),k={class:"title_box"},M={class:"title relative"},F={class:"time_bar flex flex_direction_row"},j={class:"time flex justify_content_center align_items_center"},z=B(()=>e("svg",{t:"1704628451767",class:"icon",viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"4237",width:"18",height:"18"},[e("path",{d:"M512 938.666667c235.637333 0 426.666667-191.029333 426.666667-426.666667S747.637333 85.333333 512 85.333333 85.333333 276.362667 85.333333 512s191.029333 426.666667 426.666667 426.666667zM329.376 649.376L480 498.741333V320a32 32 0 0 1 64 0v192a32 32 0 0 1-9.376 22.624l-160 160a32 32 0 1 1-45.248-45.248z",fill:"#df4c58","p-id":"4238"})],-1)),V={__name:"TopicTitle",props:{data:{title:String,date:String}},setup(t){return d(),l(()=>{}),r(()=>{}),(s,a)=>(p(),u("div",k,[e("span",M,n(t.data.title),1),e("div",F,[v(n(t.data.date.split("?")[0])+" ",1),e("div",j,[z,v(" "+n(t.data.date.split("?")[1]),1)])])]))}},Y=_(V,[["__scopeId","data-v-60d3ca5d"]]);const f=t=>(h("data-v-a605cd12"),t=t(),m(),t),N={id:"main",class:"flex flex_direction_column"},R={class:"content"},C={class:"text flex flex_direction_column"},E=f(()=>e("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),L=f(()=>e("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),D={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},G=`
    fn digital_root(n: i64) -> i64 {
    if n < 10 {
        n
    } else {
        let mut res: i64 = n;
        loop {
            let mut temp = 0;
            for (_, &single_num) in res.to_string().as_bytes().iter().enumerate() {
                temp += (single_num as char).to_digit(10).unwrap() as i64;
            }
            res = temp;
            if temp < 10 {
                break;
            }
        }
        res
    }
}
    `,q={__name:"Topic_2",setup(t){d(),l(()=>{}),r(()=>{});const s={title:"Rust写的第一个算法",date:"2024-01-14?11:06"};return(a,i)=>{const o=x("highlightjs");return p(),u(T,null,[e("div",N,[e("div",R,[c(Y,{data:s}),e("div",C,[E,L,e("div",D,[c(o,{style:{width:"100%"},language:"Rust",autodetect:!1,code:G})])])])]),c(b)],64)}}},H=_(q,[["__scopeId","data-v-a605cd12"]]);export{H as default};
