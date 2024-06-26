<!-- @Author: LT -->
<!-- @Date: 2024-01-17 19:35:50 -->
<!-- @Description:  -->

<script setup>
const go_to = (url) => {
  window.open(url);
};
const site_data = [
  {
    collect_name: "Reference",
    site_list: [
      {
        name: "Rust",
        url: "https://doc.rust-lang.org/stable/reference/notation.html",
        img: "",
      },
      {
        name: "Rust std",
        url: "https://doc.rust-lang.org/std/all.html",
        img: "",
      },
      { name: "C++", url: "https://en.cppreference.com/w/", img: "" },
    ],
  },
  {
    collect_name: "Study",
    site_list: [
      {
        name: "Rust 语言圣经",
        url: "https://course.rs/about-book.html",
        img: "",
      },
      { name: "Learn C++", url: "https://www.learncpp.com/", img: "" },
    ],
  },
  {
    collect_name: "Repository",
    site_list: [
      { name: "create.io", url: "https://crates.io/", img: "" },
      { name: "maven", url: "https://mvnrepository.com/", img: "" },
    ],
  },
  {
    collect_name: "Practice",
    site_list: [
      { name: "leet code", url: "https://leetcode.cn/leetbook/", img: "" },
    ],
  },
];
</script>
<template>
  <div id="site_nav_main" class="r f">
    <svg class="fixed site_nav_main_bg" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="ffflurry-grad" gradientTransform="rotate(270)"><stop stop-color="transparent" stop-opacity="1" offset="0%"></stop><stop stop-color="hsl(1.4, 100%, 67%)" stop-opacity="1" offset="45%"></stop><stop stop-color="hsl(167, 52%, 78%)" stop-opacity="1" offset="100%"></stop></linearGradient></defs><rect width="100%" height="100%" fill="transparent"></rect><g fill="url(#ffflurry-grad)"><rect width="80" height="1" x="556" y="181.5" rx="0.5" transform="rotate(72, 596, 182)" opacity="0.44"></rect><rect width="311" height="1" x="140.5" y="273.5" rx="0.5" transform="rotate(72, 296, 274)" opacity="0.10"></rect><rect width="319" height="1" x="119.5" y="738.5" rx="0.5" transform="rotate(72, 279, 739)" opacity="0.98"></rect><rect width="254" height="1" x="125" y="533.5" rx="0.5" transform="rotate(72, 252, 534)" opacity="0.33"></rect><rect width="219" height="1" x="62.5" y="354.5" rx="0.5" transform="rotate(72, 172, 355)" opacity="0.16"></rect><rect width="282" height="1" x="252" y="638.5" rx="0.5" transform="rotate(72, 393, 639)" opacity="0.95"></rect><rect width="296" height="1" x="397" y="324.5" rx="0.5" transform="rotate(72, 545, 325)" opacity="0.17"></rect><rect width="147" height="1" x="650.5" y="185.5" rx="0.5" transform="rotate(72, 724, 186)" opacity="0.55"></rect><rect width="350" height="1" x="18" y="52.5" rx="0.5" transform="rotate(72, 193, 53)" opacity="0.11"></rect><rect width="122" height="1" x="316" y="141.5" rx="0.5" transform="rotate(72, 377, 142)" opacity="0.43"></rect><rect width="52" height="1" x="480" y="753.5" rx="0.5" transform="rotate(72, 506, 754)" opacity="0.96"></rect><rect width="252" height="1" x="-70" y="523.5" rx="0.5" transform="rotate(72, 56, 524)" opacity="0.97"></rect><rect width="221" height="1" x="455.5" y="520.5" rx="0.5" transform="rotate(72, 566, 521)" opacity="0.75"></rect><rect width="153" height="1" x="674.5" y="67.5" rx="0.5" transform="rotate(72, 751, 68)" opacity="0.27"></rect><rect width="176" height="1" x="374" y="41.5" rx="0.5" transform="rotate(72, 462, 42)" opacity="0.63"></rect><rect width="228" height="1" x="522" y="65.5" rx="0.5" transform="rotate(72, 636, 66)" opacity="0.08"></rect><rect width="228" height="1" x="-60" y="377.5" rx="0.5" transform="rotate(72, 54, 378)" opacity="0.68"></rect><rect width="285" height="1" x="342.5" y="180.5" rx="0.5" transform="rotate(72, 485, 181)" opacity="0.70"></rect><rect width="157" height="1" x="-6.5" y="714.5" rx="0.5" transform="rotate(72, 72, 715)" opacity="0.57"></rect><rect width="135" height="1" x="356.5" y="389.5" rx="0.5" transform="rotate(72, 424, 390)" opacity="0.68"></rect><rect width="442" height="1" x="-124" y="238.5" rx="0.5" transform="rotate(72, 97, 239)" opacity="0.73"></rect><rect width="338" height="1" x="94" y="124.5" rx="0.5" transform="rotate(72, 263, 125)" opacity="0.22"></rect><rect width="227" height="1" x="42.5" y="518.5" rx="0.5" transform="rotate(72, 156, 519)" opacity="0.96"></rect><rect width="133" height="1" x="675.5" y="440.5" rx="0.5" transform="rotate(72, 742, 441)" opacity="0.59"></rect><rect width="179" height="1" x="637.5" y="611.5" rx="0.5" transform="rotate(72, 727, 612)" opacity="0.79"></rect><rect width="143" height="1" x="-7.5" y="93.5" rx="0.5" transform="rotate(72, 64, 94)" opacity="0.51"></rect><rect width="237" height="1" x="132.5" y="418.5" rx="0.5" transform="rotate(72, 251, 419)" opacity="0.91"></rect><rect width="287" height="1" x="398.5" y="652.5" rx="0.5" transform="rotate(72, 542, 653)" opacity="0.18"></rect><rect width="218" height="1" x="247" y="511.5" rx="0.5" transform="rotate(72, 356, 512)" opacity="0.14"></rect><rect width="165" height="1" x="645.5" y="277.5" rx="0.5" transform="rotate(72, 728, 278)" opacity="0.23"></rect><rect width="203" height="1" x="589.5" y="745.5" rx="0.5" transform="rotate(72, 691, 746)" opacity="0.29"></rect><rect width="201" height="1" x="80.5" y="636.5" rx="0.5" transform="rotate(72, 181, 637)" opacity="0.97"></rect><rect width="338" height="1" x="490" y="375.5" rx="0.5" transform="rotate(72, 659, 376)" opacity="0.18"></rect></g></svg>
    <div class="site_content f f_d_c">
      <div class="site_item" v-for="item in site_data">
        <h1>{{ item.collect_name }}</h1>
        <ul class="f f_d_r">
          <li v-for="item2 in item.site_list" @click="go_to(item2.url)">
            <span class="r">
              {{ item2.name }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>

#site_nav_main {
  width: max(1440px,100vw);
  min-height: 100vh;
  background: $fill_body;   

  overflow: hidden;
  color: $text;
  @font-face {
  font-family: "misans";
  src: url("/src/assets/font/misans.ttf");
}
font-family: 'misans';
 
 
  .site_nav_main_bg{
    width: 100vw;
    height: 100vh;
    opacity: .2;
    transform: scale(2);
  stop{
    stop-color: $primary;
  }
  stop:last-child{
    stop-color: $primary_mix_6;
  }
  }
  
  .site_content {
    z-index: 2;
    width: 1100px;
    overflow: hidden;
    margin: 0px auto;
    color: $primary;
    .site_item {
      &:last-child {
        margin-bottom: 200px;
      }
      margin-left: 20px;
      ul {
        margin: 0;
        padding: 0;

        li {
          width: 30%;
          font-size: 16px;
          color: $text_link;
          font-weight: 700;
          cursor: pointer;
          span {
            &::after {
              content: "";
              position: absolute;
              bottom: 0;
              width: 100%;
              height: 2px;
              background: $text_link;
              left: 0;
            }
            &:hover {
              color: $primary;
              &::after {
                background: $primary;
              }
            }
          }
        }
      }
      &:first-child {
        margin-top: 100px;
      }
    }
  }
}
</style>
