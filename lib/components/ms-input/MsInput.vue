<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="input-container">
    <span
      id="label"
      class="form-label"
      v-show="label"
    >
      {{ $msTranslate(label) }}
    </span>

    <div
      class="input-content ion-no-padding"
      :class="{
        'form-input-disabled': $props.disabled,
        'input-valid': validity === Validity.Valid,
        'input-invalid': validity === Validity.Invalid,
        'input-default': validity === Validity.Intermediate,
      }"
    >
      <ion-input
        class="form-input"
        :class="{
          input: !$props.disabled,
        }"
        ref="inputRef"
        :placeholder="$msTranslate(placeholder)"
        :value="modelValue"
        @ion-input="onChange($event.detail.value || '')"
        @ion-blur="validate(modelValue || '')"
        @keyup.enter="enterPressed($event.target.value)"
        :disabled="$props.disabled"
      />
    </div>
    <span
      v-show="errorMessage !== ''"
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
import { IValidator, Validity } from '@lib/common/validation';
import { Translatable } from '@lib/services/translation';
import { IonIcon, IonInput } from '@ionic/vue';
import { warning } from 'ionicons/icons';
import { Ref, ref } from 'vue';

const props = defineProps<{
  label?: Translatable;
  placeholder?: Translatable;
  modelValue?: string;
  disabled?: boolean;
  validator?: IValidator;
}>();

const inputRef = ref();
const errorMessage: Ref<Translatable> = ref('');
const validity = ref(Validity.Intermediate);

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
  (e: 'onEnterKeyup', value: string): void;
}>();

defineExpose({
  setFocus,
  selectText,
  validity,
  validate,
});

function setFocus(): void {
  setTimeout(() => {
    if (inputRef.value && inputRef.value.$el) {
      inputRef.value.$el.setFocus();
    }
  }, 200);
}

async function enterPressed(value: string): Promise<void> {
  await validate(value);
  if (!props.validator || validity.value === Validity.Valid) {
    emits('onEnterKeyup', value);
  }
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

async function validate(value: string): Promise<void> {
  if (props.validator) {
    const result = await props.validator(value);
    validity.value = result.validity;
    errorMessage.value = result.reason || '';
  }
}

async function onChange(value: string): Promise<void> {
  emits('update:modelValue', value);
  emits('change', value);
  if (validity.value === Validity.Invalid) {
    await validate(value);
  }
}
</script>

<style lang="scss" scoped></style>
