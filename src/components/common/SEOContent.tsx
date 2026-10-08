import React from 'react';
import { BookOpen, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface SEOContentProps {
  title: string;
  paragraphs: string[];
  features?: string[];
}

export const SEOContent: React.FC<SEOContentProps> = ({ title, paragraphs, features }) => {
  return (
    <article className="mt-12 rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-md">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/80">
        <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
          <BookOpen className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 tracking-tight">
            {title}
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            In-Depth Technical Documentation & Developer Guide
          </span>
        </div>
      </div>

      <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
        {paragraphs.map((para, index) => (
          <p key={index} className="text-slate-300">
            {para}
          </p>
        ))}
      </div>

      {features && features.length > 0 && (
        <div className="mt-6 pt-6 border-t border-slate-800/60">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Key Technical Advantages
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-950/50 border border-slate-800/60 text-xs text-slate-300"
              >
                <div className="mt-0.5 text-cyan-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Client-Side Web Standard</span>
        </div>
        <span>DevCraft Tools Technical Reference</span>
      </div>
    </article>
  );
};
