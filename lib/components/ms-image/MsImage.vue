<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template class="ms-image">
  <div
    v-if="isSvg(image)"
    class="svg-container"
    v-html="image"
  />
  <img
    v-else
    :src="image"
  />
</template>

<script setup lang="ts">
defineProps<{
  image: string;
}>();

function isSvg(imageData: string): boolean {
  return imageData.startsWith('<');
}
</script>

<style scoped lang="scss">
@use '@lib/theme' as ms;

.svg-container {
  color: var(--fill-color, ms.color('surface-brand-default'));
  display: flex;
}
</style>
