import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  generateMetaTags,
  type OpenGraphConfig,
} from '../../utils/openGraphGenerator';
import {
  Share2,
  Copy,
  Download,
  Eye,
  Globe,
  Code,
} from 'lucide-react';
import { SiX } from 'react-icons/si';

export const OpenGraphGeneratorTool: React.FC = () => {
  const { t, showToast } = useLanguage();

  const [config, setConfig] = useState<OpenGraphConfig>({
    title: 'VibeDev Tools — Free Developer & Marketer Utilities',
    description:
      'Instant, 100% client-side micro-tools for web developers, designers, and marketers. SVG cleaner, JSON to TS converter, Open Graph generator, and image compressor.',
    url: 'https://vibedev.tools',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=630&fit=crop',
    siteName: 'VibeDev Tools',
    type: 'website',
    twitterHandle: '@vibedevtools',
    twitterCardType: 'summary_large_image',
  });

  const [activePreviewTab, setActivePreviewTab] = useState<'facebook' | 'twitter' | 'google'>('facebook');

  const generatedTags = generateMetaTags(config);

  const handleInputChange = (field: keyof OpenGraphConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const copyTagsToClipboard = () => {
    navigator.clipboard.writeText(generatedTags);
    showToast(t.common.copied || 'Meta tags copied to clipboard!');
  };

  const downloadHtmlFile = () => {
    const blob = new Blob([generatedTags], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'meta-tags.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t.common.downloaded || 'meta-tags.html downloaded!');
  };

  const domainName = () => {
    try {
      if (!config.url) return 'example.com';
      const u = new URL(config.url.startsWith('http') ? config.url : `https://${config.url}`);
      return u.hostname;
    } catch {
      return 'example.com';
    }
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm transition-colors duration-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
          <Share2 className="w-7 h-7 text-cyan-500 dark:text-cyan-400" />
          {t.openGraphGeneratorTool.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t.openGraphGeneratorTool.subtitle}
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-4 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-500" />
            <span>{t.openGraphGeneratorTool.formTitle}</span>
          </h2>

          <div className="space-y-3 text-xs">
            {/* Page Title */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {t.openGraphGeneratorTool.metaTitleLabel}
              </label>
              <input
                type="text"
                value={config.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="My Awesome Website"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 font-sans"
              />
              <div className="text-[11px] text-slate-400 mt-0.5 text-right">
                {config.title.length} / 60 chars
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {t.openGraphGeneratorTool.metaDescLabel}
              </label>
              <textarea
                rows={3}
                value={config.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Short description of your page for search engines & social cards..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 font-sans resize-none"
              />
              <div className="text-[11px] text-slate-400 mt-0.5 text-right">
                {config.description.length} / 160 chars
              </div>
            </div>

            {/* Canonical / Target URL */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {t.openGraphGeneratorTool.canonicalUrlLabel}
              </label>
              <input
                type="url"
                value={config.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                placeholder="https://example.com/page"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {t.openGraphGeneratorTool.ogImageUrlLabel}
              </label>
              <input
                type="url"
                value={config.imageUrl}
                onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                placeholder="https://example.com/og-banner.png"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            {/* Site Name & Type */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {t.openGraphGeneratorTool.siteNameLabel}
                </label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  placeholder="My Brand"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {t.openGraphGeneratorTool.typeLabel}
                </label>
                <select
                  value={config.type}
                  onChange={(e) =>
                    handleInputChange('type', e.target.value as 'website' | 'article')
                  }
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 cursor-pointer"
                >
                  <option value="website">website</option>
                  <option value="article">article</option>
                </select>
              </div>
            </div>

            {/* Twitter Handle */}
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {t.openGraphGeneratorTool.twitterHandleLabel}
              </label>
              <input
                type="text"
                value={config.twitterHandle}
                onChange={(e) => handleInputChange('twitterHandle', e.target.value)}
                placeholder="@username"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Previews & HTML Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          {/* Live Preview Section */}
          <div className="space-y-3 p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-500" />
                <span>{t.openGraphGeneratorTool.previewTitle}</span>
              </span>

              {/* Preview Tabs */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('facebook')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreviewTab === 'facebook'
                      ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Facebook / Slack
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('twitter')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreviewTab === 'twitter'
                      ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Twitter / X
                </button>
                <button
                  type="button"
                  onClick={() => setActivePreviewTab('google')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activePreviewTab === 'google'
                      ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  Google Snippet
                </button>
              </div>
            </div>

            {/* Preview Card Rendering */}
            <div className="pt-2">
              {activePreviewTab === 'facebook' && (
                /* Facebook / LinkedIn / Slack Card */
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-lg transition-all">
                  <div className="aspect-[1.91/1] w-full bg-slate-950 overflow-hidden relative">
                    {config.imageUrl ? (
                      <img
                        src={config.imageUrl}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                        <Share2 className="w-8 h-8 mb-1" />
                        <span>1200 × 630 Open Graph Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-1">
                    <div className="text-[11px] uppercase font-mono text-slate-500 tracking-wider">
                      {domainName()}
                    </div>
                    <div className="text-base font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {config.title || 'Page Title'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {config.description || 'Page description preview goes here...'}
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'twitter' && (
                /* Twitter Summary Large Image Card */
                <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-lg transition-all">
                  <div className="aspect-[2/1] w-full bg-slate-950 overflow-hidden relative">
                    {config.imageUrl ? (
                      <img
                        src={config.imageUrl}
                        alt="Twitter Card Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                        <SiX className="w-8 h-8 mb-1" />
                        <span>Twitter Summary Large Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3.5 bg-white dark:bg-slate-900 space-y-1 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                      {config.title || 'Page Title'}
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {config.description || 'Page description preview goes here...'}
                    </div>
                    <div className="text-xs text-slate-500 font-mono pt-1 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <span>{domainName()}</span>
                    </div>
                  </div>
                </div>
              )}

              {activePreviewTab === 'google' && (
                /* Google Search Snippet Card */
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-5 space-y-1.5 shadow-md">
                  <div className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-500 flex items-center justify-center font-bold text-[9px]">
                      G
                    </div>
                    <span className="font-sans font-medium text-slate-900 dark:text-slate-200">
                      {config.siteName || domainName()}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      https://{domainName()}
                    </span>
                  </div>
                  <div className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer line-clamp-1">
                    {config.title || 'Page Title — Example Search Result'}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {config.description || 'This is how your website snippet will appear in Google Search result listings...'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Generated Code Output */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-500" />
                <span>{t.openGraphGeneratorTool.codeTitle}</span>
              </span>
              <span className="text-[11px] font-mono text-cyan-500">HTML5 Meta Tags</span>
            </div>

            <textarea
              readOnly
              value={generatedTags}
              rows={9}
              className="w-full font-mono text-xs bg-slate-900 dark:bg-slate-950 border border-slate-700 dark:border-slate-800 rounded-xl p-4 text-cyan-300 outline-none resize-none select-all overflow-x-auto"
            />

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={copyTagsToClipboard}
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <Copy className="w-4 h-4" />
                <span>{t.openGraphGeneratorTool.copyAllBtn}</span>
              </button>

              <button
                type="button"
                onClick={downloadHtmlFile}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-300 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-200 font-semibold text-sm transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>{t.common.download}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
