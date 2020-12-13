import { constantRoutes, asyncRoutes } from '@/router';

function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.includes(role))
  } else {
    return true
  }
}

export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    // if(route.children) {
    //   route.children.filter(child => {
    //     if(child.children&&child.children[0].hidden) {
    //       console.log(child.children,'child children');
    //       // child.children = null
    //       // child.children.splice(0,1)
    //     }
    //   })  
    // }
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res;
}

const state = {
  routes: [],
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state,routes) => {
    state.routes = routes;
    state.addRoutes = constantRoutes.concat(routes);
  }
};
const actions = {
  generateRouters({ commit },roles) {
    return new Promise((resolve,reject) => {
      console.log(roles,'roles');
      let accessRoutes = [];
      if(roles.includes('管理员')) {
        accessRoutes = asyncRoutes || [];
      }else {
        accessRoutes = filterAsyncRoutes(asyncRoutes,roles);
      }
      console.log(accessRoutes,'accessRoutes');
      commit('SET_ROUTES',accessRoutes);
      resolve(accessRoutes);
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}