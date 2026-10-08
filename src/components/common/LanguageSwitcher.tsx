import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';
import type { Language } from '../../types';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'uk', label: 'UKR' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <div className="flex items-center gap-0.5 bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300 dark:border-slate-800 rounded-xl p-1">
      <div className="pl-2 pr-1 text-slate-500 dark:text-slate-400">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-0.5">
        {languages.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                isSelected
                  ? 'bg-white dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-slate-300 dark:border-cyan-500/40 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-800/60'
              }`}
            >
              {lang.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

