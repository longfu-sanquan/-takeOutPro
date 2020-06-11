import Vue from 'vue'
import Vuerouter from 'vue-router'
import logon from '../pages/logon'
import { api_token } from '../api/apis'
Vue.use(Vuerouter);



const router = new Vuerouter({
    routes: [
        {
            path: '/',
            name: "logon",
            component: logon
        },
        {
            path: '/index',
            name: 'index',
            component: () => import('../pages/index'),
            children: [
                {
                    path: '/index/home',
                    name: 'home',
                    component: () => import('../pages/index/home'),
                    meta: ["后台首页"]
                },
                {
                    path: '/index/order',
                    name: 'order',
                    component: () => import('../pages/index/order'),
                    meta: ["订单管理"]
                },
                {
                    path: '/index/shoplist',
                    name: 'shoplist',
                    component: () => import('../pages/index/shoplist'),
                    meta: ["商品管理", "商品列表"]
                },
                {
                    path: '/index/shopsort',
                    name: 'shopsort',
                    component: () => import('../pages/index/shopsort'),
                    meta: ["商品管理", "商品分类"]
                },
                {
                    path: '/index/shopadd',
                    name: 'shopadd',
                    component: () => import('../pages/index/shopadd'),
                    meta: ["商品管理", "商品添加"]
                },
                {
                    path: '/index/storerun',
                    name: 'storerun',
                    component: () => import('../pages/index/storerun'),
                    meta: ["店铺管理"]
                },
                {
                    path: '/index/accountlist',
                    name: 'accountlist',
                    component: () => import('../pages/index/accountlist'),
                    meta: ["账号管理", "账号列表"]
                },
                {
                    path: '/index/addaccount',
                    name: 'addaccount',
                    component: () => import('../pages/index/addaccount'),
                    meta: ["账号管理", "添加账号"]
                },
                {
                    path: '/index/setpwd',
                    name: 'setpwd',
                    component: () => import('../pages/index/setpwd'),
                    meta: ["账号管理", "修改密码"]
                },
                {
                    path: '/index/myself',
                    name: 'myself',
                    component: () => import('../pages/index/myself'),
                    meta: ["账号管理", "个人中心"]
                },
                {
                    path: '/index/StatisticsGoods',
                    name: 'StatisticsGoods',
                    component: () => import('../pages/index/StatisticsGoods'),
                    meta: ["账号管理", "个人中心"]
                },
                {
                    path: '/index/StatisticsOrder',
                    name: 'StatisticsOrder',
                    component: () => import('../pages/index/StatisticsOrder'),
                    meta: ["账号管理", "个人中心"]
                },
            ]
        },

    ]


})
router.beforeEach((to, from, next) => {
    //to:要进入的对象
    //form：从哪里进入
    //next 放行
    if (to.path != '/') {
        api_token(localStorage.getItem("token")).then(res => {
            if (res.data.code == 0) {
                next()//放行
            } else {
                next("/")
            }
        })
    } else {
        next()
    }
})

export default router