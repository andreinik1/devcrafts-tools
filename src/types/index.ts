export type Language = 'en' | 'uk';

export interface ToolInfo {
  id: string;
  slug: string;
  titleKey: string;
  descriptionKey: string;
  iconName: string;
  badge?: string;
  category: 'graphics' | 'code' | 'css' | 'calculator';
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
