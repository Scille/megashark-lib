// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { ComputedRef, Ref, computed, inject, onMounted, onUnmounted, ref } from 'vue';

interface _WindowSizeAttributes {
  windowWidth: Ref<number>;
  isSmallDisplay: ComputedRef<boolean>;
  isMediumDisplay: ComputedRef<boolean>;
  isLargeDisplay: ComputedRef<boolean>;
}

export function useWindowSize(): _WindowSizeAttributes {
  const thresholdSmall = inject('msWindowWidthThreshold', 768) ?? 768;
  const thresholdMedium = inject('msWindowWidthThreshold', 992) ?? 992;

  const windowWidth = ref(window.innerWidth);
  const isSmallDisplay = computed(() => windowWidth.value <= thresholdSmall);
  const isMediumDisplay = computed(() => windowWidth.value >= thresholdSmall && windowWidth.value <= thresholdMedium);
  const isLargeDisplay = computed(() => windowWidth.value > thresholdMedium);

  const updateWidth = (): void => {
    windowWidth.value = window.innerWidth;
  };

  onMounted(() => {
    window.addEventListener('resize', updateWidth);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', updateWidth);
  });

  return { windowWidth, isSmallDisplay, isMediumDisplay, isLargeDisplay };
}
