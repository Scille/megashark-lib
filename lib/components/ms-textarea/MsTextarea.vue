<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="input-container">
    <span
      id="label"
      class="form-label"
      :class="{ focused: hasFocus }"
      v-show="label"
      @click="setFocus()"
    >
      {{ $msTranslate(label) }}
    </span>

    <ion-textarea
      class="textarea form-input input-content"
      :class="{
        input: !$props.disabled,
      }"
      ref="textarea"
      :placeholder="$msTranslate(placeholder)"
      v-model="textValue"
      v-bind="$attrs"
      @ion-input="onChange($event.detail.value || '')"
      @ion-focus="hasFocus = true"
      @ion-blur="hasFocus = false"
      :disabled="$props.disabled"
      :rows="rows"
    />
    <span
      class="subtitles-sm count"
      :class="{
        'count-default': getCountColor() === 'low',
        'count-warn': getCountColor() === 'high',
        'count-full': getCountColor() === 'full',
      }"
      v-show="showCount && $attrs.maxlength"
    >
      {{ textValue.length }} / {{ $attrs.maxlength }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Translatable } from '@lib/services';
import { IonTextarea } from '@ionic/vue';
import { ref, watch, onUnmounted, useAttrs, useTemplateRef } from 'vue';

// Rows defines the height of the area in number of rows
// Autogrow is disabled by default, enable stretching the area horizontally and
// vertically depending on the max w/h set

enum TextCountLevel {
  low = 'low',
  high = 'high',
  full = 'full',
}

interface Props {
  label?: Translatable;
  placeholder?: Translatable;
  modelValue?: string;
  disabled?: boolean;
  rows?: number;
  showCount?: boolean;
}

const attrs = useAttrs();

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  placeholder: undefined,
  modelValue: undefined,
  disabled: false,
  rows: 10,
  showCount: undefined,
});

const textareaRef = useTemplateRef('textarea');
const textValue = ref(props.modelValue ?? '');
const hasFocus = ref(false);

const cancelWatch = watch(
  () => props.modelValue,
  (newValue) => {
    textValue.value = newValue ?? '';
  },
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

defineExpose({
  setFocus,
  selectText,
});

onUnmounted(() => {
  cancelWatch();
});

function setFocus(): void {
  setTimeout(() => {
    if (textareaRef.value && textareaRef.value.$el) {
      textareaRef.value.$el.setFocus();
    }
  }, 200);
}

function getCountColor(): TextCountLevel {
  if (!attrs.maxlength) {
    return TextCountLevel.low;
  }
  if (textValue.value.length === attrs.maxlength) {
    return TextCountLevel.full;
  }
  if (textValue.value.length / (attrs.maxlength as number) >= 0.9) {
    return TextCountLevel.high;
  }
  return TextCountLevel.low;
}

async function selectText(range?: [number, number]): Promise<void> {
  if (!textareaRef.value) return;
  const input = await textareaRef.value.$el.getInputElement();

  let begin = 0;
  let end = props.modelValue ? props.modelValue.length : 0;
  if (range) {
    begin = range[0];
    end = range[1];
  }
  input.setSelectionRange(begin, end);
}

async function onChange(value: string): Promise<void> {
  emits('update:modelValue', value);
  emits('change', value);
}
</script>

<style scoped lang="scss">
.textarea {
  border: 1px solid var(--parsec-color-light-secondary-disabled);
  border-radius: var(--parsec-radius-8);
  color: var(--parsec-color-light-primary-800);
  padding: 0.625rem 0.625rem 0;

  &:focus-within {
    border: 1px solid var(--parsec-color-light-primary-400);
    background: var(--parsec-color-light-secondary-white);
    outline: 0.25rem solid var(--parsec-color-light-outline);
  }

  &:hover {
    border: 1px solid var(--parsec-color-light-primary-300);
  }
}

.count {
  display: flex;
  margin-left: auto;

  &-default {
    color: var(--parsec-color-light-secondary-grey);
  }

  &-warn {
    color: var(--parsec-color-light-warning-500);
  }

  &-full {
    color: var(--parsec-color-light-danger-500);
  }
}
</style>
