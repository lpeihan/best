import { defineStore } from 'pinia';
import VConsole from 'vconsole';

import { getUserInfo } from '@/api/user';
import config from '@/config';
import { clearToken } from '@/utils/auth';
import bridge from '@/utils/bridge';
import { getRealSize } from '@/utils/dom';
import storage from '@/utils/storage';

export const useStore = defineStore('store', {
  state: () => {
    return {
      userInfo: {},
      statusBarHeight: 0,
    };
  },
  getters: {
    getNavHeight: (state) => {
      return (top = 0) => state.statusBarHeight + getRealSize(top) + 'px';
    },
  },
  actions: {
    showConsole() {
      if (!config.whiteList.includes(this.userInfo.phone_number)) {
        return;
      }

      new VConsole();
      storage.setItem('showConsole', true);
    },
    async getUserInfo() {
      const res = await getUserInfo();
      this.userInfo = res.data;
    },
    async getStatusBarHeight() {
      const res = await bridge.getStatusBarHeight();

      this.statusBarHeight = res.data.height || 0;
    },
    logout() {
      clearToken();
    },
  },
});
