// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { I18n, Translatable } from '@lib';
import { config } from '@vue/test-utils';

function mockI18n(): void {
  config.global.mocks = {
    $msTranslate: (tr: Translatable): string => I18n.translate(tr),
  };
}

export { mockI18n };
