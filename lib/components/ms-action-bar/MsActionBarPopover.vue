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
        <ion-text class="item-content__label">{{ $msTranslate(btn.label) }}</ion-text>
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
import { IonIcon, IonItem, IonList, IonText, popoverController } from '@ionic/vue';
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
    await popoverController.dismiss();
    await btn.onClick();
  }
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.list-action-bar-popover {
  --background: #{ms.color('surface-base-default')};
  --ion-item-background: transparent;
  --ion-item-color: #{ms.color('text-neutral-default')};
  --ion-item-border-color: transparent;
  padding: ms.spacing('padding-md');

  .item-content {
    display: flex;
    align-items: center;
    gap: ms.spacing('gap-md');
    flex: 1;
    padding: ms.spacing('padding-lg') ms.spacing('padding-lg');

    &__label {
      @include ms.font('label-md-medium');
      color: ms.color('text-neutral-default');
    }

    &__icon {
      font-size: 1.125rem;
      width: 1.125rem;
      height: 1.125rem;
      --fill-color: #{ms.color('icon-neutral-default')};
      color: ms.color('icon-neutral-default');
    }

    &__icon--right {
      margin-left: auto;
    }
  }

  &__item {
    border-radius: ms.radius('lg');
    cursor: pointer;

    &::part(native) {
      --inner-padding-end: 0;
      padding: 0;
    }

    &:hover {
      background: ms.color('surface-neutral-default-subtle-hover');

      .item-content__icon,
      .item-content__label {
        --fill-color: #{ms.color('icon-neutral-default-hover')};
        color: ms.color('text-neutral-default-hover');
      }
    }
  }
}
</style>
