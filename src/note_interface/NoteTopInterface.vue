<!-- @Author: LT -->
<!-- @Date: 2024-01-29 04:33:30 -->
<!-- @Description:  -->

<script setup>
</script>
<template>
  <div
    id="note_top_main"
    class="r f a_c j_c_c"
  >
   <img class="note_top_main_bg" src="https://pic.imgdb.cn/item/666c45e4d9c307b7e930def6.png" alt="">
  </div>
</template>
<style lang="scss" scoped>

#note_top_main {
  width: max(1100px,100vw);
  margin: 0 auto;
  height: 378px;
  margin-top: 90px;
  border-radius: 5px;
  box-shadow: $fill_shadow 0px 4px 10px;

   animation: note_top_bg 2s cubic-bezier(0.075, 0.82, 0.165, 1);
  &::after{
    content: '';
    position: absolute;
    width: 100%;
    height: 80%;
    background: linear-gradient(to bottom,transparent,$fill_shadow);
    bottom: 0;
    left: 0;
  }
  @keyframes note_top_bg {
    0%{
      transform: translateY(-300px);
      opacity: .1;
    }100%{
      transform: translateY(0px);

    }
  }
  .note_top_main_bg{
    width: max(1100px,100vw);
    height: inherit;
    border-radius: 5px;
    object-fit: cover;

  }
 
 
}
</style>
