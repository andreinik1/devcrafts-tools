import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdSlot } from '../components/common/AdSlot';
import { Shield, Zap, Terminal, Code2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono">
          <Terminal className="w-3.5 h-3.5" />
          <span>{t.about.title}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {t.about.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t.about.subtitle}
        </p>
      </div>

      <AdSlot type="banner" slotId="8899001122" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors duration-200">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-500 dark:text-cyan-400 w-fit">
            <Zap className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t.about.missionTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.missionDesc}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors duration-200">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 w-fit">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t.about.privacyTitle}</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.about.privacyDesc}
          </p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-white/80 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors duration-200">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t.about.stackTitle}</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {t.about.stackDesc}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {['React 19', 'Vite 6', 'TypeScript', 'Tailwind CSS v4', 'Lucide React', '100% SPA Client'].map(
            (tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-700 dark:text-slate-300"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

