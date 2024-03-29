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
        path: '/math/:page',
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
        // if (getCookie('token')) {
        //     next()
        // } else {
            next()
        // }
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