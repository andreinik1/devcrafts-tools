export interface SvgCleanerOptions {
  removeComments: boolean;
  removeMetadata: boolean;
  removeDimensions: boolean;
  minifyCode: boolean;
  prettifyCode: boolean;
  camelCaseAttrs: boolean;
}

export interface SvgCleanerResult {
  cleanedSvg: string;
  dataUri: string;
  reactComponent: string;
  originalSize: number;
  cleanedSize: number;
  savingsPercentage: number;
}

const attributeMap: Record<string, string> = {
  'stroke-width': 'strokeWidth',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-opacity': 'strokeOpacity',
  'fill-rule': 'fillRule',
  'fill-opacity': 'fillOpacity',
  'clip-rule': 'clipRule',
  'clip-path': 'clipPath',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-weight': 'fontWeight',
  'text-anchor': 'textAnchor',
  'dominant-baseline': 'dominantBaseline',
  'class': 'className',
  'xmlns:xlink': 'xmlnsXlink',
  'xml:space': 'xmlSpace'
};

export function cleanSvg(svgContent: string, options: SvgCleanerOptions): SvgCleanerResult {
  const originalSize = new Blob([svgContent]).size;
  if (!svgContent.trim()) {
    return {
      cleanedSvg: '',
      dataUri: '',
      reactComponent: '',
      originalSize: 0,
      cleanedSize: 0,
      savingsPercentage: 0,
    };
  }

  let code = svgContent;

  // 1. Remove comments if option selected
  if (options.removeComments) {
    code = code.replace(/<!--[\s\S]*?-->/g, '');
  }

  // Use DOMParser to safely inspect and manipulate SVG node structure
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(code, 'image/svg+xml');
    const svgEl = doc.querySelector('svg');

    if (svgEl) {
      if (options.removeMetadata) {
        const metadataNodes = doc.querySelectorAll('metadata, title, desc, script');
        metadataNodes.forEach((node) => node.remove());

        // Remove inkscape, sodipodi, sketch attributes
        const allElements = doc.querySelectorAll('*');
        allElements.forEach((el) => {
          Array.from(el.attributes).forEach((attr) => {
            if (
              attr.name.startsWith('inkscape:') ||
              attr.name.startsWith('sodipodi:') ||
              attr.name.startsWith('sketch:') ||
              attr.name.startsWith('xmlns:sketch') ||
              attr.name.startsWith('xmlns:inkscape') ||
              attr.name.startsWith('xmlns:sodipodi') ||
              attr.name === 'data-name'
            ) {
              el.removeAttribute(attr.name);
            }
          });
        });
      }

      if (options.removeDimensions) {
        svgEl.removeAttribute('width');
        svgEl.removeAttribute('height');
        // Ensure viewBox exists if width and height were removed
        if (!svgEl.getAttribute('viewBox')) {
          svgEl.setAttribute('viewBox', '0 0 24 24');
        }
      }

      const serializer = new XMLSerializer();
      code = serializer.serializeToString(svgEl);
    }
  } catch {
    // Fallback regex cleaning if DOMParser fails
  }

  // Prettify vs Minify formatting
  if (options.minifyCode) {
    code = code
      .replace(/>\s+</g, '><')
      .replace(/\s+/g, ' ')
      .trim();
  } else if (options.prettifyCode) {
    let formatted = '';
    let indent = 0;
    const reg = /(>)(<)(\/*)/g;
    const xml = code.replace(reg, '$1\r\n$2$3');
    const lines = xml.split('\r\n');
    lines.forEach((line) => {
      let padding = '';
      if (line.match(/<\/\w/)) {
        indent = Math.max(0, indent - 1);
      }
      for (let i = 0; i < indent; i++) {
        padding += '  ';
      }
      if (line.match(/<\w[^>]*[^\/]>$/)) {
        formatted += padding + line + '\n';
        indent++;
      } else {
        formatted += padding + line + '\n';
      }
    });
    code = formatted.trim();
  }

  // Generate Data URI
  const encodedSvg = encodeURIComponent(code)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22');
  const dataUri = `data:image/svg+xml;utf8,${encodedSvg}`;

  // Generate React JSX Component
  let reactSvg = code;
  Object.entries(attributeMap).forEach(([kebab, camel]) => {
    const regex = new RegExp(`\\s${kebab}=`, 'g');
    reactSvg = reactSvg.replace(regex, ` ${camel}=`);
  });

  const reactComponent = `import React from 'react';

export const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  ${reactSvg.replace('<svg', '<svg {...props}')}
);

export default SvgIcon;`;

  const cleanedSize = new Blob([code]).size;
  const savings = originalSize > 0 ? Math.max(0, Math.round(((originalSize - cleanedSize) / originalSize) * 100)) : 0;

  return {
    cleanedSvg: code,
    dataUri,
    reactComponent,
    originalSize,
    cleanedSize,
    savingsPercentage: savings,
  };
}
