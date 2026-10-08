import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  generateBoxShadow,
  generateGlassmorphism,
  type ShadowConfig,
  type GlassConfig,
  SHADOW_PRESETS,
  GLASS_PRESETS,
} from '../../utils/cssShadow';
import {
  Layers,
  Copy,
  Sliders,
  Sparkles,
  Eye,
  Sun,
  Moon,
} from 'lucide-react';

export const CssShadowTool: React.FC = () => {
  const { t, showToast } = useLanguage();
  const [activeMode, setActiveMode] = useState<'shadow' | 'glass'>('shadow');
  const [canvasBg, setCanvasBg] = useState<'dark' | 'light'>('dark');

  // Box shadow state
  const [shadowConfig, setShadowConfig] = useState<ShadowConfig>({
    offsetX: 0,
    offsetY: 10,
    blur: 25,
    spread: -5,
    color: '#000000',
    opacity: 0.45,
    inset: false,
  });

  // Glassmorphism state
  const [glassConfig, setGlassConfig] = useState<GlassConfig>({
    bgOpacity: 0.15,
    blur: 16,
    borderOpacity: 0.2,
    borderWidth: 1,
    bgColor: '#ffffff',
    borderColor: '#ffffff',
  });

  const shadowResult = generateBoxShadow(shadowConfig);
  const glassResult = generateGlassmorphism(glassConfig);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(t.common.copied);
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
          <Layers className="w-7 h-7 text-cyan-400" />
          {t.cssShadowTool.title}
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {t.cssShadowTool.subtitle}
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setActiveMode('shadow')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
            activeMode === 'shadow'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>{t.cssShadowTool.modeShadow}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('glass')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
            activeMode === 'glass'
              ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.cssShadowTool.modeGlass}</span>
        </button>
      </div>

      {/* Main Grid: Controls & Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Sliders & Presets */}
        <div className="space-y-6">
          {activeMode === 'shadow' ? (
            /* Box Shadow Sliders */
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Shadow Controls
                </span>
                {/* Presets */}
                <select
                  onChange={(e) => {
                    const preset = SHADOW_PRESETS.find((p) => p.name === e.target.value);
                    if (preset) setShadowConfig(preset.config);
                  }}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1 outline-none"
                >
                  <option value="">{t.cssShadowTool.presetLabel}</option>
                  {SHADOW_PRESETS.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Offset X */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.offsetX}</span>
                  <span className="font-mono text-cyan-400">{shadowConfig.offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowConfig.offsetX}
                  onChange={(e) => setShadowConfig({ ...shadowConfig, offsetX: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Offset Y */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.offsetY}</span>
                  <span className="font-mono text-cyan-400">{shadowConfig.offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={shadowConfig.offsetY}
                  onChange={(e) => setShadowConfig({ ...shadowConfig, offsetY: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Blur Radius */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.blurRadius}</span>
                  <span className="font-mono text-cyan-400">{shadowConfig.blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={shadowConfig.blur}
                  onChange={(e) => setShadowConfig({ ...shadowConfig, blur: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Spread Radius */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.spreadRadius}</span>
                  <span className="font-mono text-cyan-400">{shadowConfig.spread}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="50"
                  value={shadowConfig.spread}
                  onChange={(e) => setShadowConfig({ ...shadowConfig, spread: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Opacity */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Shadow Opacity</span>
                  <span className="font-mono text-cyan-400">{Math.round(shadowConfig.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={shadowConfig.opacity}
                  onChange={(e) => setShadowConfig({ ...shadowConfig, opacity: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Color Picker & Inset */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <span>{t.cssShadowTool.shadowColor}</span>
                  <input
                    type="color"
                    value={shadowConfig.color}
                    onChange={(e) => setShadowConfig({ ...shadowConfig, color: e.target.value })}
                    className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                  />
                </div>

                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={shadowConfig.inset}
                    onChange={(e) => setShadowConfig({ ...shadowConfig, inset: e.target.checked })}
                    className="rounded border-slate-700 bg-slate-950 text-cyan-500"
                  />
                  <span>{t.cssShadowTool.insetShadow}</span>
                </label>
              </div>
            </div>
          ) : (
            /* Glassmorphism Sliders */
            <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Glassmorphism Controls
                </span>
                <select
                  onChange={(e) => {
                    const preset = GLASS_PRESETS.find((p) => p.name === e.target.value);
                    if (preset) setGlassConfig(preset.config);
                  }}
                  className="bg-slate-950 border border-slate-800 text-slate-300 text-xs rounded-lg px-2.5 py-1 outline-none"
                >
                  <option value="">{t.cssShadowTool.presetLabel}</option>
                  {GLASS_PRESETS.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Opacity */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.glassBgOpacity}</span>
                  <span className="font-mono text-cyan-400">{Math.round(glassConfig.bgOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={glassConfig.bgOpacity}
                  onChange={(e) => setGlassConfig({ ...glassConfig, bgOpacity: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Backdrop Blur */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.glassBlur}</span>
                  <span className="font-mono text-cyan-400">{glassConfig.blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={glassConfig.blur}
                  onChange={(e) => setGlassConfig({ ...glassConfig, blur: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Border Opacity */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.glassBorderOpacity}</span>
                  <span className="font-mono text-cyan-400">{Math.round(glassConfig.borderOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={glassConfig.borderOpacity}
                  onChange={(e) => setGlassConfig({ ...glassConfig, borderOpacity: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Border Width */}
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>{t.cssShadowTool.glassBorderWidth}</span>
                  <span className="font-mono text-cyan-400">{glassConfig.borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={glassConfig.borderWidth}
                  onChange={(e) => setGlassConfig({ ...glassConfig, borderWidth: Number(e.target.value) })}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Preview & CSS / Tailwind Output */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Preview Box Controls */}
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-cyan-400" />
                {t.cssShadowTool.previewBoxTitle}
              </span>
              <button
                type="button"
                onClick={() => setCanvasBg(canvasBg === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 text-xs"
              >
                {canvasBg === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>Canvas: {canvasBg}</span>
              </button>
            </div>

            {/* Canvas */}
            <div
              className={`relative h-64 rounded-2xl border border-slate-800 flex items-center justify-center p-6 overflow-hidden transition-colors ${
                canvasBg === 'dark'
                  ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100'
                  : 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-300 text-slate-900'
              }`}
            >
              {/* Colorful background blobs for testing glassmorphism blur */}
              <div className="absolute -top-10 -left-10 w-36 h-36 bg-cyan-500/40 rounded-full blur-2xl animate-pulse" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/40 rounded-full blur-2xl animate-pulse" />

              {/* Dynamic Target Element */}
              <div
                style={
                  activeMode === 'shadow'
                    ? {
                        boxShadow: shadowResult.css.replace('box-shadow: ', '').replace(';', ''),
                        backgroundColor: canvasBg === 'dark' ? '#0f172a' : '#ffffff',
                      }
                    : {
                        backgroundColor: `rgba(255, 255, 255, ${glassConfig.bgOpacity})`,
                        backdropFilter: `blur(${glassConfig.blur}px)`,
                        WebkitBackdropFilter: `blur(${glassConfig.blur}px)`,
                        border: `${glassConfig.borderWidth}px solid rgba(255, 255, 255, ${glassConfig.borderOpacity})`,
                      }
                }
                className="relative z-10 w-52 h-32 rounded-2xl flex flex-col items-center justify-center text-center p-4 transition-all"
              >
                <span className="font-bold text-sm tracking-tight">DevCraft UI Card</span>
                <span className="text-[11px] opacity-80 mt-1 font-mono">
                  {activeMode === 'shadow' ? 'Box Shadow' : 'Backdrop Blur'}
                </span>
              </div>
            </div>

            {/* Generated CSS Code Output */}
            <div className="space-y-3">
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-1">
                  {t.cssShadowTool.outputCss}
                </span>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400">
                  <span className="flex-1 overflow-x-auto">
                    {activeMode === 'shadow' ? shadowResult.css : glassResult.css}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(activeMode === 'shadow' ? shadowResult.css : glassResult.css)
                    }
                    className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <span className="text-xs text-slate-400 font-medium block mb-1">
                  {t.cssShadowTool.outputTailwind}
                </span>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                  <span className="flex-1 overflow-x-auto">
                    {activeMode === 'shadow' ? shadowResult.tailwind : glassResult.tailwind}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        activeMode === 'shadow' ? shadowResult.tailwind : glassResult.tailwind
                      )
                    }
                    className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
