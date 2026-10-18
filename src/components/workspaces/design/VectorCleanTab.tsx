import React from 'react';
import {
  Wrench,
  Copy,
  Check,
  Download,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { formatBytes } from '../../../utils/imageConverter';
import type { ActiveAsset } from '../../../types';
import type { SvgCleanerOptions, SvgCleanerResult } from '../../../utils/svgCleaner';

export interface VectorCleanTabProps {
  activeAsset: ActiveAsset | null;
  cleanerResult: SvgCleanerResult | null;
  cleanerOptions: SvgCleanerOptions;
  onChangeOptions: (opts: SvgCleanerOptions) => void;
  outputTab: 'clean' | 'dataUri' | 'react';
  onChangeOutputTab: (tab: 'clean' | 'dataUri' | 'react') => void;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  onDownloadFile: (content: string, filename: string, mime: string) => void;
  onApplyCleanedToCanvas: () => void;
  onProceedToDepth: () => void;
  onLoadSampleSvg: () => void;
}

export const VectorCleanTab: React.FC<VectorCleanTabProps> = ({
  activeAsset,
  cleanerResult,
  cleanerOptions,
  onChangeOptions,
  outputTab,
  onChangeOutputTab,
  copiedKey,
  onCopy,
  onDownloadFile,
  onApplyCleanedToCanvas,
  onProceedToDepth,
  onLoadSampleSvg,
}) => {
  const { t } = useLanguage();
  const dw = t.designWorkspace;

  if (activeAsset?.type !== 'svg') {
    return (
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-3">
        <div className="flex items-center gap-2 font-bold text-sm text-amber-700 dark:text-amber-300">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{dw.rasterWarningTitle} ({activeAsset?.name})</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          {dw.rasterWarningDesc}
        </p>
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={onLoadSampleSvg}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
          >
            {dw.loadSampleSvgBtn}
          </button>
          <button
            type="button"
            onClick={onProceedToDepth}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            {dw.goToDepthBtn}
          </button>
        </div>
      </div>
    );
  }

  if (!cleanerResult) return null;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-colors duration-200">
      {/* Metric Summary Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-500" />
            <span>{dw.cleanerHeaderTitle}</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {dw.cleanerHeaderDesc}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right text-xs">
            <span className="text-slate-500 dark:text-slate-400 block text-[10px]">{dw.cleanedSizeLabel}</span>
            <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
              {formatBytes(cleanerResult.cleanedSize)}
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-lg text-xs font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            -{cleanerResult.savingsPercentage}%
          </span>
        </div>
      </div>

      {/* Cleaner Options Checkboxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <label className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={cleanerOptions.removeComments}
            onChange={(e) => onChangeOptions({ ...cleanerOptions, removeComments: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{t.svgCleanerTool.removeComments}</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={cleanerOptions.removeMetadata}
            onChange={(e) => onChangeOptions({ ...cleanerOptions, removeMetadata: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{t.svgCleanerTool.removeMetadata}</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={cleanerOptions.removeDimensions}
            onChange={(e) => onChangeOptions({ ...cleanerOptions, removeDimensions: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{t.svgCleanerTool.removeDimensions}</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={cleanerOptions.camelCaseAttrs}
            onChange={(e) => onChangeOptions({ ...cleanerOptions, camelCaseAttrs: e.target.checked })}
            className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{t.svgCleanerTool.camelCaseAttrs}</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={cleanerOptions.prettifyCode}
            onChange={(e) => onChangeOptions({ ...cleanerOptions, prettifyCode: e.target.checked, minifyCode: false })}
            className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{t.svgCleanerTool.prettifyCode}</span>
        </label>

        <label className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/60 cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
          <input
            type="checkbox"
            checked={cleanerOptions.minifyCode}
            onChange={(e) => onChangeOptions({ ...cleanerOptions, minifyCode: e.target.checked, prettifyCode: false })}
            className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="text-slate-700 dark:text-slate-300 font-medium">{t.svgCleanerTool.minifyCode}</span>
        </label>
      </div>

      {/* Output Sub-Tabs */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => onChangeOutputTab('clean')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                outputTab === 'clean'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Clean SVG XML
            </button>
            <button
              type="button"
              onClick={() => onChangeOutputTab('react')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                outputTab === 'react'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              React TSX / JSX
            </button>
            <button
              type="button"
              onClick={() => onChangeOutputTab('dataUri')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                outputTab === 'dataUri'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Data URI
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const code =
                  outputTab === 'clean'
                    ? cleanerResult.cleanedSvg
                    : outputTab === 'react'
                    ? cleanerResult.reactComponent
                    : cleanerResult.dataUri;
                onCopy(code, `svg-out-${outputTab}`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80"
            >
              {copiedKey === `svg-out-${outputTab}` ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-500">{t.common.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{dw.copyCodeBtn}</span>
                </>
              )}
            </button>

            {outputTab === 'clean' && (
              <button
                type="button"
                onClick={() => onDownloadFile(cleanerResult.cleanedSvg, activeAsset.name, 'image/svg+xml')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{dw.downloadCodeBtn}</span>
              </button>
            )}
          </div>
        </div>

        {/* Code Content Box with terminal styling that is readable in both themes */}
        <pre className="p-3.5 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-48 border border-slate-800 leading-relaxed scrollbar-thin">
          <code>
            {outputTab === 'clean'
              ? cleanerResult.cleanedSvg
              : outputTab === 'react'
              ? cleanerResult.reactComponent
              : cleanerResult.dataUri}
          </code>
        </pre>
      </div>

      {/* Pipeline Inter-Tool Actions */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onApplyCleanedToCanvas}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
        >
          <Check className="w-4 h-4" />
          <span>{dw.updateCanvasWithCleanedBtn}</span>
        </button>

        <button
          type="button"
          onClick={onProceedToDepth}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold text-xs transition-all border border-cyan-500/30 cursor-pointer"
        >
          <span>{dw.proceedToDepthBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default VectorCleanTab;
