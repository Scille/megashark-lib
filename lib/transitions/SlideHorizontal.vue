<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->
<template>
  <div class="slider-container">
    <transition
      :name="getName()"
      mode="out-in"
    >
      <slot />
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Position } from '@lib/transitions/types';

const props = defineProps<{
  appearFrom: Position;
  disappearTo: Position;
}>();

function getName(): string {
  return `slide-${props.appearFrom}-to-${props.disappearTo}`;
}
</script>

<style scoped>
.slider-container {
  height: 100%;
  display: flex;
  overflow: hidden;
}

.slide-left-to-left-enter-active,
.slide-right-to-right-enter-active,
.slide-left-to-right-enter-active,
.slide-right-to-left-enter-active {
  transition: 0.4s ease-in-out;
}

.slide-left-to-left-leave-active,
.slide-right-to-right-leave-active,
.slide-left-to-right-leave-active,
.slide-right-to-left-leave-active {
  transition: 0.4s;
}

/* slide to the left */
.slide-left-to-left-enter-from,
.slide-left-to-left-leave-to,
.slide-left-to-right-enter-from,
.slide-right-to-left-leave-to {
  opacity: 0;
  transform: translate(-100%, 0);
}

/* slide to the right */
.slide-right-to-right-enter-from,
.slide-right-to-right-leave-to,
.slide-left-to-right-leave-to,
.slide-right-to-left-enter-from {
  opacity: 0;
  transform: translate(100%, 0);
}
</style>
