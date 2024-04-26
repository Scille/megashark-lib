// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { TranslationPlugin } from '@lib/services';
import { App } from 'vue';
import Vue3Lottie from 'vue3-lottie';

export const MegaSharkPlugin = {
  install: (app: App<any>): void => {
    app.use(TranslationPlugin);
    app.use(Vue3Lottie);
  },
};
