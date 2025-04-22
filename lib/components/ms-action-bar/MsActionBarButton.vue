<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-button
    class="ms-action-bar-button button-medium"
    size="default"
  >
    <ion-icon
      class="ms-action-bar-button-icon__left"
      v-if="icon"
      slot="start"
      :icon="icon"
    />
    <ms-image
      class="ms-action-bar-button-icon__left"
      v-if="!icon && image"
      :image="image"
    />
    {{ $msTranslate(buttonLabel) }}
    <ion-icon
      class="ms-action-bar-button-icon__right"
      v-if="isDropdown"
      slot="end"
      :icon="chevronDown"
    />
  </ion-button>
</template>

<script setup lang="ts">
import { MsImage } from '@lib/components/ms-image';
import { Translatable } from '@lib/services';
import { IonButton, IonIcon } from '@ionic/vue';
import { chevronDown } from 'ionicons/icons';

defineProps<{
  buttonLabel?: Translatable;
  icon?: string;
  image?: string;
  isDropdown?: boolean;
}>();
</script>

<style lang="scss" scoped>
.ms-action-bar-button {
  --background: none !important;
  --background-hover: none !important;
  margin-inline: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  --padding-top: 0.25rem;
  --padding-end: 0.5rem;
  --padding-bottom: 0.25rem;
  --padding-start: 0.5rem;
  color: var(--parsec-color-light-secondary-grey);
  --fill-color: var(--parsec-color-light-secondary-grey);

  &:hover {
    color: var(--parsec-color-light-primary-600);
    --fill-color: var(--parsec-color-light-primary-600);
  }

  &-icon__left {
    margin-inline: 0em;
    margin-right: 0.375rem;
    width: 1.25rem;
  }

  &-icon__right {
    margin-inline: 0em;
    margin-left: 0.375rem;
    font-size: 1rem;
  }
}
</style>
