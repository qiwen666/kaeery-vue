import request from './ajax';

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getBaseInfo(token) {
  return request({
    url: '/user/profile',
    method: 'post',
    params: token
  })
}

export function getUserList() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

