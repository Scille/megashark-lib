<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-page class="small-display-modal">
    <div
      tabindex="0"
      ref="modal"
    >
      <div class="ms-small-display-modal">
        <ion-header class="ms-small-display-modal-header">
          <div
            class="ms-small-display-modal-header__title-container"
            v-if="title"
          >
            <ion-title class="ms-small-display-modal-header__title titles-h3">
              {{ $msTranslate(title) }}
            </ion-title>
          </div>
          <template v-if="subtitle">
            <ion-text class="ms-small-display-modal-header__text body-normal">
              {{ $msTranslate(subtitle) }}
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
import { MsModalResult } from '@lib/components/ms-modal/types';
import { Translatable } from '@lib/services';
import { IonButton, IonFooter, IonHeader, IonPage, IonText, IonTitle, modalController } from '@ionic/vue';
import { Ref, ref } from 'vue';

const modal: Ref<HTMLDivElement | null> = ref(null);
defineProps<{
  title?: Translatable;
  subtitle?: Translatable;
  yesText?: Translatable;
  noText?: Translatable;
  yesIsDangerous?: boolean;
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
.ms-small-display-modal {
  padding: 1.5rem;
}

.ms-small-display-modal-header {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;

  &__title {
    padding: 0;
    margin-bottom: 1rem;
    color: var(--parsec-color-light-primary-700);
    display: flex;
    align-items: center;
    max-width: 22rem;
    font-weight: 600;

    &-container {
      display: flex;
      align-items: center;
    }
  }

  &__text {
    color: var(--parsec-color-light-secondary-soft-text);
    font-weight: 400;
  }
}

.ms-small-display-modal-footer {
  position: relative;
  z-index: 1;

  > :first-child:not([hidden]) {
    margin-top: 2.5rem;
  }

  &::before {
    background: transparent;
  }

  &-buttons {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;

    &-cancel {
      display: flex;
      margin: auto;
      font-size: medium;
      color: var(--parsec-color-light-secondary-text);
    }

    &-confirm {
      display: flex;
      margin: auto;
      font-size: medium;
    }
  }
}
</style>
