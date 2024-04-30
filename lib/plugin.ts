// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { TranslationPlugin } from '@lib/services';
import { App } from 'vue';

export const MegaSharkPlugin = {
  install: (app: App<any>): void => {
    app.use(TranslationPlugin);
  },
};
