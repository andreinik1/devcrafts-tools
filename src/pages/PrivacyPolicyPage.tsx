import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdSlot } from '../components/common/AdSlot';
import { ShieldCheck, Cookie, Lock, Globe, Mail } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Legal Compliance</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
          {t.privacy.title}
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
          {t.privacy.subtitle}
        </p>
      </div>

      <AdSlot type="banner" slotId="7788990011" />

      <div className="space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed p-6 sm:p-8 rounded-3xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm transition-colors duration-200">
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.privacy.section1Title}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{t.privacy.section1Text}</p>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800/80" />

        {/* Section 2 */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Cookie className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>{t.privacy.section2Title}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{t.privacy.section2Text}</p>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800/80" />

        {/* Section 3 */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>{t.privacy.section3Title}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{t.privacy.section3Text}</p>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800/80" />

        {/* Section 4 */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>{t.privacy.section4Title}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{t.privacy.section4Text}</p>
        </section>

        <div className="h-px bg-slate-200 dark:bg-slate-800/80" />

        {/* Section 5 */}
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{t.privacy.section5Title}</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">{t.privacy.section5Text}</p>
        </section>
      </div>
    </div>
  );
};

