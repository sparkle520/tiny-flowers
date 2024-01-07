import {createRouter, createWebHashHistory} from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
    {
    path: '/',
    component: Home,
    alias: '/home',
    meta: {
        isRouterAuth:false,
    }
},
    {
    path: '/aboutMe',
    component:() => import("/src/views/AboutMe.vue"),
    meta: {
        isRouterAuth:false,

    }
},
    {
    path: '/unknownWorldMap',
    component:() => import("/src/views/UnknownWorldMap.vue"),
    meta: {
        isRouterAuth:false,

    }
},
    {
    path: '/unknownWorldMap/topic/1',
    component:() => import("/src/topic/Topic_1.vue"),
    meta: {
        isRouterAuth:false,

    }
},
    {
    path: '/messageBoard',
    component:() => import("/src/views/MessageBoard.vue"),
    meta: {
        isRouterAuth:false,

    }
},
    {
    path: '/updateLog',
    component:() => import("/src/views/UpdateLog.vue"),
    meta: {
        isRouterAuth:false,

    }
},
]



const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
router.beforeEach((to,from,next)=>{
    if(to.meta.isRouterAuth){    
        if(getCookie('token')){  
            next()  
        }else{
            next('/sparkle/login') 
        }
    }else{ 
        next()
    }
})
export default router
