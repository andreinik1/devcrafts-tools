import { common } from './common';
import { tools } from './tools';
import { workspaces } from './workspaces';

export const en = {
  ...common,
  ...tools,
  ...workspaces,
};

export type LocaleTranslations = typeof en;
