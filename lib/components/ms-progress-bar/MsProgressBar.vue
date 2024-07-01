<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="progress-bar-container">
    <div class="progress-bar">
      <div class="completed" />
    </div>
    <ion-text
      class="title-h5 progress-text"
      v-show="props.showProgressText"
    >
      {{ `${progress}%` }}
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonText } from '@ionic/vue';

const props = defineProps<{
  progress: number;
  showProgressText?: boolean;
}>();

const progressWidthStyle = computed(() => `${props.progress}%`);
</script>

<style scoped lang="scss">
.progress-bar-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress-bar {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 16em;
  // width: v-bind(width);
  padding: 0.125rem;
  height: 0.725rem;
  background: var(--parsec-color-light-secondary-premiere);
  border-radius: var(--parsec-radius-8);

  .completed {
    transition: width 0.35s ease-in-out;
    width: v-bind(progressWidthStyle);
    height: 0.5rem;
    background: var(--parsec-color-light-gradient);
    border-radius: var(--parsec-radius-6);
    flex: none;
    order: 0;
    flex-grow: 1;
  }
}

.progress-text {
  color: var(--parsec-color-light-primary-600);
}
</style>
