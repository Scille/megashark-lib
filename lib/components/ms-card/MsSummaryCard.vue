<template>
  <div class="ms-summary-card">
    <ion-header class="ms-summary-card-header">
      <ion-text class="ms-summary-card-header__title title-h3">{{ $msTranslate(title) }}</ion-text>
    </ion-header>
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
      class="update-button button-small"
      fill="outline"
      @click="$emit('update')"
      v-show="!readOnly"
    >
      {{ $msTranslate(buttonLabel) }}
    </ion-button>
  </div>
</template>

<script setup lang="ts">
import { IonButton, IonText, IonHeader } from '@ionic/vue';
import { MsSummaryCardRowData } from '@lib/components/ms-card/types';
import MsSummaryCardItem from '@lib/components/ms-card/MsSummaryCardItem.vue';
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
  gap: 1rem;
  width: 100%;
  position: relative;

  &-header {
    display: flex;
    flex-direction: column;
    margin-bottom: 0.5rem;
    position: relative;
    z-index: 1;

    &__title {
      color: var(--parsec-color-light-secondary-text);
    }
  }

  &-row {
    display: flex;

    .summary-card-item {
      width: 50%;
    }
  }

  .update-button {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 2;

    @include ms.responsive-breakpoint('xs') {
      position: initial;
    }
  }
}
</style>
