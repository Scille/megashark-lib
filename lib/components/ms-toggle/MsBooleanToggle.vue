<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="ms-boolean-toggle"
    tabindex="0"
    ref="toggle"
    @keyup.enter="$emit('update:modelValue', modelValue === Answer.Yes ? Answer.No : Answer.Yes)"
  >
    <ion-text
      type="button"
      class="button-view"
      :class="{ 'button-disabled': modelValue === Answer.Yes }"
      :disabled="modelValue === Answer.Yes"
      @click="$emit('update:modelValue', Answer.Yes)"
    >
      {{ yesLabel ? $msTranslate(yesLabel) : $msTranslate('lib.components.msBooleanToggle.yes') }}
    </ion-text>
    <ion-text
      type="button"
      class="button-view"
      :class="{ 'button-disabled': modelValue === Answer.No }"
      :disabled="modelValue === Answer.No"
      @click="$emit('update:modelValue', Answer.No)"
    >
      {{ noLabel ? $msTranslate(noLabel) : $msTranslate('lib.components.msBooleanToggle.no') }}
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import { Answer } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';
import { useTemplateRef } from 'vue';

const toggleRef = useTemplateRef<HTMLDivElement>('toggle');

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
@use '@lib/theme' as ms;

.ms-boolean-toggle {
  width: fit-content;
  display: flex;
  padding: ms.spacing('padding-sm');
  border-radius: ms.radius('5xl');
  border: ms.border('thin') solid ms.color('border-base-default');
  box-shadow: none;
  transition: box-shadow 150ms ease-in-out;

  &:focus-within {
    border: ms.border('thin') solid ms.color('border-brand-default');
    background: ms.color('surface-base-default');
    box-shadow: ms.shadow('focus-brand');
  }
}

.button-view {
  color: ms.color('text-neutral-default');
  padding: ms.spacing('padding-xs') ms.spacing('padding-4xl');
  border-radius: ms.radius('5xl');
  position: relative;
  z-index: 1;
  transition: background 150ms ease-in-out;
  user-select: none;

  @include ms.font('label-md-medium');

  &:not(.button-disabled) {
    cursor: pointer;
    position: relative;

    &:hover {
      background: ms.color('surface-base-page-secondary');
    }
  }
}

.button-disabled {
  background: ms.color('surface-brand-default-subtle');
  color: ms.color('text-brand-default');
}
</style>
