<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <canvas
    ref="canvas"
    :height="height || 24"
    :width="width || 24"
    :speed="speed || 1"
  />
</template>

<script setup lang="ts">
import { Rive } from '@rive-app/canvas';
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref();
let riveInstance: Rive | null = null;

const props = defineProps<{
  height?: number;
  width?: number;
  speed?: number;
  src: string;
}>();

onMounted(() => {
  if (canvas.value) {
    fetch(props.src)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        riveInstance = new Rive({
          canvas: canvas.value,
          buffer: buffer,
          autoplay: true,
        });
      });
  }
});

onUnmounted(() => {
  if (riveInstance) {
    riveInstance.cleanup();
  }
});
</script>

<style scoped lang="scss"></style>
