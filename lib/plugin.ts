// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { I18nConfig, TranslationPlugin } from '@lib/services';
import { App } from 'vue';

interface MegaSharkConfig {
  i18n: I18nConfig;
}

export const MegaSharkPlugin = {
  install: (app: App<any>, config: MegaSharkConfig): void => {
    app.use(TranslationPlugin, config.i18n);
  },
};
