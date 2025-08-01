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
          <div class="ms-modal-header__title-container">
            <ion-text class="ms-modal-header__title title-h3">
              {{ $msTranslate(title) }}
            </ion-text>
          </div>
          <template v-if="subtitle">
            <ion-text class="ms-modal-header__text body-lg">
              {{ $msTranslate(subtitle) }}
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
                :color="themeToButtonColor(cancelButton.theme)"
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
                :color="themeToButtonColor(confirmButton.theme)"
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
import { MsModalConfig, MsModalResult } from '@lib/components/ms-modal/types';
import { MsSpinner } from '@lib/components/ms-spinner';
import { MsReportTheme } from '@lib/components/ms-types';
import { IonButton, IonFooter, IonHeader, IonIcon, IonPage, IonText, IonToolbar, modalController } from '@ionic/vue';
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

function themeToButtonColor(_theme?: MsReportTheme): string | undefined {
  // Buttons do not correctly handle colors right now.
  // Once they do, remove the early return and uncomment the switch/case.

  return undefined;

  // switch (theme) {
  //   case MsReportTheme.Success:
  //     return 'success';
  //   case MsReportTheme.Warning:
  //     return 'warning';
  //   case MsReportTheme.Error:
  //     return 'error';
  //   case MsReportTheme.Info:
  //   default:
  //     return undefined;
  // }
}

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
  padding: 2rem;
  height: 100%;
  justify-content: start;

  @include ms.responsive-breakpoint('sm') {
    padding: 0;
  }
}

.ms-modal-header {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  @include ms.responsive-breakpoint('sm') {
    margin-bottom: 0;
  }

  &__title {
    padding: 0;
    color: var(--parsec-color-light-primary-800);
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

  &__text {
    color: var(--parsec-color-light-secondary-soft-text);
    margin-top: 0.625rem;

    @include ms.responsive-breakpoint('sm') {
      padding: 0 2rem;
      margin-top: 0;
    }

    @include ms.responsive-breakpoint('xs') {
      padding: 0 1.5rem;
    }
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

    .confirm-button-spinner {
      margin-left: 0.5rem;
    }
  }
}

.ms-info {
  --ms-modal-next-button-background-color: var(--parsec-color-light-primary-500);
  --ms-modal-next-button-background-hover-color: var(--parsec-color-light-primary-700);
}

.ms-success {
  --ms-modal-next-button-background-color: var(--parsec-color-light-success-500);
  --ms-modal-next-button-background-hover-color: var(--parsec-color-light-success-700);
}

.ms-warning {
  --ms-modal-next-button-background-color: var(--parsec-color-light-warning-500);
  --ms-modal-next-button-background-hover-color: var(--parsec-color-light-warning-700);
}

.ms-error {
  --ms-modal-next-button-background-color: var(--parsec-color-light-danger-500);
  --ms-modal-next-button-background-hover-color: var(--parsec-color-light-danger-700);
}

.ms-info,
.ms-success,
.ms-warning,
.ms-error {
  .ms-modal-header {
    &__title-icon {
      color: var(--ms-modal-title-text-color);
    }
  }

  .ms-modal-footer {
    margin-top: 0;

    &-buttons #next-button {
      --background: var(--ms-modal-next-button-background-color);
      --background-hover: var(--ms-modal-next-button-background-hover-color);
    }
  }
}
</style>
