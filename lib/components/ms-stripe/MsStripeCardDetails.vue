<template>
  <div
    class="ms-stripe-card"
    :class="{
      'ms-stripe-card--large': size === 'large',
      'ms-stripe-card--small': size === 'small',
    }"
  >
    <div class="ms-stripe-card-content">
      <div v-if="size === 'large'">
        <p class="title-h4">{{ digits }}</p>
        <div class="row-fields">
          <p class="title-h4">{{ expirationDate }}</p>
        </div>
      </div>
    </div>
    <div
      class="ms-stripe-card--small-number"
      v-if="size === 'small'"
    >
      <p class="subtitles-small number-digits">{{ digits }}</p>
      <p class="subtitles-small number-expiration">{{ expirationDate }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaymentMethod } from '@lib/services';
import MastercardCardSmall from '@lib/assets/images/card-mastercard-small.svg';
import VisaCardSmall from '@lib/assets/images/card-visa-small.svg';
import MastercardCard from '@lib/assets/images/card-mastercard.svg';
import VisaCard from '@lib/assets/images/card-visa.svg';
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';

const props = defineProps<{
  card: PaymentMethod.Card;
  size?: 'large' | 'small';
}>();

const digits = `**** **** **** ${props.card.last4}`;

const size = ref(props.size ?? 'large');
const expirationDate = DateTime.local(props.card.exp_year, props.card.exp_month).toFormat('MM/yy');

// Using " for the url() is important because while the value gets url encoded, it means
// that double-quotes are encoded to single quotes, which leads to `url('%3Csvg width='250'...')`
const brandCSS = computed(() => `url("${getBrandImageUrl(props.card.brand)}")`);

function getBrandImageUrl(brand: string): string {
  switch (brand) {
    case 'visa':
      return size.value === 'large' ? VisaCard : VisaCardSmall;
    case 'mastercard':
      return size.value === 'large' ? MastercardCard : MastercardCardSmall;
    default:
      return '';
  }
}
</script>

<style scoped lang="scss">
.ms-stripe-card {
  display: flex;

  &-content {
    // image credit card in background
    background: v-bind(brandCSS) no-repeat center center;
    background-size: contain;
    padding: 1.25em;
    border-radius: var(--parsec-radius-8);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 0.75rem;
    letter-spacing: 0.15em;

    p {
      color: var(--parsec-color-light-secondary-white);
      margin: 0;
    }

    .row-fields {
      display: flex;
      gap: 1em;
    }
  }

  &--large {
    align-items: end;
    margin-top: auto;

    .ms-stripe-card-content {
      width: 15.625rem;
      height: 8.625rem;
    }
  }

  &--small {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-top: auto;

    .ms-stripe-card-content {
      width: 6.25rem;
      height: 3.5rem;
    }

    &-number {
      display: flex;
      flex-direction: column;

      .number-digits {
        color: var(--parsec-color-light-secondary-soft-text);
        font-size: 1rem;
        font-weight: 500;
        margin: 0;
      }

      .number-expiration {
        color: var(--parsec-color-light-secondary-hard-grey);
        font-size: 0.875rem;
        margin: 0;
      }
    }
  }
}
</style>
