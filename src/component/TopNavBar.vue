<!-- @Author: LT -->
<!-- @Date: 2024-01-05 16:55:59 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  ref,
  onBeforeMount,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia'
const router = useRouter();
import { useThemeStore } from "../store/theme";
const theme_store = useThemeStore();

const {current_theme} = storeToRefs(theme_store)
onBeforeMount(() => {});
onMounted(() => {
  document.addEventListener("scroll", nav_handle);
  top_nav_main  = document.querySelector("#top_nav_main");
  content_bg  = document.querySelector(".content_bg");
});
onUnmounted(() => {
  document.removeEventListener("scroll", nav_handle);
});

let top_nav_main;
let content_bg;
const nav_handle = () => {
  let wScrY = window.scrollY;
  let sl=-Math.max(document.body.scrollLeft,document.documentElement.scrollLeft);
  top_nav_main.style.left=sl+'px';
  if(wScrY < 70){
    content_bg.style.opacity = 0;
  }else{
    content_bg.style.opacity = .8;
  }
};

const nav_list = [
  {
    index: 0,
    name: "主页",
    e_name: "home",
    path: "/home",
  },
  {
    index: 1,
    name: "笔记",
    e_name: "note",
    path: "/note/1",
  },
  {
    index: 2,
    name: "数学",
    e_name: "math",
    path: "/math/1",
  },
  {
    index: 3,
    name: "文章",
    e_name: "article",
    path: "/article/list/all/1",
  },
  {
    index: 4,
    name: "关于",
    e_name: "about",
    path: "/about",
  },
  {
    index: 5,
    name: "网站导航",
    e_name: "siteNav",
    path: "/siteNav",
  },
  {
    index: 6,
    name: "更新日志",
    e_name: "updateLog",
    path: "/updateLog",
  },
];
const active_item = ref();
const pre_active_item = ref(-1);
const theme_btn_nav_item = (index) => {
  const nav_list_item = document.querySelectorAll(".nav_item_com");
  nav_list_item[index].classList.add("nav_item_active");
  if (nav_list_item[index].classList.contains("nav_item")) {
    nav_list_item[index].classList.remove("nav_item");
  }
  pre_active_item.value = index;
};
const theme_btn_nav_active = () => {
  const nav_list_item = document.querySelectorAll(".nav_item_com");
  if (pre_active_item.value != -1) {
    nav_list_item[pre_active_item.value].classList.remove("nav_item_active");
    nav_list_item[pre_active_item.value].classList.add("nav_item");
  }
  nextTick(() => {
    for (const item of nav_list) {
      if (active_item.value == item.e_name) {
        theme_btn_nav_item(item.index);
        break;
      }
    }
  });
};
watch(
  () => router.currentRoute.value.path,
  (to) => {
    active_item.value =
      to.split("/")[1] != null && to.split("/")[1] != undefined
        ? to.split("/")[1]
        : "home";
    theme_btn_nav_active();
  },
  { immediate: true, deep: true }
);
const link_to = (path) => {
  router.push(path);
};
const mobile_link_to = (path)=>{
  router.push(path);
  switch_nav_list()
}

const temp_theme = ref();
const theme_change = () => {
  temp_theme.value = theme_store.current_theme;
  const t_d  = document.querySelector('.t_d')
  if(t_d.classList.contains('t_d_o')){
    t_d.classList.remove('t_d_o')
    t_d.classList.add('t_d_i')
  }else{
    t_d.classList.add('t_d_i')
  }
};
const colose_theme_dialog = ()=>{
  theme_store.current_theme = temp_theme.value
  theme_store.change_theme(parseInt(theme_store.current_theme.slice('?')[0]),parseInt(theme_store.current_theme.slice('?')[2]))
  const t_d  = document.querySelector('.t_d')
  if(t_d.classList.contains('t_d_i')){
    t_d.classList.remove('t_d_i')
    t_d.classList.add('t_d_o')
  }else{
    t_d.classList.add('t_d_o')
  }
}
const gradientBackground = (c1,c2)=> {
      return `linear-gradient(to right,${c1} 50%, ${c2} 50%)`;
    }
const change_color = (model,index)=>{
  current_theme.value = `${model}?${index}`
  theme_store.change_theme(model,index)
}
const enture_btn = ()=>{
  const t_d  = document.querySelector('.t_d')
  if(t_d.classList.contains('t_d_i')){
    t_d.classList.remove('t_d_i')
    t_d.classList.add('t_d_o')
  }else{
    t_d.classList.add('t_d_o')
  }
}

const show_nav_list_flag = ref(false)
const switch_nav_list = ()=>{
  show_nav_list_flag.value = !show_nav_list_flag.value
  let nav_icon = document.querySelector('#nav_icon')
  let nav_list_box = document.querySelector('.nav_list_box')
  if(show_nav_list_flag.value){
    nav_icon.classList.add('open')
    if(nav_list_box.classList.contains('w_o')){
      nav_list_box.classList.remove('w_o')
      nav_list_box.classList.add('w_i')
  }else{
    nav_list_box.classList.add('w_i')
  }  
  }else{
     nav_icon.classList.remove('open')
    if(nav_list_box.classList.contains('w_i')){
      nav_list_box.classList.remove('w_i')
      nav_list_box.classList.add('w_o')
  }else{
    nav_list_box.classList.add('w_o')
  }
  }
}
</script>
<template>
  <div id="top_nav_main">
  <div class="pc f a_c j_c_c">
    <div class="t_d f a_c j_c_c">
      <svg @click="colose_theme_dialog" t="1719266118700" class="close_icon a" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5087" width="48" height="48"><path d="M589.704 501.674L998.27 93.107c20.652-20.653 20.652-54.556 0-75.209l-2.237-2.237c-20.652-20.652-54.556-20.652-75.208 0L512.258 424.745 103.691 15.489c-20.652-20.652-54.556-20.652-75.208 0l-2.238 2.237c-21.168 20.652-21.168 54.556 0 75.208l408.568 408.74L26.245 910.24c-20.652 20.652-20.652 54.556 0 75.208l2.238 2.238c20.652 20.652 54.556 20.652 75.208 0l408.567-408.568 408.568 408.568c20.652 20.652 54.556 20.652 75.208 0l2.237-2.238c20.652-20.652 20.652-54.556 0-75.208L589.704 501.674z" fill="#2C2C2C" p-id="5088"></path></svg>
      <div class="theme_box f f_d_c">
        <h3>主题</h3>
        <h4>light:</h4>
        <div class="light_box f f_d_r">
          <div v-for="(item,index) in theme_store.light" class="color_item  f a_c f_d_c">
            <div 
            @click="change_color(0,index)"
            :style="{background:gradientBackground(item.color_dict.get('primary'),item.color_dict.get('fill_body'))}"
            :class="['color','r',current_theme == `0?${index}` ? 'active_color':'']" 
             >
            </div>
            <div >{{ item.theme_name }}</div>
          </div>
        </div>
        <h4>dark:</h4>
        <div class="dark_box f f_d_r">
          <div v-for="(item,index) in theme_store.dark" class="color_item  f a_c f_d_c">
            <div 
            @click="change_color(1,index)"
            :style="{background:gradientBackground(item.color_dict.get('primary'),item.color_dict.get('fill_body'))}"
            :class="['color','r',current_theme == `1?${index}` ? 'active_color':'']" 
             >
            </div>
            <div >{{ item.theme_name }}</div>
          </div>
        </div>
        <button 
        @click="enture_btn"
        class="ensure_theme_btn">更换主题</button>
      </div>
    </div>
    <div class="content f f_d_r r">
      <div class="content_bg a"></div>
    <div class="a stave f f_d_c">
      <div v-for="item in 5" :key="item" class="stave_line"></div>
    </div>
      <div
        class="a nav_box f f_d_r justify_content_space_between"
      >
        <div class="f f_d_r justify_content_space_around">
          <div class="logo f a_c j_c_c"
          @click="link_to(nav_list[0].path)"
          >
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" viewBox="0 0 200 200" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs"><path fill="url(&quot;#SvgjsLinearGradient1232&quot;)" fill-rule="evenodd" d="M99.994 183.711C106.781 191.856 113.567 200 127.14 200c31.244 0 40.269-41.556 40.281-72.844 0-13.572 8.144-20.358 16.289-27.144C191.855 93.225 200 86.439 200 72.868c0-31.254-41.616-40.29-72.849-40.29-13.572 0-20.359-8.145-27.145-16.29C93.219 8.145 86.433 0 72.86 0 41.605 0 32.568 41.614 32.568 72.844c0 13.573-8.142 20.359-16.284 27.145C8.142 106.775 0 113.56 0 127.132c0 31.253 41.605 40.29 72.849 40.29 13.572 0 20.359 8.144 27.145 16.288ZM100 137c20.435 0 37-16.565 37-37 0-20.434-16.565-37-37-37-20.434 0-37 16.566-37 37 0 20.435 16.566 37 37 37Z" clip-rule="evenodd"></path><defs><linearGradient gradientTransform="rotate(0 0.5 0.5)" id="SvgjsLinearGradient1232"><stop stop-opacity=" 1" stop-color="rgba(105, 234, 203)" offset="0"></stop><stop stop-opacity=" 1" stop-color="rgba(234, 204, 248)" offset="0.48"></stop><stop stop-opacity=" 1" stop-color="rgba(249, 249, 249)" offset="1"></stop></linearGradient></defs></svg>
          </div>

          <ul class="nav_list f f_d_r">
            <li
              :key="item"
              class="nav_item nav_item_com f r f_d_r a_c"
              v-for="item in nav_list"
              @click="link_to(item.path)"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>

        <div class="f f_d_r">           
          <label class="theme_btn r" for="theme">
            <input
              id="theme"
              type="checkbox"
              @click="theme_change"
            />
            <span class="ex_circle a"></span>
          </label>
        </div>
      </div>
     
    </div>
  </div>
   <div class="mobile a_c">
    <div id="nav_icon" @click="switch_nav_list">
  <span></span>
  <span></span>
  <span></span>
    </div>
    <div class="fixed nav_list_box">
      <ul class="f f_d_c j_c_c">
        <li v-for="item in nav_list"
        @click="mobile_link_to(item.path)">
        {{ item.name }}
        </li>
      </ul>
    </div>
    
   </div>
  </div>
</template>
<style lang="scss" scoped>
$nav_item_len:7;

#top_nav_main {
  font-family: "misans";
  .mobile{
    display: none;
  }
  .pc{
    top: 16px;
    width: max(1440px,100vw);
    height: 60px;
    transition: all 3s cubic-bezier(0.075, 0.82, 0.165, 1);
    position: fixed;
  }
  .t_d{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: $primary;
    z-index: 1000000000000;
    clip-path: circle(0);
    .theme_box{
      width: 300px;
      min-height: 600px;
      background: $fill;
      border-radius: 10px;
      padding: 0 16px;
      color: $text;
      .color_item{
        
        .color{
          width: 62px;
          height: 62px;
          box-shadow: $fill_shadow 1px 2px 3px;
          background: rgb(255, 255, 255);
          margin-bottom: 8px;
          border-radius: 10px;
        }
        .active_color{
          &::after{
            content: '当前';
            text-align: center;
            line-height: 62px;
            font-weight: 900;
            color: $text;
            position: absolute;
            width: 62px;
            height: 62px;
            top: 0;
            left: 0;
          }
        }
        font-size: 14px;
      }
      .light_box{
        width: 284px;
        padding: 8px;
        border-radius: 10px;
        box-shadow: $fill_shadow 0 0 5px;
        gap: 12px;
        flex-wrap: wrap;
      }
      .dark_box{
        width: 284px;
        padding: 8px;
        border-radius: 10px;
        box-shadow: $fill_shadow 0 0 5px;
        flex-wrap: wrap;
        gap: 12px;
      }
      .ensure_theme_btn{
        margin-top: auto;
        margin-bottom: 16px;
        border-radius: 10px;
        border: $primary 2px solid;
        background: $fill_primary;
        color: $primary;
        height: 48px;
        transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
        &:hover,&:focus{
          color: $fill_primary;
          outline: 0;
          box-shadow: 0 0 40px 40px $primary inset;
        }
      }
    }
    .close_icon{
      right: 48px;
      top: 48px;
      path{
        fill: $fill_primary;
      }
    }
   
  }
  .t_d_o{
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) t_d_o both;
  }
  .t_d_i{
    animation: 2.5s cubic-bezier(.25, 1, .30, 1) t_d_i both;
  }
  @keyframes t_d_i {
  from {
    clip-path: circle(0% at 1000px);
  }
  to {
    clip-path: circle(150% at top right);
  }
}
  @keyframes t_d_o {
  from {
    clip-path: circle(125%);
  }
  to {
    clip-path: circle(0% at top right);
  }
}
  .content {
    width: max(1100px,60vw);
    z-index: 11;
    height: inherit;
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
   border-radius: 60px;
   .content_bg{
    background: $fill;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    opacity: 0;
    box-shadow: $fill_shadow 0 0 5px;
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
   }
    .nav_box {
      top: 50%;
      left:50%;
      width: max(1036px,60vw);
      transform: translate(-50%,-50%);
      .logo {
        .icon{
        transform: scale(.6);
        }
      }
      .nav_list {
        padding: 0;
        user-select: none;
        .nav_item_active {
          font-size: 14px;
          color: $primary;
          margin: 0 10px;
          font-weight: 900;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          &::after{
            width: 100%;
            height: 4px;
            content: '';
            position: absolute;
            background:$primary;
            top: -22px;
          }
        }
        .nav_item {
          font-size: 14px;
          color: $text_subtitle;
          font-weight: 900;
          margin: 0 10px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          cursor: pointer;
          &:hover {
            opacity: .5;
          }
        }
      }

      .theme_btn {
        font-size: 14px;
        margin: auto 0;
        margin-left: 128px;

        width: 3em;
        height: 3em;
      }

      .theme_btn input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .ex_circle {
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        transition: 0.4s;
        border-radius: 30px;
        &::before {
          position: absolute;
          content: "";
          height: 2.4em;
          width: 2.4em;
          border-radius: 20px;
          left: 0.3em;
          bottom: 0.3em;
          background: linear-gradient(to left,$primary 50%, $primary_mix_7 50%);
          transition: 0.4s;
        }
      }
    }
  }
}
@media (max-width: 600px) {
  #top_nav_main{
    .pc{
    display: none;
}
.mobile{
  width: 100vw;
  height: 44px;
  display: flex;
  padding: 0 10px;
  position: fixed;
  top: 0;
  background: $fill_primary;
}
#nav_icon{
  width: 36px;
  height: 24px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .5s ease-in-out;
  -moz-transition: .5s ease-in-out;
  -o-transition: .5s ease-in-out;
  transition: .5s ease-in-out;
  cursor: pointer;
  span{
    display: block;
  position: absolute;
  height: 3px;
  width: 100%;
  background: $primary;
  border-radius: 3px;
  opacity: 1;
  left: 0;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: .25s ease-in-out;
  -moz-transition: .25s ease-in-out;
  -o-transition: .25s ease-in-out;
  transition: .25s ease-in-out;
  &:nth-child(1){
    top: 0px;
  }
  &:nth-child(2){
    top: 8px;
  }
  &:nth-child(3){
    top: 16px;
  }
  }

}

  }
  .open{
  span{
    &:nth-child(1){
      top: 8px !important;
  -webkit-transform: rotate(135deg) !important;
  -moz-transform: rotate(135deg) !important;
  -o-transform: rotate(135deg) !important;
  transform: rotate(135deg) !important;
    }
    &:nth-child(2){
      opacity: 0 !important;
      left: -60px !important;
    }
    &:nth-child(3){
      top: 8px !important;
  -webkit-transform: rotate(-135deg) !important;
  -moz-transform: rotate(-135deg) !important;
  -o-transform: rotate(-135deg) !important;
  transform: rotate(-135deg) !important;
    }
  }
}
.nav_list_box{
  width: 100vw;
  height: calc(100vh - 44px);
  background: $primary;
  top: 44px;
  left: 0;
  clip-path: circle(0% at top left);

  ul{
    z-index: 11;
    margin:0;
    padding: 0;
    list-style: none;
    margin-left: 16px;
    gap: 16px;
    margin-top: 16px;
    li{
      cursor: pointer;
      color: $fill_primary;
      // @for $i from 1 to ($nav_item_len +1){
      //   &:nth-child(#{$i}){
      //     animation: to_top_fade_in 2s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
      //     animation-delay: #{$i/10}s;
      //   }
      // }
    }
  }
}
.w_i{
  animation: 2.5s cubic-bezier(.25, 1, .30, 1) w_i both;
}
.w_o{
  animation: 2.5s cubic-bezier(.25, 1, .30, 1) w_o both;

}
}
@keyframes to_top_fade_in {
  0%{
    opacity: 0;
    transform: translateY(32px);
  }100%{
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes w_i {
  from {
    clip-path: circle(0% at top left);
  }
  to {
    clip-path: circle(125%);
  }
}

@keyframes w_o{
  from {
    clip-path: circle(125%);
  }
  to {
    clip-path: circle(0% at top left);
  }

}


</style>
