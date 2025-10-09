<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="input-content ms-search-input"
    id="ms-search-input"
    @click="setFocus()"
  >
    <ion-icon
      :icon="search"
      slot="start"
      class="icon"
    />
    <ion-input
      class="form-input input"
      ref="input"
      :value="modelValue"
      :placeholder="$msTranslate(placeholder)"
      :clear-input="true"
      aria-hidden="false"
      @ion-input="onChange($event.target.value)"
      @ion-focus="hasFocus = true"
      @ion-blur="hasFocus = false"
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
import { useTemplateRef, ref } from 'vue';

const props = defineProps<{
  modelValue?: string;
  placeholder?: Translatable;
  debounce?: number;
}>();

const inputRef = useTemplateRef('input');
const hasFocus = ref(false);

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
  }, 100);
}

async function selectText(range?: [number, number]): Promise<void> {
  if (!inputRef.value) return;
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
  border: 1px solid var(--parsec-color-light-secondary-disabled);
  padding: 0.25rem 0 0.25rem 0.75rem;
  width: 100%;
  position: relative;
  display: flex;
  overflow: hidden;

  .icon {
    font-size: 1rem;
    margin: 0 0.25rem 0 0;
    opacity: 0.4;
  }
}
</style>
