<script setup>
import { onMounted, ref, nextTick, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Gitalk from "gitalk";
import { useMathStore } from "/src/store/math.js";
import { useConfigStore } from "../store/config";
import change_theme from "../assets/theme/MathDetails";
import { storeToRefs } from "pinia";
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
import "/src/assets/css/markdown.scss";
import { marked, parse } from "marked";
const config_store = useConfigStore();
const { theme } = storeToRefs(config_store);
const math_store = useMathStore();
const { params } = useRoute();
const router = useRouter();
const { data } = storeToRefs(math_store);
const show_solution = ref(false);
const show_comment = ref(false);
const solution_content = ref("");
const problem_content = ref("");
const render = new marked.Renderer();
const show_clock = ref(false);
const start_clock = ref(false);
let clock;
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
});
watch(start_clock, (newV) => {
  if (newV) {
    clock = setInterval(() => {
      let temp_hour = parseInt(hour.value.replace(/^0/, ""));
      let temp_minute = parseInt(minute.value.replace(/^0/, ""));
      let temp_second = parseInt(second.value.replace(/^0/, ""));
      temp_second += 1;
      if (temp_second >= 60) {
        temp_second = 0;
        temp_minute += 1;
        if (temp_minute >= 60) {
          temp_minute = 0;
          temp_hour += 1;
        }
      }
      hour.value = temp_hour.toString().padStart(2, "0");
      minute.value = temp_minute.toString().padStart(2, "0");
      second.value = temp_second.toString().padStart(2, "0");
    }, 1000);
  } else {
    clearInterval(clock);
  }
});
marked.setOptions({
  renderer: render,
  gfm: false,
  pedantic: false,
  sanitize: true,
});
watch(solution_content, (newValue) => {
  solution_content.value = marked(newValue);

  // initMathJax({}, onMathJaxReady)
  nextTick(() => {
    renderByMathjax(document.getElementById("solution"));
  });
});
watch(problem_content, (newValue) => {
  problem_content.value = marked(newValue);

  // initMathJax({}, onMathJaxReady)
  nextTick(() => {
    renderByMathjax(document.getElementById("problem"));
  });
});
const click_handle = (e) => {
  const question_bank_box = document.querySelector(".question_bank_box");
  const question_bank_btn = document.querySelector(".question_bank_btn");
  if (
    !question_bank_box.contains(e.target) &&
    !question_bank_btn.contains(e.target)
  ) {
    show_question_bank.value = false;
  }
};
onUnmounted(() => {
  document.removeEventListener("click", click_handle);
});
onMounted(() => {
  dragControllerLR();
  dragControllerUD();
  change_theme(theme.value)
  document.addEventListener("click", click_handle);
  let gitalk = new Gitalk({
    clientID: "429076372c73a03552c6",
    clientSecret: "e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",
    repo: "TinyFlowersComment",
    owner: "sparkle520",
    admin: ["sparkle520"],
    id: data.value[0].link, // 请确保你的 location 连接小于 50 个字符，否则，插件会生成失败
    language: "zh-CN",
    distractionFreeMode: false, // 专注模式
    proxy: "https://strong-caramel-969805.netlify.app/github_access_token",
  });
  gitalk.render("gitalk-container");
  init_content();
});
// 左右拖动事件
function dragControllerLR() {
  let resize = document.getElementsByClassName("resize");
  let left = document.getElementsByClassName("left");
  let right = document.getElementsByClassName("right");
  let box = document.getElementsByClassName("box");
  for (let i = 0; i < resize.length; i++) {
    // 鼠标按下事件
    resize[i].onmousedown = function (e) {
      //颜色改变提醒
      let startX = e.clientX;
      resize[i].left = resize[i].offsetLeft;
      // 鼠标拖动事件
      document.onmousemove = function (e) {
        let endX = e.clientX;
        let moveLen = resize[i].left + (endX - startX) - box[0].offsetLeft; // （endx-startx）=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
        let maxT = box[i].clientWidth - resize[i].offsetWidth; // 容器宽度 - 左边区域的宽度 = 右边区域的宽度

        if (moveLen < 50) moveLen = 50; // 左边区域的最小宽度为50px
        if (moveLen > maxT - 150) moveLen = maxT - 150; //右边区域最小宽度为150px
        resize[i].style.left = moveLen; // 设置左侧区域的宽度

        for (let j = 0; j < left.length; j++) {
          left[j].style.width = moveLen + "px";
          right[j].style.width = box[i].clientWidth - moveLen - 10 + "px";
        }
      };
      // 鼠标松开事件
      // eslint-disable-next-line no-unused-lets
      document.onmouseup = function (evt) {
        //颜色恢复
        document.onmousemove = null;
        document.onmouseup = null;
        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false;
    };
  }
}
// 上下拖动事件
function dragControllerUD() {
  let resize = document.getElementsByClassName("move");
  let right_top_box = document.getElementsByClassName("right_top_box");
  let right_bottom_box = document.getElementsByClassName("right_bottom_box");
  let box = document.getElementsByClassName("box");
  for (let i = 0; i < resize.length; i++) {
    resize[i].onmousedown = function (e) {
      let startY = e.clientY;
      resize[i].top = resize[i].offsetTop;
      document.onmousemove = function (e) {
        let endY = e.clientY;
        let moveLen = resize[i].top + (endY - startY) - box[0].offsetTop; // （endY - startY）=移动的距离。resize[i].top+移动的距离=上边区域最后的高度
        let maxT = box[i].clientHeight - resize[i].offsetHeight; // 容器高度 - 上边区域的高度 = 下边区域的高度

        if (moveLen < 50) moveLen = 50; // 上边区域的最小高度为50px
        if (moveLen > maxT - 150) moveLen = maxT - 150; //下边区域最小高度为150px

        resize[i].style.top = moveLen; // 设置上边区域的高度

        for (let j = 0; j < right_top_box.length; j++) {
          right_top_box[j].style.height = moveLen + "px";
          right_bottom_box[j].style.height =
            box[i].clientHeight - moveLen - 10 + "px";
        }
      };
      document.onmouseup = function () {
        document.onmousemove = null;
        document.onmouseup = null;
        resize[i].releaseCapture && resize[i].releaseCapture(); //当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
      };
      resize[i].setCapture && resize[i].setCapture(); //该函数在属于当前线程的指定窗口里设置鼠标捕获
      return false;
    };
  }
}
const show_solution_click = () => {
  show_solution.value = true;
};
const show_comment_click = () => {
  show_comment.value = true;
};
const init_content = () => {
  get_math_md_file(params.id);
};
const get_math_md_file = (id) => {
  const solution_path = `/src/math_data/solution/${id}.md`;
  const problem_path = `/src/math_data/problem/${id}.md`;
  const modules = import.meta.glob("/src/math_data/*/*.md", { as: "raw" });
  for (const path in modules) {
    if (path == solution_path) {
      modules[path]().then((mod) => {
        solution_content.value = mod;
      });
    } else if (path == problem_path) {
      modules[path]().then((mod) => {
        problem_content.value = mod;
      });
    }
  }
};
const hour = ref("00");
const minute = ref("00");
const second = ref("00");
const show_question_bank = ref(false);
watch(show_question_bank, (newV) => {
  const question_bank_box = document.querySelector(".question_bank_box");
  if (newV) {
    question_bank_box.style.transform = "translateX(0)";
  } else {
    question_bank_box.style.transform = "translateX(-100%)";
  }
});
const reset_clock = () => {
  start_clock.value = false;
  hour.value = "00";
  minute.value = "00";
  second.value = "00";
};
</script>
<template>
  <div class="math_details_main flex flex_direction_column relative">
    <!-- <div class="cover" v-if="show_question_bank"></div>
    <div class="question_bank_box fixed flex flex_direction_column">
      <div
        class="question_bank_header flex flex_direction_row align_items_center"
      >
        <h1 class="question_bank_header_title">题库</h1>
      </div>
      <ul class="question_bank_ul flex flex_direction_column">
        <li
          v-for="(item, index) in data"
          :key="index"
          @click="router.push(item.link)"
          class="question_bank_li flex flex_direction_row align_items_center relative"
        >
        <div v-if="item.id == params.id" class="question_bank_li_active absolute"></div>
          {{ item.id }}.
          
        
        </li>
      </ul>
    </div> -->

    <div class="math_top_box grid">
      <div class="math_top_left_box flex flex_direction_row align_items_center">
        <!-- <button
          @click="show_question_bank = true"
          class="question_bank_btn relative flex flex_direction_row align_items_center justify_content_center"
        >
          <svg
            t="1708953205767"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="9998"
            width="22"
            height="22"
          >
            <path
              d="M153.597291 512c0-42.410033-34.381387-76.79142-76.804064-76.79142C34.381387 435.20858 0 469.588161 0 512c0 42.424483 34.381387 76.80587 76.793227 76.80587 42.422677 0 76.804064-34.381387 76.804064-76.80587zM972.791872 563.208128c28.281784 0 51.208128-22.924537 51.208128-51.208128 0-28.269141-22.924537-51.193678-51.208128-51.193678H256.000903c-28.283591 0-51.209934 22.924537-51.209934 51.193678 0 28.283591 22.924537 51.208128 51.209934 51.208128h716.790969zM972.791872 230.403161c28.281784 0 51.208128-22.924537 51.208128-51.193678 0-28.283591-22.924537-51.208128-51.208128-51.208128H256.000903c-28.283591 0-51.209934 22.924537-51.209934 51.208128 0 28.269141 22.924537 51.193678 51.209934 51.193678h716.790969zM153.597291 179.209483c0-42.424483-34.381387-76.80587-76.804064-76.805871C34.381387 102.403612 0 136.783194 0 179.209483c0 42.410033 34.381387 76.79142 76.793227 76.79142 42.422677 0 76.804064-34.381387 76.804064-76.79142zM972.791872 896.000452c28.281784 0 51.208128-22.911894 51.208128-51.195485 0-28.281784-22.924537-51.208128-51.208128-51.208128H256.000903c-28.283591 0-51.209934 22.924537-51.209934 51.208128 0 28.283591 22.924537 51.195484 51.209934 51.195485h716.790969zM153.597291 844.804967c0-42.410033-34.381387-76.804064-76.804064-76.804064C34.381387 768.000903 0 802.394934 0 844.804967c0 42.410033 34.381387 76.793227 76.793227 76.793227 42.422677 0 76.804064-34.381387 76.804064-76.793227z"
              fill="#231815"
              p-id="9999"
            ></path></svg
          >题库
        </button> -->
      </div>
      <div
        class="math_top_mid_box flex flex_direction_row align_items_center justify_content_center"
      >
        <button
          v-show="!show_clock"
          @click="show_clock = true"
          class="clock_btn relative flex align_items_center justify_content_center"
        >
          <svg
            t="1708949650732"
            class="icon clock_icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6508"
            width="22"
            height="22"
          >
            <path
              d="M511.997442 124.509758c-224.864374 0-401.543306 176.678932-401.543306 401.539212 0 224.87256 176.678932 401.543306 401.543306 401.543306 224.867444 0 401.541259-176.670745 401.541259-401.543306C913.537677 301.18869 736.864886 124.509758 511.997442 124.509758L511.997442 124.509758zM511.997442 847.288323c-176.673815 0-321.230142-144.55735-321.230142-321.240375 0-176.669722 144.556327-321.226049 321.230142-321.226049 176.677908 0 321.233212 144.556327 321.233212 321.226049C833.230654 702.731996 688.67535 847.288323 511.997442 847.288323L511.997442 847.288323zM511.997442 847.288323"
              fill="#707070"
              p-id="6509"
            ></path>
            <path
              d="M552.151977 509.993297 552.151977 285.129946c0-24.090675-16.058744-40.156582-40.154535-40.156582-24.091698 0-40.151465 16.064884-40.151465 40.156582l0 240.919025c0 8.037047 8.025791 24.101931 8.025791 32.127721l128.496559 128.496559c8.033977 8.032954 16.058744 8.032954 32.124651 8.032954 16.058744 0 24.090675 0 32.124651-8.032954 16.058744-16.064884 16.058744-40.156582 0-56.216349L552.151977 509.993297 552.151977 509.993297zM552.151977 509.993297"
              fill="#707070"
              p-id="6510"
            ></path>
            <path
              d="M327.290673 124.509758c0-8.026814-8.032954-16.059767-8.032954-24.091698l0 0c-48.183396-40.150442-128.490419-40.150442-176.679955 0l-56.216349 56.216349c-40.149419 48.189535-40.149419 128.496559 0 176.679955 8.030907 0 16.063861 8.032954 24.091698 8.032954C150.610718 244.973364 230.916718 164.66634 327.290673 124.509758L327.290673 124.509758zM327.290673 124.509758"
              fill="#707070"
              p-id="6511"
            ></path>
            <path
              d="M937.636538 156.633387l-56.221466-56.216349c-48.184419-48.182372-120.458489-48.182372-168.648025 0-8.026814 8.032954-8.026814 16.064884-16.058744 24.091698 96.372931 48.188512 176.678932 120.464629 216.830397 216.836537 8.032954-8.032954 16.065907-8.032954 24.098861-16.064884C977.78698 285.129946 977.78698 204.821899 937.636538 156.633387L937.636538 156.633387zM937.636538 156.633387"
              fill="#707070"
              p-id="6512"
            ></path>
            <path
              d="M198.794114 863.349113l-32.125675 32.127721c-16.056698 16.058744-16.056698 40.150442 0 56.216349 8.033977 8.026814 16.066931 8.026814 32.125675 8.026814 16.064884 0 24.090675 0 32.123628-8.026814l32.124651-32.124651c16.058744-16.064884 16.058744-40.157605 0-56.219419C246.983649 847.288323 214.858998 847.288323 198.794114 863.349113L198.794114 863.349113zM198.794114 863.349113"
              fill="#707070"
              p-id="6513"
            ></path>
            <path
              d="M825.1977 863.349113c-16.057721-16.059767-40.149419-16.059767-56.215326 0-16.058744 16.061814-16.058744 40.154535 0 56.219419l32.124651 32.124651c8.032954 8.026814 16.064884 8.026814 32.123628 8.026814 16.064884 0 24.091698 0 32.124651-8.026814 16.059767-16.064884 16.059767-40.156582 0-56.216349L825.1977 863.349113 825.1977 863.349113zM825.1977 863.349113"
              fill="#707070"
              p-id="6514"
            ></path>
          </svg>
        </button>
        <div
          v-show="show_clock"
          class="clock_box flex flex_direction_row justify_content_center"
        >
          <button
            @click="show_clock = false"
            class="hidden_btn relative flex align_items_center justify_content_center"
          >
            <svg
              t="1709109949694"
              class="hidden_icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5780"
              width="22"
              height="22"
            >
              <path
                d="M753.28950857 874.92315429c0 14.83337143-11.86669714 28.18340571-23.23894857 39.55565714-11.86669714 11.86669714-37.08342857 37.08342857-63.28905143 11.86669714l-376.76763428-376.76763428c-8.90002286-8.90002286-19.77782857-22.74450286-19.77782858-37.57787429s10.87780571-28.67785143 19.77782858-37.57787429l376.76763428-376.76763428c10.38336-10.38336 21.75561143-13.35003429 34.11675429-8.90002286 9.39446857 3.46112 18.29449143 11.37225143 28.67785143 21.75561143 14.33892571 14.33892571 21.75561143 28.67785143 21.75561142 41.03899429 0 7.91113143-2.96667429 15.82226286-9.39446857 21.75561142L403.22194286 512l339.18976 339.18976c6.92224 7.41668571 10.87780571 15.32781714 10.87780571 23.73339429z"
                fill="#707070"
                p-id="5781"
              ></path>
            </svg>
          </button>
          <div
            @click="start_clock = !start_clock"
            class="clock relative flex flex_direction_row align_items_center"
          >
            <div v-show="start_clock" class="hint_text absolute  flex align_items_center justify_content_center">停止计时</div>
            <div v-show="!start_clock" class="hint_text absolute flex align_items_center justify_content_center">开始计时</div>

            <svg
              v-show="!start_clock"
              t="1709110090606"
              class="start_icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6909"
              width="18"
              height="18"
            >
              <path
                d="M512 0C230.4 0 0 230.4 0 512s230.4 512 512 512 512-230.4 512-512S793.6 0 512 0z m0 981.333333C253.866667 981.333333 42.666667 770.133333 42.666667 512S253.866667 42.666667 512 42.666667s469.333333 211.2 469.333333 469.333333-211.2 469.333333-469.333333 469.333333z"
                fill="#707070"
                p-id="6910"
              ></path>
              <path
                d="M672 441.6l-170.666667-113.066667c-57.6-38.4-106.666667-12.8-106.666666 57.6v256c0 70.4 46.933333 96 106.666666 57.6l170.666667-113.066666c57.6-42.666667 57.6-106.666667 0-145.066667z"
                fill="#707070"
                p-id="6911"
              ></path>
            </svg>
            <svg
              v-show="start_clock"
              t="1709110548355"
              class="stop_icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="8846"
              width="18"
              height="18"
            >
              <path
                d="M512 1024C228.266667 1024 0 795.733333 0 512S228.266667 0 512 0s512 228.266667 512 512-228.266667 512-512 512z m0-42.666667c260.266667 0 469.333333-209.066667 469.333333-469.333333S772.266667 42.666667 512 42.666667 42.666667 251.733333 42.666667 512s209.066667 469.333333 469.333333 469.333333z m-106.666667-682.666666c12.8 0 21.333333 8.533333 21.333334 21.333333v384c0 12.8-8.533333 21.333333-21.333334 21.333333s-21.333333-8.533333-21.333333-21.333333V320c0-12.8 8.533333-21.333333 21.333333-21.333333z m213.333334 0c12.8 0 21.333333 8.533333 21.333333 21.333333v384c0 12.8-8.533333 21.333333-21.333333 21.333333s-21.333333-8.533333-21.333334-21.333333V320c0-12.8 8.533333-21.333333 21.333334-21.333333z"
                fill="#707070"
                fill-opacity=".9"
                p-id="8847"
              ></path>
            </svg>
            {{ hour }}:{{ minute }}:{{ second }}
          </div>
          <button
            @click="reset_clock"
            class="reset_btn relative flex align_items_center justify_content_center"
          >
            <svg
              t="1709110700155"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="10809"
              width="18"
              height="18"
            >
              <path
                d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4C300.2 237.1 337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27c40.9 17.3 77.7 42.1 109.3 73.8 9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47c-5.3 4.1-3.5 12.5 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l0.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 91.998 503.8 91.9 508.3 95.5 512 100 512h60c4.4 0 7.9-3.5 8-7.8z m756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4C723.8 786.8 687 811.7 646 829c-42.4 17.9-87.4 27-133.9 27s-91.5-9.1-133.9-27c-40.9-17.3-77.7-42.1-109.3-73.8-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47c5.3-4.1 3.5-12.5-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-0.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.802-411.8 0.098-4.5-3.502-8.2-8.002-8.2z"
                fill="#595959"
                p-id="10810"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div class="math_top_right_box"></div>
    </div>
    <div class="box flex flex_direction_row" ref="box">
      <div class="left flex flex_direction_column">
        <div class="left_top_box flex flex_direction_row align_items_center">
          <span>题目描述区</span>
        </div>
        <div
          v-html="problem_content"
          id="problem"
          class="markdown-body solution_problem_box"
          v-highlight
        ></div>
      </div>
      <div class="resize" title="左右侧边栏"></div>
      <div class="right">
        <div class="right_top_box">
          <div
            v-if="!show_solution"
            class="show_solution flex align_items_center justify_content_center"
          >
            <button class="show_solution_btn" @click="show_solution_click">
              查看答案解析
            </button>
          </div>
          <div
            v-show="show_solution"
            class="right_top_top_box flex flex_direction_row align_items_center"
          >
            <span>答案解析区</span>
          </div>

          <div
            v-show="show_solution"
            v-html="solution_content"
            id="solution"
            class="markdown-body solution_problem_box"
            v-highlight
          ></div>
        </div>
        <div title="上下侧边栏" class="move"></div>
        <div class="right_bottom_box flex flex_direction_column">
          <div
            v-if="!show_comment"
            class="show_comment flex align_items_center justify_content_center"
          >
            <button class="show_comment_btn" @click="show_comment_click">
              查看评论区(可能含有答案和解题思路)
            </button>
          </div>
          <div
            class="right_bottom_top_box flex flex_direction_row align_items_center"
            v-show="show_comment"
          >
            <span>评论区 (欢迎分享你的解题思路和答案)</span>
          </div>

          <div id="gitalk-container" v-show="show_comment"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$math_details_main_bg: var(--math_details_main_bg, #fdfbfb);
$math_details_main_bg_opacity: var(--math_details_main_bg_opacity, 1);
$cover_bg: var(--cover_bg, #53505071);
$question_bank_box_bg: var(--question_bank_box_bg, #ffff);
$question_bank_header_border: var(--question_bank_header_border, #e5e5e5);
$question_bank_li_border: var(--question_bank_li_border, #e6e6e6);
$question_bank_li_color: var(--question_bank_li_color, #4d4949);
$question_bank_li_active_bg: var(--question_bank_li_active_bg, #e7e7e7);
$question_bank_li_hover_bg: var(--question_bank_li_hover_bg, #e7e7e7b0);
$btn_bg: var(--btn_bg, #ebebeb);
$hint_color: var(--hint_color, #868484);
$hint_box_shadow: var(--hint_box_shadow, #86848466);
$hint_box_bg :var(--hint_box_bg, #fdfdfd);
$right_bg:var(--right_bg, #f3f3f3);
$show_btn_bg:var(--show_btn_bg, #b6bbbe);
$resize_bg:var(--resize_bg, #999999);
$right_bottom_top_box_bg:var(--right_bottom_top_box_bg, #dcdddf);
$right_top_top_box_bg:var(--right_top_top_box_bg, #849bae);

.math_details_main {
  width: 100vw;
  height: 100vh;
  letter-spacing: 4px;
  color: $question_bank_li_color;
  background: $math_details_main_bg;
  &::after {
    width: 100vw;
    height: 100vh;
    content: "";
    left: 0;
    top: 0;
    position: fixed;
    z-index: 0;
    opacity: $math_details_main_bg_opacity;
    background: url("https://pic.imgdb.cn/item/65f38f9f9f345e8d03ad1fa8.png")
      repeat;
  }
  .cover {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background: $cover_bg;
    z-index: 10000000;
  }
  .question_bank_box {
    width: 40vw;
    height: 100vh;
    background: $question_bank_box_bg;
    z-index: 10000001;
    overflow: scroll;
    transform: translateX(-100%);
    transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    .question_bank_header {
      position: sticky;
      top: 0;
      z-index: 100;
      flex-shrink: 0;
      background: $question_bank_box_bg;
      width: 100%;
      height: 63px;
      border-bottom: 1px solid $question_bank_header_border;
      .question_bank_header_title {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
        color: $question_bank_li_color;
        margin-left: 32px;
      }
    }

    .question_bank_ul {
      list-style: none;
      margin: 16px 16px;

      padding: 0;
      width: calc(40vw - 32px);
      .question_bank_li {
        height: 52px;
        flex-shrink: 0;
        font-size: 16px;
        cursor: pointer;
        padding: 0 16px;
        gap: 4px;
        border: $question_bank_li_border 1px solid;
        border-bottom: none;
        width: calc(100% - 34px);
        color: $question_bank_li_color;
        overflow: hidden;
        .question_bank_li_active{
          width: calc(40vw - 32px);
          height: 52px;
          background: $question_bank_li_active_bg;
          left: 0;
          top: 0;
        }
        &:hover {
          background: $question_bank_li_hover_bg;
        }
        &:first-child {
          border-top-right-radius: 10px;
          border-top-left-radius: 10px;
        }
        &:last-child {
          border-bottom-right-radius: 10px;
          border-bottom-left-radius: 10px;
          border: $question_bank_li_border 1px solid;
        }
        .difficulty_hard {
          color: #c54c4c;
          font-weight: 600;
          margin-left: auto;
          letter-spacing: 0;
          z-index: 10;

        }
        .difficulty_easy {
          color: #66a321;
          font-weight: 600;
          margin-left: auto;
          letter-spacing: 0;
          z-index: 10;
        }
        .difficulty_mid {
          color: #f19742;
          font-weight: 600;
          margin-left: auto;
          letter-spacing: 0;
          z-index: 10;

        }
      }
      .question_bank_li_active {
        background: $question_bank_li_hover_bg;
      }
    }
  }
  .solution_problem_box {
    height: calc(100% - 62px);
    width: calc(100% - 32px);
    padding: 16px;
  }
  .math_top_box {
    width: 90vw;
    height: 48px;
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 86px;
    grid-template-columns: repeat(3, 1fr);
    background: $question_bank_box_bg;
    z-index: 1000;
    box-shadow: #8183840e 0px 5px 20px;
    .math_top_left_box {
      .question_bank_btn {
        border-radius: 10px;
        border: none;
        margin-left: 8px;
        gap: 8px;
        color: $question_bank_li_color;
        background: none;
        height: 38px;
        svg{
          path{
            fill: $question_bank_li_color;
          }
        }
        &:hover {
          background: $btn_bg;
          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }
        &::after {
          content: "题库";
          position: absolute;
          bottom: 0%;
          left: 50%;
          color: $hint_color;

          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          font-size: 11px;
          background: $hint_box_bg;
          box-shadow: $hint_box_shadow 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
    }
    .math_top_mid_box {
      border-radius: 10px;
      .clock_btn {
        border-radius: 5px;
        border: none;
        height: 38px;
        width: 38px;
        background: $btn_bg;
        &:hover {
          .clock_icon {
            animation: shrink 0.3s ease-in-out forwards;
          }
          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }

        &::after {
          content: "计时";
          position: absolute;
          bottom: 0%;
          color: $hint_color;

          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          font-size: 11px;
          background: $hint_box_bg;
          box-shadow: $hint_box_shadow 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .clock_box {
        animation: clock_box 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        .hidden_btn {
          border-radius: 5px;
          border: none;
          height: 38px;

          width: 20px;
          background: $btn_bg;
          .hidden_icon {
            transform: scale(2);
          }
          &:hover {
            svg {
              transform: translateX(-1px) scale(2);
            }
            &::after {
              opacity: 1;
              transform: translateX(-50%) translateY(130%);
            }
          }

          &::after {
            content: "隐藏";
            position: absolute;
            bottom: 0%;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            width: 200%;
            color: $hint_color;

            opacity: 0;
            font-size: 11px;
            background: $hint_box_bg;
            box-shadow: $hint_box_shadow 2px 1px 5px;
            border-radius: 5px;
            padding: 8px 4px;
            transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
        .clock {
          border-radius: 5px;
          margin-left: 2px;
          gap: 2px;
          height: 34px;
          color: $hint_color;
          padding: 2px 8px;
          background: $btn_bg;
          font-size: 14px;
          letter-spacing: 0px;
          user-select: none;
          &:hover {
            .hint_text {

                opacity: 1;
                transform: translateX(-50%) translateY(130%);
            }
            }
          .hint_text {
            bottom: 0%;
            left: 50%;
            transform: translateX(-50%) translateY(100%);
            width: 100%;
            opacity: 0;
            font-size: 11px;
            background: $hint_box_bg;
            box-shadow: $hint_box_shadow 2px 1px 5px;
            border-radius: 5px;
            padding: 8px 4px;
            transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
            
          }
        }
      }
      .reset_btn {
        border-radius: 5px;
        border: none;
        height: 38px;
        width: 38px;
        margin-left: 2px;
        background: $btn_bg;
        svg {
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &:hover {
          svg {
            transform: rotate(360deg);
          }

          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }

        &::after {
          content: "重置";
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          font-size: 11px;
          color: $hint_color;

          background: $hint_box_bg;
          box-shadow: $hint_box_shadow 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
    }
    .math_top_right_box {
    }
  }
  .box {
    width: 90vw;
    height: calc(80vh - 10px);
    margin: 1% auto;
    margin-top: 8px;
    z-index: 1;

  }
  /*左侧div样式*/
  .left {
    width: calc(42% - 10px); /*左侧初始化宽度*/
    height: 100%;
    border-radius: 5px;
    background: $question_bank_box_bg;
    overflow: scroll;

    box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;
    .left_top_box {
      position: sticky;
      top: 0;
      z-index: 999;
      height: 30px;
      width: calc(100% - 32px);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      background: $right_top_top_box_bg;
      padding: 0 16px;
      color: #fdfdfd;
      span{

      }
    }
  }
  /* 拖拽区div样式 */
  .resize {
    cursor: w-resize;
    position: relative;
    top: 0%;
    border-radius: 5px;
    width: 10px;
    height: 100%;
    background-size: cover;
    background-position: center;
    /*z-index: 99999;*/
    font-size: 32px;
    color:$question_bank_box_bg;
    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 90%;
      background: $hint_color;
      top: 50%;
      left: 50%;
      border-radius: 5px;
      opacity: 0;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      transform: translate(-50%, -50%);
    }
    &::before {
      content: "";
      position: absolute;
      width: 5px;
      height: 35px;
      background: $resize_bg;
      top: 50%;
      left: 50%;
      border-radius: 5px;
      opacity: 1;
      transform: translate(-50%, -50%);
    }
    &:hover {
      &::after {
        opacity: 1;
        height: 99%;
      }
    }
  }

  /*右侧div'样式*/
  .right {
    width: 58%; /*右侧初始化宽度*/
    height: 100%;
    background: $right_bg;
    border-radius: 5px;

    /*上方div'样式*/
    .right_top_box {
      height: 60%;
      background-color: $question_bank_box_bg;
      border-radius: 5px;
      overflow: scroll;
      box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;
      .right_top_top_box {
        position: sticky;
        top: 0;
        z-index: 999;
        height: 30px;
        width: calc(100% - 32px);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background: $right_top_top_box_bg;
        padding: 0 16px;
        color: #fdfdfd;
      }
      .show_solution {
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        background: #84827d42;
        .show_solution_btn {
          height: 2.3em;
          width: 70%;
          font-size: 1.2em;
          font-weight: 900;
          background: #9f979749;
          border: none;
          color: $question_bank_box_bg;
          border-radius: 5px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;

          &:hover {
            background: $show_btn_bg;
            color: $question_bank_box_bg;
          }
        }
      }
    }
    /*下方div'样式*/
    .right_bottom_box {
      height: calc(40% - 10px);
      background-color: $question_bank_box_bg;
      display: flex;
      overflow: scroll;
      border-radius: 5px;
      box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;
      .show_comment {
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        background: #84827d42;
        .show_comment_btn {
          height: 2.3em;
          width: 70%;
          font-size: 1.2em;
          font-weight: 900;
          background: #9f979749;
          border: none;
          color: $question_bank_box_bg;
          border-radius: 5px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;

          &:hover {
            background: $show_btn_bg;
            color: $right_bg;
          }
        }
      }
      .right_bottom_top_box {
        height: 30px;
        position: sticky;
        top: 0;
        z-index: 999;
        width: calc(100% - 32px);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background: $right_bottom_top_box_bg;
        padding: 0 16px;
        color: $question_bank_box_bg;
      }
      #gitalk-container {
        width: calc(100% - 32px);
        height: calc(100% - 30px);
        margin: 0 16px;
      }
    }
    /* 拖拽区div样式 */
    .move {
      cursor: s-resize;
      width: 100%;
      height: 10px;
      margin: 0 auto;
      position: relative;
      color:$question_bank_box_bg;
      &::after {
        content: "";
        position: absolute;
        width: 90%;
        height: 5px;
        background: $hint_color;
        top: 50%;
        left: 50%;
        border-radius: 5px;
        opacity: 0;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        transform: translate(-50%, -50%);
      }
      &::before {
        content: "";
        position: absolute;
        width: 25px;
        height: 5px;
        background: $resize_bg;
        top: 50%;
        left: 50%;
        border-radius: 5px;
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      &:hover {
        &::after {
          opacity: 1;
          width: 98%;
        }
      }
    }
  }
}
@keyframes shrink {
  0% {
    transform: rotate(-30deg);
  }
  10% {
    transform: rotate(30deg);
  }
  20% {
    transform: rotate(-30deg);
  }
  30% {
    transform: rotate(30deg);
  }
  40% {
    transform: rotate(-30deg);
  }
  50% {
    transform: rotate(30deg);
  }
  60% {
    transform: rotate(-30deg);
  }
  70% {
    transform: rotate(30deg);
  }
  80% {
    transform: rotate(-30deg);
  }
}
@keyframes clock_box {
  0% {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
