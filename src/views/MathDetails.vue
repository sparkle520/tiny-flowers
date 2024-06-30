<script setup>
import { onMounted, ref, nextTick, watch, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import Gitalk from "gitalk";
import { useMathStore } from "/src/store/math.js";
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
import "/src/assets/css/markdown.scss";
import { marked, parse } from "marked";
const config_store = useConfigStore();
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

onUnmounted(() => {
});
onMounted(() => {
 
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

const reset_clock = () => {
  start_clock.value = false;
  hour.value = "00";
  minute.value = "00";
  second.value = "00";
};
</script>
<template>
  <div class="math_details_main flex f_d_c relative">
    <div class="math_top_box grid">
      <div class="math_top_left_box flex flex_direction_row a_c">
       
      </div>
      <div
        class="math_top_mid_box flex flex_direction_row align_items_center j_c_c"
      >
        <button
          v-show="!show_clock"
          @click="show_clock = true"
          class="clock_btn relative flex align_items_center j_c_c"
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
          class="clock_box flex flex_direction_row j_c_c"
        >
          <button
            @click="show_clock = false"
            class="hidden_btn relative flex align_items_center j_c_c"
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
            <div v-show="start_clock" class="hint_text absolute  flex align_items_center j_c_c">停止计时</div>
            <div v-show="!start_clock" class="hint_text absolute flex align_items_center j_c_c">开始计时</div>

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
            class="reset_btn relative flex align_items_center j_c_c"
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
    <div class="box f f_d_c" ref="box">
      <div class="p_box flex f_d_c">
        <div class="p_top_box f f_d_r a_c">
          <span>题目描述区</span>
        </div>
        <div
          v-html="problem_content"
          id="problem"
          class="markdown-body com_box"
        ></div>
      </div>
      <div class="s_box">
        <div class="s_top_box">
          <div
            v-if="!show_solution"
            class="show_solution flex align_items_center j_c_c"
          >
            <button class="show_solution_btn" @click="show_solution_click">
              点击查看答案解析
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
            class="markdown-body com_box"
          ></div>
        </div>
        <div class="discuss_box flex f_d_c">
          <div
            v-if="!show_comment"
            class="show_comment flex a_c j_c_c"
          >
            <button class="show_comment_btn" @click="show_comment_click">
              点击查看评论区(可能含有答案和解题思路)
            </button>
          </div>
          <div
            class="right_bottom_top_box flex flex_direction_row a_c"
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
  width: max(1440px,100vw);
  min-height: 100vh;
  letter-spacing: 4px;
  color: $text;
  background: $fill_body;
  
  .com_box {
    height: calc(100% - 62px);
    width: 1068px !important;
    padding: 16px;
  }
  .math_top_box {
    width:1100px;
    height: 48px;
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 86px;
    grid-template-columns: repeat(3, 1fr);
    background: $fill;
    z-index: 1000;
    box-shadow: $fill_shadow 0px 0px 5px;
   
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
          color: $primary;
          padding: 2px 8px;
          background: $fill;
          box-shadow: $fill_shadow 0 0 5px;
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
        background: $fill;
        box-shadow: $fill_shadow 0 0 5px;
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
    width: 1100px;
    margin: 16px auto;
    margin-top: 8px;
    z-index: 1;
    gap: 32px;
  }
  .p_box {
    width: 1100px; 
    border-radius: 5px;
    background: $fill;

    box-shadow: $fill_shadow 0 0 5px;
    .p_top_box {
      position: sticky;
      top: 0;
      z-index: 999;
      height: 30px;
      width: calc(100% - 32px);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      background: $primary;
      padding: 0 16px;
      color: $fill_primary;
      span{

      }
    }
  }
 

  .s_box {
    width: 1100px;
    height: 100%;
    background: $fill;

box-shadow: $fill_shadow 0 0 5px;
    border-radius: 5px;

    .s_top_box {
      height: 60%;
      background-color: $fill;
      border-radius: 5px;
      overflow: scroll;
      .right_top_top_box {
        position: sticky;
        top: 0;
        z-index: 999;
        height: 30px;
        width: calc(100% - 32px);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background: $primary;
        padding: 0 16px;
        color: $fill_primary;
      }
      .show_solution {
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        background: $fill;
        .show_solution_btn {
          height: 2.3em;
          width: 70%;
          font-size: 1.2em;
          font-weight: 900;
          background: $primary;
          border: none;
          color: $fill_primary;
          border-radius: 5px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: $fill_shadow 0 0 5px;

          &:hover {
            background: $primary_mix_4;
            color: $fill_primary;
          }
        }
      }
    }
    .discuss_box {
      width: 1100px;
      background-color: $question_bank_box_bg;
      display: flex;
      margin-top: 32px;
      border-radius: 5px;
      box-shadow: $fill_shadow 0 0 5px;
      .show_comment {
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        background: $fill;
        .show_comment_btn {
          height: 2.3em;
          width: 70%;
          font-size: 1.2em;
          font-weight: 900;
          background: $primary;
          border: none;
          color: $fill_primary;
          border-radius: 5px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: $fill_shadow 0 0 5px;

          &:hover {
            background: $primary_mix_4;
            color: $fill_primary;
          }
        }
      }
      .right_bottom_top_box {

        height: 30px;
        position: sticky;
        top: 0;
        z-index: 999;
        width: 1068px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background: $primary;
        padding: 0 16px;
        color: $fill_primary;
      }
      #gitalk-container {
        width: calc(100% - 32px);
        height: calc(100% - 30px);
        margin: 0 16px;
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
