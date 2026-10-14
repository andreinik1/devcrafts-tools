import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface AdSlotProps {
  type?: 'banner' | 'sidebar' | 'in-article';
  clientId?: string;
  slotId?: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  type = 'banner',
  clientId = 'ca-pub-XXXXXXXXXXXXXXXX',
  slotId = '1234567890',
  className = '',
}) => {
  const { t } = useLanguage();

  const location = useLocation();
  const ww = true;

  const isDevPlaceholder = true;

  const layoutStyles = {
    banner: 'w-full h-24 sm:h-28 my-6',
    sidebar: 'w-full h-64 sm:h-80 my-4',
    'in-article': 'w-full h-32 sm:h-36 my-8',
  }[type];

  return (ww ? (
    <div className={`w-full my-6 p-6 rounded-xl border border-white/10
    bg-linear-to-r from-white/3 to-white/1 backdrop-blur-sm 
    flex items-center justify-between gap-4 text-center
    sm:text-left transition-all hover:border-white/20
    ${location.pathname === '/contact' ? 'flex-col' : 'flex-col sm:flex-row'}
    `}
    >
      <div className="space-y-1">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#f792fc] animate-pulse"></span>
          <span className="text-xs font-medium tracking-wider uppercase text-white/60">
            Developer Space <br />
            {location.pathname}
          </span>
        </div>
        <h4 className="text-sm font-semibold text-white">
          Support VibeDev Tools 🚀
        </h4>
        <p className="text-xs text-white/50 max-w-md">
          Fast, 100% client-side utilities built to speed up your daily frontend workflow. Clean code, zero backend tracking.
        </p>
      </div>

      <a
        href="https://github.com/andreinik1"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 text-xs font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/10 shrink-0"
      >
        Star on GitHub / Sponsor →
      </a>
    </div>
  ) : (
    <div
      className={`relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/40 backdrop-blur-md flex flex-col items-center justify-center p-4 transition-all hover:border-slate-300 dark:hover:border-slate-700/60 shadow-sm ${layoutStyles} ${className}`}
    >
      <div className="absolute top-2 right-3 flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase text-slate-500 dark:text-slate-500 bg-slate-100 dark:bg-slate-950/80 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800">
        <Sparkles className="w-2.5 h-2.5 text-cyan-500 dark:text-cyan-400/80" />
        <span>{t.common.adsLabel}</span>
      </div>

      {isDevPlaceholder ? (
        <div className="text-center px-4">
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 mb-1">
            {t.common.sponsoredSlot}
          </div>
          <div className="text-[11px] text-slate-400 dark:text-slate-600 font-mono">
            AdSense ID: {clientId} | Slot: {slotId}
          </div>
        </div>
      ) : (
        /* Google AdSense Script Integration Tag */
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%', height: '100%' }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      )}
    </div>
  )

  )
};

