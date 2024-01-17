import{_ as r,u as m,o as h,a as u,w as g,m as a,b as f,c as v,e,q as o,F as b,p as x,d as w}from"./index-f689d197.js";import{c as i,T as y}from"./TopicTitle-0db22626.js";const c=t=>(x("data-v-e1ec6bb7"),t=t(),w(),t),T={id:"topic_main",class:"flex flex_direction_column"},B={class:"topic_content"},I={class:"topic_text flex flex_direction_column"},k=c(()=>e("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),R=c(()=>e("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),j={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},S=`
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
    `,V={__name:"Topic_2",props:{theme:Boolean},setup(t){m(),h(()=>{}),u(()=>{i(s.theme)});const s=t;g(s,(n,l)=>{i(n.theme)});const _={title:"Rust写的第一个算法",date:"2024-01-14?11:06"};return(n,l)=>{const d=a("highlightjs"),p=a("Utils");return f(),v(b,null,[e("div",T,[e("div",B,[o(y,{data:_}),e("div",I,[k,R,e("div",j,[o(d,{style:{width:"100%"},language:"Rust",autodetect:!1,code:S})])])])]),o(p,{theme:s.theme},null,8,["theme"])],64)}}},N=r(V,[["__scopeId","data-v-e1ec6bb7"]]);export{N as default};
