// 对外暴露配置的路由

export const constantRoute = [
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login'
    },
    {
        path: '/',
        component: () => import('@/views/home/index.vue')
        , name: 'layout'
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any'
    }
]