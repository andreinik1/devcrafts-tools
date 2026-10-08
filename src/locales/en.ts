export const en = {
  common: {
    appName: "VibeDev Tools",
    appTagline: "High-Performance Developer & Designer Micro-Utilities",
    clientSideNotice: "100% Client-Side • Your data never leaves your browser",
    copy: "Copy",
    copied: "Copied to clipboard!",
    download: "Download",
    clear: "Clear",
    reset: "Reset",
    formatting: "Format",
    minifying: "Minify",
    searchPlaceholder: "Search tools (e.g., SVG, JSON, REM, Glassmorphism)...",
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
    description: "Boost your workflow with hyper-fast, 100% client-side utilities. Clean SVGs, generate TypeScript & Zod schemas, calculate fluid REM typography, and design glassmorphism shadows instantly.",
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
    }
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
        answer: "No. SVG Cleaner uses the native DOMParser API in your browser engine. Your graphics are processed 100% locally on your computer."
      },
      {
        question: "Why should I remove width and height attributes from SVG?",
        answer: "Removing explicit width and height attributes while keeping the viewBox enables fluid CSS scaling, making your icons naturally responsive."
      },
      {
        question: "What is the advantage of converting SVG to a DataURI?",
        answer: "DataURIs can be embedded directly into CSS background-image rules or inline HTML image tags, eliminating extra HTTP requests to external servers."
      },
      {
        question: "Is the exported React TSX component ready for production?",
        answer: "Yes! Attributes like stroke-width and fill-rule are automatically mapped to camelCase React properties (strokeWidth, fillRule)."
      }
    ]
  },
  jsonToTsTool: {
    title: "JSON to TypeScript & Zod Generator",
    subtitle: "Instantly parse JSON payloads into strictly-typed TypeScript interfaces and runtime Zod validation schemas.",
    inputLabel: "Input JSON Data:",
    outputTsLabel: "Generated TypeScript Definitions:",
    outputZodLabel: "Generated Zod Validation Schema:",
    rootTypeName: "Root Type Name:",
    useInterface: "Use 'interface' instead of 'type'",
    exportTypes: "Add 'export' keyword",
    makeOptional: "Detect optional fields",
    invalidJson: "Invalid JSON format. Please verify syntax.",
    validJson: "Valid JSON syntax verified.",
    downloadFileName: "types.ts",
    seoTitle: "Eliminate Manual Type Writing with Automated Schema Generation",
    seoContent1: "In modern JavaScript and TypeScript development, communicating with REST APIs, GraphQL endpoints, or third-party webhooks requires strict type safety. Manually writing TypeScript interfaces for complex nested JSON responses is tedious and error-prone, frequently resulting in subtle runtime bugs when field names or data types change.",
    seoContent2: "Our JSON to TypeScript and Zod Schema Generator recursively inspects sample JSON payloads, inferring primitive types (string, number, boolean, null), complex arrays, union types, and deeply nested child objects. It creates organized, clean TypeScript type definitions alongside Zod validation schemas.",
    seoContent3: "By leveraging Zod runtime validation alongside TypeScript compile-time safety, you can validate incoming server responses at runtime without writing tedious boilerplate validator functions. All JSON parsing happens 100% client-side, ensuring proprietary enterprise payload schemas remain completely private.",
    features: [
      "Supports nested JSON objects, arrays, and primitive types.",
      "Generates runtime validation schemas for the Zod library.",
      "Customizable type root naming and interface vs type declaration formats.",
      "100% private: ideal for confidential enterprise API responses."
    ],
    faq: [
      {
        question: "What is Zod and why is it generated alongside TypeScript types?",
        answer: "TypeScript types exist only at compile-time. Zod provides runtime schema validation to ensure server responses match expected types when your app executes."
      },
      {
        question: "Can I generate interface instead of type aliases?",
        answer: "Yes! Toggle the 'Use interface instead of type' option in the generator settings panel."
      },
      {
        question: "How does array type inference work?",
        answer: "The parser inspects array elements, automatically inferring primitive or complex child object type definitions."
      },
      {
        question: "Is there any payload size limitation?",
        answer: "Because calculations run directly inside your browser JS engine, it can easily handle large JSON structures in milliseconds."
      }
    ]
  },
  pxToRemTool: {
    title: "PX to REM & Fluid Typography Calculator",
    subtitle: "Convert static pixel measurements to scalable REM/EM units and generate responsive CSS clamp() formulas.",
    baseFontSize: "Root Base Font Size (px):",
    pxInput: "Pixel Value (px):",
    remOutput: "REM Value:",
    emOutput: "EM Value:",
    fluidTitle: "Fluid Typography & Dynamic Spacing Calculator",
    minPx: "Min Font Size (px):",
    maxPx: "Max Font Size (px):",
    minViewport: "Min Viewport Width (px):",
    maxViewport: "Max Viewport Width (px):",
    clampFormula: "Generated CSS clamp() Formula:",
    tailwindClass: "Tailwind CSS Value:",
    lookupTableTitle: "Quick PX to REM Reference Table",
    seoTitle: "Mastering Fluid Layouts with REM Units and CSS clamp()",
    seoContent1: "Fixed pixel (`px`) values hinder web accessibility and responsive scaling. When users customize default browser text zoom settings for readability, websites built exclusively with fixed pixels fail to scale gracefully, creating broken layouts and poor user experiences.",
    seoContent2: "Relative units like `rem` (root em) adjust dynamically based on the HTML root font size (typically 16px by default). Converting layout padding, margins, font sizes, and container widths to REM ensures seamless scaling across diverse device viewports and screen densities.",
    seoContent3: "Furthermore, modern CSS `clamp(MIN, VAL, MAX)` allows developers to define dynamic typography that smoothly scales between minimum and maximum bounds depending on viewport width. Use our interactive calculator to derive mathematically precise fluid typography formulas and Tailwind CSS utility classes instantly.",
    features: [
      "Calculates precise REM/EM values based on custom base font size.",
      "Generates dynamic CSS clamp(min, preferred, max) formulas for typography.",
      "Produces copyable Tailwind CSS custom utility classes.",
      "Includes quick lookup reference tables for common pixel values."
    ],
    faq: [
      {
        question: "What is the default root base font size in browsers?",
        answer: "Most modern web browsers set a default root font size of 16px (1rem = 16px). You can customize this base in our tool."
      },
      {
        question: "Why choose REM over PX for web typography?",
        answer: "REM units adapt to user browser accessibility settings (e.g. enlarged text zoom), ensuring your site remains readable."
      },
      {
        question: "How does CSS clamp() work?",
        answer: "CSS clamp(MIN, VAL, MAX) clamps a value between defined lower and upper bounds, dynamically computing fluid font sizes on viewport change."
      },
      {
        question: "Are these values compatible with Tailwind CSS?",
        answer: "Yes, we generate direct Tailwind CSS arbitrary values like text-[clamp(1rem,2vw,2.5rem)] ready to paste into your components."
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
