<template>
  <ms-modal
    title="codeVerification.title"
    :subtitle="{ key: 'codeVerification.subtitle', data: { email: email } }"
    class="coucou"
  >
    <div class="code-input">
      <template
        v-for="i in CODE_LENGTH"
        :key="`code${i - 1}`"
      >
        <ion-input
          ref="inputs"
          v-model="codes[i - 1]"
          class="code-input__item title-h1-xl"
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
    <div class="code-footer">
      <div class="bottomtext body">
        {{ $msTranslate('codeVerification.codeNotReceivedQuestion') }}
      </div>
      <div class="bottomtext body">
        {{ $msTranslate('codeVerification.bottomOptions') }}
      </div>
    </div>
  </ms-modal>
</template>

<script setup lang="ts">
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import { IonInput } from '@ionic/vue';

type HTMLIonInputElementOrUndefined = HTMLIonInputElement | undefined;
const inputs = ref();
const codes = ref<string[]>([]);
const CODE_LENGTH = 6;
const isCodeValid = computed(() => isValidCode(codes.value.join('')));

onMounted(async (): Promise<void> => {
  await nextTick();
  focusInputElement(getFirstInputElement());
});

const props = defineProps<{
  email: string;
  validationFunction(code: Array<string>): Promise<void>;
}>();

async function onPaste(event: ClipboardEvent): Promise<void> {
  event.preventDefault();
  const code = event.clipboardData?.getData('text');
  if (code && isValidCode(code)) {
    codes.value = code.split('');
    focusInputElement(getLastInputElement());
    props.validationFunction;
  }
}

async function onIonInput(event: CustomEvent): Promise<void> {
  const input = event.target as HTMLIonInputElement;
  if (input !== getLastInputElement()) {
    focusInputElement(getNextInputElement(input));
  }
  if (isCodeValid.value) {
    props.validationFunction;
  }
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
  }
}

function onKeydown(event: KeyboardEvent): void {
  if (!isDigits(event.key) && !event.ctrlKey) {
    event.preventDefault();
  }
}

function isDigits(value: string): boolean {
  const pattern = /^\d+$/;
  return pattern.test(value);
}

function isValidCode(value: string = ''): boolean {
  return value.length === CODE_LENGTH && isDigits(value);
}

function getInputElementAt(index: number): HTMLIonInputElementOrUndefined {
  if (!inputs.value || !inputs.value.at(index)) {
    return undefined;
  }
  return inputs.value.at(index).$el as HTMLIonInputElement;
}

function getFirstInputElement(): HTMLIonInputElementOrUndefined {
  return getInputElementAt(0);
}

function getLastInputElement(): HTMLIonInputElementOrUndefined {
  return getInputElementAt(CODE_LENGTH - 1);
}

function getInputElementIndex(input: HTMLIonInputElement): number {
  if (!inputs.value) {
    return -1;
  }
  return inputs.value.findIndex((inputInstance: any) => inputInstance.$el === input);
}

function getPreviousInputElement(input: HTMLIonInputElement): HTMLIonInputElementOrUndefined {
  const index = getInputElementIndex(input);
  if (index === -1) {
    return;
  }
  return getInputElementAt(index - 1);
}

function getNextInputElement(input: HTMLIonInputElement): HTMLIonInputElementOrUndefined {
  const index = getInputElementIndex(input);
  if (index === -1) {
    return;
  }
  return getInputElementAt(index + 1);
}

async function getNativeInputElement(input: HTMLIonInputElement): Promise<HTMLInputElement> {
  return await input.getInputElement();
}

async function getInputElementFromNativeInputElement(nativeInput: HTMLInputElement): Promise<HTMLIonInputElementOrUndefined> {
  for (const ipt of inputs.value) {
    const nativeIpt = await getNativeInputElement(ipt.$el);
    if (nativeIpt === nativeInput) {
      return ipt.$el as HTMLIonInputElement;
    }
  }
}

function setInputElementValue(input: HTMLIonInputElementOrUndefined, value: string): void {
  if (input === undefined) {
    return;
  }
  const inputIndex = getInputElementIndex(input);
  if (inputIndex === -1) {
    return;
  }
  codes.value[inputIndex] = value;
}

function focusInputElement(input: HTMLIonInputElementOrUndefined): void {
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

.code-input {
  display: flex;
  justify-content: center;
  gap: 1rem;

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
.code-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 2.5rem;
}

.bottomtext {
  color: var(--parsec-color-light-secondary-grey);
  text-align: center;
}
</style>
