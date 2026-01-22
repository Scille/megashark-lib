<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div>
    <input
      class="ms-checkbox"
      type="checkbox"
      ref="checkboxRef"
      :ms-indeterminate="indeterminate"
      :checked="checked"
      @change="onChange"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { watch, useTemplateRef, computed, onMounted } from 'vue';

const props = withDefaults(
  defineProps<{
    modelValue?: boolean;
    checked?: boolean;
    indeterminate?: boolean;
  }>(),
  {
    modelValue: undefined,
    checked: undefined,
    indeterminate: undefined,
  },
);

const emits = defineEmits<{
  (e: 'change', value: boolean): void;
  (e: 'update:modelValue', value: boolean): void;
}>();

const checkbox = useTemplateRef<HTMLInputElement>('checkboxRef');

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

watch(() => props.indeterminate, () => {
  if (checkbox.value) {
    checkbox.value.indeterminate = !!props.indeterminate;
  }
});

async function onChange(_event: Event): Promise<void> {
  const value = checkbox.value?.checked ?? false;
  emits('update:modelValue', value);
  emits('change', value);
}
</script>

<style lang="scss" scoped>
.ms-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid #c7c9d1;
  background: #fff;
  cursor: pointer;
  position: relative;
}

/* Checked */
.ms-checkbox:checked {
  background: #1a73e8;
  border-color: #1a73e8;
}

.ms-checkbox:checked::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* Indeterminate */
.ms-checkbox:indeterminate {
  background: #1a73e8;
  border-color: #1a73e8;
}

.ms-checkbox:indeterminate::after {
  content: "";
  position: absolute;
  top: 9px;
  left: 4px;
  width: 12px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
}

// .checkbox {
//   margin: 0;
//   --size: 1.25rem;
//   --checkbox-background-checked: var(--parsec-color-light-primary-600);
//   --checkbox-border-checked: var(--parsec-color-light-primary-600);

//   &::part(container) {
//     border: 2px solid var(--parsec-color-light-secondary-light);
//     border-radius: var(--parsec-radius-6);
//     padding: 2px;
//   }

//   // eslint-disable-next-line vue-scoped-css/no-unused-selector
//   &-checked::part(container) {
//     border: 2px solid var(--parsec-color-light-primary-600);
//   }

//   // eslint-disable-next-line vue-scoped-css/no-unused-selector
//   &-indeterminate::part(container) {
//     border: 2px solid var(--parsec-color-light-primary-600);
//   }
// }
</style>
