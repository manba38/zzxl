import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';


// 对外暴露配置的路
export const constantRoute = [
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true,
            icon: "Promotion"
        }

    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: ""
        },
        redirect: '/home',

        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: "HomeFilled"
                }
            }

        ]
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete'

        }
    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            hidden: false,
            title: '数据大屏',
            icon: 'Platform'
        }
    },
    {
        path: '/acl',
        component: () => import('@/layout/index.vue'),
        name: 'Acl1',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'Lock'
        },
        redirect: '/acl/user',
        children: [
            {
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'Acl',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'User'
                }
            }, {
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'UserFilled'
                }
            }, {
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '权限管理',
                    hidden: false,
                    icon: 'Monitor'
                }
            }
        ]
    },
    {
        path: '/product',
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            icon: "Goods",
            hidden: false,

        },
        redirect: '/product/trademark',
        children: [
            {
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    icon: "ShoppingCartFull",
                    hidden: false
                },
            },
            {
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    icon: "ChromeFilled",
                    hidden: false
                },
            },
            {
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'Spu管理',
                    icon: "Calendar",
                    hidden: false
                },
            },
            {
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'Sku管理',
                    icon: "Orange",
                    hidden: false
                },
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'DocumentDelete'
        }
    }
]