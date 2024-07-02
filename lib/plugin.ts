// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { I18nConfig, StripeConfig, StripePlugin, TranslationPlugin } from '@lib/services';
import { App } from 'vue';

interface MegaSharkConfig {
  i18n: I18nConfig;
  stripeConfig?: StripeConfig;
}

export class MegaSharkPlugin {
  config: MegaSharkConfig;
  stripePlugin: StripePlugin | null = null;
  isInit = false;

  constructor(config: MegaSharkConfig) {
    this.config = config;
  }

  async init(): Promise<void> {
    if (this.config.stripeConfig) {
      this.stripePlugin = new StripePlugin(this.config.stripeConfig);
      await this.stripePlugin.init();
    }
    this.isInit = true;
  }

  install(app: App<any>): void {
    if (!this.isInit) {
      throw new Error('Megashark plugin has not been initialized.');
    }
    app.use(TranslationPlugin, this.config.i18n);
    if (this.config.stripeConfig && this.stripePlugin) {
      app.use(this.stripePlugin);
    }
  }
}
