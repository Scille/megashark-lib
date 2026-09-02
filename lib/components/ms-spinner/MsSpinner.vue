<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="spinner-container">
    <ion-text
      v-if="title"
      class="spinner-text"
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
import { IonText } from '@ionic/vue';
import { Translatable } from '@lib/services';
import { computed, ref } from 'vue';

const props = defineProps<{
  title?: Translatable;
  size?: number;
}>();

const spinnerSize = ref(props.size || 24);
const spinnerSizeFormatted = computed(() => `${spinnerSize.value}px`);
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.spinner-container {
  display: flex;
  align-items: center;
  gap: ms.spacing('gap-xl');

  .spinner-text {
    color: ms.color('text-neutral-default');
    @include ms.font('label-lg-medium');
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
  animation: rotation 750ms linear 0s infinite;
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
  stroke: ms.color('surface-brand-default-subtle');
}

.circular-progress circle.fg {
  transform: rotate(-90deg);
  transform-origin: var(--half-size) var(--half-size);
  stroke-dasharray: var(--dash) calc(var(--circumference) - var(--dash));
  transition: stroke-dasharray 0.3s linear 0s;
  stroke: ms.color('surface-brand-default');
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
