<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="ms-grid-list-toggle">
    <!-- grid -->
    <ion-button
      fill="clear"
      class="button-view"
      id="grid-view"
      :disabled="modelValue === DisplayState.Grid"
      @click="$emit('update:modelValue', modelValue === DisplayState.Grid ? DisplayState.List : DisplayState.Grid)"
    >
      <ion-icon :icon="grid" />
    </ion-button>
    <!-- list -->
    <ion-button
      fill="clear"
      class="button-view"
      id="list-view"
      :disabled="modelValue === DisplayState.List"
      @click="$emit('update:modelValue', modelValue === DisplayState.Grid ? DisplayState.List : DisplayState.Grid)"
    >
      <ion-icon :icon="list" />
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { DisplayState } from '@lib/components/ms-toggle/types';
import { IonButton, IonIcon } from '@ionic/vue';
import { grid, list } from 'ionicons/icons';

defineProps<{
  modelValue: DisplayState;
}>();

defineEmits<{
  (e: 'update:modelValue', value: DisplayState): void;
}>();

defineExpose({
  DisplayState,
});
</script>

<style scoped lang="scss">
.ms-grid-list-toggle {
  display: flex;
  align-items: center;
  border-radius: var(--parsec-radius-8);
  border: 1px solid var(--parsec-color-light-secondary-medium);
  background: var(--parsec-color-light-secondary-premiere);
  flex-shrink: 0;
  overflow: hidden;
  box-shadow: var(--parsec-shadow-low);
}

.button-view {
  color: var(--parsec-color-light-secondary-light);
  min-height: 1rem;
  height: 100%;
  --ripple-color: transparent;

  &:not(.button-disabled) {
    cursor: pointer;
    --background-hover: none;

    &:hover {
      color: var(--parsec-color-light-secondary-soft-grey);
    }
  }

  &::part(native) {
    padding: 0px;
  }

  ion-icon {
    font-size: 1.125rem;
    padding: 0.5rem;
  }

  &:nth-child(1) {
    border-right: 1px solid var(--parsec-color-light-secondary-medium);
  }
}

// eslint-disable-next-line vue-scoped-css/no-unused-selector
.button-disabled {
  background: var(--parsec-color-light-secondary-white);
  color: var(--parsec-color-light-secondary-hard-grey);
  opacity: 1;
}
</style>
