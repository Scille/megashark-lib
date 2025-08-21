<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->
<template>
  <div class="input-container">
    <span
      class="form-label"
      v-show="label"
      @click="setFocus()"
      :class="{ focused: hasFocus }"
    >
      {{ $msTranslate(label) }}
    </span>
    <div class="input-content">
      <ion-icon
        class="icon"
        :class="errorMessage ? 'icon-error' : ''"
        slot="start"
        :icon="_getIcon()"
      />
      <div
        class="input form-input"
        :id="type"
      />
      <ms-image
        v-if="type === 'cardNumber' || _getBrandIcon()"
        class="icon"
        :image="_getBrandIcon()"
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
  Translatable,
} from '@lib/services';
import { card, lockClosed, calendarNumber } from 'ionicons/icons';
import { LogoMastercard, LogoVisa, MsImage } from '@lib/components/ms-image';
import { inject, onMounted, onUnmounted, ref } from 'vue';

let stripeElement: StripeCardElementType | undefined;
const stripeService: StripeService = inject(StripeServiceKey)!;
const isValid = ref(false);
const hasFocus = ref(false);
const errorMessage = ref<string>('');
const brand = ref<string>('');
const props = defineProps<{
  type: 'cardNumber' | 'cardExpiry' | 'cardCvc';
  label?: Translatable;
}>();

onMounted(async () => {
  stripeElement = await stripeService.createCardElement(props.type, (event: StripeCardElementChangeEventType) => {
    isValid.value = event.complete;
    if (props.type === 'cardNumber') {
      brand.value = (event as StripeCardNumberElementChangeEvent).brand;
    }
    errorMessage.value = event.error ? event.error.message : '';
    emits('change', event);
  });
  if (stripeElement) {
    stripeElement.mount(`#${props.type}`);

    (stripeElement as any).on('focus', () => {
      hasFocus.value = true;
    });

    (stripeElement as any).on('blur', () => {
      hasFocus.value = false;
    });
  }
});

function setFocus(): void {
  setTimeout(() => {
    if (stripeElement) {
      stripeElement.focus();
    }
  }, 100);
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

function getStripeElement(): StripeCardElementType | undefined {
  return stripeElement;
}

onUnmounted(() => {
  if (stripeElement) {
    stripeElement.unmount();
    stripeElement.destroy();
    hasFocus.value = false;
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
  padding: 0 0.75rem;
  align-items: center;
  flex-grow: unset;

  &:has(.StripeElement--focus) {
    border: 1px solid var(--parsec-color-light-primary-400);
    background: var(--parsec-color-light-secondary-white);
    outline: 0.25rem solid var(--parsec-color-light-outline);
  }
}

.icon {
  font-size: 1.125em;
  color: var(--parsec-color-light-secondary-light);

  &-error {
    color: var(--parsec-color-light-danger-500);
  }
}
</style>
