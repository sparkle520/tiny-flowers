import { reactive, toRefs, ref, onBeforeMount, onMounted ,watch} from "vue";
import { useRouter } from "vue-router";
import TopicTitle from '/src/component/TopicTitle.vue'
import {change_theme} from '/src/assets/js/topic.js'
import { useConfigStore } from "../store/config";
import {change_layout} from '/src/assets/js/topic.js'

import { storeToRefs } from "pinia";