import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-lg p-1">
      <div className="pl-2 pr-1 text-slate-400">
        <Globe className="w-3.5 h-3.5" />
      </div>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
          language === 'en'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage('uk')}
        className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
          language === 'uk'
            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shadow-sm'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
      >
        UKR
      </button>
    </div>
  );
};
