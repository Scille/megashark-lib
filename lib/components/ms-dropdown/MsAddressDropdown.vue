<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-list class="container">
    <ion-item
      class="option"
      button
      lines="none"
      v-for="[index, addr] in addresses.entries()"
      :key="index"
      @click="$emit('addressSelected', addr)"
    >
      <ion-text class="option-text subtitles-sm">
        <span class="option-text__label">
          {{ addr.address }}
        </span>
        <span class="option-text__description">
          {{ `${addr.city} (${addr.country})` }}
        </span>
      </ion-text>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonText } from '@ionic/vue';
import { Address } from '@lib/services';

defineProps<{
  addresses: Array<Address>;
}>();

defineEmits<{
  (e: 'addressSelected', address: Address): void;
}>();
</script>

<style lang="scss" scoped>
.container {
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  border: 1px solid var(--parsec-color-light-secondary-light);
  background: var(--parsec-color-light-secondary-white);
  border-radius: var(--parsec-radius-8);
  margin-top: 0.5rem;
  z-index: 12;
}

.option {
  --background-hover: none;
  --color: var(--parsec-color-light-secondary-grey);
  padding: 0.75rem 1rem;
  --background: none;
  --min-height: 0;
  --inner-padding-end: 0;
  --ripple-color: transparent;
  position: relative;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;

  &:hover:not(.item-disabled) {
    background: var(--parsec-color-light-primary-30);
    --background-hover: var(--parsec-color-light-primary-30);
  }
  &::part(native) {
    padding: 0;
  }
  &-text {
    margin: 0;
    display: flex;
    gap: 0.5rem;

    &__label {
      color: var(--parsec-color-light-secondary-text);
    }
  }
}
</style>
