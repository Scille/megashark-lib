<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="progress-container"
    :class="{
      'progress-bar': props.appearance === MsProgressAppearance.ProgressBar,
      line: props.appearance === MsProgressAppearance.Line,
      bar: props.appearance === MsProgressAppearance.Bar,
    }"
  >
    <div class="progress">
      <div class="completed" />
    </div>
    <ion-text
      class="title-h5 progress-text"
      v-show="props.appearance === MsProgressAppearance.ProgressBar"
    >
      {{ `${progress}%` }}
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonText } from '@ionic/vue';
import { MsProgressAppearance } from '@lib/components/ms-progress/types';

const props = defineProps({
  progress: {
    type: Number,
    default: 0,
    validator: function (value: number) {
      return value >= 0 && value <= 100;
    },
  },
  appearance: {
    type: String,
    default: MsProgressAppearance.Bar,
  },
});

const progressWidthStyle = computed(() => `${props.progress}%`);
</script>

<style scoped lang="scss">
.progress-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.progress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 0.725rem;
  background: var(--parsec-color-light-secondary-premiere);
  border-radius: var(--parsec-radius-8);

  .completed {
    transition: width 0.35s ease-in-out;
    width: v-bind(progressWidthStyle);
    height: 0.5rem;
    background: var(--parsec-color-light-gradient);
    border-radius: var(--parsec-radius-6);
    flex: none;
    order: 0;
    flex-grow: 1;
  }
}

.line {
  .progress {
    height: 0.125rem;
    padding: 0;

    .completed {
      height: 0.125rem;
    }
  }
}

.bar {
  .progress {
    height: 0.75rem;
    padding: 0.125rem;

    .completed {
      height: auto;
    }
  }
}

.progress-bar {
  .progress {
    height: 0.75rem;
    padding: 0.125rem;

    .completed {
      height: auto;
    }
  }
}

.progress-text {
  color: var(--parsec-color-light-primary-600);
}
</style>
