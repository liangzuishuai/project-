import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
import About from '@/components/About'
import Login from '@/components/Login'
import Integral from '@/components/Integral'
import Member from '@/views/Member'

Vue.use(Router)

export default new Router({
    mode: "hash",
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/Goods',
            name: 'Goods',
            component: Goods
        },
        {
            path: '/About',
            name: 'About',
            component: About,
            meta: { keepAlive: true }
        },
        {
            path: '/Integral',
            name: 'Integral',
            component: Integral
        },
        {
            path: '/Member',
            name: 'Member',
            component: Member
        }
    ]
})