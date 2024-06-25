<!-- @Author: LT -->
<!-- @Date: 2024-01-13 00:16:43 -->
<!-- @Description:  -->

<script setup>
import {
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  watch,
  onMounted,
  onUnmounted,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useTopicStore } from "/src/store/topic.js";
import { useUserStore } from "/src/store/user.js";
const { params } = useRoute();
import { useConfigStore } from "../store/config";
import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const user_store = useUserStore();
const { layout } = storeToRefs(config_store);
const { list_layout } = storeToRefs(config_store);
const router = useRouter();
config_store.$subscribe((mutation, state) => {
  change_layout(state.layout);
  change_list_layout(state.list_layout);
});
onBeforeMount(() => {});
onMounted(() => {
  init();
  document.addEventListener("click", click_handle);
  document.addEventListener("scroll", scroll_handle);

});
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
const change_list_layout = (v) => {
  const layout_list = document.querySelectorAll(".layout");
  const topic_grid_box = document.querySelector(".topic_grid_box");
  const topic_list_box = document.querySelector(".topic_list_box");
  if (v) {
    layout_list[0].classList.add("layout_active");
    layout_list[1].classList.remove("layout_active");
    topic_grid_box.style.transform = "translateY(-36px)";
    topic_grid_box.style.opacity = 0.5;
    topic_list_box.style.opacity = 1;
  } else {
    layout_list[1].classList.add("layout_active");
    layout_list[0].classList.remove("layout_active");
    topic_grid_box.style.transform = " translateY(0)";
    topic_grid_box.style.opacity = 1;
    topic_list_box.style.opacity = 0;
  }
};
const click_handle = (e) => {
  let topic_search_box = document.querySelector(".topic_search_box");
  if (!topic_search_box.contains(e.target)) {
    show_filter_search_box.value = false;
  }
};
const init = () => {
  window.scrollTo(0, 0);
  change_layout(layout.value);
  change_list_layout(list_layout.value);
  scroll_handle();
  run_time(birthday_date);
};
const change_layout = (flag) => {
  const topic_box = document.querySelector(".topic_box");
  const topic_grid_inner_box = document.querySelector(".topic_grid_inner_box");

  if (flag) {
    topic_box.style.width = "866px";
    show_personal_info.value = true;
    topic_grid_inner_box.style.width = "866px";
  } else {
    topic_box.style.width = "1100px";
    show_personal_info.value = false;
    topic_grid_inner_box.style.width = "1100px";
  }
};
let item_list;
const scroll_handle = () => {
  if(item_list == null){
      item_list = document.querySelectorAll(".topic_item")
  }
  for (let i = 0; i < item_list.length; i++) {
    if ( window.scrollY >=
    item_list[i].offsetTop - window.innerHeight / 1.2) {
      r_o_a_i(item_list[i])
    }else{
      r_i_a_o(item_list[i])
    }
  }
};

onUnmounted(() => {
  document.removeEventListener("scroll", scroll_handle);
  clearInterval(interval_run_time);
  document.removeEventListener("click", click_handle);
});

onBeforeMount(() => {
  init_data();
});
const show_personal_info = ref(true);
const per_page_count = 12;
const current_data = ref();
const page_data = ref({
  total: 0,
  page_size: per_page_count,
  current_index: params.page,
});
const init_data = () => {
  topic_store.select_all_from_classification(params.classification);
  current_data.value = topic_store.current_data;
  data_handle(current_data.value, params.page);
  
};

const data_handle = (array, page_num) => {
  if (page_num * per_page_count >= array.length) {
    current_data.value = array.slice(
      page_num * per_page_count - per_page_count
    );
  } else {
    current_data.value = array.slice(
      (page_num - 1) * per_page_count,
      (page_num - 1) * per_page_count + per_page_count
    );
  }
  page_data.value.total = array.length;
};
const jump_to_topic = (path) => {
  router.push(path);
};

const page_handle = (index) => {
  router.push(`/article/list/${params.classification}/` + index);
  nextTick(() => {
    window.scrollTo(0, 0);
    page_data.value.current_index = index;
  });
};

const classification_handle = (classification) => {
  router.push(`/article/list/${classification}/1`);
};
const birthday_date = "2024-01-05 11:01:01";
const current_run_time = ref("");
const run_time = (date) => {
  let date_start = new Date(date);
  let date_end = new Date();
  let date_diff = date_end.getTime() - date_start.getTime();
  let day_diff = Math.floor(date_diff / (24 * 3600 * 1000));
  let leave1 = date_diff % (24 * 3600 * 1000);
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  let leave3 = leave2 % (60 * 1000);
  let seconds = Math.round(leave3 / 1000);
  current_run_time.value = `${day_diff}天${hours}小时${minutes}分钟`;
};
const last_update = () => {
  let date_array = [];
  date_array = topic_store.data
    .slice(0, 4)
    .map((item) => format_date(item.create_date));
  let date_array_sort = date_array.sort((a, b) => {
    let temp_1 = b.split("-");
    let temp_2 = a.split("-");
    return (
      new Date(temp_1[0], temp_1[1] - 1, temp_1[2], temp_1[3], temp_1[4]) -
      new Date(temp_2[0], temp_2[1] - 1, temp_2[2], temp_2[3], temp_2[4])
    );
  });
  let temp = date_array_sort[0].split("-");

  let date_start = new Date(temp[0], temp[1] - 1, temp[2], temp[3], temp[4]);
  let date_end = new Date();

  let date_diff = date_end.getTime() - date_start.getTime();
  let day_diff = Math.floor(date_diff / (24 * 3600 * 1000));

  let leave1 = date_diff % (24 * 3600 * 1000);
  let hours = Math.floor(leave1 / (3600 * 1000));
  let leave2 = leave1 % (3600 * 1000);
  let minutes = Math.floor(leave2 / (60 * 1000));
  if (day_diff == 0 && hours < 24) {
    if (hours === 0) {
      return minutes + "分钟前";
    } else {
      return hours + "小时前";
    }
  } else {
    return day_diff + "天前";
  }
};
// xx月xx号?xxxx?xx:xx  ..?年?时:分 -> xxxx-xx-xx-xx-xx  年-月-日-时-分
const format_date = (date) => {
  return (
    date.split("?")[0] +
    "-" +
    date.split("?")[1] +
    "-" +
    date.split("?")[2] +
    "-" +
    date.split("?")[3].split(":")[0] +
    "-" +
    date.split("?")[3].split(":")[1]
  );
};
let interval_run_time = setInterval(() => {
  run_time(birthday_date);
}, 60000);
const personal_info = {
  classification_total: 4,
  new_topic: topic_store.data.slice(0, 4),
  site_info: {
    name: "Tiny Flowers",
    run_time: current_run_time,
    last_update: last_update(),
  },
};

const topic_search_handle = (e) => {
  let key_code = window.event ? e.keyCode : e.which;
  if (key_code == 13) {
    // search_text.value = "";
    // router.push({ path: "/unknownWorldMap/list", query: { search_text: search_text.value } });
  }
};
const current_filter_list = ref([]);

const search_text = ref();
watch(search_text, (new_val, old_val) => {
  if (new_val == "") {
    current_filter_list.value = [];
    show_filter_search_box.value = false;
    return;
  }
  show_filter_search_box.value = true;
  current_filter_list.value = [];
  const query_start = performance.now();
  loop(topic_store.get_all(), 0, new_val);
  const query_end = performance.now();
  const query_text = document.querySelector(".query_text");

  const query_diff = query_end - query_start;
  query_text.innerHTML = "查询耗时: " + query_diff + "ms";
});
const loop = (arr, current_index, search_text) => {
  if (current_index > arr.length - 1) return;
  search_text.toLowerCase();
  let per_num = Math.min(10, arr.length - current_index);
  window.requestAnimationFrame(() => {
    for (let i = 0; i < per_num; i++) {
      if (
        arr[current_index + i].title.toLowerCase().indexOf(search_text) == -1 &&
        arr[current_index + i].tags.toLowerCase().indexOf(search_text) == -1
      )
        continue;
      current_filter_list.value.push(arr[current_index + i]);
    }
    loop(arr, current_index + per_num, search_text);
  });
};
const show_filter_search_box = ref(false);
const search_focus_handle = () => {
  if (search_text.value.length == 0) return;
  show_filter_search_box.value = true;
};
</script>
<template>
  <div id="topic_list_main" class="f f_d_c r">
        <svg  class="fixed bg_shape" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800" opacity="1"><defs><filter id="bbburst-blur-1" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="1"></feGaussianBlur></filter><filter id="bbburst-blur-2" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="2"></feGaussianBlur></filter><filter id="bbburst-blur-3" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="4"></feGaussianBlur></filter><filter id="bbburst-blur-4" x="-100%" y="-100%" width="400%" height="400%"><feGaussianBlur in="SourceGraphic" stdDeviation="12"></feGaussianBlur></filter><symbol id="bbburst-shape-1" viewBox="0 0 194 167"><path d="m97 0 96.129 166.5H.871L97 0Z"></path></symbol><symbol id="bbburst-shape-2" viewBox="0 0 126 115"><path d="m63 0 62.77 43.877-23.976 70.996H24.206L.23 43.877 63 0Z"></path></symbol><symbol id="bbburst-shape-3" viewBox="0 0 131 127"><path d="m66 0 66 63.5L66 127 0 63.5 66 0Z"></path></symbol><symbol id="bbburst-shape-4" viewBox="0 0 149 143"><path d="M71.647 2.781c.898-2.764 4.808-2.764 5.706 0l15.445 47.534a3 3 0 0 0 2.853 2.073h49.98c2.906 0 4.115 3.719 1.764 5.427L106.96 87.193a2.999 2.999 0 0 0-1.09 3.354l15.445 47.534c.898 2.764-2.266 5.062-4.617 3.354l-40.435-29.378a3 3 0 0 0-3.526 0l-40.435 29.378c-2.351 1.708-5.515-.59-4.617-3.354L43.13 90.547a3 3 0 0 0-1.09-3.354L1.605 57.815c-2.35-1.708-1.142-5.427 1.764-5.427h49.98a3 3 0 0 0 2.853-2.073L71.647 2.781Z"></path></symbol><symbol id="bbburst-shape-5" viewBox="0 0 145 145"><circle cx="72.5" cy="72.5" r="72.5"></circle></symbol><symbol id="bbburst-shape-6" viewBox="0 0 133 116"><path d="M59.7487 10.2513c-13.6683-13.66839-35.8291-13.66839-49.4974 0-13.66839 13.6683-13.66839 35.8291 0 49.4974l49.4974-49.4974ZM66.5 66.5 41.7513 91.2487 66.5 115.997l24.7487-24.7483L66.5 66.5Zm56.249-6.7513c13.668-13.6683 13.668-35.8291 0-49.4974-13.669-13.66839-35.8294-13.66839-49.4977 0l49.4977 49.4974Zm-112.4977 0 31.5 31.5 49.4974-49.4974-31.5-31.5-49.4974 49.4974Zm80.9974 31.5 31.5003-31.5-49.4977-49.4974-31.5 31.5 49.4974 49.4974Z"></path></symbol><symbol id="bbburst-shape-7" viewBox="0 0 139 124"><path fill-rule="evenodd" clip-rule="evenodd" d="M70.1641 15.0917C54.6093.764854 37.8293-2.10782 24.4032 2.82615 10.3804 7.97941.763366 21.4591 1.00047 37.0608c.1068 7.0273 2.86132 13.7317 7.0039 20.2001C12.1442 63.7249 17.853 70.2322 24.25 76.9024c3.8209 3.9842 7.8871 8.0312 12.0767 12.201h.0001c10.0335 9.9862 20.7748 20.6766 30.5497 32.8956 1.38 1.725 3.8972 2.005 5.6223.624.6706-.536 1.1228-1.244 1.3439-2.011 9.5768-11.748 20.0328-22.0735 29.8163-31.7351 4.19-4.1373 8.256-8.1528 12.078-12.1062 6.396-6.6176 12.106-13.0752 16.247-19.4911 4.144-6.4196 6.905-13.0811 7.012-20.0691.237-15.5124-9.399-28.8902-23.411-33.99923-13.32-4.85681-29.9542-2.08621-45.4209 11.88043Zm-3.7351 7.4919C52.1278 8.44857 37.6826 6.46918 27.1626 10.3352 16.2859 14.3323 8.8148 24.7824 8.99955 36.9392c.07575 4.9844 2.03755 10.2234 5.74165 16.0072 3.707 5.7881 8.9752 11.8418 15.2827 18.4187 3.5798 3.7328 7.4978 7.6329 11.6 11.7163 9.0476 9.0063 18.9911 18.9046 28.1786 29.8666 9.2999-11.068 19.4036-21.0473 28.5839-30.1144l.0007-.0006c4.1019-4.0508 8.0189-7.9196 11.5979-11.6222 6.307-6.5252 11.573-12.5298 15.278-18.2697 3.703-5.7362 5.658-10.924 5.734-15.8531.184-12.0276-7.267-22.3914-18.153-26.3608-10.71-3.90518-25.4722-1.80041-40.0023 12.867-1.5547 1.5694-4.0874 1.5813-5.6568.0265-.3146-.3116-.5666-.6625-.7559-1.0371Z"></path></symbol><symbol id="bbburst-shape-8" viewBox="0 0 87 168"><path d="m12 12 31.2546 18.0749c16.4102 9.4902 20.014 31.6325 7.4603 45.8369L36.3296 92.1884c-12.5684 14.2206-8.9394 36.3916 7.5068 45.8636L75 156" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"></path></symbol><symbol id="bbburst-shape-9" viewBox="0 0 182 172"><path d="M13.5809 69.845 91 13.5967l77.419 56.2483-29.571 91.012H43.1524L13.5809 69.845Z" stroke-width="22"></path></symbol><symbol id="bbburst-shape-10" viewBox="0 0 145 145"><circle cx="72.5" cy="72.5" r="61.5" fill="none" stroke-width="22"></circle></symbol><symbol id="bbburst-shape-11" viewBox="0 0 194 167"><path d="M10.398 161 97 11l86.603 150H10.397Z" stroke-width="11"></path></symbol><symbol id="bbburst-shape-12" viewBox="0 0 170 151"><path d="M69.3728 54.2122 85 10.0031l15.627 44.2091c1.413 3.9958 5.19 6.6672 9.428 6.6673h49.312l-39.149 26.1447c-3.803 2.5401-5.399 7.3367-3.875 11.6488l15.179 42.94-40.9683-27.36c-3.3621-2.245-7.7453-2.245-11.1074 0l-40.9682 27.36 15.1785-42.94c1.5243-4.3121-.0712-9.1087-3.8746-11.6488L10.6333 60.8795h49.3112c4.2381-.0001 8.0159-2.6715 9.4283-6.6673Z" stroke-width="12"></path></symbol><symbol id="bbburst-shape-13" viewBox="0 0 159 159"><path stroke-width="22" d="M11 11h137v137H11z"></path></symbol><symbol id="bbburst-shape-14" viewBox="0 0 185 109"><path d="M168 16.5C168 58.1975 134.197 92 92.5 92 50.8025 92 17 58.1975 17 16.5" stroke-width="33" stroke-linecap="round"></path></symbol></defs><use xlink:href="#bbburst-shape-14" width="26.24524417702203" opacity="0.5133060286288271" transform="matrix(0.9736506520066498,0.22804474965897734,-0.22804474965897734,0.9736506520066498,300.0446694724723,134.64073168788173)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-13" width="29.180609348139747" opacity="0.5899547472879105" transform="matrix(0.9257336113391204,-0.37817625631050716,0.37817625631050716,0.9257336113391204,419.5568197067621,43.51410600074763)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-5" width="21.590262248381613" opacity="0.70496567005709" transform="matrix(0.9818278413370294,-0.1897737863232674,0.1897737863232674,0.9818278413370294,233.95010975059773,115.61816057958106)" fill="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-2" width="41.9487389096498" opacity="0.21432438331548143" transform="matrix(1.0843101856104178,-0.6219094961338837,0.6219094961338837,1.0843101856104178,469.43214151901157,72.99262616958595)" fill="#ffa6d5" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-12" width="30.079814212992964" opacity="0.1837559463653905" transform="matrix(0.9466168049434569,-0.8163434476975002,0.8163434476975002,0.9466168049434569,425.08041285532437,1.4206824265445448)" fill="none" stroke="#ffbd9b" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-6" width="15.585240418872637" opacity="0.8126887908638822" transform="matrix(0.9656732920418944,-0.25975968324004783,0.25975968324004783,0.9656732920418944,357.21606319588216,64.67003241390285)" fill="#ff5c58"></use><use xlink:href="#bbburst-shape-6" width="36.419375880885255" opacity="0.344821804007324" transform="matrix(0.9932062549522477,-0.1163672424857215,0.1163672424857215,0.9932062549522477,61.78761462361976,-105.0679048678241)" fill="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-7" width="43.79580608788699" opacity="0.10746936835198684" transform="matrix(1.729841732986732,0.2648538820131961,-0.2648538820131961,1.729841732986732,111.46679796348738,-112.47977912585384)" fill="#2c2891" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-9" width="22.52201568925131" opacity="0.7006168955889132" transform="matrix(0.8886399017116451,0.45860563132817905,-0.45860563132817905,0.8886399017116451,681.3224036835782,120.02541624171766)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-11" width="16.140792279943017" opacity="0.7384959491337062" transform="matrix(0.760662937956561,-0.649147051768159,0.649147051768159,0.760662937956561,73.93946937552471,-0.3402213490356871)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-12" width="29.434815249346347" opacity="0.547962831152998" transform="matrix(0.964066619726678,0.265660596868969,-0.265660596868969,0.964066619726678,625.990386436515,-142.7185976612071)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-9" width="43.91083897254418" opacity="0.17503644943191898" transform="matrix(1.0652075176001548,-0.6540894009599268,0.6540894009599268,1.0652075176001548,388.57620369692955,-262.74050450973556)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-12" width="21.268368016456538" opacity="0.7007511614973243" transform="matrix(0.9391735462265174,0.343442935679725,-0.343442935679725,0.9391735462265174,657.8220578642129,54.179067997820425)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-11" width="11.403881846680006" opacity="0.9914688584687273" transform="matrix(0.8280933945502282,0.5605901621526015,-0.5605901621526015,0.8280933945502282,616.5307003115114,67.75483003790185)" fill="none" stroke="#ff5c58"></use><use xlink:href="#bbburst-shape-11" width="26.702128874165542" opacity="0.49735592094556735" transform="matrix(0.7960513039836602,0.6052291478654297,-0.6052291478654297,0.7960513039836602,525.9007250292872,-126.71068285849486)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-12" width="30.459937554505814" opacity="0.4232572879904003" transform="matrix(0.9891501063975843,0.1469083626402793,-0.1469083626402793,0.9891501063975843,478.25122405409036,259.2729312070279)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-11" width="43.389743458005704" opacity="0.20124916142446336" transform="matrix(0.9698012092509647,0.7886606459912695,-0.7886606459912695,0.9698012092509647,428.0047942779463,-246.36491549851536)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-5" width="11.941830986297381" opacity="0.8962569771091909" transform="matrix(0.7997610937851268,-0.6003184095691365,0.6003184095691365,0.7997610937851268,109.8405072472741,95.13637092108519)" fill="#2c2891"></use><use xlink:href="#bbburst-shape-4" width="40.686132393223744" opacity="0.38547452274470995" transform="matrix(0.7964569452769051,-0.604695240861197,0.604695240861197,0.7964569452769051,302.2371297258055,319.0873813401959)" fill="#00a19d" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-14" width="16.80597351000104" opacity="0.8130243137697726" transform="matrix(0.9821015270256587,-0.1883523045090485,0.1883523045090485,0.9821015270256587,277.54239652672356,83.38769186353494)" fill="none" stroke="#ffa6d5"></use><use xlink:href="#bbburst-shape-14" width="15.169744525180993" opacity="0.7669068731057406" transform="matrix(0.9999814253049801,-0.006095001642372035,0.006095001642372035,0.9999814253049801,297.830566837979,50.18672993121214)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-6" width="42.38027155994124" opacity="0.3627039683106168" transform="matrix(0.9752551550853915,0.22108229797830692,-0.22108229797830692,0.9752551550853915,181.3970203579273,20.603239433688827)" fill="#00a19d" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-12" width="41.4367578765299" opacity="0.10194764359262021" transform="matrix(1.7461307102374348,-0.11630796518601484,0.11630796518601484,1.7461307102374348,-37.35932341046113,-489.92355071533734)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-3" width="31.001807982621926" opacity="0.5686402493400851" transform="matrix(0.9418476817567185,-0.33604009339585506,0.33604009339585506,0.9418476817567185,375.2094062779804,177.57299105209063)" fill="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-10" width="34.392702624718424" opacity="0.19216636923831976" transform="matrix(1.1014370115230383,-0.5910469606107441,0.5910469606107441,1.1014370115230383,-213.3567868069974,32.743229684052835)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-12" width="33.50185928970286" opacity="0.025349576195297985" transform="matrix(1.5212885266866554,-0.8649746924457071,0.8649746924457071,1.5212885266866554,-225.30570193870034,163.59516778705733)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-11" width="29.164123618422693" opacity="0.47335978062729334" transform="matrix(0.9807916068043186,0.19505851435454652,-0.19505851435454652,0.9807916068043186,695.3333570396378,-46.05917449498145)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-2" width="16.398990150391654" opacity="0.7752978356124193" transform="matrix(0.9217470808792793,-0.38779159208333475,0.38779159208333475,0.9217470808792793,304.0932523094996,-41.45185235738302)" fill="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-11" width="27.135826208412848" opacity="0.09897918837173203" transform="matrix(1.4657669766460126,0.9560476819562962,-0.9560476819562962,1.4657669766460126,936.4548894322032,166.62988514863446)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-7" width="11.536009077464783" opacity="0.8803406969519383" transform="matrix(0.7597110871680484,0.6502607661807238,-0.6502607661807238,0.7597110871680484,628.5876887433903,45.80822041700458)" fill="#ff5c58"></use><use xlink:href="#bbburst-shape-14" width="22.011268635944543" opacity="0.6115762401042468" transform="matrix(0.9940866685152555,-0.108589573533745,0.108589573533745,0.9940866685152555,507.1735553025083,-63.15160715689558)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-13" width="30.404448829665636" opacity="0.32317694154595744" transform="matrix(1.2069619423970608,-0.3251812872923564,0.3251812872923564,1.2069619423970608,267.5314767418046,-381.99362446159415)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-9" width="12.055980631943994" opacity="0.8721392338642118" transform="matrix(0.999509499631513,0.03131709032401543,-0.03131709032401543,0.999509499631513,352.31339260324245,-19.409968958670106)" fill="none" stroke="#ff5c58"></use><use xlink:href="#bbburst-shape-8" width="32.18319580744814" opacity="0.2899767808651339" transform="matrix(1.074556480817964,0.638614413814872,-0.638614413814872,1.074556480817964,746.8037514301672,260.37113172451836)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-3" width="19.399962508205128" opacity="0.7870357141545212" transform="matrix(0.8653578152714441,-0.501154518635354,0.501154518635354,0.8653578152714441,101.98660137293666,23.449625366624844)" fill="#2c2891"></use><use xlink:href="#bbburst-shape-14" width="40.784721033541" opacity="-0.07519576537163641" transform="matrix(1.6579971430107734,0.5599513137480014,-0.5599513137480014,1.6579971430107734,234.84184478218083,53.898959838596625)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-11" width="12.557673373483937" opacity="0.8517008881038484" transform="matrix(0.9242659369172064,0.38174923425536655,-0.38174923425536655,0.9242659369172064,544.0251099379958,-38.922999985553815)" fill="none" stroke="#ff5c58"></use><use xlink:href="#bbburst-shape-8" width="13.216676067709034" opacity="0.8714368869607055" transform="matrix(0.817906955193968,0.5753505128574514,-0.5753505128574514,0.817906955193968,658.7577474869169,115.82699712345647)" fill="none" stroke="#ff5c58"></use><use xlink:href="#bbburst-shape-1" width="29.942363938570054" opacity="0.07921388903803572" transform="matrix(1.720065006206625,-0.32229857961741537,0.32229857961741537,1.720065006206625,605.5752712518888,-78.38895580270969)" fill="#2c2891" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-5" width="35.754866560368924" opacity="0.3116098423571312" transform="matrix(1.2496335221675476,0.03026648765762907,-0.03026648765762907,1.2496335221675476,351.8554781813775,207.05252563985005)" fill="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-13" width="10.534061400851604" opacity="0.9217602213368205" transform="matrix(0.9897492289325006,-0.14281618895461554,0.14281618895461554,0.9897492289325006,319.63944301487686,35.09883376790543)" fill="none" stroke="#00a19d"></use><use xlink:href="#bbburst-shape-13" width="13.62872361767461" opacity="0.9403853088431409" transform="matrix(0.9982584695857066,0.05899176129259686,-0.05899176129259686,0.9982584695857066,434.8370020818567,20.14720711119469)" fill="none" stroke="#00a19d"></use><use xlink:href="#bbburst-shape-2" width="42.82283166304174" opacity="0.2745325264017353" transform="matrix(1.0052242263853755,-0.7429833475172397,0.7429833475172397,1.0052242263853755,385.1285304279555,-105.59271304802661)" fill="#ffa6d5" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-14" width="34.41871660256305" opacity="0.4428739723533509" transform="matrix(0.9012945008855531,-0.4332069051544097,0.4332069051544097,0.9012945008855531,453.75674879000024,110.48545063656371)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-9" width="26.477426087046577" opacity="0.5288685415392766" transform="matrix(0.979231864915768,0.20274356890808448,-0.20274356890808448,0.979231864915768,437.96784334613795,215.29531616230355)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-11" width="11.45124763652162" opacity="0.8155096193906735" transform="matrix(0.982123915734135,0.18823552837615345,-0.18823552837615345,0.982123915734135,413.127562349109,-54.83518737882514)" fill="none" stroke="#ff5c58"></use><use xlink:href="#bbburst-shape-3" width="41.487619882522004" opacity="0.33541066088361193" transform="matrix(0.989561101851067,-0.1441139330644408,0.1441139330644408,0.989561101851067,53.141747053079,138.84011473395236)" fill="#00a19d" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-9" width="23.29021973116619" opacity="0.6360762055868232" transform="matrix(0.9516276034514585,0.3072538109596587,-0.3072538109596587,0.9516276034514585,465.50027327117726,-141.44290112639325)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-8" width="16.880480193162157" opacity="0.7606326885936334" transform="matrix(0.9726944254252405,0.23208954036462123,-0.23208954036462123,0.9726944254252405,472.48353851035864,-98.06536835203008)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-9" width="46.344938225333024" opacity="0.1953019879072082" transform="matrix(1.2351871154764331,-0.19186659365561368,0.19186659365561368,1.2351871154764331,-61.83338310927286,-154.06510131723252)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-3" width="24.7039218656929" opacity="0.5770348050788833" transform="matrix(0.8115966567807746,-0.5842181670423041,0.5842181670423041,0.8115966567807746,324.2911404971404,171.9431443845217)" fill="#ffbd9b" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-9" width="16.518871796804945" opacity="0.69039456598032" transform="matrix(0.7669360538180762,-0.6417235303103331,0.6417235303103331,0.7669360538180762,246.98163706846015,13.036689276485674)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-13" width="36.3495571924545" opacity="0.36195961191434045" transform="matrix(0.9569470248793982,-0.2902626251766985,0.2902626251766985,0.9569470248793982,460.0260930620623,-189.60123308525618)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-12" width="21.473876488017588" opacity="0.60110629013801" transform="matrix(0.9576246780816039,-0.2880190548021162,0.2880190548021162,0.9576246780816039,155.37079719027034,-114.26849129962108)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-12" width="23.651110983570028" opacity="0.6632817238382049" transform="matrix(0.7460226552212237,-0.6659205642542323,0.6659205642542323,0.7460226552212237,-25.409355923530825,129.48667296923855)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-9" width="37.17181863542518" opacity="0.1829410773453648" transform="matrix(1.2238281949622158,0.25444950228979585,-0.25444950228979585,1.2238281949622158,395.0046400126127,-452.4978201388066)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-13" width="15.992902753630254" opacity="0.804883566306589" transform="matrix(0.9332744839284547,-0.3591639425778658,0.3591639425778658,0.9332744839284547,272.5220843989821,114.11939729726055)" fill="none" stroke="#2c2891"></use><use xlink:href="#bbburst-shape-10" width="41.740185745796836" opacity="0.28700207094482144" transform="matrix(1.0773515144741028,0.6338877773394569,-0.6338877773394569,1.0773515144741028,766.9805160322093,-334.811680228085)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-2" width="47.657823514011" opacity="0.17655812052818265" transform="matrix(1.0894857704811094,0.6127974836103552,-0.6127974836103552,1.0894857704811094,342.8447375227566,196.54190414007036)" fill="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-11" width="24.90532088964154" opacity="0.6504143973214698" transform="matrix(0.9856222165255609,-0.16896403845564376,0.16896403845564376,0.9856222165255609,393.4892790051705,-131.59988018675818)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-2" width="45.99441078572333" opacity="0.1367657467676191" transform="matrix(1.096431411457801,0.6002817338289199,-0.6002817338289199,1.096431411457801,850.5630095124641,256.44082581962675)" fill="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-2" width="34.24227410103252" opacity="0.21519407872286034" transform="matrix(1.2499396196143615,-0.012286061952677353,0.012286061952677353,1.2499396196143615,649.4373493888991,120.90222034872704)" fill="#2c2891" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-1" width="38.03257907999027" opacity="0.08895202134085467" transform="matrix(1.485582464739073,0.9249566154473304,-0.9249566154473304,1.485582464739073,1102.4123080705917,-406.5672367190395)" fill="#ff5c58" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-3" width="26.38103508287952" opacity="0.5278936687273026" transform="matrix(0.7897492468771591,0.6134298061367414,-0.6134298061367414,0.7897492468771591,635.7298163343563,-136.4990417172415)" fill="#ff5c58" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-8" width="29.12277195323335" opacity="0.15650344781092507" transform="matrix(1.2167959576439837,0.2861950339563223,-0.2861950339563223,1.2167959576439837,388.1989444935943,272.8318982372396)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-4" width="40.259369236880154" opacity="0.4161851593359617" transform="matrix(0.9939836683178576,-0.10952838498478495,0.10952838498478495,0.9939836683178576,138.7282555277454,-168.6477286566533)" fill="#ffbd9b" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-2" width="27.51905829057082" opacity="0.4740711610754349" transform="matrix(0.9010018471415862,-0.43381525036292795,0.43381525036292795,0.9010018471415862,296.5571021430586,-176.25168299222713)" fill="#00a19d" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-14" width="38.60357254169631" opacity="0.39999252538459573" transform="matrix(0.7910493984444107,-0.6117522776588052,0.6117522776588052,0.7910493984444107,365.5785808768294,243.90244261892462)" fill="none" stroke="#00a19d" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-11" width="10.374491668100994" opacity="0.9394604897290346" transform="matrix(0.7935670333963812,0.6084828374789766,-0.6084828374789766,0.7935670333963812,615.9815783092687,65.32111981700695)" fill="none" stroke="#00a19d"></use><use xlink:href="#bbburst-shape-10" width="36.7912621214008" opacity="0.08343632372047094" transform="matrix(1.5617651994714543,-0.7895501641567106,0.7895501641567106,1.5617651994714543,269.63271400883593,-562.6642568035356)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-10" width="26.55170862598971" opacity="0.5483068835471432" transform="matrix(0.9668733281907099,-0.25525666932211544,0.25525666932211544,0.9668733281907099,350.1350388910686,209.20318708271702)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-4" width="19.625577459666566" opacity="0.6592528278521783" transform="matrix(0.7993684449860308,-0.6008411513541787,0.6008411513541787,0.7993684449860308,173.98368474027146,-65.56463602106865)" fill="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-5" width="19.69341363188609" opacity="0.6520870046025656" transform="matrix(0.9235124980618123,0.38356833279564534,-0.38356833279564534,0.9235124980618123,409.8554173927716,106.98586972658092)" fill="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-2" width="43.02085203198011" opacity="0.07786845448882884" transform="matrix(1.4487234694020925,-0.9816823871311762,0.9816823871311762,1.4487234694020925,-243.8708898211824,-510.1458361431207)" fill="#2c2891" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-10" width="36.71126370296654" opacity="0.37765078219458226" transform="matrix(0.7590337467675452,-0.6510512815961751,0.6510512815961751,0.7590337467675452,-63.2397449725361,315.1069631931476)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-8" width="10.492363653909777" opacity="0.9278012817543483" transform="matrix(0.9133084901008474,-0.40726846417284807,0.40726846417284807,0.9133084901008474,261.5228682414201,22.61259577437562)" fill="none" stroke="#00a19d"></use><use xlink:href="#bbburst-shape-1" width="33.355510839363276" opacity="0.5462998494697839" transform="matrix(0.8893953239512808,0.4571388823252691,-0.4571388823252691,0.8893953239512808,385.8551614242333,-55.56984100436193)" fill="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-9" width="56.45568620043211" opacity="-0.06576770031461043" transform="matrix(1.4087224972202057,-1.0382682340443956,1.0382682340443956,1.4087224972202057,-398.8703985482508,-469.50999020216193)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-5" width="31.333423234428995" opacity="0.5597067780751612" transform="matrix(0.9997904645883428,-0.020470147000587108,0.020470147000587108,0.9997904645883428,267.71703944807336,166.232384852925)" fill="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-3" width="35.268778044095704" opacity="0.51220998424952" transform="matrix(0.7896608030489992,-0.613543654622888,0.613543654622888,0.7896608030489992,-71.48573217641226,151.80985429386982)" fill="#ff5c58" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-10" width="40.04781466345233" opacity="0.29962076150089834" transform="matrix(1.0926899568559991,0.6070656127520606,-0.6070656127520606,1.0926899568559991,460.5646387102198,-320.5439036597484)" fill="none" stroke="#ffbd9b" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-9" width="15.43540400007214" opacity="0.8478129297398109" transform="matrix(0.9976032271924725,0.06919393828337893,-0.06919393828337893,0.9976032271924725,366.5023471318437,43.095033990387776)" fill="none" stroke="#00a19d"></use><use xlink:href="#bbburst-shape-9" width="36.34650030808477" opacity="0.214273831731412" transform="matrix(1.2475314536225675,-0.07851924746432648,0.07851924746432648,1.2475314536225675,166.30733202394242,206.67810408873117)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-13" width="29.727334934049033" opacity="0.39381067568744965" transform="matrix(0.9883122298056156,-0.15244322358390358,0.15244322358390358,0.9883122298056156,262.4096763484743,-258.72289938325576)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-7" width="18.00897269935741" opacity="0.8683952276822706" transform="matrix(0.7727783289221172,0.6346760231396331,-0.6346760231396331,0.7727783289221172,681.4005794489187,37.01775252110866)" fill="#2c2891"></use><use xlink:href="#bbburst-shape-13" width="18.283774509114096" opacity="0.7278576960584455" transform="matrix(0.9975297332280927,0.07024550751393399,-0.07024550751393399,0.9975297332280927,486.66686089313384,102.40365019418243)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-8" width="27.541907719700188" opacity="0.4479353121523034" transform="matrix(0.942963540832032,-0.3328960207955582,0.3328960207955582,0.942963540832032,465.8740643573053,-102.08239543605816)" fill="none" stroke="#ff5c58" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-5" width="31.596929153886478" opacity="0.17216415399177043" transform="matrix(1.0895566958592915,0.6126713690945444,-0.6126713690945444,1.0895566958592915,699.3026859913639,-411.11235843666867)" fill="#ff5c58" filter="url(#bbburst-blur-3)"></use><use xlink:href="#bbburst-shape-3" width="15.367590576215452" opacity="0.761549320778961" transform="matrix(0.9543304142355454,0.2987531764935937,-0.2987531764935937,0.9543304142355454,497.8449928828632,122.30480017581817)" fill="#2c2891" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-5" width="12.913215388260713" opacity="0.9314734077180722" transform="matrix(0.9958792027422974,-0.09068965511769318,0.09068965511769318,0.9958792027422974,360.74493858283813,-28.409412831106295)" fill="#ffa6d5"></use><use xlink:href="#bbburst-shape-12" width="15.13826420318786" opacity="0.7963013360259638" transform="matrix(0.9932737087820489,-0.11579006625075179,0.11579006625075179,0.9932737087820489,254.70815759233102,9.74106220231954)" fill="none" stroke="#ffa6d5"></use><use xlink:href="#bbburst-shape-12" width="27.935794148596493" opacity="0.5109024138388506" transform="matrix(0.8498490758060817,-0.5270261363078199,0.5270261363078199,0.8498490758060817,-41.05260666725641,39.686618443140105)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-5" width="24.20479497327974" opacity="0.6753615997918958" transform="matrix(0.7865520856923343,0.6175239400161252,-0.6175239400161252,0.7865520856923343,495.1984526436722,44.82252462058102)" fill="#00a19d" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-10" width="22.875071671576688" opacity="0.658296653981874" transform="matrix(0.7138175175966738,0.7003317439414853,-0.7003317439414853,0.7138175175966738,637.8961851058992,256.40698369978423)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-11" width="18.764395941195115" opacity="0.8041881593889614" transform="matrix(0.7167825347732757,0.6972967788854312,-0.6972967788854312,0.7167825347732757,759.5186597414698,119.5362198769995)" fill="none" stroke="#00a19d"></use><use xlink:href="#bbburst-shape-2" width="18.2936373905066" opacity="0.726176761134046" transform="matrix(0.8847741344436626,-0.4660200972270055,0.4660200972270055,0.8847741344436626,326.6504551619753,27.85169298906652)" fill="#ff5c58" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-9" width="26.01639240719013" opacity="0.3523929006674016" transform="matrix(0.998140590284292,-0.06095376958749203,0.06095376958749203,0.998140590284292,654.0232658194886,-2.357040374872895)" fill="none" stroke="#ffbd9b" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-10" width="13.751250632441636" opacity="0.8857711893220956" transform="matrix(0.9991321751634851,-0.04165208942037478,0.04165208942037478,0.9991321751634851,427.43708713141217,7.309439683961102)" fill="none" stroke="#ffbd9b"></use><use xlink:href="#bbburst-shape-7" width="19.66618877176568" opacity="0.7781833742602632" transform="matrix(0.9424110087433716,0.3344570085964724,-0.3344570085964724,0.9424110087433716,556.1185176892607,-74.94404421376595)" fill="#2c2891"></use><use xlink:href="#bbburst-shape-3" width="15.309411903280246" opacity="0.8760419056832631" transform="matrix(0.7780303306821261,-0.6282267142828785,0.6282267142828785,0.7780303306821261,140.9137247608587,149.38573271515088)" fill="#2c2891"></use><use xlink:href="#bbburst-shape-14" width="35.34436196376064" opacity="0.3978994465311574" transform="matrix(0.9152531627344311,0.4028791979050555,-0.4028791979050555,0.9152531627344311,440.3541726305249,276.76145428927623)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-2)"></use><use xlink:href="#bbburst-shape-3" width="19.35367432372753" opacity="0.6977492617912988" transform="matrix(0.7868450640730063,-0.6171505854683658,0.6171505854683658,0.7868450640730063,34.40687215701843,12.761891817858839)" fill="#2c2891" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-3" width="23.27651094632167" opacity="0.6797064607505504" transform="matrix(0.9208357391354364,-0.38995069115324643,0.38995069115324643,0.9208357391354364,264.6522489654351,176.90189467664283)" fill="#ff5c58" filter="url(#bbburst-blur-1)"></use><use xlink:href="#bbburst-shape-13" width="52.07208854026545" opacity="-0.07070539151662647" transform="matrix(1.7421587066157393,-0.16547821899867873,0.16547821899867873,1.7421587066157393,631.6616831506662,-630.7172097841479)" fill="none" stroke="#2c2891" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-6" width="16.563007783175333" opacity="0.8218094859466974" transform="matrix(0.9953170559084112,0.09666415166861292,-0.09666415166861292,0.9953170559084112,504.0808536455787,-30.617240137892907)" fill="#ffa6d5"></use><use xlink:href="#bbburst-shape-11" width="55.005864245659204" opacity="-0.0674851837231305" transform="matrix(1.7433365091553497,-0.15257069130747042,0.15257069130747042,1.7433365091553497,630.7434002575995,45.14242744124715)" fill="none" stroke="#ffa6d5" filter="url(#bbburst-blur-4)"></use><use xlink:href="#bbburst-shape-1" width="31.06958032236401" opacity="0.1905235612372118" transform="matrix(1.1967109426804847,-0.3610857511295417,0.3610857511295417,1.1967109426804847,271.17175406070044,289.6299667567697)" fill="#ffa6d5" filter="url(#bbburst-blur-3)"></use></svg>
    <div class="topic_search_box r">
      <input
        id="topic_search"
        class="topic_search"
        v-model="search_text"
        @focus="search_focus_handle"
        @input="filter_search_handle"
        @keyup.enter="topic_search_handle"
        type="text"
        placeholder="在此键入搜索"
      />
      <label class="search_icon a" for="topic_search">
        <svg
          t="1709027338854"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9410"
          width="72"
          height="72"
        >
          <path
            d="M549.660444 56.888889a30.72 30.72 0 0 1 21.617778 8.988444l205.425778 205.482667c5.688889 5.688889 8.988444 13.425778 8.988444 21.560889v271.132444a244.337778 244.337778 0 0 0-316.245333 347.989334H144.327111A30.492444 30.492444 0 0 1 113.777778 881.493333V87.438222C113.777778 70.542222 127.431111 56.888889 144.327111 56.888889h405.333333zM387.811556 477.013333H212.195556a7.623111 7.623111 0 0 0-7.623112 7.68v45.795556c0 4.209778 3.413333 7.623111 7.623112 7.623111h175.616c4.209778 0 7.623111-3.413333 7.623111-7.623111V484.693333a7.623111 7.623111 0 0 0-7.623111-7.68z m190.862222-129.763555H212.195556a7.623111 7.623111 0 0 0-7.623112 7.623111v45.795555c0 4.209778 3.413333 7.623111 7.623112 7.623112h366.478222c4.209778 0 7.623111-3.413333 7.623111-7.623112v-45.795555a7.623111 7.623111 0 0 0-7.623111-7.623111z m-43.064889-219.932445v179.598223h179.655111L535.608889 127.317333z m372.394667 832.398223l-89.031112-89.031112a167.992889 167.992889 0 1 0-41.585777 38.912l90.339555 90.453334a7.395556 7.395556 0 0 0 5.347556 2.161778 7.68 7.68 0 0 0 5.347555-2.218667l29.582223-29.582222a7.566222 7.566222 0 0 0 0-10.695111z m-223.004445-83.512889a106.837333 106.837333 0 1 1 0-213.788445 106.837333 106.837333 0 1 1 0 213.788445z"
            fill="#98fb98"
            p-id="9411"
          ></path>
        </svg>
      </label>
      <div class="filter_search_box a" v-show="show_filter_search_box">
        <ul class="f f_d_c">
          <li
            v-for="item in current_filter_list"
            :key="item"

            @click="jump_to_topic(item.link)"
          >
            {{ item.title }}
          </li>
        </ul>
        <div class="query_time"><span class="query_text"></span></div>
      </div>
    </div>
    <div
      class="width_full f f_d_r justify_content_center gap_16 z_index_10"
    >
      <div class="topic_box">
        <div
          class="layout_box f f_d_r a_c r"
        >
          <div
            class="layout list_layout r"
            @click="config_store.change_g_list_layout(true)"
          >
            <svg
              t="1707409279938"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="13268"
              width="22"
              height="22"
            >
              <path
                d="M192 304a48 48 0 0 1 48-48h544a48 48 0 0 1 0 96H240a48 48 0 0 1-48-48z"
                fill="#e96969"
                p-id="13269"
              ></path>
              <path
                d="M192 528a48 48 0 0 1 48-48h192a48 48 0 0 1 0 96H240a48 48 0 0 1-48-48z m352 0a48 48 0 0 1 48-48h192a48 48 0 0 1 0 96H592a48 48 0 0 1-48-48z"
                fill="#e96969"
                p-id="13270"
              ></path>
              <path
                d="M192 752a48 48 0 0 1 48-48h544a48 48 0 0 1 0 96H240a48 48 0 0 1-48-48z"
                fill="#e96969"
                p-id="13271"
              ></path>
            </svg>
          </div>
          <div
            class="layout f a_c j_c_c grid_layout r"
            @click="config_store.change_g_list_layout(false)"
          >
            <svg
              t="1707408621772"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5142"
              width="22"
              height="22"
            >
              <path
                d="M450.56 563.2a10.24 10.24 0 0 1 10.16832 9.04192L460.8 573.44v245.76a10.24 10.24 0 0 1-9.04192 10.16832L450.56 829.44H204.8a10.24 10.24 0 0 1-10.16832-9.04192L194.56 819.2V573.44a10.24 10.24 0 0 1 9.04192-10.16832L204.8 563.2h245.76z m368.64 0a10.24 10.24 0 0 1 10.24 10.24v245.76a10.24 10.24 0 0 1-10.24 10.24H573.44a10.24 10.24 0 0 1-10.24-10.24V573.44a10.24 10.24 0 0 1 10.24-10.24z m-378.89024 20.48h-225.28v225.28h225.28V583.68z m368.64 0h-225.28v225.28h225.28V583.68zM450.56 194.56a10.24 10.24 0 0 1 10.24 10.24v245.76a10.24 10.24 0 0 1-10.24 10.24H204.8a10.24 10.24 0 0 1-10.24-10.24V204.8a10.24 10.24 0 0 1 10.24-10.24z m368.64 0a10.24 10.24 0 0 1 10.16832 9.04192L829.44 204.8v245.76a10.24 10.24 0 0 1-9.04192 10.16832L819.2 460.8H573.44a10.24 10.24 0 0 1-10.16832-9.04192L563.2 450.56V204.8a10.24 10.24 0 0 1 9.04192-10.16832L573.44 194.56h245.76z m-378.89024 20.48h-225.28v225.28h225.28V215.04z m368.64 0h-225.28v225.28h225.28V215.04z"
                fill="#e96969"
                p-id="5143"
              ></path>
            </svg>
          </div>
        </div>
       <div class="topic_list_box">
        <div
          v-show="list_layout"
          @click="jump_to_topic(item.link)"
          v-for="(item, ) in current_data"
          :key="item"

          class="topic_item  fade_out f f_d_c r"
        >
          <div class="item_inner_box f f_d_r">
            <img
              v-if="item.img != ''"
              class="item_img"
              :src="item.img"
              alt=""
            />
            <img
              v-else
              class="item_img"
              src="https://pic.imgdb.cn/item/65c5a15f9f345e8d03c1f6a4.jpg"
              alt=""
            />
            <div class="item_content f f_d_c">
              <span
                class="r title f f_d_r a_c"
                ><span class="item_classification r">{{
                  item.classification
                }}</span
                >{{ item.title }}</span
              >
              <span class="short_msg" v-html="item.short_message"></span>
              <div class="date f f_d_r justify_content_center">
                {{ user_store.name }} /
                {{ item.create_date.split("?")[1].replace(/^0+/, "") }}月{{
                  item.create_date.split("?")[2].replace(/^0+/, "")
                }}日 / {{ item.create_date.split("?")[0] }} /
                {{ item.create_date.split("?")[3] }}
              </div>
            </div>
          </div>
          <div class="a tag_box f f_d_r">
            <span class="tag" v-for="item in item.tags.split('?')" :key="item"
              >#{{ item }}</span
            >
          </div>
        </div>
       </div>
        <div class="topic_grid_box f f_d_r">
          <div
            class="topic_grid_inner_box margin_0_auto f f_d_r warp"
          >
            <div
              v-show="!list_layout"
              @click="jump_to_topic(item.link)"
              v-for="item in current_data"
              :key="item"
              class="topic_item_grid  r"
            >
              <div class="img_box r">
                <img v-if="item.img != ''" :src="item.img" alt="" />
                <img
                  v-else
                  src="https://pic.imgdb.cn/item/65c5a15f9f345e8d03c1f6a4.jpg"
                  alt=""
                />
              </div>
              <div class="topic_item_inner_grid f f_d_c">
                <div class="f f_d_r a_c">
                  <span class="classification_box">{{
                    item.classification
                  }}</span>
                  <span class="date r f f_d_r a_c"
                    >{{ item.create_date.split("?")[0] }}-{{
                      item.create_date.split("?")[1]
                    }}-{{ item.create_date.split("?")[2] }}</span
                  >
                </div>
                <span class="topic_title">{{ item.title }}</span>
                <span
                  class="topic_short_msg"
                  v-html="item.short_message"
                ></span>
                <div class="tags_box f f_d_r">
                  <span
                    v-for="tag in item.tags.split('?')"
                    class="tag_item"
                    :key="tag"
                    >#{{ tag }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          :current_page="page_data.current_index"
          :page_size="page_data.page_size"
          @current_change="page_handle"
          :total="page_data.total"
        >
        </Pagination>
        <!-- <Pagination
          @page_change="page_handle"
          class="pagination"
          :data="page_data"
        ></Pagination> -->
      </div>

      <!-- personal info -->
      <div
        v-show="show_personal_info"
        class="personal_box f f_d_c"
      >
        <div
          class="personal_item intro f r f_d_c a_c"
        >
          <!-- <img
            class="avatar_bg a"
            src="https://pic.imgdb.cn/item/65a9840f871b83018a77d214.jpg"
            alt=""
          /> -->
          <div
            class="avatar_bg a"
          >
          </div>
          <img :src="user_store.avatar" class="z_index_10" alt="" />
          <span
            class="personal_name z_index_10"
            v-text="user_store.name"
          ></span>
          <span class="personal_signature" v-text="user_store.signature"></span>
          <div class="width_full f f_d_r">
            <div
              class="topic_classification_total_box f f_d_c a_c"
            >
              <h3>文章</h3>
              <span v-text="topic_store.length()"></span>
            </div>
            <div
              class="topic_classification_total_box f f_d_c a_c"
            >
              <h3>分类</h3>
              <span v-text="personal_info.classification_total"></span>
            </div>
          </div>
        </div>

        <div
          class="personal_item new_topic_box f f_d_c a_c"
        >
          <h3 class="l_title r">最新文章</h3>
          <ul class="f f_d_c">
            <li
              @click="$router.push(item.link)"
              v-for="item in personal_info.new_topic"
              class="f f_d_c"
              :key="item.link"
            >
              <span> {{ item.title }} </span>
              <span class="new_topic_date">
                {{ item.create_date.split("?")[0] }}-{{
                  item.create_date.split("?")[1]
                }}-{{ item.create_date.split("?")[2] }}
              </span>
            </li>
          </ul>
        </div>
        <div
          class="personal_item classification_box f f_d_c a_c"
        >
          <h3 class="l_title r">分类</h3>
          <ul class="f f_d_c">
            <li
              v-for="classification in topic_store.classification"
              :key="classification"
              @click="classification_handle(classification)"
              class="f f_d_r"
            >
              <span>{{ classification }}</span>
            </li>
          </ul>
        </div>
        <div
          class="personal_item site_info_box f f_d_c a_c"
        >
          <h3 class="l_title r">网站信息</h3>
          <ul class="f f_d_c">
            <li>
              <span>网站名称: Tiny Flowers</span>
            </li>
            <li>
              <span
                >存活时间: {{ personal_info.site_info.run_time.value }}</span
              >
            </li>
            <li>
              <span
                >上次更新时间: {{ personal_info.site_info.last_update }}</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Utils></Utils>
  <div
      class="topic_list_foot r f f_d_r a_c justify_content_center"
    >
      <div class="left_foot f f_d_c  justify_content_center">
        <span class="title_foot">人生格言</span>
        <span class="text_foot" v-html="user_store.aphorism"></span>
      </div>
      <div class="mid_foot f f_d_c">
        <span class="title_foot"></span>
      </div>
      <div class="right_foot f f_d_c justify_content_center">
        <span class="title_foot">联系我</span>
        <span class="text_foot">邮箱: {{user_store.e_mail}}</span>
        <span class="text_foot">GitHub Account: {{user_store.github_account}}</span>
        <span class="text_foot">小红书ID: {{user_store.red_book_ID}}</span>
      </div>
    </div>
</template>
<style lang="scss" scoped>

#topic_list_main {
  @font-face {
  font-family: "misans";
  src: url("/src/assets/font/misans.ttf");
}
  background: $fill_body;
  font-family: "misans";
  width: max(1440px,100vw);
  min-height: 100vh;
  color: $text;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    opacity: 0.08;
    top: 0;
    height: 100%;

    background: url("https://pic.imgdb.cn/item/65d765569f345e8d03dac4f9.png")
      repeat;
    background-size: contain;
  }
  li {
    list-style: none;
    padding: 0 0;
  }
  .l_title {
    font-size: 1em;
    align-self: flex-start;
    margin-left: 18px;
    color: $primary_mix_1;
    &::after {
      content: "";
      position: absolute;
      width: 4px;
      height: 100%;
      background: $primary_mix_3;
      left: -8px;
      bottom: 0;
      opacity: 0.6;
    }
  }
  .topic_list_main_bg {
    position: fixed;
    width: max(1440px,100vw);
    height: 100vh;
    object-fit: cover;
    left: 0;
    top: 0;
    opacity: 0.7;
  }
  .topic_search_box {
    z-index: 11;
    scrollbar-color: rgba(144, 147, 153, 0.3) transparent; /* 滑块颜色  滚动条背景颜色 */
    scrollbar-width: thin;
    animation: search_item 2s cubic-bezier(0.075, 0.82, 0.165, 1);
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    &::-webkit-scrollbar-button {
      display: none;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(144, 147, 153, 0.3);
      cursor: pointer;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-corner {
      display: none;
    }
    &::-webkit-resizer {
      display: none;
    }

    width: 550px;
    height: 36px;
    margin: 16px auto;
    margin-top: 90px;
    
    .filter_search_box {
      width: 550px;
      max-height: 226px;

      background: $fill;
      bottom: 0;
      transform: translateY(120%);
      box-shadow: $fill_shadow 2px 3px 10px;
      border-radius: 10px;
      overflow-y: scroll;
      .query_time {
        margin-left: 32px;
        margin-bottom: 16px;
        color: $primary;
        font-size: 0.7em;
      }
      ul {
        margin-left: 32px;
        padding: 0;
        gap: 16px;
        li {
          word-wrap: break-word;
          color: $text_secondary;
          font-size: 1.1em;
          &:hover {
            color: $primary;
          }
        }
      }
    }

    .search_icon {
      width: 72px;
      right: 0;
      bottom: -4px;
      z-index: 11;
      transform: translateX(48px) rotate(15deg);
      svg {
        path {
          fill: $primary_mix_3;
        }
      }
    }
    .topic_search {
      width: inherit;
      height: inherit;
      
      border-radius: 10px;
      background: $fill;
      padding-left: 16px;
      border: none;
      outline: none;
      color: $primary;
      font-size: 1.1em;
      box-shadow: $primary 0 0 0 1px;

      caret-color: $primary;
      transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);
      &:hover {
        box-shadow: $primary 0px 6px 5px;
      }
      &:focus {
        box-shadow: $primary 0px 6px 5px;
      }
      &::placeholder{
        color: $text_placeholder;
      }
    }
  }
  .topic_box {
    width: 866px;
    padding-bottom: 32px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .layout_box {
      transform: translateY(-8px);
      gap: 4px;
      z-index: 10;

      .list_layout {
        svg {
          path {
            fill: $primary_mix_6;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }
        &::after {
          content: "列表";
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          color: #868484;

          font-size: 11px;
          background: #ffff;
          box-shadow: $fill_shadow 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .grid_layout {
        svg {
          path {
            fill: $primary_mix_6;
          }
        }
        &:hover {
          &::after {
            opacity: 1;
            transform: translateX(-50%) translateY(130%);
          }
        }
        &::after {
          content: "网格";
          position: absolute;
          bottom: 0%;
          left: 50%;
          transform: translateX(-50%) translateY(100%);
          width: 100%;
          opacity: 0;
          color: #868484;

          font-size: 11px;
          background: #fff;
          box-shadow: #86848466 2px 1px 5px;
          border-radius: 5px;
          padding: 8px 4px;
          transition: 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
      }
      .layout {
        
        border-radius: 5px;
        &:hover {
          background: $primary_mix_9;
        }
      }
    }
    .layout_active {
      background: $primary_mix_9;
    }
   
    .topic_item {
      width: 100%;
      height: 200px;
      background: $fill;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      margin: 0 0 16px 0;
      border-radius: 10px;
      box-shadow: 0px 13px 15px $fill_shadow;
      overflow-y: hidden;
     
      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 3px 5px #1f2d3d33;
        .tag_box {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .item_inner_box {
        width: 834px;
        height: 168px;
        padding: 16px;
        .item_img {
          max-width: 250px;
          height: 168px;
          border-radius: 10px;
          object-fit: cover;
          margin-right: 16px;
        }
        .item_content {
          .item_classification {
            font-size: 14px;
            padding: 4px 4px;
            border-radius: 5px;
            margin-right: 8px;
            color: $fill_primary;
            background: $primary_mix_2;
          }
        }
      }
      .title {
        font-size: 1.2em;
        font-weight: 600;
        margin-top: 10px;
        color: $text_title;
        cursor: pointer;
        &:hover{
          color: $primary;
        }
      }
      .short_msg {
        margin-top: 20px;
        line-height: 25px;
        font-size: 0.9em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .date {
        font-size: 0.6em;
        letter-spacing: 0.1em;
        margin-top: auto;
        align-self: flex-start;
      }
      .tag_box {
        bottom: 0;
        opacity: 0;
        transform: translateY(100%);
        width: 100%;
        background: $primary_mix_8;
        flex-wrap: wrap;
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        .tag {
          margin: 4px;
          color: $fill_primary;
          padding: 10px;
          background: $primary;
          border-radius: 5px;
        }
      }
    }

    .topic_grid_box {
      width: 100%;
      flex-wrap: wrap;
      margin-bottom: 128px;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      .topic_grid_inner_box {
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
        width: 100%;
        gap: 16px;

      }
      .topic_item_grid {
        width: 32%;
        border-radius: 10px;
        height: 370px;
        background: $fill;
        box-shadow: 0 13px 15px rgba(31, 45, 61, 0.15);
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 3px 5px rgba(31, 45, 61, 0.2);
        }
        .img_box {
          width: 100%;
          height: 210px;

          img {
            width: inherit;
            height: inherit;
            object-fit: cover;
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
          }
        }
        .topic_item_inner_grid {
          width: calc(100% - 32px);
          height: 128px;
          margin: 16px;
          .classification_box {
            background: $primary_mix_2;
            font-size: 0.6em;
            color: $fill_primary;
            padding: 5px 7px;
            font-weight: bold;
            border-radius: 10px;
          }
          .date {
            height: 24px;
            font-size: 0.7em;
            font-weight: 500;
            margin-left: 16px;
            &::after {
              content: "";
              position: absolute;
              width: 2px;
              height: 16px;
              background: $primary_mix_4;
              top: 4px;
              left: -8px;
            }
          }
          .topic_title {
            margin: 8px 0;
            display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color: $text_title;
                    cursor: pointer;
            &:hover {
              color: $primary;
            }
          }
          .topic_short_msg {
            font-size: 0.8em;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: $text_subtitle;
          }
          .tags_box {
            margin-top: auto;
            gap: 0;
            height: 30px;
            overflow: hidden;

            .tag_item {
              font-size: 1em;
              transform: scale(0.8);
              flex-shrink: 0;

              background: $primary_mix_9;
              color: $primary;
              padding: 4px 8px;

              border-radius: 100px;
              &:hover {
                color: $fill_primary;
                background: $primary;
              }
            }
          }
        }
      }
    }

    .pagination {
      align-self: center;
      margin-top: 128px;
    }
  }
}

//personal info
.personal_box {
  width: 288px;
  .personal_item {
    width: 288px;
    background-color: $fill;
    animation: move_left 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border-radius: 10px;
    box-shadow: $fill_shadow 2px 3px 10px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    padding-bottom: 32px;
    margin-bottom: 16px;
  }
  .intro {
    .avatar_bg {
      top: 0;
      margin: 0;
      object-fit: cover;
      border-radius: 10px;
      background:linear-gradient( $primary_mix_8,$fill);
      z-index: 0;
      width: 288px;
      height: 152px;
      pointer-events: none;
      opacity: 0.9;
      border: none;
    }
    img {
      width: 118px;
      height: 118px;
      border-radius: 50%;
      margin: 74px auto 0 16px;
      border: $fill_shadow 1px solid;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: rotate(360deg);
        transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      }
    }
    .personal_name {
      font-size: 1.4em;
      font-weight: 900;
      color: $text;
      transform: translateY(-32px);
      margin-left: auto;
      margin-right: 32px;
    }
    .personal_signature {
      margin: 0 0 32px 0;
      font-size: 0.9em;
      color: $text;
    }
    .topic_classification_total_box {
      width: 50%;
      h3 {
        color: $primary;
        margin: 0;
        font-size: 1.2em;
      }
      span {
        color: $text;

        font-size: 1.2em;
        margin-top: 16px;
        font-weight: 900;
      }
    }
  }
  .new_topic_box {
    ul {
      width: calc(100% - 32px);
      padding: 0;
      margin: 0;

      gap: 8px;
      color: $text_subtitle;
      li {
        span {
          margin: 4px;
          font-size: 0.9em;
          font-weight: 900;
          cursor: pointer;
        }
        &:hover {
          color: $primary;
        }
      }
    }
    .new_topic_date {
      font-size: 0.5em;
      color: #959596;
    }
  }
  .classification_box {
    ul {
      width: calc(100% - 32px);
      padding: 0;
      margin: 0;
      li {
        width: 100%;
        span {
          font-size: 0.9em;
          padding: 8px;
          padding-left: 4px;
          font-weight: 900;
          color: $text_subtitle;
          // &:last-child {
          //   margin-left: auto;
          // }
          transition: margin 2s cubic-bezier(0.075, 0.82, 0.165, 1);
        }
        &:hover {
          background: $primary_mix_2;
          border-radius: 5px;
          span {
            margin-left: 16px;
            color: $fill_primary;

          
          }
        }
      }
    }
  }
  .site_info_box {
    ul {
      width: calc(100% - 32px);
      padding: 0;
      gap: 16px;
      margin: 0;

      li {
        span {
          margin: 4px 0;
          font-size: 0.9em;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: $text_title;
        }
      }
    }
  }
}
.topic_list_foot {
  width: max(1440px,100vw);
  background: $fill_body;
  color: $primary;
    z-index: 10;
    height: 200px;
    gap: 16px;
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
  .topic_list_box{
    transition: all 2s cubic-bezier(0.075, 0.82, 0.165, 1);

  }
@keyframes move_left {
  0% {
    transform: translateX(100px) scale(1);
  }
  100% {
    transform: translateX(0px) scale(1);
  }
}
@keyframes fade_in {
  0% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0px);
  }
}
@keyframes search_item {
  0% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
  }
}
.fade_in{
  opacity: 1;
  transform: translate(0);
}
.fade_out{
  opacity: 0;
  transform: translateY(48px);
}
</style>
