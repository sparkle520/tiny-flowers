<!-- @Author: LT -->
<!-- @Date: 2024-01-07 19:14:51 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, ref, onBeforeMount, onMounted } from "vue";
import { useRouter } from "vue-router";
import TopicTop from '/src/component/TopicTop.vue'
import TopicTitle from '/src/component/TopicTitle.vue'
const router = useRouter();
onBeforeMount(() => {});
onMounted(()=>{})
const data = {
  title:'HELLO WORLD',
  date:'2024-01-06?7:06'
}
/* <vue-latex :display-mode="true" expression="设\lim_{x \to x_{0}} f(x) =A."></vue-latex> */
/* <div class="hljs_container" style="width: 700px;" codetype="JavaScript" >
        <highlightjs  style="width: 700px;" language="JavaScript" :autodetect="false" :code="code"></highlightjs>
    </div> */
</script>
<template>
  <div id="main" class="flex  flex_direction_column">
    <div class="content">
    <TopicTitle :data="data"></TopicTitle>
      <div class="text flex flex_direction_column">
       
      </div>
    </div>
  </div>
  <TopicTop></TopicTop>
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
    margin-left: 20px;
    min-height: 80vh;
    background: #f7f3f5;
    margin-bottom: 100px;
   
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

</style>
