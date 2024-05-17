<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <ion-checkbox
    class="checkbox"
    v-model="value"
    @ion-change="onChange($event.detail.checked)"
    :indeterminate="indeterminate"
    aria-label=""
  >
    {{ $msTranslate(label) || '' }}
  </ion-checkbox>
</template>

<script setup lang="ts">
import { IonCheckbox } from '@ionic/vue';
import { ref, watch, onUnmounted } from 'vue';

const props = defineProps<{
  modelValue?: boolean;
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
}>();

const emits = defineEmits<{
  (e: 'change', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const watchModelCancel = watch(
  () => props.modelValue,
  (newValue: boolean) => {
    value.value = newValue;
  },
);

const watchCheckedCancel = watch(
  () => props.checked,
  (newValue: boolean) => {
    value.value = newValue;
  },
);

const value = ref(props.modelValue);

onUnmounted(() => {
  watchModelCancel();
  watchCheckedCancel();
});

async function onChange(newValue: boolean): Promise<void> {
  value.value = newValue;
  emits('update:modelValue', newValue);
  emits('change', newValue);
}
</script>

<style lang="scss" scoped>
.checkbox {
  margin: 0;
  --size: 1.25rem;
  --checkbox-background-checked: var(--parsec-color-light-primary-600);
  --checkbox-border-checked: var(--parsec-color-light-primary-600);

  &::part(container) {
    border: 2px solid var(--parsec-color-light-secondary-light);
    border-radius: var(--parsec-radius-6);
    padding: 2px;
  }

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  &-checked::part(container) {
    border: 2px solid var(--parsec-color-light-primary-600);
  }

  // eslint-disable-next-line vue-scoped-css/no-unused-selector
  &-indeterminate::part(container) {
    border: 2px solid var(--parsec-color-light-primary-600);
  }
}
</style>
