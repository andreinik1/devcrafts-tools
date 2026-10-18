import { common } from './common';
import { tools } from './tools';
import { workspaces } from './workspaces';
import type { LocaleTranslations } from '../en';

export const uk: LocaleTranslations = {
  ...common,
  ...tools,
  ...workspaces,
};
