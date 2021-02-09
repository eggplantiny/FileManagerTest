import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/pages/index'

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: Home.name,
            component: Home
        }
    ]
})


export default router
