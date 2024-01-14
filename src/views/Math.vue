<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const current_subject = ref("");
const current_difficult = ref("");
const switch_tag_box = ref(false);
const pass = ref(false);
const show_tag_box = () => {
  switch_tag_box.value = true;
};
const close_tag_box = () => {
  switch_tag_box.value = false;
};
const deleteTagByIndex = (index) => {
  select_tag_list.value.push(tag_list.value[index]);
  tag_list.value.splice(index, 1);
};
const undo_tag_by_index = (index) => {
  tag_list.value.push(select_tag_list.value[index]);
  select_tag_list.value.splice(index, 1);
};
const click_tag_sure = () => {
  close_tag_box();
};
const current_page_change = (current) => {};
const go_to_solution = () => {
};
const page_num = ref(1);
const subject_list = [
  { value: "1", label: "高等数学" },
  { value: "1", label: "概率论与数理统计" },
  { value: "1", label: "线性代数" },
  { value: "1", label: "离散数学" },
];

const tag_list = ref([
  { tagId: 1, tag_name: "特征值与特征向量" },
  { tagId: 2, tag_name: "快速傅里叶变换" },
  { tagId: 3, tag_name: "二次型" },
  { tagId: 4, tag_name: "一维随机变量及其分布" },
  { tagId: 5, tag_name: "中心极限定理" },
  { tagId: 1, tag_name: "参数估计" },
  { tagId: 1, tag_name: "曲线积分" },
  { tagId: 1, tag_name: "曲面积分" },
 
  { tagId: 1, tag_name: "微分中值定理" },
]);
const topic_list = ref([
  {
    id: "M1",
    question:
      "将函数f(x) = 2+|x| (-1 \\leq x \\leq 1)展开成以2为周期的傅里叶级数，并由此求级数\\sum^{\\infty}_{n =1}{\\frac{1}{{n}^{2}} }的和.",
    tags: "高等数学?无穷级数",
    difficulty: "困难",
    link: "困难",
  },
  {
    id: "M2",
    question: "证明不等式:(1)当x \\in (0, \\frac{\\pi}{2})时,x<tan x;(2)...",
    tags: "高等数学?积分不等式",
    difficulty: "简单",
    link: "困难",
  },
  {
    id: "M3",
    question:
      "设 X, Y 独立同分布且服从 N (0; 1), Z = X^{2} + Y^{2}. 计算 E(Z).",
    tags: "概率论与数理统计?数学期望",
    difficulty: "中等",
    link: "困难",
  },
  {
    id: "M4",
    question: "某省的体育彩票中, 有顺序的 7 个数字组成一个号码, 称为一...",
    tags: "概率论与数理统计?数学期望",
    difficulty: "中等",
    link: "困难",
  },
]);
const current_difficult_list = [
  { value: "1", label: "简单" },
  { value: "2", label: "中等" },
  { value: "3", label: "困难" },
];
const select_tag_list = ref([]);
</script>
<template>
  <div id="main" class="flex flex_direction_column align-items-center">
    <div
      id="top-box"
      class="flex flex-direction-column com-box align-items-center"
    >
      <div class="flex flex-direction-row condition-box align-items-center">
        <div class="flex align-items-center margin-0-10">筛选条件:</div>
        <div class="margin-0-10">科目</div>
        <el-select v-model="current_subject" placeholder="不可用">
          <el-option
            v-for="item in subject_list"
            :key="item.value"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <div class="margin-0-10">题目难度</div>
        <el-select v-model="current_difficult" placeholder="不可用">
          <el-option
            v-for="item in current_difficult_list"
            :key="item.value"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <div class="tag-box margin-0-10">
          <button class="tag-btn" @click="show_tag_box">标签</button>
          <div
            v-if="switch_tag_box"
            class="fixed tag-choose-box flex flex-direction-column align-items-center"
          >
            <div class="choose-top flex flex-direction-row align-items-center">
              <div @click="close_tag_box" class="close-btn">
                <svg
                  t="1697596075825"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="14147"
                  width="32"
                  height="32"
                >
                  <path
                    d="M707.55328 870.61504h-0.03072a28.79488 28.79488 0 0 1-20.5312-8.51968l-176.5376-176.5376L335.9232 860.0576a29.09184 29.09184 0 0 1-41.04192 0.01024L162.816 727.98208a28.7744 28.7744 0 0 1-8.52992-20.52096c0-7.77216 3.03104-15.07328 8.54016-20.55168L337.3056 512.4096 161.77152 336.88576a29.14304 29.14304 0 0 1-0.01024-41.05216l134.11328-134.16448c11.14112-11.10016 29.952-11.08992 41.08288-0.02048L512.512 337.21344l175.53408-175.53408c11.12064-11.12064 29.92128-11.12064 41.0624 0l132.07552 132.096a28.7744 28.7744 0 0 1 8.50944 20.49024 28.8768 28.8768 0 0 1-8.50944 20.59264L685.6704 510.38208 862.208 686.8992v-0.01024 0.01024c5.49888 5.48864 8.51968 12.8 8.50944 20.5824a28.8256 28.8256 0 0 1-8.52992 20.52096L728.08448 862.11584a28.75392 28.75392 0 0 1-20.5312 8.4992zM510.45376 660.8384c2.62144 0 5.24288 1.00352 7.24992 3.00032l183.79776 183.79776a8.41728 8.41728 0 0 0 6.0416 2.49856h0.01024a8.40704 8.40704 0 0 0 6.03136-2.48832l134.15424-134.16448a8.48896 8.48896 0 0 0 2.5088-6.0416 8.47872 8.47872 0 0 0-2.5088-6.06208v-0.01024L663.95136 517.62176a10.22976 10.22976 0 0 1 0-14.47936l182.75328-182.77376a8.54016 8.54016 0 0 0 0.02048-12.09344l-132.096-132.11648c-3.06176-3.05152-9.04192-3.05152-12.10368 0L519.75168 358.93248c-3.82976 3.84-10.62912 3.85024-14.47936 0l-182.79424-182.784c-3.06176-3.03104-9.09312-3.04128-12.15488 0.01024L176.25088 310.29248a8.62208 8.62208 0 0 0 0.02048 12.1344l182.75328 182.74304a10.22976 10.22976 0 0 1 0 14.47936l-181.72928 181.76a8.45824 8.45824 0 0 0-0.02048 12.07296l132.08576 132.096a8.57088 8.57088 0 0 0 12.09344-0.01024l181.76-181.72928a10.20928 10.20928 0 0 1 7.23968-3.00032z"
                    fill="#123"
                    p-id="14148"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="to-choose flex flex-direction-column">
              <span class="label-choose">请选择标签</span>
              <div class="flex tag-item-box">
                <div
                  @click="deleteTagByIndex(index)"
                  v-for="(item, index) in tag_list"
                  :id="item.tagId"
                  class="tag-item flex align-items-center justify-content-center"
                >
                  {{ item.tag_name }}
                </div>
              </div>
            </div>
            <div class="have-choose flex flex-direction-column">
              <span class="label-choose">已选择标签</span>
              <div class="flex tag-item-box">
                <div
                  @click="undo_tag_by_index(index)"
                  v-for="(item, index) in select_tag_list"
                  :id="item.tagId"
                  class="tag-item flex align-items-center justify-content-center"
                >
                  {{ item.tag_name }}
                </div>
              </div>
            </div>
            <div class="choose-bottom flex align-items-center">
              <button @click="click_tag_sure" class="tag-sure-btn">确定</button>
            </div>
          </div>
        </div>
        <div class="key-search-input-box">
          <input
            type="text"
            class="key-search-input"
            placeholder="关键字搜素(暂不可用)"
          />
        </div>
      </div>
      <div class="flex flex_direction_column select_tag">
        <h4 class="">已选择标签：</h4>
        <ul class="flex flex_direction_row">
          <li 
          @click="undo_tag_by_index(index)"

          v-for="(item, index) in select_tag_list" class="relative">
            {{ item.tag_name }}
            <svg
              t="1705223580496"
              class="icon absolute absolute_center"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5997"
              width="32"
              height="32"
            >
              <path
                d="M872.778827 254.203062l-620.739643 592.59052-109.312046-114.504566 620.739643-592.59052 109.312046 114.504566Z"
                fill="#E96D71"
                p-id="5998"
              ></path>
              <path
                d="M268.693068 128.199468l592.589813 620.738902-114.505306 109.312753-592.589813-620.738902 114.505306-109.312753Z"
                fill="#F55555"
                p-id="5999"
              ></path>
            </svg>
          </li>
        </ul>
      </div>
    </div>
    <div
      id="content-box"
      class="flex flex-direction-column com-box align-items-center"
    >
      <!-- width：96% -->
      <div class="content-top-box grid content-grid-com">
        <div class="flex align-items-center justify-content-center">题号</div>
        <div class="flex align-items-center justify-content-center">
          题目名称
        </div>
        <div class="flex align-items-center justify-content-center">标签</div>
        <div class="flex align-items-center justify-content-center">难度</div>
      </div>
      <div class="content-mid-box">
        <div
          @click="go_to_solution(item.link)"
          v-for="(item, index) in topic_list"
          class="content-item-box grid content-grid-com"
        >
          <div
            class="subject-num flex align-items-center justify-content-center"
          >
            {{ item.id }}
          </div>
          <div
            class="subject-name flex align-items-center justify-content-center"
          >
            <vue-latex
              style="font-size: 13px"
              :display-mode="true"
              :expression="item.question"
            >
            </vue-latex>
          </div>
          <div class="content-tag-box flex align-items-center">
            <div
              v-for="(item2, index) in item.tags.split('?')"
              class="flex content-tag-item align-items-center justify-content-center"
            >
              {{ item2 }}
            </div>
          </div>
          <div
            v-if="item.difficulty == '困难'"
            class="flex align-items-center justify-content-center difficulty-hard"
          >
            {{ item.difficulty }}
          </div>
          <div
            v-if="item.difficulty == '简单'"
            class="flex align-items-center justify-content-center difficulty-easy"
          >
            {{ item.difficulty }}
          </div>
          <div
            v-if="item.difficulty == '中等'"
            class="flex align-items-center justify-content-center difficulty-mid"
          >
            {{ item.difficulty }}
          </div>
        </div>
      </div>
      <div
        class="content-bottom-box flex align-items-center justify-content-center"
      >
        <el-pagination
          background
          :page-size="1"
          @current-change="current_page_change"
          layout="prev, pager, next,jumper"
          :total="page_num"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("/src/assets/css/math.scss");
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

#main {
  background: #f7f3f5;
  .margin-0-10 {
    margin: 0 10px;
  }

  width: 100%;
  .select_tag {
    width: calc(100% - 60px);
    justify-items: flex-start;
    h4{
        margin: 0;
    }
    
    ul {
        flex-wrap: wrap;
      padding: 0;
      li {
        user-select:none; 
        background: #fec163;
        padding: 10px;
        margin: 5px;
        font-weight: 900;

        color: #fdffff;
        &:hover{
            svg{
                transform: scale(1) translate(-50%,-50%);

                opacity: 1;
            }
        }
        svg{
            transition: all .5s cubic-bezier(0.075, 0.82, 0.165, 1);
            transform: scale(0.8) translate(-50%,-50%) rotate(30deg);
            opacity: 0;
        }
      }
    }
  }

  .com-box {
    border-radius: 5px;
    box-shadow: 9px 9px 10px #d0cfcf45;
    background: #ffffff;
    .condition-box {
      width: 96%;
      height: 60px;
      margin: 20px;
      font-weight: 600;
      // border-radius: 10px;
      color: #464879;
      // background: rgb(231, 240, 249);
      border-bottom: #464879 2px solid;
      .key-search-input-box {
        margin-left: auto;
        margin-right: 20px;

        .key-search-input {
          height: 30px;
          font-size: 15px;
          color: rgb(83, 120, 120);
          border: none;
          padding: 0 5px;

          &:focus {
            outline: none;
          }

          &::placeholder {
            color: rgb(138, 148, 148);
            font-size: 13px;
          }

          // &::before{
          //     position: absolute;
          //     width: 100px;
          //     content: "";
          //     height: 100px;
          //     background-image: url('@/assets/imgs/search.png');
          // }
        }
      }

      .tag-box {
        .tag-btn {
          width: 100px;
          height: 30px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          font-weight: 600;
          color: #146e57;
          background: linear-gradient(45deg, #d5e2e8, #97dbac);
          transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
          &:hover {
            transform: scale(1.05);
          }

          &:active {
            animation: extend 1s cubic-bezier(0.165, 0.84, 0.44, 1);

            @keyframes extend {
              0% {
                transform: rotateY(30deg);
              }

              100% {
                transform: rotateY(0);
              }
            }
          }
        }

        .tag-choose-box {
          width: 900px;
          height: 600px;
          left: 50%;
          top: 50%;
          border: #6b6b6b 1px solid;
          border-radius: 10px;
          background-color: rgba(255, 255, 255, 0.922);

          transform: translate(-40%, -50%);
          z-index: 10;
          animation: move_top 1s cubic-bezier(0.165, 0.84, 0.44, 1);
          .tag-item {
            background-color: #e3e9f0;
            border-radius: 10px;
            padding: 0 10px;
            height: 40px;
            margin: 5px 5px;
            user-select: none;
            transform: skewX(-15deg);
            animation: sparkle 1s cubic-bezier(0.165, 0.84, 0.44, 1);

            @keyframes sparkle {
              0% {
                opacity: 0;
              }

              100% {
                opacity: 1;
              }
            }

            &:hover {
              color: #e3e9f0;
              background: #8d88e5;
            }
          }

          .tag-item-box {
            width: 100%;
            flex-wrap: wrap;
          }

          .choose-top {
            width: 100%;
            border-bottom: rgb(167, 167, 167) 2px solid;
            height: 50px;
            border-top-right-radius: inherit;
            border-top-left-radius: inherit;

            .close-btn {
              margin-left: auto;
              margin-right: 10px;

              &:hover {
                transform: scale(1.1);
              }

              &:active {
                transform: scale(1.2);
              }
            }
          }

          .to-choose {
            width: 98%;
            overflow-y: auto;
            height: 270px;
            margin-top: 10px;
            border-radius: 5px;
            background-image: linear-gradient(
              135deg,
              #81ffee1b 10%,
              #f067b511 100%
            );
          }

          .label-choose {
            margin: 10px 10px;
          }

          .have-choose {
            width: 98%;
            overflow-y: auto;
            margin: 10px 0;
            border-radius: 10px;

            height: 180px;
            background-image: linear-gradient(
              135deg,
              #ffa8a80a 10%,
              #fbff001d 100%
            );
          }

          .choose-bottom {
            width: 100%;
            height: 60px;
            border-bottom-right-radius: inherit;
            border-bottom-left-radius: inherit;

            .tag-sure-btn {
              width: 150px;
              height: 40px;
              margin-left: auto;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 10px;
              background-color: #fff;
              z-index: 1;
              position: relative;
              overflow: hidden;
              color: #3cd500;
              border: 3px solid #3cd500;
              font-family: Arial;
              font-weight: 800;
              font-size: 1.05em;
              border-radius: 5px;
              transition: transform 0.3s ease, color 0.5s ease;
              &::before {
                content: "";
                inset: 0 0 0 0;
                margin: auto;
                height: 0px;
                width: 0px;
                position: absolute;
                background-color: #3cd500;
                z-index: -1;
                border-radius: 50%;
                transition: all 0.7s ease;
              }

              &:active {
                transform: scale(0.9);
              }

              &:hover {
                color: #fff;
                &::before {
                  height: 200px;
                  width: 200px;
                }
              }
            }
          }
        }
      }
    }
  }

  #top-box {
    margin-top: 20px;
    width: 90%;
    min-height: 300px;
  }

  #content-box {
    margin-top: 30px;
    width: 90%;
    margin-bottom: 20px;

    .content-grid-com {
      grid-template-columns: 5% 65% 20% 10%;
      gap: 10px;
    }

    .content-top-box {
      width: 98%;
      height: 60px;
      background: #f9fffc38;
      margin-top: 10px;
      border-bottom: #61c48e 2px solid;
      border-top-right-radius: inherit;
      border-top-left-radius: inherit;
    }

    .content-mid-box {
      width: 98%;
      height: auto;
      margin-bottom: 30px;
      background: #dae5df38;
      border-bottom-right-radius: inherit;
      border-bottom-left-radius: inherit;

      .content-item-box {
        min-height: 60px;

        &:hover {
          background: #fec163;

          .subject-name {
            color: #002661;
          }
        }

        &:last-child {
          border-bottom-right-radius: inherit;
          border-bottom-left-radius: inherit;
        }

        .subject-num {
          font-family: 600;
          color: #7db8b8;
        }

        .difficulty-hard {
          color: #c54c4c;
          font-weight: 700;
        }
        .difficulty-easy {
          color: #66a321;
          font-weight: 700;
        }
        .difficulty-mid {
          color: #f19742;
          font-weight: 700;
        }

        .subject-name {
          justify-self: flex-start;
          color: #806262;
        }

        .content-tag-box {
          flex-wrap: wrap;
          border-bottom: #61c48e 1px solid;
          .content-tag-item {
            width: auto;
            padding: 0 5px;
            height: 30px;
            align-self: start;
            margin: 5px 0px 3px 3px;
            border-radius: 3px;
            color: #ffffff;
            font-size: 12px;
            font-weight: 700;
            background: #6235a1;
          }
        }
      }
    }

    .content-bottom-box {
      margin-top: auto;
      margin-bottom: 10px;
      width: 100%;
    }
  }
}
@keyframes move_top {
  0% {
    transform: translate(-40%, -10%);
  }
  100% {
    transform: translate(-40%, -50%);
  }
}
</style>
