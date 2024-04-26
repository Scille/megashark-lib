// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { I18n, Translatable } from '@lib';
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

function mockI18n(): void {
  config.global.mocks = {
    $msTranslate: (tr: Translatable): string => I18n.translate(tr),
  };
}

function mockLottie(): void {
  vi.mock('vue3-lottie', async () => {
    return {
      Vue3Lottie: {},
    };
  });
}

export { mockI18n, mockLottie };
