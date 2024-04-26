// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { mockI18n } from '@tests/support/mocks';

import { I18n } from '@lib';
import appEnUS from '@lib/locales/en-US.json';
import appFrFR from '@lib/locales/fr-FR.json';

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
