import { showToast } from 'vant';

import { showLoading, closeLoading } from '@/components';
import { useStore } from '@/store';
import { parseParams } from '@/utils';

const BRIDGE_NAME = 'best';
const Code = {
  Success: 1,
  RequestPermission: 201,
};

let id = 0;
function getCallbackName() {
  return 'BRIDGE_CALLBACK_' + id++;
}

function stringifyJson(data) {
  if (typeof data === 'object' || typeof data === 'number') {
    return JSON.stringify(data);
  }

  return data;
}

function parseJson(data) {
  try {
    return JSON.parse(data);
  } catch (_) {
    return data;
  }
}

const bridge = {
  isApp: () => Boolean(window[BRIDGE_NAME]),
  get userId() {
    const store = useStore();

    return store.userInfo.id;
  },
  invoke(name, params = {}, options = {}) {
    if (!this.isApp()) {
      Promise.resolve({ code: Code.Success, data: '' });
      return;
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
