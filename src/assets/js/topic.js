import '/src/assets/css/topic.scss'
import '/src/assets/css/code.scss'

export const c_c = (mut_val, color) => {
  document.getElementsByTagName("body")[0].style.setProperty(mut_val, color);
};
export const change_theme = (current_theme) => {
  if (current_theme) {
    //night
    c_c("--topic_content_bg", "#242837");
    c_c("--topic_bg", "#1e2433");
    c_c("--normal_color", "#f7f3f5");
    c_c("--directory_list_cover_bg", "#b5b9d6");
    c_c("--code_bg", "#123");
    c_c("--h_color", "#c4c3d4");
    c_c("--blockquote_color", "#f7f3f5");
    c_c("--blockquote_border", "#ffff");
    c_c("--blockquote_bg", "#1e2433");
  } else {
    c_c("--topic_content_bg", "#ffff");
    c_c("--topic_bg", "#fdfbfb");
    c_c("--normal_color", "#4d4949");
    c_c("--directory_list_cover_bg", "#e96969");
    c_c("--code_bg", "#f6f8fa");
    c_c("--h_color", "rgb(239, 112, 96)");
    c_c("--blockquote_color", "#686870");
    c_c("--blockquote_border", "rgb(239, 112, 96)");
    c_c("--blockquote_bg", "rgb(239, 112, 96)");
  }
  change_code_theme(current_theme)

}
//code theme
const change_code_theme = (current_theme) => {
  if (current_theme) {
    //night
    c_c("--hljs_color", "#c9d1d9");
    c_c("--hljs_bg", "#0d1117");
    c_c("--hljs_variable_color", "#ff7b72");
    c_c("--hljs_class_color", "#d2a8ff");
    c_c("--hljs_operator_color", "#79c0ff");
    c_c("--hljs_string_color", "#a5d6ff");
    c_c("--hljs_symbol", "#ffa657");
    c_c("--hljs_formula", "#8b949e");
    c_c("--hljs_quote", "#7ee787");
    c_c("--hljs_subst", "#c9d1d9");
    c_c("--hljs_section", "#1f6feb");
    c_c("--hljs_bullet", "#f2cc60");
    c_c("--hljs_emphasis", "#c9d1d9");
    c_c("--hljs_addition_color", "#aff5b4");
    c_c("--hljs_addition_bg", "#033a16");
    c_c("--hljs_deletion_color", "#ffdcd7");
    c_c("--hljs_deletion_bg", "#67060c");
  } else {
    c_c("--hljs_color", "#123");
    c_c("--hljs_bg", "#ffffff");
    c_c("--hljs_variable_color", "#d73a49");
    c_c("--hljs_class_color", "#6f42c1");
    c_c("--hljs_operator_color", "#005cc5");
    c_c("--hljs_string_color", "#032f62");
    c_c("--hljs_symbol", "#e36209");
    c_c("--hljs_formula", "#6a737d");
    c_c("--hljs_quote", "#22863a");
    c_c("--hljs_subst", "#123");
    c_c("--hljs_section", "#005cc5");
    c_c("--hljs_bullet", "#735c0f");
    c_c("--hljs_emphasis", "#24292e");
    c_c("--hljs_addition_color", "#22863a");
    c_c("--hljs_addition_bg", "#f0fff4");
    c_c("--hljs_deletion_color", "#b31d28");
    c_c("--hljs_deletion_bg", "#ffeef0");
    c_c("--color-fg-default", "#ffeef0");
  }
}
export const options = {
  background: {
    color: {
      value: 'transparent',
    },
  },
  fpsLimit: 120,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push',
      },
      onHover: {
        enable: false,
        mode: 'repulse',
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: '#b399ff',
    },
    links: {
      color: '#30d5c8',
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outMode: 'bounce',
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        area: 800,
      },
      value: 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: 'circle',
    },
    size: {
      random: true,
      value: 5,
    },
  },
  detectRetina: true,
}


export const change_layout = (flag) => {
  const topic_content = document.querySelector(".topic_content");
  if (flag) {
    topic_content.style.width = "60vw";
  } else {
    topic_content.style.width = "80vw";
  }
};

export const select_by_id = (arr, id) => {
  if (arr.length == 0) return -1;
  let l = 0;
  let r = arr.length;
  while (l < r) {
    let mid = l + Math.floor((r - l) / 2);
    if (arr[mid].id == id) return arr[mid];
    else if (arr[mid].id > id) l = mid + 1;
    else r = mid;
  }
  return -1;
};