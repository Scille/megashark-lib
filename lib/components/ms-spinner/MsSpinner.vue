<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="container">
    <ion-text
      v-if="title"
      class="subtitles-normal container-text"
    >
      {{ $msTranslate(title) }}
    </ion-text>
    <ms-animation
      class="container-spinner"
      src="/lib/assets/spinner.riv"
      :height="height || 24"
      :width="width || 24"
      :speed="speed || 1"
    />
  </div>
</template>

<script setup lang="ts">
import MsAnimation from '@lib/components/ms-animation/MsAnimation.vue';
import { Translatable } from '@lib/services/translation';
import { IonText } from '@ionic/vue';

defineProps<{
  title?: Translatable;
  height?: number;
  width?: number;
  speed?: number;
}>();
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
  gap: 0.5rem;

  &-text {
    color: var(--parsec-color-light-secondary-grey);
    display: block;
    width: 100%;
  }

  &-spinner {
    --color: var(--parsec-color-light-primary-500);
    position: relative;
  }
}
</style>
