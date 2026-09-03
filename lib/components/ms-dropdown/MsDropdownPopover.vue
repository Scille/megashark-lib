<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-list class="container dropdown-list">
    <ion-item
      class="option"
      :class="{ selected: defaultOptionKey === option.key, 'item-disabled': option.disabled }"
      button
      lines="none"
      v-for="option in options.set"
      :key="option.key"
      @click="onOptionClick(option)"
    >
      <ion-text class="option-text">
        <span class="option-text__label">
          {{ $msTranslate(option.label) }}
        </span>
        <span
          v-if="option.description"
          class="option-text__description"
        >
          {{ $msTranslate(option.description) }}
        </span>
      </ion-text>
      <ion-icon
        slot="end"
        :icon="checkmark"
        class="icon checked"
        :class="{ selected: defaultOptionKey === option.key }"
        v-if="defaultOptionKey === option.key"
      />
      <ms-information-tooltip
        v-if="option.disabled && option.disabledReason"
        :text="option.disabledReason"
        class="icon disabled-icon"
        slot="end"
      />
    </ion-item>
  </ion-list>
</template>

<script setup lang="ts">
import { IonIcon, IonItem, IonList, IonText, popoverController } from '@ionic/vue';
import { MsInformationTooltip } from '@lib/components/ms-tooltip';
import { MsOption, MsOptions } from '@lib/components/ms-types';
import { checkmark } from 'ionicons/icons';

defineProps<{
  defaultOptionKey?: any;
  options: MsOptions;
}>();

async function onOptionClick(option: MsOption): Promise<void> {
  await popoverController.dismiss({
    option: option,
  });
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.dropdown-list {
  padding: ms.spacing('padding-md');
  display: flex;
  flex-direction: column;
  gap: ms.spacing('gap-md');
}

// eslint-disable-next-line vue-scoped-css/no-unused-selector
.option {
  --background: none;
  --background-hover: none;
  --color: #{ms.color('text-base-description')};
  border-radius: ms.radius('md');
  --min-height: 0;
  --inner-padding-end: 0;
  position: relative;
  z-index: 2;
  pointer-events: auto;

  &:hover:not(.item-disabled) {
    background: ms.color('surface-neutral-default-subtle-hover');
    --background-hover: #{ms.color('surface-neutral-default-subtle-hover')};

    .option-text {
      &__label {
        color: ms.color('text-neutral-default-hover');
      }
    }
  }

  &::part(native) {
    padding: ms.spacing('padding-lg') ms.spacing('padding-2xl');
  }

  &-text {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: ms.spacing('gap-sm');

    &__label {
      color: ms.color('text-base-body');
      @include ms.font('label-md-medium');
    }

    &__description {
      @include ms.font('body-sm-regular');
    }
  }

  .icon {
    margin: 0;
    font-size: 1.125rem;
    padding-left: ms.spacing('padding-lg');
  }

  &.ion-focused {
    box-shadow: ms.shadow('focus-brand');
    --background-focused: ms.color('surface-base-default');
  }

  &.selected {
    background: ms.color('surface-brand-default-subtle');

    .option-text {
      &__label {
        color: ms.color('text-brand-default');
      }

      &__description {
        color: ms.color('text-base-description');
      }
    }

    .icon {
      color: ms.color('icon-brand-default');
      font-size: 1.25rem;
    }

    &:hover {
      background: ms.color('surface-brand-default-subtle-hover');
      --background-hover: #{ms.color('surface-brand-default-subtle-hover')};
      --background-hover-opacity: #{ms.opacity('10')};

      .option-text {
        &__label {
          color: ms.color('text-brand-default-hover');
        }
      }
    }
  }

  &.item-disabled {
    opacity: ms.opacity('10');
    pointer-events: none;

    .option-text {
      opacity: ms.opacity('5');

      &__label {
        --color: #{ms.color('text-base-body')};
      }

      &__description {
        --color: #{ms.color('text-base-description')};
      }
    }

    .disabled-icon {
      pointer-events: initial;
      opacity: ms.opacity('8');
      position: relative;
    }
  }
}
</style>
