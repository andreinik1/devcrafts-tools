import React, { useState, useCallback, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Palette,
  ArrowLeftRight,
  Copy,
  CheckCircle,
  ShieldCheck,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────
interface RGB { r: number; g: number; b: number }
interface HSL { h: number; s: number; l: number }

// ─── Color Conversion Utils ───────────────────────────────────────────────────
function hexToRgb(hex: string): RGB | null {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return null;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
  return { r, g, b };
}

function rgbToHex({ r, g, b }: RGB): string {
  return (
    '#' +
    [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
  );
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100, ln = l / 100;
  if (s === 0) { const v = Math.round(ln * 255); return { r: v, g: v, b: v }; }
  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  return {
    r: Math.round(hue2rgb(p, q, h / 360 + 1 / 3) * 255),
    g: Math.round(hue2rgb(p, q, h / 360) * 255),
    b: Math.round(hue2rgb(p, q, h / 360 - 1 / 3) * 255),
  };
}

function relativeLuminance({ r, g, b }: RGB): number {
  const normalize = (c: number) => {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * normalize(r) + 0.7152 * normalize(g) + 0.0722 * normalize(b);
}

function contrastRatio(a: RGB, b: RGB): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── WCAG Check Result ─────────────────────────────────────────────────────
function PassBadge({ pass }: { pass: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
        pass
          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700'
          : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-700'
      }`}
    >
      {pass ? '✓ Pass' : '✗ Fail'}
    </span>
  );
}

// ─── Color Input Section ───────────────────────────────────────────────────
function ColorInputGroup({
  label,
  hex,
  onHexChange,
  rgb,
  onRgbChange,
  hsl,
  onHslChange,
}: {
  label: string;
  hex: string;
  onHexChange: (v: string) => void;
  rgb: RGB;
  onRgbChange: (rgb: RGB) => void;
  hsl: HSL;
  onHslChange: (hsl: HSL) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
      {/* Color picker + HEX */}
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={hex}
          onChange={(e) => onHexChange(e.target.value)}
          className="w-12 h-12 rounded-xl border-2 border-slate-200 dark:border-slate-700 cursor-pointer bg-transparent p-0.5"
        />
        <div className="flex-1">
          <label className="block text-[11px] text-slate-500 mb-1">HEX</label>
          <input
            type="text"
            value={hex.toUpperCase()}
            onChange={(e) => onHexChange(e.target.value)}
            maxLength={7}
            className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
          />
        </div>
      </div>
      {/* RGB */}
      <div className="grid grid-cols-3 gap-2">
        {(['r', 'g', 'b'] as const).map((ch) => (
          <div key={ch}>
            <label className="block text-[11px] text-slate-500 mb-1">
              {ch.toUpperCase()}
            </label>
            <input
              type="number"
              min={0}
              max={255}
              value={rgb[ch]}
              onChange={(e) => onRgbChange({ ...rgb, [ch]: Number(e.target.value) })}
              className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        ))}
      </div>
      {/* HSL */}
      <div className="grid grid-cols-3 gap-2">
        {([
          { ch: 'h', max: 360, label: 'H°' },
          { ch: 's', max: 100, label: 'S%' },
          { ch: 'l', max: 100, label: 'L%' },
        ] as const).map(({ ch, max, label: lbl }) => (
          <div key={ch}>
            <label className="block text-[11px] text-slate-500 mb-1">{lbl}</label>
            <input
              type="number"
              min={0}
              max={max}
              value={hsl[ch]}
              onChange={(e) => onHslChange({ ...hsl, [ch]: Number(e.target.value) })}
              className="w-full font-mono text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Contrast Ratio Arc Display ────────────────────────────────────────────
function ContrastDisplay({ ratio }: { ratio: number }) {
  const pct = Math.min(ratio / 21, 1);
  const color =
    ratio >= 7 ? '#22c55e' : ratio >= 4.5 ? '#3b82f6' : ratio >= 3 ? '#f59e0b' : '#ef4444';
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - pct * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 100 100" className="w-36 h-36">
        <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 50 50)"
          style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.3s ease' }}
        />
        <text x="50" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill={color}>
          {ratio.toFixed(2)}
        </text>
        <text x="50" y="68" textAnchor="middle" fontSize="9" fill="#94a3b8">:1</text>
      </svg>
    </div>
  );
}

// ─── Presets ─────────────────────────────────────────────────────────────────
const PRESETS = [
  { name: 'White on Black', fg: '#ffffff', bg: '#000000' },
  { name: 'Black on White', fg: '#000000', bg: '#ffffff' },
  { name: 'Navy on White', fg: '#0f172a', bg: '#f8fafc' },
  { name: 'Dark on Yellow', fg: '#1c1917', bg: '#fef08a' },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export const ColorContrastTool: React.FC = () => {
  const { t } = useLanguage();
  const ct = t.colorContrastTool;

  const [fgHex, setFgHex] = useState('#0f172a');
  const [bgHex, setBgHex] = useState('#f8fafc');
  const [copiedRatio, setCopiedRatio] = useState(false);

  const fgRgb = hexToRgb(fgHex) ?? { r: 15, g: 23, b: 42 };
  const bgRgb = hexToRgb(bgHex) ?? { r: 248, g: 250, b: 252 };
  const fgHsl = rgbToHsl(fgRgb);
  const bgHsl = rgbToHsl(bgRgb);

  const ratio = contrastRatio(fgRgb, bgRgb);

  // sync helpers
  const updateFgFromRgb = useCallback((rgb: RGB) => setFgHex(rgbToHex(rgb)), []);
  const updateFgFromHsl = useCallback((hsl: HSL) => setFgHex(rgbToHex(hslToRgb(hsl))), []);
  const updateBgFromRgb = useCallback((rgb: RGB) => setBgHex(rgbToHex(rgb)), []);
  const updateBgFromHsl = useCallback((hsl: HSL) => setBgHex(rgbToHex(hslToRgb(hsl))), []);

  const swap = () => { const tmp = fgHex; setFgHex(bgHex); setBgHex(tmp); };

  const copyRatio = () => {
    navigator.clipboard.writeText(`${ratio.toFixed(2)}:1`).then(() => {
      setCopiedRatio(true);
      setTimeout(() => setCopiedRatio(false), 2000);
    });
  };

  // WCAG levels
  const wcag = {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7,
    largeAA: ratio >= 3,
    largeAAA: ratio >= 4.5,
    uiAA: ratio >= 3,
  };

  // Validate hex on direct input
  const handleFgHex = (v: string) => {
    setFgHex(v.startsWith('#') ? v : '#' + v);
  };
  const handleBgHex = (v: string) => {
    setBgHex(v.startsWith('#') ? v : '#' + v);
  };

  // ensure hex length is 7 before parsing
  const safeFgHex = fgHex.length === 7 ? fgHex : '#0f172a';
  const safeBgHex = bgHex.length === 7 ? bgHex : '#f8fafc';
  const safeFgRgb = hexToRgb(safeFgHex) ?? { r: 15, g: 23, b: 42 };
  const safeBgRgb = hexToRgb(safeBgHex) ?? { r: 248, g: 250, b: 252 };
  const safeRatio = contrastRatio(safeFgRgb, safeBgRgb);
  const safeWcag = {
    normalAA: safeRatio >= 4.5,
    normalAAA: safeRatio >= 7,
    largeAA: safeRatio >= 3,
    largeAAA: safeRatio >= 4.5,
    uiAA: safeRatio >= 3,
  };

  useEffect(() => {}, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="p-3 rounded-2xl bg-gradient-to-br from-fuchsia-500/20 to-purple-500/10 border border-fuchsia-500/30 text-fuchsia-500 dark:text-fuchsia-400 w-fit">
          <Palette className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {ct.title}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{ct.subtitle}</p>
        </div>
      </div>

      {/* Client-Side Badge */}
      <div className="flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1.5 rounded-xl w-fit">
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>{t.common.clientSideNotice}</span>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 self-center mr-1">{ct.presetsLabel}:</span>
        {PRESETS.map((p) => (
          <button
            key={p.name}
            type="button"
            onClick={() => { setFgHex(p.fg); setBgHex(p.bg); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-fuchsia-400 dark:hover:border-fuchsia-500 text-xs font-medium text-slate-700 dark:text-slate-300 transition-all cursor-pointer"
          >
            <span className="flex gap-0.5">
              <span className="inline-block w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600" style={{ background: p.bg }} />
              <span className="inline-block w-3 h-3 rounded-full border border-slate-300 dark:border-slate-600" style={{ background: p.fg }} />
            </span>
            {p.name}
          </button>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Color Pickers */}
        <div className="space-y-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5">
          <ColorInputGroup
            label={ct.textColorLabel}
            hex={fgHex}
            onHexChange={handleFgHex}
            rgb={safeFgRgb}
            onRgbChange={updateFgFromRgb}
            hsl={rgbToHsl(safeFgRgb)}
            onHslChange={updateFgFromHsl}
          />
          {/* Swap Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-fuchsia-400 hover:text-fuchsia-600 dark:hover:text-fuchsia-400 text-xs font-bold transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-4 h-4" />
              {ct.swapBtn}
            </button>
          </div>
          <ColorInputGroup
            label={ct.bgColorLabel}
            hex={bgHex}
            onHexChange={handleBgHex}
            rgb={safeBgRgb}
            onRgbChange={updateBgFromRgb}
            hsl={rgbToHsl(safeBgRgb)}
            onHslChange={updateBgFromHsl}
          />
        </div>

        {/* Right: Results */}
        <div className="space-y-5">
          {/* Contrast Ratio */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 flex flex-col items-center gap-4">
            <ContrastDisplay ratio={safeRatio} />
            <div className="text-center space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest">{ct.contrastRatioLabel}</p>
              <p className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {safeRatio.toFixed(2)}<span className="text-slate-400 text-xl">:1</span>
              </p>
            </div>
            <button
              type="button"
              onClick={copyRatio}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-fuchsia-400 transition-all cursor-pointer"
            >
              {copiedRatio ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedRatio ? t.common.copied : ct.copyRatioBtn}
            </button>
          </div>

          {/* WCAG Grid */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{ct.wcagTitle}</p>
            <div className="space-y-2">
              {/* Normal text */}
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-2">{ct.wcagNormalText}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-600 dark:text-slate-400">AA <span className="text-slate-400">(4.5:1)</span></span>
                  <PassBadge pass={safeWcag.normalAA} />
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-600 dark:text-slate-400">AAA <span className="text-slate-400">(7:1)</span></span>
                  <PassBadge pass={safeWcag.normalAAA} />
                </div>
              </div>
              {/* Large text */}
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">{ct.wcagLargeText}</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-600 dark:text-slate-400">AA <span className="text-slate-400">(3:1)</span></span>
                  <PassBadge pass={safeWcag.largeAA} />
                </div>
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-600 dark:text-slate-400">AAA <span className="text-slate-400">(4.5:1)</span></span>
                  <PassBadge pass={safeWcag.largeAAA} />
                </div>
              </div>
              {/* UI Components */}
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-300 mt-1">{ct.wcagUI}</div>
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <span className="text-xs text-slate-600 dark:text-slate-400">AA <span className="text-slate-400">(3:1)</span></span>
                <PassBadge pass={safeWcag.uiAA} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">{ct.livePreviewTitle}</p>
        </div>
        <div className="p-8 space-y-6" style={{ backgroundColor: safeBgHex, color: safeFgHex }}>
          <div>
            <p className="text-xs font-semibold mb-2 opacity-60" style={{ color: safeFgHex }}>{ct.previewSmallText}</p>
            <p className="text-sm leading-relaxed" style={{ color: safeFgHex }}>
              The quick brown fox jumps over the lazy dog. Good typography makes content readable.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-2 opacity-60" style={{ color: safeFgHex }}>{ct.previewLargeText}</p>
            <p className="text-2xl font-bold" style={{ color: safeFgHex }}>
              Large Heading Text
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold mb-2 opacity-60" style={{ color: safeFgHex }}>{ct.previewUI}</p>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl font-bold text-sm border-2 cursor-default"
              style={{ color: safeFgHex, borderColor: safeFgHex }}
            >
              Button Label
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
