import NProgress from 'nprogress';
import { createRouter, createWebHistory } from 'vue-router';

import { useStore } from '@/store';
import { isLogin } from '@/utils/auth';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      index: 0,
      auth: false,
    },
    component: require('@/views/home/Home.vue').default,
  },
  {
    path: '/welfare',
    name: 'welfare',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "welfare" */ '@/views/welfare/Welfare.vue'),
  },
  {
    path: '/video',
    name: 'video',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "video" */ '@/views/video/Video.vue'),
  },
  {
    path: '/social',
    name: 'social',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "social" */ '@/views/social/Social.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "user" */ '@/views/user/User.vue'),
  },
  {
    path: '/user/settings',
    name: 'settings',
    meta: {
      index: 1,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "settings" */ '@/views/user/Settings.vue'),
  },
  {
    path: '/user/contact',
    name: 'contact',
    meta: {
      index: 1,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "contact" */ '@/views/user/Contact.vue'),
  },
  {
    path: '/user/login',
    name: 'login',
    meta: {
      index: 4,
      auth: false,
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/user/Login.vue'),
  },
  {
    path: '/user/wechat',
    name: 'wechat',
    meta: {
      index: 5,
      auth: false,
    },
    component: () => import(/* webpackChunkName: "wechat" */ '@/views/user/Wechat.vue'),
  },
  {
    path: '/user/sex',
    name: 'sex',
    meta: {
      index: 6,
      auth: false,
    },
    component: () => import(/* webpackChunkName: "sex" */ '@/views/user/Sex.vue'),
  },
  {
    path: '/user/birthday',
    name: 'birthday',
    meta: {
      index: 7,
      auth: false,
    },
    component: () => import(/* webpackChunkName: "birthday" */ '@/views/user/Birthday.vue'),
  },
  {
    path: '/share',
    name: 'share',
    meta: {
      index: 1,
      auth: true,
    },
    component: () => import(/* webpackChunkName: "share" */ '@/views/share/Share.vue'),
  },
  {
    path: '/share/records',
    name: 'shareRecords',
    meta: {
      index: 2,
      auth: true,
    },
    component: () =>
      import(/* webpackChunkName: "shareRecords" */ '@/views/share/ShareRecords.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    meta: {
      index: 5,
      auth: false,
    },
    component: () => import(/* webpackChunkName: "privacy" */ '@/views/privacy/Privacy.vue'),
  },
  {
    path: '/user-privacy',
    name: 'userPrivacy',
    meta: {
      index: 5,
      auth: false,
    },
    component: () => import(/* webpackChunkName: "privacy" */ '@/views/privacy/UserPrivacy.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, pos) {
    return pos || { x: 0, y: 0 };
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
