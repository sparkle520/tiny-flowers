<!-- @Author: LT -->
<!-- @Date: 2024-01-17 19:35:50 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted ,watch} from "vue";
import { useRouter } from "vue-router";
import c_c from "@/assets/js/utils.js"
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const store = useConfigStore();
const {theme}  = storeToRefs(store);
const router = useRouter();
store.$subscribe((mutation,state)=>{
  change_theme(state.theme)
})
onBeforeMount(() => {});
onMounted(() => {
    change_theme(theme.value)
});


const change_theme = (current_theme) =>{
  if (current_theme) {
    c_c("--bg_color", "#1e2433");
    c_c("--color", "#f7f7f7");
    c_c("--site_content_color", "#8d8d93");
    c_c("--site_item_color", "#f19742");


  } else {
    c_c("--bg_color", "#f7f3f5");
    c_c("--color", "#000000");
    c_c("--site_content_color", "#c5b4e5");
    c_c("--site_item_color", "#4d1225");
    c_c("--site_item_hover_color", "#917979");
  }
}
const go_to = (url) =>{
    window.location.href = url
}
const site_data = [
    {
        collect_name:"Reference",
        site_list:[
            {name:"Rust",url:'https://doc.rust-lang.org/stable/reference/notation.html',img:''},
            {name:"Rust std",url:'https://doc.rust-lang.org/std/all.html',img:''},
            {name:"C++",url:'https://en.cppreference.com/w/',img:''},
        ]
    },
    {
        collect_name:"Study",
        site_list:[
            {name:"Rust 语言圣经",url:'https://course.rs/about-book.html',img:''},
            {name:"Learn C++",url:'https://www.learncpp.com/',img:''},
        ]
    },
    {
        collect_name:"Repository",
        site_list:[
            {name:"create.io",url:'https://crates.io/',img:''},
            {name:"maven",url:'https://mvnrepository.com/',img:''},
        ]
    },
    {
        collect_name:"Practice",
        site_list:[
            {name:"leet code",url:'https://leetcode.cn/leetbook/',img:''},
        ]
    },
]
</script>
<template>
  <div id="main" class="flex  ">
    <!-- <div id="sky" class="absolute absolute_center">
    <div class="bird">
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="wind"></div>
        <div class="bird_body">
            <div class="bird_head"></div>
            <div class="bird_wing_left">
                <div class="bird_wing_left_top"></div>
            </div>
            <div class="bird_wing_right">
                <div class="bird_wing_right_top"></div>
            </div>
            <div class="bird_tail_left"></div>
            <div class="bird_tail_right"></div>
        </div>
    </div>
</div> -->
<img src="https://pic.imgdb.cn/item/65b0127d871b83018a75ffc4.png" class="miku  fixed absolute_center" alt="">
<!-- <img src="https://pic.imgdb.cn/item/65afa1e5871b83018ae90cd9.png" class="flower  fixed absolute_center" alt=""> -->
<div class="site_content flex flex_direction_column">
    <div class="site_item" v-for="item in site_data">
        <h1>{{ item.collect_name }}</h1>
        <ul class="flex flex_direction_row">
            <li v-for="item2 in item.site_list"  @click="go_to(item2.url)">
                <span class="relative">
                    {{ item2.name }}

                </span>
            </li>
        </ul>
    </div>
</div>
  </div>
</template>
<style lang="scss" scoped>
$bg_color: var(--bg_color, #f7f3f5);
$color: var(--color, #000000);
$site_content_color: var(--site_content_color, #8d8d93);
$site_item_color: var(--site_item_color, #4d1225);
$site_item_hover_color: var(--site_item_hover_color, #917979);
#main {
  width: 100%;
  min-height: 100vh;
  background: $bg_color;
  overflow: hidden;
  color: $color;
  -webkit-mask-image: url(https://pic.imgdb.cn/item/65af9400871b83018abafc39.png);
  -webkit-mask-size: 10%;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  animation: scene-transition 4s cubic-bezier(1, 0, 1, 1) forwards;

 

@keyframes scene-transition {
  100% {
    -webkit-mask-size: 1800%;
  }
}
  .miku{
    opacity: .4;
z-index: 1;    
width: 600px;
// filter:drop-shadow(10px 10px 4px rgb(52, 50, 50));
animation: miku 4s cubic-bezier(0.165, 0.84, 0.44, 1);

  }
  .flower{
    width: 1300px;
    opacity: .4;
    z-index: 0;
    left: 54%;
    top: 55%;
    // filter:drop-shadow(10px 10px 4px rgb(52, 50, 50));
    animation: flower 4s cubic-bezier(0.165, 0.84, 0.44, 1);

  }
  @keyframes miku {
    0%{
transform: translate(-50%,-50%) scale(2);
    }100%{
        transform: translate(-50%,-50%) scale(1);

    }
  }
  @keyframes flower {
    0%{
transform: translate(-50%,-50%) scale(.4);
    }100%{
        transform: translate(-50%,-50%) scale(1);

    }
  }
  .site_content{
    z-index: 2;
    width: 80vw;
    min-height: 40vh;
    overflow: hidden;
    margin: 0px auto;
    color: $site_content_color;
    .site_item{
        &:last-child{
                margin-bottom: 200px;
            }
        margin-left: 20px;
        ul{
            margin: 0;
            padding: 0;
            
            li{
                width: 30%;
                font-size: 16px;
                color: $site_item_color;
                font-weight: 700;
               span{
                &::after{
                    content: '';
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 2px;
                    background: $site_item_color;
                    left: 0;
                }
                &:hover{
                  color: $site_item_hover_color;
                  &::after{
                 background:$site_item_hover_color;
                }
                }
               }
            }
        }
        &:first-child{
            margin-top: 100px;
            
        }
    }
  }
}



// #sky {
//     margin-top: -60px;
//     -webkit-perspective: 400px;
//     perspective: 400px;
//     -webkit-filter: drop-shadow(0px 150px 10px rgba(0, 0, 0, 0.2));
//     filter: drop-shadow(0px 150px 10px rgba(0, 0, 0, 0.2));
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
// }
// #sky div {
//     -webkit-transform-style: preserve-3d;
//     transform-style: preserve-3d;
// }
// #sky .bird {
//     -webkit-animation: fly 10000ms linear infinite;
//     animation: fly 10000ms linear infinite;
// }
// #sky .bird .wind {
//     position: absolute;
//     left: 50%;
//     width: 4px;
//     height: 200px;
//     margin-left: -2px;
//     border-radius: 999px;
//     overflow: hidden;
// }
// #sky .bird .wind:nth-child(1) {
//     -webkit-transform: translate3d(-157px, 138px, -68px) rotateY(90deg);
//     transform: translate3d(-157px, 138px, -68px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(1)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 90, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1935ms 1233ms linear infinite;
//     animation: wind 1935ms 1233ms linear infinite;
// }
// #sky .bird .wind:nth-child(2) {
//     -webkit-transform: translate3d(98px, 75px, 2px) rotateY(90deg);
//     transform: translate3d(98px, 75px, 2px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(2)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 92, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1048ms 4242ms linear infinite;
//     animation: wind 1048ms 4242ms linear infinite;
// }
// #sky .bird .wind:nth-child(3) {
//     -webkit-transform: translate3d(181px, 103px, 66px) rotateY(90deg);
//     transform: translate3d(181px, 103px, 66px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(3)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 174, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1577ms 4135ms linear infinite;
//     animation: wind 1577ms 4135ms linear infinite;
// }
// #sky .bird .wind:nth-child(4) {
//     -webkit-transform: translate3d(171px, -100px, 100px) rotateY(90deg);
//     transform: translate3d(171px, -100px, 100px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(4)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 209, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1176ms 3610ms linear infinite;
//     animation: wind 1176ms 3610ms linear infinite;
// }
// #sky .bird .wind:nth-child(5) {
//     -webkit-transform: translate3d(155px, -139px, 45px) rotateY(90deg);
//     transform: translate3d(155px, -139px, 45px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(5)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 168, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1154ms 1412ms linear infinite;
//     animation: wind 1154ms 1412ms linear infinite;
// }
// #sky .bird .wind:nth-child(6) {
//     -webkit-transform: translate3d(61px, 33px, 72px) rotateY(90deg);
//     transform: translate3d(61px, 33px, 72px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(6)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 242, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 2079ms 4956ms linear infinite;
//     animation: wind 2079ms 4956ms linear infinite;
// }
// #sky .bird .wind:nth-child(7) {
//     -webkit-transform: translate3d(-61px, 37px, 43px) rotateY(90deg);
//     transform: translate3d(-61px, 37px, 43px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(7)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 195, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 2506ms 2873ms linear infinite;
//     animation: wind 2506ms 2873ms linear infinite;
// }
// #sky .bird .wind:nth-child(8) {
//     -webkit-transform: translate3d(-100px, 16px, 70px) rotateY(90deg);
//     transform: translate3d(-100px, 16px, 70px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(8)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 66, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1962ms 1394ms linear infinite;
//     animation: wind 1962ms 1394ms linear infinite;
// }
// #sky .bird .wind:nth-child(9) {
//     -webkit-transform: translate3d(114px, 26px, -30px) rotateY(90deg);
//     transform: translate3d(114px, 26px, -30px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(9)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 30, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 2489ms 2975ms linear infinite;
//     animation: wind 2489ms 2975ms linear infinite;
// }
// #sky .bird .wind:nth-child(10) {
//     -webkit-transform: translate3d(-57px, -48px, 33px) rotateY(90deg);
//     transform: translate3d(-57px, -48px, 33px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(10)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 124, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 2309ms 3147ms linear infinite;
//     animation: wind 2309ms 3147ms linear infinite;
// }
// #sky .bird .wind:nth-child(11) {
//     -webkit-transform: translate3d(139px, 107px, 24px) rotateY(90deg);
//     transform: translate3d(139px, 107px, 24px) rotateY(90deg);
// }
// #sky .bird .wind:nth-child(11)::before {
//     content: '';
//     position: absolute;
//     width: 4px;
//     height: 300px;
//     background: rgba(100, 200, 200, 0.3);
//     border-radius: 999px;
//     -webkit-transform: translateY(-300px);
//     transform: translateY(-300px);
//     -webkit-animation: wind 1365ms 2503ms linear infinite;
//     animation: wind 1365ms 2503ms linear infinite;
// }
// #sky .bird_body {
//     position: relative;
//     width: 30px;
//     height: 40px;
//     background: #a7b1d5;
// }
// #sky .bird_head {
//     position: absolute;
//     top: -30px;
//     border-right: 15px solid transparent;
//     border-bottom: 30px solid #779dcc;
//     border-left: 15px solid transparent;
//     -webkit-transform-origin: 50% 100%;
//     transform-origin: 50% 100%;
//     -webkit-transform: rotateX(-20deg);
//     transform: rotateX(-20deg);
// }
// #sky .bird_wing_left {
//     position: absolute;
//     left: -30px;
//     height: 30px;
//     border-right: 30px solid #a297ff;
//     border-bottom: 10px solid transparent;
//     -webkit-transform-origin: 100% 0;
//     transform-origin: 100% 0;
//     -webkit-animation: wingLeft 1000ms cubic-bezier(0.36, 0.1, 0.16, 1) infinite alternate;
//     animation: wingLeft 1000ms cubic-bezier(0.36, 0.1, 0.16, 1) infinite alternate;
// }
// #sky .bird_wing_left_top {
//     position: absolute;
//     left: -30px;
//     border-right: 30px solid #9296de;
//     border-bottom: 30px solid transparent;
//     -webkit-transform-origin: 100% 0;
//     transform-origin: 100% 0;
//     -webkit-animation: wingLeft 1000ms cubic-bezier(0.545, 0.08, 0.52, 0.975) infinite alternate;
//     animation: wingLeft 1000ms cubic-bezier(0.545, 0.08, 0.52, 0.975) infinite alternate;
// }
// #sky .bird_wing_right {
//     position: absolute;
//     left: 30px;
//     height: 30px;
//     border-left: 30px solid #8399e6;
//     border-bottom: 10px solid transparent;
//     -webkit-transform-origin: 0 0;
//     transform-origin: 0 0;
//     -webkit-animation: wingRight 1000ms cubic-bezier(0.36, 0.1, 0.16, 1) infinite alternate;
//     animation: wingRight 1000ms cubic-bezier(0.36, 0.1, 0.16, 1) infinite alternate;
// }
// #sky .bird_wing_right_top {
//     position: absolute;
//     border-left: 30px solid #bc73e1;
//     border-bottom: 30px solid transparent;
//     -webkit-transform-origin: 0 0;
//     transform-origin: 0 0;
//     -webkit-animation: wingRight 1000ms cubic-bezier(0.545, 0.08, 0.52, 0.975) infinite alternate;
//     animation: wingRight 1000ms cubic-bezier(0.545, 0.08, 0.52, 0.975) infinite alternate;
// }
// #sky .bird_tail_left {
//     position: absolute;
//     top: 40px;
//     border-right: 30px solid transparent;
//     border-top: 40px solid #c279f7;
//     -webkit-transform-origin: 50% 0;
//     transform-origin: 50% 0;
//     -webkit-transform: rotateX(-20deg);
//     transform: rotateX(-20deg);
// }
// #sky .bird_tail_right {
//     position: absolute;
//     top: 40px;
//     border-left: 30px solid transparent;
//     border-top: 40px solid #ae79db;
//     -webkit-transform-origin: 50% 0;
//     transform-origin: 50% 0;
//     -webkit-transform: rotateX(-20deg);
//     transform: rotateX(-20deg);
// }
// @-webkit-keyframes fly {
//     0% {
//         -webkit-transform: rotateX(-120deg) rotateZ(0deg) rotateX(10deg);
//         transform: rotateX(-120deg) rotateZ(0deg) rotateX(10deg);
//     }
//     100% {
//         -webkit-transform: rotateX(-120deg) rotateZ(360deg) rotateX(10deg);
//         transform: rotateX(-120deg) rotateZ(360deg) rotateX(10deg);
//     }
// }
// @keyframes fly {
//     0% {
//         -webkit-transform: rotateX(-120deg) rotateZ(0deg) rotateX(10deg);
//         transform: rotateX(-120deg) rotateZ(0deg) rotateX(10deg);
//     }
//     100% {
//         -webkit-transform: rotateX(-120deg) rotateZ(360deg) rotateX(10deg);
//         transform: rotateX(-120deg) rotateZ(360deg) rotateX(10deg);
//     }
// }
// @-webkit-keyframes wingLeft {
//     0% {
//         -webkit-transform: rotateY(-40deg);
//         transform: rotateY(-40deg);
//     }
//     100% {
//         -webkit-transform: rotateY(40deg);
//         transform: rotateY(40deg);
//     }
// }
// @keyframes wingLeft {
//     0% {
//         -webkit-transform: rotateY(-40deg);
//         transform: rotateY(-40deg);
//     }
//     100% {
//         -webkit-transform: rotateY(40deg);
//         transform: rotateY(40deg);
//     }
// }
// @-webkit-keyframes wingRight {
//     0% {
//         -webkit-transform: rotateY(40deg);
//         transform: rotateY(40deg);
//     }
//     100% {
//         -webkit-transform: rotateY(-40deg);
//         transform: rotateY(-40deg);
//     }
// }
// @keyframes wingRight {
//     0% {
//         -webkit-transform: rotateY(40deg);
//         transform: rotateY(40deg);
//     }
//     100% {
//         -webkit-transform: rotateY(-40deg);
//         transform: rotateY(-40deg);
//     }
// }
// @-webkit-keyframes wind {
//     0% {
//         -webkit-transform: translateY(-300px);
//         transform: translateY(-300px);
//     }
//     100% {
//         -webkit-transform: translateY(200px);
//         transform: translateY(200px);
//     }
// }
// @keyframes wind {
//     0% {
//         -webkit-transform: translateY(-300px);
//         transform: translateY(-300px);
//     }
//     100% {
//         -webkit-transform: translateY(200px);
//         transform: translateY(200px);
//     }
// }
</style>
