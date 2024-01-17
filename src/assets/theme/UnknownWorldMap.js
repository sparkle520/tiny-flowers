import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) => {
    if (current_theme) {
      //night
      c_c("--bg_color", "#1e2433");
      c_c("--color", "#e3eae1");
      c_c("--p", "#e3eae1");
      c_c("--decorate_bg_1", "#e3eae1");
      c_c("--decorate_bg_2", "#e3eae1");
      c_c("--decorate_bg_3", "#ffff");
      c_c("--item_bg", "#242b3d");   
      c_c("--item_shadow", "#242b34");
      c_c("--item_color", "#f0e6e4");
      c_c("--item_bf_bg", "#d2c3d522");
      c_c("--item_af_bg", "#94709b");
    } else {
      c_c("--bg_color", "#f7f3f5");
      c_c("--color", "#262220");
      c_c("--p", "#705547");
      c_c("--decorate_bg_1", "#f0681e");
      c_c("--decorate_bg_2", "#ed8262");
      c_c("--decorate_bg_3", "#f89d8a");
      c_c("--item_bg", "#fffbf9");
      c_c("--item_shadow", "#ff7b005b");
      c_c("--item_color", "#f0681e");
      c_c("--item_bf_bg", "#4d678233");
      c_c("--item_af_bg", "#99d0d9");
    }
  }

export default change_theme