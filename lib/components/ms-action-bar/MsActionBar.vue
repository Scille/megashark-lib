<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-item-divider class="toolbar ion-margin-bottom secondary">
    <div class="action-bar">
      <slot />
    </div>
  </ion-item-divider>
</template>

<script setup lang="ts">
import { IonItemDivider } from '@ionic/vue';
</script>

<style scoped lang="scss">
.toolbar {
  margin: 0 1.25rem;
  padding: 0.75em 1em;
  background-color: var(--parsec-color-light-secondary-background);
  border-bottom: 1px solid var(--parsec-color-light-secondary-medium);
  border-radius: var(--parsec-radius-12);
  // multiple lines for cross-browser compatibility
  width: 100%;
  width: -webkit-fill-available;
  width: -moz-available;
  width: stretch;
  --inner-padding-end: 0;
  box-shadow: none;
}
</style>
