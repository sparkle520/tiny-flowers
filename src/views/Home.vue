<!-- @Author: LT -->
<!-- @Date: 2024-02-01 16:03:40 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
  ref,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
import { useUserStore } from "../store/user";
import { useTopicStore } from "../store/topic";
import HomeCarousel from "@/component/HomeCarousel.vue";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const { theme } = storeToRefs(config_store);
const user_store = useUserStore();
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
const router = useRouter();
onBeforeMount(() => {});
onUnmounted(() => {
  document.removeEventListener("scroll", scroll_handle);
  clearInterval(notice_interval);
});
onMounted(() => {
  change_theme(theme.value);
  window.scrollTo(0, 0);
  document.addEventListener("scroll", scroll_handle);
  document.querySelector(".notice_text").innerText = notice[notice_index];
  init();
});
const scroll_handle = () => {
  page_one_handle();
  page_two_handle();
};
const page_one_handle = () => {
  let scroll_y = window.scrollY;
  const more = document.querySelector(".more");
  const page_1_title = document.querySelector(".page_1_title");
  // let page_1_bg = document.querySelector(".page_1_bg");

  const start = 0;
  const end = window.innerHeight;
  if (scroll_y > window.innerHeight - 70) {
    more.style.opacity = 0;
  } else {
    more.style.opacity = 1;
  }
  if (scroll_y >= start && scroll_y <= end) {
    page_1_title.style.opacity = create_animation(start, end, 1, 0)(scroll_y);
    page_1_title.style.filter = `blur(${create_animation(
      start,
      end,
      0,
      10
    )(scroll_y)}px)`;
    // page_1_title.style.transform = `scale(${create_animation(
    //   start,
    //   end,
    //   1,
    //   2
    // )(scroll_y)}) translate(-50%,-50%)`;
  }
  // if (scroll_y >= window.innerHeight) {
  //   page_1_bg.style.transform = `scale(.6)`;
  // }else{
  //   page_1_bg.style.transform = `scale(1)`;
  // }
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
const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--home_bg_color", "#123");
    c_c("--first_page_cover_bg", "#1e243398");
    c_c("--home_color", "#f0f8ff");
    c_c("--u_w_m_btn_color", "#f0f8ff");
    c_c("--word_box_color", "#f0f8ff");
    c_c("--f_word_box_color", "#f0f8ff");
  } else {
    c_c("--home_bg_color", "#f7f3f5");
    c_c("--first_page_cover_bg", "transparent");
    c_c("--home_color", "#e60000");
    c_c("--u_w_m_btn_color", "#ff80bf");
    c_c("--word_box_color", "#003153");
    c_c("--f_word_box_color", "#0a0606");
  }
};
const go_to_next_page = () => {
  let t = setInterval(() => {
    if (window.scrollY + 60 < window.innerHeight * 2 - 70) {
      window.scrollTo(0, window.scrollY + 100);
    } else {
      window.scrollTo(0, window.innerHeight * 2 - 70);
      clearInterval(t);
    }
  }, 10);
};
const page_two_handle = () => {
  // let target = item.offsetTop + window.innerHeight - 80;
  let scroll_y = window.scrollY;
  let page_2_header = document.querySelector(".page_2_header");
  let page_left = document.querySelector(".page_content .page_left");
  let page_right = document.querySelector(".page_content .page_right");
  let home_carousel = document.querySelector(".page_content .home_carousel");
  let rect_list = document.querySelectorAll(
    ".page_top_box .rect_box .rect_item"
  );
  let home_nav_item_list = document.querySelectorAll(".home_nav_item");
  let recommend_fade_item_list = document.querySelectorAll(
    ".recommend_item_box .fade_item"
  );
  let new_fade_item_list = document.querySelectorAll(
    ".new_item_box .fade_item"
  );
  const page_2 = document.querySelector(".page_2");
  if (
    scroll_y > window.innerHeight - 80 + nav_list.value[0].offsetTop &&
    scroll_y < window.innerHeight - 80 + page_2.getBoundingClientRect().height
  ) {
    for (let i = 0; i < nav_list.value.length; i++) {
      const element = nav_list.value[i];
      if (element.offsetTop + window.innerHeight - 80 <= scroll_y) {
        current_nav_index.value = i;
      }
    }
  } else {
    current_nav_index.value = -1;
  }
  if (
    scroll_y >=
    window.innerHeight + page_2_header.offsetTop - window.innerHeight / 2
  ) {
    page_2_header.style.transform = "translateY(0)";
    page_2_header.style.opacity = 1;
  } else {
    page_2_header.style.transform = "translateY(-10vh)";
    page_2_header.style.opacity = 0;
  }
  if (
    scroll_y >=
    window.innerHeight + page_left.offsetTop - window.innerHeight / 2
  ) {
    page_left.style.transform = "translateX(0)";
    page_left.style.opacity = 1;
  } else {
    page_left.style.transform = "translateX(-10vh)";
    page_left.style.opacity = 0;
  }
  if (
    scroll_y >=
    window.innerHeight + page_right.offsetTop - window.innerHeight / 2
  ) {
    page_right.style.transform = "translateX(0)";
    page_right.style.opacity = 1;
  } else {
    page_right.style.transform = "translateX(10vh)";
    page_right.style.opacity = 0;
  }
  if (
    scroll_y >=
    window.innerHeight + home_carousel.offsetTop - window.innerHeight / 2
  ) {
    home_carousel.style.transform = "scaleX(1)";
    home_carousel.style.opacity = 1;
  } else {
    home_carousel.style.transform = "scaleX(1.3)";
    home_carousel.style.opacity = 0;
  }
  for (let i = 0; i < rect_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight + rect_list[0].offsetTop - window.innerHeight / 2
    ) {
      rect_list[i].style.transform = "scaleX(1)";
      rect_list[i].style.transitionDelay = `${i * .2}s`;
      rect_list[i].style.opacity = 1;
    } else {
      rect_list[i].style.transform = "scaleX(1.3)";
      rect_list[i].style.transitionDelay = `${0.4 - i * 0.2}s`;
      rect_list[i].style.opacity = 0;
    }
  }
  for (let i = 0; i < home_nav_item_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight +
        home_nav_item_list[i].offsetTop -
        window.innerHeight / 1.3
    ) {
      home_nav_item_list[i].style.transform = "scaleX(1)";
      home_nav_item_list[i].style.opacity = 1;
    } else {
      home_nav_item_list[i].style.transform = "scaleX(1.3)";
      home_nav_item_list[i].style.opacity = 0;
    }
  }
  for (let i = 0; i < recommend_fade_item_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight +
        recommend_fade_item_list[i].offsetTop -
        window.innerHeight / 1.2
    ) {
      recommend_fade_item_list[i].style.transform = "translateX(0)";
      recommend_fade_item_list[i].style.opacity = 1;
    } else {
      recommend_fade_item_list[i].style.transform = "translateX(-12vw)";
      recommend_fade_item_list[i].style.opacity = 0;
    }
  }
  for (let i = 0; i < new_fade_item_list.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight +
        new_fade_item_list[i].offsetTop -
        window.innerHeight / 1.3
    ) {
      new_fade_item_list[i].style.transform = "translateX(0)";
      new_fade_item_list[i].style.opacity = 1;
    } else {
      if (i % 2 === 0) {
        new_fade_item_list[i].style.transform = "translateX(-12vw)";
        new_fade_item_list[i].style.opacity = 0;
      } else {
        new_fade_item_list[i].style.transform = "translateX(12vw)";
        new_fade_item_list[i].style.opacity = 0;
      }
    }
  }
};
const notice = [
  "欢迎来到TinyFlowers🌷",
  "给湿润的天空绘上乾燥的色彩🏵️",
  "烟雾化作云朵 染上朝霞的颜色🌼",
  "如果闭上眼睛的话 能否再回到过去呢🌻",
];
const carousel_data = [
  { link: "https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg" },
  { link: "https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg" },
  { link: "https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg" },
  { link: "https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
];
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
  recommend_topic_list.value = topic_store.get_all();
  init_nav_list();
};
const nav_list = ref([]);
const init_nav_list = () => {
  const home_nav_item = document.querySelectorAll(".home_nav_item");
  for (const item of home_nav_item) {
    nav_list.value.push(item);
  }
};
const current_nav_index = ref(-1);
const jump_to_nav = (item, index) => {
  let target = item.offsetTop + window.innerHeight - 70;
  if (target > window.scrollY) {
    let t = setInterval(() => {
      if (window.scrollY + 60 < target) {
        window.scrollTo(0, window.scrollY + 60);
      } else {
        window.scrollTo(0, target);
        clearInterval(t);
      }
    }, 10);
  } else if (target < window.scrollY) {
    let t = setInterval(() => {
      if (window.scrollY + 60 > target) {
        window.scrollTo(0, window.scrollY - 60);
      } else {
        window.scrollTo(0, target);
        clearInterval(t);
      }
    }, 10);
  } else {
    return;
  }
  current_nav_index.value = index;
};
const go_to_by_path = (path) => {
  router.push(path);
};
const go_to = (path) => {
  window.open(path);
};
const enter_new_topic = (index) => {
  const item = document.querySelectorAll(".topic_item")[index];
  item.style.transform = "translateY(-.8vh)";
};
const leave_new_topic = (index) => {
  const item = document.querySelectorAll(".topic_item")[index];
  item.style.transform = "translateY(0)";
};
const enter_recommend_topic = (index) => {
  const item = document.querySelectorAll(".recommend_item")[index];
  item.style.transform = "translateY(-.8vh)";
};
const leave_recommend_topic = (index) => {
  const item = document.querySelectorAll(".recommend_item")[index];
  item.style.transform = "translateY(0)";
};
</script>
<template>
  <div id="home_main">
    <div class="page_1 relative">
      <img
        class="page_1_bg"
        src="https://pic.imgdb.cn/item/65b90c7b871b83018ab53ec3.jpg"
        alt=""
      />
      <span class="page_1_title"> TinyFlowers🌷 </span>
      <svg
        t="1706806114679"
        @click="go_to_next_page"
        class="icon more absolute"
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
    <div class="page_2 relative">
      <!-- src="https://pic.imgdb.cn/item/65b9140d871b83018ad891c7.jpg" -->

      <div class="page_2_bg relative">
        <img
          class="absolute page_2_bg_img"
          src="https://pic.imgdb.cn/item/65c113f79f345e8d039e2124.png"
          alt=""
        />
      </div>
      <div class="page_container flex flex_direction_column">
        <div class="page_2_header">
          <div class="notice flex flex_direction_row align_items_center">
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
                fill="#000"
                p-id="5228"
              ></path>
              <path
                d="M632.414815 183.751111v638.482963l132.740741 60.112593V140.136296l-132.740741 43.614815z"
                fill="#FFB695"
                p-id="5229"
              ></path>
              <path
                d="M735.573333 157.582222v707.887408l-347.401481-178.631111V329.955556l347.401481-172.373334m30.340741-86.85037a37.925926 37.925926 0 0 0-15.54963 3.413333l-430.459259 213.522963v440.888889l430.459259 221.297778a37.925926 37.925926 0 0 0 53.665186-34.512593V108.657778a37.925926 37.925926 0 0 0-37.925926-37.925926z"
                fill="#000"
                p-id="5230"
              ></path>
              <path
                d="M878.933333 403.531852a7.585185 7.585185 0 0 1 7.585186 7.585185v204.8a7.585185 7.585185 0 0 1-7.585186 7.585185h-73.955555v-219.97037h73.955555m0-68.266667h-142.222222v356.503704h142.222222a75.851852 75.851852 0 0 0 75.851852-75.851852v-204.8a75.851852 75.851852 0 0 0-75.851852-75.851852zM251.638519 728.557037v135.395556a21.048889 21.048889 0 0 1-21.048889 21.048888h-14.411852a21.048889 21.048889 0 0 1-21.048889-21.048888v-135.395556h56.888889m68.266666-68.266667H126.672593v203.662223a89.315556 89.315556 0 0 0 89.315555 89.315555h14.411852a89.315556 89.315556 0 0 0 89.315556-89.315555V660.29037z"
                fill="#000"
                p-id="5231"
              ></path>
            </svg>
            <span class="notice_text"></span>
          </div>
        </div>
        <div
          class="page_content flex flex_direction_row justify_content_center"
        >
          <div class="page_left flex flex_direction_column">
            <div class="nav_box">
              <ul class="flex flex_direction_column">
                <li
                  v-for="(item, index) in nav_list"
                  @click="jump_to_nav(item, index)"
                >
                  <span v-if="index === current_nav_index" class="active_item">
                    {{ item.innerText }}
                  </span>
                  <span v-else class="normal_item"> {{ item.innerText }} </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="page_mid flex flex_direction_column">
            <div class="page_top_box flex flex_direction_row">
              <HomeCarousel
                class="home_carousel"
                :data="carousel_data"
              ></HomeCarousel>
              <div class="flex flex_direction_column rect_box">
                <div
                  @click="go_to('https://leetcode.cn/problemset/')"
                  class="rect_item flex align_items_center justify_content_center relative"
                >
                  <svg
                    t="1707152629827"
                    class="icon leet_code"
                    viewBox="0 0 2491 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="5116"
                    width="100"
                    height="100"
                  >
                    <path
                      d="M2032.708267 372.292267v388.027733c0 81.1008-68.676267 146.432-152.951467 146.432a33.621333 33.621333 0 0 1-33.9968-33.245867c0-18.363733 15.223467-33.245867 33.9968-33.245866 47.138133 0 84.992-35.976533 84.992-79.940267v-131.8912l-89.361067 34.952533c-17.408 6.826667-37.205333-1.467733-44.202666-18.5344a33.006933 33.006933 0 0 1 18.944-43.2128l114.5856-44.817066v-184.5248h-118.954667a33.621333 33.621333 0 0 1-33.9968-33.245867c0-18.363733 15.223467-33.245867 33.9968-33.245867h118.954667V206.062933c0-18.363733 15.223467-33.245867 33.9968-33.245866s33.9968 14.882133 33.9968 33.245866v99.7376h305.493333c65.877333 0 119.3984 51.882667 119.3984 116.053334v252.5184c0 64.170667-53.521067 116.053333-119.432533 116.053333h-98.235734c-65.877333 0-119.432533-51.882667-119.432533-116.053333v-215.995734a33.792 33.792 0 0 1 33.9968-33.655466 33.792 33.792 0 0 1 33.9968 33.655466v215.995734c0 27.306667 22.9376 49.5616 51.438933 49.5616H2338.133333c28.501333 0 51.438933-22.254933 51.438934-49.5616v-252.5184c0-27.306667-22.9376-49.5616-51.438934-49.5616h-305.4592z m-767.146667 195.584c-10.6496 76.4928-26.862933 141.346133-46.933333 195.345066-10.8544 29.252267-22.254933 53.589333-33.518934 73.352534-7.0656 12.424533-12.834133 20.821333-16.5888 25.531733a31.8464 31.8464 0 0 1-44.9536 4.778667 32.290133 32.290133 0 0 1-4.778666-45.226667 206.916267 206.916267 0 0 0 10.8544-17.066667c9.557333-16.725333 19.456-37.922133 29.0816-63.8976 18.432-49.5616 33.450667-109.841067 43.485866-181.725866 5.4272-38.912 11.4688-96.1536 18.1248-171.690667h-100.6592a32.085333 32.085333 0 0 1-31.9488-32.187733c0-17.749333 14.301867-32.1536 31.9488-32.1536h106.154667c3.310933-40.618667 6.7584-85.435733 10.376533-134.3488a32.0512 32.0512 0 0 1 34.235734-29.696 32.085333 32.085333 0 0 1 29.525333 34.474666c-3.447467 46.933333-6.792533 90.112-10.001067 129.570134h253.405867a64.170667 64.170667 0 0 1 63.965867 64.341333l-16.008534 418.133333a64.170667 64.170667 0 0 1-63.931733 64.3072H1439.402667a32.085333 32.085333 0 0 1-31.9488-32.187733c0-17.749333 14.301867-32.1536 31.9488-32.1536h64.853333c12.9024 0 23.483733-10.24 23.995733-23.210667l14.1312-369.8688a24.064 24.064 0 0 0-23.9616-25.019733h-233.915733c-6.929067 79.394133-13.277867 139.605333-18.978133 180.6336z"
                      fill="#000000"
                      p-id="5117"
                    ></path>
                    <path
                      d="M610.679467 749.3632a54.0672 54.0672 0 0 1 77.0048 0.1024c21.230933 21.504 21.162667 56.32-0.1024 77.789867l-94.583467 95.197866c-87.2448 87.825067-229.546667 89.088-318.2592 2.935467l-170.325333-168.379733c-86.698667-85.674667-95.368533-222.8224-13.755734-310.920534l152.098134-164.181333c80.9984-87.4496 230.263467-97.006933 322.833066-21.504l138.171734 112.64c23.415467 19.114667 27.067733 53.691733 8.192 77.346133-18.909867 23.620267-53.179733 27.306667-76.5952 8.226134l-138.171734-112.64c-48.401067-39.492267-133.12-34.065067-174.8992 11.0592l-152.132266 164.181333c-39.697067 42.9056-35.362133 111.957333 10.410666 157.218133l169.540267 167.594667a118.5792 118.5792 0 0 0 166.024533-1.467733l94.549334-95.232z"
                      fill="#FFA116"
                      p-id="5118"
                    ></path>
                    <path
                      d="M380.928 654.097067a54.715733 54.715733 0 0 1-54.442667-54.9888c0-30.378667 24.405333-54.9888 54.4768-54.9888h401.544534c30.071467 0 54.442667 24.576 54.442666 54.954666 0 30.378667-24.3712 55.022933-54.442666 55.022934H380.962133z"
                      fill="#B3B3B3"
                      p-id="5119"
                    ></path>
                    <path
                      d="M456.157867 51.541333a54.0672 54.0672 0 0 1 76.970666-2.56c21.947733 20.718933 23.074133 55.534933 2.56 77.7216L170.1888 521.216c-39.7312 42.871467-35.396267 111.957333 10.376533 157.184l168.789334 166.843733c21.504 21.265067 21.845333 56.081067 0.8192 77.789867a54.0672 54.0672 0 0 1-76.970667 0.8192l-168.823467-166.877867c-86.698667-85.674667-95.3344-222.856533-13.7216-310.920533L456.157867 51.541333z"
                      fill="#000000"
                      p-id="5120"
                    ></path>
                  </svg>
                </div>
                <div
                  class="rect_item flex align_items_center justify_content_center relative"
                ></div>
                <div
                  class="rect_item flex align_items_center justify_content_center relative"
                ></div>
              </div>
            </div>
            <div class="new_topic_box flex flex_direction_column">
              <h2 class="home_nav_item">最新文章</h2>
              <ul class="flex flex_direction_row gap_1_vw new_item_box">
                <li
                  v-for="(item, index) in new_topic_list"
                  @click="go_to_by_path(item.link)"
                  @mouseenter="enter_new_topic(index)"
                  @mouseleave="leave_new_topic(index)"
                  class="topic_item fade_item flex flex_direction_column relative"
                >
                  <div class="img_box relative">
                    <img
                      v-if="item.img != ''"
                      :src="item.img"
                      class="img relative"
                      alt=""
                    />
                    <img
                      v-else
                      src="https://pic.imgdb.cn/item/65bb8e68871b83018ae48807.png"
                      class="img relative"
                      alt=""
                    />
                  </div>
                  <div class="flex flex_direction_column topic_item_content">
                    <div class="flex flex_direction_row align_items_center">
                      <span class="classification">{{
                        item.classification
                      }}</span>
                      <span class="title">{{ item.title }}</span>
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
            <div class="recommend_topic_box flex flex_direction_column">
              <h2 class="home_nav_item">推荐文章</h2>
              <ul class="flex flex_direction_row recommend_item_box">
                <li
                  @click="go_to_by_path(item.link)"
                  @mouseenter="enter_recommend_topic(index)"
                  @mouseleave="leave_recommend_topic(index)"
                  v-for="(item, index) in recommend_topic_list"
                  class="recommend_item fade_item flex flex_direction_row"
                >
                  <div class="img_box relative">
                    <img v-if="item.img != ''" :src="item.img" alt="" />
                    <img
                      v-else
                      src="https://pic.imgdb.cn/item/65bb8f6d871b83018ae8bcac.png"
                      alt=""
                    />
                  </div>
                  <div class="content_box flex flex_direction_column">
                    <div class="flex flex_direction_row align_items_center">
                      <span class="classification">{{
                        item.classification
                      }}</span>
                      <span class="title">{{ item.title }}</span>
                    </div>
                    <span class="short_meg" v-html="item.short_message"></span>
                    <div
                      class="flex flex_direction_row align_items_center justify_content_space_between"
                    >
                      <div
                        class="user_item flex flex_direction_row align_items_center"
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
          </div>
          <div class="page_right flex flex_direction_column">
            <img
              src="https://pic.imgdb.cn/item/65c1c6299f345e8d03ffc79e.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="page_3 bg relative"></div> -->
    <!-- <div class="page_4 bg relative"></div> -->
    <div
      class="home_foot relative flex flex_direction_row align_items_center justify_content_center"
    >
      <div class="left_foot flex flex_direction_column">
        <span class="title_foot"></span>
      </div>
      <div class="mid_foot flex flex_direction_column">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot flex flex_direction_column">
        <span class="title_foot">联系我</span>
      </div>
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
$index_title_color: var(--index_title_color, #00cbff);
@font-face {
  font-family: "orbitron-black";
  src: url("/src/assets/font/orbitron-black.ttf");
}
#home_main {
  width: 100vw;
  min-height: 100vh;
  // scroll-snap-type: y mandatory;
  background: $home_bg_color;
  li{
  list-style: none;
  padding: 0 0;
}
  .home_nav_item {
    font-size: 1.4em;
    position: relative;
    margin: 0;
    padding-left: 1vw;
    color: $index_title_color;
    text-shadow: #3c3e41 2px 3px 2px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    &::after {
      content: "";
      position: absolute;
      width: 0.5vw;
      height: 100%;
      background: $index_title_color;
      left: 0;
    }
  }
  .page_1_bg {
    width: 100vw;
    height: 100vh;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    // background-attachment: fixed;

    // background-position: center center;
    // width: 100vw;

    // background-repeat: no-repeat;
    // background-size: cover;
    // min-height: 100vh;
  }
  .page_1 {
    // background-image: url("https://pic.imgdb.cn/item/65c06fca9f345e8d034cae1c.png");
    z-index: 0;
    width: 100vw;
    height: 100vh;
    .page_1_title {
      font-size: 3em;
      top: 50%;
      left: 50%;
      color: #ff00ca;
      transform: translate(-50%, -50%);
      position: fixed;
      font-family: "orbitron-black";
    }
    .more {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      animation: more 2s infinite linear both;
      z-index: 100;
      path {
        fill: #ffff;
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
    // background-image: url("https://pic.imgdb.cn/item/65b9140d871b83018ad891c7.jpg");
    // background-image: url("/src/assets/imgs/114356114_p0.jpg");
    // background-size: cover;
    width: 100vw;
    // background: #00cbff;
    .page_2_bg {
      width: 100vw;
      height: 100vh;
      position: sticky;
      top: 0;
      z-index: 0;
      .page_2_bg_img {
        height: calc(100vh - 100px);
        transform: translateY(100px);
      }
    }

    min-height: 200vh;
    width: inherit;
    .page_container {
      width: 100vw;
      .page_2_header {
        z-index: 2;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        .notice {
          width: 87vw;
          margin: 1vh auto;
          background: #f8f8ff;
          padding: 1vh;
          border-radius: 5px;
          box-shadow: 0 4px 10px rgba(61, 73, 87, 0.112);

          .notice_text {
            margin-left: 1vw;
            color: #ff9900;
          }
        }
      }
      .page_content {
        gap: 1vw;
        width: 100vw;
        z-index: 1;
        .page_left {
          width: 11vw;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          .nav_box {
            position: sticky;
            top: 80px;
            width: inherit;
            min-height: 10vh;
            background: #ffffff;
            border-radius: 5px;
            margin-bottom: 2vh;
            box-shadow: 0 4px 10px rgba(61, 73, 87, 0.112);

            ul {
              padding: 0;
              gap: 1vh;
              margin: 1vw;
              li {
                font-size: 1em;
                font-weight: 100;
                color: #123;
                .active_item {
                  color: #00cbff;
                  font-weight: bold;
                }
                .normal_item {
                }
              }
            }
          }
        }
        .page_mid {
          width: 60vw;
          .page_top_box {
            gap: 1vw;
            margin-bottom: 1vh;
            .home_carousel {
              transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
              box-shadow: 0 3px 6px rgba(31, 45, 61, 0.557);
            }
            .rect_box {
              width: 19vw;
              height: 30vh;
              gap: 1vh;
              .rect_item {
                width: inherit;
                height: 9.333vh;
                border-radius: 5px;
                background: #ffffff;
                overflow: hidden;
                box-shadow: 0 2px 5px rgba(31, 45, 61, 0.15);
                transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

                // span {
                //   z-index: 2;
                //   font-size: 1.5em;
                //   font-weight: bold;
                //   font-family: "orbitron-black";

                //   color: #ff6600;
                // }

                &:hover {
                  box-shadow: 0 1px 2px rgba(31, 45, 61, 0.15);
                  transform: translateY(-0.2vh);
                  transition: box-shadow 1s cubic-bezier(0.075, 0.82, 0.165, 1),
                    transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  .leet_code {
                  }
                }
                .leet_code {
                }
              }
            }
          }
          .new_topic_box {
            width: inherit;
            .new_item_box {
              padding: 0;
              width: inherit;
              flex-wrap: wrap;
              .topic_item {
                border-radius: 5px;
                width: 29.5vw;
                height: 40vh;
                background: #fff;
                transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);

                &:hover {
                  // transform: translateY(-0.6vh);
                  box-shadow: 0 3px 5px rgba(31, 45, 61, 0.2);
                }
                &:active {
                  animation: jump 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                }
                &:nth-child(even) {
                  .img_box {
                    clip-path: polygon(100% 0, 0% 0, 0% 100%, 88% 100%);
                  }
                }
                .img_box {
                  width: inherit;
                  height: 25vh;
                  overflow: hidden;
                  border-top-left-radius: 5px;
                  border-top-right-radius: 5px;
                  position: relative;
                  clip-path: polygon(0% 0, 100% 0, 100% 100%, 12% 100%);
                  &::after {
                    content: "";
                    position: absolute;
                    bottom: -1vh;
                    left: 0;
                    width: inherit;
                    height: 10vh;
                    pointer-events: none;
                    background: linear-gradient(to top, #e0ffff, transparent);
                  }

                  .img {
                    width: inherit;
                    height: 25vh;
                    border-radius: inherit;
                    object-fit: cover;
                    border-top-right-radius: 5px;
                    border-top-left-radius: 5px;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover {
                      transform: scale(1.1);
                    }
                  }
                }

                .date {
                  align-self: flex-start;
                  margin-top: auto;
                  font-size: 0.7em;
                }
                .topic_item_content {
                  margin: 2vw;
                  height: 13vh;
                  .classification {
                    font-size: 0.6em;
                    padding: 0.4em;
                    background: #00cbff;
                    border-radius: 0.4em;
                    margin-right: 0.3em;
                    color: #fff;
                  }
                  .title {
                    font-size: 1em;
                    font-weight: 700;
                    color: #0a0606;

                    &:hover {
                      color: #384f89;
                    }
                  }
                  .short_meg {
                    margin: 1vh 0;
                    height: 7vh;
                    overflow: scroll;
                    font-size: 0.9em;
                  }
                }
              }
            }
          }
          .recommend_topic_box {
            width: inherit;

            .recommend_item_box {
              width: inherit;
              flex-wrap: wrap;
              gap: 2vh;
              padding: 0;

              .recommend_item {
                width: inherit;
                height: 20vh;
                border-radius: 5px;
                background: #fff;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 8px 5px #1f2d3d26;
                &::after {
                  content: "";
                  position: absolute;
                  width: 30vw;
                  right: 29vw;
                  height: inherit;
                  z-index: 10;
                  pointer-events: none;
                  background: linear-gradient(to left, #fff 10%, transparent);
                }
                &:hover {
                  // transform: translateY(-0.6vh);
                  box-shadow: 0 3px 5px #1f2d3d33;
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
                    width: 30vw;
                    right: 0vw;
                    height: inherit;
                    background: linear-gradient(
                      to right,
                      #ffff 10%,
                      transparent
                    );
                  }
                  .img_box {
                    border-bottom-right-radius: 5px;
                    border-top-right-radius: 5px;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                  }
                }
                .img_box {
                  width: 30vw;
                  height: inherit;
                  order: 1;
                  border-bottom-left-radius: 5px;
                  border-top-left-radius: 5px;
                  overflow: hidden;

                  img {
                    width: inherit;
                    height: calc(100% + 1vh);
                    border-radius: inherit;
                    object-fit: cover;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                    &:hover {
                      transform: scale(1.07);
                    }
                  }
                }
                .content_box {
                  width: 26vw;
                  height: calc(20vh - 2vw);
                  order: 2;
                  margin: 2vw;

                  .classification {
                    font-size: 0.6em;
                    padding: 0.4em;
                    background: #c2ed87;
                    border-radius: 0.4em;
                    margin-right: 0.3em;
                    color: #ffff;
                  }
                  .title {
                    font-weight: 800;
                    &:hover {
                      color: #384f89;
                    }
                  }
                  .short_meg {
                    margin-top: 2vh;
                    height: 7vh;
                    font-size: 0.9em;
                    overflow: scroll;
                  }
                  .font_07_em {
                    font-size: 0.7em;
                  }
                  .user_avatar {
                    width: 1.8vw;

                    height: 1.8vw;
                    border-radius: 50%;
                    margin-right: 0.2vw;
                    transform: translateY(-0.2vh);
                  }
                  .date {
                    justify-self: flex-end;
                    letter-spacing: 0.1em;
                    font-size: 0.7em;
                  }
                }
              }
            }
          }
        }
        .page_right {
          width: 15vw;
          position: relative;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          img {
            position: sticky;
            top: 80px;
            width: inherit;
            margin-bottom: 2vh;
            border-radius: 5px;
            box-shadow: 0 4px 5px rgba(26, 40, 53, 0.297);
          }
        }
      }
    }
  }

  .home_foot {
    width: inherit;
    height: 40vh;
    gap: 2vw;
    background: #272727;
    .title_foot {
      font-size: 1.2em;
      color: #ffff;
      opacity: 0.4;
    }
    .left_foot {
      width: 30vw;
      height: 30vh;
      background: #003153;
    }
    .mid_foot {
      width: 20vw;
      height: 30vh;
      background: #003153;
    }
    .right_foot {
      width: 30vw;
      height: 30vh;
    }
  }
}
@keyframes jump {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(2vh);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
