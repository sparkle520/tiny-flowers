import { createRouter, createWebHashHistory } from 'vue-router'
import { useRoutesStore } from "../store/routes";
import { defineAsyncComponent } from 'vue';
import {length} from "/src/assets/config/data"
import Home from '../views/Home.vue'
const routes = [
    {
        path: '/',
        component: Home,
        alias: '/home',
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/about',
        component: () => import("/src/views/About.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,

        }
    },
    {
        path: '/test',
        component: () => import("/src/views/Test.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: false,

        }
    },
    {
        path: '/unknownWorldMap',
        component: () => import("/src/views/UnknownWorldMap.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,

        }
    },
    {
        path: '/unknownWorldMap/list/:classification/:page',
        component: () => import("/src/views/TopicList.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: false,

        }
    },
    {
        path: '/unknownWorldMap/topic/1',
        component: () => import("/src/topic/Topic_1.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/unknownWorldMap/topic/2',
        component: () => import("/src/topic/Topic_2.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/unknownWorldMap/topic/3',
        component: () => import("/src/topic/Topic_3.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/unknownWorldMap/topic/4',
        component: () => import("/src/topic/Topic_4.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
  
    {
        path: '/siteNav',
        component: () => import("/src/views/SiteNav.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,

        }
    },
    {
        path: '/game/2048',
        component: () => import("/src/game/Game2048.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,

        }
    },
   
    {
        path: '/updateLog',
        component: () => import("/src/views/UpdateLog.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    if (to.meta.isRouterAuth) {
        if (getCookie('token')) {
            next()
        } else {
            next()
        }
    } else {
        next()
    }
})
//  const create_routes = async ()=> {
//     const modules = import.meta.glob('../topic/*.vue')
//         const components = import.meta.globEager('../topic/*.vue')
      

//         for(let i = 1;i <= length();++i){
//             router.addRoute({
//                 path: `/unknownWorldMap/topic/${i}`,
//                 meta: {
//                     isRouterAuth: false,
//                     screenFull: true,
//                 },
//                 component: defineAsyncComponent(modules[`/src/topic/Topic_${i}.vue`])
//             })
//         }
        
// }
// create_routes()


export default router