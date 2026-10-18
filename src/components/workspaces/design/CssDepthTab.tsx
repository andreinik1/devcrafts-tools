import React from 'react';
import {
  Layers,
  Sparkles,
  Copy,
  Check,
  Download,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../../context/LanguageContext';
import {
  SHADOW_PRESETS,
  GLASS_PRESETS,
  type ShadowConfig,
  type GlassConfig,
} from '../../../utils/cssShadow';

export interface CssDepthTabProps {
  shadowMode: 'shadow' | 'glass';
  onChangeShadowMode: (mode: 'shadow' | 'glass') => void;
  shadowTarget: 'contour' | 'box';
  onChangeShadowTarget: (target: 'contour' | 'box') => void;
  glassPadding: number;
  onChangeGlassPadding: (pad: number) => void;
  shadowConfig: ShadowConfig;
  onChangeShadowConfig: (cfg: ShadowConfig) => void;
  glassConfig: GlassConfig;
  onChangeGlassConfig: (cfg: GlassConfig) => void;
  shadowCodeTab: 'css' | 'tailwind' | 'jsx';
  onChangeShadowCodeTab: (tab: 'css' | 'tailwind' | 'jsx') => void;
  shadowResultCss: string;
  shadowResultTailwind: string;
  dropShadowCss: string;
  dropShadowTailwind: string;
  glassResultCss: string;
  glassResultTailwind: string;
  copiedKey: string | null;
  onCopy: (text: string, key: string) => void;
  isBakingShadow: boolean;
  onBakeAndDownloadPng: () => void;
  onBakeAndPushToPipeline: () => void;
  onProceedToExport: () => void;
}

export const CssDepthTab: React.FC<CssDepthTabProps> = ({
  shadowMode,
  onChangeShadowMode,
  shadowTarget,
  onChangeShadowTarget,
  glassPadding,
  onChangeGlassPadding,
  shadowConfig,
  onChangeShadowConfig,
  glassConfig,
  onChangeGlassConfig,
  shadowCodeTab,
  onChangeShadowCodeTab,
  shadowResultCss,
  shadowResultTailwind,
  dropShadowCss,
  dropShadowTailwind,
  glassResultCss,
  glassResultTailwind,
  copiedKey,
  onCopy,
  isBakingShadow,
  onBakeAndDownloadPng,
  onBakeAndPushToPipeline,
  onProceedToExport,
}) => {
  const { t } = useLanguage();
  const dw = t.designWorkspace;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5 transition-colors duration-200">
      {/* Mode Switcher */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => onChangeShadowMode('shadow')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              shadowMode === 'shadow'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t.cssShadowTool.modeShadow}</span>
          </button>
          <button
            type="button"
            onClick={() => onChangeShadowMode('glass')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              shadowMode === 'glass'
                ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.cssShadowTool.modeGlass}</span>
          </button>
        </div>

        {/* Quick Presets Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mr-1">
            {t.cssShadowTool.presetLabel}
          </span>
          {shadowMode === 'shadow'
            ? SHADOW_PRESETS.slice(0, 4).map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onChangeShadowConfig({ ...shadowConfig, ...p.config })}
                  className="px-2 py-1 text-[11px] rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
                >
                  {p.name}
                </button>
              ))
            : GLASS_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => onChangeGlassConfig({ ...glassConfig, ...p.config })}
                  className="px-2 py-1 text-[11px] rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-cyan-500/10 hover:text-cyan-600 dark:hover:text-cyan-400 text-slate-700 dark:text-slate-300 font-medium transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-700/60"
                >
                  {p.name}
                </button>
              ))}
        </div>
      </div>

      {/* SHADOW CONTROLS */}
      {shadowMode === 'shadow' ? (
        <div className="space-y-4">
          {/* Shadow Target Silhouette vs Tight Box */}
          <div className="p-3.5 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                {dw.shadowTargetLabel}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {shadowTarget === 'contour'
                  ? dw.shadowTypeContour
                  : dw.shadowTypeBox}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shrink-0">
              <button
                type="button"
                onClick={() => onChangeShadowTarget('contour')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  shadowTarget === 'contour'
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Drop-Shadow
              </button>
              <button
                type="button"
                onClick={() => onChangeShadowTarget('box')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  shadowTarget === 'box'
                    ? 'bg-cyan-500 text-slate-950 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Box-Shadow
              </button>
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Offset X */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.offsetX}</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{shadowConfig.offsetX}px</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={shadowConfig.offsetX}
                onChange={(e) => onChangeShadowConfig({ ...shadowConfig, offsetX: Number(e.target.value) })}
                className="w-full accent-cyan-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Offset Y */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.offsetY}</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{shadowConfig.offsetY}px</span>
              </div>
              <input
                type="range"
                min={-50}
                max={50}
                value={shadowConfig.offsetY}
                onChange={(e) => onChangeShadowConfig({ ...shadowConfig, offsetY: Number(e.target.value) })}
                className="w-full accent-cyan-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Blur Radius */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.blurRadius}</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">{shadowConfig.blur}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={shadowConfig.blur}
                onChange={(e) => onChangeShadowConfig({ ...shadowConfig, blur: Number(e.target.value) })}
                className="w-full accent-cyan-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Opacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>Opacity</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">
                  {Math.round(shadowConfig.opacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={shadowConfig.opacity}
                onChange={(e) => onChangeShadowConfig({ ...shadowConfig, opacity: Number(e.target.value) })}
                className="w-full accent-cyan-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Color Picker & Inset */}
            <div className="sm:col-span-2 flex items-center justify-between gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={shadowConfig.color}
                  onChange={(e) => onChangeShadowConfig({ ...shadowConfig, color: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-700 p-0 bg-transparent"
                />
                <span className="font-mono text-slate-700 dark:text-slate-300 text-xs uppercase">{shadowConfig.color}</span>
              </div>

              {shadowTarget === 'box' && (
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={shadowConfig.inset}
                    onChange={(e) => onChangeShadowConfig({ ...shadowConfig, inset: e.target.checked })}
                    className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 accent-cyan-500"
                  />
                  <span>{t.cssShadowTool.insetShadow}</span>
                </label>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* GLASS CONTROLS */
        <div className="space-y-4">
          {/* Glass Padding Frame Selector */}
          <div className="p-3.5 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-bold text-xs text-slate-900 dark:text-slate-100 block">
                {dw.glassPaddingLabel}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                {glassPadding <= 10 ? dw.tightPadding : dw.balancedPadding}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shrink-0">
              <button
                type="button"
                onClick={() => onChangeGlassPadding(8)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  glassPadding === 8
                    ? 'bg-purple-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                8px
              </button>
              <button
                type="button"
                onClick={() => onChangeGlassPadding(16)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                  glassPadding === 16
                    ? 'bg-purple-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                16px
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Background Opacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.glassBgOpacity}</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">
                  {Math.round(glassConfig.bgOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0.05}
                max={0.9}
                step={0.05}
                value={glassConfig.bgOpacity}
                onChange={(e) => onChangeGlassConfig({ ...glassConfig, bgOpacity: Number(e.target.value) })}
                className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Backdrop Blur */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.glassBlur}</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">{glassConfig.blur}px</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                value={glassConfig.blur}
                onChange={(e) => onChangeGlassConfig({ ...glassConfig, blur: Number(e.target.value) })}
                className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Border Opacity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.glassBorderOpacity}</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">
                  {Math.round(glassConfig.borderOpacity * 100)}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={glassConfig.borderOpacity}
                onChange={(e) => onChangeGlassConfig({ ...glassConfig, borderOpacity: Number(e.target.value) })}
                className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>

            {/* Border Width */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-medium">
                <span>{t.cssShadowTool.glassBorderWidth}</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">{glassConfig.borderWidth}px</span>
              </div>
              <input
                type="range"
                min={1}
                max={6}
                value={glassConfig.borderWidth}
                onChange={(e) => onChangeGlassConfig({ ...glassConfig, borderWidth: Number(e.target.value) })}
                className="w-full accent-purple-500 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Code Snippets & Copy */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => onChangeShadowCodeTab('css')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                shadowCodeTab === 'css'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              CSS Properties
            </button>
            <button
              type="button"
              onClick={() => onChangeShadowCodeTab('tailwind')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                shadowCodeTab === 'tailwind'
                  ? 'bg-white dark:bg-slate-700 text-cyan-600 dark:text-cyan-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              Tailwind CSS
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              const code =
                shadowMode === 'shadow'
                  ? shadowTarget === 'contour'
                    ? shadowCodeTab === 'css'
                      ? `filter: ${dropShadowCss};`
                      : dropShadowTailwind
                    : shadowCodeTab === 'css'
                    ? shadowResultCss
                    : shadowResultTailwind
                  : shadowCodeTab === 'css'
                  ? glassResultCss
                  : glassResultTailwind;
              onCopy(code, 'shadow-export');
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80"
          >
            {copiedKey === 'shadow-export' ? (
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
        </div>

        <pre className="p-3.5 rounded-xl bg-slate-950 text-cyan-400 font-mono text-xs overflow-x-auto max-h-36 border border-slate-800 leading-relaxed scrollbar-thin">
          <code>
            {shadowMode === 'shadow'
              ? shadowTarget === 'contour'
                ? shadowCodeTab === 'css'
                  ? `filter: ${dropShadowCss};`
                  : dropShadowTailwind
                : shadowCodeTab === 'css'
                ? shadowResultCss
                : shadowResultTailwind
              : shadowCodeTab === 'css'
              ? glassResultCss
              : glassResultTailwind}
          </code>
        </pre>
      </div>

      {/* Bake Shadow Actions Box */}
      <div className="p-4 rounded-xl bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 space-y-3">
        <div>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-xs block">
            {dw.bakeShadowTitle}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {dw.bakeShadowDesc}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={isBakingShadow}
            onClick={onBakeAndDownloadPng}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors cursor-pointer border border-slate-200/80 dark:border-slate-700/80 disabled:opacity-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isBakingShadow ? 'Rendering...' : dw.bakeAndDownloadPngBtn}</span>
          </button>

          <button
            type="button"
            disabled={isBakingShadow}
            onClick={onBakeAndPushToPipeline}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>{isBakingShadow ? 'Baking...' : dw.bakeToPipelineBtn}</span>
          </button>
        </div>
      </div>

      {/* Proceed to Tab 3 */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onProceedToExport}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 font-semibold text-xs transition-all border border-cyan-500/30 cursor-pointer"
        >
          <span>{dw.proceedToExportBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CssDepthTab;
