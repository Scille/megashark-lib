<template>
  <div class="ms-stripe-card">
    <div class="ms-stripe-card-content">
      <p class="title-h4">{{ digits }}</p>
      <div class="row-fields">
        <p class="title-h4">{{ expirationDate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PaymentMethod } from '@lib/services';
import MastercardCard from '@lib/assets/images/card-mastercard.svg';
import VisaCard from '@lib/assets/images/card-visa.svg';
import { DateTime } from 'luxon';
import { computed } from 'vue';

const props = defineProps<{
  card: PaymentMethod.Card;
}>();

const digits = `**** **** **** ${props.card.last4}`;

const expirationDate = DateTime.local(props.card.exp_year, props.card.exp_month).toFormat('MM/yy');

const brandCSS = computed(() => `url('${getBrandImageUrl(props.card.brand)}')`);

function getBrandImageUrl(brand: string): string {
  switch (brand) {
    case 'visa':
      return VisaCard;
    case 'mastercard':
      return MastercardCard;
    default:
      return '';
  }
}
</script>

<style scoped lang="scss">
.ms-stripe-card {
  // image credit card in background
  background: v-bind(brandCSS) no-repeat center center;
  background-size: contain;
  width: 15.625rem;
  height: 8.625rem;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: end;
  margin-top: auto;

  &-content {
    padding: 1.25em;
    border-radius: var(--parsec-radius-8);
    display: flex;
    flex-direction: column;
    gap: 1em;
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
}
</style>
