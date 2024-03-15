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
  scroll_handle();
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
  // if (scroll_y >= start && scroll_y <= end) {
  // page_1_title.style.opacity = create_animation(start, end, 1, 0)(scroll_y);
  // page_1_title.style.filter = `blur(${create_animation(
  //  start,
  // end,
  // 0,
  // 10
  //)(scroll_y)}px)`;
  // page_1_title.style.transform = `scale(${create_animation(
  //   start,
  //   end,
  //   1,
  //   2
  // )(scroll_y)}) translate(-50%,-50%)`;
  // }
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
    c_c("--home_bg", "#0b0e14");
    c_c("--home_bg_opacity", "0");
    c_c("--home_bg_top", "#0d1c2b");
    c_c("--home_color", "#fff");
    c_c("--index_title_color", "#33383a");
    c_c("--text_color", "#fdfbfb");
    c_c("--box_bg", "#242b3dc7");
    c_c("--recommend_item_bg", "#242b3dc7");
    c_c("--home_main_color", "#b5b9d6");
    c_c("--page_1_title_color", "#242b3dc7");
    c_c("--content_box_color", "#ffff");
    c_c("--title_color", "#fdfbfb");
    c_c("--short_msg_color", "#fdfbfb");
    c_c("--title_hover", "#b5b9d6");
    c_c("--home_nav_item_box_shadow", "#b5b9d6");
    c_c("--page_1_title_color", "#b5b9d6");
    c_c("--page_1_title_box_shadow_1", "rgba(181, 185, 214,.8)");
    c_c("--page_1_title_box_shadow_2", "rgba(181, 185, 214,.6)");
    c_c("--page_1_title_box_shadow_3", "rgba(181, 185, 214,.4)");
    c_c("--page_1_title_box_shadow_4", "rgba(181, 185, 214,.2)");
    c_c("--page_1_title_box_shadow_5", "rgba(181, 185, 214,.05)");
  } else {
    c_c("--home_bg", "#fdfbfb");
    c_c("--home_bg_opacity", "1");
    c_c("--home_bg_top", "#fdfbfb");
    c_c("--home_color", "#4d4949");
    c_c("--index_title_color", "#33383a");
    c_c("--text_color", "#ffff");
    c_c("--box_bg", "#ffff");
    c_c("--recommend_item_bg", "#ffff");
    c_c("--home_main_color", "#a5e3ba");
    c_c("--page_1_title_color", "#c6ebbd");
    c_c("--content_box_color", "#747576");
    c_c("--title_color", "#4d4949");
    c_c("--short_msg_color", "#747576");
    c_c("--title_hover", "#0ebd7d");
    c_c("--home_nav_item_box_shadow", "#99edb5");
    c_c("--page_1_title_color", "#c6ebbd");
    c_c("--page_1_title_box_shadow_1", "rgba(198, 235, 189, 0.8)");
    c_c("--page_1_title_box_shadow_2", "rgba(198, 235, 189, 0.6)");
    c_c("--page_1_title_box_shadow_3", "rgba(198, 235, 189, 0.4)");
    c_c("--page_1_title_box_shadow_4", "rgba(198, 235, 189, 0.2)");
    c_c("--page_1_title_box_shadow_5", "rgba(198, 235, 189, 0.05)");
  }
};
const go_to_next_page = () => {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });

};
const page_two_handle = () => {
  // let target = item.offsetTop + window.innerHeight - 80;
  let scroll_y = window.scrollY;
  let page_2_header = document.querySelector(".page_2_header");
  let page_2_nav_item = document.querySelectorAll(".page_2_nav_item");
  let re_note_item = document.querySelectorAll(".re_note_item");
  let home_nav_item = document.querySelectorAll(".home_nav_item");
  // let page_left = document.querySelector(".page_content .page_left");
  // let page_right = document.querySelector(".page_content .page_right");
  let home_carousel = document.querySelector(".page_content .home_carousel");
  let rect_list = document.querySelectorAll(
    ".page_top_box .rect_box .rect_item"
  );
  // let home_nav_item_list = document.querySelectorAll(".home_nav_item");
  let recommend_fade_item_list = document.querySelectorAll(
    ".recommend_item_box .fade_item"
  );
  let new_fade_item_list = document.querySelectorAll(
    ".new_item_box .fade_item"
  );
  const page_2 = document.querySelector(".page_2");
  // if (
  //   scroll_y > window.innerHeight - 80 + nav_list.value[0].offsetTop &&
  //   scroll_y < window.innerHeight - 80 + page_2.getBoundingClientRect().height
  // ) {
  //   for (let i = 0; i < nav_list.value.length; i++) {
  //     const element = nav_list.value[i];
  //     if (element.offsetTop + window.innerHeight - 80 <= scroll_y) {
  //       current_nav_index.value = i;
  //     }
  //   }
  // } else {
  //   current_nav_index.value = -1;
  // }
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
  // if (
  //   scroll_y >=
  //   window.innerHeight + page_left.offsetTop - window.innerHeight / 2
  // ) {
  //   page_left.style.transform = "translateX(0)";
  //   page_left.style.opacity = 1;
  // } else {
  //   page_left.style.transform = "translateX(-10vh)";
  //   page_left.style.opacity = 0;
  // }
  // if (
  //   scroll_y >=
  //   window.innerHeight + page_right.offsetTop - window.innerHeight / 2
  // ) {
  //   page_right.style.transform = "translateX(0)";
  //   page_right.style.opacity = 1;
  // } else {
  //   page_right.style.transform = "translateX(10vh)";
  //   page_right.style.opacity = 0;
  // }
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
      setTimeout(() => {
        rect_list[i].style.transform = "scaleX(1)";
        rect_list[i].style.opacity = 1;
      }, i * 100);
    } else {
      setTimeout(() => {
        rect_list[i].style.opacity = 0;
        rect_list[i].style.transform = "scaleX(1.3)";
      }, i * 100);
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
        page_2_nav_item[i].style.opacity = 1;
      }, i * 100);
    } else {
      setTimeout(() => {
        page_2_nav_item[i].style.opacity = 0;
      }, i * 100);
    }
  }
  // for (let i = 0; i < home_nav_item_list.length; ++i) {
  //   if (
  //     scroll_y >=
  //     window.innerHeight +
  //       home_nav_item_list[i].offsetTop -
  //       window.innerHeight / 1.3
  //   ) {
  //     home_nav_item_list[i].style.transform = "scaleX(1)";
  //     home_nav_item_list[i].style.opacity = 1;
  //   } else {
  //     home_nav_item_list[i].style.transform = "scaleX(1.3)";
  //     home_nav_item_list[i].style.opacity = 0;
  //   }
  // }
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
  for (let i = 0; i < home_nav_item.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight + home_nav_item[i].offsetTop - window.innerHeight / 1.2
    ) {
      home_nav_item[i].style.transform = "scale(1)";
      home_nav_item[i].style.opacity = 1;
    } else {
      home_nav_item[i].style.transform = "scale(1.4)";
      home_nav_item[i].style.opacity = 0;
    }
  }
  for (let i = 0; i < re_note_item.length; ++i) {
    if (
      scroll_y >=
      window.innerHeight + re_note_item[0].offsetTop - window.innerHeight / 1.2
    ) {
      setTimeout(() => {
        re_note_item[i].style.opacity = 1;
        re_note_item[i].style.transform = "scale(1)";
      }, i * 100);
    } else {
      setTimeout(() => {
        re_note_item[i].style.opacity = 0;
        re_note_item[i].style.transform = "scale(1.5)";
      }, i * 100);
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
  { link: "https://pic.imgdb.cn/item/65ba35e7871b83018ac84a5d.png" },
  { link: "https://pic.imgdb.cn/item/65a3e577871b83018a7ef617.jpg" },
  { link: "https://pic.imgdb.cn/item/65a6daad871b83018a885744.png" },
  // { link: "/src/assets/imgs/temp.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
  // { link: "/src/assets/imgs/temp.jpg" },
];
const re_note_list = ref([
  {
    id: 3,
    name: "线性代数",
    link: "/note/noteInfo/3",
    create_date: "2024?01?14?11:06",
    img: "https://pic.imgdb.cn/item/65e2eb629f345e8d031af15c.png",
    author: "",
    tags: "线性代数",
    classification: "数学",
    short_message: "线性代数是数学重要分支，在各学科中应用广泛.",
  },
  {
    id: 2,
    name: "高等数学",
    link: "/note/noteInfo/2",
    create_date: "2024?01?14?11:06",
    img: "https://pic.imgdb.cn/item/65e2edd59f345e8d0321db0d.png",
    author: "",
    tags: "高等数学?微积分",
    classification: "数学",
    short_message:
      "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科.",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "/note/noteInfo/1",
    create_date: "2024?01?14?11:06",
    img: "https://pic.imgdb.cn/item/65e2f0b89f345e8d0329f381.png",
    author: "",
    tags: "概率论?数理统计",
    classification: "数学",
    short_message: "概率论与数理统计是研究随机现象客观规律的数学学科.",
  },
  {
    id: 1,
    name: "概率论与数理统计",
    link: "/note/noteInfo/1",
    create_date: "2024?01?14?11:06",
    img: "",
    author: "",
    tags: "概率论?数理统计",
    classification: "数学",
    short_message: "概率论与数理统计是研究随机现象客观规律的数学学科.",
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
  // init_nav_list();
  // const rect_item = document.querySelectorAll(".rect_item")
  // rect_item.forEach(element => {
  //   element.style.backgroundColor = `rgba(  ${Math.floor(
  //     Math.random() * 256
  //   )},  ${Math.floor(Math.random() * 100)},  ${Math.floor(
  //     Math.random() * 256
  //   )},1)`;  });
};
const nav_list = ref([]);
// const init_nav_list = () => {
//   const home_nav_item = document.querySelectorAll(".home_nav_item");
//   for (const item of home_nav_item) {
//     nav_list.value.push(item);
//   }
// };
// const current_nav_index = ref(-1);
// const jump_to_nav = (item, index) => {
//   let target = item.offsetTop + window.innerHeight - 70;
//   if (target > window.scrollY) {
//     let t = setInterval(() => {
//       if (window.scrollY + 60 < target) {
//         window.scrollTo(0, window.scrollY + 60);
//       } else {
//         window.scrollTo(0, target);
//         clearInterval(t);
//       }
//     }, 10);
//   } else if (target < window.scrollY) {
//     let t = setInterval(() => {
//       if (window.scrollY + 60 > target) {
//         window.scrollTo(0, window.scrollY - 60);
//       } else {
//         window.scrollTo(0, target);
//         clearInterval(t);
//       }
//     }, 10);
//   } else {
//     return;
//   }
//   current_nav_index.value = index;
// };
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
    <!-- <img
      class="home_main_bg fixed"
      src="https://pic.imgdb.cn/item/65d765569f345e8d03dac4f9.png"
      alt=""
    /> -->
    <div class="page_1 relative">
      <!-- <img
        class="page_1_bg"
        src="https://pic.imgdb.cn/item/65d04ac49f345e8d0318b9e3.jpg"
        alt=""
      /> -->
      <div class="page_1_title flex absolute flex_direction_column">
        <span class="title_1 flex flex_direction_row align_items_center"
          >Tiny</span
        ><span class="title_2">Flowers</span>
      </div>
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

      <!-- <div class="page_2_bg fixed">
        <img
          class=" page_2_bg_img"
          src="https://pic.imgdb.cn/item/65c113f79f345e8d039e2124.png"
          alt=""
        />
      </div> -->
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
                fill="#af886e"
                p-id="5228"
              ></path>
              <path
                d="M632.414815 183.751111v638.482963l132.740741 60.112593V140.136296l-132.740741 43.614815z"
                fill="#FFB695"
                p-id="5229"
              ></path>
              <path
                d="M735.573333 157.582222v707.887408l-347.401481-178.631111V329.955556l347.401481-172.373334m30.340741-86.85037a37.925926 37.925926 0 0 0-15.54963 3.413333l-430.459259 213.522963v440.888889l430.459259 221.297778a37.925926 37.925926 0 0 0 53.665186-34.512593V108.657778a37.925926 37.925926 0 0 0-37.925926-37.925926z"
                fill="#af886e"
                p-id="5230"
              ></path>
              <path
                d="M878.933333 403.531852a7.585185 7.585185 0 0 1 7.585186 7.585185v204.8a7.585185 7.585185 0 0 1-7.585186 7.585185h-73.955555v-219.97037h73.955555m0-68.266667h-142.222222v356.503704h142.222222a75.851852 75.851852 0 0 0 75.851852-75.851852v-204.8a75.851852 75.851852 0 0 0-75.851852-75.851852zM251.638519 728.557037v135.395556a21.048889 21.048889 0 0 1-21.048889 21.048888h-14.411852a21.048889 21.048889 0 0 1-21.048889-21.048888v-135.395556h56.888889m68.266666-68.266667H126.672593v203.662223a89.315556 89.315556 0 0 0 89.315555 89.315555h14.411852a89.315556 89.315556 0 0 0 89.315556-89.315555V660.29037z"
                fill="#af886e"
                p-id="5231"
              ></path>
            </svg>
            <span class="notice_text"></span>
          </div>
        </div>
        <div
          class="page_content flex flex_direction_row justify_content_center"
        >
          <!-- <div class="page_left flex flex_direction_column">
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
          </div> -->
          <div class="page_mid flex flex_direction_column">
            <div class="page_top_box flex flex_direction_row">
              <HomeCarousel
                class="home_carousel"
                :data="carousel_data"
              ></HomeCarousel>
              <div class="rect_box">
                <div
                  @click="go_to('https://leetcode.cn/problemset/')"
                  class="rect_item rect_1 flex align_items_center justify_content_center relative"
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
                  leetcode
                </div>
                <div
                  class="rect_item rect_2 flex align_items_center justify_content_center relative"
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
                  codeforces
                </div>
                <div
                  class="rect_item rect_3 flex align_items_center justify_content_center relative"
                ></div>
                <div
                  class="rect_item rect_4 flex align_items_center justify_content_center relative"
                ></div>
              </div>
            </div>
            <div
              class="page_2_nav_box flex flex_direction_row align_items_center"
            >
              <div
                class="page_2_nav_item flex align_items_center justify_content_center"
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
                    d="M661.504 362.496c0-65.536 53.248-120.832 120.832-120.832 65.536 0 120.832 53.248 120.832 120.832v481.28c0 32.768-26.624 59.392-59.392 59.392h-180.224V362.496h-2.048z"
                    fill="#dfbfb2"
                    p-id="12146"
                  ></path>
                  <path
                    d="M120.832 782.336c0 65.536 53.248 120.832 120.832 120.832h600.064c-32.768 0-59.392-26.624-59.392-59.392V241.664c0-65.536-53.248-120.832-120.832-120.832H241.664c-65.536 0-120.832 53.248-120.832 120.832v540.672z"
                    fill="#8592a2"
                    p-id="12147"
                  ></path>
                  <path
                    d="M227.328 301.056c0-24.576 20.48-45.056 45.056-45.056h59.392c24.576 0 45.056 20.48 45.056 45.056 0 24.576-20.48 45.056-45.056 45.056h-59.392c-24.576 0-45.056-20.48-45.056-45.056zM227.328 481.28c0-24.576 20.48-45.056 45.056-45.056h360.448c24.576 0 45.056 20.48 45.056 45.056 0 24.576-20.48 45.056-45.056 45.056H272.384c-24.576 0-45.056-20.48-45.056-45.056zM272.384 616.448c-24.576 0-45.056 20.48-45.056 45.056 0 24.576 20.48 45.056 45.056 45.056h180.224c24.576 0 45.056-20.48 45.056-45.056 0-24.576-20.48-45.056-45.056-45.056h-180.224z"
                    fill="#dcdddf"
                    p-id="12148"
                  ></path></svg
                >文章
              </div>
              <div
                class="page_2_nav_item flex align_items_center justify_content_center"
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
                    d="M242.688 311.936m-99.968 0a99.968 99.968 0 1 0 199.936 0 99.968 99.968 0 1 0-199.936 0Z"
                    fill="#97a5c0"
                    p-id="21521"
                  ></path>
                  <path
                    d="M242.688 512m-99.968 0a99.968 99.968 0 1 0 199.936 0 99.968 99.968 0 1 0-199.936 0Z"
                    fill="#97a5c0"
                    p-id="21522"
                  ></path>
                  <path
                    d="M242.688 712.064m-99.968 0a99.968 99.968 0 1 0 199.936 0 99.968 99.968 0 1 0-199.936 0Z"
                    fill="#97a5c0"
                    p-id="21523"
                  ></path>
                  <path
                    d="M247.808 311.936m-66.688 0a66.688 66.688 0 1 0 133.376 0 66.688 66.688 0 1 0-133.376 0Z"
                    fill="#FFFFFF"
                    p-id="21524"
                  ></path>
                  <path
                    d="M247.808 512m-66.688 0a66.688 66.688 0 1 0 133.376 0 66.688 66.688 0 1 0-133.376 0Z"
                    fill="#FFFFFF"
                    p-id="21525"
                  ></path>
                  <path
                    d="M247.808 712.064m-66.688 0a66.688 66.688 0 1 0 133.376 0 66.688 66.688 0 1 0-133.376 0Z"
                    fill="#FFFFFF"
                    p-id="21526"
                  ></path>
                  <path
                    d="M281.216 111.872h533.504c36.864 0 66.688 29.824 66.688 66.688v666.88c0 36.864-29.824 66.688-66.688 66.688H281.216c-36.864 0-66.688-29.824-66.688-66.688v-666.88c0-36.736 29.824-66.688 66.688-66.688z"
                    fill="#97a5c0"
                    p-id="21527"
                  ></path>
                  <path
                    d="M814.592 678.656h66.688v166.656c0 36.864-29.824 66.688-66.688 66.688H581.248c0-128.768 104.448-233.344 233.344-233.344z"
                    fill="#97a5c0"
                    p-id="21528"
                  ></path>
                  <path
                    d="M409.472 278.656h333.44c18.432 0 33.28 14.976 33.28 33.28 0 18.432-14.976 33.28-33.28 33.28H409.472c-18.432 0-33.28-14.976-33.28-33.28-0.128-18.432 14.848-33.28 33.28-33.28zM409.472 478.72h333.44c18.432 0 33.28 14.976 33.28 33.28 0 18.432-14.976 33.28-33.28 33.28H409.472c-18.432 0-33.28-14.976-33.28-33.28-0.128-18.432 14.848-33.28 33.28-33.28zM409.472 678.656h166.656c18.432 0 33.28 14.976 33.28 33.28 0 18.432-14.976 33.28-33.28 33.28H409.472c-18.432 0-33.28-14.976-33.28-33.28-0.128-18.304 14.848-33.28 33.28-33.28z"
                    fill="#FFFFFF"
                    p-id="21529"
                  ></path>
                  <path
                    d="M848 745.344h33.28v99.968c0 36.864-29.824 66.688-66.688 66.688H681.216c0-92.032 74.624-166.656 166.784-166.656z"
                    fill="#97a5c0"
                    p-id="21530"
                  ></path>
                </svg>
                笔记
              </div>
              <div
                class="page_2_nav_item flex align_items_center justify_content_center"
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
                    d="M493.4656 529.1008l-20.6336-51.2512c-15.0016-36.1984-23.1936-55.808-24.5248-58.7776L416.4608 352.256c-22.528-47.872-44.2368-71.8848-65.024-71.8848-31.488 0-56.2176 27.7504-74.3424 83.1488-13.312-4.608-19.968-11.264-19.968-20.0704 0-25.7536 15.9232-55.3472 47.6672-88.6784C336.64 221.44 365.2096 204.8 390.4512 204.8c49.408 0 100.608 67.072 153.7536 201.216l13.568 33.0752 15.3088-23.04C667.2896 275.2 746.7008 204.8 811.3152 204.8c16.7936 0 36.5056 4.608 59.0848 13.7216l-80.384 79.36a101.12 101.12 0 0 0-22.6304-4.352c-48.64 0-106.7008 52.736-173.9776 158.1056l-19.2512 30.4128 15.2064 38.3488c58.2144 151.296 105.984 226.8672 143.872 226.8672 34.7136 0 61.184-23.3472 79.4112-69.9904 12.3904 7.5264 18.5856 15.2064 18.5856 23.1424 0 20.8896-17.664 45.8752-53.0944 75.008-35.4304 29.184-65.8944 43.776-91.5968 43.776-51.3536 0-103.7312-68.096-157.2864-204.3392l-18.5856-46.336-19.2 31.9488C401.2032 746.2912 314.8288 819.2 232.5504 819.2c-30.9248 0-57.2416-7.2704-78.9504-21.7088l76.9536-70.8096c13.312 12.4928 28.7744 18.7392 46.4896 18.7392 49.9712 0 106.24-47.616 168.5504-142.9504l34.56-52.5824 13.312-20.7872z"
                    fill="#70859c"
                    p-id="33540"
                  ></path>
                </svg>
                数学
              </div>
            </div>
            <div class="new_topic_box flex flex_direction_column">
              <ul class="flex flex_direction_row new_item_box">
                <li
                  v-for="(item, index) in new_topic_list"
                  :key="item"
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
              <h2 class="home_nav_item"><span>推荐文章</span></h2>
              <ul class="flex flex_direction_row recommend_item_box">
                <li
                  @click="go_to_by_path(item.link)"
                  @mouseenter="enter_recommend_topic(index)"
                  @mouseleave="leave_recommend_topic(index)"
                  v-for="(item, index) in recommend_topic_list"
                  :key="item"
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
                      class="content_bottom_box flex flex_direction_row align_items_center justify_content_space_between"
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
            <div class="re_note_box">
              <h2 class="home_nav_item"><span>推荐笔记</span></h2>
              <ul class="re_note_item_box flex flex_direction_row">
                <li
                  class="re_note_item relative"
                  v-for="item in re_note_list"
                  :key="item"
                >
                  <div class="re_note_img_box relative">
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
                    <div class="note_short_message relative">
                      {{ item.short_message }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="page_right flex flex_direction_column">
          <img
              src="https://pic.imgdb.cn/item/65c1c6299f345e8d03ffc79e.jpg"
              alt=""
            /> 
           </div>  -->
        </div>
      </div>
    </div>
    <!-- <div class="page_3 bg relative"></div> -->
    <!-- <div class="page_4 bg relative"></div> -->
    <div
      class="home_foot relative flex flex_direction_row align_items_center justify_content_center"
    >
      <div class="left_foot flex flex_direction_column">
        <span class="title_foot">人生格言</span>
        <span class="text_foot">{{user_store.aphorism}}</span>
      </div>
      <div class="mid_foot flex flex_direction_column">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot flex flex_direction_column">
        <span class="title_foot">联系我</span>
        <span class="text_foot">邮箱:{{user_store.e_mail}}</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$home_bg: var(--home_bg, #384f89);
$home_bg_opacity: var(--home_bg_opacity, 1);
$home_bg_top: var(--home_bg_top, #0d1c2b);
$home_color: var(--home_color, #4d4949);
$index_title_color: var(--index_title_color, #33383a);
$home_main_color: var(--home_main_color, #a5e3ba);
$content_box_color: var(--content_box_color, #747576);
$title_color: var(--title_color, #4d4949);
$short_msg_color: var(--short_msg_color, #747576);
$title_hover: var(--title_hover, #0ebd7d);
$home_nav_item_box_shadow: var(--home_nav_item_box_shadow, #99edb5);
$page_1_title_color: var(--page_1_title_color, #c6ebbd);
$page_1_title_box_shadow_1: var(--page_1_title_box_shadow_1, rgba(198, 235, 189, 0.8));
$page_1_title_box_shadow_2: var(--page_1_title_box_shadow_2, rgba(198, 235, 189, 0.6));
$page_1_title_box_shadow_3: var(--page_1_title_box_shadow_3, rgba(198, 235, 189, 0.4));
$page_1_title_box_shadow_4: var(--page_1_title_box_shadow_4, rgba(198, 235, 189, 0.2));
$page_1_title_box_shadow_5: var(--page_1_title_box_shadow_5, rgba(198, 235, 189, 0.05));

$text_color: var(--text_color, #fff);
$recommend_item_bg: var(--recommend_item_bg, #fff);
$box_bg: var(--box_bg, #fff);
@font-face {
  font-family: "orbitron-black";
  src: url("/src/assets/font/orbitron-black.ttf");
}
#home_main {
  width: 100vw;
  min-height: 100vh;
  // scroll-snap-type: y mandatory;
  background: linear-gradient($home_bg_top,$home_bg);
  color: $home_color;
  ::selection {
    color: $text_color;
    background-color: $home_main_color;
  }
  overflow: hidden;
  &::after {
    width: 100vw;
    height: 100vh;
    content: "";
    left: 0;
    top: 0;
    position: fixed;
    z-index: 0;
    opacity: $home_bg_opacity;
    background: url("https://pic.imgdb.cn/item/65f38f9f9f345e8d03ad1fa8.png")
      repeat;

  }

  li {
    list-style: none;
    padding: 0 0;
  }
  .home_nav_item {
    font-size: 15px;
    position: relative;
    margin: 32px 1vw;
    margin-bottom: 16px;
    height: 40px;
    font-weight: lighter;
    color: $index_title_color;
    border-bottom: $home_main_color 1px solid;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    span {
      background: $home_main_color;
      box-shadow: $home_nav_item_box_shadow 0 10px 10px;
      border-radius: 1000px;
      color: $text_color;
      padding: 8px 16px;
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
    z-index: 10;
    width: 100vw;
    height: 100vh;
    .page_1_title {
      font-size: 9em;
      top: 50%;
      left: 50%;
      color: $page_1_title_color;
      transform: translate(-50%, -50%);
      font-family: "orbitron-light";
      text-shadow: 10px 10px 0 $page_1_title_box_shadow_1,
       20px 20px 0 $page_1_title_box_shadow_2,
        30px 30px 0 $page_1_title_box_shadow_3,
        40px 40px 0 $page_1_title_box_shadow_4,
        50px 50px 0 $page_1_title_box_shadow_5;
      .title_1 {
        gap: 1vw;
        .flower_icon {
          transform: skewX(19deg);
        }
        transform: skewX(-19deg);
        animation: title 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      .title_2 {
        transform: skewX(-19deg);

        animation: title 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
      @keyframes title {
        0% {
          transform: translateY(100%) skewX(-19deg);
        }
        100% {
          transform: translateY(0%) skewX(-19deg);
        }
      }
    }
    .more {
      bottom: 0;
      left: 49%;
      transform: translateX(-50%);
      animation: more 2s infinite linear both;
      z-index: 100;
      path {
        fill: $title_hover;
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
    min-height: 200vh;
    .page_2_bg {
      width: 100vw;
      height: 100vh;
      position: sticky;
      top: 0;
      left: 0;
      z-index: 0;
      .page_2_bg_img {
        opacity: 0.2;
        height: calc(100vh - 100px);
        transform: translateY(100px);
      }
    }

    .page_container {
      width: 100vw;
      .page_2_header {
        z-index: 2;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        .notice {
          width: 76vw;
          margin: 16px auto;
          background: $box_bg;
          padding: 1vh;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(26, 27, 28, 0.112);

          .notice_text {
            margin-left: 16px;
            color: #af886e;
          }
        }
      }
      .page_content {
        gap: 1vw;
        width: 100vw;
        z-index: 1;

        .page_left {
          width: 3vw;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          .nav_box {
            position: sticky;
            top: 80px;
            width: inherit;
            min-height: 10vh;
            background: $box_bg;
            border-radius: 10px;
            margin-bottom: 2vh;
            box-shadow: 0 4px 10px rgba(26, 27, 28, 0.112);

            ul {
              padding: 0;
              gap: 2vh;
              margin: 1vw;
              li {
                font-size: 1em;
                font-weight: 100;
                color: rgb(255, 255, 255);
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
          width: 76vw;
          .page_top_box {
            gap: 16px;
            width: inherit; //76
            margin-bottom: 20px;
            .home_carousel {
              transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
              box-shadow: 0 2px 5px rgba(31, 45, 61, 0.15);
            }
            .rect_box {
              width: 25vw;
              height: 30vh;
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
                grid-area: rect_3;
              }
              .rect_4 {
                grid-area: rect_4;
              }
              .rect_item {
                border-radius: 10px;
                background: $box_bg;
                user-select: none;
                overflow: hidden;
                gap: 8px;
                font-size: 20px;
                font-family: "orbitron-light";
                font-weight: 900;
                letter-spacing: 2px;
                color: #af886e;
                box-shadow: 0 2px 5px rgba(31, 45, 61, 0.15);
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                &:hover {
                  color: #8b8079;
                }

                &:hover {
                  box-shadow: 0 1px 2px rgba(31, 45, 61, 0.15);
                  transform: translateY(-0.2vh);
                  transition: box-shadow 0.5s
                      cubic-bezier(0.075, 0.82, 0.165, 1),
                    transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  .leet_code {
                  }
                }
                .leet_code {
                }
              }
            }
          }
          .page_2_nav_box {
            width: 76vw;
            height: 35px;
            margin-bottom: 32px;
            border-radius: 10px;

            gap: 32px;
            .page_2_nav_item {
              width: 100px;
              height: 35px;
              gap: 4px;
              user-select: none;
              background: $box_bg;
              box-shadow: 0 4px 5px rgba(26, 27, 28, 0.112);
              border-radius: 10px;
              font-size: 14px;
              font-weight: lighter;
              color: #af886e;
              transition: transform 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                background-color 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                opacity 0.5s cubic-bezier(0.075, 0.82, 0.165, 1),
                box-shadow 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
              &:hover {
                background: #8e9bae;
                box-shadow: #c0c1c2 0 5px 10px;
                color: $text_color;
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
              gap: 2vw;
              flex-wrap: wrap;
              margin-bottom: 32px;
              .topic_item {
                border-radius: 10px;
                width: 24vw;
                height: 50vh;
                color: $short_msg_color;
                background: $box_bg;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);

                &:hover {
                  box-shadow: 0 3px 5px rgba(31, 45, 61, 0.2);
                }
                &:active {
                  animation: jump 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                }
                &:nth-child(even) {
                  .img_box {
                  }
                }
                .img_box {
                  width: inherit;
                  height: 30vh;
                  overflow: hidden;
                  border-top-left-radius: 10px;
                  border-top-right-radius: 10px;
                  position: relative;
                  // clip-path: circle(140% at 100% -0%);
                  &::after {
                    content: "";
                    position: absolute;
                    bottom: -1vh;
                    left: 0;
                    width: inherit;
                    height: 10vh;
                    pointer-events: none;
                    background: linear-gradient(to top, #dfdfdf71, transparent);
                  }

                  .img {
                    width: inherit;
                    height: inherit;
                    border-radius: 10px;
                    object-fit: cover;
                    border-top-right-radius: 10px;
                    border-top-left-radius: 10px;
                    transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
                  }
                }

                .date {
                  align-self: flex-start;
                  margin-top: auto;
                  font-size: 0.7em;
                  color: #979797;
                }
                .topic_item_content {
                  margin: 16px;
                  height: 17vh;
                  .classification {
                    font-size: 0.6em;
                    padding: 0.4em;
                    background: $title_hover;
                    border-radius: 0.4em;
                    margin-right: 8px;
                    color: #fff;
                  }
                  .title {
                    font-size: 1em;
                    font-weight: 700;
                    color: $title_color;
                    overflow: scroll;
                    user-select: none;
                    &:hover {
                      color: $title_hover;
                    }
                  }
                  .short_meg {
                    margin: 1vh 0;
                    height: 32px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    font-size: 0.9em;
                  }
                }
              }
            }
          }
          .recommend_topic_box {
            width: inherit;
            border-radius: 10px;
            margin-bottom: 32px;
            background: $box_bg;
            box-shadow: 0 4px 10px rgba(26, 27, 28, 0.112);

            .recommend_item_box {
              width: inherit;
              flex-wrap: wrap;
              gap: 16px;
              padding: 0;
              margin: 0;

              .recommend_item {
                width: 74vw;
                height: 18vh;
                border-radius: 10px;
                margin: 0 auto;
                background: $recommend_item_bg;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                box-shadow: 0 8px 5px #1f2d3d26;
                &:last-child {
                  margin-bottom: 32px;
                }
                &::after {
                  content: "";
                  position: absolute;
                  width: 37vw;
                  right: 36vw;
                  height: inherit;
                  z-index: 10;
                  pointer-events: none;
                  background: linear-gradient(
                    to left,
                    $box_bg 20%,
                    transparent
                  );
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
                    width: 37vw;
                    right: 1vw;
                    height: inherit;
                    background: linear-gradient(
                      to right,
                      $box_bg 20%,
                      transparent
                    );
                  }
                  .img_box {
                    border-bottom-right-radius: 10px;
                    border-top-right-radius: 10px;
                    border-bottom-left-radius: 0;
                    border-top-left-radius: 0;
                  }
                }
                .img_box {
                  width: 37vw;
                  height: 18vh;
                  order: 1;
                  border-bottom-left-radius: 10px;
                  border-top-left-radius: 10px;
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
                  width: calc(37vw - 32px);
                  height: calc(18vh - 32px);
                  order: 2;
                  margin: 16px;
                  color: $content_box_color;
                  .content_bottom_box {
                    margin-top: auto;
                  }
                  .classification {
                    font-size: 0.6em;
                    padding: 0.4em;
                    flex-shrink: 0;
                    background: $title_hover;
                    border-radius: 0.4em;
                    margin-right: 8px;
                    color: $text_color;
                  }
                  .title {
                    font-weight: 800;
                    user-select: none;
                    color: $title_color;
                    &:hover {
                      color: $title_hover;
                    }
                  }
                  .short_meg {
                    margin-top: 2vh;
                    height: 16px;
                    color: $short_msg_color;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    font-size: 0.9em;
                    overflow: hidden;
                  }
                  .font_07_em {
                    font-size: 0.7em;
                  }
                  .user_avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 8px;
                    box-shadow: #b3b3b3a0 0 0 2px;
                    transform: translateY(-0.2vh);
                  }
                  .date {
                    justify-self: flex-end;
                    letter-spacing: 0.1em;
                    font-size: 0.7em;
                    color: #8b8f92;
                  }
                }
              }
            }
          }
          .re_note_box {
            width: 76vw;
            min-height: 30vh;
            border-radius: 10px;
            background: $box_bg;

            box-shadow: 0 4px 10px rgba(26, 27, 28, 0.112);
            margin-bottom: 32px;
            .re_note_item_box {
              margin: 0 auto;
              margin-bottom: 16px;
              padding: 0;
              width: calc(76vw - 32px);
              height: 50vh;
              gap: calc(4vw / 3);

              .re_note_item {
                width: calc(18vw - 8px);
                height: inherit;
                background: $recommend_item_bg;
                border-radius: 10px;
                transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                .re_note_img_box {
                  width: inherit;
                  height: 40vh;
                  border-radius: inherit;
                  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
                  margin-bottom: 8px;

                  &::after {
                    content: "";
                    position: absolute;
                    width: inherit;
                    height: 40vh;
                    pointer-events: none;
                    top: 0;
                    left: 0;
                    border-radius: inherit;
                    background: linear-gradient(
                      45deg,
                      #d2d2cef3,
                      transparent,
                      #d2d2cea2
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
                  height: 40vh;
                  border-radius: inherit;
                  object-fit: cover;
                  background: #fff;
                  box-shadow: #94969748 0px 5px 10px;
                }
                .note_info_box {
                  left: 0;
                  bottom: 0;
                  width: calc(18vw - 40px);
                  padding: 0 16px;
                  transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
                  height: calc(10vh - 8px);
                  overflow: scroll;
                  font-size: 16px;
                  font-weight: 900;
                  color: $short_msg_color;

                  div:first-child {
                    user-select: none;
                    color: $title_color;

                    &:hover {
                      color: $title_hover;
                    }
                  }
                  .note_short_message {
                    font-size: 14px;
                    overflow: hidden;
                    margin-top: 8px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-weight: 100;
                  }
                }
              }
            }
          }
        }
        .page_right {
          width: 10vw;
          position: relative;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          img {
            position: sticky;
            top: 80px;
            width: inherit;
            margin-bottom: 2vh;
            border-radius: 10px;
            box-shadow: 0 4px 5px rgba(26, 40, 53, 0.297);
          }
        }
      }
    }
  }

  .home_foot {
    width: inherit;
    height: 30vh;
    gap: 2vw;
    z-index: 1;
    background: $page_1_title_color;
    .title_foot {
      font-size: 1.2em;
      color: $text_color;
    }
    .text_foot {
      font-size: 20px;
      font-weight: 900;
      color: $text_color;
    }
    .left_foot {
      width: 30vw;
      height: 20vh;
      gap: 8px;
    }
    .mid_foot {
      width: 20vw;
      height: 20vh;
    }
    .right_foot {
      width: 30vw;
      height: 20vh;
      gap: 8px;

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
