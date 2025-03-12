<template>
  <div class="example-block">
    <ion-label class="title-h2">{{ $msTranslate(title) }}</ion-label>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IonLabel } from '@ionic/vue';
import { Translatable } from '@lib/services';

defineProps<{ title: Translatable }>();
</script>

<style scoped lang="scss">
.example-block {
  // multiple lines for cross-browser compatibility
  width: 100%;
  width: -webkit-fill-available;
  width: stretch;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: var(--parsec-color-light-secondary-white);
  border-radius: var(--parsec-radius-12);
  box-shadow: var(--parsec-shadow-light);
  --inner-padding-end: 0;
  overflow: visible;

  ion-label.title-h2 {
    background: var(--parsec-color-light-secondary-medium);
    color: var(--parsec-color-light-secondary-text);
    width: 100%;
    border-radius: var(--parsec-radius-8) var(--parsec-radius-8) 0 0;
    margin: 0;
    padding: 0.75em 1rem;
  }
}
</style>
