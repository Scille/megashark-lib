<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-page class="mobile-modal">
    <div
      tabindex="0"
      ref="modal"
    >
      <ion-buttons
        slot="end"
        class="closeBtn-container"
      >
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
      </ion-buttons>
      <div class="ms-mobile-modal">
        <ion-header class="ms-mobile-modal-header">
          <div
            class="ms-mobile-modal-header__title-container"
            v-if="title"
          >
            <ion-title class="ms-mobile-modal-header__title titles-h3">
              {{ $msTranslate(title) }}
            </ion-title>
          </div>
          <template v-if="subtitle">
            <ion-text class="ms-mobile-modal-header__text body-normal">
              {{ $msTranslate(subtitle) }}
            </ion-text>
          </template>
        </ion-header>
        <ion-footer class="ms-mobile-modal-footer">
          <div
            slot="primary"
            class="ms-mobile-modal-footer-buttons"
          >
            <ion-button
              class="ms-mobile-modal-footer-buttons-cancel"
              fill="clear"
              size="default"
              id="cancel-button"
              @click="cancel()"
            >
              {{ $msTranslate(noText || 'lib.components.msModal.cancelButtonLabel') }}
            </ion-button>
            <ion-button
              class="ms-mobile-modal-footer-buttons-confirm"
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
import { IonButton, IonButtons, IonFooter, IonHeader, IonIcon, IonPage, IonText, IonTitle, modalController } from '@ionic/vue';
import { close } from 'ionicons/icons';
import { Ref, ref } from 'vue';

const modal: Ref<HTMLDivElement | null> = ref(null);
defineProps<{
  title?: Translatable;
  subtitle?: Translatable;
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
.ms-mobile-modal {
  padding: 2rem;
}

.ms-mobile-modal-header {
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

.ms-mobile-modal-footer {
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
