<!-- @Author: LT -->
<!-- @Date: 2024-01-29 14:27:24 -->
<!-- @Description:  -->

<script setup>
import { onBeforeMount, ref, onMounted, nextTick, onUnmounted } from "vue";
import { useUserStore } from "/src/store/user.js";
import { useRouter } from "vue-router";
import { useTopicStore } from "/src/store/topic.js";
import Gitalk from "gitalk";
const router = useRouter();

import { useConfigStore } from "../store/config";
const config_store = useConfigStore();
const user_store = useUserStore();
const topic_store = useTopicStore();
onBeforeMount(() => {
  props.value = topic_store.data[topic_store.current_topic_index]
  if(props.value.author == ''){
    props.value.author =  user_store.name
  }
  init_pre_next_data()
});
onUnmounted(() => {
});

topic_store.$subscribe((mutation, state) => {
});
const props = ref({
  id: -1,
  title: '未知错误',
  link: '未知错误',
  create_date: '未知错误',
  img: 'https://pic.imgdb.cn/item/66746ba6d9c307b7e9af3651.png',
  author:'',
  tags: '未知错误',
  classification: '未知错误',
  short_message: '未知错误',
  update_date: '未知错误',
  is_visible: true
})
const link_pre = "https://sparkle520.top/#";

onMounted(() => {



  let gitalk = new Gitalk({
    clientID: "429076372c73a03552c6",
    clientSecret: "e10cf1b42cb0daf8cda1857f8f9a4ab411c4c91e",
    repo: "TinyFlowersComment",
    owner: "sparkle520",
    admin: ["sparkle520"],
    id: props.value.link, // 请确保你的 location 连接小于 50 个字符，否则，插件会生成失败
    language: "zh-CN",
    distractionFreeMode: false, // 专注模式
    proxy: "https://strong-caramel-969805.netlify.app/github_access_token",
  });
  gitalk.render("gitalk-container");
});
const pre = ref(
  {
    id: -1,
    title: '未知错误',
    link: '未知错误',
    img: 'https://pic.imgdb.cn/item/66746ba6d9c307b7e9af3651.png',
    is_hidden: ref(false)
  },
)
const next = ref(
  {
    id: -1,
    title: '未知错误',
    link: '未知错误',
    img: 'https://pic.imgdb.cn/item/66746ba6d9c307b7e9af3651.png',
    is_hidden: ref(false)
  },
)
const init_pre_next_data = () => {
  if (topic_store.current_topic_index == 0) {
    next.value= topic_store.data[topic_store.current_topic_index + 1]
    pre.value.is_hidden = true

  } else if (topic_store.current_topic_index == topic_store.length() - 1) {
    pre.value = topic_store.data[topic_store.current_topic_index - 1]
    next.value.is_hidden = true
  } else {
    next.value = topic_store.data[topic_store.current_topic_index + 1]
    pre.value = topic_store.data[topic_store.current_topic_index - 1]
  }
}
</script>
<template>
  <div id="topic_bottom_main">
    <div class="topic_author_info_box f">
      <div class="topic_author_info_inner_box f f_d_c">
        <div>文章作者:<span class="topic_author">{{props.author}}</span></div>
        <div>文章链接:<router-link :to="props.link">{{ link_pre + props.link }}</router-link></div>
      </div>
      
    </div>
    <div class="tag_box">
        <span @click="router.push(`/article/list/all/1?search=${tag}`)" class="tag"
        v-for="tag in props.tags.split('?')" :key="item">#{{ tag }}</span>
      </div>
    <div class="pre_next_topic_box f f_d_r">
      <div class="p_n_box r" v-if="!pre.is_hidden" >
       <div class="p_n_item r f a_c j_c_c" >
        <img class="a p_n_img" :src="pre.img" alt="">
        <div class="p_n_info f f_d_c">

          <span>上一篇</span>
          <router-link :to="pre.link">{{ pre.title }}</router-link>
        </div>
       </div>
      </div>
      <div class="p_n_box r" v-if="!next.is_hidden">
       <div class="p_n_item r f a_c" >
        <img class="a p_n_img" :src="next.img" alt="">
        <div class="p_n_info f f_d_c">

          <div>下一篇</div>
          <div>
            <router-link :to="next.link">{{ next.title }}</router-link>
          </div>
        </div>
       </div>
      </div>
    </div>
    <div id="gitalk-container"></div>
  </div>
</template>
<style lang="scss" scoped>
#topic_bottom_main {
  width: 100%;
  .tag_box{
    width: calc(100vw - 32px);
    margin-bottom: 32px;
    padding: 0 16px;
    .tag{
      padding: 4px 16px;
      background: $fill_primary;
      font-size: 12px;
      margin-right: 8px;
      border-top-left-radius: 5em 10em;
      border-bottom-right-radius: 5em 10em;
            color: $primary;
      cursor: pointer;
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
      box-shadow: 0 0 2px 0 $primary;
      &:hover{
        background: $primary_mix_3;
        color: $fill_primary;

      }
    }
    
  }

  img {
    box-shadow: none;
  }

  #gitalk-container {
    width: 90%;
    margin: 0 auto;
  }

  .topic_author_info_box {
    width: calc(100% - 32px);
    background: $fill;
    border-radius: 4px;
    box-shadow: 0 0 5px $fill_shadow;
    font-weight: 900;
    margin: 16px auto;
    color: $primary;
    .topic_author_info_inner_box {
      margin: 16px;
      gap: 16px;
      span,a {
      color: $text_link;
      margin-left: 16px;
    }
    }

    

    .topic_link {
      text-decoration: underline;
    }
  }

  .pre_next_topic_box {
    width: 100%;
    height: 160px;
    box-shadow: $fill_shadow 0 0 5px;

    .p_n_box {
      width: 100%;
      height: 160px;
      background: #000;
      &:first-child{
        .p_n_item{

          .p_n_info{

            text-align: left;
          }
        }
          }
      .p_n_item{
        width: 100%;
        height: 160px;
        overflow: hidden;
        font-weight: 900;
        color: #ffff;
       
        &:hover{
          .p_n_img{
            opacity: 1;
            transform: scale(1.3);
          }
           
          }
        .p_n_info{
          z-index: 10;
          font-weight: 900;
          color: #fff;
          gap: 16px;
          width: calc(100% - 64px);
          padding: 0 32px;
          text-align: right;
          
        }
        .p_n_img{
          width: 100%;
          height: 160px;
          opacity: .4;
          transition: all 0.6s, filter 375ms ease-in 0.2s;
          object-fit: cover;
         
        }
      }
    
      a{

        text-decoration: none;
        color: #fff;
        &:hover{
          text-decoration: underline;
        }
      }

    }

  
  }
}

@media (max-width: 600px) {
  #topic_bottom_main {
    width: calc(100vw - 20px);

    img {
      box-shadow: none;
    }

    #gitalk-container {
      width: 90%;
      margin: 0 auto;
    }

    .topic_author_info_box {
      width: calc(100vw - 28px);
      background: $fill;
      font-size: 14px;
      border-radius: 5px;
      box-shadow: 0 0 5px $fill_shadow;
      font-weight: 900;
      margin: 8px auto;
      color: $primary;

      .topic_author_info_inner_box {
        margin: 8px;
        gap: 4px;
      }

      span {
        color: $text_link;
        word-break: break-all;
        font-size: 12px;
        margin-left: 4px;
      }

      .topic_link {
        text-decoration: underline;
      }
    }
  }
}
</style>
