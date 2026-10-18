export type Language = 'en' | 'uk' | 'ru';
export type Theme = 'dark' | 'light';

export interface ToolInfo {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  iconName: string;
  badge?: string;
  category: 'graphics' | 'code' | 'css' | 'calculator';
}

export interface WorkspaceItem {
  id: string;
  slug: string;
  nameKey: string;
  descKey: string;
  icon: string;
  toolsCount: number;
  badge?: string;
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SEOContentData {
  title: string;
  description: string;
  sections: {
    heading: string;
    content: string;
  }[];
}

export interface ActiveAsset {
  name: string;
  type: 'svg' | 'image';
  rawContent: string; // Raw SVG markup or DataURL of raster image
  fileObj?: File;
  size: number;
}

export type CanvasBackground = 'glow' | 'dark' | 'light' | 'grid';
