import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) =>{
    if (current_theme) {
        c_c("--note_info_main_bg", "#0b0e14");
        c_c("--note_top_mid_box_h1_color", "#ffff");
        c_c("--note_top_mid_box_color", "#ffff");
        c_c("--read_btn_color", "#fff");
        c_c("--read_btn_bg", "#b5b9d6");
        c_c("--foot_bg", "#0b0e14");
    } else {

      c_c("--note_info_main_bg", "#fdfbfb");
      c_c("--note_top_mid_box_h1_color", "#9966ff");
      c_c("--note_top_mid_box_color", "#aaaaaa");
      c_c("--read_btn_color", "#9966ff");
      c_c("--read_btn_bg", "#ffff");
      c_c("--foot_bg", "#9966ff");
     
    }
  }

  export default change_theme