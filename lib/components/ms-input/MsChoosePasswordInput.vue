<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="choose-password">
    <div
      v-show="showDescription"
      class="info"
    >
      <ms-image
        :image="PasswordLock"
        class="info__img"
      />
      <ion-text class="info__text subtitles-sm">
        {{ $msTranslate('lib.components.msChoosePasswordInput.description') }}
      </ion-text>
    </div>
    <form
      class="inputs-container"
      :class="{ 'inputs-container--column': !inline }"
    >
      <div class="inputs-container-item">
        <ms-password-input
          :label="passwordLabel"
          v-model="password"
          auto-complete-info="new-password"
          name="password"
          ref="firstInputField"
          @on-enter-keyup="$emit('onEnterKeyup', password)"
          @blur="showNoMatchError = passwordConfirm.length > 0"
          @change="showNoMatchError = false"
        />
      </div>
      <div class="inputs-container-item">
        <ms-password-input
          :label="'lib.components.msChoosePasswordInput.confirmPasswordInputLabel'"
          v-model="passwordConfirm"
          auto-complete-info="new-password"
          name="confirmPassword"
          @on-enter-keyup="$emit('onEnterKeyup', passwordConfirm)"
          @blur="showNoMatchError = true"
          @change="showNoMatchError = false"
        />
        <span
          class="form-helperText"
          v-if="showNoMatchError && password !== passwordConfirm && passwordConfirm.length > 0"
        >
          {{ $msTranslate('lib.components.msChoosePasswordInput.noMatch') }}
        </span>
      </div>
    </form>
    <div class="password-criteria">
      <ion-text class="password-criteria__title title-h5">
        {{ $msTranslate('lib.components.msChoosePasswordInput.criteria.title') }}
      </ion-text>
      <div class="password-criteria-list">
        <p
          v-for="[criterionName, criterion] in CRITERIA.entries()"
          :key="criterion"
          class="password-criteria__item body"
          :class="{ matches: PasswordValidation.matchCriteria(password, criterion) }"
        >
          <ion-icon :icon="PasswordValidation.matchCriteria(password, criterion) ? checkmarkCircle : close" />
          {{ $msTranslate(`lib.components.msChoosePasswordInput.criteria.${criterionName}`) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PasswordValidation } from '@lib/common/validation';
import { MsImage, PasswordLock } from '@lib/components/ms-image';
import MsPasswordInput from '@lib/components/ms-input/MsPasswordInput.vue';
import { Translatable } from '@lib/services';
import { IonText, IonIcon } from '@ionic/vue';
import { ref, useTemplateRef } from 'vue';
import { checkmarkCircle, close } from 'ionicons/icons';

const password = ref('');
const passwordConfirm = ref('');
const firstInputFieldRef = useTemplateRef('firstInputField');
const showNoMatchError = ref(false);

const CRITERIA = new Map([
  ['length', PasswordValidation.Criteria.Length],
  ['uppercase', PasswordValidation.Criteria.Uppercase],
  ['lowercase', PasswordValidation.Criteria.Lowercase],
  ['digit', PasswordValidation.Criteria.Digit],
  ['special', PasswordValidation.Criteria.Special],
]);

defineEmits<{
  (e: 'onEnterKeyup', value: string): void;
}>();

withDefaults(
  defineProps<{
    showDescription?: boolean;
    passwordLabel?: Translatable;
    inline?: boolean;
  }>(),
  {
    showDescription: true,
    passwordLabel: 'lib.components.msChoosePasswordInput.passwordInputLabel',
    inline: true,
  },
);

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
  return PasswordValidation.matchCriteria(password.value, PasswordValidation.Criteria.All) && password.value === passwordConfirm.value;
}

function clear(): void {
  password.value = '';
  passwordConfirm.value = '';
}
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

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
    width: 1.75rem;
    height: 1.75rem;
  }

  &__text {
    color: var(--parsec-color-light-secondary-text);
  }
}

.inputs-container {
  display: flex;
  gap: 1.5rem;

  @include ms.responsive-breakpoint('sm') {
    flex-direction: column;
  }

  &--column {
    flex-direction: column;
  }

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

.password-criteria {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  &__title {
    color: var(--parsec-color-light-secondary-grey);
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
    gap: 0.5em;
    background: var(--parsec-color-light-secondary-premiere);
    color: var(--parsec-color-light-secondary-hard-grey);
    margin: 0;
    border-radius: var(--parsec-radius-12);

    &.matches {
      color: var(--parsec-color-light-success-700);
      background: var(--parsec-color-light-success-50);
      font-weight: 500;
    }
  }
}
</style>
