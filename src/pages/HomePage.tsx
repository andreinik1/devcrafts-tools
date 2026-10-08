import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { AdSlot } from '../components/common/AdSlot';
import {
  Wrench,
  FileCode2,
  Maximize2,
  Layers,
  ShieldCheck,
  Zap,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const tools = [
    {
      id: 'svg-cleaner',
      slug: '/tools/svg-cleaner',
      title: t.toolsList.svgCleaner.title,
      desc: t.toolsList.svgCleaner.desc,
      badge: t.toolsList.svgCleaner.badge,
      icon: Wrench,
      gradient: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'json-to-typescript',
      slug: '/tools/json-to-typescript',
      title: t.toolsList.jsonToTs.title,
      desc: t.toolsList.jsonToTs.desc,
      badge: t.toolsList.jsonToTs.badge,
      icon: FileCode2,
      gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'px-to-rem',
      slug: '/tools/px-to-rem',
      title: t.toolsList.pxToRem.title,
      desc: t.toolsList.pxToRem.desc,
      badge: t.toolsList.pxToRem.badge,
      icon: Maximize2,
      gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    },
    {
      id: 'css-shadow-generator',
      slug: '/tools/css-shadow-generator',
      title: t.toolsList.cssShadow.title,
      desc: t.toolsList.cssShadow.desc,
      badge: t.toolsList.cssShadow.badge,
      icon: Layers,
      gradient: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
  ];

  const filteredTools = tools.filter(
    (tool) =>
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950 p-8 sm:p-14 text-center backdrop-blur-xl">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-cyan-400">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.hero.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            {t.hero.titlePrefix}{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 py-2.5 px-5 rounded-2xl w-fit mx-auto">
            <ShieldCheck className="w-4 h-4" />
            <span>{t.hero.privacyGuarantee}</span>
          </div>

          {/* Quick Search Bar */}
          <div className="pt-4 max-w-md mx-auto relative">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 absolute left-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.common.searchPlaceholder}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-950/90 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/60 shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Top Banner AdSlot */}
      <AdSlot type="banner" slotId="9876543210" />

      {/* Tools Grid Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>{t.common.allTools}</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Showing {filteredTools.length} micro-utilities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md hover:border-slate-700 hover:bg-slate-900/60 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br border ${tool.gradient}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-slate-400 font-semibold">
                      {tool.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    Client-Side API
                  </span>

                  <Link
                    to={tool.slug}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-cyan-400 text-xs font-bold transition-all"
                  >
                    <span>{t.common.tryNow}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Guarantee Highlight */}
      <section className="rounded-3xl border border-slate-800 bg-slate-900/20 p-8 sm:p-10 backdrop-blur-md grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            01
          </div>
          <h3 className="text-base font-bold text-slate-200">100% Browser Privacy</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Zero servers, zero database logs. Your JSON payloads, SVG graphics, and design variables never leave your browser context.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
            02
          </div>
          <h3 className="text-base font-bold text-slate-200">Zero Latency Processing</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Powered by modern HTML5 DOM APIs and Vite TypeScript compilation for instantaneous real-time UI updates.
          </p>
        </div>

        <div className="space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            03
          </div>
          <h3 className="text-base font-bold text-slate-200">Google AdSense Certified</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Strictly engineered for monetization compliance with non-intrusive placeholders and full SEO documentation.
          </p>
        </div>
      </section>

      {/* In-Article AdSlot */}
      <AdSlot type="in-article" slotId="4455667788" />
    </div>
  );
};
