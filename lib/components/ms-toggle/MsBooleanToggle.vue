<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="ms-boolean-toggle"
    tabindex="0"
    ref="toggleRef"
    @keyup.enter="$emit('update:modelValue', modelValue === Answer.Yes ? Answer.No : Answer.Yes)"
  >
    <ion-text
      type="button"
      class="button-view button-medium"
      :class="{ 'button-disabled': modelValue === Answer.Yes }"
      :disabled="modelValue === Answer.Yes"
      @click="$emit('update:modelValue', Answer.Yes)"
    >
      {{ yesLabel ? $msTranslate(yesLabel) : $msTranslate('lib.components.msBooleanToggle.yes') }}
    </ion-text>
    <ion-text
      type="button"
      class="button-view button-medium"
      :class="{ 'button-disabled': modelValue === Answer.No }"
      :disabled="modelValue === Answer.No"
      @click="$emit('update:modelValue', Answer.No)"
    >
      {{ noLabel ? $msTranslate(noLabel) : $msTranslate('lib.components.msBooleanToggle.no') }}
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { Answer } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';
import { IonText } from '@ionic/vue';
import { ref } from 'vue';

const toggleRef = ref<HTMLDivElement>();

defineProps<{
  modelValue: Answer;
  yesLabel?: Translatable;
  noLabel?: Translatable;
}>();

defineEmits<{
  (e: 'update:modelValue', value: Answer): void;
}>();

defineExpose({
  setFocus,
});

function setFocus(): void {
  setTimeout(() => {
    if (toggleRef.value) {
      toggleRef.value.focus();
    }
  }, 200);
}
</script>

<style scoped lang="scss">
.ms-boolean-toggle {
  width: fit-content;
  display: flex;
  padding: 0.25rem;
  border-radius: 1.5rem;
  border: 1px solid var(--parsec-color-light-secondary-disabled);
  &:focus-within {
    border: 1px solid var(--parsec-color-light-primary-400);
    background: var(--parsec-color-light-secondary-white);
    outline: 0.25rem solid var(--parsec-color-light-outline);
  }
}

.button-view {
  color: var(--parsec-color-light-secondary-grey);
  padding: 0.125rem 1.5rem;
  border-radius: 1.5rem;
  position: relative;
  z-index: 1;
  transition: background 150ms ease-in-out;
  user-select: none;

  &:not(.button-disabled) {
    cursor: pointer;
    position: relative;

    &:hover {
      background: var(--parsec-color-light-secondary-premiere);
    }
  }
}

.button-disabled {
  background: var(--parsec-color-light-primary-50);
  color: var(--parsec-color-light-primary-600);
}
</style>
