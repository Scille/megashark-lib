<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="choose-password">
    <div class="info">
      <ms-image
        :image="PasswordLock"
        class="info__img"
      />
      <ion-text class="info__text subtitles-sm">
        {{ $msTranslate('lib.components.msChoosePasswordInput.description') }}
      </ion-text>
    </div>
    <div class="inputs-container">
      <div class="inputs-container-item">
        <ms-password-input
          :label="passwordLabel || 'lib.components.msChoosePasswordInput.passwordInputLabel'"
          v-model="password"
          name="password"
          ref="firstInputFieldRef"
          @change="onPasswordChange()"
          @on-enter-keyup="$emit('onEnterKeyup', password)"
        />
      </div>
      <div class="inputs-container-item">
        <ms-password-input
          :label="'lib.components.msChoosePasswordInput.confirmPasswordInputLabel'"
          v-model="passwordConfirm"
          name="confirmPassword"
          @on-enter-keyup="$emit('onEnterKeyup', passwordConfirm)"
        />
        <span
          class="form-helperText"
          v-if="password !== passwordConfirm && passwordConfirm.length > 0"
        >
          {{ $msTranslate('lib.components.msChoosePasswordInput.noMatch') }}
        </span>
      </div>
    </div>
    <div class="password-level">
      <div
        class="password-level-container"
        :class="getPasswordLevelClass()"
      >
        <div class="password-level-bar">
          <div class="bar-item" />
          <div class="bar-item" />
          <div class="bar-item" />
        </div>
        <ion-text class="subtitles-sm password-level__text">
          {{ $msTranslate(passwordStrength.label) }}
        </ion-text>
      </div>
      <ion-text class="subtitles-sm password-criteria">
        {{ $msTranslate('lib.components.msChoosePasswordInput.criteria') }}
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PasswordStrength, PasswordValidation } from '@lib/common/validation';
import { MsImage, PasswordLock } from '@lib/components/ms-image';
import MsPasswordInput from '@lib/components/ms-input/MsPasswordInput.vue';
import { Translatable } from '@lib/services/translation';
import { IonText } from '@ionic/vue';
import { Ref, ref } from 'vue';

const password = ref('');
const passwordConfirm = ref('');
const passwordStrength: Ref<PasswordStrength> = ref({
  level: PasswordValidation.StrengthLevel.None,
  label: '',
});
const firstInputFieldRef = ref();

defineEmits<{
  (e: 'onEnterKeyup', value: string): void;
}>();

defineProps<{
  passwordLabel?: Translatable;
}>();

defineExpose({
  areFieldsCorrect,
  password,
  clear,
  setFocus,
});

function setFocus(): void {
  if (firstInputFieldRef.value) {
    firstInputFieldRef.value.setFocus();
  }
}

async function areFieldsCorrect(): Promise<boolean> {
  return passwordStrength.value.level === PasswordValidation.StrengthLevel.High && password.value === passwordConfirm.value;
}

function clear(): void {
  password.value = '';
  passwordConfirm.value = '';
  passwordStrength.value = {
    level: PasswordValidation.StrengthLevel.None,
    label: '',
  };
}

function onPasswordChange(): void {
  passwordStrength.value = PasswordValidation.getStrength(password.value);
}

function getPasswordLevelClass(): string {
  switch (passwordStrength.value.level) {
    case PasswordValidation.StrengthLevel.Low:
      return 'password-level-low';
    case PasswordValidation.StrengthLevel.Medium:
      return 'password-level-medium';
    case PasswordValidation.StrengthLevel.High:
      return 'password-level-high';
    default:
      return '';
  }
}
</script>

<style scoped lang="scss">
.choose-password {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info {
  background: var(--parsec-color-light-primary-30);
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  padding: 0.625rem;
  border-radius: var(--parsec-radius-6);
  margin-bottom: 0.5rem;

  &__img {
    width: 3.25rem;
    height: 3.25rem;
    margin-right: 0.5rem;
  }

  &__text {
    color: var(--parsec-color-light-secondary-text);
  }
}

.inputs-container {
  display: flex;
  gap: 1.5rem;

  &-item {
    width: 100%;
  }

  .form-helperText {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
    color: var(--parsec-color-light-danger-500);
  }
}

.password-level {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 35rem;

  .password-level-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    &.password-level-low {
      .password-level__text {
        color: var(--parsec-color-light-danger-500);
      }

      .bar-item:nth-child(-n + 1) {
        background: var(--parsec-color-light-danger-500);
      }
    }

    &.password-level-medium {
      .password-level__text {
        color: var(--parsec-color-light-warning-500);
      }

      .bar-item:nth-child(-n + 2) {
        background: var(--parsec-color-light-warning-500);
      }
    }

    &.password-level-high {
      .password-level__text {
        color: var(--parsec-color-light-success-500);
      }

      .bar-item:nth-child(-n + 3) {
        background: var(--parsec-color-light-success-500);
      }
    }
  }

  &__text {
    color: var(--parsec-color-light-secondary-text);
  }

  &-bar {
    display: flex;
    gap: 0.5rem;

    .bar-item {
      width: 3rem;
      height: 0.375rem;
      border-radius: var(--parsec-radius-6);
      background: var(--parsec-color-light-primary-50);
      position: relative;
    }
  }

  .password-criteria {
    color: var(--parsec-color-light-secondary-grey);
  }
}
</style>
