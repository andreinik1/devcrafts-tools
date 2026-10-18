import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
  maxHeight?: string;
  className?: string;
  onCopy?: () => void;
  actions?: React.ReactNode;
}

export const CodePreview: React.FC<CodePreviewProps> = ({
  code,
  language,
  title,
  maxHeight = 'max-h-64',
  className = '',
  onCopy,
  actions,
}) => {
  const { t, showToast } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    showToast(t.common.copied, 'success');
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 overflow-hidden shadow-xs ${className}`}>
      {(title || language || actions) && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            {title && <span className="font-semibold text-slate-300">{title}</span>}
            {language && (
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                {language}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {actions}
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
              title={t.common.copy}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{t.common.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t.common.copy}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <pre className={`p-4 font-mono text-xs overflow-x-auto leading-relaxed text-slate-200 ${maxHeight} scrollbar-thin`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodePreview;
