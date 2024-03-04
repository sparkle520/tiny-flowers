import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) =>{
    if (current_theme) {
        c_c("--note_info_main_bg", "#0b0e14");
        c_c("--note_top_mid_box_h1_color", "#ffff");
        c_c("--read_btn_color", "#fff");
        c_c("--read_btn_bg", "#2d3041");
        c_c("--foot_bg", "#242b3d");
    } else {

      c_c("--note_info_main_bg", "#fdfbfb");
      c_c("--note_top_mid_box_h1_color", "#ffff");
      c_c("--read_btn_color", "#ec3755");
      c_c("--read_btn_bg", "#ffff");
      c_c("--foot_bg", "#e96969");
     
    }
  }

  export default change_theme