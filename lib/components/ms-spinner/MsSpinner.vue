<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="container">
    <ion-text
      v-if="title"
      class="subtitles-normal container-text"
    >
      {{ $msTranslate(title) }}
    </ion-text>
    <svg
      :viewBox="`0 0 ${spinnerSize} ${spinnerSize}`"
      class="circular-progress"
    >
      <circle class="bg" />
      <circle class="fg" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { Translatable } from '@lib/services/translation';
import { IonText } from '@ionic/vue';
import { ref, computed } from 'vue';

const props = defineProps<{
  title?: Translatable;
  size?: number;
}>();

const spinnerSize = ref(props.size || 24);
const spinnerSizeFormatted = computed(() => `${spinnerSize.value}px`);
</script>

<style scoped lang="scss">
.container {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &-text {
    color: var(--parsec-color-light-secondary-grey);
  }
}

.circular-progress {
  width: v-bind(spinnerSizeFormatted);
  height: v-bind(spinnerSizeFormatted);
  --size: v-bind(spinnerSizeFormatted);
  --half-size: calc(var(--size) / 2);
  --stroke-width: calc(var(--size) / 8);
  --radius: calc((var(--size) - var(--stroke-width)) / 2);
  --circumference: calc(var(--radius) * pi * 2);
  --dash: calc((30 * var(--circumference)) / 100);
  animation: rotation 1s linear 0s infinite;
}

.circular-progress circle {
  cx: var(--half-size);
  cy: var(--half-size);
  r: var(--radius);
  stroke-width: var(--stroke-width);
  fill: none;
  stroke-linecap: round;
}

.circular-progress circle.bg {
  stroke: var(--parsec-color-light-primary-50);
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: var(--parsec-color-light-primary-500);
}

@property --progress {
  syntax: '<number>';
  inherits: false;
  initial-value: 0;
}

@keyframes rotation {
  from {
    --progress: 0;
    transform: rotate(0deg);
  }
  to {
    --progress: 360;
    transform: rotate(360deg);
  }
}
</style>
