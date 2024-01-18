import{_ as g,u as f,o as w,a as y,j as _,w as v,k as x,m as a,b as T,c as B,e as o,q as i,F as b,p as k,d as I}from"./index-e81075c8.js";import{c as l,T as j}from"./TopicTitle-bf3fdc3c.js";const d=s=>(k("data-v-5400d507"),s=s(),I(),s),R={id:"topic_main",class:"flex flex_direction_row"},S={class:"topic_content"},L={class:"topic_text flex flex_direction_column"},U=d(()=>o("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),V=d(()=>o("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),q={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},D=`
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
    `,F={__name:"Topic_2",props:{theme:Boolean,layout:Boolean},setup(s){f(),w(()=>{}),y(()=>{l(t.theme),c(t.layout),_.on("new_side_view",e=>r(e))});const t=s;v(t,(e,n)=>{l(e.theme)}),x(()=>{_.off("new_side_view")});const r=e=>{c(e.current_side_view)},c=e=>{const n=document.querySelector(".topic_content");e?(n.style.width="60vw",n.style.margin=" 20px 30px 80px calc(10vw - 10px)"):n.style.width="80vw"},p={title:"Rust写的第一个算法",date:"2024-01-14?11:06"};return(e,n)=>{const u=a("highlightjs"),m=a("DirectoryList"),h=a("Utils");return T(),B(b,null,[o("div",R,[o("div",S,[i(j,{data:p}),o("div",L,[U,V,o("div",q,[i(u,{style:{width:"100%"},language:"Rust",autodetect:!1,code:D})])])]),i(m,{theme:t.theme,layout:t.layout,class:"directoryList"},null,8,["theme","layout"])]),i(h,{theme:t.theme},null,8,["theme"])],64)}}},C=g(F,[["__scopeId","data-v-5400d507"]]);export{C as default};
