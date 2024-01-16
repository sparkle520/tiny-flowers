import{_ as d,u as r,o as p,a as u,w as m,k as h,b as f,c as g,e,l as s,F as v,p as x,d as w}from"./index-82df7fd0.js";import{c as a,T as y,_ as T}from"./TopicTitle-437d64dd.js";const i=t=>(x("data-v-477594f5"),t=t(),w(),t),b={id:"topic_main",class:"flex flex_direction_column"},k={class:"topic_content"},B={class:"topic_text flex flex_direction_column"},I=i(()=>e("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),R=i(()=>e("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),j={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},S=`
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
    `,V={__name:"Topic_2",props:{theme:Boolean},setup(t){r(),p(()=>{}),u(()=>{a(o.theme)});const o=t;m(o,(n,_)=>{a(n.theme)});const c={title:"Rust写的第一个算法",date:"2024-01-14?11:06"};return(n,_)=>{const l=h("highlightjs");return f(),g(v,null,[e("div",b,[e("div",k,[s(y,{data:c}),e("div",B,[I,R,e("div",j,[s(l,{style:{width:"100%"},language:"Rust",autodetect:!1,code:S})])])])]),s(T)],64)}}},N=d(V,[["__scopeId","data-v-477594f5"]]);export{N as default};
