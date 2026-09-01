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
      class="progress-text"
      v-show="props.appearance === MsProgressAppearance.ProgressBar"
    >
      {{ `${progress}%` }}
    </ion-text>
  </div>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import { MsProgressAppearance } from '@lib/components/ms-progress/types';
import { computed } from 'vue';

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
@use '@lib/theme' as ms;

.progress-container {
  display: flex;
  align-items: center;
  gap: ms.spacing('gap-lg');
}

.progress {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 0.375rem;
  background: ms.color('surface-base-page-secondary');
  border-radius: ms.radius('lg');

  .completed {
    transition: width 0.35s ease-in-out;
    width: v-bind(progressWidthStyle);
    height: 0.375rem;
    background: ms.color('surface-brand-default');
    border-radius: ms.radius('md');
    flex: none;
    order: 0;
    flex-grow: 1;
  }
}

.line {
  .progress {
    height: 0.25rem;
    padding: 0;

    .completed {
      height: 0.25rem;
    }
  }
}

.bar {
  .progress {
    height: 0.5rem;

    .completed {
      height: auto;
    }
  }
}

.progress-bar {
  .progress {
    height: 0.5rem;

    .completed {
      height: auto;
    }
  }
}

.progress-text {
  width: 3rem;
  @include ms.font('label-sm-medium');
  color: ms.color('text-neutral-default');
}
</style>
