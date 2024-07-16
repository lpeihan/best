import { Locale } from 'vant';
import { createI18n } from 'vue-i18n';

import zhCN from './lang/zh-CN';

import storage from '@/utils/storage';

const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US', 'ko-KR'];
const DEFAULT_LANG = 'zh-CN';

const i18n = createI18n({
  legacy: false,
  locale: DEFAULT_LANG,
  fallbackLocale: DEFAULT_LANG,
  messages: {
    'zh-CN': { ...zhCN },
    'en-US': {},
    'ko-KR': {},
  },
});

async function loadLocaleMessages(locale) {
  if (!SUPPORTED_LANGUAGES.includes(locale)) {
    locale = DEFAULT_LANG;
  }

  return await import(`./lang/${locale}`);
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

  Locale.use(locale, vantLocales[locale] || vantLocales['zh-CN']);
}

function initializeLocale() {
  const storageLocale = storage.getItem('locale') || DEFAULT_LANG;
  setLocale(storageLocale);
}

initializeLocale();

export default i18n;
