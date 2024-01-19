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
      c_c("--directory_list_cover_bg", "#b5b9d6");
    
    } else {
      c_c("--topic_content_bg", "#f7f3f5");
      c_c("--topic_bg", "#e1e4ea");
      c_c("--normal_color", "#0f1828");
      c_c("--topic_title_color", "#173e6c");
      c_c("--topic_title_af_bg", "#22113364");
      c_c("--topic_time_bar_color", "#989e6a");
      c_c("--topic_time_color", "#5d6e4a");
      c_c("--directory_list_cover_bg", "#e06530");
    
  
    }
  }

  // 获取目录的标题
  export function getTitles() {
    let titles = [];
    let levels = ["h1", "h2", "h3"];

    let articleElement = document.querySelector('.topic_text');
    if (!articleElement) {
        return titles;
    }

    let elements = Array.from(articleElement.querySelectorAll("*"));
    // 调整标签等级
    let tagNames = new Set(
        elements.map((el) => el.tagName.toLowerCase())
    );
    for (let i = levels.length - 1; i >= 0; i--) {
        if (!tagNames.has(levels[i])) {
            levels.splice(i, 1);
        }
    }

    let serialNumbers = levels.map(() => 0);
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        let tagName = element.tagName.toLowerCase();
        let level = levels.indexOf(tagName);
        if (level == -1) continue;

        let id = tagName + "-" + element.innerText + "-" + i;
        let node = {
            id,
            level,
            parent: null,
            children: [],
            rawName: element.innerText,
            scrollTop: element.offsetTop,
        };

        if (titles.length > 0) {
            let lastNode = titles.at(-1);

            // 遇到子标题
            if (lastNode.level < node.level) {
                node.parent = lastNode;
                lastNode.children.push(node);
            }
            // 遇到上一级标题
            else if (lastNode.level > node.level) {
                serialNumbers.fill(0, level + 1);
                let parent = lastNode.parent;
                while (parent) {
                    if (parent.level < node.level) {
                        parent.children.push(node);
                        node.parent = parent;
                        break;
                    }
                    parent = parent.parent;
                }
            }
            // 遇到平级
            else if (lastNode.parent) {
                node.parent = lastNode.parent;
                lastNode.parent.children.push(node);
            }
        }

        serialNumbers[level] += 1;
        let serialNumber = serialNumbers.slice(0, level + 1).join(".");

        node.isVisible = node.parent == null;
        node.name = serialNumber + ". " + element.innerText;
        titles.push(node);
    }
    return titles;
}


export const change_layout = (flag) => {
  const topic_content = document.querySelector(".topic_content");
  if (flag) {
    topic_content.style.width = "60vw";
    topic_content.style.margin = " 20px 30px 80px calc(10vw - 10px)";
    // show_personal_info.value = true;
  } else {
    topic_content.style.width = "80vw";
    // show_personal_info.value = false;
  }
};