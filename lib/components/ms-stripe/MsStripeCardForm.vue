<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->
<template>
  <div class="form-content">
    <div
      class="input-container"
      v-if="requireName"
    >
      <span
        class="form-label"
        :class="{ focused: hasFocus }"
        @click="setFocus()"
      >
        {{ $msTranslate('lib.components.msStripe.cardHolderLabel') }}
      </span>
      <div class="input-content">
        <ion-icon
          class="icon"
          slot="start"
          :icon="personCircle"
        />
        <ion-input
          class="form-input"
          ref="nameElement"
          :placeholder="$msTranslate('lib.components.msStripe.cardHolderPlaceholder')"
          v-model="name"
          @ion-focus="hasFocus = true"
          @ion-blur="hasFocus = false"
          mode="ios"
        />
      </div>
    </div>
    <ms-stripe-card-element
      label="lib.components.msStripe.cardNumberLabel"
      ref="cardNumberElement"
      type="cardNumber"
    />
    <div class="form-row">
      <ms-stripe-card-element
        label="lib.components.msStripe.expiryDateLabel"
        ref="cardExpiryElement"
        type="cardExpiry"
      />
      <ms-stripe-card-element
        label="lib.components.msStripe.cvcLabel"
        ref="cardCvcElement"
        type="cardCvc"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonInput } from '@ionic/vue';
import { computed, ref, onMounted, inject, useTemplateRef } from 'vue';
import { MsStripeCardElement } from '@lib/components/ms-stripe';
import { StripeService, StripeServiceKey, BillingDetails, PaymentMethodResult } from '@lib/services';
import { personCircle } from 'ionicons/icons';

const props = defineProps<{
  requireName?: boolean;
}>();

const cardNumberElementRef = useTemplateRef('cardNumberElement');
const cardExpiryElementRef = useTemplateRef('cardExpiryElement');
const cardCvcElementRef = useTemplateRef('cardCvcElement');
const nameElementRef = useTemplateRef('nameElement');
const name = ref('');
const hasFocus = ref(false);
const stripeService: StripeService = inject(StripeServiceKey)!;
const isValid = computed<boolean>(() => {
  if (!cardNumberElementRef.value || !cardExpiryElementRef.value || !cardCvcElementRef.value || (props.requireName && !name.value)) {
    return false;
  }
  return (
    cardNumberElementRef.value.isValid &&
    cardExpiryElementRef.value.isValid &&
    cardCvcElementRef.value.isValid &&
    (!props.requireName || (props.requireName && name.value.length > 0))
  );
});

function setFocus(): void {
  setTimeout(() => {
    if (nameElementRef.value && nameElementRef.value.$el) {
      nameElementRef.value.$el.setFocus();
    }
  }, 200);
}

onMounted(async () => {
  if (props.requireName && nameElementRef.value) {
    await nameElementRef.value.$el.setFocus();
  } else if (cardNumberElementRef.value) {
    await cardNumberElementRef.value.setFocus();
  }
});

async function submit(billingDetails?: BillingDetails): Promise<PaymentMethodResult | undefined> {
  if (isValid.value && cardNumberElementRef.value && cardNumberElementRef.value.getStripeElement()) {
    if (props.requireName) {
      if (billingDetails) {
        billingDetails.name = name.value;
      } else {
        billingDetails = { name: name.value };
      }
    }

    const stripeElement = cardNumberElementRef.value.getStripeElement();
    if (stripeElement) {
      return await stripeService.createPaymentMethod({
        type: 'card',
        card: stripeElement as any,
        // eslint-disable-next-line camelcase
        billing_details: billingDetails,
      });
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

  .form-row {
    display: flex;
    gap: 1em;

    > * {
      flex: 1;
    }
  }
}

.input-container {
  .input-content {
    flex-grow: unset;
  }

  .form-input {
    padding-left: 0.625rem !important;
  }

  .icon {
    font-size: 1.125em;
    color: var(--parsec-color-light-secondary-light);
  }
}
</style>
