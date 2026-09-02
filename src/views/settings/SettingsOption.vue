<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="settings-option">
    <div class="settings-option__content">
      <ion-text class="body title">
        {{ $msTranslate(title) }}
      </ion-text>
      <ion-text class="body-sm description">
        {{ $msTranslate(description) }}
      </ion-text>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import { Translatable } from '@lib/services';

defineProps<{
  title: Translatable;
  description?: Translatable;
}>();
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.settings-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ms.spacing('padding-2xl') ms.spacing('padding-3xl') ms.spacing('padding-2xl') ms.spacing('padding-none');
  border-bottom: ms.border('thin') solid ms.color('border-neutral-default-subtle');
  gap: ms.spacing('gap-4xl');

  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    gap: ms.spacing('gap-sm');

    .title {
      color: ms.color('text-base-heading');
    }

    .description {
      color: ms.color('text-base-description');
    }
  }
}
</style>
