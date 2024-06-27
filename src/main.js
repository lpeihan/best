import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '@/App.vue';
import directives from '@/directives';
import i18n from '@/locales';
import router from '@/router';

import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import 'vant/es/image-preview/style';

import '@/styles/index.less';

window.env = process.env;

const bootstrap = () => {
  const pinia = createPinia();
  const app = createApp(App);

  app.use(i18n).use(pinia).use(router).use(directives).mount('#app');
};

bootstrap();
