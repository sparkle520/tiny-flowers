<!-- @Author: LT -->
<!-- @Date: 2024-02-01 16:03:40 -->
<!-- @Description:  -->

<script setup>
import {
  onBeforeMount,
  onMounted,
  ref,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user";
import { useTopicStore } from "../store/topic";
import HomeCarousel from "@/component/HomeCarousel.vue";
import { useThemeStore } from "../store/theme";



const theme_sotre = useThemeStore();
const topic_store = useTopicStore();
const user_store = useUserStore();
theme_sotre.$subscribe((mutation, state) => {
  change_theme(state.current_theme);
});
const router = useRouter();
onBeforeMount(() => {
  
});
onUnmounted(() => {
  document.removeEventListener("scroll", scroll_handle);
  clearInterval(notice_interval);
});
onMounted(() => {
  
  change_theme(theme_sotre.current_theme);
  window.scrollTo({ top: 0, behavior: "auto" });
  scroll_handle();
  document.addEventListener("scroll", scroll_handle);
  document.querySelector(".notice_text").innerText = notice[notice_index];
  init();
});

const scroll_handle = () => {
  
      requestAnimationFrame(page_two_handle);
 
};
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme.slice('?')[0] == '1') {
    document.querySelector('.page_1_bg_cover').style.opacity='1'
    document.querySelector('.page_1_circle').style.opacity='.8'
  } else {
    document.querySelector('.page_1_bg_cover').style.opacity='0'
    document.querySelector('.page_1_circle').style.opacity='1'
  }
};
let new_fade_item_list = null
let recommend_fade_item_list = null
let re_note_item = null
const go_to_next_page = () => {
  let width = document.querySelector('#home_main').getBoundingClientRect().width
  if(width < 600){
    window.scrollTo({ top: window.innerHeight - 44, behavior: "smooth" });
  }else{
    window.scrollTo({ top: window.innerHeight - 75, behavior: "smooth" });

  }
};
const page_two_handle = () => {
  let scroll_y = window.scrollY;
  let page_2_header = document.querySelector(".page_2_header");
  let page_2_nav_item = document.querySelectorAll(".page_2_nav_item");
  let home_nav_item = document.querySelectorAll(".home_nav_item");
  let home_carousel = document.querySelector(".page_content .home_carousel");
  let rect_list = document.querySelectorAll(
    ".page_top_box .rect_box .rect_item"
  );
  if(re_note_item == null){
    re_note_item = document.querySelectorAll(
    ".re_note_item"
  );
  }
  if(recommend_fade_item_list == null){
     recommend_fade_item_list = document.querySelectorAll(
    ".re_item"
  );
  }
  
  if(new_fade_item_list == null){
    new_fade_item_list = document.querySelectorAll(
    ".new_item_box .fade_item"
  );
  }
  
  if (
    scroll_y >=
    window.innerHeight + page_2_header.offsetTop - window.innerHeight / 1.2
  ) {
   
    r_o_a_i(page_2_header)

  } else {
    
    r_i_a_o(page_2_header)
  }
  if (
    scroll_y >=
    window.innerHeight + home_carousel.offsetTop - window.innerHeight / 1.2
  ) {r_o_a_i(home_carousel)} else {r_i_a_o(home_carousel)}
  for (let i = 0; i < rect_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight + rect_list[0].offsetTop - window.innerHeight / 1.2
    ) {
      setTimeout(() => {
        r_o_a_i( rect_list[i])
      }, (i+1) * 100);
    } else {
      setTimeout(() => {
        r_i_a_o(rect_list[i])
      }, (i+1) * 100);
    }
  }
  for (let i = 0; i < page_2_nav_item.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight +
        page_2_nav_item[0].offsetTop -
        window.innerHeight / 1.2
    ) {
      setTimeout(() => {
        r_o_a_i( page_2_nav_item[i])

      }, i * 100);
    } else {
      setTimeout(() => {
        r_i_a_o(page_2_nav_item[i])
      }, i * 100);
    }
  }
 
  for (let i = 0; i < recommend_fade_item_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight +
        recommend_fade_item_list[i].offsetTop -
        window.innerHeight / 1.2
    ) {
      r_o_a_i( recommend_fade_item_list[i])
    } else {
      r_i_a_o(recommend_fade_item_list[i])
    }
  }
  for (let i = 0; i < home_nav_item.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight + home_nav_item[i].offsetTop - window.innerHeight / 1.2
    ) {
      r_o_a_i( home_nav_item[i])

    } else {
      r_i_a_o(home_nav_item[i])

    }
  }
  for (let i = 0; i < re_note_item.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight + re_note_item[0].offsetTop - window.innerHeight / 1.2
    ) {
      setTimeout(() => {
        r_o_a_i( re_note_item[i])

      }, i * 100);
    } else {
      setTimeout(() => {
        r_i_a_o(re_note_item[i])

      }, i * 100);
    }
  }
  for (let i = 0; i < new_fade_item_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight +
        new_fade_item_list[i].offsetTop -
        window.innerHeight / 1.2
    ) {
      new_fade_item_list[i].style.transform = "translateX(0)";
      new_fade_item_list[i].style.opacity = 1;
    } else {
      if (i % 2 === 0) {
        new_fade_item_list[i].style.transform = "translateX(-48px)";
        new_fade_item_list[i].style.opacity = 0;
      } else {
        new_fade_item_list[i].style.transform = "translateX(48px)";
        new_fade_item_list[i].style.opacity = 0;
      }
    }
  }
};
//remove fade_out add fade_in
const r_o_a_i = (d)=>{
  if(d.classList.contains('fade_out')){
    d.classList.remove('fade_out')
    d.classList.add('fade_in')
  }
}
const r_i_a_o = (d)=>{
  if(d.classList.contains('fade_in')){
    d.classList.remove('fade_in')
    d.classList.add('fade_out')
  }
}
const notice = [
  "欢迎来到TinyFlowers🌷",
  "给湿润的天空绘上乾燥的色彩🏵️",
  "烟雾化作云朵 染上朝霞的颜色🌼",
  "如果闭上眼睛的话 能否再回到过去呢🌻",
  "从你的前前前世开始 我就一直在寻找你的踪迹👣"
];
const carousel_data = [
  { link: "https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg" },
  { link: "https://pic.imgdb.cn/item/65ba35e7871b83018ac84a5d.png" },
  { link: "https://pic.imgdb.cn/item/65a3e577871b83018a7ef617.jpg" },
  { link: "https://pic.imgdb.cn/item/65a6daad871b83018a885744.png" },
];
const re_note_list = ref([
  {
    id: 3,
    name: "线性代数",
    link: "/note/noteInfo/3",
    img: "https://pic.imgdb.cn/item/65e2eb629f345e8d031af15c.png",
    short_message: "线性代数是数学重要分支，在各学科中应用广泛.",
  },
  {
    id: 2,
    name: "高等数学",
    link: "/note/noteInfo/2",
    img: "https://pic.imgdb.cn/item/65e2edd59f345e8d0321db0d.png",
    short_message:
      "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科.",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "/note/noteInfo/1",
    img: "https://pic.imgdb.cn/item/65e2f0b89f345e8d0329f381.png",
    short_message: "概率论与数理统计是研究随机现象客观规律的数学学科.",
  },
  {
    id: 4,
    name: "MySQL高级篇",
    link: "/note/noteInfo/4",
    img: "https://pic.imgdb.cn/item/65f5d5bf9f345e8d03e639bd.png",
    short_message: "mysql高级教程,面向更高级的mysql.",
  },
]);
let notice_index = 0;
let notice_interval = setInterval(() => {
  const notice_text = document.querySelector(".notice_text");
  notice_index = (notice_index + 1) % notice.length;
  notice_text.innerText = notice[notice_index];
}, 8000);
const new_topic_list = ref([]);
const recommend_topic_list = ref([]);
const init = () => {
  new_topic_list.value = topic_store.get_all();
  recommend_topic_list.value = topic_store.get_all().slice(0, 4);
};

const go_to_by_path = (path) => {
  router.push(path);
};
const go_to = (path) => {
  window.open(path);
};
const enter_new_topic = (index) => {
  const item = document.querySelectorAll(".topic_item")[index];
  item.style.transform = "translateY(-8px)";
};
const leave_new_topic = (index) => {
  const item = document.querySelectorAll(".topic_item")[index];
  item.style.transform = "translateY(0)";
};

</script>
<template>
  <div id="home_main">
    <svg xmlns="http://www.w3.org/2000/svg" class="bg_shape" width="400" height="340"><path class="bg_shape_path" fill="#b399ff" d="M302.1365889531657,273.19508443432414C296.15187809393854,286.7899505495625,272.4500958262396,293.6740982055747,257.09399766737863,301.56919669142997C241.73789950851767,309.46429517728524,222.926574063567,325.3659245340324,210,320.5656753494559C197.073425936433,315.7654261648794,192.95133108259083,281.7824672030142,179.5345532859766,272.76770158397085C166.1177754893624,263.7529359649275,137.17483813460018,275.27169856585743,129.49933322031478,266.47708163519565C121.82382830602938,257.68246470453386,134.77484556693125,236.23906021519923,133.4815238002642,220C132.18820203359715,203.76093978480077,114.98895338263134,179.4395807063706,121.7394026203125,169.0427203440003C128.48985185799367,158.64585998162997,159.27411966307,164.3085295120519,173.98421922635123,157.6188378257781C188.69431878963246,150.92914613950427,198.19119090192632,128.56430683636188,209.99999999999997,128.90457022635732C221.80880909807362,129.24483361635276,236.1508139826239,149.49286098916429,244.83707381479317,159.66041816575077C253.52333364696244,169.82797534233725,254.09002749169088,179.85331631350132,262.1175589930156,189.9099132858762C270.14509049434037,199.96651025825108,286.33242449605007,206.11913814192533,293.0022628227417,220C299.6721011494334,233.88086185807467,308.12129981239286,259.6002183190858,302.1365889531657,273.19508443432414" stroke="none" stroke-width="3"/></svg>
    <svg xmlns="http://www.w3.org/2000/svg" class="bg_shape_2" width="400" height="340"><path class="bg_shape_path" fill="#b399ff" d="M276.1902270629109,302.99991947777875C263.2411727951601,312.92684752832906,219.83252515715526,287.4255974799391,196.40546071032813,279.56156830330195C172.978396263501,271.6975391266648,142.56023242029949,270.17226736784767,135.62784038194815,255.815744417956C128.6954483435968,241.45922146806436,145.39473945637428,212.44353331630845,154.81110848022007,193.42243060395194C164.22747750406586,174.40132789159543,172.77189769468353,149.99476477106265,192.12605452502294,141.6891281438169C211.48021135536234,133.38349151657115,257.2737608302882,130.53679886444704,270.93604946225656,143.58861084047754C284.5983380942249,156.64042281650805,273.22409005005716,193.4314485604498,274.0997863168329,220C274.9754825836086,246.5685514395502,289.1392813306617,293.07299142722843,276.1902270629109,302.99991947777875" stroke="none" stroke-width="3"/></svg>
    <div class="page_1  r f a_c j_c_c">
      <div class="page_1_bg_cover"></div>
     <img class="a page_1_bg"  src="https://pic.imgdb.cn/item/66748335d9c307b7e9cbb1f1.png" alt=""> 
     <svg class="page_1_circle a" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 1422 800"><defs><radialGradient id="cccircular-grad" r="50%" cx="50%" cy="50%">
       <stop class="page_1_circle_path_1" offset="0%" stop-color="##a393eb" stop-opacity="0.5"></stop>
       <stop class="page_1_circle_path_2" offset="50%" stop-color="#a393ebb3" stop-opacity="0"></stop>
        <stop class="page_1_circle_path_3" offset="100%" stop-color="#f9fff0" stop-opacity="0.5"></stop>
      </radialGradient></defs><g fill="url(#cccircular-grad)"><circle r="352" cx="711" cy="400"></circle><circle r="320" cx="711" cy="400"></circle><circle r="288" cx="711" cy="400"></circle><circle r="256" cx="711" cy="400"></circle><circle r="224" cx="711" cy="400"></circle><circle r="192" cx="711" cy="400"></circle><circle r="160" cx="711" cy="400"></circle><circle r="128" cx="711" cy="400"></circle><circle r="96" cx="711" cy="400"></circle><circle r="64" cx="711" cy="400"></circle></g></svg>
      <div
        class="page_1_title flex a f_d_c a_c j_c_c"
      >

        <div class="title_1 r f f_d_c a_c"
          ><img class="avatar" :src="user_store.avatar" alt="">
        <div class="title_1_text a">你好！我是 <span>{{user_store.name}}</span>，这里是我的博客。<br>
          主要分享自己日常学习的内容和感悟，写博客是为了和过去以及未来的自己对话。</div></div>
         
      </div>
      <svg
        t="1706806114679"
        @click="go_to_next_page"
        class="icon more a"
        viewBox="0 0 1664 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="6659"
        width="32"
        height="32"
      >
        <path
          d="M1560.32 103.68c-52.48-52.48-136.96-52.48-189.44 0L832 642.56 291.84 103.68C239.36 51.2 154.88 51.2 102.4 103.68c-52.48 52.48-52.48 136.96 0 189.44L730.88 921.6c26.88 26.88 64 39.68 99.84 38.4 35.84 1.28 72.96-10.24 101.12-38.4l628.48-628.48c52.48-52.48 52.48-138.24 0-189.44z"
          fill=""
          p-id="6660"
        ></path>
      </svg>
    </div>
    <div class="page_2 r">
      <div class="page_container f f_d_c">
        <div class="page_2_header fade_out">
          <div class="notice f f_d_r a_c">
            <svg
              t="1706870364802"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5227"
              width="28"
              height="28"
            >
              <path
                d="M319.905185 355.934815v304.355555H145.066667a7.585185 7.585185 0 0 1-7.585186-7.585185V363.52a7.585185 7.585185 0 0 1 7.585186-7.585185h174.838518m68.266667-68.266667H145.066667a75.851852 75.851852 0 0 0-75.851852 75.851852v289.185185a75.851852 75.851852 0 0 0 75.851852 75.851852h243.105185V287.668148z"
                fill="#5e63b6"
                p-id="5228"
              ></path>
              <path
                d="M632.414815 183.751111v638.482963l132.740741 60.112593V140.136296l-132.740741 43.614815z"
                fill="#a393eb"
                p-id="5229"
              ></path>
              <path
                d="M735.573333 157.582222v707.887408l-347.401481-178.631111V329.955556l347.401481-172.373334m30.340741-86.85037a37.925926 37.925926 0 0 0-15.54963 3.413333l-430.459259 213.522963v440.888889l430.459259 221.297778a37.925926 37.925926 0 0 0 53.665186-34.512593V108.657778a37.925926 37.925926 0 0 0-37.925926-37.925926z"
                fill="#5e63b6"
                p-id="5230"
              ></path>
              <path
                d="M878.933333 403.531852a7.585185 7.585185 0 0 1 7.585186 7.585185v204.8a7.585185 7.585185 0 0 1-7.585186 7.585185h-73.955555v-219.97037h73.955555m0-68.266667h-142.222222v356.503704h142.222222a75.851852 75.851852 0 0 0 75.851852-75.851852v-204.8a75.851852 75.851852 0 0 0-75.851852-75.851852zM251.638519 728.557037v135.395556a21.048889 21.048889 0 0 1-21.048889 21.048888h-14.411852a21.048889 21.048889 0 0 1-21.048889-21.048888v-135.395556h56.888889m68.266666-68.266667H126.672593v203.662223a89.315556 89.315556 0 0 0 89.315555 89.315555h14.411852a89.315556 89.315556 0 0 0 89.315556-89.315555V660.29037z"
                fill="#5e63b6"
                p-id="5231"
              ></path>
            </svg>
            <span class="notice_text"></span>
          </div>
        </div>
        <div
          class="page_content f f_d_r j_c_c"
        >
          <div class="page_mid f f_d_c">
            <div class="page_top_box f f_d_r">
              <HomeCarousel
                class="home_carousel fade_out"
                :data="carousel_data"
              ></HomeCarousel>
              <div class="rect_box">
                <div
                  @click="go_to('https://leetcode.cn/problemset/')"
                  class="rect_item fade_out rect_1 f a_c j_c_c r"
                >
                  <svg
                    t="1707152629827"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5116"
                    width="40"
                    height="40"
                  >
                    <path
                      d="M610.679467 749.3632a54.0672 54.0672 0 0 1 77.0048 0.1024c21.230933 21.504 21.162667 56.32-0.1024 77.789867l-94.583467 95.197866c-87.2448 87.825067-229.546667 89.088-318.2592 2.935467l-170.325333-168.379733c-86.698667-85.674667-95.368533-222.8224-13.755734-310.920534l152.098134-164.181333c80.9984-87.4496 230.263467-97.006933 322.833066-21.504l138.171734 112.64c23.415467 19.114667 27.067733 53.691733 8.192 77.346133-18.909867 23.620267-53.179733 27.306667-76.5952 8.226134l-138.171734-112.64c-48.401067-39.492267-133.12-34.065067-174.8992 11.0592l-152.132266 164.181333c-39.697067 42.9056-35.362133 111.957333 10.410666 157.218133l169.540267 167.594667a118.5792 118.5792 0 0 0 166.024533-1.467733l94.549334-95.232z"
                      fill="#ffeb5d"
                      p-id="5118"
                    ></path>
                    <path
                      d="M380.928 654.097067a54.715733 54.715733 0 0 1-54.442667-54.9888c0-30.378667 24.405333-54.9888 54.4768-54.9888h401.544534c30.071467 0 54.442667 24.576 54.442666 54.954666 0 30.378667-24.3712 55.022933-54.442666 55.022934H380.962133z"
                      fill="#b1acb3"
                      p-id="5119"
                    ></path>
                    <path
                      d="M456.157867 51.541333a54.0672 54.0672 0 0 1 76.970666-2.56c21.947733 20.718933 23.074133 55.534933 2.56 77.7216L170.1888 521.216c-39.7312 42.871467-35.396267 111.957333 10.376533 157.184l168.789334 166.843733c21.504 21.265067 21.845333 56.081067 0.8192 77.789867a54.0672 54.0672 0 0 1-76.970667 0.8192l-168.823467-166.877867c-86.698667-85.674667-95.3344-222.856533-13.7216-310.920533L456.157867 51.541333z"
                      fill="#000"
                      p-id="5120"
                    ></path>
                  </svg>
                  <span>leetcode</span>
                </div>
                <div
                  class="rect_item fade_out rect_2 f a_c j_c_c r"
                  @click="go_to('https://codeforces.com/')"
                >
                  <svg
                    t="1708621098260"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4204"
                    width="40"
                    height="40"
                  >
                    <path
                      d="M192 320a64 64 0 0 1 64 64v448a64 64 0 0 1-64 64H64c-35.296 0-64-28.672-64-64V384c0-35.328 28.704-64 64-64h128z m384-192a64 64 0 0 1 64 64v640a64 64 0 0 1-64 64h-128c-35.296 0-64-28.672-64-64V192c0-35.328 28.704-64 64-64h128z m384 320a64 64 0 0 1 64 64v320a64 64 0 0 1-64 64h-128a64 64 0 0 1-64-64V512a64 64 0 0 1 64-64h128z"
                      fill="#becbd3"
                      p-id="4205"
                    ></path>
                  </svg>
                  <span>codeforces</span>
                </div>
                <div
                  class="rect_item fade_out rect_3 f a_c j_c_c r"
                  @click="
                    go_to('https://github.com/sparkle520?tab=repositories')
                  "
                >
                  <svg
                    t="1711933909983"
                    class="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="4210"
                    width="52"
                    height="52"
                  >
                    <path
                      d="M512 0c-282.784 0-512 229.216-512 512s229.216 512 512 512 512-229.216 512-512-229.216-512-512-512zM816.064 816.064c-39.52 39.52-85.504 70.528-136.704 92.192-12.992 5.504-26.208 10.336-39.616 14.496l0-76.736c0-40.32-13.824-70.016-41.504-88.992 17.344-1.664 33.248-4 47.744-7.008s29.824-7.328 46.016-12.992 30.656-12.416 43.488-20.256 25.152-18.016 36.992-30.496 21.76-26.656 29.76-42.496 14.336-34.848 19.008-56.992 7.008-46.592 7.008-73.248c0-51.68-16.832-95.68-50.496-132 15.328-40 13.664-83.488-4.992-130.496l-12.512-1.504c-8.672-0.992-24.256 2.656-46.752 11.008s-47.744 22.016-75.744 40.992c-39.68-11.008-80.832-16.512-123.488-16.512-43.008 0-84 5.504-123.008 16.512-17.664-12-34.4-21.92-50.24-29.76s-28.512-13.152-38.016-16-18.336-4.576-26.496-5.248-13.408-0.832-15.744-0.512-4 0.672-4.992 0.992c-18.656 47.328-20.32 90.848-4.992 130.496-33.664 36.32-50.496 80.32-50.496 132 0 26.656 2.336 51.072 7.008 73.248s11.008 41.152 19.008 56.992 17.92 30.016 29.76 42.496 24.16 22.656 36.992 30.496 27.328 14.592 43.488 20.256 31.488 10.016 46.016 12.992 30.4 5.344 47.744 7.008c-27.328 18.656-40.992 48.32-40.992 88.992l0 78.24c-15.104-4.48-29.984-9.792-44.608-16-51.2-21.664-97.184-52.672-136.704-92.192s-70.528-85.504-92.192-136.704c-22.4-52.96-33.76-109.248-33.76-167.36s11.36-114.4 33.76-167.36c21.664-51.2 52.672-97.184 92.192-136.704s85.504-70.528 136.704-92.192c52.96-22.4 109.28-33.76 167.36-33.76s114.4 11.36 167.36 33.76c51.2 21.664 97.184 52.672 136.704 92.192s70.528 85.504 92.192 136.704c22.4 52.96 33.76 109.28 33.76 167.36s-11.36 114.4-33.76 167.36c-21.664 51.2-52.672 97.184-92.192 136.704z"
                      fill="#444444"
                      p-id="4211"
                    ></path>
                  </svg>
                  <span>github</span>
                </div>
                <div
                  class="rect_item fade_out rect_4 f a_c j_c_c r"
                  @click="go_to('https://www.bilibili.com/')"
                >
                  <svg
                    t="1711934195026"
                    class="icon"
                    viewBox="0 0 1069 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="11197"
                    width="42"
                    height="42"
                  >
                    <path
                      d="M868.93 171.112H697.817l77.535-77.535c13.369-13.368 13.369-32.084 0-45.452s-32.083-13.368-45.451 0L598.893 179.133H470.559L339.55 48.125c-10.695-13.368-26.736-16.041-42.778-8.02-2.674 0-2.674 2.673-5.347 5.347-13.369 13.368-13.369 32.083 0 45.451l80.208 80.21H200.522c-93.577 0-171.112 77.535-171.112 171.112v425.107c0 90.903 77.535 168.438 171.112 168.438h26.736c0 32.084 26.737 56.146 56.147 56.146s56.146-26.736 56.146-56.146h395.697c2.674 32.084 29.41 56.146 61.494 53.473 29.41-2.674 50.798-24.063 53.472-53.473h21.39c93.576 0 171.111-77.535 171.111-171.112V339.551c-2.673-93.577-80.208-168.439-173.785-168.439zM863.582 831.5H211.217c-34.757 0-61.494-29.41-64.167-64.167l-2.674-433.128c0-34.758 29.41-64.167 64.167-64.167H860.91c34.757 0 61.493 29.41 64.167 64.167l2.673 433.128c-2.673 37.43-29.41 64.167-64.167 64.167z"
                      fill="#fb77b4"
                      p-id="11198"
                    ></path>
                    <path
                      d="M422.433 417.086l16.042 80.209-213.89 40.104-16.042-80.208 213.89-40.105z m205.87 80.209l16.042-80.209 213.89 40.105-16.042 80.208-213.89-40.104z m42.778 168.439c0 2.673 0 8.02-2.674 10.694-13.368 29.41-42.778 48.126-77.535 50.8-21.389 0-42.778-10.695-56.146-26.737-16.042 16.042-34.757 26.736-56.146 26.736-32.084-2.673-61.494-21.389-77.536-50.799 0-2.673-2.673-5.347-2.673-10.694 0-10.695 8.02-18.716 18.715-21.39h2.674c8.02 0 13.368 2.674 16.042 10.695 0 0 21.389 29.41 40.104 29.41 37.43 0 37.43-32.083 58.82-56.146 24.063 26.736 24.063 56.146 58.82 56.146 24.062 0 40.104-29.41 40.104-29.41 2.674-5.347 10.695-10.694 16.042-10.694 10.694-2.674 18.715 5.347 21.389 16.041v5.348z"
                      fill="#fb77b4"
                      p-id="11199"
                    ></path>
                  </svg>
                  <span>bilibili</span>
                </div>
              </div>
            </div>
            <div
              class="page_2_nav_box f f_d_r a_c"
            >
              <div
                class="page_2_nav_item fade_out f a_c j_c_c"
                @click="router.push('/article/list/all/1')"
              >
                <svg
                  t="1708542076555"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="12144"
                  width="32"
                  height="32"
                >
                  <path
                    d="M61.44 61.44h901.12v901.12H61.44V61.44z"
                    fill="#202425"
                    opacity=".01"
                    p-id="12145"
                  ></path>
                  <path
                  class="primary_mix_6_path"

                    d="M661.504 362.496c0-65.536 53.248-120.832 120.832-120.832 65.536 0 120.832 53.248 120.832 120.832v481.28c0 32.768-26.624 59.392-59.392 59.392h-180.224V362.496h-2.048z"
                    fill="#7dace4"
                    p-id="12146"
                  ></path>
                  <path
                  class="primary_path"

                    d="M120.832 782.336c0 65.536 53.248 120.832 120.832 120.832h600.064c-32.768 0-59.392-26.624-59.392-59.392V241.664c0-65.536-53.248-120.832-120.832-120.832H241.664c-65.536 0-120.832 53.248-120.832 120.832v540.672z"
                    fill="#8971d0"
                    p-id="12147"
                  ></path>
                  <path
                  class="fill_primary_path"

                    d="M227.328 301.056c0-24.576 20.48-45.056 45.056-45.056h59.392c24.576 0 45.056 20.48 45.056 45.056 0 24.576-20.48 45.056-45.056 45.056h-59.392c-24.576 0-45.056-20.48-45.056-45.056zM227.328 481.28c0-24.576 20.48-45.056 45.056-45.056h360.448c24.576 0 45.056 20.48 45.056 45.056 0 24.576-20.48 45.056-45.056 45.056H272.384c-24.576 0-45.056-20.48-45.056-45.056zM272.384 616.448c-24.576 0-45.056 20.48-45.056 45.056 0 24.576 20.48 45.056 45.056 45.056h180.224c24.576 0 45.056-20.48 45.056-45.056 0-24.576-20.48-45.056-45.056-45.056h-180.224z"
                    fill="#ffff"
                    p-id="12148"
                  ></path></svg
                >文章
              </div>
              <div
                class="page_2_nav_item fade_out f a_c j_c_c"
                @click="router.push('/note/1')"
              >
                <svg
                  t="1708542274864"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="21520"
                  width="32"
                  height="32"
                >
                  <path
                  class="primary_path"

                    d="M242.688 311.936m-99.968 0a99.968 99.968 0 1 0 199.936 0 99.968 99.968 0 1 0-199.936 0Z"
                    fill="#8971d0"
                    p-id="21521"
                  ></path>
                  <path
                  class="primary_path"

                    d="M242.688 512m-99.968 0a99.968 99.968 0 1 0 199.936 0 99.968 99.968 0 1 0-199.936 0Z"
                    fill="#8971d0"
                    p-id="21522"
                  ></path>
                  <path
                  class="primary_path"

                    d="M242.688 712.064m-99.968 0a99.968 99.968 0 1 0 199.936 0 99.968 99.968 0 1 0-199.936 0Z"
                    fill="#8971d0"
                    p-id="21523"
                  ></path>
                  <path
                  class="fill_primary_path"

                    d="M247.808 311.936m-66.688 0a66.688 66.688 0 1 0 133.376 0 66.688 66.688 0 1 0-133.376 0Z"
                    fill="#FFFFFF"
                    p-id="21524"
                  ></path>
                  <path
                  class="fill_primary_path"

                    d="M247.808 512m-66.688 0a66.688 66.688 0 1 0 133.376 0 66.688 66.688 0 1 0-133.376 0Z"
                    fill="#FFFFFF"
                    p-id="21525"
                  ></path>
                  <path
                  class="fill_primary_path"

                    d="M247.808 712.064m-66.688 0a66.688 66.688 0 1 0 133.376 0 66.688 66.688 0 1 0-133.376 0Z"
                    fill="#FFFFFF"
                    p-id="21526"
                  ></path>
                  <path
                  class="primary_path"

                    d="M281.216 111.872h533.504c36.864 0 66.688 29.824 66.688 66.688v666.88c0 36.864-29.824 66.688-66.688 66.688H281.216c-36.864 0-66.688-29.824-66.688-66.688v-666.88c0-36.736 29.824-66.688 66.688-66.688z"
                    fill="#8971d0"
                    p-id="21527"
                  ></path>
                  <path
                  class="primary_path"

                    d="M814.592 678.656h66.688v166.656c0 36.864-29.824 66.688-66.688 66.688H581.248c0-128.768 104.448-233.344 233.344-233.344z"
                    fill="#8971d0"
                    p-id="21528"
                  ></path>
                  <path
                  class="fill_primary_path"
                    d="M409.472 278.656h333.44c18.432 0 33.28 14.976 33.28 33.28 0 18.432-14.976 33.28-33.28 33.28H409.472c-18.432 0-33.28-14.976-33.28-33.28-0.128-18.432 14.848-33.28 33.28-33.28zM409.472 478.72h333.44c18.432 0 33.28 14.976 33.28 33.28 0 18.432-14.976 33.28-33.28 33.28H409.472c-18.432 0-33.28-14.976-33.28-33.28-0.128-18.432 14.848-33.28 33.28-33.28zM409.472 678.656h166.656c18.432 0 33.28 14.976 33.28 33.28 0 18.432-14.976 33.28-33.28 33.28H409.472c-18.432 0-33.28-14.976-33.28-33.28-0.128-18.304 14.848-33.28 33.28-33.28z"
                    fill="#FFFFFF"
                    p-id="21529"
                  ></path>
                  <path
                  class="primary_path"

                    d="M848 745.344h33.28v99.968c0 36.864-29.824 66.688-66.688 66.688H681.216c0-92.032 74.624-166.656 166.784-166.656z"
                    fill="#8971d0"
                    p-id="21530"
                  ></path>
                </svg>
                笔记
              </div>
              <div
                class="page_2_nav_item fade_out f a_c j_c_c"
                @click="router.push('/math/1')"
              >
                <svg
                  t="1708542488255"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="33539"
                  width="32"
                  height="32"
                >
                  <path
                  class="primary_path"
                    d="M493.4656 529.1008l-20.6336-51.2512c-15.0016-36.1984-23.1936-55.808-24.5248-58.7776L416.4608 352.256c-22.528-47.872-44.2368-71.8848-65.024-71.8848-31.488 0-56.2176 27.7504-74.3424 83.1488-13.312-4.608-19.968-11.264-19.968-20.0704 0-25.7536 15.9232-55.3472 47.6672-88.6784C336.64 221.44 365.2096 204.8 390.4512 204.8c49.408 0 100.608 67.072 153.7536 201.216l13.568 33.0752 15.3088-23.04C667.2896 275.2 746.7008 204.8 811.3152 204.8c16.7936 0 36.5056 4.608 59.0848 13.7216l-80.384 79.36a101.12 101.12 0 0 0-22.6304-4.352c-48.64 0-106.7008 52.736-173.9776 158.1056l-19.2512 30.4128 15.2064 38.3488c58.2144 151.296 105.984 226.8672 143.872 226.8672 34.7136 0 61.184-23.3472 79.4112-69.9904 12.3904 7.5264 18.5856 15.2064 18.5856 23.1424 0 20.8896-17.664 45.8752-53.0944 75.008-35.4304 29.184-65.8944 43.776-91.5968 43.776-51.3536 0-103.7312-68.096-157.2864-204.3392l-18.5856-46.336-19.2 31.9488C401.2032 746.2912 314.8288 819.2 232.5504 819.2c-30.9248 0-57.2416-7.2704-78.9504-21.7088l76.9536-70.8096c13.312 12.4928 28.7744 18.7392 46.4896 18.7392 49.9712 0 106.24-47.616 168.5504-142.9504l34.56-52.5824 13.312-20.7872z"
                    fill="#5e63b6"
                    p-id="33540"
                  ></path>
                </svg>
                数学
              </div>
            </div>
            <div class="new_topic_box f f_d_c">
              <ul class="f f_d_r new_item_box">
                <li
                  v-for="(item, index) in new_topic_list"
                  :key="item"
                  @mouseenter="enter_new_topic(index)"
                  @mouseleave="leave_new_topic(index)"
                  class="topic_item fade_item fade_out f f_d_c r"
                >
                  <div class="img_box r">
                    <img
                      v-if="item.img != ''"
                      :src="item.img"
                      class="img r"
                      alt=""
                    />
                    <img
                      v-else
                      src="https://pic.imgdb.cn/item/65bb8e68871b83018ae48807.png"
                      class="img r"
                      alt=""
                    />
                  </div>
                  <div class="f f_d_c topic_item_content">
                    <div class="f f_d_r a_c">
                      <span class="classification f a_c j_c_c">{{
                        item.classification
                      }}</span>
                      <span                   @click="go_to_by_path(item.link)"
                      class="title">{{ item.title }}</span>
                    </div>
                    <span class="short_meg" v-html="item.short_message"></span>
                    <span class="date"
                      >{{ item.create_date.split("?")[0] }}/{{
                        item.create_date.split("?")[1]
                      }}/{{ item.create_date.split("?")[2] }}
                      {{ item.create_date.split("?")[3] }}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="recommend_topic_box f f_d_c">
              <h2 class="home_nav_item fade_out"><span>推荐文章</span></h2>
              <ul class="f f_d_r recommend_item_box">
                <li
                  v-for="(item, index) in recommend_topic_list"
                  :key="item"
                  class="recommend_item re_item fade_out f f_d_r"
                >
                  <div class="img_box r">
                    <img v-if="item.img != ''" :src="item.img" alt="" />
                    <img
                      v-else
                      src="https://pic.imgdb.cn/item/65bb8f6d871b83018ae8bcac.png"
                      alt=""
                    />
                  </div>
                  <div class="content_box f f_d_c">
                    <div class="f f_d_r a_c">
                      <span class="classification f a_c j_c_c">{{
                        item.classification
                      }}</span>
                      <span                   @click="go_to_by_path(item.link)"
                      class="title">{{ item.title }}</span>
                    </div>
                    <span class="short_meg" v-html="item.short_message"></span>
                    <div
                      class="content_bottom_box f f_d_r a_c justify_content_space_between"
                    >
                      <div
                        class="user_item f f_d_r a_c"
                      >
                        <img
                          class="user_avatar"
                          :src="user_store.avatar"
                          alt=""
                        />
                        <span class="font_07_em"> {{ user_store.name }} </span>
                      </div>
                      <span class="date"
                        >{{ item.create_date.split("?")[0] }}/{{
                          item.create_date.split("?")[1]
                        }}/{{ item.create_date.split("?")[2] }}
                        {{ item.create_date.split("?")[3] }}
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="re_note_box">
              <h2 class="home_nav_item r fade_out"><span>推荐笔记</span></h2>
              <ul class="re_note_item_box f f_d_r">
                <li
                  class="re_note_item fade_out r"
                  v-for="item in re_note_list"
                  :key="item"
                >
                  <div class="re_note_img_box r">
                    <img
                      @click="router.push(item.link)"
                      v-if="item.img != ''"
                      :src="item.img"
                      alt=""
                    />
                    <img
                      v-else
                      @click="router.push(item.link)"
                      src="https://pic.imgdb.cn/item/65cefd5f9f345e8d03620d1c.jpg"
                      alt=""
                    />
                  </div>
                  <div class="note_info_box">
                    <div @click="router.push(item.link)">{{ item.name }}</div>
                    <div class="note_short_message r">
                      {{ item.short_message }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
 
  </div>
  <div
    class="home_foot r f f_d_r a_c j_c_c"
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
  </div>
</template>
<style lang="scss" scoped>



.shape_icon {
  animation: shape 5s infinite linear both;
  z-index: 100;
  @keyframes shape {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
@font-face {
  font-family: "MonsieurLaDoulaise-Regular-2";
  src: url("/src/assets/font/MonsieurLaDoulaise-Regular-2.ttf");
}
#home_main {
  width: max(1440px,100vw);
  min-height: 100vh;
  // scroll-snap-type: y mandatory;
  background: $fill_body;
  color: $text;
  font-family: "misans";
  .bg_shape {
      top: 0;
      
      position: fixed;
      transform: scale(3);
      filter: blur(10px);
      path{
        fill: $primary;
      }
      
    }
  .bg_shape_2 {
      right: 0;
      bottom: 0;
      position: fixed;
      transform: scale(3);
      filter: blur(10px);

      path{
        fill: $primary;
      }
    }
 
  overflow: hidden;
 

  li {
    list-style: none;
    padding: 0 0;
  }
  .home_nav_item {
    font-size: 14px;
    margin: 32px 16px;
    margin-bottom: 24px;
    height: 42px;
    font-weight: 500;
    color: $fill_primary;
    border-bottom: $primary_mix_4 1px solid;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    span {
      background: $primary_mix_2;
      box-shadow: $fill_shadow 0 10px 10px;
      border-radius: 1000px;
      padding: 8px 16px;
    }
  }
  .page_1_circle {
    z-index: -1;
   
    top:50% ;
    left:50%;

    transform: translate(-50%,-50%) scale(1.4);
    .page_1_circle_path_1{
      stop-color: $primary;
    }
    .page_1_circle_path_2{
      stop-color: $primary_mix_6;
    }
    .page_1_circle_path_3{
      stop-color: $fill_primary;
    }
  }
  .page_1 {
    z-index: 10;
    width: max(1440px,100vw);
    height: 100vh;
    overflow-x: hidden;
  .page_1_bg{
    width: max(1440px,100vw);
    height: 100vh;
    z-index: -2;
    object-fit:cover;
  }
  .page_1_bg_cover{
    opacity: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    object-fit:cover;
    background: radial-gradient(#0d1c2b16,#0d1c2bb3,#0d1c2b);
  }
              
    .page_1_title {
      font-size: 18px;
      top: 50%;
      left: 50%;
    
      border-radius: 26px;
      transform: translate(-50%, -50%);
     
      .title_1 {
        font-weight: 900;
                animation: title 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                .avatar{
                  width: 128px;
                  height: 128px;
                  border-radius: 50%;
                  
                }
                .title_1_text{
                  width: 1000px;
                  line-height: 40px;
                  text-align: center;
                  font-size: 20px;
                  top: 200px;
                  left: 50%;
                  transform: translateX(-50%);
                  animation: typing 2s steps(42, end), blink-caret .75s step-end infinite;

                }
      }

      @keyframes title {
        0% {
          transform: translateY(128px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
    .more {
      bottom: 16px;
      left: 49%;
      transform: translateX(-50%);
      animation: more 2s infinite linear both;
      z-index: 10000000;
      cursor: pointer;
      path {
        fill: $primary;
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
  }
  .page_2 {
    width: max(1440px,100vw);
    

    .page_container {
      width: max(1440px,100vw);
      .page_2_header {
        z-index: 2;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        .notice {
          width: 1084px;
          margin: 16px auto;
          background: $fill;
          padding: 8px;
          border-radius: $border_radius;
          box-shadow: 0 4px 10px $fill_shadow;

          .notice_text {
            margin-left: 16px;
            color: $text;
          }
        }
      }
      .page_content {
      
        z-index: 1;

        
        .page_mid {
          width: 1100px;
          .page_top_box {
            gap: 16px;
            width: inherit;
            margin-bottom: 16px;
            .home_carousel {
              transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
              box-shadow: 0 2px 5px $fill_shadow;
            }
            .rect_box {
              width: 364px;
              height: 226px;
              display: grid;
              gap: 16px;
              grid-template-columns: repeat(3, 1fr);
              grid-template-rows: repeat(3, 1fr);
              grid-template-areas:
                "rect_1 rect_1 rect_3"
                "rect_2 rect_2 rect_3"
                "rect_4 rect_4 rect_3";
              .rect_1 {
                grid-area: rect_1;
              }
              .rect_2 {
                grid-area: rect_2;
              }
              .rect_3 {
                span{
                  display: none;
                }
                grid-area: rect_3;
              }
              .rect_4 {
                grid-area: rect_4;
              }
              .rect_item {
                border-radius: $border_radius;
                background: $fill;
                user-select: none;
                overflow: hidden;
                gap: 8px;
                font-size: 20px;
                font-family: "orbitron-light";
                font-weight: 900;
                letter-spacing: 2px;
                box-shadow: 0 2px 5px $fill_shadow;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                cursor: pointer;
                &:hover {
                  color: $primary;
                }

                &:hover {
                  box-shadow: 0 1px 2px $fill_shadow;
                  transition: box-shadow 0.5s
                      cubic-bezier(0.075, 0.82, 0.165, 1),
                    transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                 
                }
               
              }
            }
          }
          .page_2_nav_box {
            width: 1100px;
            height: 36px;
            margin-bottom: 16px;
            border-radius: $border_radius;

            gap: 16px;
            .page_2_nav_item {
              width: 98px;
              height: 36px;
              gap: 4px;
              user-select: none;
              background: $fill;
              box-shadow: 0 4px 5px $fill_shadow;
              border-radius: $border_radius;
              font-size: 14px;
              font-weight: 500;
              color: $text;
              will-change: transform, opacity;
              cursor: pointer;
              transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                box-shadow 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
              &:hover {
                box-shadow:none;
                transform: translateY(4px);
              }
            }
          }
          .new_topic_box {
            width: inherit;
            .new_item_box {
              padding: 0;
              width: inherit;
              margin: 0;
              gap: 16px;
              flex-wrap: wrap;
              margin-bottom: 32px;
              .topic_item {
                border-radius: $border_radius;
                width: 356px;
                height: 300px;
                color: $text;
                background: $fill;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 13px 10px $fill_shadow;

                &:hover {
                  box-shadow: 0 3px 5px $fill_shadow;
                }
                &:has(.title:active) {
                  animation: jump 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                }
               
                .img_box {
                  width: inherit;
                  height: 216px;
                  overflow: hidden;
                  border-top-left-radius: $border_radius;
                  border-top-right-radius: $border_radius;
                  position: relative;
                  &::after {
                    content: "";
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: inherit;
                    height: 128px;
                    pointer-events: none;
                    background: linear-gradient(to top, $primary_mix_9, transparent);
                  }

                  .img {
                    width: inherit;
                    height: inherit;
                    border-radius: $border_radius;
                    object-fit: cover;
                    border-top-right-radius: $border_radius;
                    border-top-left-radius: $border_radius;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                  }
                }

                .date {
                  align-self: flex-start;
                  height: 12px;
                  font-size: 12px;
                  color: $text_secondary;
                }
                .topic_item_content {
                  margin: 16px;
                  height: 84px;
                  .classification {
                    white-space: nowrap;
                    font-size: 12px;
                    font-weight: 900;
                    padding:4px;
                    background: $primary_mix_2;
                    border-radius: 5px;
                    margin-right: 8px;
                    color: $fill_primary;
                  }
                  .title {
                    font-size: 16px;
                    font-weight: 900;
                    height: 20px;
                    color: $text_title;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    user-select: none;
                    cursor: pointer;
                    &:hover {
                      color: $primary;
                    }
                  }
                  .short_meg {
                    margin: 8px 0;
                    height: 32px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: 14px;
                  }
                }
              }
            }
          }
          .recommend_topic_box {
            width: inherit;
            border-radius: $border_radius;
            margin-bottom: 32px;
            background: $fill_body;
            box-shadow: 0 4px 10px $fill_shadow;

            .recommend_item_box {
              width: inherit;
              flex-wrap: wrap;
              gap: 16px;
              padding: 0;
              margin: 0;

              .recommend_item {
                width: 1068px;
                height: 136px;
                border-radius: $border_radius;
                margin: 0 auto;
                background: $fill;
                transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 0px 5px $fill_shadow;
                &:last-child {
                  margin-bottom: 32px;
                }
                &::after {
                  content: "";
                  position: absolute;
                  width: 536px;
                  right: 534px;
                  height: inherit;
                  z-index: 10;
                  pointer-events: none;
                  background: linear-gradient(
                    to left,
                    $fill 20%,
                    transparent
                  );
                }
                &:hover {
                  box-shadow: 0 0 0 3px $primary;
                                }
                &:has(.title:active)  {
                  animation: jump 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                }

                &:nth-child(even) {
                  .content_box {
                    order: 0;
                  }
                  &::after {
                    content: "";
                    position: absolute;
                    width: 535px;
                    right: 16px;
                    height: inherit;
                    background: linear-gradient(
                      to right,
                      $fill 20%,
                      transparent
                    );
                  }
                  .img_box {
                    border-bottom-right-radius: $border_radius;
                    border-top-right-radius: $border_radius;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                  }
                }
                .img_box {
                  width: 534px;
                  height: 136px;
                  order: 1;
                  border-bottom-left-radius: $border_radius;
                  border-top-left-radius: $border_radius;
                  overflow: hidden;

                  img {
                    width: inherit;
                    height: 100%;
                    border-radius: inherit;
                    object-fit: cover;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover {
                      transform: scale(1.07);
                    }
                  }
                }
                .content_box {
                  width: 502px;
                  height: 104px;
                  order: 2;
                  margin: 16px;
                  color: $text_subtitle;
                  .content_bottom_box {
                    margin-top: auto;
                  }
                  .classification {
                    font-size: 12px;
                    padding:4px 4px;
                    flex-shrink: 0;
                    font-weight: 900;
                    background: $primary_mix_3;
                    border-radius: 5px;
                    white-space: nowrap;
                    margin-right: 8px;
                    color: $fill_primary;
                  }
                  .title {
                    font-size: 16px;
                    font-weight: 800;
                    height: 20px;
                    user-select: none;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: $text_title;
                    
                    cursor: pointer;
                    &:hover {
                      color:$primary;
                    }
                  }
                  
                  .short_meg {
                    margin: 16px 0;
                    height: 16px;
                    color: $text;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-size: 14px;
                    overflow: hidden;
                  }
                  .font_07_em {
                    font-size: 12px;
                  }
                  .user_item{
                    height: 30px;
                  }
                  .user_avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 8px;
                    box-shadow: $fill_shadow 0 0 2px;
                  }
                  .date {
                    justify-self: flex-end;
                    letter-spacing: 1px;
                    font-size: 12px;
                    color: $text_secondary;
                  }
                }
              }
            }
          }
          .re_note_box {
            width: 1100px;
            border-radius: $border_radius;
            background: $fill_body;

            box-shadow: 0 4px 10px $fill_shadow;
            margin-bottom: 32px;
            .re_note_item_box {
              margin: 0 auto;
              margin-bottom: 16px;
              padding: 0;
              width: 1068px;
              gap: 16px;

              .re_note_item {
                width: 255px;
                background: $fill;
                border-radius: $border_radius;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                .re_note_img_box {
                  width: inherit;
                  height: 300px;
                  border-radius: inherit;
                  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  margin-bottom: 16px;

                  &::after {
                    content: "";
                    position: absolute;
                    width: inherit;
                    height: 300px;
                    pointer-events: none;
                    top: 0;
                    left: 0;
                    border-radius: inherit;
                    background: linear-gradient(
                      45deg,
                      $primary_mix_9,
                      transparent,
                      $primary_mix_9
                    );
                    opacity: 0;
                    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  }
                  &:hover {
                    &::after {
                      opacity: 1;
                    }
                  }
                }

                img {
                  width: inherit;
                  height: 300px;
                  border-radius: inherit;
                  object-fit: cover;
                  background: #fff;
                  box-shadow: $fill_shadow 0px 5px 10px;
                }
                .note_info_box {
                  left: 0;
                  bottom: 0;
                  width: 223px;
                  padding: 8px 16px;
                  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                  height: 62px;
                  overflow: hidden;
                  font-size: 16px;
                  font-weight: 900;
                  color: $text;

                  div:first-child {
                    user-select: none;
                    color: $text_title;
                    height: 20px;
                    cursor: pointer;
                  
                    &:hover {
                      color:$primary;
                    }
                  }
                  .note_short_message {
                    font-size: 14px;
                    overflow: hidden;
                    height: 32px;
                    color: $text;
                    margin-top: 8px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-weight: 400;
                  }
                }
              }
            }
          }
        }
       
      }
    }
  }
}
.primary_path{
  fill: $primary;
}
.primary_mix_6_path{
  fill: $primary_mix_6;
}
.fill_primary_path{
  fill: $fill_primary;
}
.home_foot {
  width: max(1440px,100vw);
  height: 200px;
  gap:16px;
  z-index: 1;
  color: $primary;
  background: $fill_body;
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
@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(8px);
  }
  100% {
    transform: translateY(0);
  }
}
.fade_in{
  opacity: 1;
  transform: translate(0);
}
.fade_out{
  opacity: 0;
  transform: translateX(-48px);
}
@media (max-width: 600px) {
  #home_main {
  width: 100vw;
  min-height: 100vh;
  // scroll-snap-type: y mandatory;
  background: $fill_body;
  color: $text;
  font-family: "misans";
  .bg_shape {
      top: 0;
      left: -120px;
      position: fixed;
      transform: scale(1);
      filter: blur(10px);
      path{
        fill: $primary;
      }
      
    }
  .bg_shape_2 {
      right: -120px;
      bottom: 0;
      position: fixed;
      transform: scale(1);
      filter: blur(10px);

      path{
        fill: $primary;
      }
    }
 
  overflow: hidden;
 

  li {
    list-style: none;
    padding: 0 0;
  }
  .home_nav_item {
    font-size: 14px;
    margin: 0px 0px;
    margin-bottom: 8px;
    height: 22px;
    padding-bottom:8px ;
    font-weight: 500;
    color: $fill_primary;
    border-bottom: $primary_mix_4 1px solid;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    span {
      background: $primary_mix_2;
      box-shadow: $fill_shadow 0 10px 10px;
      border-radius: $border_radius;
      padding: 4px 8px;
    }
  }
  .page_1_circle {
    z-index: -1;
   
    top:50% ;
    left:50%;

    transform: translate(-50%,-50%) scale(3.4);
    .page_1_circle_path_1{
      stop-color: $primary;
    }
    .page_1_circle_path_2{
      stop-color: $primary_mix_6;
    }
    .page_1_circle_path_3{
      stop-color: $fill_primary;
    }
  }
  .page_1 {
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
  .page_1_bg{
    width: 100vw;
    height: 100vh;
    z-index: -2;
    object-fit:cover;
  }
  .page_1_bg_cover{
    opacity: 0;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    object-fit:cover;
    background: radial-gradient(#0d1c2b16,#0d1c2bb3,#0d1c2b);
  }
              
    .page_1_title {
      top: 50%;
      left: 50%;
      border-radius: 26px;
      transform: translate(-50%, -50%);
     
      .title_1 {
        font-weight: 900;
                animation: title 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                .avatar{
                  width: 128px;
                  height: 128px;
                  border-radius: 50%;
                  
                }
                .title_1_text{
                  width: calc(100vw - 20px);
                  line-height: 16px;
                  text-align: center;
                  font-size: 12px;
                  word-break: break-all;
                  top: 200px;
                  left: 50%;
                  word-break:break-all;
                                    transform: translateX(-50%);
                }
      }

      @keyframes title {
        0% {
          transform: scale(2);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
    }
    .more {
      bottom: 36px;
      left: 47%;
      transform: translateX(-50%);
      animation: more 2s infinite linear both;
      z-index: 10000000;
      cursor: pointer;
      path {
        fill: $primary;
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
  }
  .page_2 {
    width: 100vw;
    
    .page_container {
      width: calc(100vw - 20px);
    margin: 0 auto;  
      .page_2_header {
        z-index: 2;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        width: calc(100vw - 20px);

        .notice {
          width: calc(100vw - 28px);
          margin: 8px auto;
          background: $fill;
          
          padding: 4px;
          border-radius: $border_radius;
          box-shadow: 0 4px 10px $fill_shadow;
          font-size: 12px;
          svg{
            transform: scale(.7);
          }
          .notice_text {
            color: $text;
            margin-left: 4px;
          }
        }
      }
      .page_content {
      
        z-index: 1;

        
        .page_mid {
          width: calc(100vw - 20px);
          .page_top_box {
            gap: 4px;
            width: inherit;
            margin-bottom: 8px;
            .home_carousel {
              display: none;
              transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
              box-shadow: 0 2px 5px $fill_shadow;
            }
            .rect_box {
              width: 100vw;
              height: 124px;
              display: grid;
              gap: 4px;
              grid-template-columns: repeat(2, 1fr);
              grid-template-rows: repeat(2, 1fr);
              grid-template-areas:
                "rect_1 rect_2"
                "rect_3 rect_4";
              .rect_1 {
                grid-area: rect_1;
              }
              .rect_2 {
                grid-area: rect_2;
              }
              .rect_3 {
                grid-area: rect_3;
                span{
                  display:inline;
                }
                svg{
                  transform: scale(.8);
                }
              }
              .rect_4 {
                grid-area: rect_4;
              }
              .rect_item {
                border-radius: $border_radius;
                background: $fill;
                user-select: none;
                overflow: hidden;
                gap: 4px;
                span{
                  display: none;
                }
                font-size: 16px;
                font-family: "orbitron-light";
                font-weight: 900;
                letter-spacing: 2px;
                box-shadow: 0 2px 5px $fill_shadow;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                cursor: pointer;
                &:hover {
                  color: $primary;
                }

                &:hover {
                  box-shadow: 0 1px 2px $fill_shadow;
                  transition: box-shadow 0.5s
                      cubic-bezier(0.075, 0.82, 0.165, 1),
                    transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                 
                }
               
              }
            }
          }
          .page_2_nav_box {
            width: calc(100vw - 20px);
            height: 36px;
            margin-bottom: 8px;
            border-radius: $border_radius;

            gap: 4px;
            .page_2_nav_item {
              width: calc((100vw - 20px)/3);
              height: 36px;
              gap: 4px;
              user-select: none;
              background: $fill;
              box-shadow: 0 4px 5px $fill_shadow;
              border-radius: $border_radius;
              font-size: 12px;
              font-weight: 900;
              color: $text;
              will-change: transform, opacity;
              cursor: pointer;
              transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                box-shadow 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
              &:hover {
                box-shadow:none;
                transform: translateY(4px);
              }
            }
          }
          .new_topic_box {
            width: inherit;
            .new_item_box {
              padding: 0;
              width: inherit;
              margin: 0;
              gap: 4px;
              flex-wrap: wrap;
              margin-bottom: 16px;
              .topic_item {
                border-radius: $border_radius;
                width: calc((100vw - 24px)/2);
                height: 180px;
                color: $text;
                background: $fill;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 13px 10px $fill_shadow;

                &:hover {
                  box-shadow: 0 3px 5px $fill_shadow;
                }
                &:active {
                  animation: jump 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                }
               
                .img_box {
                  width: inherit;
                  height: 220px;
                  overflow: hidden;
                  border-top-left-radius: $border_radius;
                  border-top-right-radius: $border_radius;
                  position: relative;
                  &::after {
                    content: "";
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: inherit;
                    height: 128px;
                    pointer-events: none;
                    background: linear-gradient(to top, $primary_mix_9, transparent);
                  }

                  .img {
                    width: inherit;
                    height: inherit;
                    border-radius: $border_radius;
                    object-fit: cover;
                    border-top-right-radius: $border_radius;
                    border-top-left-radius: $border_radius;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                  }
                }

                .date {
                  align-self: flex-start;
                  height: 10px;
                  font-size: 0.7em;
                  color: $text_secondary;
                }
                .topic_item_content {
                  margin: 8px;
                  height: 80px;
                  .classification {
                    height: 18px;
                    white-space: nowrap;
                    font-size: 0.6em;
                    padding:0 0.4em;
                    background: $primary_mix_2;
                    border-radius: 0.4em;
                    margin-right: 8px;
                    color: $fill_primary;
                  }
                  .title {
                    font-size: 14px;
                    font-weight: 700;
                    height: 16px;
                    color: $text_title;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    user-select: none;
                    cursor: pointer;
                    &:hover {
                      color: $primary;
                    }
                  }
                  .short_meg {
                    margin: 8px 0;
                    height: 28px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: 12px;
                  }
                }
              }
            }
          }
          .recommend_topic_box {
            width: inherit;
            border-radius: $border_radius;
            margin-bottom: 16px;
            box-shadow: 0 4px 10px $fill_shadow;
            background: none;
            .recommend_item_box {
              width: inherit;
              flex-wrap: wrap;
              gap: 4px;
              padding: 0;
              margin: 0;

              .recommend_item {
                width: calc(100vw - 20px);
                height: 128px;
                border-radius: $border_radius;
                margin: 0 auto;
                background: $fill;
                transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 0px 5px $fill_shadow;
                &:last-child {
                  margin-bottom: 32px;
                }
                &::after {
                  content: "";
                  position: absolute;
                  width: 536px;
                  right: 534px;
                  opacity: 0;
                  height: inherit;
                  z-index: 10;
                  pointer-events: none;
                  background: linear-gradient(
                    to left,
                    $fill 20%,
                    transparent
                  );
                }
                &:hover {
                  box-shadow: 0 0 0 3px $primary;
                                }
                &:active {
                  animation: jump 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                }

                &:nth-child(even) {
                  .content_box {
                    order: 0;
                  }
                  &::after {
                    content: "";
                    position: absolute;
                    width: 535px;
                    right: 16px;
                    opacity: 0;
                    height: inherit;
                    background: linear-gradient(
                      to right,
                      $fill 20%,
                      transparent
                    );
                  }
                  .img_box {
                    display: none;
                    border-bottom-right-radius: $border_radius;
                    border-top-right-radius: $border_radius;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                  }
                }
                .img_box {
                  position: absolute;
                  display: none;
                  width: calc(100vw - 20px);
                  height: 136px;
                  order: 1;
                  border-bottom-left-radius: $border_radius;
                  border-top-left-radius: $border_radius;
                  overflow: hidden;

                  img {
                    display: none;
                    width: inherit;
                    height: 100%;
                    border-radius: inherit;
                    object-fit: cover;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover {
                      transform: scale(1.07);
                    }
                  }
                }
                .content_box {
                width: calc(100vw - 36px);
                  height: 112px;
                  order: 2;
                  margin: 8px;
                  color: $text_subtitle;
                  .content_bottom_box {
                    margin-top: auto;
                  }
                  .classification {
                    font-size: 0.6em;
                    padding:0 0.4em;
                    flex-shrink: 0;
                    height: 20px;
                    background: $primary_mix_3;
                    border-radius: 0.4em;
                    white-space: nowrap;
                    margin-right: 8px;
                    color: $fill_primary;
                  }
                  .title {
                    font-size: 14px;
                    font-weight: 800;
                    height: 20px;
                    user-select: none;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: $text_title;
                    cursor: pointer;
                    &:hover {
                      color:$primary;
                    }
                  }
                  
                  .short_meg {
                    margin: 8px 0;
                    height: 40px;
                    color: $text;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    font-size: 12px;
                    overflow: hidden;
                  }
                  .font_07_em {
                    font-size: 0.7em;
                  }
                  .user_item{
                    height: 30px;
                  }
                  .user_avatar {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                    margin-right: 8px;
                    box-shadow: $fill_shadow 0 0 2px;
                  }
                  .date {
                    justify-self: flex-end;
                    letter-spacing: 1px;
                    font-size: 10px;
                    color: $text_secondary;
                  }
                }
              }
            }
          }
          .re_note_box {
            width: calc(100vw - 20px);
            border-radius: $border_radius;
            box-shadow: 0 4px 10px $fill_shadow;
            margin-bottom: 16px;
            background: none;
            .re_note_item_box {
              margin: 0 auto;
              margin-bottom: 16px;
              padding: 0;
              width: inherit;
              height: auto;
              gap: 4px;
              flex-wrap: wrap;
              .re_note_item {
                width: calc((100vw - 24px)/2);
                height: calc((100vw - 24px)/1.6 + 88px);
                background: $fill;
                border-radius: $border_radius;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                .re_note_img_box {
                  width: inherit;
                  height: calc((100vw - 24px)/1.6);
                  border-radius: inherit;
                  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  margin-bottom: 16px;

                  &::after {
                    content: "";
                    position: absolute;
                    width: inherit;
                    height: inherit;
                    pointer-events: none;
                    top: 0;
                    left: 0;
                    border-radius: inherit;
                    background: linear-gradient(
                      45deg,
                      $primary_mix_9,
                      transparent,
                      $primary_mix_9
                    );
                    opacity: 0;
                    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  }
                  &:hover {
                    &::after {
                      opacity: 1;
                    }
                  }
                }

                img {
                  width: inherit;
                  height: calc((100vw - 24px)/1.6);
                  border-radius: inherit;
                  object-fit: cover;
                  background: #fff;
                  box-shadow: $fill_shadow 0px 5px 10px;
                }
                .note_info_box {
                 
                  width: calc((100vw - 24px)/2 - 16px);
                  padding: 8px 8px;
                  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                  height: 62px;
                  overflow: hidden;
                  font-size: 16px;
                  font-weight: 900;
                  color: $text;

                  div:first-child {
                    user-select: none;
                    color: $text_title;
                    height: 16px;
                    font-size: 14px;
                    cursor: pointer;
                  
                    &:hover {
                      color:$primary;
                    }
                  }
                  .note_short_message {
                    font-size: 12px;
                    overflow: hidden;
                    height: 28px;

                    margin-top: 4px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-weight: 400;
                  }
                }
              }
            }
          }
        }
       
      }
    }
  }
}
.home_foot {
  width: calc(100vw - 20px);
  padding: 0 10px;
  height: 130px;
  gap:8px;
  z-index: 1;
  color: $primary;
  background: $fill_body;
  .title_foot {
    font-size: 12px;
  }
  .text_foot {
    font-size: 10px;
    font-weight: 700;
  }
  .left_foot {
    width: calc((100vw - 24px)/2);
    height: auto;
    gap: 4px;
    line-height: 15px;
  }
  .mid_foot {
    width: 0;
    height: 152px;
  }
  .right_foot {
    width: calc((100vw - 24px)/2);
    height: auto;
    gap: 4px;
    line-height: 15px;
  }
}
}
</style>
