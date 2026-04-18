'use client';

import { useTranslation } from 'react-i18next';

const langs = [
  { code: 'ua', label: 'UA' },
  { code: 'en', label: 'EN' },
];

export const LangSwitcher = () => {
  const { i18n } = useTranslation();

  const switchLang = (code: string) => {
    i18n.changeLanguage(code);
    document.cookie = `lang=${encodeURIComponent(code)}; path=/; max-age=31536000`;
  };

  return (
    <div className="flex items-center gap-1 border rounded-md overflow-hidden text-xs font-medium">
      {langs.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLang(code)}
          className={`px-2.5 py-1.5 transition-colors ${
            i18n.language === code
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent text-muted-foreground'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
