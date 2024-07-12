import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';

import routes from './routes';

import { useStore } from '@/store';
import { isLogin } from '@/utils/auth';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const store = useStore();

  if (isLogin()) {
    if (!store.userInfo.id || to.meta.getUserInfo) {
      await store.getUserInfo();
    }
  } else {
    if (to.meta.auth) {
      next('/user/login');
      return;
    }
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
