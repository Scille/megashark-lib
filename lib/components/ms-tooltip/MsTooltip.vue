<!-- Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS -->

<template>
  <div
    ref="container"
    class="tooltip-container"
  >
    <div class="tooltip-content">
      <ion-text class="tooltip-text">
        {{ $msTranslate(text) }}
      </ion-text>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonText } from '@ionic/vue';
import { Translatable } from '@lib/services';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<{
  text: Translatable;
  // Called whenever the content size changes, so that the caller (attachMouseOverTooltip)
  // can adjust the popover position, which Ionic only computes once when presenting.
  onSizeChange?: (size: { width: number; height: number }) => void;
}>();

const container = ref<HTMLElement>();
let resizeObserver: ResizeObserver | undefined;

onMounted((): void => {
  if (!container.value) {
    return;
  }
  resizeObserver = new ResizeObserver((entries): void => {
    const size = entries[0].contentRect;
    props.onSizeChange?.({ width: Math.round(size.width), height: Math.round(size.height) });
  });
  resizeObserver.observe(container.value);
});

onUnmounted((): void => {
  resizeObserver?.disconnect();
  resizeObserver = undefined;
});
</script>

<style lang="scss" scoped>
@use '@lib/theme' as ms;

.tooltip-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  --fill-color: #{ms.color('surface-elevated-default')};
}

.tooltip-content {
  background: ms.color('surface-elevated-default');
  color: ms.color('text-elevated-body');
  max-width: 20rem;
  width: fit-content;
  padding: ms.spacing('padding-xl') ms.spacing('padding-xl');
  position: relative;
  border-radius: ms.radius('lg');
  border: ms.border('thin') solid ms.color('border-neutral-default-subtle');
  box-shadow: ms.shadow('sm');

  .tooltip-text {
    @include ms.font('body-md-medium');
  }
}
</style>
