import React from 'react';
import {
  Upload,
  Eye,
  ImageIcon,
  Code2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import { formatBytes } from '../../../utils/imageConverter';
import type { ActiveAsset, CanvasBackground } from '../../../types';
import type { GlassConfig } from '../../../utils/cssShadow';

export interface CanvasHubProps {
  activeAsset: ActiveAsset | null;
  activeAssetDataUri: string;
  isDragOverCanvas: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onUploadClick: () => void;
  onOpenPasteModal: () => void;
  onLoadPreset: (preset: 'cyber' | 'shield' | 'raster') => void;
}

export const CanvasHub: React.FC<CanvasHubProps> = ({
  activeAsset,
  activeAssetDataUri,
  isDragOverCanvas,
  onDragOver,
  onDragLeave,
  onDrop,
  onUploadClick,
  onOpenPasteModal,
  onLoadPreset,
}) => {
  const { t } = useLanguage();
  const dw = t.designWorkspace;

  return (
    <div className="space-y-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
            <Sparkles className="w-7 h-7 text-cyan-500 shrink-0" />
            <span>{dw.seoTitle}</span>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            {dw.seoContent1}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-semibold border border-cyan-500/20">
            <Zap className="w-3.5 h-3.5" />
            {dw.pipelineBadge}
          </span>
        </div>
      </div>

      {/* 2. Unified Asset Bar & Dropzone */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-sm relative ${
          isDragOverCanvas
            ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
            : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Active Asset Info Block */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-checkerboard flex items-center justify-center shrink-0 shadow-inner group">
              {activeAsset ? (
                <img
                  src={activeAssetDataUri}
                  alt={activeAsset.name}
                  className="w-9 h-9 object-contain transition-transform group-hover:scale-110"
                />
              ) : (
                <ImageIcon className="w-6 h-6 text-slate-400" />
              )}
              <span
                className={`absolute bottom-0 right-0 text-[8px] font-bold px-1 rounded-tl-md uppercase tracking-wider text-white ${
                  activeAsset?.type === 'svg' ? 'bg-cyan-600' : 'bg-purple-600'
                }`}
              >
                {activeAsset?.type || 'Empty'}
              </span>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate max-w-50 sm:max-w-xs block">
                  {activeAsset?.name || dw.noAssetLoaded}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                    activeAsset?.type === 'svg'
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                      : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                  }`}
                >
                  {activeAsset?.type === 'svg' ? dw.vectorXmlBadge : dw.rasterImageBadge}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>{activeAsset ? formatBytes(activeAsset.size) : '0 B'}</span>
                <span>•</span>
                <span>{dw.dragHint}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Demo Presets Row */}
          <div className="flex flex-wrap items-center gap-2 xl:justify-end">
            <button
              type="button"
              onClick={onUploadClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{dw.uploadBtn}</span>
            </button>

            <button
              type="button"
              onClick={onOpenPasteModal}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-xs transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{dw.pasteBtn}</span>
            </button>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block mx-1" />

            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 hidden sm:inline">
              {dw.presetsLabel}
            </span>

            <button
              type="button"
              onClick={() => onLoadPreset('cyber')}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
            >
              Cyber SVG
            </button>

            <button
              type="button"
              onClick={() => onLoadPreset('shield')}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
            >
              Shield SVG
            </button>

            <button
              type="button"
              onClick={() => onLoadPreset('raster')}
              className="px-2.5 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
            >
              Raster PNG
            </button>
          </div>
        </div>

        {/* Drag Over Overlay */}
        {isDragOverCanvas && (
          <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-xs border-2 border-dashed border-cyan-500 rounded-2xl flex items-center justify-center z-20 pointer-events-none">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-xl shadow-md border border-cyan-500/50">
              {dw.dropOverlayText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export interface StageCanvasPreviewProps {
  activeAsset: ActiveAsset | null;
  activeAssetDataUri: string;
  canvasBg: CanvasBackground;
  onChangeCanvasBg: (bg: CanvasBackground) => void;
  canvasScale: number;
  onChangeCanvasScale: (scale: number) => void;
  applyShadowToCanvas: boolean;
  onToggleApplyShadow: (apply: boolean) => void;
  shadowMode: 'shadow' | 'glass';
  shadowTarget: 'contour' | 'box';
  shadowResultCss: string;
  dropShadowCss: string;
  glassConfig: GlassConfig;
  glassPadding: number;
  cleanerSavingsPercentage?: number;
  conversionSavingsPercentage?: number;
}

export const StageCanvasPreview: React.FC<StageCanvasPreviewProps> = ({
  activeAsset,
  activeAssetDataUri,
  canvasBg,
  onChangeCanvasBg,
  canvasScale,
  onChangeCanvasScale,
  applyShadowToCanvas,
  onToggleApplyShadow,
  shadowMode,
  shadowTarget,
  shadowResultCss,
  dropShadowCss,
  glassConfig,
  glassPadding,
  cleanerSavingsPercentage,
  conversionSavingsPercentage,
}) => {
  const { t } = useLanguage();
  const dw = t.designWorkspace;

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors duration-200">
      {/* Canvas Stage Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-500 shrink-0" />
          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            {dw.activeCanvasTitle}
          </span>
        </div>

        {/* Background switcher */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-lg text-xs">
          {(['glow', 'dark', 'light', 'grid'] as CanvasBackground[]).map((mode) => {
            const labelMap: Record<CanvasBackground, string> = {
              glow: dw.glowBg,
              dark: dw.darkBg,
              light: dw.lightBg,
              grid: dw.gridBg,
            };
            return (
              <button
                key={mode}
                type="button"
                onClick={() => onChangeCanvasBg(mode)}
                className={`px-2 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  canvasBg === mode
                    ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {labelMap[mode]}
              </button>
            );
          })}
        </div>
      </div>

      {/* The Stage Viewport */}
      <div
        className={`h-72 sm:h-80 rounded-xl flex items-center justify-center p-6 border border-slate-200/80 dark:border-slate-800 transition-all relative overflow-hidden ${
          canvasBg === 'glow'
            ? 'bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950'
            : canvasBg === 'dark'
            ? 'bg-slate-950'
            : canvasBg === 'light'
            ? 'bg-slate-50'
            : 'bg-checkerboard'
        }`}
      >
        {canvasBg === 'glow' && (
          <>
            <div className="absolute top-8 left-8 w-28 h-28 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          </>
        )}

        {/* Target Graphic */}
        <div
          style={{ transform: `scale(${canvasScale})` }}
          className="transition-transform duration-200 flex items-center justify-center"
        >
          {activeAsset ? (
            shadowMode === 'shadow' ? (
              shadowTarget === 'contour' && applyShadowToCanvas ? (
                <img
                  src={activeAssetDataUri}
                  alt={activeAsset.name}
                  style={{ filter: dropShadowCss }}
                  className="w-32 h-32 sm:w-36 sm:h-36 object-contain transition-all duration-200"
                />
              ) : (
                <div
                  style={
                    applyShadowToCanvas
                      ? {
                          boxShadow: shadowResultCss.replace('box-shadow: ', '').replace(';', ''),
                          backgroundColor: canvasBg === 'light' ? '#ffffff' : '#0f172a',
                        }
                      : {}
                  }
                  className="rounded-2xl p-0 transition-all duration-200 overflow-hidden"
                >
                  <img
                    src={activeAssetDataUri}
                    alt={activeAsset.name}
                    className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
                  />
                </div>
              )
            ) : (
              <div
                style={
                  applyShadowToCanvas
                    ? {
                        padding: `${glassPadding}px`,
                        backgroundColor: `rgba(${parseInt(glassConfig.bgColor.slice(1, 3), 16) || 255}, ${
                          parseInt(glassConfig.bgColor.slice(3, 5), 16) || 255
                        }, ${parseInt(glassConfig.bgColor.slice(5, 7), 16) || 255}, ${glassConfig.bgOpacity})`,
                        backdropFilter: `blur(${glassConfig.blur}px)`,
                        WebkitBackdropFilter: `blur(${glassConfig.blur}px)`,
                        border: `${glassConfig.borderWidth}px solid rgba(${
                          parseInt(glassConfig.borderColor.slice(1, 3), 16) || 255
                        }, ${parseInt(glassConfig.borderColor.slice(3, 5), 16) || 255}, ${
                          parseInt(glassConfig.borderColor.slice(5, 7), 16) || 255
                        }, ${glassConfig.borderOpacity})`,
                      }
                    : { padding: `${glassPadding}px` }
                }
                className="rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg"
              >
                <img
                  src={activeAssetDataUri}
                  alt={activeAsset.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-contain"
                />
              </div>
            )
          ) : (
            <ImageIcon className="w-16 h-16 text-slate-400" />
          )}
        </div>
      </div>

      {/* Stage Controls */}
      <div className="flex items-center justify-between pt-1 text-xs">
        <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200">
          <input
            type="checkbox"
            checked={applyShadowToCanvas}
            onChange={(e) => onToggleApplyShadow(e.target.checked)}
            className="w-3.5 h-3.5 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
          />
          <span className="font-medium text-xs">{dw.applyShadowCheckbox}</span>
        </label>

        <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          {[1, 1.25, 1.5].map((scale) => (
            <button
              key={scale}
              type="button"
              onClick={() => onChangeCanvasScale(scale)}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold cursor-pointer ${
                canvasScale === scale
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {scale}x
            </button>
          ))}
        </div>
      </div>

      {/* Pipeline Status Pill */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-600 dark:text-slate-400 font-medium">{dw.pipelineSyncLabel}</span>
        </div>
        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
          {activeAsset?.type === 'svg'
            ? cleanerSavingsPercentage !== undefined
              ? dw.svgOptimizedStatus.replace('{percent}', cleanerSavingsPercentage.toString())
              : dw.svgLoadedStatus
            : conversionSavingsPercentage !== undefined
            ? dw.webpReadyStatus.replace('{percent}', conversionSavingsPercentage.toString())
            : dw.imageLoadedStatus}
        </span>
      </div>
    </div>
  );
};

export default CanvasHub;
