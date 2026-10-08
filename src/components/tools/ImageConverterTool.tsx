import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  convertAndCompressImage,
  formatBytes,
  type ImageConversionResult,
} from '../../utils/imageConverter';
import {
  Image as ImageIcon,
  Upload,
  Download,
  RefreshCw,
  TrendingDown,
} from 'lucide-react';

export const ImageConverterTool: React.FC = () => {
  const { t, showToast } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [targetFormat, setTargetFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [quality, setQuality] = useState<number>(80);
  const [conversionResult, setConversionResult] = useState<ImageConversionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Default demo state if no file selected yet
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  const processFile = async (file: File, format = targetFormat, q = quality) => {
    if (!file.type.startsWith('image/') && !file.name.endsWith('.svg')) {
      showToast('Please select a valid image file (PNG, JPG, WEBP, GIF, SVG).');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await convertAndCompressImage(file, { format, quality: q });
      setConversionResult(res);
    } catch (err) {
      console.error('Image conversion error:', err);
      showToast('Failed to convert image. Please try another file.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (file: File) => {
    if (originalUrl) {
      URL.revokeObjectURL(originalUrl);
    }
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setOriginalUrl(url);
    processFile(file, targetFormat, quality);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFormatChange = (newFormat: 'image/webp' | 'image/jpeg' | 'image/png') => {
    setTargetFormat(newFormat);
    if (selectedFile) {
      processFile(selectedFile, newFormat, quality);
    }
  };

  const handleQualityChange = (newQuality: number) => {
    setQuality(newQuality);
    if (selectedFile) {
      processFile(selectedFile, targetFormat, newQuality);
    }
  };

  const handleDownload = () => {
    if (!conversionResult || !selectedFile) return;

    const baseName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf('.')) || 'converted-image';
    const filename = `${baseName}.${conversionResult.formatExtension}`;

    const a = document.createElement('a');
    a.href = conversionResult.convertedUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast(t.common.downloaded || 'Image downloaded successfully!');
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    setSelectedFile(null);
    setOriginalUrl('');
    setConversionResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm transition-colors duration-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-3">
          <ImageIcon className="w-7 h-7 text-cyan-500 dark:text-cyan-400" />
          {t.imageConverterTool.title}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          {t.imageConverterTool.subtitle}
        </p>
      </div>

      {/* Main Container */}
      {!selectedFile ? (
        /* Upload Area */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`p-10 sm:p-16 rounded-3xl border-2 border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 shadow-sm ${
            isDragging
              ? 'border-cyan-500 bg-cyan-500/10 scale-[1.01]'
              : 'border-slate-300 dark:border-slate-800 bg-white/80 dark:bg-slate-900/30 hover:border-cyan-500/60 dark:hover:border-cyan-500/60 hover:bg-slate-50 dark:hover:bg-slate-900/50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
            <Upload className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t.imageConverterTool.dragDropTitle}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t.imageConverterTool.dragDropSubtitle}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            {['PNG', 'JPG', 'WEBP', 'GIF', 'SVG'].map((fmt) => (
              <span
                key={fmt}
                className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
              >
                {fmt}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Converter Dashboard */
        <div className="space-y-6">
          {/* Controls Header */}
          <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 backdrop-blur-md space-y-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Target Format Selector */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {t.imageConverterTool.targetFormatLabel}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { format: 'image/webp', label: 'WEBP', badge: 'Recommended' },
                    { format: 'image/jpeg', label: 'JPEG', badge: 'Compact' },
                    { format: 'image/png', label: 'PNG', badge: 'Lossless' },
                  ].map((item) => (
                    <button
                      key={item.format}
                      type="button"
                      onClick={() =>
                        handleFormatChange(item.format as 'image/webp' | 'image/jpeg' | 'image/png')
                      }
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        targetFormat === item.format
                          ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-bold shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="text-sm font-bold">{item.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.badge}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  <span>{t.imageConverterTool.qualityLabel}</span>
                  <span className="font-mono text-cyan-600 dark:text-cyan-400 text-sm font-bold">
                    {quality}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  disabled={targetFormat === 'image/png'}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span>1% (Max Compress)</span>
                  <span>80% (Balanced)</span>
                  <span>100% (High Quality)</span>
                </div>
              </div>
            </div>

            {/* Savings Banner */}
            {conversionResult && (
              <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <TrendingDown className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 uppercase font-semibold">
                      {t.imageConverterTool.savingsLabel}
                    </div>
                    <div className="text-sm font-bold font-mono">
                      {conversionResult.savingsPercentage > 0 ? (
                        <span className="text-emerald-400">
                          {t.imageConverterTool.reducedBy.replace(
                            '{percent}',
                            `${conversionResult.savingsPercentage}%`
                          )}{' '}
                          ({formatBytes(conversionResult.originalSize)} →{' '}
                          {formatBytes(conversionResult.convertedSize)})
                        </span>
                      ) : (
                        <span className="text-amber-400">
                          {formatBytes(conversionResult.originalSize)} →{' '}
                          {formatBytes(conversionResult.convertedSize)} (+
                          {Math.abs(conversionResult.savingsPercentage)}%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>{t.imageConverterTool.downloadBtn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
                    title="Upload another image"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Side-by-Side Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Original Preview */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
                <span>{t.imageConverterTool.originalTitle}</span>
                {selectedFile && (
                  <span className="font-mono text-[11px] text-slate-500">
                    {formatBytes(selectedFile.size)}
                  </span>
                )}
              </div>

              <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2 relative group">
                <img
                  src={originalUrl}
                  alt="Original Preview"
                  className="max-h-full max-w-full object-contain rounded"
                />
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 space-y-1">
                <div className="truncate">File: {selectedFile?.name}</div>
                <div>Type: {selectedFile?.type || 'Image'}</div>
                {conversionResult && (
                  <div>Dimensions: {conversionResult.width} × {conversionResult.height} px</div>
                )}
              </div>
            </div>

            {/* Converted Preview */}
            <div className="p-5 rounded-2xl bg-white/80 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase text-slate-600 dark:text-slate-400">
                <span>{t.imageConverterTool.convertedTitle}</span>
                {conversionResult && (
                  <span className="font-mono text-[11px] text-cyan-600 dark:text-cyan-400 font-bold">
                    {formatBytes(conversionResult.convertedSize)}
                  </span>
                )}
              </div>

              <div className="aspect-video w-full rounded-xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center p-2 relative">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-2 text-cyan-400">
                    <RefreshCw className="w-8 h-8 animate-spin" />
                    <span className="text-xs font-mono">Converting...</span>
                  </div>
                ) : conversionResult ? (
                  <img
                    src={conversionResult.convertedUrl}
                    alt="Converted Preview"
                    className="max-h-full max-w-full object-contain rounded"
                  />
                ) : null}
              </div>

              <div className="text-xs font-mono text-slate-500 dark:text-slate-400 space-y-1">
                <div>Format: {targetFormat.replace('image/', '').toUpperCase()}</div>
                <div>Quality Setting: {quality}%</div>
                {conversionResult && (
                  <div>
                    Status: <span className="text-emerald-500 font-semibold">Ready for download</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
