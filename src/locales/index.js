import { createI18n } from 'vue-i18n';

import enUS from './lang/en-US.json';
import zhCN from './lang/zh-CN.json';

const DEFAULT_LOCALE = 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    'zh-CN': { ...zhCN },
    'en-US': { ...enUS },
  },
});

export function setLocale(locale) {
  i18n.global.locale.value = locale;
}

export default i18n;
