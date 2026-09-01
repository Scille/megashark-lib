<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="ms-wizard-stepper">
    <div
      class="ms-wizard-stepper__step"
      v-for="(title, index) in titles"
      :key="typeof title === 'string' ? title : title.key"
    >
      <ms-wizard-stepper-step
        :status="index < currentIndex ? MsStepStatus.DONE : index === currentIndex ? MsStepStatus.ACTIVE : MsStepStatus.DEFAULT"
      />
      <ion-text
        class="step-title"
        :class="{
          done: index < currentIndex,
          active: index === currentIndex,
          default: index > currentIndex,
        }"
      >
        {{ $msTranslate(title) }}
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import MsWizardStepperStep from '@lib/components/ms-stepper/MsWizardStepperStep.vue';
import { MsStepStatus } from '@lib/components/ms-stepper/types';
import { Translatable } from '@lib/services';

defineProps<{
  titles: Translatable[];
  currentIndex: number;
}>();
</script>

<!-- "setup" removed to interact with child component style (ms-wizard-stepper-step) -->
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss">
@use '@lib/theme' as ms;

.ms-wizard-stepper {
  background: ms.color('surface-base-page');
  border-bottom: ms.border('thin') solid ms.color('border-base-default');
  display: flex;
  padding: ms.spacing('padding-5xl') ms.spacing('padding-3xl');
  justify-content: center;

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ms.spacing('gap-2xl');
    width: 8.125rem;

    .step-title {
      color: ms.color('text-brand-default');
      @include ms.font('label-lg-medium');
    }

    .done {
      opacity: ms.opacity('5');
    }

    .default {
      color: ms.color('text-disabled-on-color');
    }

    .active {
      &.step-title {
        @include ms.font('label-lg-emphasis');
      }
    }

    &:first-of-type {
      .ms-wizard-stepper-step {
        justify-content: end;
      }
      .left-line {
        display: none;
      }
    }

    &:last-of-type {
      .ms-wizard-stepper-step {
        justify-content: start;
      }
      .right-line {
        display: none;
      }
    }
  }
}
</style>
