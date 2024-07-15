import { createI18n } from 'vue-i18n';

import enUS from './lang/en_US.json';
import koKR from './lang/ko_KR.json';
import zhCN from './lang/zh_CN.json';

const DEFAULT_LOCALE = 'zh_CN';

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LOCALE,
  fallbackLocale: DEFAULT_LOCALE,
  messages: {
    zh_CN: { ...zhCN },
    en_US: { ...enUS },
    ko_KR: { ...koKR },
  },
});

export function setLocale(locale) {
  i18n.global.locale.value = locale;
}

export default i18n;
