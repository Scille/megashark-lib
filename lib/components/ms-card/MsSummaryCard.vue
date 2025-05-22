<template>
  <div class="ms-summary-card">
    <ion-title class="ms-summary-card-title title-h3">{{ $msTranslate(title) }}</ion-title>
    <template
      v-for="(row, index) in rows"
      :key="`ms-summary-card-row${index}`"
    >
      <div
        class="ms-summary-card-row"
        v-if="row.secondItem"
      >
        <ms-summary-card-item
          :label="row.item.label"
          :text="row.item.text"
          :error="row.item.error"
          :second-line="row.item.secondLine"
          class="summary-card-item"
        />
        <ms-summary-card-item
          :label="row.secondItem.label"
          :text="row.secondItem.text"
          :error="row.secondItem.error"
          :second-line="row.secondItem.secondLine"
          class="summary-card-item"
        />
      </div>
      <ms-summary-card-item
        v-else
        :label="row.item.label"
        :text="row.item.text"
        :error="row.item.error"
        :second-line="row.item.secondLine"
      />
    </template>

    <ion-button
      class="update-button"
      fill="clear"
      @click="$emit('update')"
      v-show="!readOnly"
    >
      <ion-icon
        :icon="pencil"
        class="update-button__icon"
      />
      {{ $msTranslate(buttonLabel) }}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon, IonTitle } from '@ionic/vue';
import { MsSummaryCardRowData } from '@lib/components/ms-card/types';
import MsSummaryCardItem from '@lib/components/ms-card/MsSummaryCardItem.vue';
import { pencil } from 'ionicons/icons';
import { Translatable } from '@lib/services';

withDefaults(
  defineProps<{
    title: Translatable;
    buttonLabel?: Translatable;
    rows: MsSummaryCardRowData[];
    readOnly?: boolean;
  }>(),
  {
    buttonLabel: 'lib.components.msSummaryCard.updateButtonLabel',
  },
);

defineEmits<{
  (e: 'update'): void;
}>();
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.ms-summary-card {
  display: flex;
  flex-direction: column;
  background: var(--parsec-color-light-secondary-background);
  border: 1px solid var(--parsec-color-light-secondary-medium);
  border-radius: var(--parsec-radius-8);
  gap: 1rem;
  width: 100%;
  position: relative;
  padding: 1.5rem;

  &-title {
    color: var(--parsec-color-light-secondary-text);
    margin: 0;
    padding: 0;
  }

  &-row {
    display: flex;

    .summary-card-item {
      width: 50%;
    }
  }

  .update-button {
    position: absolute;
    right: 1rem;
    top: 1rem;

    @include ms.responsive-breakpoint('xs') {
      position: initial;
    }

    &__icon {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
