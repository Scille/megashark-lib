// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { ComputedRef, Ref, computed, inject, onMounted, onUnmounted, ref } from 'vue';

interface _WindowSizeAttributes {
  windowWidth: Ref<number>;
  windowHeight: Ref<number>;
  isLargeDisplay: ComputedRef<boolean>;
  isSmallDisplay: ComputedRef<boolean>;
}

export enum WindowSizeBreakpoints {
  XXL = 1920,
  XL = 1500,
  LG = 1200,
  MD = 992,
  SM = 768,
  XS = 576,
}

export function useWindowSize(): _WindowSizeAttributes {
  const threshold = inject('msWindowWidthThreshold', 768) ?? 768;

  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  const isLargeDisplay = computed(() => windowWidth.value > threshold);
  const isSmallDisplay = computed(() => windowWidth.value <= threshold);

  const updateWidth = (): void => {
    windowWidth.value = window.innerWidth;
  };

  const updateHeight = (): void => {
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
    window.addEventListener('resize', updateHeight);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
    window.removeEventListener('resize', updateHeight);
  });

  return { windowWidth, windowHeight, isLargeDisplay, isSmallDisplay };
}
