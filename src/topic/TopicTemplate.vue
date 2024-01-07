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
        <span class="title relative">
            <!-- Weathering With you(经典语录) -->
        </span>
        <div class="time_bar flex flex_direction_row">
          <!-- 2024-01-06 -->
          <div class="time flex justify_content_center align_items_center">
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
            <!-- 7:06 -->
          </div>
        </div>
      </div>
      <div class="text flex flex_direction_column">
       
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
    margin-top: 100px;
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
          margin-left: 30px;
          color: #5d6e4a;
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
