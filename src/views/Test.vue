<!-- @Author: LT -->
<!-- @Date: 2024-01-11 16:23:12 -->
<!-- @Description:  -->

<script setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
onBeforeMount(() => {
})                                     
onMounted(() => {
    let file_1 = document.querySelector('#file') 
    file_1.addEventListener('change',()=>{
        const files = file_1.files
        let url = URL.createObjectURL(files[0])
    console.log(url);
    document.querySelector("#music").src = url
    console.log( document.querySelector("#music").src);
    })
})
// const music = ()=>{
//     let file = document.querySelector('#file').files[0]
   
// }
</script>
<template>
    <div id="main">
        <input type="file" id="file" multiple accept=".mp4">
        <audio id="music" controls autoplay loop></audio>
    </div>
</template>
<style lang="scss" scoped>
#main {
    width: 100%;
}
</style>