<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-button
    fill="outline"
    @click="openPopover($event)"
    id="select-popover-button"
    class="sorter-button"
    :disabled="disabled"
  >
    <ion-icon
      class="sorter-button__icon ms-sorter-icon button-icon-left"
      :icon="sortByAsc ? arrowUp : arrowDown"
    />
    <ion-text class="sorter-button__text">
      {{ $msTranslate(labelRef) }}
    </ion-text>
  </ion-button>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonText, popoverController } from '@ionic/vue';
import MsSorterPopover from '@lib/components/ms-sorter/MsSorterPopover.vue';
import { MsSorterChangeEvent, MsSorterLabels } from '@lib/components/ms-sorter/types';
import { MsOption, MsOptions } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';
import { arrowDown, arrowUp } from 'ionicons/icons';
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
  min-width: auto;

  &::part(native) {
    padding: ms.spacing('padding-lg') ms.spacing('padding-xl');

    @include ms.responsive-breakpoint('sm') {
      padding: ms.spacing('padding-2xl');
    }
  }

  &__text {
    @include ms.font('label-sm-medium');
  }
}
</style>
