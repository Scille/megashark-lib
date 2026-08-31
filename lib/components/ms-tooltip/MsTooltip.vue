<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="tooltip-container">
    <ms-image :image="WavyCaretUp" />
    <div class="tooltip-content">
      <ion-text class="tooltip-text">
        {{ $msTranslate(text) }}
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import { MsImage, WavyCaretUp } from '@lib/components/ms-image';
import { Translatable } from '@lib/services';

defineProps<{
  text: Translatable;
}>();
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.tooltip-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  --fill-color: #{ms.color('surface-elevated-default')};
}

.tooltip-content {
  background: ms.color('surface-elevated-default');
  color: ms.color('text-on-color-label');
  max-width: 14.5rem;
  width: fit-content;
  padding: ms.spacing('padding-xl') ms.spacing('padding-xl');
  position: relative;
  border-radius: ms.radius('lg');
  box-shadow: ms.shadow('sm');

  .tooltip-text {
    @include ms.font('body-lg-medium');
  }
}
</style>
