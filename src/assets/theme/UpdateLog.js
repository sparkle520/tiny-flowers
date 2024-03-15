import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) => {
    if (current_theme) {
      c_c("--bg_color", "#0d1c2b");
      c_c("--color", "#f7f3f5");
      c_c("--li", "#242b3d12");
      c_c("--li_shadow", "#242b34");
      c_c("--striking_title_orange_color", "#f7f3f5");
      c_c("--striking_title_orange_bg", "#f7f3f5");
    } else {
      c_c("--bg_color", "#fdfbfb");
      c_c("--color", "#000000");
      c_c("--li", "#ffffff89");
      c_c("--li_shadow", "#f4f2f2");
      c_c("--striking_title_orange_color", "#f0681e");
      c_c("--striking_title_orange_bg", "#ff7b005b");
    }
  }

export default change_theme