<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    class="ms-draggable"
    :class="{ disabled: disabled }"
    @mousemove.prevent="onDrag"
    @mousedown.prevent="startDragging"
    @mouseup.prevent="stopDragging"
    @mouseleave.prevent="stopDragging"
    draggable="false"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  disabled?: boolean;
  restrictDirection?: {
    up?: boolean;
    down?: boolean;
    left?: boolean;
    right?: boolean;
  };
}>();

const emits = defineEmits<{
  (e: 'drag-started'): void;
  (e: 'drag-ended'): void;
  (e: 'dragging'): void;
}>();

defineExpose({
  resetPosition,
});

const isDragging = ref(false);

const posX = ref(0);
const posY = ref(0);
const computedPosX = computed(() => `${posX.value}px`);
const computedPosY = computed(() => `${posY.value}px`);

function startDragging(): void {
  isDragging.value = true;
  emits('drag-started');
}

function stopDragging(): void {
  isDragging.value = false;
  emits('drag-ended');
}

function onDrag(event: MouseEvent): void {
  if (!isDragging.value || props.disabled) {
    return;
  }
  requestAnimationFrame(() => {
    emits('dragging');
    const { movementX, movementY } = event;
    // dragging up
    if (Math.sign(movementY) === -1 && !props.restrictDirection?.up) {
      posY.value += movementY;
    }
    // dragging down
    if (Math.sign(movementY) === 1 && !props.restrictDirection?.down) {
      posY.value += movementY;
    }
    // dragging left
    if (Math.sign(movementX) === -1 && !props.restrictDirection?.left) {
      posX.value += movementX;
    }
    // dragging right
    if (Math.sign(movementX) === 1 && !props.restrictDirection?.right) {
      posX.value += movementX;
    }
  });
}

function resetPosition(): void {
  posX.value = 0;
  posY.value = 0;
}
</script>

<style scoped lang="scss">
.ms-draggable {
  position: relative;
  transition: all ease-in-out;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  left: v-bind(computedPosX);
  top: v-bind(computedPosY);
}

.ms-draggable:not(.disabled) {
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
}
</style>
