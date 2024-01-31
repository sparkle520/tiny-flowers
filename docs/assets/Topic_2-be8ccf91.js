import{_ as y,u as w,l as b,s as r,a as B,o as R,c as S,D as k,v as c,d as j,e as M,g as n,B as i,F as C,p as F,f as L}from"./index-ca6a39ec.js";import{c as p,a as d}from"./topic-0d14c3f1.js";const u=_=>(F("data-v-513e4353"),_=_(),L(),_),N={id:"topic_main",class:"flex flex_direction_column"},U={class:"topic_container flex flex_direction_row"},V={class:"topic_content flex flex_direction_column"},D={class:"topic_text flex flex_direction_column"},E=u(()=>n("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),G=u(()=>n("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),$={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},q=`
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
    `,z={__name:"Topic_2",setup(_){const l=w(),m=b(),{theme:f}=r(l),{layout:h}=r(l);l.$subscribe((e,t)=>{p(t.theme),d(t.layout)}),B(),R(()=>{});const g=()=>({topic_data:v(m.study,1)}),v=(e,t)=>{if(console.log(t),e.length==0)return-1;let s=0,a=e.length;for(;s<a;){let o=s+Math.floor((a-s)/2);if(e[o].id==t)return e[o];e[o].id>t?s=o+1:a=o}return-1};return S(()=>{p(f.value),d(h.value),k.emit("topic_data",g())}),(e,t)=>{const s=c("TopicTopInterface"),a=c("TopicLeftInterface"),o=c("highlightjs"),T=c("TopicBottomInterface"),x=c("TopicRightInterface"),I=c("Utils");return j(),M(C,null,[n("div",N,[i(s),n("div",U,[i(a),n("div",V,[n("div",D,[E,G,n("div",$,[i(o,{style:{width:"100%"},language:"Rust",autodetect:!1,code:q})])]),i(T)]),i(x)])]),i(I)],64)}}},J=y(z,[["__scopeId","data-v-513e4353"]]);export{J as default};
