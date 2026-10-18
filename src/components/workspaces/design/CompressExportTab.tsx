import React from 'react';
import {
  Download,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { formatBytes, type ImageConversionResult } from '../../../utils/imageConverter';
import type { ActiveAsset } from '../../../types';

export interface CompressExportTabProps {
  activeAsset: ActiveAsset | null;
  targetFormat: 'image/webp' | 'image/png' | 'image/jpeg';
  onChangeTargetFormat: (fmt: 'image/webp' | 'image/png' | 'image/jpeg') => void;
  quality: number;
  onChangeQuality: (q: number) => void;
  conversionResult: ImageConversionResult | null;
  isConverting: boolean;
  onDownloadConverted: () => void;
  onApplyConvertedToCanvas: () => void;
}

export const CompressExportTab: React.FC<CompressExportTabProps> = ({
  activeAsset,
  targetFormat,
  onChangeTargetFormat,
  quality,
  onChangeQuality,
  conversionResult,
  isConverting,
  onDownloadConverted,
  onApplyConvertedToCanvas,
}) => {
  const { t } = useLanguage();
  const dw = t.designWorkspace;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors duration-200">
      <div>
        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-cyan-500" />
          <span>{dw.formatOptimizationTitle}</span>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          {activeAsset?.type === 'svg'
            ? dw.formatOptimizationSvgDesc
            : dw.formatOptimizationRasterDesc}
        </p>
      </div>

      {/* Target Format Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {dw.targetFormatLabel}
        </label>
        <div className="flex items-center gap-2">
          {(['image/webp', 'image/png', 'image/jpeg'] as const).map((fmt) => {
            const ext = fmt === 'image/webp' ? 'WebP' : fmt === 'image/png' ? 'PNG' : 'JPEG';
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => onChangeTargetFormat(fmt)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  targetFormat === fmt
                    ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80'
                }`}
              >
                {ext}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quality Slider (for lossy formats) */}
      {targetFormat !== 'image/png' && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-700 dark:text-slate-300 font-medium">
            <span>{dw.qualityLabel}</span>
            <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{quality}%</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            value={quality}
            onChange={(e) => onChangeQuality(Number(e.target.value))}
            className="w-full accent-cyan-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
          />
        </div>
      )}

      {/* File Size Comparison Cards */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-500 dark:text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
            {dw.sourceFileLabel}
          </span>
          <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm mt-1 block">
            {activeAsset ? formatBytes(activeAsset.size) : '0 B'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <span className="text-emerald-700 dark:text-emerald-400 block text-[10px] uppercase font-bold tracking-wider">
            {dw.convertedFileLabel} (
            {conversionResult ? `-${conversionResult.savingsPercentage}%` : '...'})
          </span>
          <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-1 block">
            {isConverting
              ? 'Converting...'
              : conversionResult
              ? formatBytes(conversionResult.convertedSize)
              : '0 B'}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          disabled={!conversionResult || isConverting}
          onClick={onDownloadConverted}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition-all shadow-sm cursor-pointer disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{dw.downloadConvertedBtn}</span>
        </button>

        <button
          type="button"
          disabled={!conversionResult || isConverting}
          onClick={onApplyConvertedToCanvas}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all border border-slate-200 dark:border-slate-700 cursor-pointer disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
          <span>{dw.promoteToCanvasBtn}</span>
        </button>
      </div>
    </div>
  );
};

export default CompressExportTab;
