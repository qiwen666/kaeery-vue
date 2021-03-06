import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import routerView from '@/views/permission/routerview.vue' //云盘转路由页面

const flag = true;
const login = () => import('@/views/Login');
const user = () => import('@/views/user/index');
const role = () => import('@/views/user/role/index');
const createRole = () => import('@/views/user/role/createRole');
const article = () => import('@/views/content/article');
const system = () => import('@/views/system/index');
const manger = () => import('@/views/permission/manger');
const setRole = () => import('@/views/permission/role');

Vue.use(VueRouter)

export const constantRoutes = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/home',
    component: Home,
    redirect: '/user',
    name: '首页',
    children: [
      { 
        path: '/user',
        component: user
      }
    ],
    hidden: true
  },
]

export const asyncRoutes = [
  {
    path: '/user',
    component: Home,
    name: '用户管理',
    redirect: 'register',
    meta: {
      role: ['财务人员'],
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'register',
        component: user,
        name: '注册用户',
        meta: {
          role: ['财务人员'],
        },
      },
      {
        path: 'role',
        component: role,
        name: '角色设置',
        meta: {
          role: ['财务人员'],
        },
        children: [
          {
            path: 'create',
            name: '添加角色',
            component: createRole,
            meta: {
              role: ['财务人员'],
            }
          }
        ]
      }
    ]
  },
  {
    path: '/content',
    component: Home,
    name: '内容管理',
    meta: {
      role: ['管理员'],
      icon: 'el-icon-document-copy',
    },
    children: [
      {
        path: 'article',
        component: article,
        name: '文章管理',
        meta: {
          role: ['管理员'],
        }
      }
    ]
  },
  {
    path: 'systemInfo',
    component: Home,
    name: '系统管理',
    children: [
      {
        path: '/system',
        component: system,
        name: '系统管理',
        meta: {
          role: ['财务人员'],
          icon: 'el-icon-setting',
        }
      }
    ]
  },
  {
    path: '/qualityInfo',
    component: Home,
    name: '权限管理',
    redirect: 'manger',
    meta: {
      role: ['财务人员'],
      icon: 'el-icon-user'
    },
    children: [
      {
        path: 'manger',
        component: manger,
        name: '后台管理员',
        meta: {
          role: ['财务人员'],
          icon: 'el-icon-setting',
        }
      },
      {
        path: 'role',
        component: setRole,
        name: '角色设置',
        meta: {
          role: ['财务人员'],
          icon: 'el-icon-setting',
        },
        // children: [
        //   {
        //     path: 'add',
        //     component: manger,
        //     hidden: true
        //   }
        // ]
      }

    ],

  },
]

const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

export default router
