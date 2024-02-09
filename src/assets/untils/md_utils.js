
export const get_md_by_id = (index) => {

    const path = `/src/assets/topic_md/topic${index}.md`;
    const modules = import.meta.glob(`/src/assets/topic_md/topic${index}.md`, { eager: true });
    if (modules[path]) return modules[path].default;
    else {
      // 地址错误
      console.error("Error url is wrong path");
    }
  };