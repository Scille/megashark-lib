<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="input-container">
    <span
      id="passwordLabel"
      class="form-label"
      :class="{ focused: hasFocus }"
      v-show="label"
      @click="setFocus()"
    >
      {{ $msTranslate(label) }}
    </span>
    <div
      class="input-content"
      :class="passwordIsInvalid ? 'input-invalid' : ''"
    >
      <ion-input
        class="form-input input"
        ref="input"
        aria-labelledby="passwordLabel"
        aria-hidden="false"
        :type="passwordVisible ? 'text' : 'password'"
        :autocomplete="autoCompleteInfo"
        @ion-input="onChange($event.target.value)"
        :value="modelValue"
        id="ms-password-input"
        :clear-on-edit="false"
        @ion-focus="hasFocus = true"
        @ion-blur="hasFocus = false"
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
import { ref, useTemplateRef } from 'vue';

const inputRef = useTemplateRef('input');
const passwordVisible = ref(false);
const hasFocus = ref(false);

const props = defineProps<{
  label?: Translatable;
  modelValue?: string;
  errorMessage?: Translatable;
  passwordIsInvalid?: boolean;
  autoCompleteInfo?: 'new-password' | 'current-password';
}>();

const emits = defineEmits<{
  (e: 'change', value: string): void;
  (e: 'onEnterKeyup', value: string): void;
  (e: 'update:modelValue', value: string): void;
}>();

defineExpose({
  setFocus,
});

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
