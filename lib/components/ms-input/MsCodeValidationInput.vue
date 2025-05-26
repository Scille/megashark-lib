<template>
  <div class="code-input">
    <div class="code-input-list">
      <template
        v-for="i in codeLength || 6"
        :key="`code${i - 1}`"
      >
        <ion-input
          ref="inputs"
          v-model="codes[i - 1]"
          class="code-input-list__item title-h1"
          :class="{ 'has-values': codes[i - 1] !== '' }"
          type="text"
          inputmode="numeric"
          :maxlength="1"
          @keydown="onKeydown($event)"
          @ion-input="onIonInput($event)"
          @keyup.backspace="onKeyUpBackspace($event)"
          @paste="onPaste($event)"
        />
      </template>
    </div>
    <div
      class="code-input-message"
      v-if="validationFunction"
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
import { onMounted, ref, defineEmits, defineExpose } from 'vue';
import { IonInput, IonText } from '@ionic/vue';
import { Ref } from 'vue';

const inputs = ref();
const codes = ref<string[]>([]);
const isFinalCodeValid: Ref<undefined | boolean> = ref(undefined);

onMounted(async (): Promise<void> => {
  await focusInputElement(getFirstInputElement());
});

const props = defineProps<{
  codeLength: number;
  validationFunction?: (code: Array<string>) => Promise<boolean>;
}>();

const emits = defineEmits<{
  (e: 'codeComplete', code: Array<string>): void;
}>();

defineExpose({
  setFocus,
});

async function onPaste(event: ClipboardEvent): Promise<void> {
  event.preventDefault();
  const code = event.clipboardData?.getData('text');
  if (code && isValidCode(code)) {
    codes.value = code.split('');
    await focusInputElement(getLastInputElement());
    checkCode();
  }
}

async function setFocus(): Promise<void> {
  await focusInputElement(getFirstInputElement());
}

async function onIonInput(event: CustomEvent): Promise<void> {
  const input = event.target as HTMLIonInputElement;
  if (input !== getLastInputElement()) {
    await focusInputElement(getNextInputElement(input));
  }

  if (input.value === '') {
    codes.value.length = codes.value.filter((code) => code !== '').length;
  }

  checkCode();
}

async function onKeyUpBackspace(event: KeyboardEvent): Promise<void> {
  const input = await getInputElementFromNativeInputElement(event.target as HTMLInputElement);
  if (input) {
    if (input.value !== '') {
      setInputElementValue(input, '');
    } else {
      if (input.value === '' && input !== getFirstInputElement()) {
        const previousInput = getPreviousInputElement(input);
        await focusInputElement(previousInput);
        setInputElementValue(previousInput, '');
      }
    }
    codes.value = codes.value.filter((code) => code !== '');
    checkCode();
  }
}

async function checkCode(): Promise<void> {
  if (props.codeLength === codes.value.length) {
    isFinalCodeValid.value = props.validationFunction ? await props.validationFunction(codes.value) : true;
    if (isFinalCodeValid.value === true) {
      emits('codeComplete', codes.value);
    }
  } else {
    isFinalCodeValid.value = undefined;
  }
}

function onKeydown(event: KeyboardEvent): void {
  if (!isDigits(event.key) && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
  }
}

function isDigits(value: string): boolean {
  const pattern = /^\d+$/;
  return pattern.test(value);
}

function isValidCode(value: string = ''): boolean {
  return value.length === props.codeLength && isDigits(value);
}

function getInputElementAt(index: number): HTMLIonInputElement | undefined {
  if (!inputs.value || !inputs.value.at(index)) {
    return undefined;
  }
  return inputs.value.at(index).$el as HTMLIonInputElement;
}

function getFirstInputElement(): HTMLIonInputElement | undefined {
  return getInputElementAt(0);
}

function getLastInputElement(): HTMLIonInputElement | undefined {
  return getInputElementAt(props.codeLength - 1);
}

function getInputElementIndex(input: HTMLIonInputElement): number {
  if (!inputs.value) {
    return -1;
  }
  return inputs.value.findIndex((inputInstance: any) => inputInstance.$el === input);
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
  for (const ipt of inputs.value) {
    const nativeIpt = await getNativeInputElement(ipt.$el);
    if (nativeIpt === nativeInput) {
      return ipt.$el as HTMLIonInputElement;
    }
  }
}

function setInputElementValue(input: HTMLIonInputElement | undefined, value: string): void {
  if (input === undefined) {
    return;
  }
  const inputIndex = getInputElementIndex(input);
  if (inputIndex === -1) {
    return;
  }
  codes.value[inputIndex] = value;
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
