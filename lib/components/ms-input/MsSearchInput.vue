<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="input-content ms-search-input"
    id="ms-search-input"
  >
    <ion-icon
      :icon="search"
      slot="start"
      class="icon"
    />
    <ion-input
      class="form-input input"
      ref="inputRef"
      :value="modelValue"
      :placeholder="$msTranslate(placeholder)"
      :clear-input="true"
      @ion-input="onChange($event.target.value)"
      @keyup.enter="onEnterPress()"
      mode="ios"
      :debounce="debounce"
    />
    <!-- mode=ios to change the clear icon style -->
  </div>
</template>

<script setup lang="ts">
import { Translatable } from '@lib/services';
import { IonIcon, IonInput } from '@ionic/vue';
import { search } from 'ionicons/icons';
import { ref } from 'vue';

const props = defineProps<{
  modelValue?: string;
  placeholder?: Translatable;
  debounce?: number;
}>();

const inputRef = ref();

const emits = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'enter'): void;
  (e: 'update:modelValue', value: string): void;
}>();

defineExpose({
  setFocus,
  selectText,
});

function setFocus(): void {
  setTimeout(() => {
    if (inputRef.value && inputRef.value.$el) {
      inputRef.value.$el.setFocus();
    }
  }, 200);
}

async function selectText(range?: [number, number]): Promise<void> {
  const input = await inputRef.value.$el.getInputElement();

  let begin = 0;
  let end = props.modelValue ? props.modelValue.length : 0;
  if (range) {
    begin = range[0];
    end = range[1];
  }
  input.setSelectionRange(begin, end);
}

function onEnterPress(): void {
  if (props.modelValue && props.modelValue.length > 0) {
    emits('enter');
  }
}

function onChange(value: any): void {
  emits('update:modelValue', value);
  emits('change', value);
}
</script>

<style scoped lang="scss">
.ms-search-input {
  border: 1px solid var(--parsec-color-light-secondary-light);
  padding: 0.25rem 0 0.25rem 1rem;
  width: 100%;

  .input {
    --placeholder-color: var(--parsec-color-light-secondary-light);
    --placeholder-opacity: 0.8;
  }

  .icon {
    font-size: 1.125em;
    margin: 0 0.5rem 0 0;
    color: var(--parsec-color-light-secondary-light);
  }
}
</style>
