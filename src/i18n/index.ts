import { createI18n } from 'vue-i18n';
import elementEnLocale from 'element-plus/es/locale/lang/en'; // english lang
import elementZhLocale from 'element-plus/es/locale/lang/zh-cn'; // chinese lang
import zhLocale from './languages/zh-cn';
import enLocale from './languages/en';
import { Cache } from '@/utils/index';

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale,
  },
};
// type MessageSchema = typeof messages;
export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  globalInjection: true,
  locale: Cache.getLanguage() || 'zh-cn', // get selected language from cookies
  fallbackLocale: 'zh-cn',
  messages,
});
