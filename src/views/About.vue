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
const user_store = useUserStore()

onBeforeMount(() => { });
onMounted(() => {
  // init_s_animation_map();
  setTimeout(() => {
    update_page()
    img_in(p_1_img_box)
  }, 2000)
  // update_s_animation_map_style();
  window.addEventListener("scroll", scroll_handle);
});
onBeforeMount(() => { });

onUnmounted(() => {
  window.removeEventListener("scroll", scroll_handle);
});
let p_1_img_box = null
let p_2_miku = null
let p_3_miku = null

let p_4_miku = null
let p_1_bg = null
let p_2_bg = null
let p_3_bg = null
let p_4_bg = null
let sentence_box = null
// let p_1_bg = null
let page_height = null
const update_page = () => {

  init_miku()
  const scroll_y = window.scrollY;
  p_1_img_box.style.top = `-${scroll_y / 2}px`
  p_2_miku.style.top = `-${(scroll_y - page_height - 128) / 2}px`
  p_4_miku.style.top = `-${(scroll_y - page_height * 3 - 384) / 2}px`
  p_3_miku.style.top = `-${(scroll_y - (page_height * 2) - 256) / 2}px`

  p_1_bg.style.transform = `translateY(${scroll_y * 1.01}px)`
  p_2_bg.style.transform = `translateY(${(scroll_y - page_height - 128) * 1.01}px)`
  p_3_bg.style.transform = `translateY(${(scroll_y - page_height * 2 - 256) * 1.01}px)`
  p_4_bg.style.transform = `translateY(${(scroll_y - page_height * 3 - 384) * 1.01}px)`


  if (
    scroll_y >=
    page_height + 128 - window.innerHeight / 4
  ) {
    img_in(p_2_miku)
    img_in(p_1_img_box)
  }
  if (
    scroll_y >=
    page_height * 2 + 256 - window.innerHeight / 4
  ) {
    img_in(p_3_miku)
  }
  if (
    scroll_y >=
    page_height * 3 + 384 - window.innerHeight / 4
  ) {
    img_in(p_4_miku)
  }
  for (let index = 0; index < sentence_box.length; index++) {
    const el = sentence_box[index];
    if (
      scroll_y >=
      page_height * (index + 1) + 128 * (index + 1) - window.innerHeight / 4
    ) {
      sentence_in(el)
    }
  }
  // p_1_bg.style.transform = ``
}
const img_in = (d) => {
  d.classList.remove('f_img')
  if (!d.classList.contains('hello_miku')) {
    d.classList.add('img_in')
    d.classList.add('hello_miku')
  }
  if (d.classList.contains('hello_miku')) {
    setTimeout(() => {
      d.classList.remove('img_in')
      d.classList.add('move')
    }, 2500)
  }
}
const sentence_in = (d) => {
  if (!d.classList.contains('text_animation')) {
    d.classList.add('text_animation')
  }

}
const init_miku = () => {

  if (p_1_bg == null) {
    p_1_bg = document.querySelector('.p_1_bg img')
  } else {
    return
  }
  if (p_2_bg == null) {
    p_2_bg = document.querySelector('.p_2_bg img')
  }
  if (p_3_bg == null) {
    p_3_bg = document.querySelector('.p_3_bg img')
  }
  if (p_4_bg == null) {
    p_4_bg = document.querySelector('.p_4_bg img')
  }
  if (page_height == null) {
    page_height = document.querySelector('.p_1').getBoundingClientRect().height;
  }
  if (p_1_img_box == null) {
    p_1_img_box = document.querySelector('.p_1_img_box')
  }
  if (p_2_miku == null) {
    p_2_miku = document.querySelector('.p_2_miku')
  }

  if (p_3_miku == null) {
    p_3_miku = document.querySelector('.p_3_miku')
  }

  if (p_4_miku == null) {
    p_4_miku = document.querySelector('.p_4_miku')
  }
  if (sentence_box == null) {
    sentence_box = document.querySelectorAll('.sentence_box')
  }
}
const scroll_handle = () => {
  update_page()

};


const sentence = [
  {
    title: '',
    data: ['失去的东西',
      '其实从来未曾真正地属于你',
      '也不必惋惜',
    ]
  },
  {
    title: '',
    data: ['我真想拉起你的手',
      '逃向初晴的天空和田野',
      '不畏缩也不回顾'
    ],
  },
  {
    title: '',
    data: ['我们短暂交错',
      '尾声潮落',
      '致敬这场遇见',
    ],
  },
]
</script>
<template>
  <div id="about_main" class="r">
    <div class="p_1 r page">
      <div class="a baaner" style="color: #008b8b;">HATSUNE MIKU MAGICAL MIRAI 2024</div>
      <div class="a miku_logo"><img src="https://pic.imgdb.cn/item/66842cd2d9c307b7e9ab00c7.png" alt=""></div>

      <div class="a p_1_bg page_bg">
        <img class="a" src="https://pic.imgdb.cn/item/668256a0d9c307b7e9813316.png" alt="">
      </div>
      <div class="a p_1_img_box f_img">
        <img class=" p_1_miku   a" src="https://pic.imgdb.cn/item/66821632d9c307b7e91e444c.png" alt="">
        <!-- <div class="p_1_miku_shadow a"></div> -->
        <img class=" p_1_img_1   a" src="https://pic.imgdb.cn/item/66825224d9c307b7e9792946.png" alt="">
        <img class=" p_1_img_2   a" src="https://pic.imgdb.cn/item/66825350d9c307b7e97afded.png" alt="">
        <img class=" p_1_img_3   a" src="https://pic.imgdb.cn/item/668253c8d9c307b7e97bb45d.png" alt="">
        <img class=" p_1_img_4   a" src="https://pic.imgdb.cn/item/6682543cd9c307b7e97d1945.png" alt="">
      </div>
      <div class="word_box img_in a f f_d_c">
        <span class="common">TINY</span>
        <span class="common">FLOWERS</span>
      </div>

    </div>
    <div class="p_2 r f f_d_r page">
      <div class="a baaner" style="color: #101a5c;">HATSUNE MIKU MAGICAL MIRAI 2020</div>
      <div class="a miku_logo"><img src="/src/assets/imgs/miku_2022_2.svg" alt=""></div>

      <div class="a p_2_bg page_bg"><img class="a" src="https://pic.imgdb.cn/item/66823a44d9c307b7e9530dcd.png" alt="">
      </div>
      <div class="a sentence_box" style="right: 48px;">
        <div class="a sentence f f_d_c" style="color: #101a5c;">
          <span v-for="text in sentence[0].data">{{ text }}</span>
        </div>
      </div>
      <img class="a p_2_miku f_img " src="https://pic.imgdb.cn/item/6682ea78d9c307b7e9791a4e.png" alt="">
    </div>
    <div class="p_3 r f f_d_r page">
      <div class="a baaner" style="color: #fff;">HATSUNE MIKU MAGICAL MIRAI 2019</div>
      <div class="a miku_logo"><img src="/src/assets/imgs/miku_2019.svg" alt=""></div>
      <div class="a p_3_bg page_bg">
        <img class="a" src="https://pic.imgdb.cn/item/6684b711d9c307b7e9593045.png" alt="">

      </div>
      <div class="a sentence_box" style="left: 198px;">
        <div class="a sentence f f_d_c" style="color: #fff;">
          <span v-for="text in sentence[1].data">{{ text }}</span>
        </div>
      </div>
      <img class="a p_3_miku f_img" src="https://pic.imgdb.cn/item/6684b1c2d9c307b7e9507914.png" alt="">

    </div>
    <div class="p_4 r f f_d_r page">
      <div class="a baaner" style="color: #ff387d;">HATSUNE MIKU MAGICAL MIRAI 2020</div>
      <div class="a miku_logo"><img src="/src/assets/imgs/miku_2022.svg" alt=""></div>
      <div class="a p_4_bg page_bg">
        <img class="a" src="https://pic.imgdb.cn/item/66823f67d9c307b7e95bb047.png" alt="">

      </div>
      <div class="a sentence_box" style="right: 8px;">
        <div class="a sentence f f_d_c" style="color: #ff387d;">
          <span v-for="text in sentence[2].data">{{ text }}</span>
        </div>
      </div>
      <img class="a p_4_miku f_img " src="https://pic.imgdb.cn/item/6682ea1cd9c307b7e978b14a.png" alt="">
    </div>


  </div>
  <!-- <div
    class="about_foot  r f f_d_r a_c j_c_c"
  >
    <div class="left_foot f f_d_c j_c_c">
      <span class="title_foot">人生格言</span>
      <span class="text_foot" v-html="user_store.aphorism"></span>
    </div>
    <div class="mid_foot f f_d_c">
      <span class="title_foot"></span>
    </div>
    <div class="right_foot f f_d_c j_c_c">
      <span class="title_foot">联系我</span>
      <span class="text_foot">邮箱: {{ user_store.e_mail }}</span>
      <span class="text_foot"
        >GitHub Account: {{ user_store.github_account }}</span
      >
      <span class="text_foot">小红书ID: {{ user_store.red_book_ID }}</span>
    </div>
  </div> -->
</template>
<style lang="scss" scoped>
$p_1_height_append: var(--p_1_height_append, 50vh);

@font-face {
  font-family: "AlloyInk";
  src: url("/src/assets/font/AlloyInk.otf");
}



#about_main {
  width: 100vw;
  font-family: "misans";
  // scroll-snap-type: y mandatory;
  color: $fill_primary;

  // &::after{
  //   width: 100vw;
  //   height: 100vh;
  //   content: '';
  //   position: fixed;
  //   background:#fff;
  //   z-index: -1;
  //   top: 0;
  // }
  .p_1 {


    background-size: cover;
    background-position: center center;

    z-index: 1;

    background-attachment: fixed;


    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);


    .p_1_img_box {
      width: 100vw;
      height: calc(100vh + $p_1_height_append);

    }

    .p_1_img_1 {
      width: 360px;
      height: 309px;
      top: -45px;
      left: -10px;
    }

    .p_1_img_2 {
      width: 360px;
      height: 322px;
      top: -115px;
      right: 0;
    }

    .p_1_img_3 {
      width: 400px;
      height: 388px;
      bottom: calc(-185px + $p_1_height_append);
      right: 5%;
    }

    .p_1_img_4 {
      width: 260px;
      height: 272px;
      bottom: calc(-130px + $p_1_height_append);
      left: 7%;

    }

    .p_1_miku {
      width: 1000px;
      right: -98px;
      object-fit: cover;
      z-index: 1;
      filter: drop-shadow(0 0 5px #2d7c9d);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    }

    //     .p_1_miku_shadow{
    //         width: 1000px;
    //         height: 1320px;
    //         right: -110px;
    //         top: 1030px;
    //         transform: rotate(180deg) rotateY(180deg);
    //         opacity: .3;
    //         mask-image: radial-gradient(black , transparent 60%);

    //         background: url(https://pic.imgdb.cn/item/66821632d9c307b7e91e444c.png) no-repeat ;
    //         -webkit-clip-path: polygon(0 70%, 100% 70%, 100% 100%, 0% 100%);
    // clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0% 100%);
    // clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0% 100%);
    //       }
    .word_box {
      left: 128px;
      top: 20%;
      gap: 32px;


      .common {
        font-size: 8em;
        font-weight: 900;
        line-height: 1em;
        color: $fill_primary;
        font-family: 'AlloyInk';
        color: transparent;
        background: repeating-radial-gradient(circle at 0 0, #1e95ba 10px, #1e95ba 20px, #419cb7 30px, #419cb7 10px);

        background-clip: text;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        text-shadow: 0px 0px 5px color-mix(in srgb, $primary_mix_9 60%, transparent 40%);

      }

    }


  }

  .p_2 {
    background-size: cover;
    background-position: center center;
    padding-top: 128px;
    background-attachment: fixed;

    .p_2_miku {
      width: 1000px;
      left: -98px;
      top: 0px;
      object-fit: cover;
      filter: drop-shadow(0 0 5px #101a5c);

    }

  }

  .p_3 {

    padding-top: 128px;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;

    .p_3_img_box {
      width: 100vw;
      height: calc(100vh + $p_1_height_append);



    }

    .p_3_miku {
      width: 1000px;
      right: -108px;
      height: 1100px;
      top: 0;
      object-position: center 90px;
      object-fit: contain;
      z-index: 1;
      filter: drop-shadow(0 0 10px #2e2e2b);

    }
  }

  .p_4 {

    padding-top: 128px;
    background-size: cover;
    background-position: center center;
    background-attachment: fixed;

    .p_4_miku {
      width: 1000px;
      left: -198px;
      top: 0px;
      height: 1400px;
      object-position: center 32px;
      object-fit: contain;
      filter: drop-shadow(0 0 5px #ff387d);
    }
  }


}

.page {
  background: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(https://pic.imgdb.cn/item/66843738d9c307b7e9bffc2d.png);

  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  height: calc(100vh + $p_1_height_append);
  background-color: #fff;

  &:nth-child(even) {
    .page_bg {
      clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);
      -webkit-clip-path: polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);

    }
  }

  &:nth-child(odd) {
    .page_bg {

      -webkit-clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
      clip-path: polygon(100% 0%, 75% 50%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
    }
  }

  .sentence_box {
    z-index: 11;
    width: 600px;
    font-weight: 700;
    opacity: 0;
    //color: #;
    // color: #;
    top: 30%;
    transform: translateY(-50%);
    font-size: 32px;

    .sentence {
      gap: 8px;

    }
  }
}

.baaner {
  width: 100vw;
  top: 800px;
  z-index: 11;
  left: 32px;
  font-size: 20px;
}

.miku_logo {
  width: 200px;
  top: 58%;
  z-index: 100;
  right: 32px;
  opacity: .8;

  img {
    width: 200px;
    object-fit: cover;

  }
}

.page_bg {
  width: 100vw;
  height: calc(100vh + $p_1_height_append);
  object-position: 0 0;
  &::after {

    content: '';
    position: absolute;
    width: 100vw;
    height: calc(100vh + $p_1_height_append);
    background: linear-gradient(to top, #0b0b0c25 1%, transparent);

  }

  // &:hover{
  //   filter: brightness(70%);
  // }
  img {
    z-index: -2;
    width: 100vw;
    height: calc(100vh + $p_1_height_append);
    object-fit: cover;
  }
}

@keyframes p_1 {
  0% {
    transform: rotateY(-90deg);
  }

  100% {
    transform: rotateY(0deg);
  }
}

@keyframes img_in {
  0% {
    opacity: 0;
    transform: translateY(80px);
  }

  60% {
    opacity: 1;
  }

  80% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 1;
    transform: translate(0);
  }
}

@keyframes img_move {
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  50% {
    opacity: 1;
    transform: translateY(30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

.move {
  animation: img_move 6s ease-in-out infinite;
}

.img_in {
  animation: img_in 1.5s ease forwards;

}

.f_img {
  opacity: 0;
  z-index: 10;
}

.about_foot {

  width: 100vw;
  height: 200px;
  gap: 16px;
  z-index: 1;
  color: #ffff;
  background: #132c33;

  .title_foot {
    font-size: 16px;
  }

  .text_foot {
    font-size: 14px;
    font-weight: 700;
  }

  .left_foot {
    width: 300px;
    height: 152px;
    gap: 8px;
    line-height: 26px;
  }

  .mid_foot {
    width: 300px;
    height: 152px;
  }

  .right_foot {
    width: 300px;
    height: 152px;
    gap: 8px;
    line-height: 22px;
  }
}

.text_animation {
  text-align: center;
  animation: text_animation 2s cubic-bezier(0.075, 0.82, 0.165, 1) both;
}

@keyframes text_animation {
  from {
    opacity: 1;
    letter-spacing: -50px;
    filter: blur(10px);
  }

  to {
    opacity: 1;
    letter-spacing: 5px;
    filter: blur(0);
  }
}
</style>