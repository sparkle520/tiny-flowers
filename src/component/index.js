import LeftNavBar from "/src/component/LeftNavBar.vue"
import Pagination from "/src/component/Pagination.vue"
import Topic from "/src/component/TopicBox.vue"
import Carousel from "/src/component/Carousel.vue"
import MusicPlayer from "/src/component/MusicPlayer.vue"
import TopNavBar from "/src/component/TopNavBar.vue"
import Utils from "/src/component/Utils.vue"
const components = {
    LeftNavBar,
    Pagination,
    TopNavBar,
    Topic,
    Carousel,
    MusicPlayer,
    Utils,
}

const GlobalComponents = (app) => {
  Object.keys(components).forEach((key) => {
    app.component(`${key}`, components[key])
  })
}

export default GlobalComponents
