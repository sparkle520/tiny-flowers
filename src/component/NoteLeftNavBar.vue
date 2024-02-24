<!--
 * @project weatheringwithyou
 * @description 
 * @author LT
 * @date 9/18/2023 18:42:19
 * @version 1.0
-->
<script setup>
import {onMounted,  toRef} from "vue";
import {defineEmits} from 'vue'

const emit = defineEmits(['book-text'])
const getBookText = () => {
  emit('book-text', 1)
}
const props = defineProps({data: Object})
const data = toRef(props, 'data')

onMounted(() => {

})
const leaveNavItem = (index) => {
  if(!data.value.bookChapters[index].isVisible) {
    document.getElementById(index).style.backgroundColor = ''
    document.getElementById(index).style.color = ''
  }

}
const enterNavItem = (index) => {
  console.log(data.value.bookChapters[index].isVisible)
  if(!data.value.bookChapters[index].isVisible) {
    document.getElementById(index).style.backgroundColor = '#edf7fe'
    //document.getElementById(index).style.backgroundColor = '#091b27'
    document.getElementById(index).style.color = '#0bb890'

  }
}
const leaveChildNavItem = (index, index2) => {
  document.getElementById(index.toString() + index2.toString()).style.backgroundColor = ''

}
const enterChildNavItem = (index, index2) => {

  document.getElementById(index.toString() + index2.toString()).style.backgroundColor = '#edf7fe'

}
const showSonItem = (index) => {
    emit('changeActive', index)
  if(document.getElementById(index).style.backgroundColor === 'black')
  {
    document.getElementById(index).style.backgroundColor = 'transparent'
    document.getElementById(index).style.color = 'black'
  }
  else {
    document.getElementById(index).style.color = 'white'
    document.getElementById(index).style.backgroundColor = 'black'
  }

}

</script>
<template>
  <div class="left-nav-box" style="width: 22vw;height: 100%;overflow: auto">
    <div class="left-nav" style="width: 20vw;min-height: 100%;margin: 0 auto;box-shadow: #ebf2ff 10px 5px 10px;">
      <ul>
        <li v-for="(item,index) in data.name">
          <router-link to="" @mouseleave='leaveNavItem(index)' @click="showSonItem(index)"
                       @mouseenter='enterNavItem(index)' class="nav-item" style="font-weight:600;"
                       :id=index>{{ item.chapterName }}
          </router-link>
          <ul>
            <li v-for="(sonItem,index2) in item.children" v-if="item.isVisible">
              <router-link to=""
                           @click="getBookText(index,index2)" @mouseleave='leaveChildNavItem(index,index2)'
                           @mouseenter='enterChildNavItem(index,index2)'
                           class="nav-item-child link" style="font-weight:400;" :id=index.toString()+index2.toString()>
                {{ sonItem }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
ul > li:last-child > ul > li:last-child
{
  margin-bottom: 100px;
}

::-webkit-scrollbar
{
  width: 0 !important;
}

::-webkit-scrollbar
{
  width: 0 !important;
  height: 0;
}

.nav-item
{
  margin-bottom: 2px;
  display: block;
  border-radius: 5px;
  padding: 8px;
  margin-right: 2px;
}

.nav-item-child
{
  margin-bottom: 2px;
  display: block;
  border-radius: 5px;
  padding: 8px;
  margin-right: 2px;
  margin-left: 10px;
  transform: rotate3d(0, 1, 0, 0);

  animation: nav 0.6s ease-in-out;
}

@keyframes nav
{
  from
  {
    transform: rotate3d(1, 0, 0, -100deg);
    opacity: .1;
  }
  to
  {
    transform: rotate3d(0, 1, 0, 0);

    opacity: 1;
  }
}

a
{
  color: #5d5a57;
  text-decoration: none;
}

a:hover
{
  color: #0bb890;
}

ul
{
  padding: 0;
}

li
{
  list-style-type: none;
}
</style>