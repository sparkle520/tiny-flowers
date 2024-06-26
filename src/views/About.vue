<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import {
  onBeforeMount,
  onUnmounted,
  onMounted,
  
} from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";

const user_store = useUserStore();

onBeforeMount(() => {});
onMounted(() => {
  init_s_animation_map();
  update_s_animation_map_style();
  window.addEventListener("scroll", scroll_handle);
});
const router = useRouter();
onBeforeMount(() => {});

onUnmounted(() => {
  window.removeEventListener("scroll", scroll_handle);
});
const scroll_handle = () => {
  update_s_animation_map_style();
  update_t_future_instance();
};

// const update_fif_animation = () => {
//   const latter_1 = document.querySelectorAll(".latter_1 span");
//   const latter_2 = document.querySelectorAll(".latter_2 span");
//   const latter_3 = document.querySelectorAll(".latter_3 span");
//   const latter_4 = document.querySelectorAll(".latter_4 span");
//   const latter_5 = document.querySelectorAll(".latter_5 span");
//   const latter_6 = document.querySelectorAll(".latter_6 span");
//   const latter_7 = document.querySelectorAll(".latter_7 span");
//   circle_animation(latter_1,true,20,800,400)
//   circle_animation(latter_2,false,30,700,300)
//   circle_animation(latter_3,false,20,200,400)
//   circle_animation(latter_4,true,20,200,200)
//   circle_animation(latter_5,false,30,300,500)
//   circle_animation(latter_6,false,30,500,400)
//   circle_animation(latter_7,true,30,900,300)
// };
// const circle_animation = (dom,positive,offset,p_x,p_y) =>{
//   const fifth_page = document.querySelector(".fifth_page");
  
//   if (window.scrollY + 250 >= fifth_page.offsetTop) {
//     for (let i = 0; i < dom.length; i++) {
//       dom[i].style.left =`${p_x}px`
//   dom[i].style.top =`${p_y}px`
//       if(positive){
//         dom[i].style.transform = `rotate(${
//         (i + 1) * (360/dom.length)
//       }deg) translate(${offset * i}px,${offset * i}px)`;
//       dom[i].style.opacity = `${1 - i * 0.01}`;
//       }else{
//         dom[i].style.transform = `rotate(-${
//         (i + 1) * (360/dom.length)
//       }deg) translate(${offset * i}px,${offset * i}px)`;
//       dom[i].style.opacity = `${1 - i * 0.01}`;
//       }
//     }
//   } else {
//     for (let i = 0; i < dom.length; i++) {
//       dom[i].style.transform = `rotate(0)`;
//       dom[i].style.opacity = `0`;
//     }
    
//   }
// }


const future_instance = [
  "あぁ　答えがある問いばかりを　教わってきたよ　だけど明日からは<br /><span>啊 一直以来 我们掌握的都是那些有解的问题</span>",
  "僕だけの正解をいざ　探しにゆくんだ　また逢う日まで<br><span>但从明日开始 我将追寻 属于我的答案 直至再度重逢</span>",
  "次の空欄に当てはまる言葉を書き入れなさい<br><span>请在下方空栏 填入恰当的空白词语</span>",
  "「君のいない　明日からの日々を僕は／私は　　きっと　□□□□□□□□□□□□□□□□□□」<br><span  >“从今往后 在没有你的日子里,我一定 □□□□□□□□□□□□□□□□□□”</span>",
  "制限時間は　あなたのこれからの人生<br><span>答题时间：你未来的人生</span>",
  "解答用紙は　あなたのこれからの人生<br><span>答题试纸：你未来的人生</span>",
  "答え合わせの　時に私はもういない<br><span>批改答案的时候 我或将不再存在</span>",
  "だから　採点基準は　あなたのこれからの人生<br><span>所以 评分标准：你未来的人生</span>",
  "「よーい、はじめ」<br><span>“准备好了吗？那就开始吧”</span>",
];
const update_t_future_instance = () => {
  const t_future_instance = document.querySelector(".t_future_instance");
  const third_page = document.querySelector(".third_page");
  const rect = third_page.getBoundingClientRect();
  const start = rect.top + window.scrollY;
  const end = rect.bottom + window.scrollY - window.innerHeight;
  const scroll_y = window.scrollY;
  const interval = (end - start) / future_instance.length;

  if (scroll_y >= start && scroll_y <= end) {
    const index = Math.floor((scroll_y - start) / interval);
    t_future_instance.innerHTML = future_instance[index];
    t_future_instance.style.transform = `scale(${create_animation(
      start + index * interval,
      start + (index + 1) * interval,
      0.5,
      1
    )(scroll_y)}) translateY(${create_animation(
      start + index * interval,
      start + (index + 1) * interval,
      3,
      0
    )(scroll_y)}em)`;
    t_future_instance.style.opacity = create_animation(
      start + index * interval,
      start + (index + 1) * interval,
      0.5,
      1
    )(scroll_y);
  } else if (scroll_y < start) {
    t_future_instance.innerHTML = future_instance[0];
  } else {
    t_future_instance.innerHTML = future_instance[future_instance.length - 1];
  }
};

const s_animation_map = new Map();
const init_s_animation_map = () => {
  const animation_item = document.querySelectorAll(".animation_item");
  const start =
    document.querySelector(".second_page").getBoundingClientRect().top +
    window.scrollY;
  const end =
    document.querySelector(".second_page").getBoundingClientRect().bottom +
    window.scrollY -
    window.innerHeight;
  for (const item of animation_item) {
    s_animation_map.set(item, get_s_dom_animation(start, end, item));
  }
};
const get_s_dom_animation = (start, end, dom) => {
  const opacity_animation = create_animation(start, end, 0, 1);
  const ul = document.querySelector(".s_animation_box ul");
  const { clientWidth, clientHeight, offsetTop, offsetLeft } = dom;
  const rect = ul.getBoundingClientRect();
  const opacity = (x) => {
    return opacity_animation(x);
  };
  start += dom.dataset.order * 100;
  const transform = (scroll_y) => {
    return `translate(${create_animation(
      start,
      end,
      rect.width / 2 - clientWidth / 2 - offsetLeft,
      0
    )(scroll_y)}px,${create_animation(
      start,
      end,
      rect.height / 2 - clientHeight / 2 - offsetTop,
      0
    )(scroll_y)}PX) scale(${create_animation(start, end, 0.2, 1)(scroll_y)})`;
  };
  return {
    opacity,
    transform,
  };
};
const update_s_animation_map_style = () => {
  const scroll_y = window.scrollY;
  const first_page = document.querySelector(".first_page");
  // const s_animation_box_bg_2 = document.querySelector(".s_animation_box_bg_2");
  const start =
    document.querySelector(".second_page").getBoundingClientRect().top +
    window.scrollY;
  const end =
    document.querySelector(".second_page").getBoundingClientRect().bottom +
    window.scrollY -
    window.innerHeight;
  // first_page.style.opacity =
  //   first_page.getBoundingClientRect().bottom / first_page.clientHeight;
  

 
  for (const [dom, animations] of s_animation_map) {
    for (const prop in animations) {
      const v = animations[prop](scroll_y);
      dom.style[prop] = v;
    }
  }
};

//change scss var

const create_animation = (start, end, s_v, e_v) => {
  return (x) => {
    if (x < start) {
      return s_v;
    }
    if (x > end) {
      return e_v;
    }
    return s_v + ((e_v - s_v) * (x - start)) / (end - start);
  };
};

</script>
<template>
  <div id="about_main" class="">
    <div class="first_page r">
     <svg class="a first_bg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="rrreflection-grad"><stop stop-color="hsl(185, 53%, 55%)" stop-opacity="1" offset="45%"></stop><stop stop-color="hsl(0, 73%, 55%)" stop-opacity="1" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(270)" x1="50%" y1="0%" x2="50%" y2="100%" id="rrreflection-grad-3"><stop stop-color="hsl(185, 53%, 55%)" stop-opacity="1" offset="45%"></stop><stop stop-color="hsl(0, 73%, 55%)" stop-opacity="1" offset="100%"></stop></linearGradient><linearGradient gradientTransform="rotate(270)" x1="50%" y1="0%" x2="50%" y2="100%" id="rrreflection-grad-4"><stop stop-color="hsl(0, 73%, 55%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(185, 53%, 55%)" stop-opacity="1" offset="45%"></stop></linearGradient></defs><g stroke-width="2" stroke="url(#rrreflection-grad)" fill="none"><circle r="150" cx="50%" cy="0"></circle><circle r="145" cx="50%" cy="0"></circle><circle r="140" cx="50%" cy="0"></circle><circle r="135" cx="50%" cy="0"></circle><circle r="130" cx="50%" cy="0"></circle><circle r="125" cx="50%" cy="0"></circle><circle r="120" cx="50%" cy="0"></circle><circle r="115" cx="50%" cy="0"></circle><circle r="110" cx="50%" cy="0"></circle><circle r="105" cx="50%" cy="0"></circle><circle r="100" cx="50%" cy="0"></circle><circle r="95" cx="50%" cy="0"></circle><circle r="90" cx="50%" cy="0"></circle><circle r="85" cx="50%" cy="0"></circle><circle r="80" cx="50%" cy="0"></circle><circle r="75" cx="50%" cy="0"></circle><circle r="70" cx="50%" cy="0"></circle><circle r="65" cx="50%" cy="0"></circle><circle r="60" cx="50%" cy="0"></circle><circle r="55" cx="50%" cy="0"></circle><circle r="50" cx="50%" cy="0"></circle><circle r="45" cx="50%" cy="0"></circle><circle r="40" cx="50%" cy="0"></circle><circle r="35" cx="50%" cy="0"></circle><circle r="30" cx="50%" cy="0"></circle><circle r="25" cx="50%" cy="0"></circle><circle r="20" cx="50%" cy="0"></circle><circle r="15" cx="50%" cy="0"></circle><circle r="10" cx="50%" cy="0"></circle><circle r="5" cx="50%" cy="0"></circle></g><g stroke-width="2" stroke="url(#rrreflection-grad-2)" fill="none"><circle r="150" cx="50%" cy="100%"></circle><circle r="145" cx="50%" cy="100%"></circle><circle r="140" cx="50%" cy="100%"></circle><circle r="135" cx="50%" cy="100%"></circle><circle r="130" cx="50%" cy="100%"></circle><circle r="125" cx="50%" cy="100%"></circle><circle r="120" cx="50%" cy="100%"></circle><circle r="115" cx="50%" cy="100%"></circle><circle r="110" cx="50%" cy="100%"></circle><circle r="105" cx="50%" cy="100%"></circle><circle r="100" cx="50%" cy="100%"></circle><circle r="95" cx="50%" cy="100%"></circle><circle r="90" cx="50%" cy="100%"></circle><circle r="85" cx="50%" cy="100%"></circle><circle r="80" cx="50%" cy="100%"></circle><circle r="75" cx="50%" cy="100%"></circle><circle r="70" cx="50%" cy="100%"></circle><circle r="65" cx="50%" cy="100%"></circle><circle r="60" cx="50%" cy="100%"></circle><circle r="55" cx="50%" cy="100%"></circle><circle r="50" cx="50%" cy="100%"></circle><circle r="45" cx="50%" cy="100%"></circle><circle r="40" cx="50%" cy="100%"></circle><circle r="35" cx="50%" cy="100%"></circle><circle r="30" cx="50%" cy="100%"></circle><circle r="25" cx="50%" cy="100%"></circle><circle r="20" cx="50%" cy="100%"></circle><circle r="15" cx="50%" cy="100%"></circle><circle r="10" cx="50%" cy="100%"></circle><circle r="5" cx="50%" cy="100%"></circle></g><g stroke-width="2" stroke="url(#rrreflection-grad-3)" fill="none"><circle r="150" cx="0" cy="50%"></circle><circle r="145" cx="0" cy="50%"></circle><circle r="140" cx="0" cy="50%"></circle><circle r="135" cx="0" cy="50%"></circle><circle r="130" cx="0" cy="50%"></circle><circle r="125" cx="0" cy="50%"></circle><circle r="120" cx="0" cy="50%"></circle><circle r="115" cx="0" cy="50%"></circle><circle r="110" cx="0" cy="50%"></circle><circle r="105" cx="0" cy="50%"></circle><circle r="100" cx="0" cy="50%"></circle><circle r="95" cx="0" cy="50%"></circle><circle r="90" cx="0" cy="50%"></circle><circle r="85" cx="0" cy="50%"></circle><circle r="80" cx="0" cy="50%"></circle><circle r="75" cx="0" cy="50%"></circle><circle r="70" cx="0" cy="50%"></circle><circle r="65" cx="0" cy="50%"></circle><circle r="60" cx="0" cy="50%"></circle><circle r="55" cx="0" cy="50%"></circle><circle r="50" cx="0" cy="50%"></circle><circle r="45" cx="0" cy="50%"></circle><circle r="40" cx="0" cy="50%"></circle><circle r="35" cx="0" cy="50%"></circle><circle r="30" cx="0" cy="50%"></circle><circle r="25" cx="0" cy="50%"></circle><circle r="20" cx="0" cy="50%"></circle><circle r="15" cx="0" cy="50%"></circle><circle r="10" cx="0" cy="50%"></circle><circle r="5" cx="0" cy="50%"></circle></g><g stroke-width="2" stroke="url(#rrreflection-grad-4)" fill="none"><circle r="150" cx="100%" cy="50%"></circle><circle r="145" cx="100%" cy="50%"></circle><circle r="140" cx="100%" cy="50%"></circle><circle r="135" cx="100%" cy="50%"></circle><circle r="130" cx="100%" cy="50%"></circle><circle r="125" cx="100%" cy="50%"></circle><circle r="120" cx="100%" cy="50%"></circle><circle r="115" cx="100%" cy="50%"></circle><circle r="110" cx="100%" cy="50%"></circle><circle r="105" cx="100%" cy="50%"></circle><circle r="100" cx="100%" cy="50%"></circle><circle r="95" cx="100%" cy="50%"></circle><circle r="90" cx="100%" cy="50%"></circle><circle r="85" cx="100%" cy="50%"></circle><circle r="80" cx="100%" cy="50%"></circle><circle r="75" cx="100%" cy="50%"></circle><circle r="70" cx="100%" cy="50%"></circle><circle r="65" cx="100%" cy="50%"></circle><circle r="60" cx="100%" cy="50%"></circle><circle r="55" cx="100%" cy="50%"></circle><circle r="50" cx="100%" cy="50%"></circle><circle r="45" cx="100%" cy="50%"></circle><circle r="40" cx="100%" cy="50%"></circle><circle r="35" cx="100%" cy="50%"></circle><circle r="30" cx="100%" cy="50%"></circle><circle r="25" cx="100%" cy="50%"></circle><circle r="20" cx="100%" cy="50%"></circle><circle r="15" cx="100%" cy="50%"></circle><circle r="10" cx="100%" cy="50%"></circle><circle r="5" cx="100%" cy="50%"></circle></g></svg>
      <div class="word_box a f f_d_c">
        <span class="common">TINY</span>
        <span class="common">FLOWERS</span>
      </div>
      <div class="word_box_2 a">
        <span class="common">PRIVATE BLOG<br /></span>
      </div>
     
     
      <div class="first_page_cover a"></div>
    </div>
    <div class="second_page r">
      <div class="s_animation_box">
        
        <span class="a">喜欢的作品</span>
        <ul class="f flex_direction_row a">
          <li data-order="0" class="animation_item r">
            <img
              src="https://pic.imgdb.cn/item/65b15382871b83018a4d9b0b.webp"
              alt=""
            />
          </li>
          <li data-order="1" class="animation_item r">
            <img
              src="https://pic.imgdb.cn/item/65b152e5871b83018a4c46be.webp"
              alt=""
            />
          </li>
          <li data-order="3" class="animation_item r">
            <img
              src="https://pic.imgdb.cn/item/65b96999871b83018aad93e5.webp"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="third_page r">
      <div
        class="t_animation_box r f j_c_c a_c"
      >
        <span class="t_future_instance a"></span>
        <div class="t_circle_1 a"></div>
        <div class="t_circle_2 a"></div>
      </div>
    </div>
    
    
  </div>
</template>
<style lang="scss" scoped>

@font-face {
  font-family: "break";
  src: url("/src/assets/font/break.ttf");
}

#about_main {
  width: max(1440px,100vw);
  height: 100vh;
  font-family: "misans";
  // scroll-snap-type: y mandatory;
  background: $primary;
  color: $fill_primary;

  .first_page {
    width: max(1440px,100vw);
    height: 100vh;   
    z-index: 100;
    background: $primary;

    // scroll-snap-align: start;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .first_bg{
      width: max(1440px,100vw);
      opacity: .9;
      stop:nth-child(even){
        stop-color: $primary;
      }
      stop:nth-child(odd){
        stop-color: $primary_mix_4;
      }
    }
   

    .word_box {
      left: 200px;
      top: 40%;
      z-index: 1000;
      gap: 32px;
      transform: translateY(-50%);

      
      .common {
        font-size: 7em;
        font-weight: 900;
        line-height: 1em;
        color: $fill_primary;
        font-family:'break' ;
        
        z-index: 100;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
       
      }
    
    }
    .word_box_2 {
      left: 250px;
      top: 60%;
      color: $primary_mix_4;
      z-index: 1;
      font-family: "break";

      animation: to_left 5s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

     
      .common {
        font-size: 2em;
        font-weight: 900;
        z-index: 100;
       
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      
      }
    }
   
  }

  
 
  .second_page {
    width: max(1440px,100vw);
    height: 400vh;
    z-index: 21;
    background: $primary;

    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    .s_animation_box {
      position: sticky;
      width: max(1440px,100vw);
      height: 100vh;
      top: 0;
     
   

    
      ul {
        margin: 0;
        padding: 0;
        width: calc(75vw + 40px);
        height: 64vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
        gap: 20px;
        z-index: 11;
        .animation_item {
          width: 25vw;
          height: 64vh;
          border-radius: 10px;
          overflow: hidden;
          &::after {
            position: absolute;
            left: -140%;
            content: "";
            top: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0),
              rgba(255, 255, 255, 0.5),
              rgba(255, 255, 255, 0)
            );
            transform: skew(-30deg);
          }
          &:hover {
            &::after {
              left: 140%;
              transition: all 1s cubic-bezier(0.4, 0, 0.2, 1);
            }
          }
          img {
            width: inherit;
            object-fit: cover;
            height: inherit;
            border-radius: inherit;
            box-shadow: $fill_shadow 0 0 10px;
          }
        }
      }
      .show_text {
        font-size: 4em;
      }
      span {
        top: 4.5em;
        font-weight: 900;
        left: 50%;
        transform: translateX(-50%);
        font-size: 2em;
      }
    }
  }
  .third_page {
    width: max(1440px,100vw);
    height: 300vh;
    // scroll-snap-align: start;
    background: $primary;

    .t_animation_box {
      width: max(1440px,100vw);
      height: 100vh;
      top: 0;
      position: sticky;
      .t_future_instance {
        font-size: 2em;
        font-weight: 900;
        text-align: center;
        line-height: 2em;
        color: $fill_primary;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
     
    }
  }
 
}

@keyframes first_page {
  0% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
