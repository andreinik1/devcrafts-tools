import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const useSEO = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    let title = 'VibeDev Tools';
    let description = t.common.appTagline;

    const path = location.pathname;

    if (path === '/') {
      title = `VibeDev Tools - ${t.hero.titleHighlight}`;
      description = t.hero.description;
    } else if (path.includes('/tools/svg-cleaner')) {
      title = `${t.svgCleanerTool.title} | VibeDev Tools`;
      description = t.svgCleanerTool.subtitle;
    } else if (path.includes('/tools/json-to-typescript')) {
      title = `${t.jsonToTsTool.title} | VibeDev Tools`;
      description = t.jsonToTsTool.subtitle;
    } else if (path.includes('/tools/px-to-rem')) {
      title = `${t.pxToRemTool.title} | VibeDev Tools`;
      description = t.pxToRemTool.subtitle;
    } else if (path.includes('/tools/css-shadow-generator')) {
      title = `${t.cssShadowTool.title} | VibeDev Tools`;
      description = t.cssShadowTool.subtitle;
    } else if (path.includes('/about')) {
      title = `${t.about.title} | VibeDev Tools`;
      description = t.about.subtitle;
    } else if (path.includes('/contact')) {
      title = `${t.contact.title} | VibeDev Tools`;
      description = t.contact.subtitle;
    } else if (path.includes('/privacy-policy')) {
      title = `${t.privacy.title} | VibeDev Tools`;
      description = t.privacy.subtitle;
    }

    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
  }, [location.pathname, t, language]);
};
