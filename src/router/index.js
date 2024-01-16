import { createRouter, createWebHashHistory } from 'vue-router'
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
        path: '/aboutMe',
        component: () => import("/src/views/AboutMe.vue"),
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
        path: '/math',
        component: () => import("/src/views/Math.vue"),
        meta: {
            isRouterAuth: false,
            screenFull: false,

        }
    },
    {
        path: '/math/solution',
        component: () => import("/src/MathSolution/T.vue"),
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
            next('/sparkle/login')
        }
    } else {
        next()
    }
})
export default router