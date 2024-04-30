<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="container">
    <ion-text
      v-if="title"
      class="subtitles-normal container-text"
    >
      {{ $msTranslate(title) }}
    </ion-text>
    <div class="container-spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { Translatable } from '@lib/services/translation';
import { IonText } from '@ionic/vue';
import { ref } from 'vue';

const props = defineProps<{
  title?: Translatable;
  size?: number;
}>();

const spinnerSize = ref(`${props.size || 24}px`);
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
    position: relative;
    width: v-bind(spinnerSize);
    height: v-bind(spinnerSize);
    border: calc(v-bind(spinnerSize) / 8) solid #cce2ff;
    border-bottom-color: #4092ff;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    @keyframes rotation {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
