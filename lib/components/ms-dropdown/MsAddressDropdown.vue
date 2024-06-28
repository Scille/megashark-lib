<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-list class="container">
    <ion-item
      class="option body"
      button
      lines="none"
      v-for="[index, addr] in addresses.entries()"
      :key="index"
      @click="onAddressClick(addr)"
    >
      <ion-label class="option-text">
        <span class="option-text__label body">
          {{ addr.address }}
        </span>
        <span class="option-text__description body-sm">
          {{ `${addr.city} - ${addr.country}` }}
        </span>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonItem, IonLabel, popoverController } from '@ionic/vue';
import { MsModalResult } from '@lib/components/ms-modal';
import { Address } from '@lib/services/geoapifyApi';

defineProps<{
  addresses: Array<Address>;
}>();

async function onAddressClick(addr: Address): Promise<void> {
  await popoverController.dismiss({ address: addr }, MsModalResult.Confirm);
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.option {
  --background-hover: none;
  --color: var(--parsec-color-light-secondary-grey);
  padding: 0.375rem 0.75rem;
  --background: none;
  border-radius: var(--parsec-radius-6);
  --min-height: 0;
  --inner-padding-end: 0;
  position: relative;
  z-index: 2;
  pointer-events: auto;
  &:hover:not(.item-disabled) {
    background: var(--parsec-color-light-primary-50);
    --background-hover: var(--parsec-color-light-primary-50);
  }
  &::part(native) {
    padding: 0;
  }
  &-text {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    &__label {
      color: var(--parsec-color-light-secondary-text);
    }
  }
}
</style>
