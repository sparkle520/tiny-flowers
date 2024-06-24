import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) =>{
    if (current_theme) {
      c_c("--topic_bg_color", "#0b0e14");
      c_c("--topic_bg_top", "#0d1c2b");
      c_c("--topic_list_bg", "#0b0e14");
      c_c("--color", "#f7f7f7");
      c_c("--item_bg", "#242b3dc7");
      c_c("--item_shadow", "#1f2d3d26");
      c_c("--title_color", "#f7f7f7");
      c_c("--title_af_bg", "#a3a7c1aa");
      c_c("--tag_box_bg", "#2d3041c7");
      c_c("--tag_bg", "#9fa3bc");
      c_c("--topic_classification_color", "#5e6d78");
      c_c("--topic_classification_num_color", "#b5b9d6");
      c_c("--filter_search_box_bg", "#123");
      c_c("--tag_item_bg", "#242b3dc7");
      c_c("--layout_hover", "#0b0e14");

  
    } else {
      c_c("--topic_bg_color", "#fdfbfb");
      c_c("--topic_bg_top", "#fdfbfb");
      c_c("--topic_list_bg", "#e8f6f9");
      c_c("--color", "#393e46");
      c_c("--item_bg", "#ffffffc7");
      c_c("--item_shadow", "#1f2d3d26");
      c_c("--title_color", "#3a4a5a");
      c_c("--title_af_bg", "#22113364");
      c_c("--tag_box_bg", "#9966ff33");
      c_c("--tag_bg", "#9966ff");
      c_c("--topic_classification_color", "#ff6666");
      c_c("--topic_classification_num_color", "#9966ff");
      c_c("--filter_search_box_bg", "#ffff");
      c_c("--tag_item_bg", "#f5f5f5");
      c_c("--layout_hover", "#f1e5ff");
    }
  }

  export default change_theme