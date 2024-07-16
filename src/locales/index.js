import { Locale } from 'vant';
import { createI18n } from 'vue-i18n';

import zhCN from './lang/zh-CN';

import storage from '@/utils/storage';

const defaultLang = 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages: {
    'zh-CN': { ...zhCN },
    'en-US': {},
    'ko-KR': {},
  },
});

async function loadLocaleMessages(locale) {
  switch (locale) {
    case 'zh-CN':
      return await import('./lang/zh-CN');
    case 'en-US':
      return await import('./lang/en-US');
    case 'ko-KR':
      return await import('./lang/ko-KR');
    default:
      return await import('./lang/zh-CN');
  }
}

export async function setLocale(locale) {
  const messages = await loadLocaleMessages(locale);

  i18n.global.setLocaleMessage(locale, messages.default);
  i18n.global.locale.value = locale;

  setVantLocale(locale);
  storage.setItem('locale', locale);
}

export function setVantLocale(locale) {
  const vantLocales = {
    'zh-CN': require('vant/es/locale/lang/zh-CN').default,
    'en-US': require('vant/es/locale/lang/en-US').default,
    'ko-KR': require('vant/es/locale/lang/ko-KR').default,
  };

  Locale.use(locale, vantLocales[locale]);
}

function initializeLocale() {
  const storageLocale = storage.getItem('locale') || defaultLang;
  setLocale(storageLocale);
}

initializeLocale();

export default i18n;
