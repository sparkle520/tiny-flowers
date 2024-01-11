import LeftNavBar from "/src/component/LeftNavBar.vue"
import Pagination from "/src/component/Pagination.vue"
import Topic from "/src/component/TopicBox.vue"
import Carousel from "/src/component/Carousel.vue"
import MusicPlayer from "/src/component/MusicPlayer.vue"

const components = {
    LeftNavBar,
    Pagination,
    Topic,
    Carousel,
    MusicPlayer,
}

const GlobalComponents = (app) => {
  Object.keys(components).forEach((key) => {
    app.component(`${key}`, components[key])
  })
}

export default GlobalComponents
