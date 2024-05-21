<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item
    class="ms-grid-item ion-no-padding"
    :detail="false"
    :class="{ selected: item.isSelected, 'no-padding-end': !item.isSelected }"
    @click="$emit('click', item, $event)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="ms-grid-item-checkbox">
      <!-- eslint-disable vue/no-mutating-props -->
      <ms-checkbox
        v-model="item.isSelected"
        v-if="item.isSelectable && isSelectionEnabled && (isHovered || areSomeSelected.value)"
        @click.stop
        @ion-change="$emit('select', item, $event)"
      />
      <!-- eslint-enable vue/no-mutating-props -->
    </div>
    <div
      class="ms-grid-item-option"
      v-show="showOptions && (isHovered || menuOpened)"
      @click.stop="onOptionsClick($event)"
    >
      <ion-icon :icon="ellipsisHorizontal" />
    </div>
    <div class="ms-grid-item-content">
      <slot />
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { MsItemModel } from '@lib/components/ms-list/types';
import { ellipsisHorizontal } from 'ionicons/icons';
import { ref, Ref } from 'vue';
import { IonItem, IonIcon } from '@ionic/vue';
import { MsCheckbox } from '@lib/components';

const props = defineProps<{
  item: MsItemModel;
  areSomeSelected: Ref<boolean>;
  isSelectionEnabled?: boolean;
  showOptions?: boolean;
}>();

const emits = defineEmits<{
  (e: 'click', item: MsItemModel, event: Event): void;
  (e: 'select', item: MsItemModel, selected: boolean): void;
  (e: 'menuClick', item: MsItemModel, event: Event, onFinished: () => void): void;
}>();

const isHovered = ref(false);
const menuOpened = ref(false);

async function onOptionsClick(event: Event): Promise<void> {
  menuOpened.value = true;
  emits('menuClick', props.item, event, () => {
    menuOpened.value = false;
  });
}
</script>

<style scoped lang="scss">
.ms-grid-item {
  --background: none;
  --background-hover: none;

  border: 1px solid var(--parsec-color-light-secondary-medium);
  width: 14rem;
  border-radius: var(--parsec-radius-12);
  position: relative;
  height: fit-content;

  &::part(native) {
    --inner-padding-end: 0px;
  }
}

.ms-grid-item-option,
.ms-grid-item-checkbox {
  position: absolute;
  z-index: 10;
}

.ms-grid-item-checkbox {
  top: 1rem;
  right: 1rem;
}

.ms-grid-item-option {
  color: var(--parsec-color-light-secondary-grey);
  text-align: right;
  display: flex;
  align-items: center;
  bottom: 0;
  right: 0;
  font-size: 1.5rem;
  padding: 1rem;
  cursor: pointer;

  &:hover {
    color: var(--parsec-color-light-primary-500);
  }
}

.ms-grid-item-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem 0.5rem 1rem 1rem;
  width: 100%;
  min-height: 6em;
  margin: auto;
  color: var(--parsec-color-light-secondary-text);
}
</style>
