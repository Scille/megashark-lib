<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->
<template>
  <div class="input-container">
    <div class="input-content">
      <ion-icon
        v-if="type !== 'cardNumber' || !_getBrandIcon()"
        class="icon"
        slot="start"
        :icon="_getIcon()"
      />
      <ms-image
        v-else
        class="icon"
        :image="_getBrandIcon()"
      />
      <div
        class="input form-input"
        :id="type"
      />
    </div>
    <span
      class="form-error form-helperText"
      v-if="errorMessage"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import {
  StripeCardElementType,
  StripeCardElementChangeEventType,
  StripeService,
  StripeServiceKey,
  StripeCardNumberElementChangeEvent,
} from '@lib/services/stripe';
import { card, lockClosed, calendarNumber } from 'ionicons/icons';
import { LogoMastercard, LogoVisa, MsImage } from '@lib/components/ms-image';
import { inject, onMounted, onUnmounted, ref } from 'vue';

let stripeElement: StripeCardElementType;
const stripeService: StripeService = inject(StripeServiceKey)!;
const isValid = ref(false);
const errorMessage = ref<string>('');
const brand = ref<string>('');
const props = defineProps<{
  type: 'cardNumber' | 'cardExpiry' | 'cardCvc';
}>();

onMounted(() => {
  if (stripeService && stripeService.elements) {
    stripeElement = stripeService.createCardElement(props.type, (event: StripeCardElementChangeEventType) => {
      isValid.value = event.complete;
      if (props.type === 'cardNumber') {
        brand.value = (event as StripeCardNumberElementChangeEvent).brand;
      }
      errorMessage.value = event.error ? event.error.message : '';
      emits('change', event);
    });
    stripeElement.mount(`#${props.type}`);
  }
});

function setFocus(): void {
  setTimeout(() => {
    if (stripeElement) {
      stripeElement.focus();
    }
  }, 500);
}

function _getBrandIcon(): string {
  switch (brand.value) {
    case 'visa':
      return LogoVisa;
    case 'mastercard':
      return LogoMastercard;
    default:
      return '';
  }
}

function _getIcon(): string {
  switch (props.type) {
    case 'cardNumber':
      return card;
    case 'cardExpiry':
      return calendarNumber;
    case 'cardCvc':
      return lockClosed;
    default:
      return '';
  }
}

function getStripeElement(): StripeCardElementType {
  return stripeElement;
}

onUnmounted(() => {
  if (stripeElement) {
    stripeElement.unmount();
    stripeElement.destroy();
  }
});

const emits = defineEmits<{
  (e: 'change', event: StripeCardElementChangeEventType): void;
}>();

defineExpose({
  setFocus,
  isValid,
  getStripeElement,
});
</script>

<style scoped lang="scss">
.input-content {
  padding: 0 1rem;
  align-items: center;
  flex-grow: unset;

  &:has(.StripeElement--focus) {
    border: 1px solid var(--parsec-color-light-primary-400);
    background: var(--parsec-color-light-secondary-white);
    outline: 0.25rem solid var(--parsec-color-light-outline);
  }
}

.icon {
  width: 1.25em;
  font-size: 1.25em;
  color: var(--parsec-color-light-secondary-light);
}

.form-error {
  margin-left: 1rem;
}
</style>
