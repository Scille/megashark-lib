<template>
  <div class="example-block">
    <ion-label class="example-block__title">{{ $msTranslate(title) }}</ion-label>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { IonLabel } from '@ionic/vue';
import { Translatable } from '@lib/services';

defineProps<{ title: Translatable }>();
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.example-block {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: start;
  background-color: ms.color('surface-base-default');
  border-radius: ms.radius('2xl');
  box-shadow: ms.shadow('light');
  --inner-padding-end: 0;
  overflow: visible;

  &__title {
    background: ms.color('surface-base-page-secondary');
    color: ms.color('text-base-body');
    width: 100%;
    border-radius: ms.radius('lg') ms.radius('lg') 0 0;
    margin: 0;
    padding: 0.75em ms.spacing('padding-3xl');
    @include ms.font('heading-h4');
  }
}
</style>
