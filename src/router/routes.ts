import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
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
    component: () => import('@/views/welfare/Welfare.vue'),
  },
  {
    path: '/video',
    name: 'video',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import('@/views/video/Video.vue'),
  },
  {
    path: '/social',
    name: 'social',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import('@/views/social/Social.vue'),
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      index: 0,
      auth: true,
    },
    component: () => import('@/views/user/User.vue'),
  },
  {
    path: '/user/settings',
    name: 'settings',
    meta: {
      index: 1,
      auth: true,
    },
    component: () => import('@/views/user/Settings.vue'),
  },
  {
    path: '/user/contact',
    name: 'contact',
    meta: {
      index: 1,
      auth: true,
    },
    component: () => import('@/views/user/Contact.vue'),
  },
  {
    path: '/user/login',
    name: 'login',
    meta: {
      index: 2,
      auth: false,
    },
    component: () => import('@/views/user/Login.vue'),
  },
  {
    path: '/user/wechat',
    name: 'wechat',
    meta: {
      index: 2,
      auth: false,
    },
    component: () => import('@/views/user/Wechat.vue'),
  },
  {
    path: '/user/sex',
    name: 'sex',
    meta: {
      index: 2,
      auth: false,
    },
    component: () => import('@/views/user/Sex.vue'),
  },
  {
    path: '/user/birthday',
    name: 'birthday',
    meta: {
      index: 2,
      auth: false,
    },
    component: () => import('@/views/user/Birthday.vue'),
  },
  {
    path: '/share',
    name: 'share',
    meta: {
      index: 1,
      auth: true,
    },
    component: () => import('@/views/share/Share.vue'),
  },
  {
    path: '/share/records',
    name: 'shareRecords',
    meta: {
      index: 2,
      auth: true,
    },
    component: () => import('@/views/share/ShareRecords.vue'),
  },
  {
    path: '/privacy',
    name: 'privacy',
    meta: {
      index: 2,
      auth: false,
    },
    component: () => import('@/views/privacy/Privacy.vue'),
  },
  {
    path: '/userPrivacy',
    name: 'userPrivacy',
    meta: {
      index: 2,
      auth: false,
    },
    component: () => import('@/views/privacy/UserPrivacy.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: () => '/',
  },
];

export default routes;
