<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-list class="list-action-bar-popover">
    <ion-item
      class="list-action-bar-popover__item"
      v-for="(btn, index) in hiddenButtons"
      :key="index"
      @click="handleClick(btn)"
    >
      <div class="item-content">
        <ion-icon
          v-if="btn.icon"
          :icon="btn.icon"
          class="item-content__icon item-content__icon--left"
        />
        <ms-image
          v-if="btn.image"
          :image="btn.image"
          class="item-content__icon item-content__icon--left"
        />
        <ion-label class="item-content__label button-medium">{{ $msTranslate(btn.label) }}</ion-label>
        <ion-icon
          v-if="btn.isDropdown"
          :icon="chevronDown"
          class="item-content__icon item-content__icon--right"
        />
      </div>
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonLabel, IonList, popoverController } from '@ionic/vue';
import { MsImage } from '@lib/components';
import { Translatable } from '@lib/services';
import { chevronDown } from 'ionicons/icons';

defineProps<{
  hiddenButtons: {
    label: Translatable;
    icon?: string;
    image?: string;
    isDropdown?: boolean;
  }[];
}>();

async function handleClick(btn: any): Promise<void> {
  if (btn.onClick) {
    await btn.onClick();
  }
  await popoverController.dismiss();
}
</script>

<style lang="scss" scoped>
.list-action-bar-popover {
  --background: var(--parsec-color-light-secondary-soft);
  --ion-item-background: transparent;
  --ion-item-color: var(--parsec-color-light-secondary-soft-text);
  --ion-item-border-color: transparent;
  padding: 0.5rem 0.25rem;

  .item-content {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    flex: 1;
    padding: 0.5rem 0.5rem;

    &__label {
      color: var(--parsec-color-light-secondary-soft-text);
    }

    &__icon {
      font-size: 1.125rem;
      width: 1.125rem;
      height: 1.125rem;
      --fill-color: var(--parsec-color-light-secondary-soft-text);
      color: var(--parsec-color-light-secondary-soft-text);
    }

    &__icon--right {
      margin-left: auto;
    }
  }

  &__item {
    border-radius: var(--parsec-radius-8);
    cursor: pointer;

    &::part(native) {
      --inner-padding-end: 0;
      padding: 0;
    }

    &:hover {
      background: var(--parsec-color-light-secondary-premiere);

      .item-content__icon,
      .item-content__label {
        --fill-color: var(--parsec-color-light-primary-600);
        color: var(--parsec-color-light-primary-600);
      }
    }
  }
}
</style>
