<template>
  <ion-page class="dropdown">
    <div class="dropdown-top">
      <ion-text
        class="dropdown-title"
        v-if="title"
      >
        {{ $msTranslate(title) }}
      </ion-text>
      <ion-button
        slot="icon-only"
        @click="cancel()"
        class="closeBtn"
      >
        <ion-icon
          :icon="close"
          class="closeBtn__icon"
        />
      </ion-button>
    </div>
    <ion-list>
      <ion-item
        class="option"
        :class="{ selected: selectedOption?.key === option.key, 'item-disabled': option.disabled }"
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
          :class="{ selected: selectedOption?.key === option.key }"
          v-if="selectedOption?.key === option.key"
        />
        <ms-information-tooltip
          v-if="option.disabled && option.disabledReason"
          :text="option.disabledReason"
          class="icon disabled-icon"
          slot="end"
        />
      </ion-item>
    </ion-list>
    <div class="buttons">
      <ion-button
        class="buttons-cancel"
        size="default"
        @click="cancel"
        fill="clear"
      >
        {{ $msTranslate(cancelText || 'lib.components.msModal.cancelButtonLabel') }}
      </ion-button>
      <ion-button
        @click="confirm"
        size="default"
        fill="solid"
        :disabled="selectedOption === undefined"
      >
        {{ $msTranslate(validateText || 'lib.components.msModal.confirmButtonLabel') }}
      </ion-button>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonList, IonPage, IonText, modalController } from '@ionic/vue';
import { MsInformationTooltip } from '@lib/components/ms-tooltip';
import { MsOption, MsOptions } from '@lib/components/ms-types';
import { checkmark, close } from 'ionicons/icons';
import { ref } from 'vue';

const props = defineProps<{
  title?: string;
  validateText?: string;
  cancelText?: string;
  options: MsOptions;
  defaultOptionKey?: any;
}>();

const selectedOption = ref<MsOption | undefined>(
  props.defaultOptionKey !== undefined ? props.options.get(props.defaultOptionKey) : undefined,
);

async function onOptionClick(option: MsOption): Promise<void> {
  selectedOption.value = option;
}

async function confirm(): Promise<void> {
  await modalController.dismiss({ option: selectedOption.value });
}

async function cancel(): Promise<void> {
  await modalController.dismiss();
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.closeBtn {
  top: ms.spacing('padding-3xl');
  right: ms.spacing('padding-3xl');
}

.dropdown {
  padding-top: ms.spacing('padding-3xl');

  &-title {
    display: flex;
    padding-left: ms.spacing('padding-4xl');
    padding-top: ms.spacing('padding-lg');
    @include ms.font('heading-h4');
  }

  &-top {
    height: 2.2rem;
  }
}

.option {
  --background: none;
  width: 100%;

  &::part(native) {
    padding: ms.spacing('padding-md') ms.spacing('padding-lg');
  }

  &::part(inner) {
    padding: 0;
  }

  &-text {
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: ms.spacing('padding-lg');

    &__label {
      color: ms.color('text-base-body');
      @include ms.font('label-lg-medium');
    }

    &__description {
      color: ms.color('text-base-description');
      @include ms.font('body-md-regular');
    }
  }

  &:first-of-type {
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      outline: ms.border('thin') solid ms.color('border-neutral-default-subtle');
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    outline: ms.border('thin') solid ms.color('border-neutral-default-subtle');
  }

  &:hover:not(.item-disabled) {
    background: ms.color('surface-neutral-default-subtle-hover');

    .option-text {
      &__label {
        color: ms.color('text-neutral-default-hover');
      }
    }
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

  .icon {
    margin: 0;
    padding: ms.spacing('padding-none') ms.spacing('padding-lg');
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

.buttons {
  display: flex;
  justify-content: end;
  gap: ms.spacing('gap-3xl');
  padding: ms.spacing('padding-3xl') ms.spacing('padding-3xl') ms.spacing('padding-5xl');

  &-cancel {
    color: ms.color('text-base-body');
  }
}
</style>
