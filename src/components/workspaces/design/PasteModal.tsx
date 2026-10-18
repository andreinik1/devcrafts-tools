import React from 'react';
import { X, Code2 } from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';

export interface PasteModalProps {
  isOpen: boolean;
  inputText: string;
  onChangeInput: (text: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export const PasteModal: React.FC<PasteModalProps> = ({
  isOpen,
  inputText,
  onChangeInput,
  onSubmit,
  onClose,
}) => {
  const { t } = useLanguage();
  const dw = t.designWorkspace;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-500" />
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">
              {dw.pasteModalTitle}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <textarea
          value={inputText}
          onChange={(e) => onChangeInput(e.target.value)}
          placeholder={dw.pasteModalPlaceholder}
          rows={7}
          className="w-full font-mono text-xs bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:outline-none resize-none transition-colors"
        />

        <div className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer"
          >
            {dw.cancelBtn}
          </button>
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
          >
            {dw.loadIntoCanvasBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasteModal;
