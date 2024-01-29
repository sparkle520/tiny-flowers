import{_ as I,u as b,l as w,s as r,a as B,o as R,c as S,A as k,v as c,d as j,e as A,g as n,w as i,F as M,p as C,f as F}from"./index-98fd00e4.js";import{c as p,a as d}from"./topic-d56c4ae9.js";const u=_=>(C("data-v-9919fb34"),_=_(),F(),_),L={id:"topic_main",class:"flex flex_direction_column"},N={class:"topic_container flex flex_direction_row"},U={class:"topic_content flex flex_direction_column"},V={class:"topic_text flex flex_direction_column"},q=u(()=>n("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),E=u(()=>n("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),G={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},$=`
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
    `,z={__name:"Topic_2",setup(_){const l=b(),m=w(),{theme:f}=r(l),{layout:h}=r(l);l.$subscribe((e,t)=>{p(t.theme),d(t.layout)}),B(),R(()=>{});const g=()=>({dom_data:Array.from(document.querySelectorAll(".topic_text *")),topic_data:v(m.study,1)}),v=(e,t)=>{if(console.log(t),e.length==0)return-1;let s=0,a=e.length;for(;s<a;){let o=s+Math.floor((a-s)/2);if(e[o].id==t)return e[o];e[o].id>t?s=o+1:a=o}return-1};return S(()=>{p(f.value),d(h.value),k.emit("topic_data",g())}),(e,t)=>{const s=c("TopicTopInterface"),a=c("TopicLeftInterface"),o=c("highlightjs"),T=c("TopicBottomInterface"),x=c("TopicRightInterface"),y=c("Utils");return j(),A(M,null,[n("div",L,[i(s),n("div",N,[i(a),n("div",U,[n("div",V,[q,E,n("div",G,[i(o,{style:{width:"100%"},language:"Rust",autodetect:!1,code:$})])]),i(T)]),i(x)])]),i(y)],64)}}},J=I(z,[["__scopeId","data-v-9919fb34"]]);export{J as default};
