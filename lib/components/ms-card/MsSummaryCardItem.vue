<template>
  <div class="ms-summary-card-item">
    <p class="ms-summary-card-item__label form-label">{{ $msTranslate(label) }}</p>
    <p class="ms-summary-card-item__text subtitles-normal">{{ $msTranslate(text) }}</p>
    <p
      v-show="error"
      class="form-error body"
    >
      {{ $msTranslate(error) }}
    </p>
    <div
      v-if="secondLine"
      class="ms-summary-card-item__text subtitles-normal"
    >
      {{ $msTranslate(secondLine.text) }}
      <p
        v-show="secondLine.error"
        class="form-error body"
      >
        {{ $msTranslate(secondLine.error) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MsSummaryCardItemData } from '@lib/components/ms-card/types';

defineProps<MsSummaryCardItemData>();
</script>

<style scoped lang="scss">
.ms-summary-card-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;

  p {
    margin: 0;
    padding: 0;
  }

  &__label {
    color: var(--parsec-color-light-secondary-soft-grey);
  }

  &__text {
    color: var(--parsec-color-light-secondary-text);
    display: block;
    gap: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
