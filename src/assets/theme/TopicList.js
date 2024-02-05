import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) =>{
    if (current_theme) {
      c_c("--bg_color", "#0b0e14");
      c_c("--color", "#f7f7f7");
      c_c("--item_bg", "#242b3dc7");
      c_c("--item_shadow", "#1f2d3d26");
      c_c("--title_color", "#f7f7f7");
      c_c("--title_af_bg", "#a3a7c1aa");
      c_c("--tag_box_bg", "#2d3041c7");
      c_c("--tag_bg", "#9fa3bc");
      c_c("--topic_classification_color", "#5e6d78");
      c_c("--topic_classification_num_color", "#b5b9d6");
  
    } else {
      c_c("--bg_color", "#f7f3f5");
      c_c("--color", "#000000");
      c_c("--item_bg", "#ffffffc7");
      c_c("--item_shadow", "#1f2d3d26");
      c_c("--title_color", "#173e6c");
      c_c("--title_af_bg", "#22113364");
      c_c("--tag_box_bg", "#dae6e7c7");
      c_c("--tag_bg", "#41a8a8");
      c_c("--topic_classification_color", "#173e6c");
      c_c("--topic_classification_num_color", "#e06530");
    }
  }

  export default change_theme