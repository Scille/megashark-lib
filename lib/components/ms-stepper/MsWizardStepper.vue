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
        class="subtitles-sm step-title"
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
import MsWizardStepperStep from '@lib/components/ms-stepper/MsWizardStepperStep.vue';
import { MsStepStatus } from '@lib/components/ms-stepper/types';
import { Translatable } from '@lib/services';
import { IonText } from '@ionic/vue';

defineProps<{
  titles: Translatable[];
  currentIndex: number;
}>();
</script>

<!-- "setup" removed to interact with child component style (ms-wizard-stepper-step) -->
<!-- eslint-disable-next-line vue-scoped-css/enforce-style-type -->
<style lang="scss">
.ms-wizard-stepper {
  background: var(--parsec-color-light-secondary-background);
  display: flex;
  padding: 2rem 1rem;
  justify-content: center;

  &__step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    width: 8.125rem;

    .step-title {
      color: var(--parsec-color-light-primary-600);
    }

    .done {
      opacity: 0.5;
    }

    .default {
      color: var(--parsec-color-light-secondary-grey);
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
