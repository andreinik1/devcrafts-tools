export interface OpenGraphConfig {
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  siteName: string;
  type: 'website' | 'article' | 'profile';
  twitterHandle: string;
  twitterCardType: 'summary_large_image' | 'summary';
}

export const generateMetaTags = (config: OpenGraphConfig): string => {
  const {
    title,
    description,
    url,
    imageUrl,
    siteName,
    type,
    twitterHandle,
    twitterCardType,
  } = config;

  const cleanHandle = twitterHandle ? (twitterHandle.startsWith('@') ? twitterHandle : `@${twitterHandle}`) : '';

  const lines = [
    `<!-- Primary Meta Tags -->`,
    `<title>${title || 'Your Page Title'}</title>`,
    `<meta name="title" content="${title || 'Your Page Title'}" />`,
    `<meta name="description" content="${description || 'Your page description goes here...'}" />`,
    url ? `<link rel="canonical" href="${url}" />` : '',
    '',
    `<!-- Open Graph / Facebook / LinkedIn / Slack -->`,
    `<meta property="og:type" content="${type || 'website'}" />`,
    url ? `<meta property="og:url" content="${url}" />` : '',
    `<meta property="og:title" content="${title || 'Your Page Title'}" />`,
    `<meta property="og:description" content="${description || 'Your page description goes here...'}" />`,
    imageUrl ? `<meta property="og:image" content="${imageUrl}" />` : '',
    siteName ? `<meta property="og:site_name" content="${siteName}" />` : '',
    '',
    `<!-- Twitter / X -->`,
    `<meta name="twitter:card" content="${twitterCardType || 'summary_large_image'}" />`,
    url ? `<meta name="twitter:url" content="${url}" />` : '',
    `<meta name="twitter:title" content="${title || 'Your Page Title'}" />`,
    `<meta name="twitter:description" content="${description || 'Your page description goes here...'}" />`,
    imageUrl ? `<meta name="twitter:image" content="${imageUrl}" />` : '',
    cleanHandle ? `<meta name="twitter:site" content="${cleanHandle}" />` : '',
    cleanHandle ? `<meta name="twitter:creator" content="${cleanHandle}" />` : '',
  ];

  return lines.filter((line) => line !== null && line !== undefined).join('\n').replace(/\n\n\n/g, '\n\n');
};
