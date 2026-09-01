<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="ms-wizard-stepper-step">
    <!-- default -->
    <div
      class="shape"
      :class="getClass(status)"
    >
      <div class="left-line" />
      <div class="circle">
        <div
          v-if="status === MsStepStatus.DONE"
          class="inner-circle-done"
        />
        <div
          v-if="status === MsStepStatus.ACTIVE"
          class="inner-circle-active"
        />
        <ion-icon
          v-if="status === MsStepStatus.DONE"
          class="icon-checkmark"
          :icon="checkmark"
          size="default"
        />
      </div>
      <div class="right-line" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { MsStepStatus } from '@lib/components/ms-stepper/types';
import { checkmark } from 'ionicons/icons';

defineProps<{
  status: MsStepStatus;
}>();

function getClass(status: MsStepStatus): string {
  if (status === 'default') {
    return 'default';
  } else if (status === 'done') {
    return 'done';
  } else if (status === 'active') {
    return 'active';
  }
  return '';
}
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.ms-wizard-stepper-step {
  width: 100%;
  display: flex;
}

.shape {
  display: flex;
  flex-direction: row;
  align-items: center;

  .left-line,
  .right-line {
    width: 3.5625rem;
    height: 1.5px;
  }

  .left-line {
    background: ms.color('border-brand-default');
  }

  .circle {
    background: ms.color('surface-base-default-secondary');
    width: ms.size('sm');
    height: ms.size('sm');
    border-radius: ms.radius('full');
    border: 1.5px solid ms.color('border-brand-default');
    box-shadow: ms.shadow('elevation-lg');
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .right-line {
    background: ms.color('border-base-default');
  }
}

.done {
  opacity: ms.opacity('5');

  .right-line {
    background: ms.color('border-brand-default');
  }

  .circle {
    background: ms.color('surface-brand-default');

    .icon-checkmark {
      color: ms.color('icon-neutral-on-color');
    }
  }
}

.active {
  .left-line {
    opacity: ms.opacity('5');
  }
  .circle {
    border: none;
    background: ms.color('shadow-brand-400');

    .inner-circle-active {
      background: ms.color('surface-brand-default');
      width: 0.625rem;
      height: 0.625rem;
      border-radius: ms.radius('full');
      position: absolute;
    }
  }
  .right-line {
    background: ms.color('border-base-default');
  }
}

.default {
  .left-line {
    background: ms.color('border-base-default');
  }
  .circle {
    border-color: ms.color('border-base-default');

    .inner-circle-done {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: ms.radius('full');
      position: absolute;
    }
  }
}
</style>
