import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Wrench, Layers, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { cleanSvg, type SvgCleanerOptions } from '../../utils/svgCleaner';
import {
  convertAndCompressImage,
  type ImageConversionOptions,
  type ImageConversionResult,
} from '../../utils/imageConverter';
import {
  generateBoxShadow,
  generateGlassmorphism,
  type ShadowConfig,
  type GlassConfig,
} from '../../utils/cssShadow';
import type { ActiveAsset, CanvasBackground } from '../../types';

import {
  DEFAULT_DEMO_SVG,
  SAMPLE_SHIELD_SVG,
  createSampleRasterDataUrl,
  dataUrlToFile,
  prepareSvgForRasterization,
  bakeAssetWithShadow,
} from './design/bakingUtils';
import { CanvasHub, StageCanvasPreview } from './design/CanvasHub';
import { VectorCleanTab } from './design/VectorCleanTab';
import { CssDepthTab } from './design/CssDepthTab';
import { CompressExportTab } from './design/CompressExportTab';
import { PasteModal } from './design/PasteModal';

export const DesignAssetsWorkspace: React.FC = () => {
  const { t, showToast } = useLanguage();
  const dw = t.designWorkspace;

  // 1. Shared Canvas State
  const [activeAsset, setActiveAsset] = useState<ActiveAsset | null>(() => {
    const defaultBlob = new Blob([DEFAULT_DEMO_SVG], { type: 'image/svg+xml' });
    return {
      name: 'cyber-badge.svg',
      type: 'svg',
      rawContent: DEFAULT_DEMO_SVG,
      fileObj: new File([defaultBlob], 'cyber-badge.svg', { type: 'image/svg+xml' }),
      size: defaultBlob.size,
    };
  });

  const [activeToolTab, setActiveToolTab] = useState<'svg-cleaner' | 'css-shadow' | 'image-converter'>('svg-cleaner');

  // Modal / drawer state for raw paste
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [pasteInputText, setPasteInputText] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDragOverCanvas, setIsDragOverCanvas] = useState(false);
  const [isBakingShadow, setIsBakingShadow] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Live Canvas Stage Options ---
  const [canvasBg, setCanvasBg] = useState<CanvasBackground>('glow');
  const [canvasScale, setCanvasScale] = useState<number>(1);
  const [applyShadowToCanvas, setApplyShadowToCanvas] = useState<boolean>(true);

  // --- SVG Cleaner State ---
  const [cleanerOptions, setCleanerOptions] = useState<SvgCleanerOptions>({
    removeComments: true,
    removeMetadata: true,
    removeDimensions: true,
    minifyCode: false,
    prettifyCode: true,
    camelCaseAttrs: true,
  });
  const [cleanerOutputTab, setCleanerOutputTab] = useState<'clean' | 'dataUri' | 'react'>('clean');

  // Compute cleaned SVG whenever activeAsset (if svg) or options change
  const cleanerResult = useMemo(() => {
    if (!activeAsset || activeAsset.type !== 'svg') return null;
    return cleanSvg(activeAsset.rawContent, cleanerOptions);
  }, [activeAsset, cleanerOptions]);

  // --- CSS Shadow & Glassmorphism State ---
  const [shadowMode, setShadowMode] = useState<'shadow' | 'glass'>('shadow');
  const [shadowTarget, setShadowTarget] = useState<'contour' | 'box'>('contour');
  const [glassPadding, setGlassPadding] = useState<number>(12);

  const [shadowConfig, setShadowConfig] = useState<ShadowConfig>({
    offsetX: 0,
    offsetY: 10,
    blur: 24,
    spread: 0,
    color: '#06b6d4',
    opacity: 0.5,
    inset: false,
  });

  const [glassConfig, setGlassConfig] = useState<GlassConfig>({
    bgOpacity: 0.15,
    blur: 16,
    borderOpacity: 0.25,
    borderWidth: 1,
    bgColor: '#ffffff',
    borderColor: '#ffffff',
  });

  const [shadowCodeTab, setShadowCodeTab] = useState<'css' | 'tailwind' | 'jsx'>('css');

  const shadowResult = useMemo(() => generateBoxShadow(shadowConfig), [shadowConfig]);
  const glassResult = useMemo(() => generateGlassmorphism(glassConfig), [glassConfig]);

  // Drop-shadow string for direct contour application
  const dropShadowCss = useMemo(() => {
    const hex = shadowConfig.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const rgba = `rgba(${r}, ${g}, ${b}, ${shadowConfig.opacity.toFixed(2)})`;
    return `drop-shadow(${shadowConfig.offsetX}px ${shadowConfig.offsetY}px ${shadowConfig.blur}px ${rgba})`;
  }, [shadowConfig]);

  const dropShadowTailwind = useMemo(() => {
    const hex = shadowConfig.color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) || 0;
    const g = parseInt(hex.substring(2, 4), 16) || 0;
    const b = parseInt(hex.substring(4, 6), 16) || 0;
    const rgbaClean = `rgba(${r},${g},${b},${shadowConfig.opacity.toFixed(2)})`;
    return `drop-shadow-[${shadowConfig.offsetX}px_${shadowConfig.offsetY}px_${shadowConfig.blur}px_${rgbaClean}]`;
  }, [shadowConfig]);

  // --- Image Converter State ---
  const [targetFormat, setTargetFormat] = useState<'image/webp' | 'image/png' | 'image/jpeg'>('image/webp');
  const [quality, setQuality] = useState<number>(85);
  const [conversionResult, setConversionResult] = useState<ImageConversionResult | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  // Convert the active asset whenever the asset or conversion settings change
  useEffect(() => {
    if (!activeAsset) return;

    let isCancelled = false;

    const convertAsset = async () => {
      setIsConverting(true);
      try {
        let fileToConvert: File;
        if (activeAsset.type === 'svg') {
          const preparedSvg = prepareSvgForRasterization(activeAsset.rawContent);
          const svgBlob = new Blob([preparedSvg], { type: 'image/svg+xml' });
          fileToConvert = new File([svgBlob], activeAsset.name.replace(/\.svg$/i, '') + '.svg', {
            type: 'image/svg+xml',
          });
        } else if (activeAsset.fileObj) {
          fileToConvert = activeAsset.fileObj;
        } else {
          fileToConvert = dataUrlToFile(activeAsset.rawContent, activeAsset.name);
        }

        const options: ImageConversionOptions = { format: targetFormat, quality };
        const res = await convertAndCompressImage(fileToConvert, options);
        if (!isCancelled) {
          setConversionResult(res);
        }
      } catch (err) {
        if (isCancelled) return;
        console.error('Image conversion error:', err);
        showToast('Failed to convert image. Please verify format support.', 'error');
      } finally {
        if (!isCancelled) {
          setIsConverting(false);
        }
      }
    };

    void convertAsset();

    return () => {
      isCancelled = true;
    };
  }, [activeAsset, quality, showToast, targetFormat]);

  // Copy helper with visual feedback
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(t.common.copied);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  // Download helper
  const handleDownloadFile = (content: string | Blob, filename: string, mime: string) => {
    let url: string;
    if (typeof content === 'string') {
      const blob = new Blob([content], { type: mime });
      url = URL.createObjectURL(blob);
    } else {
      url = URL.createObjectURL(content);
    }
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(t.common.downloaded || 'File downloaded successfully!');
  };

  // File Loader (Upload / Drop)
  const processLoadedFile = (file: File) => {
    const isSvg = file.type === 'image/svg+xml' || file.name.toLowerCase().endsWith('.svg');
    const isImage = file.type.startsWith('image/');

    if (!isSvg && !isImage) {
      showToast('Unsupported format. Please select an SVG or image file (PNG, JPG, WebP, etc.)', 'error');
      return;
    }

    const reader = new FileReader();
    if (isSvg) {
      reader.onload = (e) => {
        const text = e.target?.result as string;
        if (text) {
          setActiveAsset({
            name: file.name,
            type: 'svg',
            rawContent: text,
            fileObj: file,
            size: file.size,
          });
          showToast(`Loaded SVG: ${file.name}`);
        }
      };
      reader.readAsText(file);
    } else {
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          setActiveAsset({
            name: file.name,
            type: 'image',
            rawContent: dataUrl,
            fileObj: file,
            size: file.size,
          });
          showToast(`Loaded image: ${file.name}`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processLoadedFile(file);
      e.target.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCanvas(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCanvas(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOverCanvas(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processLoadedFile(file);
    }
  };

  const handleLoadPreset = (preset: 'cyber' | 'shield' | 'raster') => {
    if (preset === 'cyber') {
      const blob = new Blob([DEFAULT_DEMO_SVG], { type: 'image/svg+xml' });
      setActiveAsset({
        name: 'cyber-badge.svg',
        type: 'svg',
        rawContent: DEFAULT_DEMO_SVG,
        fileObj: new File([blob], 'cyber-badge.svg', { type: 'image/svg+xml' }),
        size: blob.size,
      });
      showToast('Loaded Cyber Badge (SVG)');
    } else if (preset === 'shield') {
      const blob = new Blob([SAMPLE_SHIELD_SVG], { type: 'image/svg+xml' });
      setActiveAsset({
        name: 'shield-badge.svg',
        type: 'svg',
        rawContent: SAMPLE_SHIELD_SVG,
        fileObj: new File([blob], 'shield-badge.svg', { type: 'image/svg+xml' }),
        size: blob.size,
      });
      showToast('Loaded Shield Badge (SVG)');
    } else if (preset === 'raster') {
      const dataUrl = createSampleRasterDataUrl();
      const file = dataUrlToFile(dataUrl, 'sample-graphic.png');
      setActiveAsset({
        name: 'sample-graphic.png',
        type: 'image',
        rawContent: dataUrl,
        fileObj: file,
        size: file.size,
      });
      showToast('Loaded Raster Graphic (PNG)');
    }
  };

  const handlePasteSubmit = () => {
    const trimmed = pasteInputText.trim();
    if (!trimmed) {
      setIsPasteModalOpen(false);
      return;
    }

    if (trimmed.startsWith('<svg') || trimmed.includes('<svg')) {
      const blob = new Blob([trimmed], { type: 'image/svg+xml' });
      setActiveAsset({
        name: 'pasted-vector.svg',
        type: 'svg',
        rawContent: trimmed,
        fileObj: new File([blob], 'pasted-vector.svg', { type: 'image/svg+xml' }),
        size: blob.size,
      });
      showToast('Pasted SVG XML markup loaded into Canvas!');
    } else if (trimmed.startsWith('data:image/')) {
      const file = dataUrlToFile(trimmed, 'pasted-image.png');
      setActiveAsset({
        name: 'pasted-image.png',
        type: 'image',
        rawContent: trimmed,
        fileObj: file,
        size: file.size,
      });
      showToast('Pasted DataURL image loaded into Canvas!');
    } else {
      showToast('Unrecognized content. Please paste valid <svg> markup or data:image URL.', 'error');
      return;
    }

    setPasteInputText('');
    setIsPasteModalOpen(false);
  };

  const handleApplyCleanedSvgToCanvas = () => {
    if (!cleanerResult || !activeAsset) return;
    const blob = new Blob([cleanerResult.cleanedSvg], { type: 'image/svg+xml' });
    setActiveAsset({
      ...activeAsset,
      rawContent: cleanerResult.cleanedSvg,
      size: cleanerResult.cleanedSize,
      fileObj: new File([blob], activeAsset.name, { type: 'image/svg+xml' }),
    });
    showToast('Cleaned SVG applied to Canvas Hub! All tools updated.', 'success');
  };

  const handleApplyConvertedToCanvas = () => {
    if (!conversionResult || !activeAsset) return;
    const ext = conversionResult.formatExtension;
    const newName = activeAsset.name.replace(/\.[^/.]+$/, '') + `.${ext}`;
    const file = new File([conversionResult.convertedBlob], newName, {
      type: conversionResult.convertedBlob.type,
    });
    setActiveAsset({
      name: newName,
      type: 'image',
      rawContent: conversionResult.convertedUrl,
      fileObj: file,
      size: conversionResult.convertedSize,
    });
    showToast(`Converted ${ext.toUpperCase()} set as active Canvas asset!`, 'success');
  };

  const activeAssetDataUri = useMemo(() => {
    if (!activeAsset) return '';
    if (activeAsset.type === 'svg') {
      const encoded = encodeURIComponent(activeAsset.rawContent).replace(/'/g, '%27').replace(/"/g, '%22');
      return `data:image/svg+xml;utf8,${encoded}`;
    }
    return activeAsset.rawContent;
  }, [activeAsset]);

  const handleBakeAndDownloadPng = async () => {
    if (!activeAsset) return;
    setIsBakingShadow(true);
    try {
      const { blob } = await bakeAssetWithShadow(
        activeAssetDataUri,
        shadowMode,
        shadowTarget,
        shadowConfig,
        glassConfig,
        glassPadding
      );
      const filename = activeAsset.name.replace(/\.[^/.]+$/, '') + '-styled.png';
      handleDownloadFile(blob, filename, 'image/png');
    } catch (err) {
      console.error('Bake shadow error:', err);
      showToast('Failed to bake shadow onto graphic.', 'error');
    } finally {
      setIsBakingShadow(false);
    }
  };

  const handleBakeAndPushToPipeline = async () => {
    if (!activeAsset) return;
    setIsBakingShadow(true);
    try {
      const { dataUrl, blob } = await bakeAssetWithShadow(
        activeAssetDataUri,
        shadowMode,
        shadowTarget,
        shadowConfig,
        glassConfig,
        glassPadding
      );
      const bakedName = activeAsset.name.replace(/\.[^/.]+$/, '') + '-styled.png';
      const bakedFile = new File([blob], bakedName, { type: 'image/png' });
      setActiveAsset({
        name: bakedName,
        type: 'image',
        rawContent: dataUrl,
        fileObj: bakedFile,
        size: blob.size,
      });
      setActiveToolTab('image-converter');
      showToast('Shadow baked directly into graphic! Sent to Image Converter pipeline.', 'success');
    } catch (err) {
      console.error('Bake shadow error:', err);
      showToast('Failed to bake shadow onto graphic.', 'error');
    } finally {
      setIsBakingShadow(false);
    }
  };

  return (
    <div className="space-y-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".svg,image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
      />

      {/* Top Banner and Dropzone */}
      <CanvasHub
        activeAsset={activeAsset}
        activeAssetDataUri={activeAssetDataUri}
        isDragOverCanvas={isDragOverCanvas}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onUploadClick={() => fileInputRef.current?.click()}
        onOpenPasteModal={() => setIsPasteModalOpen(true)}
        onLoadPreset={handleLoadPreset}
      />

      {/* Studio Grid: Stage Preview + Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Live Canvas Preview */}
        <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
          <StageCanvasPreview
            activeAsset={activeAsset}
            activeAssetDataUri={activeAssetDataUri}
            canvasBg={canvasBg}
            onChangeCanvasBg={setCanvasBg}
            canvasScale={canvasScale}
            onChangeCanvasScale={setCanvasScale}
            applyShadowToCanvas={applyShadowToCanvas}
            onToggleApplyShadow={setApplyShadowToCanvas}
            shadowMode={shadowMode}
            shadowTarget={shadowTarget}
            shadowResultCss={shadowResult.css}
            dropShadowCss={dropShadowCss}
            glassConfig={glassConfig}
            glassPadding={glassPadding}
            cleanerSavingsPercentage={cleanerResult?.savingsPercentage}
            conversionSavingsPercentage={conversionResult?.savingsPercentage}
          />
        </div>

        {/* Right Column: Inspector Tabs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              type="button"
              onClick={() => setActiveToolTab('svg-cleaner')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                activeToolTab === 'svg-cleaner'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Wrench className="w-3.5 h-3.5 shrink-0" />
              <span>{dw.tabVectorClean}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveToolTab('css-shadow')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                activeToolTab === 'css-shadow'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span>{dw.tabCssDepth}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveToolTab('image-converter')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-semibold text-xs transition-all cursor-pointer ${
                activeToolTab === 'image-converter'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 shrink-0" />
              <span>{dw.tabCompressExport}</span>
            </button>
          </div>

          {activeToolTab === 'svg-cleaner' && (
            <VectorCleanTab
              activeAsset={activeAsset}
              cleanerResult={cleanerResult}
              cleanerOptions={cleanerOptions}
              onChangeOptions={setCleanerOptions}
              outputTab={cleanerOutputTab}
              onChangeOutputTab={setCleanerOutputTab}
              copiedKey={copiedKey}
              onCopy={handleCopy}
              onDownloadFile={handleDownloadFile}
              onApplyCleanedToCanvas={handleApplyCleanedSvgToCanvas}
              onProceedToDepth={() => setActiveToolTab('css-shadow')}
              onLoadSampleSvg={() => handleLoadPreset('cyber')}
            />
          )}

          {activeToolTab === 'css-shadow' && (
            <CssDepthTab
              shadowMode={shadowMode}
              onChangeShadowMode={setShadowMode}
              shadowTarget={shadowTarget}
              onChangeShadowTarget={setShadowTarget}
              glassPadding={glassPadding}
              onChangeGlassPadding={setGlassPadding}
              shadowConfig={shadowConfig}
              onChangeShadowConfig={setShadowConfig}
              glassConfig={glassConfig}
              onChangeGlassConfig={setGlassConfig}
              shadowCodeTab={shadowCodeTab}
              onChangeShadowCodeTab={setShadowCodeTab}
              shadowResultCss={shadowResult.css}
              shadowResultTailwind={shadowResult.tailwind}
              dropShadowCss={dropShadowCss}
              dropShadowTailwind={dropShadowTailwind}
              glassResultCss={glassResult.css}
              glassResultTailwind={glassResult.tailwind}
              copiedKey={copiedKey}
              onCopy={handleCopy}
              isBakingShadow={isBakingShadow}
              onBakeAndDownloadPng={handleBakeAndDownloadPng}
              onBakeAndPushToPipeline={handleBakeAndPushToPipeline}
              onProceedToExport={() => setActiveToolTab('image-converter')}
            />
          )}

          {activeToolTab === 'image-converter' && (
            <CompressExportTab
              activeAsset={activeAsset}
              targetFormat={targetFormat}
              onChangeTargetFormat={setTargetFormat}
              quality={quality}
              onChangeQuality={setQuality}
              conversionResult={conversionResult}
              isConverting={isConverting}
              onDownloadConverted={() => {
                if (!conversionResult) return;
                const ext = conversionResult.formatExtension;
                const filename = (activeAsset?.name.replace(/\.[^/.]+$/, '') || 'converted') + `.${ext}`;
                handleDownloadFile(conversionResult.convertedBlob, filename, conversionResult.convertedBlob.type);
              }}
              onApplyConvertedToCanvas={handleApplyConvertedToCanvas}
            />
          )}
        </div>
      </div>

      {/* Paste Modal */}
      <PasteModal
        isOpen={isPasteModalOpen}
        inputText={pasteInputText}
        onChangeInput={setPasteInputText}
        onSubmit={handlePasteSubmit}
        onClose={() => setIsPasteModalOpen(false)}
      />
    </div>
  );
};

export default DesignAssetsWorkspace;