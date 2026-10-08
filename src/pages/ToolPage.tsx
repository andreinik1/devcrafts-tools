import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SvgCleanerTool } from '../components/tools/SvgCleanerTool';
import { JsonToTsTool } from '../components/tools/JsonToTsTool';
import { PxToRemTool } from '../components/tools/PxToRemTool';
import { CssShadowTool } from '../components/tools/CssShadowTool';
import { SEOContent } from '../components/common/SEOContent';
import { FAQAccordion } from '../components/common/FAQAccordion';
import { AdSlot } from '../components/common/AdSlot';
import type { FAQItem } from '../types';

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
          features: [
            'Removes Adobe Illustrator, Figma, and Inkscape metadata tags.',
            'Converts XML stroke/fill properties to React TSX camelCase attributes.',
            'Encodes SVG markup to clean Base64 / UTF-8 Data URIs.',
            'Reduces DOM node bloat by up to 60% without losing visual quality.',
          ],
          faq: [
            {
              question: 'Does this tool send my SVG graphics to a server?',
              answer: 'No. SVG Cleaner uses the native DOMParser API in your browser engine. Your graphics are processed 100% locally on your computer.',
            },
            {
              question: 'Why should I remove width and height attributes from SVG?',
              answer: 'Removing explicit width and height attributes while keeping the viewBox enables fluid CSS scaling, making your icons naturally responsive.',
            },
            {
              question: 'What is the advantage of converting SVG to a DataURI?',
              answer: 'DataURIs can be embedded directly into CSS background-image rules or inline HTML image tags, eliminating extra HTTP requests to external servers.',
            },
            {
              question: 'Is the exported React TSX component ready for production?',
              answer: 'Yes! Attributes like stroke-width and fill-rule are automatically mapped to camelCase React properties (strokeWidth, fillRule).',
            },
          ] as FAQItem[],
        };

      case 'json-to-typescript':
        return {
          title: t.jsonToTsTool.seoTitle,
          paragraphs: [
            t.jsonToTsTool.seoContent1,
            t.jsonToTsTool.seoContent2,
            t.jsonToTsTool.seoContent3,
          ],
          features: [
            'Supports nested JSON objects, arrays, and primitive types.',
            'Generates runtime validation schemas for the Zod library.',
            'Customizable type root naming and interface vs type declaration formats.',
            '100% private: ideal for confidential enterprise API responses.',
          ],
          faq: [
            {
              question: 'What is Zod and why is it generated alongside TypeScript types?',
              answer: 'TypeScript types exist only at compile-time. Zod provides runtime schema validation to ensure server responses match expected types when your app executes.',
            },
            {
              question: 'Can I generate interface instead of type aliases?',
              answer: 'Yes! Toggle the "Use interface instead of type" option in the generator settings panel.',
            },
            {
              question: 'How does array type inference work?',
              answer: 'The parser inspects array elements, automatically inferring primitive or complex child object type definitions.',
            },
            {
              question: 'Is there any payload size limitation?',
              answer: 'Because calculations run directly inside your browser JS engine, it can easily handle large JSON structures in milliseconds.',
            },
          ] as FAQItem[],
        };

      case 'px-to-rem':
        return {
          title: t.pxToRemTool.seoTitle,
          paragraphs: [
            t.pxToRemTool.seoContent1,
            t.pxToRemTool.seoContent2,
            t.pxToRemTool.seoContent3,
          ],
          features: [
            'Calculates precise REM/EM values based on custom base font size.',
            'Generates dynamic CSS clamp(min, preferred, max) formulas for typography.',
            'Produces copyable Tailwind CSS custom utility classes.',
            'Includes quick lookup reference tables for common pixel values.',
          ],
          faq: [
            {
              question: 'What is the default root base font size in browsers?',
              answer: 'Most modern web browsers set a default root font size of 16px (1rem = 16px). You can customize this base in our tool.',
            },
            {
              question: 'Why choose REM over PX for web typography?',
              answer: 'REM units adapt to user browser accessibility settings (e.g. enlarged text zoom), ensuring your site remains readable.',
            },
            {
              question: 'How does CSS clamp() work?',
              answer: 'CSS clamp(MIN, VAL, MAX) clamps a value between defined lower and upper bounds, dynamically computing fluid font sizes on viewport change.',
            },
            {
              question: 'Are these values compatible with Tailwind CSS?',
              answer: 'Yes, we generate direct Tailwind CSS arbitrary values like text-[clamp(1rem,2vw,2.5rem)] ready to paste into your components.',
            },
          ] as FAQItem[],
        };

      case 'css-shadow-generator':
        return {
          title: t.cssShadowTool.seoTitle,
          paragraphs: [
            t.cssShadowTool.seoContent1,
            t.cssShadowTool.seoContent2,
            t.cssShadowTool.seoContent3,
          ],
          features: [
            'Real-time box shadow elevation tuning with interactive sliders.',
            'Glassmorphism frosted glass backdrop-blur filter generation.',
            'Interactive dark and light preview canvas backgrounds.',
            'Instant copy for pure CSS properties and Tailwind CSS utility classes.',
          ],
          faq: [
            {
              question: 'What is Glassmorphism in web design?',
              answer: 'Glassmorphism combines translucent backgrounds, backdrop blur filters, and light borders to create frosted glass-like UI cards.',
            },
            {
              question: 'Which browsers support CSS backdrop-filter?',
              answer: 'Backdrop-filter is supported in all modern web browsers (Chrome, Safari, Firefox, Edge). We include -webkit- prefixes for Safari.',
            },
            {
              question: 'Can I export Tailwind CSS arbitrary shadow classes?',
              answer: 'Yes! Our tool formats box-shadow parameters into Tailwind arbitrary value syntax like shadow-[0px_10px_25px_rgba(0,0,0,0.4)].',
            },
            {
              question: 'How do inset box shadows differ from regular drop shadows?',
              answer: 'Inset shadows draw the shadow inside the boundary of the HTML element rather than casting it outside, creating an etched effect.',
            },
          ] as FAQItem[],
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
      <div className="min-h-[500px]">{renderToolComponent()}</div>

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
