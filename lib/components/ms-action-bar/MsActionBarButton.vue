<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-button
    class="ms-action-bar-button button-medium"
    size="default"
    ref="actionBarButton"
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
import { IonButton, IonIcon } from '@ionic/vue';
import { MsImage } from '@lib/components/ms-image';
import { Translatable } from '@lib/services';
import { chevronDown } from 'ionicons/icons';
import { useTemplateRef } from 'vue';

const actionBarButtonRef = useTemplateRef<InstanceType<typeof IonButton>>('actionBarButton');

defineProps<{
  buttonLabel?: Translatable;
  icon?: string;
  image?: string;
  isDropdown?: boolean;
}>();

defineExpose({ getWidth });

function getWidth(): number {
  return actionBarButtonRef.value?.$el.getBoundingClientRect().width ?? 0;
}
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.ms-action-bar-button {
  --background: none !important;
  --background-hover: none !important;
  color: ms.color('text-neutral-default');
  --fill-color: #{ms.color('icon-neutral-default')};
  margin-inline: 0px;
  margin-top: 0px;
  margin-bottom: 0px;
  --padding-top: 0.25rem;
  --padding-end: 0.5rem;
  --padding-bottom: 0.25rem;
  --padding-start: 0.5rem;
  border-radius: var(--parsec-radius-8);
  transition: background ease-in-out 100ms;

  &:hover {
    color: ms.color('text-neutral-default-hover');
    --fill-color: #{ms.color('icon-neutral-default-hover')};
    background: ms.color('surface-base-page-secondary');
  }

  &-icon__left {
    margin-left: 0em;
    margin-right: 0.375rem;
    width: 1.125rem;
    height: 1.125rem;
    font-size: 1.125rem;
  }

  &-icon__right {
    margin-inline: 0em;
    margin-left: 0.375rem;
    font-size: 1rem;
  }
}
</style>
