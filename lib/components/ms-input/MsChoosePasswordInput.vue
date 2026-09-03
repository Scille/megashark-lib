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
      <ion-text class="info__text">
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
          :error-message="
            showNoMatchError && password !== passwordConfirm && passwordConfirm.length > 0
              ? 'lib.components.msChoosePasswordInput.noMatch'
              : ''
          "
          v-model="passwordConfirm"
          auto-complete-info="new-password"
          name="confirmPassword"
          @on-enter-keyup="$emit('onEnterKeyup', passwordConfirm)"
          @blur="showNoMatchError = true"
          @change="showNoMatchError = false"
        />
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
import { IonIcon, IonText } from '@ionic/vue';
import { PasswordValidation } from '@lib/common/validation';
import { MsImage, PasswordLock } from '@lib/components/ms-image';
import MsPasswordInput from '@lib/components/ms-input/MsPasswordInput.vue';
import { Translatable } from '@lib/services';
import { checkmarkCircle, close } from 'ionicons/icons';
import { ref, useTemplateRef } from 'vue';

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
  gap: ms.spacing('gap-3xl');
}

.info {
  background: ms.color('surface-brand-default-subtle');
  display: flex;
  align-items: center;
  gap: ms.spacing('gap-md');
  width: 100%;
  padding: ms.spacing('padding-xl');
  border-radius: ms.radius('xl');
  margin-bottom: 0.5rem;

  &__img {
    width: 1.5rem;
    height: 1.5rem;
  }

  &__text {
    color: ms.color('text-base-body');
    @include ms.font('body-lg-medium');
  }
}

.inputs-container {
  display: flex;
  gap: ms.spacing('gap-3xl');

  @include ms.responsive-breakpoint('sm') {
    flex-direction: column;
  }

  &--column {
    flex-direction: column;
  }

  &-item {
    width: 100%;
  }
}

.password-criteria {
  display: flex;
  flex-direction: column;
  gap: ms.spacing('gap-lg');

  &__title {
    color: ms.color('text-base-description');
    opacity: ms.opacity('6');
    @include ms.font('body-md-medium');
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    gap: ms.spacing('gap-lg');
  }

  &__item {
    display: flex;
    align-items: center;
    padding: ms.spacing('padding-none') ms.spacing('padding-lg');
    gap: ms.spacing('gap-md');
    background: ms.color('surface-base-page-secondary');
    color: ms.color('text-base-description');
    margin: 0;
    border-radius: ms.radius('3xl');
    @include ms.font('body-md-regular');

    &.matches {
      color: ms.color('text-success-default');
      background: ms.color('surface-success-default-subtle');
      font-weight: 500;
      box-shadow: ms.shadow('input');
    }
  }
}
</style>
