import c_c from "@/assets/js/utils.js"

const change_theme = (current_theme) => {
    if (current_theme) {
      c_c("--math_bg_color", "#0b0e14");
      c_c("--math_bg_opacity", "0");
      c_c("--math_bg_top", "#0d1c2b");

      c_c("--math_li_bg", "#5e6d78");
      c_c("--math_li_color", "#fdffff");
      c_c("--math_com_box_bg", "#242b3d");
      c_c("--math_com_box_shadow", "#37354445");
      c_c("--condition_box", "#b5b9d6");
      // c_c("--tag_btn_color", "#2a3e4a");
      // c_c("--tag_btn_bg", "#d5e2e8");
      // c_c("--tag_choose_box_border", "#6b6b6b");
      // c_c("--tag_choose_box_bg", "#383c50");
      // c_c("--tag_item_bg", "#333547");
      // c_c("--tag_item_hover_bg", "#8d88e5");
      // c_c("--choose_top", "#a7a7a7");
      c_c("--tag_sure_btn_color", "#333547");
      c_c("--tag_sure_btn_bg", "#fff");
      c_c("--math_color", "#fdffff");
      c_c("--subject_hover_name_color", "#b5b9d6");
      c_c("--subject_name_color", "#ffff");
      c_c("--content_item_box_hover", "#1e2433");
      c_c("--content_tag_item_bg", "#8c66cb");
      c_c("--content_item_box_color", "#242b3dc7");
      c_c("--normal_color", "#ffff");
    } else {
      c_c("--math_bg_color", "#fdfbfb");
      c_c("--math_bg_opacity", "1");
      c_c("--math_bg_top", "#fdfbfb");
      c_c("--math_li_bg", "#a5e3ba");
      c_c("--math_li_color", "#ffff");
      c_c("--math_com_box_bg", "#ffff");
      c_c("--math_com_box_shadow", "#d0cfcf45");
      c_c("--condition_box", "#a5e3ba");
      // c_c("--tag_btn_color", "#146e57");
      // c_c("--tag_btn_bg", "#d5e2e8");
      // c_c("--tag_choose_box_border", "#6b6b6b");
      // c_c("--tag_choose_box_bg", "#ffffffeb");
      // c_c("--tag_item_bg", "#e3e9f0");
      // c_c("--tag_item_hover_bg", "#8d88e5");
      // c_c("--choose_top", "#a7a7a7");
      c_c("--tag_sure_btn_color", "#0ebd7d");
      c_c("--tag_sure_btn_bg", "#fff");
      c_c("--math_color", "#a5e3ba");
      c_c("--subject_hover_name_color", "#36bf36");
      c_c("--subject_name_color", "#146e57");
      c_c("--content_item_box_hover", "#e3f5de");
      c_c("--content_tag_item_bg", "#216eba");
      c_c("--content_item_box_color", "#ffff");
      c_c("--normal_color", "#4d4949");
    }
  };
    export default change_theme