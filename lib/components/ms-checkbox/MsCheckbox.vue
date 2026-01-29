<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <label
    class="checkbox-container"
    :for="elName"
    :class="{
      'checkbox-container-right': computedLabelPosition === 'right',
      'checkbox-container-left': computedLabelPosition === 'left',
    }"
  >
    <input
      @change="onChange"
      class="ms-checkbox"
      type="checkbox"
      ref="checkboxRef"
      :name="elName"
      :id="elName"
      :ms-indeterminate="indeterminate"
      :checked="checked"
    />
    <div
      v-if="$slots.default"
      class="button-medium ms-checkbox-text"
    >
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { watch, useTemplateRef, computed, onMounted, useSlots } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
    labelPosition?: 'left' | 'right';
  }>(),
  {
    modelValue: undefined,
    checked: undefined,
    indeterminate: undefined,
    labelPosition: undefined,
  },
);

const slots = useSlots();

const emits = defineEmits<{
  (e: 'change', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const elName = `ms-checkbox-${window.crypto.randomUUID()}`;

const checkbox = useTemplateRef<HTMLInputElement>('checkboxRef');

const computedLabelPosition = computed(() => {
  if (props.labelPosition !== undefined) {
    return props.labelPosition;
  }
  if (slots.default) {
    return 'right';
  }
  return undefined;
});

const checked = computed(() => {
  if (props.modelValue !== undefined) {
    return props.modelValue;
  }
  if (props.checked !== undefined) {
    return props.checked;
  }
  return false;
});

onMounted(() => {
  if (checkbox.value) {
    checkbox.value.indeterminate = !!props.indeterminate;
  }
});

watch(
  () => props.indeterminate,
  () => {
    if (checkbox.value) {
      checkbox.value.indeterminate = !!props.indeterminate;
    }
  },
);

async function onChange(_event: Event): Promise<void> {
  const value = checkbox.value?.checked ?? false;
  emits('update:modelValue', value);
  emits('change', value);
}
</script>

<style lang="scss" scoped>
.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: 0.25rem 0;
  cursor: pointer;

  &-right {
    flex-direction: row;
  }

  &-left {
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  &:hover {
    .ms-checkbox {
      outline: 1px solid var(--parsec-color-light-primary-300);
      outline-offset: 2px;
    }
  }
}

.ms-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 20px;
  min-width: 20px;
  height: 20px;
  min-height: 20px;
  border-radius: var(--parsec-radius-6);
  border: 2px solid var(--parsec-color-light-secondary-light);
  background: var(--parsec-color-light-secondary-white);
  cursor: pointer;
  position: relative;
  display: grid;
  place-content: center;
  outline: 1px solid transparent;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.12s ease,
    outline 0.12s linear;

  &:active {
    transform: scale(0.9);
  }

  &::before {
    content: '';
    position: absolute;
    width: 6px;
    height: 2px;
    background: var(--parsec-color-light-secondary-white);
    opacity: 0;
    border-radius: 1px;
    transform: rotate(0deg) scale(1);
    top: calc(50% - 1px);
    right: calc(50% - 0.5px);
    transition:
      transform 0.18s ease,
      opacity 0.18s ease;
  }

  &::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 2px;
    background: var(--parsec-color-light-secondary-white);
    opacity: 0;
    border-radius: 1px;
    transform: rotate(0deg) scale(1);
    top: calc(50% - 1px);
    right: calc(50% - 6px);
    transition:
      transform 0.18s ease,
      opacity 0.12s ease;
  }

  &-text {
    user-select: none;
    cursor: pointer;
    color: var(--parsec-color-light-secondary-soft-text);
  }
}

.ms-checkbox:checked {
  background: var(--parsec-color-light-primary-600);
  border-color: var(--parsec-color-light-primary-600);
}

.ms-checkbox:checked::before {
  transform: rotate(45deg) scale(1);
  opacity: 1;
  top: 9px;
  right: 8px;
}

.ms-checkbox:checked::after {
  transform: rotate(-50deg) scale(1);
  opacity: 1;
  top: 7px;
  right: 1.5px;
}

.ms-checkbox[ms-indeterminate='true'] {
  background: var(--parsec-color-light-primary-600);
  border-color: var(--parsec-color-light-primary-600);

  &::before {
    opacity: 1;
    border-radius: 1px;
    transition: opacity 0.12s ease;
  }

  &::after {
    opacity: 1;
    transition: opacity 0.12s ease;
  }
}
</style>
