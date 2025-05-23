<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="dropdown-container large">
    <ion-text
      class="form-label"
      v-if="title && appearanceRef === MsAppearance.Outline"
    >
      {{ $msTranslate(title) }}
    </ion-text>
    <ion-button
      :fill="appearanceRef"
      @click="openPopover($event)"
      id="dropdown-popover-button"
      class="dropdown-button form-input"
      :class="isPopoverOpen ? 'active' : ''"
      :disabled="disabled"
    >
      <div class="dropdown-button-content">
        <span class="input-text">{{ $msTranslate(labelRef) }}</span>
        <ion-icon
          :class="{ 'popover-is-open': isPopoverOpen }"
          class="ms-dropdown-icon"
          :icon="getIcon()"
        />
      </div>
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import MsDropdownPopover from '@lib/components/ms-dropdown/MsDropdownPopover.vue';
import MsSmallDisplayDropdown from '@lib/components/ms-dropdown/MsSmallDisplayDropdown.vue';
import { MsDropdownChangeEvent } from '@lib/components/ms-dropdown/types';
import { MsAppearance, MsOption, MsOptions } from '@lib/components/ms-types';
import { Translatable, useWindowSize } from '@lib/services';
import { IonButton, IonIcon, IonText, modalController, popoverController } from '@ionic/vue';
import { PositionAlign } from '@ionic/core';
import { caretDown, chevronDown } from 'ionicons/icons';
import { Ref, ref, computed } from 'vue';

const props = defineProps<{
  defaultOptionKey?: any;
  label?: Translatable;
  title?: Translatable;
  options: MsOptions;
  disabled?: boolean;
  appearance?: MsAppearance;
  alignment?: PositionAlign;
}>();

const emits = defineEmits<{
  (e: 'change', value: MsDropdownChangeEvent): void;
}>();

const { isLargeDisplay } = useWindowSize();

defineExpose({
  setCurrentKey,
});

const selectedOption: Ref<MsOption | undefined> = ref(
  props.defaultOptionKey !== undefined ? props.options.get(props.defaultOptionKey) : undefined,
);
const labelRef = computed(() => (selectedOption.value ? selectedOption.value.label : props.label));
const isPopoverOpen = ref(false);
const appearanceRef = ref(props.appearance ?? MsAppearance.Outline);

function setCurrentKey(key: any): void {
  const opt = props.options.set.find((o) => o.key === key);
  selectedOption.value = opt;
}

async function openPopover(event: Event): Promise<void> {
  let popover: HTMLIonPopoverElement | HTMLIonModalElement;
  if (isLargeDisplay.value) {
    popover = await popoverController.create({
      component: MsDropdownPopover,
      cssClass: 'dropdown-popover',
      componentProps: {
        options: props.options,
        defaultOptionKey: selectedOption.value?.key,
      },
      event: event,
      alignment: props.alignment !== undefined ? props.alignment : 'end',
      showBackdrop: false,
    });
  } else {
    popover = await modalController.create({
      component: MsSmallDisplayDropdown,
      canDismiss: true,
      cssClass: 'sheet-modal',
      breakpoints: [0, 1],
      initialBreakpoint: 1,
      componentProps: {
        title: props.title,
        options: props.options,
        defaultOptionKey: selectedOption.value?.key,
      },
    });
  }
  isPopoverOpen.value = true;
  await popover.present();
  await onDidDismissPopover(popover);
  isPopoverOpen.value = false;
  await popover.dismiss();
}

async function onDidDismissPopover(popover: any): Promise<void> {
  const { data } = await popover.onDidDismiss();
  if (data) {
    if (data.option !== selectedOption.value) {
      const oldOption = selectedOption.value;
      selectedOption.value = data.option;
      emits('change', {
        option: data.option,
        oldOption: oldOption,
      });
    }
  }
}

function getIcon(): string {
  switch (appearanceRef.value) {
    case MsAppearance.Outline:
      return chevronDown;
    case MsAppearance.Clear:
      return caretDown;
  }
}
</script>

<style lang="scss" scoped>
.dropdown-button {
  background: none;
  color: var(--parsec-color-light-primary-800);
  margin: 0;

  .input-text {
    width: 100%;
    text-align: left;
    pointer-events: none;
  }

  &::part(native) {
    border-radius: var(--parsec-radius-8);
    border-color: var(--parsec-color-light-secondary-light);
    padding: 0 !important;
    --ripple-color: transparent;
  }

  &:hover {
    &::part(native) {
      border-color: var(--parsec-color-light-primary-300);
    }
  }

  &-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
  }
}

.dropdown-container {
  // offset necessary to simulate border 3px on focus with outline (outline 2px + border 1px)
  --offset: 4px;
  --padding-start: 0;
  --padding-end: 0;
  --padding-top: 0;
  --padding-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .active {
    --background: var(--parsec-color-light-secondary-background);
    outline: var(--offset) solid var(--parsec-color-light-outline);
    border-radius: var(--parsec-radius-8);

    &::part(native) {
      border: 1px solid var(--parsec-color-light-primary-300);
    }
  }

  .form-label {
    color: var(--parsec-color-light-primary-700);
  }

  &.large {
    .dropdown-button::part(native) {
      padding: 0.625rem 1rem;
    }
  }
}

.ms-dropdown-icon {
  font-size: 1.125rem;
  transition: transform ease-out 300ms;
  color: var(--parsec-color-light-secondary-grey);

  &.popover-is-open {
    transform: rotate(180deg);
  }
}
</style>
