<script setup>
import { onMounted, ref, nextTick, watch } from "vue";
import { useRoute } from "vue-router";
import Gitalk from "gitalk";
import { useMathStore } from "/src/store/math.js";
import { storeToRefs } from "pinia";
import MathJax, { initMathJax, renderByMathjax } from "mathjax-vue3";
import "/src/assets/css/markdown.scss";
import { marked } from "marked";
const math_store = useMathStore();
const { params } = useRoute();

const { data } = storeToRefs(math_store);
const show_solution = ref(false);
const show_comment = ref(false);
const solution_content = ref("");
const problem_content = ref("");
const render = new marked.Renderer();
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
  solution_content.value = marked(newValue);

  // initMathJax({}, onMathJaxReady)
  nextTick(() => {
    renderByMathjax(document.getElementById("problem"));
  });
});

onMounted(() => {
  dragControllerLR();
  dragControllerUD();
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
</script>
<template>
  <div class="math_details_main flex flex_direction_column">
    <div class="math_top_box flex flex_direction_row"></div>
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
.math_details_main {
  width: 100vw;
  height: 100vh;
  letter-spacing: 4px;
  .solution_problem_box {
    height: calc(100% - 62px);
    width: calc(100% - 32px);
    padding: 16px;
  }
  .math_top_box {
    width: 90vw;
    height: 5vh;
    margin: 0 auto;
    border-radius: 5px;
    margin-top: 70px;
    background: #fff;
    box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;
  }
  .box {
    width: 90vw;
    height: calc(80vh - 10px);
    margin: 1% auto;
    margin-top: 8px;
  }
  /*左侧div样式*/
  .left {
    width: calc(42% - 10px); /*左侧初始化宽度*/
    height: 100%;
    border-radius: 5px;
    background: #ffff;
    overflow: scroll;
    

    box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;
    .left_top_box {
      height: 30px;
      width: calc(100% - 32px);
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      background: #feb55c;
      padding: 0 16px;
      color: #fff;

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
    color: white;
    &::after {
      content: "";
      position: absolute;
      width: 5px;
      height: 90%;
      background: #868484;
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
      background: #999999;
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
    background: #f3f3f3;
    border-radius: 5px;

    /*上方div'样式*/
    .right_top_box {
      height: 60%;
      background-color: #ffff;
      border-radius: 5px;
      overflow: scroll;
      box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;
      .right_top_top_box {
        height: 30px;
        width: calc(100% - 32px);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background: #feb55c;
        padding: 0 16px;
        color: #fff;
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
          color: #ffff;
          border-radius: 5px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;

          &:hover {
            background: #e31e1e;
            color: #ffff;
          }
        }
      }
    }
    /*下方div'样式*/
    .right_bottom_box {
      height: calc(40% - 10px);
      background-color: #ffff;
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
          color: #ffff;
          border-radius: 5px;
          transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
          box-shadow: rgba(129, 131, 132, 0.055) 0px 5px 20px;

          &:hover {
            background: #e31e1e;
            color: #f3f3f3;
          }
        }
      }
      .right_bottom_top_box {
        height: 30px;
        width: calc(100% - 32px);
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
        background: #feb55c;
        padding: 0 16px;
        color: #fff;
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
      color: white;
      &::after {
        content: "";
        position: absolute;
        width: 90%;
        height: 5px;
        background: #868484;
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
        background: #999999;
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
</style>
