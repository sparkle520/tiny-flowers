<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import TopicTitle from "/src/component/TopicTitle.vue";
import { change_theme } from "/src/assets/js/topic.js";
import emitter from "@/assets/config/mitt_bus.js";

import { useConfigStore } from "../store/config";
import { useTopicStore } from "../store/topic";
import { change_layout } from "/src/assets/js/topic.js";

import { storeToRefs } from "pinia";
const config_store = useConfigStore();
const topic_store = useTopicStore();
const { theme } = storeToRefs(config_store);
const { layout } = storeToRefs(config_store);
config_store.$subscribe((mutation, state) => {
  change_theme(state.theme);
  change_layout(state.layout);
});
const router = useRouter();
onBeforeMount(() => {});
const img_load_handle = () => {
  emitter.emit("topic_data", get_topic_data());
};
const get_topic_data = () => {
  return {
    dom_data: Array.from(document.querySelectorAll(".topic_text *")),
    topic_data: select_by_id(topic_store.acg, 1),
  };
};
const select_by_id = (arr, id) => {
  console.log(id);
  if (arr.length == 0) return -1;
  let l = 0;
  let r = arr.length;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid].id == id) return arr[mid];
    else if (arr[mid].id > id) l = mid + 1;
    else r = mid;
  }
  return -1;
};
//change scss var
onMounted(() => {
  change_theme(theme.value);
  change_layout(layout.value);
  emitter.emit("topic_data", get_topic_data());
});

/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="topic_main" class="flex flex_direction_column">
    <TopicTopInterface></TopicTopInterface>
    <div class="topic_container flex flex_direction_row">
      <TopicLeftInterface></TopicLeftInterface>
      <div class="topic_content flex flex_direction_column">
        <div class="topic_text flex flex_direction_column">
          <img @load="img_load_handle" src="/src/assets/imgs/weatheringwithyou.png" alt="" />
        <span class="normal"
          >新海诚的新作《天气之子》已经上映一周了。新海诚的作品，散发着独有的文艺气息，很多台词都具有现实意义；它不如宫崎骏那样深邃，去探讨人世哲理，但也一样阐述了很多现实的残酷。今天，我们就一起看一下《天气之子》中，最能打动人心的10句台词：</span
        >
        <h1 class="center_18_title">No.1</h1>
        <img @load="img_load_handle" src="/src/assets/imgs/topic/w_t_y_1.png" alt="" />
        <span class="normal orange line_height_30 font_weight_900">
          「世界なんてさーどうせもともと狂ってんだから」<br />
           “世界从一开始，就是疯狂的”
        </span>
        <span class="normal">
          这是故事结局时须贺的台词。<br />

          “世界是疯狂的”，帆高和阳菜做的一切，并不是“不正常”，而是“一开始就是疯狂的”。人们制定规则束缚了自己，没有什么是绝对正确，或者绝对错误的，而我们却在下意识里，选择了大家认为“正确”的事情。须贺的话，是想让帆高没有罪恶感，他虽然违背了规则，但却没有做错。
        </span>
        <h1 class="center_18_title">No.2</h1>
        <img @load="img_load_handle" src="/src/assets/imgs/topic/w_t_y_2.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 cyan"
          >「俺はただ、もう一度あの人に会いたいんだっ！」<br />
          “我只不过……想再见她一次！”</span
        >
        <span class="normal">
          剧中帆高的呐喊。<br />
          帆高一个人跨过千难万险，从池袋跑到新宿，一路上都在回想自己和阳菜的邂逅，小小的幸福；但这小小的幸福，却要经历世界冷漠的洗刷，这个世界，连这小小的心愿都不愿意满足他。
        </span>
        <h1 class="center_18_title">No.3</h1>
        <img @load="img_load_handle" src="/src/assets/imgs/topic/w_t_y_3.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 pink">
          「天気ってなんて不思議なのだろうと、ただの空模様に、人間はこんなにも気持ちを動かされてしまう」<br />

           “天气真的是很不可思议，光只是天空的模样就让人感动不已”
        </span>
        <span class="normal">
          来自男主角帆高的内心独白，但这时候男主角还没有意识到，改变自己心情的不是天气，而是那个改变自己心情的人。
        </span>
        <h1 class="center_18_title">No.4</h1>
        <img @load="img_load_handle" src="/src/assets/imgs/topic/w_t_y_4.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 vandyke_brown">
          「ねえ、もうすぐ晴(は)れるよ！」<br />

          呐,现在开始就要放晴了哦！
        </span>
        <h1 class="center_18_title">No.5</h1>
        <img src="/src/assets/imgs/topic/w_t_y_5.jpg" alt="" />

        <span class="normal line_height_30 font_weight_900 titian_red">
          「人間(にんげん)年(とし)取(と)るとさあ、大事(だいじ)なものの順番(じゅんばん)を入(い)れ替(か)えられなくなるんだよな。」<br />

          人一上了岁数，重要事情的先后顺序就很难改变了。
        </span>
        <h1 class="center_18_title">No.6</h1>
        <img src="/src/assets/imgs/topic/w_t_y_6.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 tiffany_blue">
          「もし神様(かみさま)がいるのならば、お願(ねが)いです。僕(ぼく)たちをずっとこのままでいさせてください。」<br />

          如果真的有神明存在的话，我祈愿。请允许我们一直这样保持下去吧。
        </span>
        <h1 class="center_18_title">No.7</h1>
        <img src="/src/assets/imgs/topic/w_t_y_7.jpg" alt="" />

        <span class="normal line_height_30 font_weight_900 yellow">
          「彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br />

          "那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了"
        </span>
        <h1 class="center_18_title">No.8</h1>
        <img src="/src/assets/imgs/topic/w_t_y_8.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 green">
          「はっきりしない男が一番ダメなんだよ。付き合う前は何でもハッキリ言って、付き合った後は曖昧に行くのが基本だろ？」<br />

          “优柔寡断的男人最差劲了，交往之前要一清二楚，交往之后才能再玩暧昧，这是基本的懂吗？”
        </span>
        <h1 class="center_18_title">No.9</h1>
        <img src="/src/assets/imgs/topic/w_t_y_9.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 purple">
          「天気なんて、狂ったままでいいんだ！」<br />

           “天气什么的，就让它这么混乱下去吧！”
        </span>
        <h1 class="center_18_title">No.10</h1>
        <img @load="img_load_handle" src="/src/assets/imgs/topic/w_t_y_10.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 blue">
          「青空よりも俺は陽菜がいい」<br />
          “相比于蓝天，我更需要阳菜”
        </span>
        </div>
        <TopicBottomInterface></TopicBottomInterface>
      </div>
      <TopicRightInterface></TopicRightInterface>
    </div>
  </div>
  <Utils></Utils>
</template>
<style lang="scss" scoped>

</style>
