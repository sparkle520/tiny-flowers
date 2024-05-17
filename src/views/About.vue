<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:52:38 -->
<!-- @Description:  -->

<script setup>
import {
  ref,
  onBeforeMount,
  onUnmounted,
  onMounted,
  nextTick,
  watch,
} from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";

const config_store = useConfigStore();
const { theme } = storeToRefs(config_store);
const user_store = useUserStore();
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
onBeforeMount(() => {});
onMounted(() => {
  change_theme(theme.value);
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
  update_f_animation();
  update_fif_animation();
};
const go_to_unknown_world_map = () => {
  router.push("/unknownWorldMap");
};
const update_fif_animation = () => {
  const latter_1 = document.querySelectorAll(".latter_1 span");
  const latter_2 = document.querySelectorAll(".latter_2 span");
  const latter_3 = document.querySelectorAll(".latter_3 span");
  const latter_4 = document.querySelectorAll(".latter_4 span");
  const latter_5 = document.querySelectorAll(".latter_5 span");
  const latter_6 = document.querySelectorAll(".latter_6 span");
  const latter_7 = document.querySelectorAll(".latter_7 span");
  circle_animation(latter_1,true,20,800,400)
  circle_animation(latter_2,false,30,700,300)
  circle_animation(latter_3,false,20,200,400)
  circle_animation(latter_4,true,20,200,200)
  circle_animation(latter_5,false,30,300,500)
  circle_animation(latter_6,false,30,500,400)
  circle_animation(latter_7,true,30,900,300)
};
const circle_animation = (dom,positive,offset,p_x,p_y) =>{
  const fifth_page = document.querySelector(".fifth_page");
  
  if (window.scrollY + 250 >= fifth_page.offsetTop) {
    for (let i = 0; i < dom.length; i++) {
      dom[i].style.left =`${p_x}px`
  dom[i].style.top =`${p_y}px`
      if(positive){
        dom[i].style.transform = `rotate(${
        (i + 1) * (360/dom.length)
      }deg) translate(${offset * i}px,${offset * i}px)`;
      dom[i].style.opacity = `${1 - i * 0.01}`;
      }else{
        dom[i].style.transform = `rotate(-${
        (i + 1) * (360/dom.length)
      }deg) translate(${offset * i}px,${offset * i}px)`;
      dom[i].style.opacity = `${1 - i * 0.01}`;
      }
    }
  } else {
    for (let i = 0; i < dom.length; i++) {
      dom[i].style.transform = `rotate(0)`;
      dom[i].style.opacity = `0`;
    }
    
  }
}
const update_f_animation = () => {
  const fourth_page = document.querySelector(".fourth_page");
  const f_word_inner_box = document.querySelector(".f_word_inner_box");
  const c_1 = document.querySelector(".c_1");
  const c_2 = document.querySelector(".c_2");
  if (window.scrollY + 250 >= fourth_page.offsetTop) {
    c_1.style.transform = "scale(1) rotate(3deg) translateZ(0)";
    c_2.style.transform = "scale(1) rotate(-10deg) translateZ(0)";
    f_word_inner_box.style.transform = "scale(1)";
  } else {
    c_1.style.transform = "scale(.4) rotate(-10deg) translateZ(0) ";
    c_2.style.transform = "scale(.4) rotate(10deg) translateZ(0) ";
    f_word_inner_box.style.transform = "scale(0)";
  }
};
// const carousel_data = ref([
//   {link:''},
//   {link:''},
//   {link:''},
//   {link:'https://pic.imgdb.cn/item/65b0ff67871b83018adff204.jpg'},
//   // { link: "https://pic.imgdb.cn/item/659c09de871b83018ad377cb.png" },
//   // { link: "https://pic.imgdb.cn/item/65b0e41d871b83018a7822bf.webp" },
//   // { link: "https://pic.imgdb.cn/item/659c0a3a871b83018ad5736f.png" },
//   // { link: "https://pic.imgdb.cn/item/659bfd7e871b83018a917e4b.png" },
// ]);
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
  const more = document.querySelector(".more");
  const first_page = document.querySelector(".first_page");
  // const s_animation_box_bg_2 = document.querySelector(".s_animation_box_bg_2");
  const start =
    document.querySelector(".second_page").getBoundingClientRect().top +
    window.scrollY;
  const end =
    document.querySelector(".second_page").getBoundingClientRect().bottom +
    window.scrollY -
    window.innerHeight;
  first_page.style.opacity =
    first_page.getBoundingClientRect().bottom / first_page.clientHeight;
  // s_animation_box_bg_2.style.webkitMaskPosition = `${create_animation(
  //   start,
  //   end,
  //   0,
  //   100
  // )(scroll_y)}% ${create_animation(start, end, 100, 0)(scroll_y)}%`;

  if (scroll_y > 0) {
    more.style.opacity = 0;
  } else {
    more.style.opacity = 1;
  }
  for (const [dom, animations] of s_animation_map) {
    for (const prop in animations) {
      const v = animations[prop](scroll_y);
      dom.style[prop] = v;
    }
  }
};

//change scss var
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
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
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--home_bg_color", "#0d1c2b");
    c_c("--first_page_cover_bg", "#1e243398");
    c_c("--home_color", "#f0f8ff");
    c_c("--u_w_m_btn_color", "#f0f8ff");
    c_c("--word_box_color", "#f0f8ff");
    c_c("--f_word_box_color", "#f0f8ff");
  } else {
    c_c("--home_bg_color", "#fdfbfb");
    c_c("--first_page_cover_bg", "transparent");
    c_c("--home_color", "#e60000");
    c_c("--u_w_m_btn_color", "#ff80bf");
    c_c("--word_box_color", "#003153");
    c_c("--f_word_box_color", "#0a0606");
  }
};
</script>
<template>
  <div id="about_main" class="">
    <div class="first_page relative">
      <div class="word_box absolute flex flex_direction_column">
        <span class="common">TINY</span>
        <span class="common">FLOWERS</span>
      </div>
      <div class="word_box_2 absolute">
        <span class="common">PRIVATE BLOG<br /></span>
      </div>
      <!-- <button class="u_w_m_btn absolute" @click="go_to_unknown_world_map">
        Unknown World Map
      </button> -->

      <!-- <img
        class="f_bg"
        src="https://pic.imgdb.cn/item/65b0f614871b83018ab94e81.png"
        alt=""
      /> -->
      <svg
        t="1706081571224"
        class="icon absolute more"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="14155"
        width="52"
        height="52"
      >
        <path
          d="M500.408996 544.70045c3.684558 3.684558 8.674063 5.757121 13.893853 5.757121 5.21979 0 10.209295-2.072564 13.893853-5.757121L717.567616 355.406297c7.676162-7.676162 7.676162-20.111544 0-27.787706-7.676162-7.676162-20.111544-7.676162-27.787706 0L514.302849 503.018891 333.682759 322.398801c-7.676162-7.676162-20.111544-7.676162-27.787707 0-7.676162 7.676162-7.676162 20.111544 0 27.787706l194.513944 194.513943z m189.370914-59.874063L514.302849 660.303448 333.682759 479.606597c-7.676162-7.676162-20.111544-7.676162-27.787707 0-7.676162 7.676162-7.676162 20.111544 0 27.787706l194.513944 194.513943c3.684558 3.684558 8.674063 5.757121 13.893853 5.757121 5.21979 0 10.209295-2.072564 13.893853-5.757121l189.370914-189.370915c4.989505-4.989505 6.908546-12.205097 5.066267-18.96012-1.842279-6.755022-7.138831-12.051574-13.893853-13.893853-6.755022-1.765517-13.970615 0.153523-18.96012 5.143029z m0 0"
          fill="#cdcdcd"
          p-id="14156"
        ></path>
      </svg>
      <div class="first_page_cover absolute"></div>
    </div>
    <div class="second_page relative">
      <div class="s_animation_box">
        <!-- <div class="s_animation_box_bg_box absolute">
          <img
            src="https://pic.imgdb.cn/item/659d3a51871b83018a5b5766.jpg"
            class="s_animation_box_bg_1 absolute"
            alt=""
          />
          <div class="s_animation_box_bg_2 absolute"></div>
        </div> -->
        <span class="absolute">喜欢的作品</span>
        <ul class="flex flex_direction_row absolute">
          <li data-order="0" class="animation_item relative">
            <img
              src="https://pic.imgdb.cn/item/65b15382871b83018a4d9b0b.webp"
              alt=""
            />
          </li>
          <li data-order="1" class="animation_item relative">
            <img
              src="https://pic.imgdb.cn/item/65b152e5871b83018a4c46be.webp"
              alt=""
            />
          </li>
          <li data-order="3" class="animation_item relative">
            <img
              src="https://pic.imgdb.cn/item/65b96999871b83018aad93e5.webp"
              alt=""
            />
          </li>
        </ul>
      </div>
    </div>
    <div class="third_page relative">
      <div
        class="t_animation_box relative flex justify_content_center align_items_center"
      >
        <span class="t_future_instance absolute"></span>
        <div class="t_circle_1 absolute"></div>
        <div class="t_circle_2 absolute"></div>
      </div>
    </div>
    <div class="fourth_page relative">
      <div
        class="f_animation_box relative flex justify_content_center align_items_center"
      >
        <div class="f_circle absolute"></div>
        <div class="f_word_box absolute">
          <div class="f_word_inner_box absolute flex flex_direction_column">
            <span class="w_1">Searching</span>
            <span class="w_2"> all the world </span>
            <span class="w_3">For one thing</span>
          </div>
        </div>
        <div class="card c_1 absolute">
          <img
            src="https://pic.imgdb.cn/item/65b3c514871b83018a87b510.png"
            alt=""
          />
        </div>
        <div class="card c_2 absolute"></div>
      </div>
    </div>
    <div class="fifth_page relative">
      <div class="latter_1 relative">
        <span  class="absolute" v-for="item in user_store.name.split('')">{{
          item
        }}</span>
      </div>
      <div class="latter_2 relative"> <span class="absolute"  v-for="item in 'Mozart'.split('')">{{
          item
        }}</span></div>
      <div class="latter_3 relative"> <span class="absolute"  v-for="item in 'Schubert'.split('')">{{
          item
        }}</span></div>
      <div class="latter_4 relative"> <span class="absolute"  v-for="item in 'Brahms'.split('')">{{
          item
        }}</span></div>
      <div class="latter_5 relative"> <span class="absolute"  v-for="item in 'Chopin'.split('')">{{
          item
        }}</span></div>
      <div class="latter_6 relative"> <span class="absolute"  v-for="item in 'Bach'.split('')">{{
          item
        }}</span></div>
      <div class="latter_7 relative"> <span class="absolute"  v-for="item in 'Mendelssohn'.split('')">{{
          item
        }}</span></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$home_bg_color: var(--home_bg_color, #384f89);
$home_color: var(--home_color, #1a1814);
$first_page_cover_bg: var(--first_page_cover_bg, #1e243398);
$u_w_m_btn_color: var(--u_w_m_btn_color, #ff80bf);
$word_box_color: var(--word_box_color, #003153);
$f_word_box_color: var(--f_word_box_color, #0a0606);
#about_main {
  width: 100vw;
  height: 100vh;
  // scroll-snap-type: y mandatory;
  background: $home_bg_color;
  .first_page {
    width: 100vw;
    height: 100vh;
    background: $home_bg_color;
    z-index: 100;
    &::after {
      width: 40vw;
      height: 30vw;
      border-radius: 50%;
      filter: blur(110px);
      top: 70%;
      content: "";
      left: 5vw;
      position: absolute;
      transform: translateY(-50%);

      background: #a900ff;
    }
    &::before {
      right: 10vw;
      content: "";
      position: absolute;
      z-index: 1;
      background: #ffac86;
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      filter: blur(110px);
      top: 20%;

      transform: translateY(-50%);
    }
    // scroll-snap-align: start;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    // animation: first_page 2s cubic-bezier(0.075, 0.82, 0.165, 1);

    // &::after{
    //   width: 100vw;
    //   height: 30vh;
    //   background: linear-gradient(to top,rgb(182, 183, 183),transparent);
    //   content: '';
    //   position: absolute;
    //   bottom: 0;
    // }
    .u_w_m_btn {
      font-family: inherit;
      width: 8em;
      height: 2.6em;
      z-index: 1000;
      line-height: 2.5em;
      background: transparent;
      margin: 20px;
      transform: translateY(65vh) translateX(2em);
      position: relative;
      border: 2px solid $u_w_m_btn_color;
      transition: color 0.5s;
      font-size: 17px;
      border-radius: 6px;
      font-weight: 500;
      color: $u_w_m_btn_color;
      &::before {
        content: "";
        position: absolute;
        z-index: -1;
        background: $u_w_m_btn_color;
        height: 150px;
        width: 200px;
        border-radius: 50%;
        top: 100%;
        left: 100%;
        transition: all 0.7s;
      }
      &:hover {
        color: #ffff;
        &::before {
          top: -30px;
          left: -30px;
        }
      }
      &:active {
        &::before {
          background: $u_w_m_btn_color;
          transition: background 0s;
        }
      }
    }
    // .f_bg {
    //   position: absolute;
    //   right: 3em;
    //   width: 50vw;
    //   height: 50vh;
    //   top: 50%;
    //   border-radius: 0.3em;
    //   z-index: 100;
    //   transform: translateY(-50%);
    // }

    .word_box {
      left: 3em;
      top: 40%;
      z-index: 1000;
      transform: translateY(-50%);

      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 900px;
      //   height: 300px;
      //   background: #7bc5e33c;
      //   left: -100px;
      //   top: 50%;
      //   transform: translateY(-50%);
      // }
      .common {
        font-size: 7em;
        font-weight: 900;
        line-height: 1em;
        color: $word_box_color;
        z-index: 100;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        // animation: word_1 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        // background: url(https://pic.imgdb.cn/item/65aae8fe871b83018ac8d369.png)
        // // background: url(https://pic.imgdb.cn/item/65b0d75c871b83018a4c3d9e.png)
        //   repeat #011f42;
        // background-size: 300px auto;
        // -webkit-text-fill-color: transparent;
        // text-fill-color: transparent;
        // -webkit-background-clip: text;
        // background-clip: text;
        // -webkit-animation: background 12s infinite linear;
        // animation: background 12s infinite linear;
      }
      // @keyframes word_1 {
      //   0% {
      //     line-height: 2em;
      //   }
      //   100% {
      //     line-height: 1em;
      //   }
      // }
    }
    .word_box_2 {
      left: 4em;
      top: 54%;
      color: $word_box_color;
      z-index: 1;

      animation: to_left 5s cubic-bezier(0.075, 0.82, 0.165, 1);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 420px;
      //   height: 60px;
      //   background: #7bc5e33c;
      //   left: -5%;
      //   top: 50%;
      //   transform: translateY(-50%);
      // }
      .common {
        font-size: 2em;
        font-weight: 900;
        z-index: 100;
        // text-shadow: #e60000 -.1em .0em 2px;
        // filter: drop-shadow(0 0 10px #efb0b0);
        // text-shadow: $home_color 2px 2px 1px;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        // background: url(http://html5book.ru/wp-content/uploads/2016/08/bubbles.png)
        //   repeat #011f42;
        // background-size: 300px auto;
        // -webkit-text-fill-color: transparent;
        // text-fill-color: transparent;
        // -webkit-background-clip: text;
        // background-clip: text;
        // -webkit-animation: background 12s infinite linear;
        // animation: background 12s infinite linear;
      }
    }
    .first_page_cover {
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: 19;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      background: linear-gradient(
        to right,
        $first_page_cover_bg 1%,
        transparent 50%,
        $first_page_cover_bg 100%
      );
    }
  }

  .more {
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    animation: more 2s infinite linear both;
    z-index: 20;
    path {
      fill: #a7a7eb;
    }
  }
  @keyframes more {
    0% {
      transform: translateY(0);
    }
    90% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
    }
  }
  .second_page {
    width: 100vw;
    height: 400vh;
    z-index: 21;
    background: $home_bg_color;

    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

    .s_animation_box {
      position: sticky;
      width: 100vw;
      height: 100vh;
      top: 0;
      color: $word_box_color;
      background: transparent;
      &::after {
        width: 40vw;
        height: 30vw;
        border-radius: 50%;
        filter: blur(110px);
        top: 70%;
        content: "";
        left: 5vw;
        position: absolute;
        transform: translateY(-50%);

        background: #00aaff;
      }
      &::before {
        right: 10vw;
        content: "";
        position: absolute;
        z-index: 1;
        background: #22c32e;
        width: 20vw;
        height: 10vw;
        border-radius: 50%;
        filter: blur(110px);
        top: 40%;

        transform: translateY(-50%);
      }
      // &::after {
      //   content: "";
      //   position: absolute;
      //   width: 100vw;
      //   height: 40vh;
      //   background: linear-gradient(to top, rgb(38, 41, 44), transparent);
      //   bottom: 0;
      // }
      .s_animation_box_bg_box {
        width: 100vw;
        height: 68vh;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -40%);
        background: $home_bg_color;

        // &::after {
        //   content: "";
        //   position: absolute;
        //   background: none;
        //   width: 130%;
        //   background: $home_bg_color;
        //   height: 26vh;
        //   left: 50%;
        //   transform: translateX(-50%);
        //   border-radius: 50%;
        //   bottom: -28%;
        //   box-shadow: inset 2px 3px 20px #123;
        // }
        // &::before {
        //   content: "";
        //   position: absolute;
        //   background: none;
        //   width: 130%;
        //   background: $home_bg_color;
        //   height: 26vh;
        //   left: 50%;
        //   transform: translateX(-50%);
        //   border-bottom-left-radius: 50%;
        //   border-bottom-right-radius: 50%;
        //   top: -30%;
        //   z-index: 1;

        // }
      }

      // .s_animation_box_bg_1 {
      //   width: 100vw;
      //   border-radius: 5px;
      //   height: 10vh;
      //   opacity: 1;
      // }
      // .s_animation_box_bg_2 {
      //   width: 100vw;
      //   height: 20vh;
      //   opacity: 1;
      //   border-radius: 5px;

      //   background-size: cover;
      //   background-image: url(https://pic.imgdb.cn/item/65b21d96871b83018a08d73b.png);
      //   -webkit-mask-image: linear-gradient(
      //     to right,
      //     transparent 47.5%,
      //     #fff 52.5%
      //   );
      //   background-repeat: no-repeat;
      //   -webkit-mask-size: 210%;
      //   -webkit-mask-position: left;
      // }
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
          border-radius: 5px;
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
            box-shadow: #003153 4px 5px 10px;
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
        color: $word_box_color;
      }
    }
  }
  .third_page {
    width: 100vw;
    height: 300vh;
    background: $home_bg_color;
    // scroll-snap-align: start;

    .t_animation_box {
      width: 100vw;
      height: 100vh;
      top: 0;
      position: sticky;
      background: $home_bg_color;
      .t_future_instance {
        font-size: 2em;
        font-weight: 900;
        text-align: center;
        line-height: 2em;
        color: $f_word_box_color;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      .t_circle_1 {
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        filter: blur(110px);
        top: 50%;

        transform: translateY(-50%);

        left: 5em;
        background: #ff5232;
      }
      .t_circle_2 {
        right: 5em;
        background: #f7ff00;
        width: 20vw;
        height: 20vw;
        border-radius: 50%;
        filter: blur(110px);
        top: 50%;

        transform: translateY(-50%);
      }
    }
    // scroll-snap-align: start;
  }
  .fourth_page {
    width: 100vw;
    height: 100vh;
    background: $home_bg_color;
    // border-bottom:3px #11223318 solid ;
    // border-top:3px #11223318 solid ;
    // scroll-snap-align: start;
    &::after {
      width: 50vw;
      height: 30vw;
      border-radius: 50%;
      filter: blur(110px);
      top: 50%;
      content: "";
      left: 5vw;
      position: absolute;
      transform: translateY(-50%);

      z-index: 10;
      background: #ffd9e6;
    }
    &::before {
      right: 5em;
      content: "";
      position: absolute;
      z-index: 1;
      background: #ff80bf;
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      filter: blur(110px);
      top: 70%;

      transform: translateY(-50%);
    }
    .f_animation_box {
      background: $home_bg_color;
      width: inherit;
      height: inherit;

      // .f_circle {
      //   width: 30vw;
      //   height: 30vw;
      //   right: -15vw;
      //   bottom: -15vw;
      //   border-radius: 50%;
      //   background: #f4bbbb7b;
      //   &::after {
      //     content: "";
      //     position: absolute;
      //     width: 70%;
      //     height: 70%;
      //     right: 40vw;
      //     border-radius: 50%;
      //     background: #f4bbbb7b;
      //     top: -10vw;
      //   }
      // }
      .f_word_box {
        left: 0vw;
        top: 0%;
        color: $f_word_box_color;
        font-size: 1.5em;

        font-weight: 900;
        z-index: 11;
        height: 70vh;
        width: 50vw;
        span {
        }
        .f_word_inner_box {
          transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
          top: 30vh;
          left: 10vw;
          .w_1 {
            font-size: 4em;
            color: transparent;
            -webkit-text-stroke: #6640ff 2px;
            text-shadow: #6640ff 0px 13px 10px;
          }
          .w_2 {
            font-size: 3em;
            font-weight: 600;
            color: #ff6666;
            margin: 1vh 0;
            text-shadow: #ff6666 0px 13px 10px;
          }
          .w_3 {
            font-size: 3.5em;
            font-family: 900;
            color: #ff9d00;
            text-shadow: #ff4d00 0px 13px 10px;
          }
        }
      }

      .card {
        width: 23vw;
        height: 53vh;
      }
      .c_1 {
        background: rgb(19, 20, 21);
        box-shadow: #62676b54 0px 13px 10px;

        z-index: 1;
        right: 14vw;
        top: 27vh;
        transform: rotate(3deg);
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .c_2 {
        background: #e72626;
        z-index: 0;
        right: 17vw;
        box-shadow: #62676be8 0px 13px 10px;

        top: 29vh;
        transform: rotate(-10deg);
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
  }
  .fifth_page {
    width: 100vw;
    height: 100vh;
    //  scroll-snap-align: start;

    background: $home_bg_color;
    &::after {
      width: 40vw;
      height: 30vw;
      border-radius: 50%;
      filter: blur(110px);
      top: 70%;
      content: "";
      left: 5vw;
      position: absolute;
      transform: translateY(-50%);

      background: #ff9d00;
    }
    &::before {
      right: 10vw;
      content: "";
      position: absolute;
      z-index: 1;
      background: #00ff93;
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      filter: blur(110px);
      top: 20%;

      transform: translateY(-50%);
    }
    .latter_1 {
      
      z-index: 100;
      color: #ff6505;
      font-size: 3em;
      font-weight: 900;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
    .latter_2{
      
      color: #dda0dd;
      font-size: 3em;
      font-weight: 900;
      z-index: 100;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
    .latter_3{
      
      color: #8ce600;
      font-size: 3em;
      font-weight: 900;
      z-index: 100;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
    .latter_4{
      
      color: #4798b3;
      font-size: 3em;
      font-weight: 900;
      z-index: 100;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
    .latter_5{
      
      color: #73e68c;
      font-size: 3em;
      font-weight: 900;
      z-index: 100;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
    .latter_6{
      
      color: #ff0063;
      font-size: 3em;
      font-weight: 900;
      z-index: 100;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
    .latter_7{
      
      color: #404040;
      font-size: 3em;
      font-weight: 900;
      z-index: 100;
      span {
        transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        opacity: 0;
      }
    }
  }
}
// @keyframes to_right {
//   0% {
//     left: 0;
//   }
//   100% {
//     left: 100px;
//   }
// }
// @keyframes to_left {
//   0% {
//     right: -3%;
//   }
//   100% {
//     right: 3%;
//   }
// }
// -webkit-keyframes background {
//   from {
//     background-position: 0 0%;
//   }
//   to {
//     background-position: 0 -300px;
//   }
// }
// @keyframes background {
//   from {
//     background-position: 0 0%;
//   }
//   to {
//     background-position: 0 -300px;
//   }
// }

@keyframes first_page {
  0% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>
