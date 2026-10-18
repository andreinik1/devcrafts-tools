export const workspaces = {
  "workspacesList": {
    "frontendDev": {
      "name": "Frontend Suite",
      "desc": "Complete toolkit for React, Vue, and Tailwind developers"
    },
    "designToCode": {
      "name": "Design & Assets",
      "desc": "SVG, CSS generators, and image optimization workspace"
    },
    "apiAndData": {
      "name": "API & Data Tools",
      "desc": "JSON formatting, TypeScript generation, and mock utilities"
    },
    "seoAndMeta": {
      "name": "SEO & Social Meta",
      "desc": "OpenGraph, preview generators, and meta tags tools"
    }
  },
  "frontendWorkspace": {
    "seoTitle": "Frontend Suite: Professional Development Tools",
    "seoContent1": "A comprehensive workspace tailored for modern frontend engineers working with React, Vue, and Tailwind CSS.",
    "seoContent2": "Everything runs 100% client-side in your browser, ensuring lightning-fast performance and total privacy for your code snippets.",
    "seoContent3": "Streamline your daily layout routine, build cleaner interfaces, and speed up component structuring without backend latency.",
    "features": [
      "Executes 100% client-side with zero backend database logs.",
      "Powered by modern HTML5 DOM APIs and Vite TypeScript compilation.",
      "Optimized for utility-first CSS frameworks and modern UI component trees.",
      "Instant real-time DOM parsing and state synchronization."
    ],
    "faq": [
      {
        "question": "Are my frontend snippets sent to a server?",
        "answer": "No. All code transformations and utilities run strictly inside your browser's local context."
      },
      {
        "question": "What frameworks are supported in this workspace?",
        "answer": "The tools are tailored for React, Vue, Next.js, and general Tailwind CSS workflows."
      }
    ]
  },
  "designWorkspace": {
    "seoTitle": "Design & Assets: SVG, CSS, and Image Utilities",
    "seoContent1": "An ultimate toolkit for managing vector graphics, shadow effects, and graphic asset transformations.",
    "seoContent2": "Clean bloated SVGs, generate complex CSS box shadows visually, and convert image formats instantly without losing quality.",
    "seoContent3": "Designed to bridge the gap between design specs and production-ready code elements.",
    "features": [
      "Removes redundant design metadata and unnecessary XML markup layers.",
      "Generates clean, multi-layered CSS box shadows with live visual previews.",
      "Converts raster images between formats locally without uploading files.",
      "Reduces asset sizes significantly while preserving visual fidelity."
    ],
    "faq": [
      {
        "question": "Is image conversion safe for confidential files?",
        "answer": "Yes! Files are processed via local browser canvas APIs and never leave your device."
      },
      {
        "question": "Can I export CSS box shadows directly?",
        "answer": "Yes, you can copy the production-ready CSS snippet with a single click."
      }
    ],
    "pipelineBadge": "Shared Canvas Pipeline",
    "activeCanvasTitle": "Active Asset Canvas",
    "tabVectorClean": "1. Vector Clean",
    "tabCssDepth": "2. CSS Depth & Shadows",
    "tabCompressExport": "3. Compress & Export",
    "uploadBtn": "Upload File",
    "pasteBtn": "Paste Code",
    "presetsLabel": "Presets:",
    "noAssetLoaded": "No asset loaded",
    "vectorXmlBadge": "Vector XML",
    "rasterImageBadge": "Raster Image",
    "dragHint": "Drag & drop files anytime to replace",
    "dropOverlayText": "Drop file here to load into Canvas",
    "applyShadowCheckbox": "Apply CSS Shadow to Canvas",
    "pipelineSyncLabel": "Pipeline Sync:",
    "svgOptimizedStatus": "SVG Cleaned (-{percent}%)",
    "svgLoadedStatus": "SVG Loaded",
    "webpReadyStatus": "WebP Ready (-{percent}%)",
    "imageLoadedStatus": "Image Loaded",
    "rasterWarningTitle": "Raster Image Active",
    "rasterWarningDesc": "Vector cleaning parses XML nodes. For this raster image, switch to CSS Depth Studio to apply shadows, or Compress & Export to optimize format.",
    "loadSampleSvgBtn": "Load Sample SVG",
    "goToDepthBtn": "Go to Depth Studio →",
    "cleanerHeaderTitle": "Vector XML Cleaning & Compression",
    "cleanerHeaderDesc": "Strip metadata tags, format viewBox and convert attributes to React JSX.",
    "cleanedSizeLabel": "Cleaned Size",
    "copyCodeBtn": "Copy",
    "downloadCodeBtn": "Download",
    "updateCanvasWithCleanedBtn": "Update Canvas Asset with Cleaned SVG",
    "proceedToDepthBtn": "Proceed to Depth Studio",
    "bakeShadowTitle": "Bake Shadow into Graphic Output",
    "bakeShadowDesc": "Render the asset with its generated box shadow or glassmorphism into a standalone PNG graphic.",
    "bakeAndDownloadPngBtn": "Download Styled PNG with Shadow",
    "bakeToPipelineBtn": "Bake Shadow & Push to Pipeline",
    "proceedToExportBtn": "Proceed to Compression & WebP Export",
    "formatOptimizationTitle": "WebP / PNG / JPEG Format Optimization",
    "formatOptimizationSvgDesc": "Vector SVG will be rasterized on canvas and compressed.",
    "formatOptimizationRasterDesc": "Compress raster image with native HTML5 Canvas APIs.",
    "targetFormatLabel": "Target Format",
    "qualityLabel": "Compression Quality",
    "sourceFileLabel": "Source File",
    "convertedFileLabel": "Converted",
    "downloadConvertedBtn": "Download",
    "promoteToCanvasBtn": "Promote to Active Canvas Asset",
    "pasteModalTitle": "Paste Raw SVG or Image DataURL",
    "pasteModalPlaceholder": "Paste <svg> markup or data:image URL...",
    "cancelBtn": "Cancel",
    "loadIntoCanvasBtn": "Load into Canvas Hub",
    "glowBg": "Glow",
    "darkBg": "Dark",
    "lightBg": "Light",
    "gridBg": "Grid",
    "rawCanvasAsset": "Raw Canvas Asset",
    "boxShadowApplied": "Shadow Applied to Graphic",
    "glassApplied": "Glassmorphism Applied",
    "shadowTargetLabel": "Shadow Target",
    "shadowTypeContour": "Graphic Silhouette (Drop Shadow)",
    "shadowTypeBox": "Tight Box (Box Shadow)",
    "glassPaddingLabel": "Glass Frame Padding",
    "tightPadding": "Snug (8px)",
    "balancedPadding": "Framed (16px)"
  },
  "apiWorkspace": {
    "seoTitle": "API & Data Tools: JSON, TypeScript & Mocks",
    "seoContent1": "Essential developer workspace for transforming JSON responses into strict TypeScript interfaces instantly.",
    "seoContent2": "Format raw payloads, validate schemas, and prepare mock data structures for your backend integration.",
    "seoContent3": "Eliminate manual typing work when dealing with third-party API payloads.",
    "features": [
      "Transforms raw JSON payloads into strict TypeScript interfaces instantly.",
      "Minifies, beautifies, and validates nested JSON data structures.",
      "Handles recursive nested object mapping automatically.",
      "Generates mock dataset structures for rapid frontend prototyping."
    ],
    "faq": [
      {
        "question": "Does it support deeply nested JSON objects?",
        "answer": "Yes, the parser recursively walks through all child nodes to generate complete types."
      },
      {
        "question": "Can I format minified API responses?",
        "answer": "Yes, you can beautify or minify any valid JSON string in milliseconds."
      }
    ]
  },
  "seoWorkspace": {
    "seoTitle": "SEO & Social Meta: OpenGraph & Tags Generator",
    "seoContent1": "Optimize your web pages for search engines and social media platforms with precision meta generators.",
    "seoContent2": "Preview how your links look on Twitter, LinkedIn, Facebook, and other platforms before deployment.",
    "seoContent3": "Generate complete, standards-compliant OpenGraph tags and Twitter card headers effortlessly.",
    "features": [
      "Generates fully compliant OpenGraph and Twitter card meta tags.",
      "Provides real-time visual previews for major social network link cards.",
      "Validates meta title and description lengths instantly.",
      "Outputs copy-paste ready HTML head markup for production deployment."
    ],
    "faq": [
      {
        "question": "Are generated meta tags SEO friendly?",
        "answer": "Yes, they strictly follow up-to-date search engine and social media protocol standards."
      },
      {
        "question": "Can I preview image cards for social sharing?",
        "answer": "Yes, you can test how titles, descriptions, and preview images appear across platforms."
      }
    ]
  }
};
