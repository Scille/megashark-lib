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
      :class="inputClasses"
    >
      <ion-input
        class="form-input"
        :class="{
          input: !$props.disabled,
        }"
        mode="ios"
        ref="inputRef"
        :placeholder="$msTranslate(placeholder)"
        :value="modelValue"
        @ion-input="onChange($event.detail.value || '')"
        @ion-blur="onFocusLost"
        @keyup.enter="enterPressed($event.target.value)"
        :disabled="$props.disabled"
        v-bind="$attrs"
      />
    </div>
    <span
      v-show="errorMessage !== '' && lostFocus && modelValue"
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
import { Translatable } from '@lib/services';
import { IonIcon, IonInput } from '@ionic/vue';
import { warning } from 'ionicons/icons';
import { Ref, ref, computed } from 'vue';

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
const lostFocus = ref(false);

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

const inputClasses = computed(() => {
  const invalid = validity.value === Validity.Invalid && Boolean(lostFocus.value) && Boolean(props.modelValue);
  return {
    'form-input-disabled': props.disabled,
    'input-valid': validity.value === Validity.Valid,
    'input-invalid': invalid,
    'input-default': (validity.value === Validity.Intermediate || validity.value === Validity.Invalid) && !invalid,
  };
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

async function onFocusLost(): Promise<void> {
  lostFocus.value = true;
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
  if (!value) {
    lostFocus.value = false;
  }
  await validate(value);
}
</script>

<style lang="scss" scoped></style>
