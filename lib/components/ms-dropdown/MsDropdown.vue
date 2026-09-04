<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="dropdown-container large">
    <ion-text
      class="input-label"
      v-if="title && appearanceRef === MsAppearance.Outline"
    >
      {{ $msTranslate(title) }}
    </ion-text>
    <ion-button
      :fill="appearanceRef"
      @click="openPopover($event)"
      id="dropdown-popover-button"
      class="dropdown-button"
      :class="isPopoverOpen ? 'active' : ''"
      :disabled="disabled"
    >
      <span class="input-text">{{ $msTranslate(labelRef) }}</span>
      <ion-icon
        :class="{ 'popover-is-open': isPopoverOpen }"
        class="ms-dropdown-icon button-icon-right"
        :icon="getIcon()"
      />
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { PositionAlign } from '@ionic/core';
import { IonButton, IonIcon, IonText, modalController, popoverController } from '@ionic/vue';
import MsDropdownPopover from '@lib/components/ms-dropdown/MsDropdownPopover.vue';
import MsSmallDisplayDropdown from '@lib/components/ms-dropdown/MsSmallDisplayDropdown.vue';
import { MsDropdownChangeEvent } from '@lib/components/ms-dropdown/types';
import { MsAppearance, MsOption, MsOptions } from '@lib/components/ms-types';
import { Translatable, useWindowSize } from '@lib/services';
import { caretDown, chevronDown } from 'ionicons/icons';
import { computed, Ref, ref } from 'vue';

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
      expandToScroll: false,
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
@use '@lib/theme' as ms;

.dropdown-button {
  margin: 0;
  @include ms.font('label-md-medium');

  .input-text {
    width: 100%;
    text-align: left;
    pointer-events: none;
    color: ms.color('text-base-body');
  }

  &::part(native) {
    border-radius: ms.radius('lg');
    border-color: ms.color('border-base-default');
    background: ms.color('surface-base-default');
  }

  &:hover {
    .input-text {
      color: ms.color('text-neutral-default-hover');
    }

    &::part(native) {
      background: ms.color('surface-neutral-default-subtle-hover');
      border-color: ms.color('border-brand-default');
    }
  }
}

.dropdown-container {
  display: flex;
  flex-direction: column;
  gap: ms.spacing('gap-lg');

  .active {
    --background: #{ms.color('surface-neutral-default-subtle')};

    &::part(native) {
      box-shadow: ms.shadow('focus-brand');
      border: ms.border('thin') solid ms.color('border-brand-default');
    }
  }

  .input-label {
    color: ms.color('text-base-label');
    @include ms.font('label-md-medium');
  }

  &.large {
    @include ms.responsive-breakpoint('sm') {
      width: 100%;
    }

    .dropdown-button::part(native) {
      padding: ms.spacing('padding-xl') ms.spacing('padding-3xl');
    }
  }
}

.ms-dropdown-icon {
  transition: transform ease-out 300ms;
  color: ms.color('icon-neutral-default');

  &.popover-is-open {
    transform: rotate(180deg);
  }
}
</style>
