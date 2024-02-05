import{_ as B,u as b,l as w,s as p,E as r,G as d,a as R,o as k,c as S,q as j,v as n,d as M,e as C,g as c,B as s,F as E,H as F,p as G,f as L}from"./index-1ba7c20a.js";/* empty css                                                                   */const u=_=>(G("data-v-37ff2a51"),_=_(),L(),_),N={id:"topic_main",class:"flex flex_direction_column"},U={class:"topic_container flex flex_direction_row"},V={class:"topic_content flex flex_direction_column"},q={class:"topic_text flex flex_direction_column"},H=u(()=>c("span",{class:"normal"}," Given n, take the sum of the digits of n. If that value has more than one digit, continue reducing in this way until a single-digit number is produced. The input will be a non-negative integer. ",-1)),$=u(()=>c("span",{class:"normal"},"翻译: 给定n，取n的位数之和。如果该值有多个位数，则继续以这种方式递减，直到产生一个位数。输入将是一个非负整数。",-1)),z={class:"hljs_container",style:{width:"100%",margin:"20px 0"},codetype:"Rust"},A=`
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
    `,D={__name:"Topic_2",setup(_){const l=b(),f=w(),{theme:m}=p(l),{layout:h}=p(l);l.$subscribe((e,t)=>{r(t.theme),d(t.layout)}),R(),k(()=>{});const g=()=>({topic_data:T(f.study,1)}),T=(e,t)=>{if(console.log(t),e.length==0)return-1;let i=0,a=e.length;for(;i<a;){let o=i+Math.floor((a-i)/2);if(e[o].id==t)return e[o];e[o].id>t?i=o+1:a=o}return-1};return S(()=>{r(m.value),d(h.value),j(()=>{F.emit("topic_data",g())})}),(e,t)=>{const i=n("TopicBgInterface"),a=n("TopicTopInterface"),o=n("TopicLeftInterface"),v=n("highlightjs"),x=n("TopicBottomInterface"),I=n("TopicRightInterface"),y=n("Utils");return M(),C(E,null,[c("div",N,[s(i,{class:"topic_bg"}),s(a),c("div",U,[s(o),c("div",V,[c("div",q,[H,$,c("div",z,[s(v,{style:{width:"100%"},language:"Rust",autodetect:!1,code:A})])]),s(x)]),s(I)])]),s(y)],64)}}},O=B(D,[["__scopeId","data-v-37ff2a51"]]);export{O as default};
