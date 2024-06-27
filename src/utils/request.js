import axios from 'axios';
import { showToast } from 'vant';

import { showLoading, closeLoading } from '@/components';
import { getToken, clearToken } from '@/utils/auth';
import { HttpCode } from '@/utils/constants';

let loadCount = 0;

const request = axios.create({
  timeout: 20000,
  // baseURL: process.env.API_URL,

  loading: false,
  toast: true,
});

request.interceptors.request.use(
  (config) => {
    if (getToken()) {
      config.headers['token'] = getToken();
    }

    if (config.loading && ++loadCount > 0) {
      showLoading();
    }

    return config;
  },
  (err) => {
    Promise.reject(err);
  },
);

request.interceptors.response.use(
  (res) => {
    const { config, data } = res;

    if (config.loading && --loadCount <= 0) {
      closeLoading();
    }

    if (data.code === HttpCode.Success) {
      return data;
    }

    if (data.code === HttpCode.Unauthorized) {
      clearToken();

      setTimeout(() => {
        location.reload();
      }, 1000);
      return;
    }

    config.toast && showToast(data.message || '当前服务器繁忙，请稍后再试');

    return Promise.reject(data);
  },
  (err) => {
    const { config } = err;

    if (config.loading && --loadCount <= 0) {
      closeLoading();
    }

    config.toast && showToast(err.message || '当前服务器繁忙，请稍后再试。');

    return Promise.reject(err);
  },
);

export default request;
