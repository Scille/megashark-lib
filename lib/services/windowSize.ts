// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { ComputedRef, Ref, computed, inject, onMounted, onUnmounted, ref } from 'vue';

interface _WindowSizeAttributes {
  windowWidth: Ref<number>;
  isLargeDisplay: ComputedRef<boolean>;
  isSmallDisplay: ComputedRef<boolean>;
}

export function useWindowSize(): _WindowSizeAttributes {
  const threshold = inject('msWindowWidthThreshold', 768);

  const windowWidth = ref(window.innerWidth);
  const isLargeDisplay = computed(() => windowWidth.value >= threshold);
  const isSmallDisplay = computed(() => windowWidth.value < threshold);

  const updateWidth = (): void => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { windowWidth, isLargeDisplay, isSmallDisplay };
}
