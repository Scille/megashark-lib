<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-button
    fill="clear"
    @click="openPopover($event)"
    id="select-popover-button"
    class="sorter-button"
    :disabled="disabled"
  >
    <div class="sorter-button-content">
      <ion-icon
        class="sorter-button-content__icon ms-sorter-icon"
        :icon="swapVertical"
      />
      <ion-text
        v-if="isLargeDisplay"
        class="sorter-button-content__text button-small"
      >
        {{ $msTranslate(labelRef) }}
      </ion-text>
    </div>
  </ion-button>
</template>

<script setup lang="ts">
import MsSorterPopover from '@lib/components/ms-sorter/MsSorterPopover.vue';
import { MsSorterChangeEvent, MsSorterLabels } from '@lib/components/ms-sorter/types';
import { MsOption, MsOptions } from '@lib/components/ms-types';
import { Translatable, useWindowSize } from '@lib/services';
import { IonButton, IonIcon, popoverController, IonText } from '@ionic/vue';
import { swapVertical } from 'ionicons/icons';
import { Ref, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    defaultOption: any;
    label?: Translatable;
    options: MsOptions;
    sorterLabels?: MsSorterLabels;
    disabled?: boolean;
    sortByAsc?: boolean;
  }>(),
  {
    sortByAsc: undefined,
    label: undefined,
    sorterLabels: undefined,
  },
);

const emits = defineEmits<{
  (e: 'change', value: MsSorterChangeEvent): void;
}>();

const { isLargeDisplay } = useWindowSize();
const selectedOption: Ref<MsOption | undefined> = ref(props.defaultOption ? props.options.get(props.defaultOption) : undefined);
const sortByAsc: Ref<boolean> = ref(props.sortByAsc ?? true);
const labelRef = ref(selectedOption.value?.label || props.label);

async function openPopover(event: Event): Promise<void> {
  const popover = await popoverController.create({
    component: MsSorterPopover,
    cssClass: 'sorter-popover',
    componentProps: {
      options: props.options,
      defaultOption: selectedOption.value?.key,
      sorterLabels: props.sorterLabels,
      sortByAsc: sortByAsc.value,
    },
    event: event,
    alignment: 'end',
    showBackdrop: false,
  });
  await popover.present();
  await onDidDismissPopover(popover);
  await popover.dismiss();
}

async function onDidDismissPopover(popover: any): Promise<void> {
  const { data } = await popover.onDidDismiss();
  if (data) {
    labelRef.value = data.option.label;
    selectedOption.value = data.option;
    sortByAsc.value = data.sortByAsc;
    emits('change', {
      option: data.option,
      sortByAsc: sortByAsc.value,
    });
  }
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.sorter-button {
  --background: none;
  --background-hover: var(--parsec-color-light-secondary-medium);
  --color: var(--parsec-color-light-secondary-text);
  min-height: 1rem;

  &::part(native) {
    padding: 0;
  }

  &-content {
    padding: 0.375rem 0.625rem;
    background: var(--parsec-color-light-secondary-background);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.15s ease-in-out;

    @include ms.responsive-breakpoint('sm') {
      padding: 0.625rem;
    }

    &__icon {
      color: var(--parsec-color-light-secondary-grey);
      font-size: 1rem;

      @include ms.responsive-breakpoint('sm') {
        font-size: 1.125rem;
      }
    }

    &__text {
      color: var(--parsec-color-light-secondary-text);
      font-size: 0.875rem;
      font-weight: 500;
    }

    &:focus,
    &:active {
      background: var(--parsec-color-light-secondary-medium);
    }

    &:hover ion-icon {
      color: var(--parsec-color-light-primary-700);
    }
  }
}
</style>
