<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="input-container">
    <span
      id="passwordLabel"
      class="form-label"
      v-show="label"
    >
      {{ $msTranslate(label) }}
    </span>
    <div
      class="input-content"
      :class="passwordIsInvalid ? 'input-invalid' : ''"
    >
      <ion-input
        class="form-input input"
        ref="inputRef"
        aria-labelledby="passwordLabel"
        :type="passwordVisible ? 'text' : 'password'"
        @ion-input="onChange($event.target.value)"
        :value="modelValue"
        id="ms-password-input"
        :clear-on-edit="false"
        @ion-focus="onFocus"
        @ion-blur="onFocusLost"
        @keyup.enter="onEnterPress()"
      />
      <div
        class="input-icon"
        @click="passwordVisible = !passwordVisible"
      >
        <ion-icon
          slot="icon-only"
          :icon="passwordVisible ? eyeOff : eye"
        />
      </div>
    </div>
    <span
      v-show="errorMessage"
      class="form-error form-helperText"
    >
      <ion-icon
        class="form-error-icon"
        :icon="warning"
      />
      {{ $msTranslate(errorMessage) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { Translatable } from '@lib/services';
import { IonIcon, IonInput } from '@ionic/vue';
import { eye, eyeOff, warning } from 'ionicons/icons';
import { ref } from 'vue';

const inputRef = ref();
const passwordVisible = ref(false);
const hasFocus = ref(false);

const props = defineProps<{
  label?: Translatable;
  modelValue?: string;
  errorMessage?: Translatable;
  passwordIsInvalid?: boolean;
}>();

const emits = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'onEnterKeyup', value: string): void;
  (e: 'update:modelValue', value: string): void;
}>();

defineExpose({
  setFocus,
});

async function onFocus(): Promise<void> {
  hasFocus.value = true;
}

async function onFocusLost(): Promise<void> {
  hasFocus.value = false;
}

function setFocus(): void {
  setTimeout(() => {
    if (inputRef.value && inputRef.value.$el) {
      inputRef.value.$el.setFocus();
    }
  }, 200);
}

async function onChange(value: any): Promise<void> {
  emits('update:modelValue', value);
  emits('change', value);
}

function onEnterPress(): void {
  if (props.modelValue && props.modelValue.length > 0) {
    emits('onEnterKeyup', props.modelValue);
  }
}
</script>

<style lang="scss" scoped></style>
