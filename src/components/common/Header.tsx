import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  Wrench,
  ChevronDown,
  Menu,
  X,
  FileCode2,
  Maximize2,
  Layers,
  ShieldCheck,
  Terminal,
  Sun,
  Moon,
  Image,
  Share2,
} from 'lucide-react';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  const toolsList = [
    {
      name: t.nav.svgCleaner,
      path: '/tools/svg-cleaner',
      icon: Wrench,
      desc: t.toolsList.svgCleaner.desc,
    },
    {
      name: t.nav.jsonToTs,
      path: '/tools/json-to-typescript',
      icon: FileCode2,
      desc: t.toolsList.jsonToTs.desc,
    },
    {
      name: t.nav.pxToRem,
      path: '/tools/px-to-rem',
      icon: Maximize2,
      desc: t.toolsList.pxToRem.desc,
    },
    {
      name: t.nav.cssShadow,
      path: '/tools/css-shadow-generator',
      icon: Layers,
      desc: t.toolsList.cssShadow.desc,
    },
    {
      name: t.nav.imageConverter,
      path: '/tools/image-converter',
      icon: Image,
      desc: t.toolsList.imageConverter.desc,
    },
    {
      name: t.nav.openGraphGenerator,
      path: '/tools/open-graph-generator',
      icon: Share2,
      desc: t.toolsList.openGraphGenerator.desc,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 text-cyan-500 dark:text-cyan-400 group-hover:scale-105 transition-transform duration-200">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-1.5">
              VibeDev <span className="text-cyan-500 dark:text-cyan-400 font-extrabold">Tools</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <Link
            to="/"
            className={`transition-colors ${
              isActive('/') ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {t.nav.home}
          </Link>

          {/* Tools Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <button
              type="button"
              className={`flex items-center gap-1 py-2 transition-colors cursor-pointer ${
                location.pathname.startsWith('/tools')
                  ? 'text-cyan-600 dark:text-cyan-400 font-semibold'
                  : 'hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <span>{t.nav.tools}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 top-full w-80 p-2 rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150 grid grid-cols-1 gap-1">
                {toolsList.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.path}
                      to={tool.path}
                      className={`flex items-start gap-3 p-2.5 rounded-xl transition-all ${
                        isActive(tool.path)
                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-cyan-500 dark:text-cyan-400 shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-xs text-slate-900 dark:text-slate-100">{tool.name}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{tool.desc}</div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`transition-colors ${
              isActive('/about') ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {t.nav.about}
          </Link>

          <Link
            to="/contact"
            className={`transition-colors ${
              isActive('/contact') ? 'text-cyan-600 dark:text-cyan-400 font-semibold' : 'hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Right side controls (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-500/30 text-[11px] font-mono text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>100% Client-Side</span>
          </div>

          <LanguageSwitcher />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-amber-500 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>
        </div>

        {/* Mobile Menu Controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher />

          {/* Theme Toggle Mobile */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-500 dark:text-amber-400"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 pt-3 pb-6 space-y-3 shadow-xl backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-800 dark:text-slate-200 hover:text-cyan-500 font-medium text-base"
          >
            {t.nav.home}
          </Link>

          <div className="pt-2 pb-1 border-t border-slate-200 dark:border-slate-800/60 text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
            {t.nav.tools}
          </div>
          <div className="grid grid-cols-1 gap-1">
            {toolsList.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.path}
                  to={tool.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2.5 px-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 dark:hover:text-cyan-400 text-sm font-medium"
                >
                  <Icon className="w-4 h-4 text-cyan-500 dark:text-cyan-400 shrink-0" />
                  <span>{tool.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800/60 space-y-2">
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-500 text-sm font-medium"
            >
              {t.nav.about}
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-500 text-sm font-medium"
            >
              {t.nav.contact}
            </Link>
            <Link
              to="/privacy-policy"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-slate-700 dark:text-slate-300 hover:text-cyan-500 text-sm font-medium"
            >
              {t.nav.privacy}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

