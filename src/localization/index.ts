import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './lang/en';
import ua from './lang/ua';

i18n.use(initReactI18next).init({
  resources: { ua, en },
  lng: 'ua', // always start with ua — client will sync from cookie after mount
  fallbackLng: 'ua',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
