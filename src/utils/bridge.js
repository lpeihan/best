import { showToast } from 'vant';

import { showLoading, closeLoading } from '@/components';
import { useStore } from '@/store';
import { parseParams } from '@/utils';

const BRIDGE_NAME = 'quzanmi';
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
  IS_APP: Boolean(window[BRIDGE_NAME]),
  get userId() {
    const store = useStore();

    return store.userInfo.id;
  },
  invoke(name, params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      if (this.IS_APP === false) {
        resolve({ code: Code.Success, data: '' });
        return;
      }

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

        options.toast && showToast(res.msg || '调用失败');

        reject(res);
      };

      window[BRIDGE_NAME][name](stringifyJson(params), callbackName);
    });
  },

  /**
   * 打开App
   * @param {packageName, taskId}
   * code = 1、打开app成功；2、应用未安装；3、显示申请应用使用情况权限；
   */
  openApp(params) {
    return this.invoke('openApp', params);
  },

  /**
   *
   * @returns 微信登录
   */
  wechatAuth() {
    return this.invoke('wechatAuth');
  },

  back() {
    return this.invoke('back');
  },

  /**
   * 判断app是否下载
   */
  appInstalled(packageName) {
    return this.invoke('appInstalled', {
      packageName,
    });
  },

  /**
   * 获取剪贴板内容
   */
  getClipboardText() {
    return this.invoke('getClipboardText');
  },

  isRoot() {
    return this.invoke('isRoot');
  },

  isEmulator() {
    return this.invoke('isEmulator');
  },

  getDeviceInfo() {
    return this.invoke('getDeviceInfo');
  },

  getDeviceId() {
    return this.invoke('getDeviceId');
  },

  getAylBase({ content }) {
    return this.invoke('getAylBase', { content });
  },

  requestPermission() {
    return this.invoke('requestPermission');
  },

  getStatusBarHeight() {
    return this.invoke('getStatusBarHeight');
  },

  /**
   * 分享
   * @param {platform, shareUrl, shareImg, shareTitle, shareContent}
   * platform = 1、微信；2、朋友圈；3、QQ；4、QQ空间；5、微博；
   */
  sharePlatform({ platform, shareUrl, shareImg, shareTitle, shareContent }) {
    return this.invoke('sharePlatform', {
      platform,
      shareUrl,
      shareImg,
      shareTitle,
      shareContent,
    });
  },

  openBrowser(url) {
    return this.invoke('openBrower', { url });
  },

  openWebview({ url, show_title, title }) {
    if (this.IS_APP) {
      return this.invoke('openWebview', { url, show_title, title });
    }
    return window.open(url);
  },

  async openSchema({ url, bundle }) {
    await this.appInstalled(bundle);
    location.href = url;
  },

  toast(message) {
    window[BRIDGE_NAME].toast(message);
  },

  async getMokuGameList() {
    try {
      const res = await this.invoke('getMokuGameList', {
        userId: this.userId,
      });

      return res;
    } catch (err) {
      if (err.code === Code.RequestPermission) {
        this.requestPermission();
      }

      return Promise.reject(err);
    }
  },

  showRewardAd(callback) {
    return this.invoke(
      'showRewardAd',
      { userId: this.userId },
      {
        callback,
      },
    );
  },

  showIntersAd() {
    return this.invoke('showIntersAd');
  },

  gotoFeedsAd() {
    return this.invoke('gotoFeedsAd', { times: 3 });
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
