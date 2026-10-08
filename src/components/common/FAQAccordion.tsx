import React, { useState } from 'react';
import type { FAQItem } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/30 p-6 sm:p-8 backdrop-blur-md shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/80">
        <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-500 dark:text-purple-400">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
          {t.common.faqTitle}
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/40 overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleItem(index)}
                className="w-full text-left px-5 py-4 flex items-center justify-between gap-4 text-slate-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 font-medium text-sm sm:text-base focus:outline-none cursor-pointer"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-cyan-600 dark:text-cyan-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-200 dark:border-slate-800/40 animate-in fade-in duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

