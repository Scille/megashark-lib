<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->
<template>
  <div class="form-content">
    <ms-stripe-card-element
      ref="cardNumberElement"
      type="cardNumber"
    />
    <div class="form-row">
      <ms-stripe-card-element
        ref="cardExpiryElement"
        type="cardExpiry"
      />
      <ms-stripe-card-element
        ref="cardCvcElement"
        type="cardCvc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, inject } from 'vue';
import { MsStripeCardElement } from '@lib/components/ms-stripe';
import { StripeService, StripeServiceKey, BillingDetails, PaymentMethodResult } from '@lib/services';

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
  if (cardNumberElement.value) {
    await cardNumberElement.value.setFocus();
  }
});

async function submit(billingDetails?: BillingDetails): Promise<PaymentMethodResult | undefined> {
  if (isValid.value && cardNumberElement.value.getStripeElement()) {
    const data: any = {
      type: 'card',
      card: cardNumberElement.value.getStripeElement(),
    };
    if (billingDetails) {
      // eslint-disable-next-line camelcase
      data.billing_details = billingDetails;
    }

    return await stripeService.createPaymentMethod(data);
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

  .form-row {
    display: flex;
    justify-content: space-between;
    gap: 1em;

    > * {
      flex: 1;
    }
  }
}
</style>
