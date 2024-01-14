<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const show_to_top_btn = ref(false);
onBeforeMount(() => {});
onMounted(() => {
  window.scrollTo(0, 0);
  document.addEventListener("scroll", () => {
    let wScrY = window.scrollY;

    if (wScrY > 700) {
      show_to_top_btn.value = true;
    } else {
      show_to_top_btn.value = false;
    }
  });
});
const to_top = () => {
  let t = setInterval(() => {
    let wScrY = window.scrollY - 50;
    window.scrollTo(0, wScrY);
    if (wScrY <= 0) {
      clearInterval(t);
    }
  }, 2);
};
</script>
<template>
  <div id="main" class="flex align_items_center flex_direction_column">
    <div
      @click="to_top"
      class="to_top_btn flex flex_direction_column align_items_center justify_content_center"
      v-if="show_to_top_btn"
    >
      <div class="top">
        <svg
          t="1704637028569"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="11841"
          width="32"
          height="32"
        >
          <path
            d="M806.771214 961.506103l-62.493897 62.493897-232.177327-232.177326-232.177326 232.177326-62.493897-62.493897 294.671223-294.671224 294.671224 294.671224z"
            fill="#8FB3FF"
            p-id="11842"
          ></path>
          <path
            d="M806.771214 294.771214l-62.493897 62.493897-232.177327-232.177327-232.177326 232.177327-62.493897-62.493897L512.09999 0.09999l294.671224 294.671224z"
            fill="#043EB8"
            p-id="11843"
          ></path>
          <path
            d="M806.771214 628.138658l-62.493897 62.493897-232.177327-232.177326-232.177326 232.177326-62.493897-62.493897 294.671223-294.671223 294.671224 294.671223z"
            fill="#2868F0"
            p-id="11844"
          ></path>
        </svg>
      </div>
    </div>
    <div class="content">
      <div class="title_box">
        <span class="title relative">Weathering With you(经典语录)</span>
        <div class="time_bar flex flex_direction_row align_items_center">
          2024-01-06
          <div class="time flex">
            <svg
              t="1704628451767"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4237"
              width="18"
              height="18"
            >
              <path
                d="M512 938.666667c235.637333 0 426.666667-191.029333 426.666667-426.666667S747.637333 85.333333 512 85.333333 85.333333 276.362667 85.333333 512s191.029333 426.666667 426.666667 426.666667zM329.376 649.376L480 498.741333V320a32 32 0 0 1 64 0v192a32 32 0 0 1-9.376 22.624l-160 160a32 32 0 1 1-45.248-45.248z"
                fill="#df4c58"
                p-id="4238"
              ></path>
            </svg>
            7:06
          </div>
        </div>
      </div>
      <div class="text flex flex_direction_column">
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
  </div>
</template>
<style lang="scss" scoped>
#main {
  width: 100%;
  background: #e1e4ea;
  min-height: 100vh;
  font-family: "Microsoft YaHei";

  .content {
    width: 80%;
    border-radius: 4px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    min-height: 80vh;
    background: #f7f3f5;
    margin-bottom: 100px;
    .title_box {
      width: 100%;
      margin-top: 20px;
      font-weight: 700;
      font-size: 30px;
      .title {
        color: rgb(23, 62, 108);

        margin-left: 30px;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 15px;
          background-color: rgba(34, 17, 51, 0.393);
        }
      }
      .time_bar {
        margin-top: 10px;
        margin-left: 30px;
        font-size: 14px;
        color: #989e6a;
        .time {
          margin-left: 10px;
          color: #5d6e4a;
          svg {
            margin-right: 3px;
            transform: translateY(-1px);
          }
        }
      }
    }
    .text {
      width: 80%;
      margin: 10px auto;
    }
  }
}
img {
  object-fit: cover;
  width: 100%;
  box-shadow: #5d6e4a 2px 3px 10px;
  margin-bottom: 30px;
}
.normal {
  font-size: 16px;
  line-height: 23px;
  margin: 10px 0;
}
.center_18_title {
  margin: 20px auto;
  font-size: 18px;
  font-weight: 700;
  line-height: 20px;
}
.orange {
  color: #d77f57;
}
.pink {
  color: #df4c58;
}
.line_height_30 {
  line-height: 30px;
}
.font_weight_900 {
  font-weight: 900;
}
.cyan {
  color: #41a8a8;
}
.purple {
  color: #84709b;
}
.blue {
  color: #b6cad7;
}
.green {
  color: #91b5a9;
}
.yellow {
  color: #f3af27;
}
.tiffany_blue {
  color: #81d8cf;
}
.titian_red {
  color: #b05923;
}
.vandyke_brown {
  color: #8f4b28;
}
.to_top_btn {
  position: fixed;
  right: 40px;
  bottom: 60px;
  width: 4%;
  height: 10%;
  background: #edf3f2;
  border-radius: 5px;

  z-index: 100;
  animation: show 2s cubic-bezier(0.075, 0.82, 0.165, 1);

  @keyframes show {
    0% {
      bottom: -60px;
      opacity: 0;
    }

    100% {
      opacity: 1;
      bottom: 60px;
    }
  }

  &:hover {
    background-color: #7e96ec;
  }
}
</style>
