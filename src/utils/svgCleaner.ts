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
  'xlink:href': 'xlinkHref',
  'xmlns:xlink': 'xmlnsXlink',
  'xml:space': 'xmlSpace',
};

const JUNK_ATTR_PREFIXES = ['inkscape:', 'sodipodi:', 'sketch:', 'xmlns:inkscape', 'xmlns:sodipodi', 'xmlns:sketch'];

/**
 * Многие экспортёры (Sketch, Figma, Gemini и т.д.) оставляют префиксы вроде `sketch:type`
 * без объявления xmlns:sketch. Для XML-парсера это фатальная ошибка: DOMParser возвращает
 * <parsererror> вместо <svg>. Объявляем недостающие префиксы на корневом теге.
 */
function declareMissingNamespaces(svg: string): string {
  if (!/<svg\b/i.test(svg)) return svg;

  const declared = new Set<string>(['xml', 'xmlns']);
  for (const m of svg.matchAll(/\sxmlns:([\w.-]+)\s*=/g)) declared.add(m[1]);

  const used = new Set<string>();
  for (const m of svg.matchAll(/<[^!?<>][^<>]*>/g)) {
    // значения в кавычках выкидываем, чтобы не ловить "a:b=" внутри них
    const tag = m[0].replace(/"[^"]*"|'[^']*'/g, '""');
    const el = tag.match(/^<\/?([\w.-]+):[\w.-]+/);
    if (el) used.add(el[1]);
    for (const a of tag.matchAll(/\s([\w.-]+):[\w.-]+\s*=/g)) used.add(a[1]);
  }

  const missing = [...used].filter((p) => !declared.has(p));
  if (missing.length === 0) return svg;

  const decls = missing.map((p) => ` xmlns:${p}="urn:unknown:${p}"`).join('');
  return svg.replace(/<svg\b/i, `<svg${decls}`);
}

/** Удаляет width/height только у корневого <svg> и при необходимости строит viewBox из них. */
function removeRootDimensionsRegex(svg: string): string {
  return svg.replace(/<svg\b[^>]*>/i, (tag) => {
    const w = tag.match(/\swidth\s*=\s*["']([\d.]+)(?:px)?["']/i)?.[1];
    const h = tag.match(/\sheight\s*=\s*["']([\d.]+)(?:px)?["']/i)?.[1];

    let result = tag.replace(/\s(?:width|height)\s*=\s*("[^"]*"|'[^']*')/gi, '');

    if (!/\sviewBox\s*=/i.test(result) && w && h) {
      result = result.replace(/<svg\b/i, `<svg viewBox="0 0 ${w} ${h}"`);
    }
    return result;
  });
}

/** Запасной путь на регулярках, если XML-парсер всё равно не справился. */
function cleanWithRegex(code: string, options: SvgCleanerOptions): string {
  let out = code;

  if (options.removeMetadata) {
    out = out
      .replace(/<(metadata|title|desc|script)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
      .replace(/<(metadata|title|desc|script)\b[^>]*\/>/gi, '')
      .replace(/\s(?:inkscape|sodipodi|sketch):[\w.-]+\s*=\s*("[^"]*"|'[^']*')/g, '')
      .replace(/\sxmlns:(?:inkscape|sodipodi|sketch)\s*=\s*("[^"]*"|'[^']*')/g, '')
      .replace(/\sdata-name\s*=\s*("[^"]*"|'[^']*')/g, '');
  }

  if (options.removeDimensions) {
    out = removeRootDimensionsRegex(out);
  }

  return out;
}

function prettify(code: string): string {
  const lines = code.replace(/(>)(<)(\/*)/g, '$1\n$2$3').split('\n');
  let indent = 0;
  let formatted = '';

  lines.forEach((raw) => {
    const line = raw.trim();
    if (!line) return;

    const isClosing = /^<\//.test(line);
    // открывающий тег без закрытия на той же строке и не самозакрытый
    const isOpening =
      /^<[^/!?]/.test(line) && !/\/>$/.test(line) && !/<\/[^>]+>$/.test(line);

    if (isClosing) indent = Math.max(0, indent - 1);
    formatted += '  '.repeat(indent) + line + '\n';
    if (isOpening) indent++;
  });

  return formatted.trim();
}

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

  // 1. Комментарии
  if (options.removeComments) {
    code = code.replace(/<!--[\s\S]*?-->/g, '');
  }

  // 2. Чиним необъявленные xmlns-префиксы, иначе DOMParser падает
  code = declareMissingNamespaces(code);

  // 3. Структурная очистка через DOM, с проверкой на ошибку парсинга
  let handledByDom = false;
  try {
    const doc = new DOMParser().parseFromString(code, 'image/svg+xml');
    const root = doc.documentElement;
    const hasParseError = doc.getElementsByTagName('parsererror').length > 0;

    if (!hasParseError && root && root.localName === 'svg') {
      if (options.removeMetadata) {
        doc.querySelectorAll('metadata, title, desc, script').forEach((n) => n.remove());

        doc.querySelectorAll('*').forEach((el) => {
          Array.from(el.attributes).forEach((attr) => {
            if (attr.name === 'data-name' || JUNK_ATTR_PREFIXES.some((p) => attr.name.startsWith(p))) {
              el.removeAttribute(attr.name);
            }
          });
        });
      }

      if (options.removeDimensions) {
        const parse = (v: string | null) => {
          const m = v?.trim().match(/^([\d.]+)(?:px)?$/i);
          return m ? m[1] : null;
        };
        const w = parse(root.getAttribute('width'));
        const h = parse(root.getAttribute('height'));

        root.removeAttribute('width');
        root.removeAttribute('height');

        // viewBox нужен, иначе SVG потеряет пропорции; берём реальные размеры, а не 24x24
        if (!root.getAttribute('viewBox') && w && h) {
          root.setAttribute('viewBox', `0 0 ${w} ${h}`);
        }
      }

      code = new XMLSerializer().serializeToString(root);
      handledByDom = true;
    }
  } catch {
    // уйдём в regex-фолбэк ниже
  }

  // 4. Фолбэк: файл всё равно не распарсился как XML, но очистить его всё равно можно
  if (!handledByDom) {
    code = cleanWithRegex(code, options);
  }

  // 5. Форматирование
  if (options.minifyCode) {
    code = code.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
  } else if (options.prettifyCode) {
    code = prettify(code);
  }

  // 6. Data URI
  const encodedSvg = encodeURIComponent(code).replace(/'/g, '%27').replace(/"/g, '%22');
  const dataUri = `data:image/svg+xml;utf8,${encodedSvg}`;

  // 7. React-компонент
  let reactSvg = code;
  if (options.camelCaseAttrs) {
    Object.entries(attributeMap).forEach(([kebab, camel]) => {
      reactSvg = reactSvg.replace(new RegExp(`\\s${kebab}=`, 'g'), ` ${camel}=`);
    });
  }

  const reactComponent = `import React from 'react';

export const SvgIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  ${reactSvg.replace('<svg', '<svg {...props}')}
);

export default SvgIcon;`;

  const cleanedSize = new Blob([code]).size;
  const savings =
    originalSize > 0
      ? Math.max(0, Math.round(((originalSize - cleanedSize) / originalSize) * 100))
      : 0;

  return {
    cleanedSvg: code,
    dataUri,
    reactComponent,
    originalSize,
    cleanedSize,
    savingsPercentage: savings,
  };
}
