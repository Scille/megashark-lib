<template>
  <ms-modal
    title="lib.components.msCodeValidationModal.title"
    :subtitle="{ key: 'lib.components.msCodeValidationModal.subtitle', data: { email: email } }"
  >
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
      <div
        class="code-input-error"
        v-if="codeError"
      >
        <ion-text class="subtitle-sm">{{ $msTranslate('lib.components.msCodeValidationModal.error') }}</ion-text>
      </div>
    </div>
    <div class="code-footer">
      <div class="code-footer__link body">
        {{ $msTranslate('lib.components.msCodeValidationModal.codeNotReceivedQuestion') }}
      </div>
      <ion-text class="code-footer__text">
        {{ $msTranslate('lib.components.msCodeValidationModal.or') }}
      </ion-text>
      <div class="code-footer__link body">
        {{ $msTranslate('lib.components.msCodeValidationModal.bottomOptions') }}
      </div>
    </div>
  </ms-modal>
</template>

<script setup lang="ts">
import MsModal from '@lib/components/ms-modal/MsModal.vue';
import { computed, nextTick, onMounted, ref } from 'vue';
import { IonInput, IonText } from '@ionic/vue';

const inputs = ref();
const codes = ref<string[]>([]);
const isCodeValid = computed(() => isValidCode(codes.value.join('')));
const codeError = ref<boolean>(false);

onMounted(async (): Promise<void> => {
  await nextTick();
  focusInputElement(getFirstInputElement());
});

const props = defineProps<{
  email: string;
  codeLength: number;
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
  if (isCodeValid.value) {
    checkCode();
  }
}

async function checkCode(): Promise<boolean> {
  if (isCodeValid.value) {
    return true;
  } else {
    return (codeError.value = true);
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

.code-input-error {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  ion-text {
    color: var(--parsec-color-light-danger-700);
  }
}

.code-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2.5rem;

  &__link {
    color: var(--parsec-color-light-primary-600);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  &__text {
    color: var(--parsec-color-light-secondary-grey);
  }
}
</style>
