<template>
  <div class="code-input">
    <div class="code-input-list">
      <ion-input
        v-for="i in codeLength"
        :key="`${i}`"
        aria-hidden="false"
        ref="inputs"
        class="code-input-list__item title-h1"
        :class="{ 'has-values': codes[i - 1] !== '' }"
        type="text"
        :inputmode="allowedInput === AllowedInput.Numeric ? 'numeric' : 'text'"
        :maxlength="1"
        :value="codes[i - 1]"
        @ion-input="onInput"
        @keyup.backspace="onKeyUpBackspace($event)"
        @paste="onPaste($event)"
      />
    </div>
    <div
      class="code-input-message"
      v-if="validationFunction !== undefined"
    >
      <ion-text
        class="code-input-message__invalid subtitle-sm"
        v-if="isFinalCodeValid === false"
      >
        {{ $msTranslate('lib.components.msCodeValidationInput.codeNotValid') }}
      </ion-text>
      <ion-text
        class="code-input-message__valid subtitle-sm"
        v-if="isFinalCodeValid === true"
      >
        {{ $msTranslate('lib.components.msCodeValidationInput.codeValid') }}
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonInputCustomEvent, InputInputEventDetail } from '@ionic/core';
import { onMounted, ref, useTemplateRef } from 'vue';
import { IonInput, IonText } from '@ionic/vue';
import { Ref } from 'vue';
import { AllowedInput, isCharacterAllowed } from '@lib/components/ms-input/types';

const inputsRef = useTemplateRef<Array<{ $el: HTMLIonInputElement }>>('inputs');
const codes = ref<string[]>([]);
const isFinalCodeValid: Ref<undefined | boolean> = ref(undefined);

onMounted(async (): Promise<void> => {
  codes.value = Array(props.codeLength).fill('');
  await focusInputElement(getFirstInputElement());
});

const props = withDefaults(
  defineProps<{
    codeLength: number;
    validationFunction?: (code: Array<string>) => Promise<boolean>;
    allowedInput?: AllowedInput;
  }>(),
  {
    validationFunction: undefined,
    allowedInput: AllowedInput.Numeric,
  },
);

const emits = defineEmits<{
  (e: 'codeComplete', code: Array<string>): void;
}>();

defineExpose({
  setFocus,
  clear,
});

async function clear(): Promise<void> {
  codes.value.fill('');
}

async function onPaste(event: ClipboardEvent): Promise<void> {
  event.preventDefault();
  let code = event.clipboardData?.getData('text');
  if (code && props.allowedInput === AllowedInput.UpperAlphaNumeric) {
    code = code.toLocaleUpperCase();
  }
  if (code && isValidCode(code)) {
    const chars = code.split('');
    for (const [index, c] of chars.entries()) {
      if (index < codes.value.length) {
        codes.value[index] = c;
      }
    }
    await focusInputElement(getLastInputElement());
    checkCode();
  }
}

async function setFocus(): Promise<void> {
  await focusInputElement(getFirstInputElement());
}

async function onKeyUpBackspace(event: KeyboardEvent): Promise<void> {
  const input = await getInputElementFromNativeInputElement(event.target as HTMLInputElement);
  if (!input) {
    return;
  }
  const index = getInputElementIndex(input);
  if (codes.value[index] !== '') {
    codes.value[index] = '';
  } else if (input !== getFirstInputElement()) {
    const previousInput = getPreviousInputElement(input);
    await focusInputElement(previousInput);
    if (index > 0) {
      codes.value[index - 1] = '';
    }
  }
  checkCode();
}

async function checkCode(): Promise<void> {
  if (codes.value.every((c) => c !== '')) {
    isFinalCodeValid.value = props.validationFunction ? await props.validationFunction(codes.value) : true;
    if (isFinalCodeValid.value === true) {
      emits('codeComplete', codes.value);
    }
  } else {
    isFinalCodeValid.value = undefined;
  }
}

async function onInput(event: IonInputCustomEvent<InputInputEventDetail>): Promise<void> {
  let key = event.detail.value;

  if (!key) {
    return;
  }

  if (props.allowedInput === AllowedInput.UpperAlphaNumeric) {
    key = key.toLocaleUpperCase();
  }
  const ionInput = event.target;
  if (!ionInput) {
    return;
  }
  const index = getInputElementIndex(ionInput);
  if (!isCharacterAllowed(key, props.allowedInput)) {
    if (index !== -1 && index < codes.value.length) {
      event.target.value = codes.value[index];
    }
    event.preventDefault();
    return;
  }
  if (index !== -1 && index < codes.value.length) {
    codes.value[index] = key;
    event.target.value = key;
  }
  if (ionInput !== getLastInputElement()) {
    await focusInputElement(getNextInputElement(ionInput));
  }
  checkCode();
}

function isValidCode(value: string = ''): boolean {
  return value.length === props.codeLength && isCharacterAllowed(value, props.allowedInput);
}

function getInputElementAt(index: number): HTMLIonInputElement | undefined {
  if (!inputsRef.value || !inputsRef.value.at(index)) {
    return undefined;
  }
  return (inputsRef.value.at(index) as any).$el as HTMLIonInputElement;
}

function getFirstInputElement(): HTMLIonInputElement | undefined {
  return getInputElementAt(0);
}

function getLastInputElement(): HTMLIonInputElement | undefined {
  return getInputElementAt(props.codeLength - 1);
}

function getInputElementIndex(input: HTMLIonInputElement): number {
  if (!inputsRef.value) {
    return -1;
  }
  return inputsRef.value.findIndex((inputInstance: any) => inputInstance.$el === input);
}

function getPreviousInputElement(input: HTMLIonInputElement): HTMLIonInputElement | undefined {
  const index = getInputElementIndex(input);
  if (index === -1) {
    return;
  }
  return getInputElementAt(index - 1);
}

function getNextInputElement(input: HTMLIonInputElement): HTMLIonInputElement | undefined {
  const index = getInputElementIndex(input);
  if (index === -1) {
    return;
  }
  return getInputElementAt(index + 1);
}

async function getNativeInputElement(input: HTMLIonInputElement): Promise<HTMLInputElement | undefined> {
  return await input.getInputElement();
}

async function getInputElementFromNativeInputElement(nativeInput: HTMLInputElement): Promise<HTMLIonInputElement | undefined> {
  for (const ipt of inputsRef.value ?? []) {
    const nativeIpt = await getNativeInputElement(ipt.$el);
    if (nativeIpt === nativeInput) {
      return ipt.$el as HTMLIonInputElement;
    }
  }
}

async function focusInputElement(input: HTMLIonInputElement | undefined): Promise<void> {
  if (input) {
    await input.setFocus();
  }
}
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

@keyframes blinking {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.code-input-list {
  display: flex;
  gap: 1rem;
  margin: 0.25rem;

  @include ms.responsive-breakpoint('sm') {
    gap: 0.5rem;
  }
  &__item {
    --highlight-color-focused: none;
    color: var(--parsec-color-light-secondary-text);
    background-color: var(--parsec-color-light-secondary-premiere);
    caret-color: transparent;
    border-radius: var(--parsec-radius-8);
    width: 3.5rem;
    height: 4.5rem;
    display: flex;
    text-align: center;
    position: relative;
    font-size: 1.75rem !important;

    @include ms.responsive-breakpoint('sm') {
      width: 3rem;
      height: 4rem;
    }

    &:is(.has-focus) {
      border: 1px solid var(--parsec-color-light-primary-200);
      background: var(--parsec-color-light-secondary-inversed-contrast);

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        outline: 5px solid var(--parsec-color-light-outline);
        animation: blinking 1.4s infinite ease-out;
        border-radius: var(--parsec-radius-8);
      }
    }

    &:is(.has-value) {
      background-color: var(--parsec-color-light-secondary-medium);
    }
  }
}

.code-input-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &__invalid {
    color: var(--parsec-color-light-danger-500);
    margin-top: 0.75rem;

    @include ms.responsive-breakpoint('sm') {
      font-size: 0.875rem;
    }
  }

  &__valid {
    color: var(--parsec-color-light-success-500);
    margin-top: 0.75rem;

    @include ms.responsive-breakpoint('sm') {
      font-size: 0.875rem;
    }
  }
}
</style>
