import { isLogin } from './utils/auth';

import router from '@/router';

export default {
  install(app) {
    app.directive('auth', {
      mounted(el, binding) {
        el.addEventListener('click', () => {
          if (isLogin()) {
            binding.value();
            return;
          }

          router.push('/user/login');
        });
      },
    });

    app.directive('preventReClick', {
      mounted(el, binding) {
        el.addEventListener('click', () => {
          if (el.disabled) {
            return;
          }

          el.disabled = true;
          setTimeout(() => {
            el.disabled = false;
          }, binding.value || 3000);
        });
      },
    });
  },
};
