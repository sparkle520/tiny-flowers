import LeftNavBar from "/src/component/LeftNavBar.vue"
import Pagination from "/src/component/Pagination.vue"
import Topic from "/src/component/TopicBox.vue"

const components = {
    LeftNavBar,
    Pagination,
    Topic,
}

const GlobalComponents = (app) => {
  Object.keys(components).forEach((key) => {
    app.component(`${key}`, components[key])
  })
}

export default GlobalComponents
