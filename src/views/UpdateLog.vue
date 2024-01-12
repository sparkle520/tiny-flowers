<!-- @Author: LT -->
<!-- @Date: 2024-01-05 22:41:36 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, ref,onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})
onMounted(() => {
})
const carousel_data = ref([
  // {link:''},
  { link: "https://pic.imgdb.cn/item/659c09de871b83018ad377cb.png" },
  { link: "https://pic.imgdb.cn/item/659bfbbb871b83018a8863a4.png" },
  { link: "https://pic.imgdb.cn/item/659c0a3a871b83018ad5736f.png" },
  { link: "https://pic.imgdb.cn/item/659bfd7e871b83018a917e4b.png" },
]);
</script>
<template>
    <div id="main" class="flex flex_direction_column">
        <Carousel :data="carousel_data" class="carousel"></Carousel>
        <div class="content flex">

        </div>
    </div>
</template>
<style lang="scss" scoped>
#main {
    width: 100%;
    background: #f7f3f5;
    .carousel{
        width: 70%;
        margin: 40px auto;
    }
    .content{
        min-height: 80vh;
        width: 90%;
        background: #f7f3f5;
    }
}
</style>