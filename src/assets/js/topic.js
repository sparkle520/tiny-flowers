import '/src/assets/css/topic.scss'

export const c_c = (mut_val, color) => {
    document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
  };
  export const change_theme = (current_theme) => {
    if (current_theme) {
      //night
      c_c("--topic_content_bg", "#242837");
      c_c("--topic_bg", "#1e2433");
      c_c("--normal_color", "#f7f3f5");
      c_c("--topic_title_color", "#c4c3d4");
      c_c("--topic_title_af_bg", "#22113364");
      c_c("--topic_time_bar_color", "#c4c3d4");
      c_c("--topic_time_color", "#c4c3d4");
    
    } else {
      c_c("--topic_content_bg", "#f7f3f5");
      c_c("--topic_bg", "#e1e4ea");
      c_c("--normal_color", "#0f1828");
      c_c("--topic_title_color", "#173e6c");
      c_c("--topic_title_af_bg", "#22113364");
      c_c("--topic_time_bar_color", "#989e6a");
      c_c("--topic_time_color", "#5d6e4a");
    
  
    }
  }
  