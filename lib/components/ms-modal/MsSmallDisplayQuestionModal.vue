<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-page
    class="small-display-modal"
    :class="theme"
  >
    <div
      tabindex="0"
      ref="modal"
    >
      <div class="ms-small-display-modal">
        <ion-header
          class="ms-small-display-modal-header"
          v-if="title"
        >
          <ion-title class="ms-small-display-modal-header__title">
            <ms-rich-text :text="title" />
          </ion-title>
          <template v-if="subtitle">
            <ion-text class="ms-small-display-modal-header__text">
              <ms-rich-text :text="subtitle" />
            </ion-text>
          </template>
        </ion-header>
        <ion-footer class="ms-small-display-modal-footer">
          <div
            slot="primary"
            class="ms-small-display-modal-footer-buttons"
          >
            <ion-button
              class="ms-small-display-modal-footer-buttons-cancel"
              fill="clear"
              size="default"
              id="cancel-button"
              @click="cancel()"
            >
              {{ $msTranslate(noText || 'lib.components.msModal.cancelButtonLabel') }}
            </ion-button>
            <ion-button
              class="ms-small-display-modal-footer-buttons-confirm"
              fill="solid"
              size="default"
              id="confirm-button"
              type="submit"
              @click="onYes()"
            >
              {{ $msTranslate(yesText || 'lib.components.msModal.confirmButtonLabel') }}
            </ion-button>
          </div>
        </ion-footer>
      </div>
    </div>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonFooter, IonHeader, IonPage, IonText, IonTitle, modalController } from '@ionic/vue';
import { MsModalResult } from '@lib/components/ms-modal/types';
import { MsRichText } from '@lib/components/ms-text';
import { MsReportTheme } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';

defineProps<{
  title?: Translatable;
  subtitle?: Translatable;
  theme?: MsReportTheme;
  yesText?: Translatable;
  noText?: Translatable;
}>();

async function onYes(): Promise<boolean> {
  const res = await modalController.dismiss(null, MsModalResult.Confirm);
  return res;
}

async function cancel(): Promise<boolean> {
  return await modalController.dismiss(null, MsModalResult.Cancel);
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.ms-small-display-modal {
  padding: ms.spacing('padding-4xl');
}

.ms-small-display-modal-header {
  display: flex;
  flex-direction: column;
  padding-bottom: ms.spacing('padding-lg');

  &__title {
    @include ms.font('heading-h3');

    padding: 0;
    margin-bottom: ms.spacing('padding-3xl');
    color: ms.color('text-base-heading');
    @include ms.font('heading-h4');
    display: flex;
    align-items: center;
    max-width: 22rem;
  }

  &__text {
    color: ms.color('text-base-description');
    @include ms.font('body-md-regular');
  }
}

.ms-small-display-modal-footer {
  position: relative;
  z-index: 1;

  > :first-child:not([hidden]) {
    margin-top: ms.spacing('padding-6xl');
  }

  &-buttons {
    display: flex;
    justify-content: flex-end;
    gap: ms.spacing('gap-3xl');
    margin-top: ms.spacing('padding-4xl');

    #cancel-button {
      display: flex;
      --background: #{ms.color('surface-base-default')} !important;
      --color: #{ms.color('text-neutral-default')} !important;
      --background-hover: #{ms.color('surface-base-page-secondary')} !important;
    }

    #confirm-button {
      display: flex;
      --background: var(--ms-modal-button-background-color);
      --background-hover: var(--ms-modal-button-background-hover-color);
    }
  }
}
</style>
