<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="sorter-container">
    <ion-item
      v-if="sorterLabels"
      id="sort-order-button"
      class="order-button"
      button
      @click="onOptionClick()"
    >
      {{ $msTranslate(getSorterLabel()) }}
      <ion-icon
        :icon="sortByAsc ? arrowUp : arrowDown"
        slot="end"
        class="arrow-icon"
      />
    </ion-item>
    <ion-list class="sorter-list">
      <ion-text class="sorter-list__title">
        {{ $msTranslate('lib.components.msSorter.sortBy') }}
      </ion-text>
      <ion-item
        class="sorter-list-item"
        :class="{ selected: selectedOption?.key === option.key }"
        :disabled="option.disabled"
        button
        lines="none"
        v-for="option in options.set"
        :key="option.key"
        @click="onOptionClick(option)"
      >
        {{ $msTranslate(option.label) }}
        <ion-icon
          slot="end"
          :icon="checkmark"
          class="checked item-icon"
          :class="{ selected: selectedOption?.key === option.key }"
          v-if="selectedOption?.key === option.key"
        />
      </ion-item>
    </ion-list>
  </div>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonList, IonText, popoverController } from '@ionic/vue';
import { MsSorterLabels } from '@lib/components/ms-sorter/types';
import { MsOption, MsOptions } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';
import { arrowDown, arrowUp, checkmark } from 'ionicons/icons';
import { Ref, ref } from 'vue';

const props = defineProps<{
  defaultOption?: any;
  options: MsOptions;
  sorterLabels?: MsSorterLabels;
  sortByAsc: boolean;
}>();

const sortByAsc: Ref<boolean> = ref(props.sortByAsc);
const selectedOption = ref(props.defaultOption ? props.options.get(props.defaultOption) : props.options.at(0));

function onOptionClick(option?: MsOption): void {
  if (option) {
    selectedOption.value = option;
  } else {
    sortByAsc.value = !sortByAsc.value;
  }
  popoverController.dismiss({
    option: selectedOption.value,
    sortByAsc: sortByAsc.value,
  });
}

function getSorterLabel(): Translatable {
  const ascLabel = props.sorterLabels?.asc ?? 'lib.components.msSorter.desc';
  const descLabel = props.sorterLabels?.desc ?? 'lib.components.msSorter.desc';
  return sortByAsc.value ? ascLabel : descLabel;
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.sorter-container {
  display: flex;
  flex-direction: column;
}

#sort-order-button {
  --background: none;
  --color: #{ms.color('text-base-description')};
  --border-radius: #{ms.radius('sm')};
  --padding-top: #{ms.spacing('padding-md')};
  --padding-bottom: #{ms.spacing('padding-md')};
  --padding-start: #{ms.spacing('padding-2xl')};
  --padding-end: #{ms.spacing('padding-2xl')};
  --inner-padding-end: #{ms.spacing('padding-none')};
  padding: ms.spacing('padding-sm');
  width: 100%;
  margin-left: auto;
  transition: transform 0.2s ease-in-out;
  border-bottom: ms.border('thin') solid ms.color('border-base-default');
  cursor: pointer;
  @include ms.font('label-md-medium');

  &::part(native) {
    width: auto;
    margin-left: auto;
  }

  .arrow-icon {
    color: ms.color('icon-neutral-default');
    margin: 0;
    padding-left: ms.spacing('padding-md');
    font-size: 1rem;
  }

  &:hover {
    background: ms.color('surface-neutral-default-subtle-hover');
    --background-hover: none;
    --color-hover: #{ms.color('text-neutral-default-hover')};

    .arrow-icon {
      color: ms.color('icon-neutral-default-hover');
    }
  }
}

.sorter-list {
  padding: ms.spacing('padding-md');
  display: flex;
  gap: ms.spacing('gap-sm');
  flex-direction: column;

  &__title {
    color: ms.color('text-base-description');
    opacity: ms.opacity('7');
    margin: 0.25rem 0.5rem;
    @include ms.font('body-sm-medium');
  }

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  &-item {
    --background: none;
    --background-hover: none;
    --color: #{ms.color('text-base-body')};
    border-radius: ms.radius('md');
    --min-height: 0;
    --inner-padding-end: #{ms.spacing('padding-none')};
    position: relative;
    z-index: 2;
    pointer-events: auto;
    @include ms.font('label-md-medium');

    .item-icon {
      margin: 0;
      font-size: 1.125rem;
      color: ms.color('text-brand-default');
    }

    &::part(native) {
      padding: ms.spacing('padding-lg') ms.spacing('padding-2xl');
    }

    &:hover:not(.item-disabled) {
      background: ms.color('surface-neutral-default-subtle-hover');
      --background-hover: #{ms.color('surface-neutral-default-subtle-hover')};
      color: ms.color('text-neutral-default-hover');
    }

    &.ion-focused {
      box-shadow: ms.shadow('focus-brand');
      --background-focused: ms.color('surface-base-default');
    }

    &.selected {
      background: ms.color('surface-brand-default-subtle');
      color: ms.color('text-brand-default');
      --color-hover: #{ms.color('text-brand-default-hover')};

      &:hover {
        background: #{ms.color('surface-brand-default-subtle-hover')};
      }

      &.ion-focused {
        box-shadow: ms.shadow('focus-brand');
        --background-focused: ms.color('surface-brand-default-subtle');
      }
    }
  }
}
</style>
