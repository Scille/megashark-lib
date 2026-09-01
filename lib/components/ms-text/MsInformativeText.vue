<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="container-textinfo">
    <ion-icon
      :icon="icon ?? ellipse"
      size="default"
      class="container-textinfo__icon"
    />
    <ion-text class="subtitles-normal container-textinfo__text">
      <slot />
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonText } from '@ionic/vue';
import { ellipse } from 'ionicons/icons';

defineProps<{
  icon?: string;
}>();
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.container-textinfo {
  display: flex;
  flex-direction: row;
  gap: ms.spacing('gap-xl');
  background-color: none;
  max-width: 37.5rem;

  &__icon {
    color: ms.color('icon-brand-default');
    font-size: 0.5rem;
    min-width: 0.5rem;
    border: ms.border('thin') solid ms.color('border-brand-default');
    border-radius: ms.radius('full');
    padding: ms.spacing('padding-xs');
    margin-top: 0.3rem;
  }

  &__text {
    color: ms.color('text-base-body');
    @include ms.font('body-lg-medium');
  }
}
</style>
