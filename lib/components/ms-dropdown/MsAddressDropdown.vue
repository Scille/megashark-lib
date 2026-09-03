<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-list
    class="dropdown-list"
    id="address-dropdown-list"
  >
    <ion-item
      class="option"
      button
      lines="none"
      v-for="[index, addr] in addresses.entries()"
      :key="index"
      @click="$emit('addressSelected', addr)"
    >
      <ion-text class="option-text">
        <span class="option-text__label">
          {{ addr.address }}
        </span>
        <span class="option-text__description">
          {{ `${addr.city}, ${addr.country}` }}
        </span>
      </ion-text>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonItem, IonList, IonText } from '@ionic/vue';
import { Address } from '@lib/services';

defineProps<{
  addresses: Array<Address>;
}>();

defineEmits<{
  (e: 'addressSelected', address: Address): void;
}>();
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.dropdown-list {
  padding: ms.spacing('padding-md');
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  border: ms.border('thin') solid ms.color('border-base-default');
  background: ms.color('surface-base-default');
  border-radius: ms.radius('lg');
  margin-top: ms.spacing('padding-lg');
  z-index: 12;
  gap: ms.spacing('gap-sm');
}

// eslint-disable-next-line vue-scoped-css/no-unused-selector
.option {
  --background: none;
  --background-hover: none;
  --color: #{ms.color('text-base-description')};
  border-radius: ms.radius('md');
  --min-height: 0;
  --inner-padding-end: 0;
  position: relative;
  z-index: 2;
  pointer-events: auto;
  cursor: pointer;

  &::part(native) {
    padding: ms.spacing('padding-xl') ms.spacing('padding-2xl');
  }

  &:hover:not(.item-disabled) {
    background: ms.color('surface-neutral-default-subtle-hover');
    --background-hover: #{ms.color('surface-neutral-default-subtle-hover')};

    .option-text {
      &__label {
        color: ms.color('text-neutral-default-hover');
      }
    }
  }

  &-text {
    margin: 0;
    display: flex;
    gap: ms.spacing('gap-sm');

    &__label {
      color: ms.color('text-base-body');
      @include ms.font('label-md-medium');
    }

    &__description {
      @include ms.font('body-sm-regular');
      color: ms.color('text-base-description');
    }
  }

  &.ion-focused {
    box-shadow: ms.shadow('focus-brand');
    --background-focused: ms.color('surface-base-default');
  }
}
</style>
