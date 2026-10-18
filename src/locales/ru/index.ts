import { common } from './common';
import { tools } from './tools';
import { workspaces } from './workspaces';
import type { LocaleTranslations } from '../en';

export const ru: LocaleTranslations = {
  ...common,
  ...tools,
  ...workspaces,
};
