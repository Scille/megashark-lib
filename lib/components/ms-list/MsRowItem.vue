<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item
    button
    class="ms-row-item-item"
    lines="full"
    :detail="false"
    :class="{
      selected: item.isSelected,
      'no-padding-end': !item.isSelected,
    }"
    @click="$emit('click', item, $event)"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="ms-row-item-selected">
      <!-- eslint-disable vue/no-mutating-props -->
      <ms-checkbox
        v-model="item.isSelected"
        v-if="item.isSelectable && isSelectionEnabled && (isHovered || areSomeSelected.value)"
        @click.stop
        @change="$emit('select', item, $event)"
      />
      <!-- eslint-enable vue/no-mutating-props -->
    </div>
    <div class="ms-row-item-content">
      <slot />
    </div>
    <div class="ms-row-item-options ion-item-child-clickable">
      <ion-button
        v-show="showOptions && (isHovered || menuOpened)"
        fill="clear"
        class="ms-row-item-options-button"
        @click.stop="onOptionsClick($event)"
      >
        <ion-icon
          slot="icon-only"
          :icon="ellipsisHorizontal"
          class="ms-row-item-options-button__icon"
        />
      </ion-button>
    </div>
  </ion-item>
</template>

<script setup lang="ts">
import { MsItemModel } from '@lib/components/ms-list/types';
import { MsCheckbox } from '@lib/components';
import { ref, Ref } from 'vue';
import { IonItem, IonButton, IonIcon } from '@ionic/vue';
import { ellipsisHorizontal } from 'ionicons/icons';

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
.ms-row-item-selected {
  min-width: 4rem;
  justify-content: end;
  width: auto;
}

.ms-row-item-options {
  min-width: 4rem;
  width: auto;
  flex-grow: 0;
  margin-left: auto;

  ion-button::part(native) {
    padding: 0;
  }

  .ms-row-item-options-button {
    --background-hover: none;

    &__icon {
      color: var(--parsec-color-light-secondary-grey);
    }

    &:hover {
      .ms-row-item-options-button__icon {
        color: var(--parsec-color-light-primary-500);
      }
    }
  }
}
</style>
