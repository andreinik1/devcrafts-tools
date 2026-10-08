import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles } from 'lucide-react';

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

  const isDevPlaceholder = true; // In production with real script, AdSense injects ins tag

  const layoutStyles = {
    banner: 'w-full h-24 sm:h-28 my-6',
    sidebar: 'w-full h-64 sm:h-80 my-4',
    'in-article': 'w-full h-32 sm:h-36 my-8',
  }[type];

  return (
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
  );
};

