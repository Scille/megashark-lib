<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div class="slider-container">
    <div
      class="slider"
      :class="isDragging || isMouseOver ? 'slider-hover' : ''"
      ref="sliderRef"
      @click="setFocus()"
      @mousedown="onMouseDown($event)"
      @mouseover="isMouseOver = true"
      @mouseleave="isMouseOver = false"
      @keydown="onKeydown($event)"
      :tabindex="-1"
    >
      <div class="full">
        <div class="dot" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { SliderState } from '@lib/components/ms-slider';

const progressWidthStyle = computed(() => `${(100 * props.modelValue.progress) / props.maxValue}%`);
const sliderRef = ref();
const isDragging = ref(false);
const isMouseOver = ref(false);
const isInProgress = ref(false);
const needsUnpause = ref(false);

interface Props {
  modelValue: SliderState;
  maxValue: number;
  incrementValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => {
    return { progress: 0, paused: undefined };
  },
  maxValue: 100,
  incrementValue: 5,
});

const cancelProgressWatch = watch(
  () => props.modelValue.progress,
  () => {
    if (atStart()) {
      isInProgress.value = false;
      emits('ready');
    } else if (!isInProgress.value && inProgress() && !props.modelValue.paused) {
      isInProgress.value = true;
      emits('progressing');
    } else if ((isInProgress.value || isDragging.value) && atEnd()) {
      isInProgress.value = false;
      emits('finished');
    }
  },
);

const cancelPauseWatch = watch(
  () => props.modelValue.paused,
  () => {
    if (inProgress() && props.modelValue.paused) {
      isInProgress.value = false;
      emits('paused');
    } else if (inProgress() && !props.modelValue.paused) {
      isInProgress.value = true;
      emits('progressing');
    }
  },
);

const emits = defineEmits<{
  (e: 'update:modelValue', value: SliderState): void;
  (e: 'change', value: SliderState): void;
  (e: 'ready'): void;
  (e: 'paused'): void;
  (e: 'progressing'): void;
  (e: 'finished'): void;
}>();

onMounted(() => {
  if (atStart()) {
    emits('ready');
  }
});

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  cancelProgressWatch();
  cancelPauseWatch();
});

defineExpose({
  atStart,
  inProgress,
  atEnd,
  setFocus,
});

function atStart(): boolean {
  return props.modelValue.progress <= 0;
}

function inProgress(): boolean {
  return props.modelValue.progress > 0 && props.modelValue.progress < props.maxValue;
}

function atEnd(): boolean {
  return props.modelValue.progress >= props.maxValue;
}

function onKeydown(event: KeyboardEvent): void {
  if (isDragging.value) {
    return;
  }
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault();
      if (props.modelValue.progress > props.incrementValue) {
        updateSliderState(props.modelValue.progress - props.incrementValue);
      } else if (props.modelValue.progress > 0) {
        updateSliderState(0);
      }
      break;
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault();
      if (props.modelValue.progress < props.maxValue - props.incrementValue) {
        updateSliderState(props.modelValue.progress + props.incrementValue);
      } else if (props.modelValue.progress !== props.maxValue) {
        updateSliderState(props.maxValue);
      }
      break;
    case ' ':
      if (props.modelValue.paused !== undefined) {
        event.preventDefault();
        if (props.modelValue.progress === props.maxValue) {
          updateSliderState(0, !props.modelValue.paused);
        } else {
          updateSliderState(props.modelValue.progress, !props.modelValue.paused);
        }
      }
      break;
  }
}

function setFocus(): void {
  sliderRef.value.focus();
}

function updateSliderState(progress: number, paused?: boolean): void {
  emits('update:modelValue', { progress: progress, paused: paused !== undefined ? paused : props.modelValue.paused });
  emits('change', { progress: progress, paused: paused !== undefined ? paused : props.modelValue.paused });
}

function onMouseMove(event: MouseEvent): void {
  if (isDragging.value) {
    updateCurrentProgress(event);
  }
}

function onMouseUp(): void {
  if (isDragging.value) {
    if (!atEnd() && props.modelValue.paused !== undefined) {
      updateSliderState(props.modelValue.progress, !needsUnpause.value);
    }
    isDragging.value = false;
    needsUnpause.value = false;
  }
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
}

function onMouseDown(event: MouseEvent): void {
  event.preventDefault(); // Prevent text selection on click held
  if (props.modelValue.paused === false) {
    updateCurrentProgress(event, true);
    needsUnpause.value = true;
  } else {
    updateCurrentProgress(event);
  }
  isDragging.value = true;
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

function updateCurrentProgress(event: MouseEvent, paused?: boolean): void {
  const left = sliderRef.value.getBoundingClientRect().left;
  const right = sliderRef.value.getBoundingClientRect().right;
  if (event.clientX < left) {
    updateSliderState(0, paused);
  } else if (event.clientX > right) {
    updateSliderState(props.maxValue, paused);
  } else {
    updateSliderState(Math.trunc((props.maxValue * (event.clientX - left)) / (right - left)), paused);
  }
}
</script>

<style scoped lang="scss">
.slider-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .slider {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    height: 0.25rem;
    background: var(--parsec-color-light-secondary-premiere);
    border-radius: var(--parsec-radius-8);
    transition: height 100ms ease-in;

    .full {
      width: v-bind(progressWidthStyle);
      background: var(--parsec-color-light-primary-700);
      opacity: 0.9;
      height: 0.25rem;
      border-radius: var(--parsec-radius-6);
      position: relative;
      transition: height 100ms ease-in;

      .dot {
        cursor: pointer;
        position: absolute;
        right: -0.275rem;
        top: -0.275rem;
      }
    }

    &-hover {
      cursor: pointer;

      .full {
        background: var(--parsec-color-light-gradient);

        .dot {
          right: -0.275rem;
          top: -4px;
          height: 0.75rem;
          width: 0.75rem;
          background-color: var(--parsec-color-light-primary-700);
          border-radius: var(--parsec-radius-circle);
          box-shadow: var(--parsec-shadow-strong);
        }
      }
    }
  }
}
</style>
