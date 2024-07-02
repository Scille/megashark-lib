// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { EnvironmentType } from '@lib/common/environment';
import {
  BillingDetails,
  PaymentMethodResult,
  Stripe,
  StripeCardCvcElement,
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElement,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElement,
  StripeCardNumberElementChangeEvent,
  StripeElementLocale,
  StripeElements,
  loadStripe,
} from '@stripe/stripe-js';
import { App } from 'vue';

export const StripeServiceKey = 'StripeService';

export interface StripeConfig {
  publishableKey: string;
  environment: EnvironmentType;
  locale: 'fr-FR' | 'en-US';
}

const LOCALES = new Map<'fr-FR' | 'en-US', StripeElementLocale>([
  ['en-US', 'en'],
  ['fr-FR', 'fr'],
]);

export class StripeService {
  instance: Stripe | null = null;
  elements: StripeElements | null = null;

  constructor() {}

  async init(config: StripeConfig): Promise<void> {
    this._verifyPublishableKey(config);

    // stripe-js initialization
    this.instance = await loadStripe(config.publishableKey);
    if (!this.instance) {
      throw new Error('Failed to initialize Stripe');
    }

    this.elements = this.instance.elements({
      locale: LOCALES.get(config.locale),
    });
    if (!this.elements) {
      throw new Error('Failed to initialize Stripe Elements');
    }
  }

  // use this method to update the locale of the Stripe Elements
  updateLocale(locale: 'en-US' | 'fr-FR'): void {
    this.elements?.update({ locale: LOCALES.get(locale) });
  }

  _verifyPublishableKey(config: StripeConfig): void {
    if (!config.publishableKey) {
      throw new Error('Stripe publishable key is not defined');
    }

    switch (config.environment) {
      case EnvironmentType.Production:
        if (!config.publishableKey.startsWith('pk_live_')) {
          throw new Error('Stripe publishable key must be a live key for production environment');
        }
        break;
      case EnvironmentType.Staging:
      case EnvironmentType.Development:
        if (!config.publishableKey.startsWith('pk_test_')) {
          throw new Error('Stripe publishable key is not a test key for development, staging environments');
        }
        break;
    }
  }

  createCardElement(
    type: 'cardNumber' | 'cardExpiry' | 'cardCvc',
    onChange: (event: StripeCardElementChangeEventType) => void,
  ): StripeCardElementType {
    let cardElement: StripeCardElementType;
    if (!this.elements) {
      throw new Error('Stripe Elements is not initialized');
    }

    const options = {
      style: StripeElementBaseStyle,
    };
    switch (type) {
      case 'cardNumber':
        cardElement = this.elements.create('cardNumber', { ...options, disableLink: true });
        cardElement.on('change', onChange);
        break;
      case 'cardExpiry':
        cardElement = this.elements.create('cardExpiry', options);
        cardElement.on('change', onChange);
        break;
      case 'cardCvc':
        cardElement = this.elements.create('cardCvc', options);
        cardElement.on('change', onChange);
        break;
      default:
        throw new Error('Invalid card element type');
    }
    return cardElement;
  }

  async createPaymentMethod(paymentMethodData: {
    type: 'card';
    card: StripeCardNumberElement;
    billing_details?: BillingDetails;
  }): Promise<PaymentMethodResult> {
    if (!this.instance) {
      throw new Error('Stripe instance is not initialized');
    }

    return await this.instance.createPaymentMethod(paymentMethodData);
  }
}

export type StripeCardElementType = StripeCardCvcElement | StripeCardExpiryElement | StripeCardNumberElement;
export type StripeCardElementChangeEventType =
  | StripeCardCvcElementChangeEvent
  | StripeCardExpiryElementChangeEvent
  | StripeCardNumberElementChangeEvent;

export const StripeElementBaseStyle = {
  base: {
    color: 'var(--parsec-color-light-primary-800)',
    fontFamily: '"Albert Sans", Montserrat, "Helvetica Neue", Helvetica, sans-serif',
    fontSize: '16px',
    backgroundColor: 'none',
  },
};

export class StripePlugin {
  service: StripeService;
  config: StripeConfig;

  constructor(config: StripeConfig) {
    this.config = config;
    this.service = new StripeService();
  }

  async init(): Promise<void> {
    await this.service.init(this.config);
  }

  install(app: App<any>): void {
    if (!this.service) {
      throw new Error('Stripe service has not been initialized');
    }
    app.provide(StripeServiceKey, this.service);
  }
}

// Re-export stripe types
export type { BillingDetails, PaymentMethod, PaymentMethodResult, StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';
