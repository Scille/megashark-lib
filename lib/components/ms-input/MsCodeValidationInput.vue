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
          class="code-input-list__item title-h1-xl"
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
    <div class="code-input-message">
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
import { nextTick, onMounted, ref, defineEmits } from 'vue';
import { IonInput, IonText } from '@ionic/vue';
import { Ref } from 'vue';
const inputs = ref();
const codes = ref<string[]>([]);
const isFinalCodeValid: Ref<undefined | boolean> = ref(undefined);

onMounted(async (): Promise<void> => {
  await nextTick();
  focusInputElement(getFirstInputElement());
});

const props = defineProps<{
  codeLength: number;
  validationFunction: (code: Array<string>) => Promise<boolean>;
}>();

const emits = defineEmits<{
  (e: 'codeComplete', code: Array<string>): void;
}>();

async function onPaste(event: ClipboardEvent): Promise<void> {
  event.preventDefault();
  const code = event.clipboardData?.getData('text');
  if (code && isValidCode(code)) {
    codes.value = code.split('');
    focusInputElement(getLastInputElement());
    checkCode();
  }
}

async function onIonInput(event: CustomEvent): Promise<void> {
  const input = event.target as HTMLIonInputElement;
  if (input !== getLastInputElement()) {
    focusInputElement(getNextInputElement(input));
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
        focusInputElement(previousInput);
        setInputElementValue(previousInput, '');
      }
    }
    codes.value = codes.value.filter((code) => code !== '');
    checkCode();
  }
}

async function checkCode(): Promise<void> {
  if (props.codeLength === codes.value.length) {
    isFinalCodeValid.value = await props.validationFunction(codes.value);
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

function focusInputElement(input: HTMLIonInputElement | undefined): void {
  if (input) {
    input.setFocus();
  }
}
</script>

<style scoped lang="scss">
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
  justify-content: center;
  gap: 1rem;
  margin: 0.25rem;

  &__item {
    --highlight-color-focused: none;
    color: var(--parsec-color-light-primary-700);
    background-color: var(--parsec-color-light-secondary-premiere);
    caret-color: transparent;
    border-radius: var(--parsec-radius-8);
    width: 4.5rem;
    height: 6rem;
    display: flex;
    text-align: center;
    position: relative;

    &:is(.has-focus) {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        outline: 2px solid var(--parsec-color-light-primary-700);
        animation: blinking 1.3s infinite ease-out;
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
    color: var(--parsec-color-light-danger-700);
    margin-top: 1rem;
  }

  &__valid {
    color: var(--parsec-color-light-success-700);
    margin-top: 1rem;
  }
}
</style>
