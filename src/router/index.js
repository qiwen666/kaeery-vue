import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const login = () => import('@/views/Login');
const user = () => import('@/views/user/index');
const article = () => import('@/views/content/article');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login',
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: 'user/register',
    children: [
      { 
        path: 'user/register',
        component: user
      },
      {
        path: 'content/article',
        component: article
      }  
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
