import { createRouter, createWebHashHistory } from 'vue-router'
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
            index:0
        }
    },
    {
        path: '/about',
        component: () => import("/src/views/About.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:4
        }
    },
    {
        path: '/math/:page',
        component: () => import("/src/views/Math.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:2
        }
    },
    {
        path: '/math/details/:id',
        component: () => import("/src/views/MathDetails.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:5
        }
    },
    {
        path: '/note/:page',
        component: () => import("/src/views/Note.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:1
        }
    },
    {
        path: '/note/noteInfo/:id',
        component: () => import("/src/views/NoteInfo.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,            
            index:2
        }
    },
    {
        path: '/article/list/:classification/:page',
        component: () => import("/src/views/TopicList.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,            
            index:3

        }
    },
    {
        path: '/article/topic/:index',
        component: () => import("/src/topic/TopicInterface.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:4
        }
    },
    {
        path: '/note/book/:id/:index',
        component: () => import("/src/note/NoteInterface.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:3
        }
    },
    
   
  
    {
        path: '/siteNav',
        component: () => import("/src/views/SiteNav.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:5
        }
    },

   
    {
        path: '/updateLog',
        component: () => import("/src/views/UpdateLog.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
            index:6
        }
    },
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router