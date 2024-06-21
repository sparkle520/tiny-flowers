import Pagination from "/src/component/Pagination.vue"
import TopNavBar from "/src/component/TopNavBar.vue"
import Utils from "/src/component/Utils.vue"
import DirectoryList from "/src/component/DirectoryList.vue"
import NoteDirectoryList from "/src/component/NoteDirectoryList.vue"
import TopicBottomInterface from "/src/topic_interface/TopicBottomInterface.vue"
import TopicRightInterface from "/src/topic_interface/TopicRightInterface.vue"
import TopicLeftInterface from "/src/topic_interface/TopicLeftInterface.vue"
import TopicTopInterface from "/src/topic_interface/TopicTopInterface.vue"
import TopicBgInterface from "/src/topic_interface/TopicBgInterface.vue"
const components = {
    Pagination,
    TopNavBar,
    Utils,
    DirectoryList,
    NoteDirectoryList,
    TopicBottomInterface,
    TopicRightInterface,
    TopicLeftInterface,
    TopicTopInterface,
    TopicBgInterface,
}

const GlobalComponents = (app) => {
  Object.keys(components).forEach((key) => {
    app.component(`${key}`, components[key])
  })
}

export default GlobalComponents
