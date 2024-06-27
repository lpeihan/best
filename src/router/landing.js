import { createRouter, createWebHistory } from 'vue-router';

import { isMobile } from '@/utils/dom';

const getComp = () => {
  return isMobile()
    ? require('@/views/landing/Mobile.vue').default
    : require('@/views/landing/PC.vue').default;
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: getComp(),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: () => '/',
    component: getComp(),
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
  next();
});

export default router;
