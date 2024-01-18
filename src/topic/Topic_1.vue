<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onUnmounted,onMounted ,watch} from "vue";
import { useRouter } from "vue-router";
import {change_theme} from '/src/assets/js/topic.js'
import TopicTitle from '/src/component/TopicTitle.vue'
import emitter from "@/assets/config/mitt_bus.js";

const router = useRouter();
onBeforeMount(() => {});
onMounted(()=>{
  change_theme(props.theme)
  change_layout(props.layout);
  emitter.on("new_side_view", (v) => side_view_handle(v));

})
const props = defineProps({
  theme: Boolean,
  layout:Boolean,
});
watch(props, (newV, oldV) => {
  change_theme(newV.theme)
});
onUnmounted(()=>{
  emitter.off("new_side_view")
})
 
const side_view_handle = (v) => {
  change_layout(v.current_side_view);
};
const change_layout = (flag) => {
  const topic_content = document.querySelector(".topic_content");
  if (flag) {
    topic_content.style.width = "60vw";
    topic_content.style.margin = " 20px 30px 80px calc(10vw - 10px)";
    // show_personal_info.value = true;
  } else {
    topic_content.style.width = "80vw";
    // show_personal_info.value = false;
  }
};
const data = {
  title:'Weathering With you(经典语录)',
  date:'2024-01-06?7:06'
}
</script>
<template>
  <div id="topic_main" class="flex  flex_direction_row">
   
    <div class="topic_content">
      <TopicTitle :data="data"></TopicTitle>

      <div class="topic_text flex flex_direction_column">
        <img src="/src/assets/imgs/weatheringwithyou.png" alt="" />
        <span class="normal"
          >新海诚的新作《天气之子》已经上映一周了。新海诚的作品，散发着独有的文艺气息，很多台词都具有现实意义；它不如宫崎骏那样深邃，去探讨人世哲理，但也一样阐述了很多现实的残酷。今天，我们就一起看一下《天气之子》中，最能打动人心的10句台词：</span
        >
        <span class="center_18_title">No.10</span>
        <img src="/src/assets/imgs/topic/w_t_y_1.png" alt="" />
        <span class="normal orange line_height_30 font_weight_900">
          「世界なんてさーどうせもともと狂ってんだから」<br />
           “世界从一开始，就是疯狂的”
        </span>
        <span class="normal">
          这是故事结局时须贺的台词。<br />

          “世界是疯狂的”，帆高和阳菜做的一切，并不是“不正常”，而是“一开始就是疯狂的”。人们制定规则束缚了自己，没有什么是绝对正确，或者绝对错误的，而我们却在下意识里，选择了大家认为“正确”的事情。须贺的话，是想让帆高没有罪恶感，他虽然违背了规则，但却没有做错。
        </span>
        <span class="center_18_title">No.9</span>
        <img src="/src/assets/imgs/topic/w_t_y_2.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 cyan"
          >「俺はただ、もう一度あの人に会いたいんだっ！」<br />
          “我只不过……想再见她一次！”</span
        >
        <span class="normal">
          剧中帆高的呐喊。<br />
          帆高一个人跨过千难万险，从池袋跑到新宿，一路上都在回想自己和阳菜的邂逅，小小的幸福；但这小小的幸福，却要经历世界冷漠的洗刷，这个世界，连这小小的心愿都不愿意满足他。
        </span>
        <span class="center_18_title">No.8</span>
        <img src="/src/assets/imgs/topic/w_t_y_3.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 pink">
          「天気ってなんて不思議なのだろうと、ただの空模様に、人間はこんなにも気持ちを動かされてしまう」<br />

           “天气真的是很不可思议，光只是天空的模样就让人感动不已”
        </span>
        <span class="normal">
          来自男主角帆高的内心独白，但这时候男主角还没有意识到，改变自己心情的不是天气，而是那个改变自己心情的人。
        </span>
        <span class="center_18_title">No.7</span>
        <img src="/src/assets/imgs/topic/w_t_y_4.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 vandyke_brown">
          「ねえ、もうすぐ晴(は)れるよ！」<br />

          呐,现在开始就要放晴了哦！
        </span>
        <span class="center_18_title">No.6</span>
        <img src="/src/assets/imgs/topic/w_t_y_5.jpg" alt="" />

        <span class="normal line_height_30 font_weight_900 titian_red">
          「人間(にんげん)年(とし)取(と)るとさあ、大事(だいじ)なものの順番(じゅんばん)を入(い)れ替(か)えられなくなるんだよな。」<br />

          人一上了岁数，重要事情的先后顺序就很难改变了。
        </span>
        <span class="center_18_title">No.5</span>
        <img src="/src/assets/imgs/topic/w_t_y_6.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 tiffany_blue">
          「もし神様(かみさま)がいるのならば、お願(ねが)いです。僕(ぼく)たちをずっとこのままでいさせてください。」<br />

          如果真的有神明存在的话，我祈愿。请允许我们一直这样保持下去吧。
        </span>
        <span class="center_18_title">No.4</span>
        <img src="/src/assets/imgs/topic/w_t_y_7.jpg" alt="" />

        <span class="normal line_height_30 font_weight_900 yellow">
          「彼女と過ごした、あの年の夏。東京の空の上で僕たちは、世界の形を決定的に変えてしまったのだ」<br />

          "那年夏天，在那个天空之上的我们，把这个世界的样貌，彻底的改变了"
        </span>
        <span class="center_18_title">No.3</span>
        <img src="/src/assets/imgs/topic/w_t_y_8.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 green">
          「はっきりしない男が一番ダメなんだよ。付き合う前は何でもハッキリ言って、付き合った後は曖昧に行くのが基本だろ？」<br />

          “优柔寡断的男人最差劲了，交往之前要一清二楚，交往之后才能再玩暧昧，这是基本的懂吗？”
        </span>
        <span class="center_18_title">No.2</span>
        <img src="/src/assets/imgs/topic/w_t_y_9.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 purple">
          「天気なんて、狂ったままでいいんだ！」<br />

           “天气什么的，就让它这么混乱下去吧！”
        </span>
        <span class="center_18_title">No.1</span>
        <img src="/src/assets/imgs/topic/w_t_y_10.jpg" alt="" />
        <span class="normal line_height_30 font_weight_900 blue">
          「青空よりも俺は陽菜がいい」<br />
          “相比于蓝天，我更需要阳菜”
        </span>
      </div>
    </div>
    <DirectoryList :theme="props.theme"   :layout="props.layout" class="directoryList"></DirectoryList>
  </div>
  <Utils :theme="props.theme"></Utils>


</template>
<style lang="scss" scoped>
.directoryList{
  margin-top: 20px;
}
</style>
