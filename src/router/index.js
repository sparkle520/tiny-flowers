import { createRouter, createWebHashHistory } from 'vue-router'
import { useRoutesStore } from "../store/routes";
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
    // {
    //     path: '/unknownWorldMap/topic/1',
    //     component: () => import("/src/topic/Topic_1.vue"),
    //     meta: {
    //         isRouterAuth: false,
    //         screenFull: true,
    //     }
    // },
    // {
    //     path: '/unknownWorldMap/topic/2',
    //     component: () => import("/src/topic/Topic_2.vue"),
    //     meta: {
    //         isRouterAuth: false,
    //         screenFull: true,
    //     }
    // },
    {
        path: '/yourName',
        component: () => import("/src/views/YourName.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: false,

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
 const create_routes = async ()=> {
        for(let i = 1;i <= length();++i){
            router.addRoute({
                path: `/unknownWorldMap/topic/${i}`,
                meta: {
                    isRouterAuth: false,
                    screenFull: true,
                },
                component: () => import(`/src/topic/Topic_${i}.vue`)
            })
        }
        
}
create_routes()


export default router