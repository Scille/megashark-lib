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
  private isInit = false;
  private config: StripeConfig;
  private instance: Stripe | null = null;
  private elements: StripeElements | null = null;

  constructor(config: StripeConfig) {
    this.config = config;
  }

  async init(): Promise<boolean> {
    if (this.isInit) {
      return true;
    }
    try {
      this._verifyPublishableKey(this.config);

      // stripe-js initialization
      if (!this.instance) {
        this.instance = await loadStripe(this.config.publishableKey);
        if (!this.instance) {
          throw new Error('Failed to initialize Stripe');
        }
      }
      if (!this.elements) {
        this.elements = this.instance.elements({
          locale: LOCALES.get(this.config.locale),
        });
        if (!this.elements) {
          throw new Error('Failed to initialize Stripe Elements');
        }
      }
      this.isInit = true;
      return true;
    } catch (error: any) {
      console.error('Failed to init Stripe');
      this.isInit = false;
      return false;
    }
  }

  isInitialized(): boolean {
    return this.isInit;
  }

  // use this method to update the locale of the Stripe Elements
  updateLocale(locale: 'en-US' | 'fr-FR'): void {
    if (!this.elements) {
      return;
    }
    this.elements.update({ locale: LOCALES.get(locale) });
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

  async createCardElement(
    type: 'cardNumber' | 'cardExpiry' | 'cardCvc',
    onChange: (event: StripeCardElementChangeEventType) => void,
  ): Promise<StripeCardElementType | undefined> {
    if (!(await this.init())) {
      return;
    }
    assertInit(this.elements);

    let cardElement: StripeCardElementType;

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
  }): Promise<PaymentMethodResult | undefined> {
    if (!(await this.init())) {
      return;
    }
    assertInit(this.instance);

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
    color: '#002C66',
    fontFamily: '"Albert Sans", Montserrat, "Helvetica Neue", Helvetica, sans-serif',
    fontSize: '16px',
    '::placeholder': {
      color: '#8585AD',
    },
    backgroundColor: 'none',
  },
};

export class StripePlugin {
  service: StripeService;

  constructor(config: StripeConfig) {
    this.service = new StripeService(config);
  }

  async init(): Promise<boolean> {
    return await this.service.init();
  }

  install(app: App<any>): void {
    app.provide(StripeServiceKey, this.service);
  }
}

function assertInit<T>(value: T): asserts value is NonNullable<T> {
  if (value === null) {
    throw new Error('Not init');
  }
}

// Re-export stripe types
export type { BillingDetails, PaymentMethod, PaymentMethodResult, StripeCardNumberElementChangeEvent } from '@stripe/stripe-js';
