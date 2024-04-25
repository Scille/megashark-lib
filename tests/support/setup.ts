// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { I18n } from '@lib';
import appEnUS from '@lib/locales/en-US.json';
import appFrFR from '@lib/locales/fr-FR.json';
import { mockI18n } from '@tests/support/mocks';

beforeEach(() => {
  I18n.init({
    defaultLocale: 'en-US',
    customAssets: {
      'fr-FR': appFrFR,
      'en-US': appEnUS,
    },
  });
  mockI18n();
});
