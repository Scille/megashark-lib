<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="tooltip-container">
    <ms-image :image="WavyCaretUp" />
    <div class="tooltip-content">
      <ion-text class="tooltip-text body">
        {{ $msTranslate(text) }}
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MsImage, WavyCaretUp } from '@lib/components/ms-image';
import { Translatable } from '@lib/services';
import { IonText } from '@ionic/vue';

defineProps<{
  text: Translatable;
}>();
</script>

<style lang="scss" scoped>
.tooltip-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  --fill-color: var(--parsec-color-light-primary-900);

  // &.bottom {
  //   flex-direction: column-reverse;

  //   svg {
  //     transform: rotate(180deg);
  //   }
  // }
}

.tooltip-content {
  background: var(--parsec-color-light-primary-900);
  color: var(--parsec-color-light-primary-30);
  max-width: 14.5rem;
  width: fit-content;
  padding: 0.375rem 0.5rem;
  position: relative;
  border-radius: var(--parsec-radius-6);
  box-shadow: var(--parsec-shadow-light);
  text-align: center;
}
</style>
