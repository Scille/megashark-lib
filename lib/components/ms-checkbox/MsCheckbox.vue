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
      class="ms-checkbox-text"
    >
      <slot />
    </div>
  </label>
</template>

<script setup lang="ts">
import { computed, onMounted, useSlots, useTemplateRef, watch } from 'vue';

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
@use '@lib/theme' as ms;

.ms-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: calc(1.125 * ms.size('xs'));
  min-width: calc(1.125 * ms.size('xs'));
  height: calc(1.125 * ms.size('xs'));
  min-height: calc(1.125 * ms.size('xs'));
  border-radius: ms.radius('sm');
  border: ms.border('thin') solid ms.color('border-base-default');
  background: ms.color('surface-base-default');
  cursor: pointer;
  position: relative;
  place-content: center;
  box-shadow: ms.shadow('light');
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.12s ease,
    box-shadow 0.12s linear;

  &:active {
    transform: scale(0.9);
  }

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 1.5px;
    background: ms.color('surface-base-default');
    opacity: 0;
    border-radius: 1px;
    transform: rotate(0deg) scale(1);
    top: calc(50% - 0.5px);
    right: calc(50% - 1px);
    transition:
      transform 150ms ease,
      opacity 150ms ease;
  }

  &::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 1.25px;
    background: ms.color('surface-base-default');
    opacity: 0;
    border-radius: 1px;
    transform: rotate(0deg) scale(1);
    top: calc(50% - 0.5px);
    right: calc(50% - 4px);
    transition:
      transform 0.18s ease,
      opacity 0.12s ease;
  }

  &-text {
    @include ms.font('label-md-medium');
    user-select: none;
    cursor: pointer;
    color: ms.color('text-base-label');
  }
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5em;
  padding: ms.spacing('padding-sm') ms.spacing('padding-none');
  cursor: pointer;

  &-right {
    flex-direction: row;
  }

  &-left {
    justify-content: space-between;
    flex-direction: row-reverse;
  }

  &:hover .ms-checkbox {
    background: ms.color('surface-neutral-default-subtle-hover');

    &:checked,
    &[ms-indeterminate='true'] {
      background: ms.color('surface-brand-default-hover');
      border-color: ms.color('border-brand-default-hover');
    }

    &-text {
      color: ms.color('text-neutral-default-hover');
    }
  }

  &:focus-within .ms-checkbox {
    border-color: ms.color('border-brand-default');
    box-shadow: ms.shadow('focus-brand');
  }
}

.ms-checkbox:checked {
  background: ms.color('surface-brand-default');
  border-color: ms.color('border-brand-default');
}

.ms-checkbox:checked::before {
  transform: rotate(45deg) scale(1.25);
  opacity: 1;
  top: 9px;
  right: 8px;
}

.ms-checkbox:checked::after {
  transform: rotate(-50deg) scale(1.25);
  opacity: 1;
  top: 7px;
  right: 2.3px;
}

.ms-checkbox[ms-indeterminate='true'] {
  background: ms.color('surface-brand-default');
  border-color: ms.color('border-brand-default');

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
