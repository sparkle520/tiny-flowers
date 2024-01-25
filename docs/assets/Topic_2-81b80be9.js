import{_ as g,u as f,s as a,a as v,o as b,c as x,b as y,m as i,d as T,e as w,g as e,q as n,F as I,p as R,f as k}from"./index-9c850928.js";import{c,a as _,T as B}from"./TopicTitle-2ebc863a.js";const l=t=>(R("data-v-866ba845"),t=t(),k(),t),S={id:"topic_main",class:"flex flex_direction_row"},j={class:"topic_content"},U={class:"topic_text flex flex_direction_column"},C=l(()=>e("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),F=l(()=>e("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),M={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},N=`
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
    `,V={__name:"Topic_2",setup(t){const s=f(),{theme:r}=a(s),{layout:d}=a(s);s.$subscribe((p,o)=>{c(o.theme),_(o.layout)}),v(),b(()=>{}),x(()=>{c(r.value),_(d.value)}),y(()=>{});const u={title:"Rust写的第一个算法",date:"2024-01-14?11:06"};return(p,o)=>{const m=i("highlightjs"),h=i("Utils");return T(),w(I,null,[e("div",S,[e("div",j,[n(B,{data:u}),e("div",U,[C,F,e("div",M,[n(m,{style:{width:"100%"},language:"Rust",autodetect:!1,code:N})])])])]),n(h)],64)}}},G=g(V,[["__scopeId","data-v-866ba845"]]);export{G as default};
