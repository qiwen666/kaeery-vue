import axios from 'axios';
import store from '@/store'
import { getToken } from '@/utils/cookie';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

// request interceptor
instance.interceptors.request.use((config) => {
  if(getToken()) {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
  }
  return config
},error => {
  return Promise.reject(error);
})


// response interceptor
instance.interceptors.response.use(response => {
  return response;
},error => {
  return Promise.reject(error);
})

export default instance