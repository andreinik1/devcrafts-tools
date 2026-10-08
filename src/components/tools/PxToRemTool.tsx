import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  pxToRem,
  calculateFluidTypography,
  getLookupTable,
} from '../../utils/pxToRem';
import {
  Maximize2,
  Copy,
  Sliders,
  Table,
  ArrowRightLeft,
} from 'lucide-react';

export const PxToRemTool: React.FC = () => {
  const { t, showToast } = useLanguage();
  const [baseFontSize, setBaseFontSize] = useState<number>(16);

  // Single PX input state
  const [pxInput, setPxInput] = useState<number>(24);

  // Fluid typography states
  const [minPx, setMinPx] = useState<number>(16);
  const [maxPx, setMaxPx] = useState<number>(32);
  const [minViewport, setMinViewport] = useState<number>(320);
  const [maxViewport, setMaxViewport] = useState<number>(1280);

  const remValue = pxToRem(pxInput, baseFontSize);
  const emValue = remValue;

  const fluidResult = calculateFluidTypography({
    minPx,
    maxPx,
    minViewportPx: minViewport,
    maxViewportPx: maxViewport,
    baseFontSize,
  });

  const lookupTable = getLookupTable(baseFontSize);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast(t.common.copied);
  };

  return (
    <div className="space-y-8">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-3">
            <Maximize2 className="w-7 h-7 text-cyan-400" />
            {t.pxToRemTool.title}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            {t.pxToRemTool.subtitle}
          </p>
        </div>

        {/* Base Font Size input */}
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
          <span className="text-slate-400 font-medium">{t.pxToRemTool.baseFontSize}</span>
          <input
            type="number"
            value={baseFontSize}
            onChange={(e) => setBaseFontSize(Number(e.target.value) || 16)}
            className="w-16 bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-center font-mono font-bold text-cyan-400 text-sm outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Grid: Converter & Fluid Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Quick PX to REM Converter */}
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
            <ArrowRightLeft className="w-4 h-4 text-cyan-400" />
            <span>Interactive PX ↔ REM Calculator</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1">{t.pxToRemTool.pxInput}</label>
              <div className="relative">
                <input
                  type="number"
                  value={pxInput}
                  onChange={(e) => setPxInput(Number(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xl font-mono text-slate-100 outline-none focus:border-cyan-500"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">
                  PX
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400">{t.pxToRemTool.remOutput}</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-1">
                  {remValue} <span className="text-xs text-slate-400">rem</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`${remValue}rem`)}
                  className="mt-2 text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-medium"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy REM</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-xs text-slate-400">{t.pxToRemTool.emOutput}</div>
                <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                  {emValue} <span className="text-xs text-slate-400">em</span>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(`${emValue}em`)}
                  className="mt-2 text-[11px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-medium"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy EM</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Fluid Typography Calculator */}
        <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-6">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>{t.pxToRemTool.fluidTitle}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">{t.pxToRemTool.minPx}</label>
              <input
                type="number"
                value={minPx}
                onChange={(e) => setMinPx(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{t.pxToRemTool.maxPx}</label>
              <input
                type="number"
                value={maxPx}
                onChange={(e) => setMaxPx(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{t.pxToRemTool.minViewport}</label>
              <input
                type="number"
                value={minViewport}
                onChange={(e) => setMinViewport(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">{t.pxToRemTool.maxViewport}</label>
              <input
                type="number"
                value={maxViewport}
                onChange={(e) => setMaxViewport(Number(e.target.value) || 0)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-mono text-slate-200 outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Generated Clamp Result */}
          <div className="space-y-3 pt-2">
            <div>
              <span className="text-xs text-slate-400 font-medium block mb-1">
                {t.pxToRemTool.clampFormula}
              </span>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300">
                <span className="flex-1 overflow-x-auto">{fluidResult.clampFormula}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(fluidResult.clampFormula)}
                  className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium block mb-1">
                {t.pxToRemTool.tailwindClass}
              </span>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-purple-300">
                <span className="flex-1 overflow-x-auto">{fluidResult.tailwindClass}</span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(fluidResult.tailwindClass)}
                  className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Lookup Table */}
      <div className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-300">
          <Table className="w-4 h-4 text-cyan-400" />
          <span>{t.pxToRemTool.lookupTableTitle}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400">
                <th className="pb-3 font-semibold">Pixels (px)</th>
                <th className="pb-3 font-semibold">REM Value</th>
                <th className="pb-3 font-semibold">Tailwind Equivalent</th>
                <th className="pb-3 text-right font-semibold">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {lookupTable.map((row) => (
                <tr key={row.px} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-2.5 font-bold text-slate-200">{row.px}px</td>
                  <td className="py-2.5 text-cyan-400">{row.rem}rem</td>
                  <td className="py-2.5 text-slate-400">{row.tailwindClass}</td>
                  <td className="py-2.5 text-right">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`${row.rem}rem`)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-400 text-[11px] transition-colors"
                    >
                      Copy REM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
