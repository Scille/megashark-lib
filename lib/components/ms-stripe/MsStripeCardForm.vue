<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->
<template>
  <div class="form-content">
    <ms-stripe-card-element
      ref="cardNumberElement"
      type="cardNumber"
    />
    <ms-stripe-card-element
      ref="cardExpiryElement"
      type="cardExpiry"
    />
    <ms-stripe-card-element
      ref="cardCvcElement"
      type="cardCvc"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, inject } from 'vue';
import { MsStripeCardElement } from '@lib/components/ms-stripe';
import { StripeService, StripeServiceKey, BillingDetails, PaymentMethod } from '@lib/services/stripe';

const cardNumberElement = ref();
const cardExpiryElement = ref();
const cardCvcElement = ref();
const stripeService: StripeService = inject(StripeServiceKey)!;
const isValid = computed<boolean>(() => {
  if (!cardNumberElement.value || !cardExpiryElement.value || !cardCvcElement.value) {
    return false;
  }
  return cardNumberElement.value.isValid && cardExpiryElement.value.isValid && cardCvcElement.value.isValid;
});

onMounted(async () => {
  if (stripeService && stripeService.elements) {
    if (cardNumberElement.value) {
      await cardNumberElement.value.setFocus();
    }
  }
});

async function submit(billingDetails?: BillingDetails): Promise<PaymentMethod | undefined> {
  if (isValid.value) {
    try {
      // register the payment method
      const data: any = {
        type: 'card',
        card: cardNumberElement.value.getStripeElement(),
      };
      if (billingDetails) {
        // eslint-disable-next-line camelcase
        data.billing_details = billingDetails;
      }
      const result = await stripeService.createPaymentMethod(data);
      // TODO: handle the payment method and errors here
      if (result.error) {
        throw new Error('Error submitting credit card data');
      }
      return result.paymentMethod;
    } catch (error) {
      console.error('Error submitting credit card data');
    }
  }
}

defineExpose({
  isValid,
  submit,
});
</script>

<style scoped lang="scss">
.form-content {
  gap: 1em;
  display: flex;
  flex-direction: column;
}
</style>
