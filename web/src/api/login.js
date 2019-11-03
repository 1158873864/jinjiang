import request from '@/utils/request'

export function loginByUsername(username, password,loginType) {
  const data = {
    username,
    password,
    loginType
  }
  return request({
    url: '/api/auth/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/api/auth/info',
    method: 'get',
    params: { token }
  })
}

