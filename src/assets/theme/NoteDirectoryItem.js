import c_c from "@/assets/js/utils.js"
const change_theme = (current_theme) => {
    if (current_theme) {
      c_c("--note_directory_item_main_color", "#ffff");
      c_c("--note_directory_item_main_hover_color", "#9fa3bc");
     
    } else {
      c_c("--note_directory_item_main_color", "#4d4949");
      c_c("--note_directory_item_main_hover_color", "#e96969");
    
    }
  };
  export default change_theme