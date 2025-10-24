<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item-divider class="toolbar ion-margin-bottom secondary">
    <div
      class="action-bar"
      ref="actionBar"
    >
      <div class="action-bar-buttons-content">
        <div
          class="action-bar-buttons-list"
          ref="actionBarButtonsList"
        >
          <ms-action-bar-button
            v-for="(button, index) in buttons"
            :key="button.icon || index"
            :button-label="button.label"
            :icon="button.icon"
            :image="button.image"
            :is-dropdown="button.isDropdown"
            @click="button.onClick"
            ref="buttonComponents"
            :class="{
              'ms-action-bar-button--visible': buttonVisibilityStates[index],
              'ms-action-bar-button--hidden': !buttonVisibilityStates[index],
            }"
          />
          <ion-button
            id="action-bar-more-button"
            class="button-medium"
            @click="openActionBarPopover($event)"
            v-show="hiddenButtons.length > 0"
            ref="actionBarMoreButtonRef"
          >
            <ion-icon
              slot="icon-only"
              class="more-icon__ellipsis"
              :icon="ellipsisHorizontal"
            />
            <ion-icon
              class="more-icon__chevron"
              slot="end"
              :icon="chevronDown"
            />
          </ion-button>
        </div>
      </div>
      <slot />
    </div>
  </ion-item-divider>
</template>

<script setup lang="ts">
import { IonItemDivider, popoverController, IonButton, IonIcon } from '@ionic/vue';
import { MsActionBarButton } from '@lib/components';
import { Translatable } from '@lib/services';
import { chevronDown, ellipsisHorizontal } from 'ionicons/icons';
import { ref, onMounted, nextTick, watch, computed, onUnmounted, useTemplateRef } from 'vue';
import MsActionBarPopover from '@lib/components/ms-action-bar/MsActionBarPopover.vue';

const props = defineProps<{
  buttons: {
    label: Translatable;
    icon?: string;
    image?: string;
    isDropdown?: boolean;
    onClick?: (event: MouseEvent) => Promise<void>;
  }[];
}>();

const buttonComponentRefs = useTemplateRef<Array<InstanceType<typeof MsActionBarButton>>>('buttonComponents');
const actionBarRef = useTemplateRef<HTMLDivElement>('actionBar');
const actionBarButtonsListRef = useTemplateRef<HTMLDivElement>('actionBarButtonsList');
const buttonVisibilityStates = ref<boolean[]>([]);
const actionBarWidth = ref(0);
let resizeObserver: ResizeObserver | undefined = undefined;

const hiddenButtons = computed(() => {
  const hidden = props.buttons.filter((_, index) => buttonVisibilityStates.value[index] === false);
  return hidden;
});

/*
 * Calculates which buttons should be visible based on available space.
 * - Shows all buttons temporarily to measure their actual width
 * - Determines how many buttons can fit in the available space
 * - Reserves space for the "more" button if some buttons need to be hidden
 * - Updates buttonVisibilityStates to toggle button visibility
 */
async function calculateButtonVisibility(): Promise<void> {
  if (!actionBarRef.value || actionBarWidth.value === 0) {
    return;
  }

  buttonVisibilityStates.value = new Array(props.buttons.length).fill(true);
  await nextTick();

  const availableWidth = getButtonListWidth();
  const MORE_BUTTON_WIDTH = 32;

  if (availableWidth < MORE_BUTTON_WIDTH) {
    buttonVisibilityStates.value = new Array(props.buttons.length).fill(false);
    return;
  }

  let totalWidth = 0;
  const newVisibility: boolean[] = [];

  for (let i = 0; i < props.buttons.length; i++) {
    const buttonWidth = getButtonWidth(i);
    if (buttonWidth === 0) {
      newVisibility[i] = false;
      continue;
    }

    const gap = i > 0 ? 8 : 0;
    const widthNeeded = totalWidth + buttonWidth + gap;
    const isLastButton = i === props.buttons.length - 1;

    const maxAllowedWidth = isLastButton ? availableWidth : availableWidth - MORE_BUTTON_WIDTH;

    if (widthNeeded <= maxAllowedWidth) {
      newVisibility[i] = true;
      totalWidth = widthNeeded;
    } else {
      // This button and all subsequent ones will be hidden
      newVisibility.push(...new Array(props.buttons.length - i).fill(false));
      break;
    }
  }

  buttonVisibilityStates.value = newVisibility;
}

// Returns the available width for displaying buttons (excluding slot)
function getButtonListWidth(): number {
  const buttonListRect = actionBarButtonsListRef.value!.getBoundingClientRect();
  const slotWidth = actionBarWidth.value - buttonListRect.width;
  return actionBarWidth.value - slotWidth;
}

function getButtonWidth(index: number): number {
  if (!buttonComponentRefs.value) {
    return 0;
  }
  const buttonComponent = buttonComponentRefs.value[index];
  return buttonComponent?.getWidth();
}

// Watches for changes in the number of buttons
// When buttons are added or removed, recalculates which ones can be displayed
watch(
  () => props.buttons.length,
  () => {
    nextTick(() => calculateButtonVisibility());
  },
  { immediate: true },
);

// Watches for changes in the action bar width
// Recalculates button visibility when the available space changes
watch(
  () => actionBarWidth.value,
  (newWidth) => {
    if (newWidth > 0) {
      calculateButtonVisibility();
    }
  },
);

function setupResizeObserver(): void {
  if (!actionBarRef.value) return;

  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const newWidth = entry.contentRect.width;
      if (newWidth !== actionBarWidth.value) {
        actionBarWidth.value = newWidth;
      }
    }
  });

  resizeObserver.observe(actionBarRef.value);
}

// Allows to expose a method to recalculate button visibility
function recalculateVisibility(): void {
  if (actionBarRef.value) {
    const rect = actionBarRef.value.getBoundingClientRect();
    actionBarWidth.value = rect.width;
  }

  setTimeout(() => {
    calculateButtonVisibility();
  }, 10);
}

async function openActionBarPopover(event: Event): Promise<void> {
  const popover = await popoverController.create({
    component: MsActionBarPopover,
    cssClass: 'action-bar-more-popover',
    componentProps: {
      hiddenButtons: hiddenButtons.value,
    },
    event: event,
    alignment: 'end',
    showBackdrop: false,
  });
  await popover.present();
  await popover.onDidDismiss();
}

onMounted(async () => {
  setupResizeObserver();

  if (actionBarRef.value) {
    const rect = actionBarRef.value.getBoundingClientRect();
    actionBarWidth.value = rect.width;
  }

  calculateButtonVisibility();
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

defineExpose({
  recalculateVisibility,
});
</script>

<style scoped lang="scss">
.toolbar {
  margin: 0 1.25rem;
  padding: 0 1em;
  min-height: 3rem;
  background-color: var(--parsec-color-light-secondary-background);
  border-bottom: 1px solid var(--parsec-color-light-secondary-medium);
  border-radius: var(--parsec-radius-12);
  width: auto;
  width: -webkit-fill-available;
  --inner-padding-end: 0;
  box-shadow: none;
}

.action-bar {
  display: flex;
  gap: 0.5rem;
}

#action-bar-more-button {
  --background: transparent;
  --background-hover: var(--parsec-color-light-secondary-medium);
  --color: var(--parsec-color-light-secondary-text);
  margin-left: 0.5rem;
  min-height: 1rem;

  &::part(native) {
    padding: 0.25rem 0.5rem;
  }

  .more-icon__ellipsis {
    font-size: 1.125rem;
    color: var(--parsec-color-light-secondary-soft-text);
  }

  .more-icon__chevron {
    margin-inline: 0em;
    margin-left: 0.375rem;
    font-size: 1rem;
    color: var(--parsec-color-light-secondary-soft-text);
  }

  &:hover {
    .more-icon__chevron,
    .more-icon__ellipsis {
      color: var(--parsec-color-light-primary-600);
    }
  }
}

.action-bar-buttons-content {
  display: flex;
  width: 100%;
}

.action-bar-buttons-list {
  width: calc(100% - 2rem);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.ms-action-bar-button--visible {
  display: flex;
}

.ms-action-bar-button--hidden {
  display: none;
}
</style>
