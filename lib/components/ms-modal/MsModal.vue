<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-page
    class="modal"
    :class="theme"
  >
    <div
      @keyup.enter="$emit('onEnterKeyup')"
      tabindex="0"
      ref="modal"
    >
      <ion-button
        v-if="closeButton"
        v-show="closeButton.visible"
        @click="closeButton && closeButton.onClick ? closeButton.onClick() : cancel()"
        class="closeBtn"
      >
        <ion-icon
          :icon="close"
          class="closeBtn__icon"
        />
      </ion-button>
      <div class="ms-modal">
        <ion-header
          class="ms-modal-header"
          v-if="title"
        >
          <ion-text class="ms-modal-header__title title-h3">
            <ms-rich-text :text="title" />
          </ion-text>
          <template v-if="subtitle">
            <ion-text class="ms-modal-header__subtitle body-lg">
              <ms-rich-text :text="subtitle" />
            </ion-text>
          </template>
        </ion-header>
        <div
          class="ms-modal-content inner-content"
          :class="!title ? 'ms-modal-content--no-header' : ''"
        >
          <slot />
        </div>
        <ion-footer
          class="ms-modal-footer"
          v-if="cancelButton || confirmButton"
        >
          <ion-toolbar class="ms-modal-toolbar">
            <div class="ms-modal-footer-buttons">
              <ion-button
                v-if="cancelButton"
                fill="clear"
                size="default"
                id="cancel-button"
                @click="cancelButton && cancelButton.onClick ? cancelButton.onClick() : cancel()"
                :disabled="cancelButton.disabled"
              >
                {{ $msTranslate(cancelButton.label || 'lib.components.msModal.cancelButtonLabel') }}
              </ion-button>
              <ion-button
                v-if="confirmButton"
                fill="solid"
                size="default"
                id="next-button"
                type="submit"
                @click="confirmButton && confirmButton.onClick ? confirmButton.onClick() : confirm()"
                :disabled="confirmButton.disabled"
              >
                {{ $msTranslate(confirmButton.label || 'lib.components.msModal.confirmButtonLabel') }}
                <ms-spinner
                  class="confirm-button-spinner"
                  v-show="confirmButton.queryingSpinner"
                  :size="14"
                />
              </ion-button>
            </div>
          </ion-toolbar>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonFooter, IonHeader, IonIcon, IonPage, IonText, IonToolbar, modalController } from '@ionic/vue';
import { MsModalConfig, MsModalResult } from '@lib/components/ms-modal/types';
import { MsSpinner } from '@lib/components/ms-spinner';
import { MsRichText } from '@lib/components/ms-text';
import { close } from 'ionicons/icons';
import { onMounted, useTemplateRef } from 'vue';

const modalRef = useTemplateRef<HTMLDivElement>('modal');
defineProps<MsModalConfig>();
defineEmits<{
  (e: 'onEnterKeyup'): void;
}>();

onMounted(() => {
  // we should use onMounted lonely, but for weird reasons onMounted is triggered before the focus is working
  setTimeout(() => {
    modalRef.value?.focus();
  }, 100);
});

async function cancel(): Promise<boolean> {
  return modalController.dismiss(null, MsModalResult.Cancel);
}

async function confirm(): Promise<boolean> {
  return modalController.dismiss(null, MsModalResult.Confirm);
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.ms-modal {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  height: 100%;
  justify-content: start;

  @include ms.responsive-breakpoint('sm') {
    padding: 0;
  }
}

.ms-modal-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @include ms.responsive-breakpoint('sm') {
    padding: 1.5rem;
    margin-bottom: 0;
    gap: 0;
  }

  &:has(.ms-modal-header__subtitle) {
    @include ms.responsive-breakpoint('sm') {
      gap: 0.75rem;
    }
  }

  &__title {
    padding: 0;
    color: var(--parsec-color-light-secondary-text);
    display: flex;
    align-items: center;
    max-width: calc(100% - 2rem);

    .toolbar-title {
      text-overflow: clip !important;
    }

    &-container {
      display: flex;
      align-items: center;

      @include ms.responsive-breakpoint('sm') {
        padding: 1.5rem 2rem;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--parsec-color-light-secondary-medium);
      }
    }

    &-icon {
      color: var(--parsec-color-light-primary-600);
      margin-right: 4px;
    }
  }

  &__subtitle {
    color: var(--parsec-color-light-secondary-hard-grey);
  }
}

.ms-modal-content {
  --background: transparent;
  overflow: visible;
  display: flex;
  flex-direction: column;

  @include ms.responsive-breakpoint('sm') {
    padding: 0 1.5rem;
  }

  &--no-header {
    @include ms.responsive-breakpoint('sm') {
      margin-top: 1.5rem;
    }
  }
}

.ms-modal-footer {
  position: relative;
  z-index: 1;
  margin-top: auto;

  @include ms.responsive-breakpoint('sm') {
    padding: 1.5rem 1.5rem 3rem;
  }

  > :first-child:not([hidden]) {
    margin-top: 2rem;
  }

  &::before {
    background: transparent;
  }

  .ms-modal-toolbar {
    --padding: 0;
    --min-height: 0;
    --margin-inline: 0;

    @include ms.responsive-breakpoint('sm') {
      margin-top: 0 !important;
    }
  }

  &-buttons {
    display: flex;
    justify-content: end;
    gap: 1rem;
    margin: 0;

    ion-button {
      min-width: 4.5rem;
    }

    .confirm-button-spinner {
      margin-left: 0.5rem;
    }
  }
}
</style>
