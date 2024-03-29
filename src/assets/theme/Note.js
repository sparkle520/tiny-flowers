import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) =>{
    if (current_theme) {
        c_c("--note_bg_color", "#0b0e14");
        c_c("--note_bg_opacity", "0");
        c_c("--note_bg_top", "#0d1c2b");
        c_c("--box_bg", "#242b3d");
        c_c("--note_book_box_title_color", "#b5b9d6");
        c_c("--re_note_item_bg", "#b5b9d6");
        c_c("--text_area_color", "#f7f7f7");
        c_c("--text_area_before_bg", "#5e6d78");
        c_c("--text_area_after_bg", "#9fa3bc");
        c_c("--filter_search_box_color", "#f7f7f7");
        c_c("--filter_search_box_hover_color", "#5e6d78");
        c_c("--book_name_color", "#b5b9d6");
        c_c("--book_name_hover_color", "#d5b3ff");
        c_c("--short_message_color", "#9fa3bc");
        c_c("--book_update_time_color", "#a09090");
        c_c("--load_status_color", "#0ebd7d");
        c_c("--finished_status_color", "#32cdcd");
        c_c("--foot_bg", "#242b3d");
        c_c("--img_shadow", "transparent");
        c_c("--search_box_color", "#ffff");

  
    } else {

      c_c("--note_bg_color", "#fdfbfb");
      c_c("--note_bg_opacity", ".05");
      c_c("--note_bg_top", "#fdfbfb");
      c_c("--box_bg", "#ffff");
      c_c("--note_book_box_title_color", "#e96969");
      c_c("--re_note_item_bg", "#d3010130");
      c_c("--text_area_color", "#ffffe2");
      c_c("--text_area_before_bg", "#f0681e");
      c_c("--text_area_after_bg", "#d90a29");
      c_c("--filter_search_box_color", "#726c65");
      c_c("--filter_search_box_hover_color", "#fa2121");
      c_c("--book_name_color", "#ffb3c5");
      c_c("--book_name_hover_color", "#d5b3ff");
      c_c("--short_message_color", "#cca3cc");
      c_c("--book_update_time_color", "#a09090");
      c_c("--load_status_color", "#0ebd7d");
      c_c("--finished_status_color", "#32cdcd");
      c_c("--foot_bg", "#fdfbfb");
      c_c("--img_shadow", "#d3010130");
      c_c("--search_box_color", "#4d4949");
    }
  }

  export default change_theme