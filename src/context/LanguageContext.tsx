import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';
import { en } from '../locales/en';
import { uk } from '../locales/uk';
import { ru } from '../locales/ru';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof en;
  toastMessage: string | null;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vibedev_lang') || localStorage.getItem('devcraft_lang');
    if (saved === 'uk' || saved === 'en' || saved === 'ru') return saved as Language;
    const navLang = navigator.language.toLowerCase();
    if (navLang.startsWith('uk')) return 'uk';
    if (navLang.startsWith('ru')) return 'ru';
    return 'en';
  });

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('vibedev_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const t = language === 'ru' ? ru : language === 'uk' ? uk : en;
  const currentToast = toasts.length > 0 ? toasts[toasts.length - 1].message : null;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toastMessage: currentToast, showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-in fade-in slide-in-from-bottom-5 duration-300 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-slate-100 shadow-2xl backdrop-blur-md text-sm font-medium pointer-events-auto"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="leading-snug">{toast.message}</span>
          </div>
        ))}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

