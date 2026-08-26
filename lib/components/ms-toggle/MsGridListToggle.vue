<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="ms-grid-list-toggle">
    <!-- grid -->
    <div
      button
      class="button-view"
      :class="modelValue === DisplayState.Grid ? 'button-disabled' : ''"
      id="grid-view"
      :disabled="modelValue === DisplayState.Grid"
      @click="$emit('update:modelValue', modelValue === DisplayState.Grid ? DisplayState.List : DisplayState.Grid)"
    >
      <ion-icon
        class="button-icon"
        :icon="grid"
      />
    </div>
    <!-- list -->
    <div
      button
      class="button-view"
      :class="modelValue === DisplayState.List ? 'button-disabled' : ''"
      id="list-view"
      :disabled="modelValue === DisplayState.List"
      @click="$emit('update:modelValue', modelValue === DisplayState.Grid ? DisplayState.List : DisplayState.Grid)"
    >
      <ion-icon
        class="button-icon"
        :icon="list"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { DisplayState } from '@lib/components/ms-toggle/types';
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
@use '@lib/theme' as ms;

.ms-grid-list-toggle {
  display: flex;
  align-items: center;
  border-radius: ms.radius('lg');
  padding: ms.spacing('padding-sm');
  background: ms.color('surface-base-page-secondary');
  flex-shrink: 0;
  overflow: hidden;
}

.button-view {
  min-height: 1rem;
  height: 100%;
  border-radius: ms.radius('md');
  display: flex;

  .button-icon {
    color: ms.color('icon-neutral-default');
    font-size: 1.125rem;
    padding: ms.spacing('padding-sm');
  }

  &:not(.button-disabled) {
    cursor: pointer;
    opacity: ms.opacity('disabled');

    &:hover {
      background: ms.color('surface-base-default');

      .button-icon {
        color: ms.color('icon-neutral-default-hover');
      }
    }
  }

  &::part(native) {
    padding: 0px;
  }
}

.button-disabled {
  background: ms.color('surface-base-default');
  opacity: 1;
  box-shadow: ms.shadow('toggle');

  .button-icon {
    color: ms.color('icon-neutral-default');
  }
}
</style>
