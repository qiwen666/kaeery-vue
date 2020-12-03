import router from './router';
import store from './store';
import { getToken } from '@/utils/cookie';

const whiteList = ['/login'];

router.beforeEach(async(to, from ,next) => {
  if(getToken()) {
    if(to.path === '/login') {
      console.log('不走');
      next({path: '/'})
    }else {
      if(store.getters.roles.length === 0){
        console.log('走');
        console.log(to.path,'to path');
        const res = await store.dispatch('user/getInfo');
        const roles = res.data.roles.map(item => item.roleName); 
        const accessRoutes = await store.dispatch('permission/generateRouters',roles)
        router.options.routes = store.getters.addRoutes;
        console.log(router.options.routes,'--------');
        router.addRoutes(accessRoutes);
        localStorage.setItem('menus',JSON.stringify(router.options.routes))
        next({...to,replace: true})
        if(to.path === '/') {
          router.push({
            path: router.options.routes[2].path + '/' + router.options.routes[2].redirect
          })
          return false;
        }else {
          router.push({
            path: to.path
          })
          return false;
        }
      }else {
        next();
      }
    }
  }else {
    if(whiteList.indexOf(to.path) !== -1) {
      next()
    }else {
      next('/login');
    }
  }
})

export default router