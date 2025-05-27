<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item-divider class="toolbar ion-margin-bottom secondary">
    <div class="action-bar">
      <div class="action-bar-buttons-list">
        <ms-action-bar-button
          v-for="button in buttons"
          :key="button.icon"
          :button-label="button.label"
          :icon="button.icon"
          :image="button.image"
          :is-dropdown="button.isDropdown"
          @click="button.onClick"
        />
      </div>
      <slot />
    </div>
  </ion-item-divider>
</template>

<script setup lang="ts">
import { IonItemDivider } from '@ionic/vue';
import { MsActionBarButton } from '@lib/components';
import { Translatable } from '@lib/services';

defineProps<{
  buttons: {
    label: Translatable;
    icon?: string;
    image?: string;
    isDropdown?: boolean;
    onClick?: (event: MouseEvent) => Promise<void>;
  }[];
}>();
</script>

<style scoped lang="scss">
.toolbar {
  margin: 0 1.25rem;
  padding: 0 1em;
  min-height: 3rem;
  background-color: var(--parsec-color-light-secondary-background);
  border-bottom: 1px solid var(--parsec-color-light-secondary-medium);
  border-radius: var(--parsec-radius-12);
  width: auto;
  width: -webkit-fill-available;
  --inner-padding-end: 0;
  box-shadow: none;
}

.action-bar-buttons-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
