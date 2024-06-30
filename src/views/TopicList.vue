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
const { query } = useRoute();
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
  if(document.querySelector('#topic_list_main').getBoundingClientRect().width < 600){
    list_layout.value = false
  }
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
  topic_store.select_all(params.classification,query.search);
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
    router.push({path:`/article/list/${params.classification}/${index}`,query:{
      search:query.search
    }});
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
    router.push({ path: "/article/list/all/1", query: { search: search_text.value } });
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
    <svg class="fixed topic_list_main_bg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="gggyrate-grad"><stop stop-color="hsl(184, 74%, 44%)" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(332, 87%, 70%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><g stroke-width="5" stroke="url(#gggyrate-grad)" fill="none"><path d="M351.42730830673486 -424.98613735655886C371.32379592777625 -465.1991269781117 428.67608200191125 -465.1991269781117 448.57256962295264 -424.98613735655886L1241.309064320474 1176.9148338161567C1259.1325777460647 1212.934454068481 1232.929100007492 1255.1458992052558 1192.7364336623652 1255.1458992052558H-392.73655573267774C-432.9292220778045 1255.1458992052558 -459.132699816377 1212.934454068481 -441.30918639078664 1176.9148338161567L351.42730830673486 -424.98613735655886Z " transform="rotate(44, 400, 400)" opacity="0.05"></path><path d="M353.63527722514345 -387.4867230875107C372.6273790452283 -425.8718495444475 427.3727430250842 -425.8718495444475 446.36484484516905 -387.4867230875107L1203.067862510985 1141.6005675773542C1220.0812162354127 1175.9829323636638 1195.0688056667752 1216.275675448767 1156.7030787009721 1216.275675448767H-356.70295663065974C-395.06868359646256 1216.275675448767 -420.0810941650999 1175.9829323636638 -403.06774044067276 1141.6005675773542L353.63527722514345 -387.4867230875107Z " transform="rotate(42, 400, 400)" opacity="0.10"></path><path d="M355.8430020029266 -349.9873851124079C373.9307180220551 -386.54464840472866 426.0691599076324 -386.54464840472866 444.1568759267609 -349.9873851124079L1164.826416560871 1106.2862250446065C1181.0296105841358 1139.031334364901 1157.2082671854332 1177.4053753983328 1120.6694795989542 1177.4053753983328H-320.66960166926674C-357.2083892557456 1177.4053753983328 -381.0297326544478 1139.031334364901 -364.8265386311839 1106.2862250446065L355.8430020029266 -349.9873851124079Z " transform="rotate(40, 400, 400)" opacity="0.14"></path><path d="M358.05084885102247 -312.48797084335973C375.2341790691944 -347.2173709710645 424.7656988604931 -347.2173709710645 441.94902907866503 -312.48797084335973L1126.5850926810695 1070.9719588058038C1141.978127003171 1102.079812660084 1119.3478507744037 1138.5351516418439 1084.6360025672489 1138.5351516418439H-284.6361246375612C-319.34797284471614 1138.5351516418439 -341.97824907348325 1102.079812660084 -326.58521475138247 1070.9719588058038L358.05084885102247 -312.48797084335973Z " transform="rotate(38, 400, 400)" opacity="0.19"></path><path d="M360.25872621669646 -274.98863286825696C376.53767063391206 -307.89016983134564 423.4622683309317 -307.89016983134564 439.7412127481473 -274.98863286825696L1088.3437993188465 1035.657616273056C1102.9266739397847 1065.128214661321 1081.4874648809523 1099.6648515914096 1048.6025560531214 1099.6648515914096H-248.60261708827755C-281.48752591610855 1099.6648515914096 -302.92673497494053 1065.128214661321 -288.34386035400297 1035.657616273056L360.25872621669646 -274.98863286825696Z " transform="rotate(36, 400, 400)" opacity="0.23"></path><path d="M362.4665425472141 -237.48929489315412C377.84110116347335 -268.5629686916268 422.15877676621415 -268.5629686916268 437.5333353824734 -237.48929489315412L1050.102444921467 1000.343273740308C1063.8751598412418 1028.1766166625584 1043.6270179523447 1060.7945515409754 1012.5690485038376 1060.7945515409754H-212.56917057415012C-243.62714002265722 1060.7945515409754 -263.8752819115541 1028.1766166625584 -250.10256699177972 1000.343273740308L362.4665425472141 -237.48929489315412Z " transform="rotate(34, 400, 400)" opacity="0.28"></path><path d="M364.67438939530996 -199.9899569180513C379.1445622106128 -229.2357675519079 420.8553157190747 -229.2357675519079 435.32548853437754 -199.9899569180513L1011.8611210416655 965.0289312075602C1024.8236762602771 991.2250186637957 1005.7666015413151 1021.9242514905411 976.535571472132 1021.9242514905411H-176.53569354244462C-205.76672361162775 1021.9242514905411 -224.8237983305895 991.2250186637957 -211.86124311197835 965.0289312075602L364.67438939530996 -199.9899569180513Z " transform="rotate(32, 400, 400)" opacity="0.32"></path><path d="M366.88226676098407 -162.490496872636C380.44805377533044 -189.90844434187656 419.5518851895133 -189.90844434187656 433.1176722038597 -162.490496872636L973.6198276794423 929.7147107451249C985.7722231968908 954.2735427353459 967.906215647864 983.0540735104196 940.5021249580047 983.0540735104196H-140.502185993161C-167.9062766830201 983.0540735104196 -185.7722842320468 954.2735427353459 -173.61988871459886 929.7147107451249L366.88226676098407 -162.490496872636Z " transform="rotate(30, 400, 400)" opacity="0.37"></path><path d="M369.0901136090798 -124.99115889753318C381.75151482246974 -150.5812432021577 418.248424142374 -150.5812432021577 430.9098253557638 -124.99115889753318L935.3785037996411 894.4003682123769C946.7207396159263 917.3219447365832 930.0457992368345 944.1837734599853 904.4686479262994 944.1837734599853H-104.46870896145543C-130.04586027199065 944.1837734599853 -146.72080065108224 917.3219447365832 -135.37856483479743 894.4003682123769L369.0901136090798 -124.99115889753318Z " transform="rotate(28, 400, 400)" opacity="0.41"></path><path d="M371.2979604571758 -87.49177514606316C383.0549758696093 -111.25399628607167 416.9449630952346 -111.25399628607167 428.70197850766806 -87.49177514606316L897.1371799198396 859.0860714559963C907.6692560349616 880.3703925141876 892.1853828258049 905.3135191859183 868.4351708945937 905.3135191859183H-68.43523192974993C-92.18544386096119 905.3135191859183 -107.66931707011764 880.3703925141876 -97.13724095499606 859.0860714559963L371.2979604571758 -87.49177514606316Z " transform="rotate(26, 400, 400)" opacity="0.46"></path><path d="M373.50580730527156 -49.99245242974942C384.3584369167486 -71.92681040514188 415.64150204809516 -71.92681040514188 426.4941316595722 -49.99245242974942L858.8958560400383 823.7717136644592C868.6177724539971 843.4187792566358 854.3249664147754 866.443203876695 832.4016938628881 866.443203876695H-32.40175489804443C-54.325027449931724 866.443203876695 -68.61783348915304 843.4187792566358 -58.89591707519469 823.7717136644592L373.50580730527156 -49.99245242974942Z " transform="rotate(24, 400, 400)" opacity="0.50"></path><path d="M375.71365415336743 -12.493038160701303C385.6618979638881 -32.599532971477714 414.3380410009556 -32.599532971477714 424.2862848114763 -12.493038160701303L820.6545321602371 788.4574474256565C829.5662888730324 806.4672575518186 816.4645500037459 827.572980120206 796.3682168311825 827.572980120206H3.6317221336611283C-16.464611038902262 827.572980120206 -29.5663499081885 806.4672575518186 -20.654593195393318 788.4574474256565L375.71365415336743 -12.493038160701303Z " transform="rotate(22, 400, 400)" opacity="0.55"></path><path d="M377.9215010014633 25.006284555612467C386.96535901102754 6.727652909452075 413.0345799538162 6.727652909452075 422.07843796338045 25.006284555612467L782.4132082804354 753.1430896341196C790.5148052920679 769.515644294267 778.6041335927166 788.7026648109828 760.3347397994771 788.7026648109828H39.66519916536663C21.3958053721272 788.7026648109828 9.4851336727761 769.515644294267 17.586730684408053 753.1430896341196L377.9215010014633 25.006284555612467Z " transform="rotate(20, 400, 400)" opacity="0.59"></path><path d="M380.12934784955917 62.50568356587152C388.26882005816697 46.05491508432718 411.7311189066768 46.05491508432718 419.8705911152846 62.50568356587152L744.1718844006342 717.828808136528C751.4633217111033 732.5641073306605 740.7437171816871 749.8324257957048 724.3012627677716 749.8324257957048H75.69867619707219C59.25622178315666 749.8324257957048 48.536617253740644 732.5641073306605 55.828054564209424 717.828808136528L380.12934784955917 62.50568356587152Z " transform="rotate(18, 400, 400)" opacity="0.64"></path><path d="M382.33722521523305 100.00502154097435C389.5723116228845 85.38211622404603 410.4276883771155 85.38211622404603 417.66277478476695 100.00502154097435L705.9305910384109 682.5144656037801C712.4118686477167 695.6125093318979 702.8833312882357 710.9621257452706 688.2678162536441 710.9621257452706H111.73218374635582C97.11666871176425 710.9621257452706 87.58813135228337 695.6125093318979 94.06940896158898 682.5144656037801L382.33722521523305 100.00502154097435Z " transform="rotate(16, 400, 400)" opacity="0.68"></path><path d="M384.5450720633289 137.5044205512334C390.87577267002393 124.70937839892113 409.12422732997607 124.70937839892113 415.45492793667097 137.5044205512334L667.6892671586096 647.2001841061884C673.3603850667522 658.6609723682916 665.0229148772063 672.0918867299927 652.2343392219387 672.0918867299927H147.76566077806132C134.9770851227937 672.0918867299927 126.63961493324797 658.6609723682916 132.31073284139035 647.2001841061884L384.5450720633289 137.5044205512334Z " transform="rotate(14, 400, 400)" opacity="0.73"></path><path d="M386.7529036526358 175.0037737851253C392.1792184583743 164.03659479742905 407.8207510240476 164.03659479742905 413.24706582978615 175.0037737851253L629.4479280200192 611.8858568322296C634.3088862269985 621.7093896283179 627.1624832073877 633.2216019383475 616.2008469314441 633.2216019383475H183.7991225509778C172.8374862750341 633.2216019383475 165.69108325542345 621.7093896283179 170.55204146240266 611.8858568322296L386.7529036526358 175.0037737851253Z " transform="rotate(12, 400, 400)" opacity="0.77"></path><path d="M388.9607657595207 212.50314227780623C393.48269476430283 203.36382645472605 406.51730523569717 203.36382645472605 411.0392342404793 212.50314227780623L591.2066193990067 576.5715448170598C595.257417904823 584.7578221471335 589.3020820551474 594.3513324054913 580.1673851585276 594.3513324054913H219.83261484147238C210.6979179448527 594.3513324054913 204.7425820951771 584.7578221471335 208.7933806009931 576.5715448170598L388.9607657595207 212.50314227780623Z " transform="rotate(10, 400, 400)" opacity="0.82"></path><path d="M391.1686126076165 250.00251077048716C394.78615581144226 242.69105811202303 405.21384418855774 242.69105811202303 408.8313873923835 250.00251077048716L552.9652955192055 541.25723280189C556.2059343238584 547.8062546659489 551.4416656441178 555.4810628726352 544.133908126822 555.4810628726352H255.86609187317788C248.55833435588215 555.4810628726352 243.7940656761417 547.8062546659489 247.03470448079446 541.25723280189L391.1686126076165 250.00251077048716Z " transform="rotate(8, 400, 400)" opacity="0.86"></path><path d="M393.3764594557124 287.50188689256265C396.0896168585817 282.01829739871454 403.9103831414183 282.01829739871454 406.6235405442876 287.50188689256265L514.7239716394041 505.9429284161148C517.1544507428938 510.85469481415896 513.5812492330883 516.6108009691737 508.10043109511656 516.6108009691737H291.89956890488344C286.4187507669116 516.6108009691737 282.84554925710626 510.85469481415896 285.27602836059583 505.9429284161148L393.3764594557124 287.50188689256265Z " transform="rotate(6, 400, 400)" opacity="0.91"></path><path d="M395.58430630380826 325.0012630146381C397.39307790572116 321.34553668540605 402.60692209427884 321.34553668540605 404.41569369619174 325.0012630146381L476.48264775960274 470.62862403033955C478.1029671619292 473.903134962369 475.7208328220589 477.74053906571214 472.066954063411 477.74053906571214H327.93304593658894C324.2791671779411 477.74053906571214 321.89703283807086 473.903134962369 323.51735224039726 470.62862403033955L395.58430630380826 325.0012630146381Z " transform="rotate(4, 400, 400)" opacity="0.95"></path><path d="M397.79215315190413 362.5006315073191C398.6965389528606 360.672768342703 401.3034610471394 360.672768342703 402.20784684809587 362.5006315073191L438.24132387980137 435.3143120151698C439.0514835809646 436.9515674811845 437.86041641102946 438.87026953285607 436.0334770317055 438.87026953285607H363.9665229682945C362.13958358897054 438.87026953285607 360.9485164190354 436.9515674811845 361.75867612019863 435.3143120151698L397.79215315190413 362.5006315073191Z " transform="rotate(2, 400, 400)" opacity="1.00"></path></g></svg>
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
              @click="jump_to_topic(item.link)"
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
            <span 
            @click="router.push(`/article/list/all/1?search=${tag}`)"
            class="tag" v-for="tag in item.tags.split('?')" :key="item"
              >#{{ tag }}</span
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
                <span               @click="jump_to_topic(item.link)"
                class="topic_title">{{ item.title }}</span>
                <span
                  class="topic_short_msg"
                  v-html="item.short_message"
                ></span>
                <div class="tags_box f f_d_r">
                  <span
                    v-for="tag in item.tags.split('?')"
                    class="tag_item"
                    @click="router.push(`/article/list/all/1?search=${tag}`)"
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

  background: $fill_body;
  font-family: "misans";
  width: max(1440px,100vw);
  min-height: 100vh;
  color: $text;
  .topic_list_main_bg{
    width: 100vw;
    height: 100vh;
    opacity: .2;
  stop:first-child{
    stop-color: $primary;
  }
  stop:last-child{
    stop-color: $primary_mix_6;
  }
  }
  li {
    list-style: none;
    padding: 0 0;
  }
  .l_title {
    font-size: 16px;
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
      color: $text_secondary;
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
        font-size: 12px;
      }
      ul {
        margin-left: 32px;
        padding: 0;
        gap: 16px;
        li {
          word-wrap: break-word;
          color: $text_secondary;
          font-size: 16px;
          cursor: pointer;
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
      font-size: 16px;
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
            font-size: 12px;
            padding: 4px 4px;
            border-radius: 5px;
            margin-right: 8px;
            color: $fill_primary;
            background: $primary_mix_2;
          }
        }
      }
      .title {
        font-size: 18px;
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
        font-size: 16px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .date {
        font-size: 12px;
        letter-spacing: 1px;
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
          cursor: pointer;
          &:hover{
            color: $fill_primary;
            background: $primary_mix_2;

          }
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
        box-shadow: 0 13px 15px $fill_shadow;
        transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

        &:hover {
          transform: translateY(-8px);
          box-shadow: 0 3px 5px $fill_shadow;
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
            font-size: 12px;
            color: $fill_primary;
            padding: 4px 7px;
            font-weight: bold;
            border-radius: 10px;
          }
          .date {
            height: 24px;
            font-size: 12px;
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
            font-weight: 900;
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
            font-size: 12px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: $text;
          }
          .tags_box {
            margin-top: auto;
            gap: 2px;
            height: 22px;
            overflow: scroll;
            &::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
            .tag_item {
              font-size: 12px;
              transform: scale(1);
              flex-shrink: 0;
              line-height: 18px;
              cursor: pointer;
              background: $primary_mix_9;
              color: $primary;
              padding: 2px 8px;

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
      font-size: 22px;
      font-weight: 900;
      color: $text;
      transform: translateY(-32px);
      margin-left: auto;
      margin-right: 32px;
    }
    .personal_signature {
      margin: 0 0 32px 0;
      font-size: 14px;
      color: $text;
    }
    .topic_classification_total_box {
      width: 50%;
      h3 {
        color: $primary;
        margin: 0;
        font-size: 18px;
      }
      span {
        color: $text;

        font-size: 18px;
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
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
        }
        &:hover {
          color: $primary;
        }
      }
    }
    .new_topic_date {
      font-size: 12px;
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
          font-size: 14px;
          padding: 8px;
          padding-left: 4px;
          font-weight: 900;
          color: $text_subtitle;
          cursor:default;
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
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 2px;
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
@media (max-width: 600px) {
  #topic_list_main {

background: $fill_body;
font-family: "misans";
width: 100vw;
min-height: 100vh;
color: $text;
.topic_list_main_bg{
  width: 100vw;
  height: 100vh;
  opacity: .2;
stop:first-child{
  stop-color: $primary;
}
stop:last-child{
  stop-color: $primary_mix_6;
}
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

  width: calc(100vw - 20px);
  height: 38px;
  margin: 16px auto;
  margin-top: 90px;
  .filter_search_box {
    width: calc(100vw - 40px);
    max-height: 226px;
    color: $text_secondary;
    background: $fill;
    bottom: 0;
    transform: translate(10px,120%);
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
      margin-left: 16px;
      padding: 0;
      gap: 8px;
      li {
        word-wrap: break-word;
        color: $text_secondary;
        font-size: 12px;
        cursor: pointer;
        &:hover {
          color: $primary;
        }
      }
    }
  }

  .search_icon {
    width: 18px;
    right: 0;
    bottom: -4px;
    z-index: 11;
    transform: translateX(0px) rotate(15deg);
    svg {
      display: none;
      path {
        fill: $primary_mix_3;
      }
    }
  }
  .topic_search {
    width: calc(100vw - 104px);
    height: inherit;
    
    border-radius: 10px;
    background: $fill;
    padding: 0 32px;
    border: none;
    outline: none;
    color: $primary;
    font-size: 1.1em;
    box-shadow: $primary 0 0 0 1px;
    transform: translateX(8px);
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
  width: calc(100vw - 20px);
  padding-bottom: 8px;
  
  background: $fill;
  transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  .layout_box {
    transform: translateY(-8px);
    gap: 4px;
    z-index: 10;
    display: none;
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
    display: none;
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
    width: calc(100vw - 20px);
    margin-left: 10px;
    flex-wrap: wrap;
    margin-bottom: 16px;
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    .topic_grid_inner_box {
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      width: 100%;
      gap: 8px;

    }
    .topic_item_grid {
      width: calc((100vw - 28px)/2);
      border-radius: 10px;
      height: 300px;
      background: $fill;
      box-shadow: 0 13px 15px $fill_shadow;
      transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);

      &:hover {
        transform: translateY(-8px);
        box-shadow: 0 3px 5px $fill_shadow;
      }
      .img_box {
        width: 100%;
        height: 170px;

        img {
          width: inherit;
          height: inherit;
          object-fit: cover;
          border-top-right-radius: 5px;
          border-top-left-radius: 5px;
        }
      }
      .topic_item_inner_grid {
        width: calc(100% - 16px);
        height: 114px;
        margin: 8px;
        .classification_box {
          background: $primary_mix_2;
          font-size: 12px;
          color: $fill_primary;
          padding: 4px 7px;
          font-weight: bold;
          border-radius: 10px;
        }
        .date {
          height: 24px;
          font-size: 12px;
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
          font-size: 14px;
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
          font-size: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          color: $text;
        }
        .tags_box {
          margin-top: auto;
          gap: 2px;
          height: 30px;
          overflow: scroll;

          .tag_item {
            font-size: 12px;
            transform: scale(1);
            flex-shrink: 0;
            line-height: 23.6px;
            background: $primary_mix_9;
            color: $primary;
            padding: 2px 4px;

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
  display: none;
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
        cursor:default;
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
.topic_list_foot {
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
