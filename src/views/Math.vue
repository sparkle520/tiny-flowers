<script setup>
import {
  ref,
  onMounted,
  watch,
  onUnmounted,
  onBeforeMount,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useMathStore } from "/src/store/math.js";
import { useConfigStore } from "../store/config";
import { useUserStore } from "../store/user";
import "/src/assets/css/markdown.scss";
import MathLeftNavBar from "../component/MathLeftNavBar.vue";
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
import { marked, parse } from "marked";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const user_store = useUserStore();
const { params } = useRoute();
const search_text = ref("");
const route = useRoute();
const router = useRouter();
const tags_list = ref([]);
const modules = import.meta.glob("/src/math_data/*/*.md", { as: "raw" });

const render_marked_latex = (dom,mod,callback)=>{
  dom.innerHTML =  marked(mod,true)
  callback(dom)
}
const math_store = useMathStore();
const current_page = ref(params.page);
const init_content =  () => {
  const subject_list = document.querySelectorAll(".subject_context");
  const subject_solution_context = document.querySelectorAll(
    ".subject_solution_context"
  );
  for (let i = 0; i < subject_list.length; i++) {
    const id = current_data.value[i].id;
    const solution_path = `/src/math_data/solution/${id}.md`;
    const problem_path = `/src/math_data/problem/${id}.md`;
    for (const path in modules) {
      if (path == solution_path) {
        modules[path]().then((mod) => {
          // subject_solution_context[i].innerHTML =  marked(mod,true)
        //   nextTick(() => {
        //       renderByMathjax(subject_solution_context[i]).catch(err=>{
        //   }
        // );
            
        //   });
        render_marked_latex(subject_solution_context[i],mod,(dom)=>{
             nextTick(() => {
              renderByMathjax(dom).catch(err=>{
          }
        ); 
          });
        })
        });
      } else if (path == problem_path) {
        modules[path]().then((mod) => {
          // subject_list[i].innerHTML = marked(mod);
          // nextTick(() => {
          //   renderByMathjax(subject_list[i]).catch(err=>{
          // });;
          // });
          render_marked_latex(subject_list[i],mod,(dom)=>{
             nextTick(() => {
              renderByMathjax(dom).catch(err=>{
          }
        ); 
          });
        })
        });
      }
    }
  }
};

onBeforeMount(() => {
  tags_list.value = math_store.get_tags();
});
onUnmounted(() => {
  document.removeEventListener("click", click_handle);
});
onMounted(() => {
  init_data();
  window.scrollTo(0, 0);
  document.addEventListener("click", click_handle);

  current_page.value = params.page;
});

const current_page_change = (current) => {
  let path_ = route.fullPath.split("/");
  const query = route.query;
  path_[2] = current;
  router.push({ path: path_.join("/"), query: query });
};
const page_num = ref(1);
//  change scss var

const show_all_tag = () => {
  const select_tag_ul = document.querySelector(".select_tag ul");
  select_tag_ul.style.height = "auto";
  show_all_tag_flag.value = true;
};
const close_all_tag = () => {
  const select_tag_ul = document.querySelector(".select_tag ul");
  select_tag_ul.style.height = "39px";
  show_all_tag_flag.value = false;
};
const show_all_tag_flag = ref(false);
const show_filter_search_box = ref(false);
const current_filter_list = ref([]);
const search_focus_handle = () => {
  if (search_text.value.length == 0) return;
  show_filter_search_box.value = true;
};
const loop = (arr, current_index, search_text) => {
  if (current_index > arr.length - 1) return;
  search_text.toLowerCase();
  let per_num = Math.min(10, arr.length - current_index);
  window.requestAnimationFrame(() => {
    for (let i = 0; i < per_num; i++) {
      if (
        arr[current_index + i].id
          .toString()
          .slice(0, 0)
          .concat("m", arr[current_index + i].id)
          .indexOf(search_text) == -1 &&
        arr[current_index + i].tags.toLowerCase().indexOf(search_text) == -1
      )
        continue;
      current_filter_list.value.push(arr[current_index + i]);
    }
    loop(arr, current_index + per_num, search_text);
  });
};
watch(search_text, (new_val, old_val) => {
  if (new_val == "") {
    current_filter_list.value = [];
    show_filter_search_box.value = false;
    return;
  }
  show_filter_search_box.value = true;
  current_filter_list.value = [];
  const query_start = performance.now();
  loop(math_store.data, 0, new_val);

  const query_end = performance.now();
  const query_text = document.querySelector(".query_text");
  const query_diff = query_end - query_start;
  query_text.innerHTML = "查询耗时: " + query_diff + "ms";
});
const click_handle = (e) => {
  let search_box = document.querySelector(".search_box");
  if (!search_box.contains(e.target)) {
    show_filter_search_box.value = false;
  }
};
const current_data = ref([]);
const init_data = () => {
  current_data.value = math_store.get_data(route);
  current_data.value.forEach((item) => {
    Object.assign(item, { show_solution: ref(false) });
  });
  nextTick(() => {
    init_content();
  });
};

</script>
<template>
  <div id="math_main" class="f  r j_c_c">
    <svg class="fixed bg_shape" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="ssscribble-grad"><stop stop-color="hsl(206, 75%, 49%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(331, 90%, 56%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><g fill="none" stroke-width="2" stroke="url(#ssscribble-grad)" stroke-linecap="round" stroke-dasharray="42"><path d="M805.72 378.6C813.59 403.72 808.92 426.45 793.18 446.8 770.75 467.31 743.31 485.79 714.93 502.59 689.71 520.21 668.42 537.09 651.84 553.9 641.4 572.84 634.2 593.01 628.48 614.91 625.34 639.69 620.58 666.32 613.05 693.99 604.98 722.38 593.1 749.18 577.62 772.04 561.14 790.55 541.6 801.59 519.73 803.6 497.5 799.02 473.59 786.28 448.46 767.16 423.33 747.53 398.17 728.26 373.01 711.94 347.49 701.85 321.31 696.24 294.25 694.34 266.18 697.29 236.67 700.75 206.01 702.84 174.81 704.83 143.49 702.63 113.71 695.72 86.49 686.2 63.89 671.8 48.17 653.38 38.59 632.81 37.33 609.39 44.13 584.3 54.1 558.29 67.24 531.57 79.97 505 86.01 478.25 85.59 452.04 77.72 426.91 61.28 401.78 42.74 378.92 26.4 358.29 13.16 337.46 8.91 318.47 14.6 300.93 28.03 282.47 49.89 264.51 77.38 246.35 107.42 226.04 138.58 204.37 168.78 180.95 196.64 154.93 222.14 127.33 245.35 99.18 265.82 70.92 285.2 44.92 304.38 23.55 322.28 7.03 341.3 -1.65 362.03 -1.26 382.47 5.35 405.2 19.52 430.33 39.16 455.46 58.28 481.8 76.11 508.75 90.39 535.41 98.08 562.1 101.34 587.76 101.25 623.12 94.68 673.2 90.4 683.56 100.14 686.29 111.17 684.93 127.08 681.05 146.87 679.73 168.79 680.4 193.3 685.4 219.22 698.13 245.97 716.68 273.2 739.61 300.08 765.65 327.12 789.28 353.47 805.72 378.6Q805.72 378.6 805.72 378.6" opacity="0.37"></path><path d="M760.28 354.11C767.67 376.1 765.18 396.89 753.69 416.51 736.35 436.33 713.63 455.4 688.38 473.97 663.73 493.35 640.47 512.97 619.87 533.13 603.43 554.78 589.92 577.53 578.62 601.26 570.51 626.25 562.8 651.65 554.46 676.41 547.13 700.29 537.81 721.45 526.07 738.19 514.29 750.87 499.8 757.16 482.7 756.23 465.49 750.55 445.83 738.65 423.84 721.78 401.85 704.52 378.58 687.05 354.32 671.26 329.96 659.84 304.44 651.54 278.12 646.17 251.75 645.1 224.86 645.28 198.3 645.5 172.76 647.06 148.9 646.51 128.2 643.15 104.39 634.92 91.14 599.28 101.44 573.6 110.57 554.91 120.78 534.62 129.63 513.42 132.64 491.99 130.67 470.07 123.28 448.08 109.29 426.09 93.62 405.08 79.12 385.04 65.87 364.78 58.73 345.06 58.84 325.65 64.62 305.43 77.81 284.82 96.93 263.56 119.71 240.94 145.68 217.25 172.97 192.73 200.38 167.27 227.29 141.74 253 117.29 277.36 94.18 300.54 74.28 322.7 59.23 343.87 48.48 364.78 44.27 385.78 47.2 406.47 54.5 427.8 67.52 449.79 84.78 471.78 101.64 493.38 118 514.16 132.17 544.17 144.7 593.11 149.91 609.15 148.2 622.32 153.5 632.18 199 645.79 226.02 661.8 245.55 681.45 266.49 703.19 288.13 726.16 309.98 746.3 332.13 760.28 354.11Q760.28 354.11 760.28 354.11" opacity="0.46"></path><path d="M714.77 352.42C721.57 371.26 720.85 390.15 713.11 408.98 700.66 427.95 683.15 447.14 662.45 466.56 640.79 486.46 618.61 506.92 597.19 527.89 577.79 549.45 560.09 571.51 544.16 593.61 530.68 615.68 518.29 637.05 506.44 656.74 490.6 682.33 455.42 709.53 434.12 707.79 419.39 701.62 402.62 690.83 383.77 676.28 364.93 661.43 344.9 646 324.08 631.31 303.35 619.48 282.04 609.53 260.74 601.59 239.97 597 219.81 593.69 201.16 591.03 155.34 572.04 169.63 521.62 178.21 498.07 178.67 481.69 175.57 463.96 168.77 445.12 157.11 426.27 144.25 407.2 131.98 388.03 119.77 368.72 111.44 349.06 107.98 329.08 108.06 308.66 113.86 287.65 124.76 266.16 139.05 244.23 157.17 221.93 177.85 199.8 199.98 177.95 223.21 157.11 246.6 138.28 270.01 121.32 292.98 107.72 315.14 98.5 336.96 92.62 358.08 91.85 378.38 96.41 398.54 103.82 418.13 115.43 436.97 130.28 455.82 144.83 473.03 159.44 488.42 172.89 526.22 194.38 559.45 204.41 563.93 207.52 570.07 212.63 591.79 235.98 611.08 254.03 628.35 267.27 647.41 282.37 666.89 298.94 686.43 315.66 703.11 333.57 714.77 352.42Q714.77 352.42 714.77 352.42" opacity="0.54"></path><path d="M669.27 374.48C677.48 405.89 664.16 440.28 635.41 476.09 600.46 512.32 562.04 549.98 525.95 585.8 494.69 618.97 466.12 645.35 438.74 659.36 413.52 664.23 385.61 654.23 354.2 630.78 322.79 606.52 290.85 581.72 261.63 560.94 224.36 544.5 201.69 518.41 216.16 494.52 221.9 476.22 222.48 451.04 214.27 419.62 192.79 388.21 172.58 353.55 161.29 317.41 156.97 281.07 168.54 243.63 192.41 208.7 222.75 176.99 258.98 152.88 295.72 141.69 333.15 139.45 368.85 151.52 400.26 175.78 431.67 199.23 455.82 221.96 472.83 240.12 490.53 249.13 503.31 256.07 514.14 264.06 531.44 269.42 553.19 280.77 580.53 298.99 614.85 317.61 647.79 343.07 669.27 374.48Q669.27 374.48 669.27 374.48" opacity="0.99"></path><path d="M623.78 409.28C631.61 434.4 624.51 462.28 605.72 490.94 581.04 519.16 550.72 547.08 519.35 571.62 488.81 593.25 459.28 608.45 431.76 614.12 405.34 614.3 379.34 604.41 354.21 585.29 329.08 565.66 307.2 544.2 290.08 524.11 269.2 502.43 262.24 466.83 270.32 444.88 270.69 429.61 267.61 409.45 259.78 384.33 243.39 359.2 227.95 331.47 217.59 303.2 209.51 275.48 211.44 248.49 222.51 225.36 237.92 205.35 259.93 192.2 285 188.71 311.3 190.38 338.23 201.65 363.36 221.29 388.49 240.4 409.44 260.47 426.69 278.72 445.17 291.47 462.37 302.93 479.89 314.23 501.76 322.62 526.48 333.93 552.98 349.25 581.76 364.14 607.38 384.14 623.78 409.27Q623.78 409.28 623.78 409.28" opacity="0.99"></path><path d="M578.28 439.44C585.08 458.28 582.48 478.03 572.11 497.2 557.69 515.85 537.99 532.92 515.85 546.49 492.75 558.15 469 564.87 446.41 565.22 423.92 562.94 402.65 554.35 383.8 539.79 364.96 524.94 350.32 507.91 340.15 490.7 327.24 468.47 320.1 427.69 320.57 406.32 317.12 392.2 312.08 375.7 305.28 356.85 293.63 338 283.06 318.6 275.4 300.06 272.87 257.4 322.52 247.25 350.15 266.79 368.99 281.35 387.34 297.58 404.98 313.68 423.38 327.14 442.36 340.41 461.87 353.46 483.12 364.58 505.36 376.93 526.94 390.94 548.42 404.42 566.63 420.59 578.28 439.44Q578.28 439.44 578.28 439.44" opacity="0.33"></path><path d="M532.78 449.9C540.61 475.03 528.73 496.64 505.92 508.61 479.42 517.57 448.98 513.41 423.86 494.29 398.73 474.66 383.66 448.83 377.23 423.51 367.1 400.97 358.61 376.04 350.78 350.92 329.75 315.5 336.52 289.93 369.14 312.29 394.27 331.41 424.79 355.94 455.37 379.92 486.74 400.89 516.39 424.77 532.78 449.9Q532.78 449.9 532.78 449.9" opacity="0.39"></path></g></svg>
        <div class="note_left_nav_bar">
      <MathLeftNavBar></MathLeftNavBar>
    </div>
    <div>
      <div
        id="top_box"
        class="f f_d_c com_box a_c r"
      >
        <div class="f f_d_r top_top_box a_c">
          <div class="search_box r">
            <input
              v-model="search_text"
              @focus="search_focus_handle"
              @input="filter_search_handle"
              @keyup.enter="topic_search_handle"
              id="math_search"
              type="text"
              class="search"
              placeholder="在此键入搜索"
            />

            <div
              class="filter_search_box a"
              v-show="show_filter_search_box"
            >
              <ul class="f f_d_c">
                <li
                  v-for="item in current_filter_list"
                  :key="item"
                  @click="router.push(`/math/details/${item.id}`)"
                >
                  M{{ item.id }}
                  <div class="search_result_text"></div>
                </li>
              </ul>
              <div class="query_time"><span class="query_text"></span></div>
            </div>
            <label class="search_icon a" for="math_search"
              ><svg
                t="1708934777476"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="6287"
                width="52"
                height="52"
              >
                <path
                  d="M900.311266 0H123.688734C65.769106 0 19.029036 46.621138 19.029036 104.421835v814.680604C19.029036 976.903136 65.888037 1024 123.807666 1024H123.688734h776.622532c57.800697 0 104.659698-47.096864 104.659698-104.897561v-814.680604C1004.970964 46.621138 958.230894 0 900.311266 0z m52.329849 919.102439c0 28.900348-23.310569 52.567712-52.329849 52.567712H123.688734c-28.900348 0-52.329849-23.667364-52.329849-52.567712v-814.680604c0-28.900348 23.786295-52.44878 52.329849-52.44878v0.356794h776.622532c28.900348 0 52.329849 23.191638 52.329849 52.091986v814.680604z"
                  fill="#3BC06D"
                  p-id="6288"
                ></path>
                <path
                  d="M399.609756 828.119861c-7.016957 0-13.558188-2.735424-18.55331-7.730546l-58.990012-58.990012-58.990011 58.990012c-4.995122 4.995122-11.536353 7.730546-18.55331 7.730546s-13.558188-2.735424-18.55331-7.730546c-4.995122-4.995122-7.730546-11.536353-7.730546-18.55331s2.735424-13.558188 7.730546-18.55331l58.990011-58.990012-58.990011-58.990012c-10.228107-10.228107-10.228107-26.878513 0-37.10662 4.995122-4.995122 11.536353-7.730546 18.55331-7.730546s13.558188 2.735424 18.55331 7.730546l58.990011 58.990012 58.990012-58.990012c4.995122-4.995122 11.536353-7.730546 18.55331-7.730546s13.558188 2.735424 18.55331 7.730546c10.228107 10.228107 10.228107 26.878513 0 37.10662L359.173055 724.292683l58.990011 58.990012c10.228107 10.228107 10.228107 26.878513 0 37.10662-4.995122 4.995122-11.536353 7.730546-18.55331 7.730546z"
                  fill="#3BC06D"
                  p-id="6289"
                ></path>
                <path
                  d="M322.066434 448.728455c-14.50964 0-26.283856-11.774216-26.283856-26.283856V338.954704h-83.489895c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h83.489895v-83.489896c0-14.50964 11.774216-26.283856 26.283856-26.283856 14.50964 0 26.283856 11.774216 26.283856 26.283856V286.624855H431.721254c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856h-83.489895v83.489895c0 14.271777-11.774216 26.045993-26.164925 26.045993zM701.933566 846.673171c-17.245064 0-31.278978-14.033914-31.278978-31.278978s14.033914-31.397909 31.278978-31.39791 31.278978 14.033914 31.278978 31.39791c0.118931 17.126132-13.914983 31.278978-31.278978 31.278978zM592.278746 746.176074c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h219.428571c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856H592.278746zM701.933566 657.572125c-17.245064 0-31.278978-14.033914-31.278978-31.278977s14.033914-31.397909 31.278978-31.39791 31.278978 14.033914 31.278978 31.39791c0.118931 17.245064-13.914983 31.278978-31.278978 31.278977z"
                  fill="#C6F4CB"
                  p-id="6290"
                ></path>
                <path
                  d="M592.278746 398.420441c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h219.428571c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856H592.278746zM592.278746 279.726829c-14.50964 0-26.283856-11.774216-26.283856-26.283856 0-14.50964 11.774216-26.283856 26.283856-26.283856h219.428571c14.50964 0 26.283856 11.774216 26.283856 26.283856 0 14.50964-11.774216 26.283856-26.283856 26.283856H592.278746z"
                  fill="#3BC06D"
                  p-id="6291"
                ></path></svg
            ></label>
          </div>
        </div>
        <div class="f f_d_c select_tag">
          <h4 class="">标签：</h4>
          <ul class="f f_d_r r">
            <div
              @click="show_all_tag"
              v-show="!show_all_tag_flag"
              class="a show_all_tag f f_d_r a_c"
            >
              展开全部<svg
                t="1708943924609"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10332"
                width="18"
                height="18"
              >
                <path
                  d="M737.701647 149.865412l47.104 37.647059v0.12047L520.372706 519.830588 255.879529 187.572706l46.98353-37.707294 217.449412 273.829647 217.389176-273.829647zM520.131765 785.106824l217.328941-273.829648 47.104 37.707295-264.432941 332.257882-264.493177-332.257882 46.98353-37.707295 217.509647 273.829648z"
                  fill="#A9B8C0"
                  p-id="10333"
                ></path>
              </svg>
            </div>
            <li
              @click="router.push(`/math/1?tag=${item[0]}`)"
              v-for="item in tags_list"
              :key="item"
              class="r"
            >
              {{ item[0] }}
              <span class="count"> {{ item[1] }} </span>
            </li>
            <div
              @click="close_all_tag"
              v-show="show_all_tag_flag"
              class="close_all_tag f f_d_r a_c"
            >
              收起<svg
                t="1708943924609"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10332"
                width="18"
                height="18"
              >
                <path
                  d="M737.701647 149.865412l47.104 37.647059v0.12047L520.372706 519.830588 255.879529 187.572706l46.98353-37.707294 217.449412 273.829647 217.389176-273.829647zM520.131765 785.106824l217.328941-273.829648 47.104 37.707295-264.432941 332.257882-264.493177-332.257882 46.98353-37.707295 217.509647 273.829648z"
                  fill="#A9B8C0"
                  p-id="10333"
                ></path>
              </svg>
            </div>
          </ul>
        </div>
      </div>
      <div
        id="content_box"
        class="f f_d_c a_c"
      >
        <!-- width：100% -->
        <ul class="content_mid_box f f_d_c">
          <li
            v-for="item in current_data.slice(0, 10)"
            :key="item"
            class="content_item_box f f_d_c"
          >
            <div class="f f_d_r content_item_top_box">
              ID:{{ item.id }}
            </div>

            <div
              @click="item.show_solution = !item.show_solution"
              class="subject_context markdown-body"
              v-highlight
            ></div>
            <div
              v-show="item.show_solution"
              class="subject_solution_context markdown-body"
              v-highlight
            ></div>
            <div class="content_tag_box f a_c">
              <div
                v-for="item2 in item.tags.split('?')"
                class="f content_tag_item a_c j_c_c"
                :key="item2"
              >
                {{ item2 }}
              </div>
            </div>
            <div class="content_item_bottom_box f f_d_r">
              <button
                @click="router.push(`/math/details/${item.id}`)"
                class="content_item_bottom_btn"
              >
                查看详情
              </button>
            </div>
          </li>
        </ul>
        <div
          class="content_bottom_box f a_c j_c_c"
        >
          <Pagination
            style="z-index: 100"
            :current_page="current_page"
            page_size="10"
            @current_change="current_page_change"
            :total="math_store.current_data.data.length"
          >
          </Pagination>
        </div>
      </div>
    </div>
    <div style="width:180px;"></div>
  </div>
  <div
      class="math_foot r f f_d_r a_c j_c_c"
    >
      <div class="left_foot f f_d_c  j_c_c">
        <span class="title_foot">人生格言</span>
        <span class="text_foot" v-html="user_store.aphorism"></span>
      </div>
      <div class="mid_foot f f_d_c">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot f f_d_c j_c_c">
        <span class="title_foot">联系我</span>
        <span class="text_foot">邮箱: {{user_store.e_mail}}</span>
        <span class="text_foot">GitHub Account: {{user_store.github_account}}</span>
        <span class="text_foot">小红书ID: {{user_store.red_book_ID}}</span>
      </div>
    </div>
</template>
<style lang="scss" scoped>
$subject_solution_context_bg: var(--subject_solution_context_bg, #d0cfcf45);
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

#math_main {
  width: max(1440px,100vw);
  min-height: 100vh;
  color: $text;
  background: $fill_body;
 
  gap: 16px;
  .bg_shape{
    top: -300px;
    left: 40px;
    opacity: .3;
      path{
        fill: $primary_mix_4;
      }
      stop{
        stop-color:$primary_mix_4;

      }
     
  }
 
  @font-face {
  font-family: "misans";
  src: url("/src/assets/font/misans.ttf");
}
font-family: 'misans';
  .note_left_nav_bar {
    z-index: 10000;
  }
  
  

  .select_tag {
    width: 968px;
    justify-items: flex-start;
    border-top: $primary_mix_4 2px solid;
    padding-top: 16px;
    color: $primary;
    .show_all_tag {
      right: 0;
      user-select: none;
      font-size: 14px;
      height: 40px;
      border-radius: 15px;
      color: $primary;
      padding: 0 8px;
      background: linear-gradient(90deg, transparent 0%, $fill 10%);
      z-index: 11;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .close_all_tag {
      width: 100%;
      user-select: none;
      color: $primary;
      font-size: 14px;
      justify-content: flex-end;
      svg {
        transform: rotate(180deg);
      }
    }
    h4 {
      margin: 0;
    }

    ul {
      flex-wrap: wrap;
      gap: 8px;
      padding: 0;
      height: 39px;
      overflow: hidden;
      list-style: none;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      li {
        user-select: none;
        background: $primary_mix_3;
        padding: 10px;
        font-weight: 900;
        border-radius: 10px;
        color: $fill_primary;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        .count {
          font-size: 12px;
          font-weight: 400;
        }
        &:hover {
          background: $fill_primary;
          color: $primary_mix_3;
        }
      }
    }
  }

  .com_box {
    border-radius: 10px;
    box-shadow: $fill_shadow 0px 0px 20px;
    background: $fill;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

    .top_top_box {
      width: 968px;
      height: 38px;
      margin: 0 0;
      font-weight: 600;
      color: $primary;
      padding: 16px;

      .search_box {
        margin: auto auto;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

        .search {
          height: 36px;

          width: 500px;
          color: $primary;
          background: transparent;
          border: none;
          font-size: 1.2em;
          padding-left: 20px;
          border-radius: 10px;
          box-shadow: $primary 0 0 0 1px;

          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          &:focus {
            box-shadow: $primary 0px 4px 5px;

            outline: none;
          }
          &:hover {
            box-shadow: $primary 0px 4px 5px;
          }
          &::placeholder {
            color: $text_placeholder;
            font-size: 0.9em;
          }
        }

        .search_icon {
          right: 0;
          bottom: 0;
          transform: rotate(10deg) translateZ(0);
          svg {
            path:nth-child(1) {
              fill: $primary_mix_6;
            }
            path:nth-child(2) {
              fill: $primary;
            }
            path:nth-child(3) {
              fill: $primary;
            }
            path:nth-child(4) {
              fill: $primary_mix_2;
            }
          }
        }
        .filter_search_box {
          width: 100%;
          max-height: 30vh;
          background: $fill;
          bottom: 0;
          z-index: 10000;
          transform: translateY(120%);
          box-shadow: $fill_shadow 2px 3px 10px;
          border-radius: 10px;
          overflow-y: scroll;
          .query_time {
            margin-left: 16px;
            margin-bottom: 8px;
            color: $primary;
            font-size: 0.7em;
          }
          ul {
            list-style: none;
            margin: 16px;
            padding: 0;
            gap: 4px;
            li {
              word-wrap: break-word;
              color: $text_secondary;
              user-select: none;
              font-size: 1.1em;
              &:hover {
                color: $primary;
              }
            }
          }
        }
      }
    }
  }

  #top_box {
    margin-top: 90px;
    width: 1000px;
    z-index: 100000000;
  }

  #content_box {
    margin-top: 30px;
    width: 1000px;
    z-index: 1;
    margin-bottom: 20px;

    .content_mid_box {
      width: 1000px;
      height: auto;
      margin: 0;
      padding: 0px;
      margin-bottom: 30px;
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;
      gap: 16px;
      .content_item_box {
        min-height: 60px;
        z-index: 100;
        border-radius: 5px;
        background: $fill;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        box-shadow: $fill_shadow 0px 0px 20px;

        .content_item_top_box {
          width: 968px;
          background:$primary;
          padding: 8px 16px;
          color: $fill_primary;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
        .content_item_bottom_box {
          width: 968px;
          background: fill;
          padding: 8px 16px;
          justify-content: flex-end;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
          .content_item_bottom_btn {
            background:$fill_primary;
            border: 1px solid $primary;
            font-size: 12px;
            padding: 4px 16px;
            color: $primary;
            transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
            &:hover {
              background: $primary;
              color: $fill_primary;
            }
          }
        }
        &:hover {
          box-shadow:$primary 0px 0px 0px 4px;
        }

       


        .subject_context {
          width: 968px !important;
          padding: 8px 16px;
        }
        .subject_solution_context {
          width: 936px !important;
          height: auto;
          border-radius: 5px;
          margin: 8px 16px;
          padding:  16px;
          background-color: $subject_solution_context_bg !important;
        }
        .content_tag_box {
          flex-wrap: wrap;
          border-bottom: $primary_mix_4 1px solid;
          .content_tag_item {
            width: auto;
            padding: 0 5px;
            height: 30px;
            align-self: start;
            margin: 5px 0px 3px 3px;
            border-radius: 5px;
            color: $fill_primary;
            font-size: 12px;
            font-weight: 700;
            background: $primary;
            transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          }
        }
      }
    }

    .content_bottom_box {
      margin-top: auto;
      margin-bottom: 10px;
      width: 100%;
    }
  }
 
}
.math_foot {
  width: max(1440px,100vw);
  background: $fill_body;
    z-index: 10;
    width: inherit;
    height: 200px;
    gap: 16px;
    .title_foot {
      font-size: 16px;
      color: $primary;
    }
    .text_foot {
      font-size: 14px;
      font-weight: 700;
      color: $primary;
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
@keyframes move_top {
  0% {
    transform: translate(-50%, -10%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
@keyframes content_box {
  0% {
    opacity: 0;
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
}
</style>
../component/MathLeftNavBar.vue
