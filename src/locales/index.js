import { createI18n } from 'vue-i18n';

import enUS from './lang/en-US';
import koKR from './lang/ko-KR';
import zhCN from './lang/zh-CN';

const defaultLang = 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages: {
    'zh-CN': { ...zhCN },
    'en-US': { ...enUS },
    'ko-KR': { ...koKR },
  },
});

export function setLocale(locale) {
  i18n.global.locale.value = locale;
}

export default i18n;
