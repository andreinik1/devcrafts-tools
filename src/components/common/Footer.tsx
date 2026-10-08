import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Terminal, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-slate-100 tracking-tight">
                DevCraft <span className="text-cyan-400">Tools</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              {t.common.appTagline}. Built with zero external backends to ensure 100% client-side privacy, lightning speed, and maximum developer productivity.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 px-3 py-1.5 rounded-lg w-fit">
              <Shield className="w-4 h-4" />
              <span>{t.common.clientSideNotice}</span>
            </div>
          </div>

          {/* Quick Tools Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              {t.common.allTools}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/tools/svg-cleaner" className="hover:text-cyan-400 transition-colors">
                  {t.nav.svgCleaner}
                </Link>
              </li>
              <li>
                <Link to="/tools/json-to-typescript" className="hover:text-cyan-400 transition-colors">
                  {t.nav.jsonToTs}
                </Link>
              </li>
              <li>
                <Link to="/tools/px-to-rem" className="hover:text-cyan-400 transition-colors">
                  {t.nav.pxToRem}
                </Link>
              </li>
              <li>
                <Link to="/tools/css-shadow-generator" className="hover:text-cyan-400 transition-colors">
                  {t.nav.cssShadow}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200">
              Legal & Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  {t.nav.privacy}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} DevCraft Tools. All rights reserved. Google AdSense Compliant.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Web Developers & Designers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
