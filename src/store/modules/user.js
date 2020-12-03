import { login, getBaseInfo} from '@/request/api';
import { setToken } from '@/utils/cookie';

const state = {
  token: '',
  name: '',
  roles: []
};

const mutations = {
  SET_TOKEN: (state,token) => {
    state.token = token;
  },
  SET_NAME: (state,name) => {
    state.name = name;
  },
  SET_ROLES: (state,roles) => {
    state.roles = roles;
  }
};

const actions = {
  // user login
  Login({ commit },userInfo) {
    return new Promise((resolve,reject) => {
      login(userInfo).then(res => {
        const { access_token } = res.data;
        commit('SET_TOKEN',access_token);
        setToken(access_token);
        resolve();
      }).catch(err =>{
        console.log(err);
        reject(err);
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve,reject) => {
      getBaseInfo().then(res => {
        console.log(res,'user info');
        const { roles, username } = res.data;
        commit('SET_NAME',username);
        commit('SET_ROLES',roles);
        resolve(res)
      }).catch(err=> {
        reject(err);
      })
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
}