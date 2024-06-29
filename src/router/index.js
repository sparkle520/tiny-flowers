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
        path: '/math/:tag/:page',
        component: () => import("/src/views/Math.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/math/details/:id',
        component: () => import("/src/views/MathDetails.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/note/:page',
        component: () => import("/src/views/Note.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/note/noteInfo/:id',
        component: () => import("/src/views/NoteInfo.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,            
        }
    },
    {
        path: '/article/list/:classification/:page',
        component: () => import("/src/views/TopicList.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,            
        }
    },
    {
        path: '/article/topic/:index',
        component: () => import("/src/topic/TopicInterface.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: true,
        }
    },
    {
        path: '/note/book/:id/:index',
        component: () => import("/src/note/NoteInterface.vue"),
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