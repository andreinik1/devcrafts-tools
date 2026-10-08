export const en = {
  common: {
    appName: "VibeDev Tools",
    appTagline: "High-Performance Developer & Designer Micro-Utilities",
    clientSideNotice: "100% Client-Side • Your data never leaves your browser",
    copy: "Copy",
    copied: "Copied to clipboard!",
    download: "Download",
    downloaded: "File downloaded!",
    clear: "Clear",
    reset: "Reset",
    formatting: "Format",
    minifying: "Minify",
    searchPlaceholder: "Search tools (e.g., Image, Open Graph, SVG, JSON, REM)...",
    allTools: "All Micro-Tools",
    exploreTools: "Explore Tools",
    tryNow: "Try Tool",
    faqTitle: "Frequently Asked Questions",
    adsLabel: "Advertisement",
    sponsoredSlot: "AdSense Sponsored Space",
    noToolsFound: "No micro-tools found matching your query",
    clearSearch: "Clear search input",
  },
  nav: {
    home: "Home",
    tools: "Tools",
    svgCleaner: "SVG Cleaner",
    jsonToTs: "JSON to TS / Zod",
    pxToRem: "PX to REM",
    cssShadow: "CSS Shadow & Glass",
    imageConverter: "Image Converter",
    openGraphGenerator: "Open Graph Generator",
    about: "About",
    contact: "Contact",
    privacy: "Privacy Policy",
  },
  footer: {
    legalTitle: "Legal & Info",
    taglineDesc: "High-Performance Developer & Designer Micro-Utilities. Built with zero external backends to ensure 100% client-side privacy, lightning speed, and maximum developer productivity.",
    copyright: "© 2026 VibeDev Tools. All rights reserved. Google AdSense Compliant.",
    craftedWith: "Crafted with",
    forDevs: "for Web Developers & Designers",
  },
  hero: {
    badge: "⚡ Browser-Powered & Zero Server Latency",
    titlePrefix: "Essential Micro-Tools for Modern",
    titleHighlight: "Developers & Designers",
    description: "Boost your workflow with hyper-fast, 100% client-side utilities. Convert & compress images, generate Open Graph meta tags, clean SVGs, create TypeScript schemas, and design glassmorphism shadows instantly.",
    privacyGuarantee: "Privacy Guaranteed: All computations execute locally inside your Web Browser engine.",
  },
  toolsList: {
    svgCleaner: {
      title: "SVG Cleaner & DataURI Converter",
      desc: "Minify SVGs, scrub comments, attributes, and convert instantly to DataURI or React TSX components.",
      badge: "Popular",
    },
    jsonToTs: {
      title: "JSON to TypeScript & Zod Generator",
      desc: "Transform raw JSON into safe TypeScript interfaces, types, and production-ready Zod validation schemas.",
      badge: "TypeScript",
    },
    pxToRem: {
      title: "PX to REM & Fluid Typography Calculator",
      desc: "Convert pixels to REM/EM units effortlessly and generate CSS clamp() formulas for responsive layouts.",
      badge: "CSS / Layout",
    },
    cssShadow: {
      title: "CSS Shadow & Glassmorphism Generator",
      desc: "Design multi-layer box shadows and frosted glass backdrop-blur effects with live preview and Tailwind CSS export.",
      badge: "UI / UX",
    },
    imageConverter: {
      title: "Image Converter & Compressor",
      desc: "Convert and compress PNG, JPG, WEBP, GIF, and SVG images to WebP, PNG, or JPEG 100% in your browser.",
      badge: "Media / Compression",
    },
    openGraphGenerator: {
      title: "Meta Tags & Open Graph Generator",
      desc: "Generate social card meta tags for Facebook, Twitter/X, and Google Search with real-time live preview.",
      badge: "SEO / Marketing",
    },
  },
  svgCleanerTool: {
    title: "SVG Cleaner & DataURI Converter",
    subtitle: "Optimize vector graphics, strip bloated metadata, and export clean JSX or Data URI snippets.",
    dropzoneText: "Drag & drop your .svg file here, or click to browse",
    pasteLabel: "Or paste raw SVG code here:",
    cleanOptions: "Cleaning Options",
    removeComments: "Remove XML Comments",
    removeMetadata: "Remove Metadata & Titles",
    removeDimensions: "Remove Width/Height (Responsive viewBox)",
    minifyCode: "Minify SVG XML",
    prettifyCode: "Format / Indent XML",
    camelCaseAttrs: "Convert Attributes to React camelCase",
    cleanedOutput: "Optimized SVG Result",
    dataUriOutput: "Data URI (Base64 / UTF-8)",
    reactComponentOutput: "React JSX / TSX Component",
    statsOriginal: "Original Size",
    statsCleaned: "Optimized Size",
    statsSaved: "Savings",
    seoTitle: "Why SVG Optimization Matters for Web Performance",
    seoContent1: "Scalable Vector Graphics (SVG) have become the de-facto standard for icons, logos, and vector illustrations across modern web applications. However, graphic editors like Adobe Illustrator, Figma, Inkscape, and Sketch insert considerable bloat into exported SVG files. This unused metadata includes generator tags, editing histories, inline styling defaults, hidden layer nodes, XML namespaces, and verbose comments.",
    seoContent2: "Using unoptimized SVGs in your codebase increases HTML bundle sizes, degrades PageSpeed Insights scores, and slows down DOM rendering speeds. Our client-side SVG Cleaner parses your raw SVG markup using native DOM API trees, surgically stripping obsolete node attributes while maintaining visual fidelity.",
    seoContent3: "Additionally, converting clean vector assets directly into React TSX components or SVG Data URIs allows seamless integration into inline CSS background images or component design systems without extra HTTP requests. Everything is processed directly inside your browser window for maximum privacy and zero latency.",
    features: [
      "Removes Adobe Illustrator, Figma, and Inkscape metadata tags.",
      "Converts XML stroke/fill properties to React TSX camelCase attributes.",
      "Encodes SVG markup to clean Base64 / UTF-8 Data URIs.",
      "Reduces DOM node bloat by up to 60% without losing visual quality."
    ],
    faq: [
      {
        question: "Does this tool send my SVG graphics to a server?",
        answer: "No. SVG Cleaner parses XML data locally in your browser using native DOMParser APIs."
      },
      {
        question: "Why should I remove width and height attributes?",
        answer: "Removing fixed width/height while keeping viewBox enables SVGs to scale fluidly via CSS."
      },
      {
        question: "What is the advantage of SVG Data URIs?",
        answer: "Data URIs embed vector graphics directly into CSS or img src attributes, eliminating extra HTTP requests."
      },
      {
        question: "Are generated React TSX components production ready?",
        answer: "Yes! All SVG attributes like stroke-width are converted to React camelCase (strokeWidth)."
      }
    ]
  },
  jsonToTsTool: {
    title: "JSON to TypeScript & Zod Generator",
    subtitle: "Instantly convert JSON responses into strict TypeScript interfaces and Zod validation schemas.",
    inputLabel: "Input Raw JSON:",
    outputTsLabel: "Generated TypeScript Interfaces:",
    outputZodLabel: "Generated Zod Validation Schema:",
    rootTypeName: "Root Type Name:",
    useInterface: "Use 'interface' instead of 'type'",
    exportTypes: "Add 'export' keyword",
    makeOptional: "Auto-detect optional properties",
    invalidJson: "Invalid JSON syntax. Please check input.",
    validJson: "JSON syntax validated successfully.",
    downloadFileName: "types.ts",
    seoTitle: "Automated Type and Schema Generation for TypeScript",
    seoContent1: "In modern JavaScript and TypeScript application development, consuming REST APIs, GraphQL endpoints, or webhooks requires strong static typing. Manually writing TypeScript interfaces for complex nested JSON responses is slow, tedious, and error-prone.",
    seoContent2: "Our JSON to TypeScript and Zod converter recursively parses JSON data structures, inferring primitive types (string, number, boolean, null), arrays, unions, and deeply nested objects. It generates clean TypeScript types and Zod schemas instantly.",
    seoContent3: "Combining TypeScript static typing with Zod runtime validation ensures end-to-end type safety in your applications. All parsing happens 100% on the client side for complete privacy.",
    features: [
      "Supports nested JSON objects, arrays, and primitive data types.",
      "Generates runtime validation schemas for the Zod library.",
      "Flexible configuration for interface/type formatting and root naming.",
      "100% private: ideal for confidential API payloads."
    ],
    faq: [
      {
        question: "What is Zod and why generate it alongside TypeScript types?",
        answer: "TypeScript types exist only at compile time. Zod provides runtime validation to ensure actual payload compliance."
      },
      {
        question: "Can I generate interfaces instead of type aliases?",
        answer: "Yes! Check the 'Use interface instead of type' option in generator settings."
      },
      {
        question: "How does array type detection work?",
        answer: "The parser inspects array elements to infer primitive or merged object interface structures."
      },
      {
        question: "Is there any limit on JSON payload size?",
        answer: "Because processing happens locally in your browser, large JSON structures parse in milliseconds."
      }
    ]
  },
  pxToRemTool: {
    title: "PX to REM & Fluid Typography Calculator",
    subtitle: "Convert pixels to REM/EM units and generate CSS clamp() formulas for responsive typography.",
    baseFontSize: "Base Font Size (px):",
    pxInput: "Pixel Value (px):",
    remOutput: "REM Value:",
    emOutput: "EM Value:",
    fluidTitle: "Fluid Typography Calculator",
    minPx: "Min Font Size (px):",
    maxPx: "Max Font Size (px):",
    minViewport: "Min Screen Width (px):",
    maxViewport: "Max Screen Width (px):",
    clampFormula: "Generated CSS clamp() Formula:",
    tailwindClass: "Tailwind CSS Arbitrary Class:",
    lookupTableTitle: "Quick PX ↔ REM Conversion Reference",
    seoTitle: "Responsive Typography with REM and CSS clamp()",
    seoContent1: "Fixed pixel (`px`) values limit website responsiveness and accessibility. Users with customized browser font sizes experience broken or unscalable layouts when styling relies solely on pixels.",
    seoContent2: "Relative `rem` (root em) units scale relative to the root HTML font size (typically 16px). Converting margins, padding, and font sizes to REM ensures proportional rendering across all devices.",
    seoContent3: "Utilizing modern CSS `clamp(MIN, VAL, MAX)` functions enables fluid typography that scales smoothly with viewport width. Our calculator computes exact math formulas and Tailwind CSS utility classes.",
    features: [
      "Calculates exact REM/EM values based on custom base font sizes.",
      "Generates dynamic CSS clamp(min, preferred, max) formulas.",
      "Outputs ready-to-use Tailwind CSS arbitrary utility classes.",
      "Includes a quick-reference conversion lookup table."
    ],
    faq: [
      {
        question: "What is the default browser base font size?",
        answer: "Most web browsers default to 16px (1rem = 16px). You can adjust this in our calculator."
      },
      {
        question: "Why choose REM over PX?",
        answer: "REM units respect user browser accessibility preferences and zoom settings."
      },
      {
        question: "How does CSS clamp() work?",
        answer: "CSS clamp(MIN, VAL, MAX) constrains a fluid value between defined lower and upper bounds."
      },
      {
        question: "Are clamp formulas compatible with Tailwind CSS?",
        answer: "Yes, we generate Tailwind arbitrary classes like text-[clamp(1rem,2vw,2.5rem)] for quick copying."
      }
    ]
  },
  cssShadowTool: {
    title: "CSS Shadow & Glassmorphism Generator",
    subtitle: "Craft smooth multi-layered box shadows and frosted glass backdrop-blur visual components.",
    modeShadow: "Box Shadow Generator",
    modeGlass: "Glassmorphism Generator",
    presetLabel: "Quick Presets:",
    offsetX: "Offset X (px):",
    offsetY: "Offset Y (px):",
    blurRadius: "Blur Radius (px):",
    spreadRadius: "Spread Radius (px):",
    shadowColor: "Shadow Color & Opacity:",
    insetShadow: "Inset Shadow",
    glassBgOpacity: "Background Opacity:",
    glassBlur: "Backdrop Blur (px):",
    glassBorderOpacity: "Border Opacity:",
    glassBorderWidth: "Border Width (px):",
    previewBoxTitle: "Interactive Live Preview",
    outputCss: "Pure CSS Rules:",
    outputTailwind: "Tailwind CSS Classes:",
    seoTitle: "Designing Modern UI Depth with Layered Shadows and Glassmorphism",
    seoContent1: "Visual hierarchy and depth are fundamental pillars of modern web design systems. Moving away from harsh, single-layer legacy drop shadows, modern design languages (such as Apple iOS, Vercel, and Linear) utilize multi-layered soft shadows and translucent frosted glass UI elements.",
    seoContent2: "Glassmorphism leverages CSS `backdrop-filter: blur(...)` combined with translucent background layers and subtle light-reflecting borders. This creates a tactile, elevated visual surface that lets background content subtly shine through while maintaining visual readability.",
    seoContent3: "Our CSS Shadow and Glassmorphism Generator provides fine-grained control over offsets, spread radii, background opacity, and backdrop blur. Test your components against custom dark and light preview backgrounds and copy production-ready CSS or Tailwind CSS utility classes immediately.",
    features: [
      "Real-time box shadow elevation tuning with interactive sliders.",
      "Glassmorphism frosted glass backdrop-blur filter generation.",
      "Interactive dark and light preview canvas backgrounds.",
      "Instant copy for pure CSS properties and Tailwind CSS utility classes."
    ],
    faq: [
      {
        question: "What is Glassmorphism in web design?",
        answer: "Glassmorphism combines translucent backgrounds, backdrop blur filters, and light borders to create frosted glass-like UI cards."
      },
      {
        question: "Which browsers support CSS backdrop-filter?",
        answer: "Backdrop-filter is supported in all modern web browsers (Chrome, Safari, Firefox, Edge). We include -webkit- prefixes for Safari."
      },
      {
        question: "Can I export Tailwind CSS arbitrary shadow classes?",
        answer: "Yes! Our tool formats box-shadow parameters into Tailwind arbitrary value syntax like shadow-[0px_10px_25px_rgba(0,0,0,0.4)]."
      },
      {
        question: "How do inset box shadows differ from regular drop shadows?",
        answer: "Inset shadows draw the shadow inside the boundary of the HTML element rather than casting it outside, creating an etched effect."
      }
    ]
  },
  imageConverterTool: {
    title: "Image to WebP/PNG/JPG Converter & Compressor",
    subtitle: "Convert formats, optimize file size, and inspect compression savings 100% locally in your browser.",
    dragDropTitle: "Drag & Drop Image Here",
    dragDropSubtitle: "or click to browse files (PNG, JPG, WEBP, GIF, SVG)",
    targetFormatLabel: "Select Output Format:",
    qualityLabel: "Compression Quality:",
    savingsLabel: "File Size Reduction:",
    reducedBy: "Size reduced by {percent}",
    originalTitle: "Original Image",
    convertedTitle: "Converted Result",
    downloadBtn: "Download Converted Image",
    seoTitle: "Why Converting and Compressing Web Images Matters for SEO & Performance",
    seoContent1: "Images account for over 60% of total web page payload. Serving unoptimized JPEG or PNG graphics degrades Core Web Vitals (LCP), delays initial rendering, and wastes mobile data bandwidth for site visitors.",
    seoContent2: "Modern image formats like WebP offer superior lossy and lossless compression compared to legacy formats, reducing file size by 30% to 80% with virtually imperceptible visual quality loss. Processing images directly inside your browser ensures uncompressed source files remain 100% private.",
    seoContent3: "Our client-side Image Converter utilizes the HTML5 Canvas API and native toBlob rendering pipelines. Adjust quality parameters in real-time, inspect visual fidelity side-by-side, and download production-ready WebP, PNG, or JPEG files instantly.",
    features: [
      "100% client-side execution — image files never upload to remote servers.",
      "Supports input formats: PNG, JPG, WEBP, GIF, and SVG.",
      "Export to WebP, PNG, and JPEG with custom 1%–100% compression quality sliders.",
      "Real-time file size comparison and savings counter."
    ],
    faq: [
      {
        question: "Are my uploaded image files stored or sent to a server?",
        answer: "No. All conversion and compression operations run locally inside your browser using HTML5 Canvas APIs."
      },
      {
        question: "Why should I convert images to WebP format?",
        answer: "WebP provides significantly smaller file sizes than PNG and JPEG while preserving visual clarity, helping your site load faster."
      },
      {
        question: "How does transparent PNG conversion to JPEG work?",
        answer: "When converting transparent PNGs to JPEG, a white background fill is automatically applied to prevent black artifacts."
      },
      {
        question: "What is the recommended compression quality setting?",
        answer: "A quality slider setting of 75%–85% provides optimal file size savings with imperceptible visual loss."
      }
    ]
  },
  openGraphGeneratorTool: {
    title: "Meta Tags & Open Graph Generator",
    subtitle: "Generate social media meta tags and preview live Google, Twitter/X, and Facebook card cards.",
    formTitle: "Meta Tag Parameters",
    metaTitleLabel: "Page Title (<title> & og:title):",
    metaDescLabel: "Meta Description:",
    canonicalUrlLabel: "Canonical / Target URL:",
    ogImageUrlLabel: "Open Graph Image URL:",
    siteNameLabel: "Site Name (og:site_name):",
    typeLabel: "Resource Type (og:type):",
    twitterHandleLabel: "Twitter / X Handle (@user):",
    previewTitle: "Live Card Preview",
    codeTitle: "Generated HTML Meta Tags",
    copyAllBtn: "Copy All Meta Tags",
    seoTitle: "The Importance of Open Graph and Social Meta Tags for Web Traffic",
    seoContent1: "When links to your website or blog articles are shared across social platforms like Facebook, Twitter/X, LinkedIn, Slack, or Discord, crawler bots scan HTML <head> tags to render visual preview cards.",
    seoContent2: "High-quality social preview cards with engaging titles, descriptions, and crisp 1200x630 banner images significantly increase click-through rates (CTR) from social feeds. Properly configured canonical links and meta descriptions also improve Google Search ranking.",
    seoContent3: "Our Open Graph Generator simplifies meta tag creation by providing interactive real-time visual card previews for Google Search, Twitter/X, and Open Graph platforms. Copy standard HTML markup with one click.",
    features: [
      "Generates Primary HTML, Open Graph, and Twitter Card meta tags.",
      "Real-time live card previews for Facebook/Slack, Twitter/X, and Google Search.",
      "Supports title, description, image URL, canonical URL, site name, and twitter handle.",
      "One-click copy and download for production HTML <head> markup."
    ],
    faq: [
      {
        question: "What is Open Graph (OG)?",
        answer: "Open Graph is a protocol created by Facebook that enables any web page to become a rich object in social media feeds."
      },
      {
        question: "What is the recommended Open Graph image size?",
        answer: "The ideal Open Graph banner image resolution is 1200 × 630 pixels with an aspect ratio of 1.91:1."
      },
      {
        question: "How do Twitter / X Cards differ from Open Graph?",
        answer: "Twitter Cards use twitter:card meta tags to specify card formats like summary_large_image alongside standard OG tags."
      },
      {
        question: "Where should I paste these generated meta tags?",
        answer: "Paste the generated HTML snippet inside the <head> ... </head> section of your web page or template header."
      }
    ]
  },
  about: {
    title: "About VibeDev Tools",
    subtitle: "Built by developers for developers — zero servers, maximum performance.",
    missionTitle: "Our Mission",
    missionDesc: "VibeDev Tools was created to provide web developers, UI/UX designers, and software engineers with a suite of lightweight, hyper-fast micro-utilities. We believe developer tools should be instantaneous, distraction-free, and privacy-preserving.",
    privacyTitle: "100% Client-Side Privacy Architecture",
    privacyDesc: "Unlike traditional web utilities that upload your sensitive data, SVG icons, or JSON payloads to remote servers for processing, VibeDev Tools executes 100% of calculations inside your browser using modern Web APIs and TypeScript. Your data never touches any remote database or backend network.",
    stackTitle: "Modern Tech Stack",
    stackDesc: "Powered by React, Vite, TypeScript, and Tailwind CSS with responsive dark & light themes.",
  },
  contact: {
    title: "Get in Touch",
    subtitle: "Have a feature suggestion, tool request, or bug report? Reach out to us!",
    nameLabel: "Your Name",
    emailLabel: "Email Address",
    subjectLabel: "Subject",
    messageLabel: "Your Message",
    sendBtn: "Send Message",
    successToast: "Thank you! Your message has been received.",
    contactInfoTitle: "Direct Communication",
    emailDirect: "support@vibedev.tools",
    responseNotice: "We typically respond to developer queries within 24–48 hours.",
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "Last updated: October 2026",
    section1Title: "1. Overview & Data Security",
    section1Text: "VibeDev Tools values user privacy above all else. All tool operations (SVG cleaning, JSON conversion, unit calculations, CSS shadow generation) are performed entirely within your client web browser. We do not transmit, collect, or store any source code, raw data, or design assets created within our tools.",
    section2Title: "2. Advertising & Google AdSense",
    section2Text: "To support the maintenance and ongoing development of VibeDev Tools, we display third-party advertisements provided by Google AdSense. Google AdSense uses cookies and web beacons to serve advertisements based on user visits to this and other websites on the Internet.",
    section3Title: "3. Cookies & Local Storage",
    section3Text: "We use browser LocalStorage strictly to store user interface preferences (such as your chosen language selection and theme setting). No personal identification data or sensitive information is saved or shared.",
    section4Title: "4. Third-Party Links",
    section4Text: "Our website may contain links to external developer resources, documentation, or code repositories. We are not responsible for the privacy practices or content of third-party websites.",
    section5Title: "5. Contact Information",
    section5Text: "If you have questions regarding this Privacy Policy, feel free to contact us at privacy@vibedev.tools.",
  }
};