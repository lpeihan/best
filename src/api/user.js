import request from '@/utils/request';

export function getUserInfo() {
  return request({
    url: '/mock/user/info',
  });
}

export function getUserList(params) {
  return request({
    url: '/mock/user/list',
    params,
  });
}
