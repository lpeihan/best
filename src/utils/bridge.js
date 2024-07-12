import { showToast } from 'vant';

import { showLoading, closeLoading } from '@/components';
import { parseParams } from '@/utils';

const BRIDGE_NAME = 'best';
const Code = {
  Success: 1,
  RequestPermission: 201,
};

let id = 0;
const getCallbackName = () => `BRIDGE_CALLBACK_${id++}`;

const stringifyJson = (data) =>
  typeof data === 'object' || typeof data === 'number' ? JSON.stringify(data) : data;

const parseJson = (data) => {
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error('JSON parsing error:', e);
    return data;
  }
};

const bridge = {
  isApp: () => Boolean(window[BRIDGE_NAME]),
  invoke(name, params = {}, options = {}) {
    if (this.isApp() === false) {
      return Promise.resolve({ code: Code.Success, data: '' });
    }

    return new Promise((resolve, reject) => {
      if (options.loading) {
        showLoading();
      }

      const callbackName = getCallbackName();

      window[callbackName] = function (res) {
        closeLoading();
        res.data = parseJson(res.data);

        if (options.callback) {
          options.callback(res);
          return;
        }

        if (res.code === Code.Success) {
          resolve(res);
          return;
        }

        options.toast && showToast(res.msg || '客户端接口调用失败');

        reject(res);
      };

      window[BRIDGE_NAME][name](stringifyJson(params), callbackName);
    });
  },

  getStatusBarHeight() {
    return this.invoke('getStatusBarHeight');
  },

  nativeRequest({ method, url, data, params = {}, headers = {} }) {
    const requestParams = {
      requestType: method || 'get',
      url: url + parseParams(params),
      params: data || '',
      headerJson: JSON.stringify({
        ...headers,
      }),
    };

    return this.invoke('httpRequest', requestParams);
  },
};

export default bridge;
