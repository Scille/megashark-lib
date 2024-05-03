// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import libEnUS from '@lib/locales/en-US.json';
import libFrFR from '@lib/locales/fr-FR.json';
import { DateTime } from 'luxon';
import { App } from 'vue';
import { createI18n } from 'vue-i18n';

let i18n: any | null = null;
const assets: Record<Locale, object> = {
  'fr-FR': libFrFR,
  'en-US': libEnUS,
};

export interface TranslationData {
  key: string;
  data?: object;
  count?: number;
}

export type Translatable = string | TranslationData;

export const TranslationPlugin = {
  install: (app: App<any>, config: I18nConfig): void => {
    const i18n = init(config);

    app.use(i18n);

    app.config.globalProperties.$msTranslate = (translatable: Translatable | undefined): string => {
      return translate(translatable);
    };
    app.provide('msTranslate', translate);
  },
};

export type Locale = 'fr-FR' | 'en-US';
export type DateFormat = 'long' | 'short';

export interface I18nConfig {
  defaultLocale?: Locale;
  customAssets?: Record<Locale, object>;
}

function init(config?: I18nConfig): any {
  /* I18n variables */
  // Type-define 'fr-FR' as the master schema for the resource
  const defaultLocale = 'fr-FR';
  const supportedLocales: { [key: string]: string } = {
    fr: 'fr-FR',
    en: 'en-US',
    'fr-FR': 'fr-FR',
    'en-US': 'en-US',
  };

  let frFR = assets['fr-FR'];
  let enUS = assets['en-US'];
  if (config && config.customAssets) {
    if (config.customAssets['fr-FR']) {
      frFR = Object.assign(frFR, config.customAssets['fr-FR']);
    }
    if (config.customAssets['en-US']) {
      enUS = Object.assign(enUS, config.customAssets['en-US']);
    }
  }
  type MessageSchema = typeof frFR;
  i18n = createI18n<[MessageSchema], Locale>({
    legacy: false,
    globalInjection: true,
    locale: config?.defaultLocale || supportedLocales[window.navigator.language] || defaultLocale,
    messages: {
      'fr-FR': frFR,
      'en-US': enUS,
    },
    datetimeFormats: {
      'en-US': {
        short: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
        long: {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
        },
      },
      'fr-FR': {
        short: {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        },
        long: {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: 'numeric',
          minute: 'numeric',
        },
      },
    },
  });
  return i18n;
}

function translate(content: Translatable | undefined): string {
  if (typeof content === 'undefined' || content === '') {
    return '';
  }

  const { t } = i18n.global;

  return typeof content === 'string' ? t(content) : t(content.key, content.data, content.count);
}

function formatDate(date: DateTime, format: DateFormat = 'long'): Translatable {
  const { d } = i18n.global;

  // Bit of a trickery.
  // `d` from i18n returns an already formatted date as string
  // But in our case, we want it to be a Translatable instead so it can be processed
  // as every other translation.
  // We use a translation key that just returns the string given as parameter.
  return { key: 'lib.date.asIs', data: { date: d(date.toJSDate(), format) } };
}

function changeLocale(locale: Locale): void {
  i18n.global.locale.value = locale;
}

function getLocale(): any {
  return i18n.global.locale.value;
}

export const I18n = {
  translate,
  formatDate,
  changeLocale,
  getLocale,
  init,
};
