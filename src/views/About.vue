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
let p_3_img_box = null
let p_4_miku = null
let p_1_bg = null
let p_2_bg = null
let p_3_bg = null
let p_4_bg = null
// let p_1_bg = null
let page_height = null
const update_page = () => {

  init_miku()
  const scroll_y = window.scrollY;
  p_1_img_box.style.top = `-${scroll_y / 2}px`
  p_2_miku.style.top = `-${(scroll_y - page_height - 128) / 2}px`
  p_3_img_box.style.top = `-${(scroll_y - page_height * 2 - 256) / 2}px`
  p_4_miku.style.top = `-${(scroll_y - page_height * 3 - 384) / 2}px`
  p_1_bg.style.objectPosition = `0 ${scroll_y * 1.1}px`
  p_2_bg.style.objectPosition = `0 ${(scroll_y - page_height - 128) * 1.1}px`
  p_3_bg.style.objectPosition = `0 ${(scroll_y - page_height * 2 - 256) * 1.1}px`
  p_4_bg.style.objectPosition = `0 ${(scroll_y - page_height * 3 - 384) * 1.1}px`

  // if (
  //   scroll_y >= 0
  // ) {
  //   } else {img_out(p_1_img_box)}
  if (
    scroll_y >=
    page_height + 128 - window.innerHeight / 4
  ) {
    img_in(p_2_miku)
  }
  if (
    scroll_y >=
    page_height * 2 + 256 - window.innerHeight / 4
  ) {
    img_in(p_3_img_box)
  }
  if (
    scroll_y >=
    page_height * 3 + 384 - window.innerHeight / 4
  ) {
    img_in(p_4_miku)
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
const img_out = (d) => {
  if (d.classList.contains('img_in')) {
    d.classList.remove('img_in')
    d.classList.remove('move')
  }
  d.classList.add('f_img')
}
const init_miku = () => {

  if (p_1_bg == null) {
    p_1_bg = document.querySelector('.p_1_bg')
  }
  if (p_2_bg == null) {
    p_2_bg = document.querySelector('.p_2_bg')
  }
  if (p_3_bg == null) {
    p_3_bg = document.querySelector('.p_3_bg')
  }
  if (p_4_bg == null) {
    p_4_bg = document.querySelector('.p_4_bg')
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
  if (p_3_img_box == null) {
    p_3_img_box = document.querySelector('.p_3_img_box')
  }
  if (p_4_miku == null) {
    p_4_miku = document.querySelector('.p_4_miku')
  }
}
const scroll_handle = () => {
  update_page()

};



</script>
<template>
  <div id="about_main" class="r">
    <div class="p_1 r page">
      <img class="a p_1_bg page_bg" src="https://pic.imgdb.cn/item/668256a0d9c307b7e9813316.png" alt="">
      <div class="a p_1_img_box f_img">
        <img class=" p_1_miku   a" src="https://pic.imgdb.cn/item/66821632d9c307b7e91e444c.png" alt="">
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
      <img class="a p_2_bg page_bg" src="https://pic.imgdb.cn/item/66823a44d9c307b7e9530dcd.png" alt="">
      <img class="a p_2_miku f_img " src="https://pic.imgdb.cn/item/6682ea78d9c307b7e9791a4e.png" alt="">
    </div>
    <div class="p_3 r f f_d_r page">
      <img class="a p_3_bg page_bg" src="https://pic.imgdb.cn/item/66823d91d9c307b7e958faeb.png" alt="">
      <div class="a p_3_img_box f_img">
        <img class="a p_3_miku " src="https://pic.imgdb.cn/item/66823b69d9c307b7e95518e1.png" alt="">
        <img class="p_3_img_1 a" src="https://pic.imgdb.cn/item/6682e786d9c307b7e9758a13.png" alt="">
        <img class="p_3_img_2 a" src="https://pic.imgdb.cn/item/6682e5f9d9c307b7e973942a.png" alt="">
      </div>
    </div>
    <div class="p_4 r f f_d_r page">
      <img class="a p_4_bg page_bg" src="https://pic.imgdb.cn/item/66823f67d9c307b7e95bb047.png" alt="">
      <img class="a p_4_miku f_img " src="https://pic.imgdb.cn/item/6682ea1cd9c307b7e978b14a.png" alt="">
    </div>


  </div>
</template>
<style lang="scss" scoped>
$p_1_height_append: var(--p_1_height_append, 50vh);

@font-face {
  font-family: "AlloyInk";
  src: url("/src/assets/font/AlloyInk.otf");
}
html{
  background: red;
}
#about_main {
  width: 100vw;
  height: 100vh;
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


    background-image: url();
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
      filter: drop-shadow(0 0 5px $fill_shadow);
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }


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
    // background-image: url(https://pic.imgdb.cn/item/66823a44d9c307b7e9530dcd.png);
    background-size: cover;
    background-position: center center;
    margin-top: 128px;
    background-attachment: fixed;

    .p_2_miku {
      width: 1000px;
      left: -98px;
      top: 0px;
      object-fit: cover;
      filter: drop-shadow(0 0 5px $fill_shadow);

    }

  }

  .p_3 {
    // background-image: url(https://pic.imgdb.cn/item/66823d91d9c307b7e958faeb.png);
    background-size: cover;
    background-position: center center;
    margin-top: 128px;

    background-attachment: fixed;

    .p_3_img_box {
      width: 100vw;
      height: calc(100vh + $p_1_height_append);

      .p_3_img_1 {
        left: -618px;
        top: -600px;
        transform: scale(.4);
      }
      .p_3_img_2 {
        left: 68px;
        top: 32px;
      }
    }

    .p_3_miku {
      width: 1200px;
      right: -298px;
      top: 0px;
      object-fit: cover;
      filter: drop-shadow(0 0 5px $fill_shadow);
    }
  }

  .p_4 {
    // background-image: url(https://pic.imgdb.cn/item/66823f67d9c307b7e95bb047.png);
    background-size: cover;
    background-position: center center;
    margin-top: 128px;

    background-attachment: fixed;

    .p_4_miku {
      width: 1000px;
      left: -198px;
      top: 0px;
      object-fit: cover;
      filter: drop-shadow(0 0 5px $fill_shadow);
    }
  }


}

.page {

  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
  height: calc(100vh + $p_1_height_append);
  
}

.page_bg {
  width: 100vw;
  height: calc(100vh + $p_1_height_append);
  object-fit: cover;
  object-position: 0 0;
  filter: brightness(70%);
  -webkit-clip-path: polygon(0 22%, 100% 0, 100% 78%, 0 100%);
  clip-path: polygon(0 22%, 100% 0, 100% 78%, 0 100%);
  
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
}
</style>
