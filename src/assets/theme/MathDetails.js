import c_c from "@/assets/js/utils.js"

const change_theme = (current_theme) => {
  if (current_theme) {
    c_c("--topic_content_bg", "#242837");
    c_c("--topic_bg", "#1e2433");
    c_c("--math_details_main_bg", "#0b0e14");
    c_c("--math_details_main_bg_opacity", "0");
    c_c("--cover_bg", "#53505071");
    c_c("--question_bank_box_bg", "#242b3d");
    c_c("--question_bank_header_border", "#242b3d");
    c_c("--question_bank_li_border", "#242b3d");
    c_c("--question_bank_li_color", "#ffff");
    c_c("--question_bank_li_active_bg", "#0b0e14");
    c_c("--question_bank_li_hover_bg", "#0b0e14");
    c_c("--btn_bg", "#242b3db0");
    c_c("--hint_color", "#868484");
    c_c("--hint_box_shadow", "#86848466");
    c_c("--hint_box_bg", "#fdfdfd");
    c_c("--right_bg", "#0b0e14");
    c_c("--show_btn_bg", "#b6bbbe");
    c_c("--resize_bg", "#999999");
    c_c("--right_bottom_top_box_bg", "#dcdddf");
    c_c("--right_top_top_box_bg", "#849bae");
    c_c("--normal_color", "#f7f3f5");
    c_c("--code_bg", "#123");
    c_c("--h_color", "#c4c3d4");
    c_c("--blockquote_color", "#f7f3f5");
    c_c("--blockquote_border", "#ffff");
    c_c("--blockquote_bg", "#1e2433");
  } else {
    c_c("--topic_content_bg", "#ffff");
    c_c("--topic_bg", "#fdfbfb");
    c_c("--math_details_main_bg", "#fdfbfb");
    c_c("--math_details_main_bg_opacity", "1");
    c_c("--cover_bg", "#53505071");
    c_c("--question_bank_box_bg", "#ffff");
    c_c("--question_bank_header_border", "#e5e5e5");
    c_c("--question_bank_li_border", "#e6e6e6");
    c_c("--question_bank_li_color", "#4d4949");
    c_c("--question_bank_li_active_bg", "#e7e7e7");
    c_c("--question_bank_li_hover_bg", "#e7e7e7b0");
    c_c("--btn_bg", "#ebebeb");
    c_c("--hint_color", "#868484");
    c_c("--hint_box_shadow", "#86848466");
    c_c("--hint_box_bg", "#fdfdfd");
    c_c("--right_bg", "#f3f3f3");
    c_c("--show_btn_bg", "#b6bbbe");
    c_c("--resize_bg", "#999999");
    c_c("--right_bottom_top_box_bg", "#dcdddf");
    c_c("--right_top_top_box_bg", "#849bae");
    c_c("--normal_color", "#4d4949");
    c_c("--code_bg", "#f6f8fa");
    c_c("--h_color", "#ff7f50");
    c_c("--blockquote_color", "#ff7300");
    c_c("--blockquote_border", "#fcb378");
    c_c("--blockquote_bg", "#faebd78c");
  }
};
export default change_theme