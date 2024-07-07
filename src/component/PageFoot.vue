<script setup>
import { useUserStore } from "/src/store/user.js";
const user_store = useUserStore()
</script>
<template>
 <div class="page_foot r f f_d_r a_c justify_content_center">
    <div class="left_foot f f_d_c  justify_content_center">
      <span class="title_foot">人生格言</span>
      <span class="text_foot" v-html="user_store.aphorism"></span>
    </div>
    <div class="mid_foot f f_d_c">
      <span class="title_foot"></span>
    </div>
    <div class="right_foot f f_d_c justify_content_center">
      <span class="title_foot">联系我</span>
      <span class="text_foot">邮箱: {{ user_store.e_mail }}</span>
      <span class="text_foot">GitHub Account: {{ user_store.github_account }}</span>
      <span class="text_foot">小红书ID: {{ user_store.red_book_ID }}</span>
    </div>
  </div>
</template>
<style lang="scss">
.page_foot {
  width: max(1440px, 100vw);
  background: $fill_body;
  color: $primary;
  z-index: 10;
  height: 200px;
  gap: 16px;

  .title_foot {
    font-size: 16px;
  }

  .text_foot {
    font-size: 14px;
    font-weight: 700;
  }

  .left_foot {
    width: 300px;
    height: 152px;
    gap: 8px;
    line-height: 26px;
  }

  .mid_foot {
    width: 300px;
    height: 152px;
  }

  .right_foot {
    width: 300px;
    height: 152px;
    gap: 8px;
    line-height: 22px;

  }
}
@media (max-width: 600px) {
    .topic_list_foot {
    width: calc(100vw - 20px);
    padding: 0 10px;
    height: 130px;
    gap: 8px;
    z-index: 1;
    color: $primary;
    background: $fill_body;

    .title_foot {
      font-size: 12px;
    }

    .text_foot {
      font-size: 10px;
      font-weight: 700;
    }

    .left_foot {
      width: calc((100vw - 24px)/2);
      height: auto;
      gap: 4px;
      line-height: 15px;
    }

    .mid_foot {
      width: 0;
      height: 152px;
    }

    .right_foot {
      width: calc((100vw - 24px)/2);
      height: auto;
      gap: 4px;
      line-height: 15px;
    }
  }
}
</style>