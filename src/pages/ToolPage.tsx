import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SvgCleanerTool } from '../components/tools/SvgCleanerTool';
import { JsonToTsTool } from '../components/tools/JsonToTsTool';
import { PxToRemTool } from '../components/tools/PxToRemTool';
import { CssShadowTool } from '../components/tools/CssShadowTool';
import { ImageConverterTool } from '../components/tools/ImageConverterTool';
import { OpenGraphGeneratorTool } from '../components/tools/OpenGraphGeneratorTool';
import { SEOContent } from '../components/common/SEOContent';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { AdSlot } from '../components/common/AdSlot';

export const ToolPage: React.FC = () => {
  const { toolId } = useParams<{ toolId: string }>();
  const { t } = useLanguage();

  if (!toolId) {
    return <Navigate to="/" replace />;
  }

  const renderToolComponent = () => {
    switch (toolId) {
      case 'svg-cleaner':
        return <SvgCleanerTool />;
      case 'json-to-typescript':
        return <JsonToTsTool />;
      case 'px-to-rem':
        return <PxToRemTool />;
      case 'css-shadow-generator':
        return <CssShadowTool />;
      case 'image-converter':
        return <ImageConverterTool />;
      case 'open-graph-generator':
        return <OpenGraphGeneratorTool />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  const getToolSEOData = () => {
    switch (toolId) {
      case 'svg-cleaner':
        return {
          title: t.svgCleanerTool.seoTitle,
          paragraphs: [
            t.svgCleanerTool.seoContent1,
            t.svgCleanerTool.seoContent2,
            t.svgCleanerTool.seoContent3,
          ],
          features: t.svgCleanerTool.features,
          faq: t.svgCleanerTool.faq,
        };

      case 'json-to-typescript':
        return {
          title: t.jsonToTsTool.seoTitle,
          paragraphs: [
            t.jsonToTsTool.seoContent1,
            t.jsonToTsTool.seoContent2,
            t.jsonToTsTool.seoContent3,
          ],
          features: t.jsonToTsTool.features,
          faq: t.jsonToTsTool.faq,
        };

      case 'px-to-rem':
        return {
          title: t.pxToRemTool.seoTitle,
          paragraphs: [
            t.pxToRemTool.seoContent1,
            t.pxToRemTool.seoContent2,
            t.pxToRemTool.seoContent3,
          ],
          features: t.pxToRemTool.features,
          faq: t.pxToRemTool.faq,
        };

      case 'css-shadow-generator':
        return {
          title: t.cssShadowTool.seoTitle,
          paragraphs: [
            t.cssShadowTool.seoContent1,
            t.cssShadowTool.seoContent2,
            t.cssShadowTool.seoContent3,
          ],
          features: t.cssShadowTool.features,
          faq: t.cssShadowTool.faq,
        };

      case 'image-converter':
        return {
          title: t.imageConverterTool.seoTitle,
          paragraphs: [
            t.imageConverterTool.seoContent1,
            t.imageConverterTool.seoContent2,
            t.imageConverterTool.seoContent3,
          ],
          features: t.imageConverterTool.features,
          faq: t.imageConverterTool.faq,
        };

      case 'open-graph-generator':
        return {
          title: t.openGraphGeneratorTool.seoTitle,
          paragraphs: [
            t.openGraphGeneratorTool.seoContent1,
            t.openGraphGeneratorTool.seoContent2,
            t.openGraphGeneratorTool.seoContent3,
          ],
          features: t.openGraphGeneratorTool.features,
          faq: t.openGraphGeneratorTool.faq,
        };

      default:
        return {
          title: 'Micro-Tool Documentation',
          paragraphs: [],
          features: [],
          faq: [],
        };
    }
  };

  const seoData = getToolSEOData();

  return (
    <div className="space-y-8">
      {/* Top Banner AdSlot */}
      <AdSlot type="banner" slotId="1122334455" />

      {/* Main Tool Component */}
      <div className="min-h-[450px]">{renderToolComponent()}</div>

      {/* In-Article AdSlot */}
      <AdSlot type="in-article" slotId="5566778899" />

      {/* SEO Article & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SEOContent
            title={seoData.title}
            paragraphs={seoData.paragraphs}
            features={seoData.features}
          />

          <FAQAccordion items={seoData.faq} />
        </div>

        {/* Sidebar AdSlot */}
        <div className="lg:col-span-1 space-y-6">
          <div className="sticky top-24">
            <AdSlot type="sidebar" slotId="9988776655" />
          </div>
        </div>
      </div>
    </div>
  );
};

