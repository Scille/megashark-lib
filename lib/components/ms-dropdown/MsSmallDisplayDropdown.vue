<template>
  <ion-page class="dropdown">
    <div class="dropdown-top">
      <ion-text
        class="dropdown-title title-h3"
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
        class="option body"
        :class="{ selected: selectedOption?.key === option.key, 'item-disabled': option.disabled }"
        button
        lines="none"
        v-for="option in options.set"
        :key="option.key"
        @click="onOptionClick(option)"
      >
        <ion-text class="option-text">
          <span class="option-text__label body">
            {{ $msTranslate(option.label) }}
          </span>
          <span
            v-if="option.description"
            class="option-text__description body-sm"
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
        :fill="'clear'"
      >
        {{ $msTranslate(cancelText || 'lib.components.msModal.cancelButtonLabel') }}
      </ion-button>
      <ion-button
        @click="confirm"
        size="default"
        :fill="'solid'"
        :disabled="selectedOption === undefined"
      >
        {{ $msTranslate(validateText || 'lib.components.msModal.confirmButtonLabel') }}
      </ion-button>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonItem, IonList, IonPage, IonText, modalController } from '@ionic/vue';
import { MsOption, MsOptions } from '@lib/components/ms-types';
import { MsInformationTooltip } from '@lib/components/ms-tooltip';
import { ref } from 'vue';
import { checkmark, close } from 'ionicons/icons';

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
.closeBtn {
  top: 1rem;
  right: 1rem;
}

.dropdown {
  padding-top: 1rem;

  &-title {
    display: flex;
    padding-left: 1.5rem;
    padding-top: 0.5rem;
  }

  &-top {
    height: 2.2rem;
  }
}

.option {
  --background: none;
  width: 100%;

  &::part(native) {
    padding: 0 1rem;
  }

  &-text {
    margin: 0;
    display: flex;
    flex-direction: column;
    padding: 0.5rem;

    &__label {
      color: var(--parsec-color-light-secondary-text);
    }

    &__description {
      color: var(--parsec-color-light-secondary-grey);
    }
  }

  &:first-of-type {
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      outline: 1px solid var(--parsec-color-light-secondary-medium);
    }
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    outline: 1px solid var(--parsec-color-light-secondary-medium);
  }

  &:hover:not(.item-disabled) {
    background: var(--parsec-color-light-secondary-background);
  }

  &.selected {
    background: var(--parsec-color-light-secondary-background);

    .option-text {
      &__label {
        color: var(--parsec-color-light-primary-700);
      }

      &__description {
        color: var(--parsec-color-light-secondary-grey);
      }
    }

    .icon {
      color: var(--parsec-color-light-primary-700);
    }
  }

  .icon {
    margin: 0;
    margin-left: 1em;
  }

  &.item-disabled {
    opacity: 1;
    pointer-events: none;

    .option-text {
      opacity: 0.5;

      &__label {
        --color: var(--parsec-color-light-secondary-text);
      }

      &__description {
        --color: var(--parsec-color-light-secondary-grey);
      }
    }

    .disabled-icon {
      pointer-events: initial;
      opacity: 0.8;
      position: relative;
    }
  }
}

.buttons {
  display: flex;
  justify-content: end;
  gap: 1rem;
  padding: 1rem 1rem 2rem;

  &-cancel {
    color: var(--parsec-color-light-secondary-text);
  }
}
</style>
