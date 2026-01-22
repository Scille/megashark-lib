// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { popoverController } from '@ionic/vue';
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

export function getBreakpointFromWidth(): WindowSizeBreakpoints {
  const width = window.innerWidth;
  if (width <= WindowSizeBreakpoints.XS) {
    return WindowSizeBreakpoints.XS;
  } else if (width <= WindowSizeBreakpoints.SM) {
    return WindowSizeBreakpoints.SM;
  } else if (width <= WindowSizeBreakpoints.MD) {
    return WindowSizeBreakpoints.MD;
  } else if (width <= WindowSizeBreakpoints.LG) {
    return WindowSizeBreakpoints.LG;
  } else if (width <= WindowSizeBreakpoints.XL) {
    return WindowSizeBreakpoints.XL;
  }
  return WindowSizeBreakpoints.XXL;
}

export function useWindowSize(): _WindowSizeAttributes {
  const threshold = inject('msWindowWidthThreshold', 768) ?? 768;

  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);
  const isLargeDisplay = computed(() => windowWidth.value > threshold);
  const isSmallDisplay = computed(() => windowWidth.value <= threshold);

  const updateWidth = async (): Promise<void> => {
    if (await popoverController.getTop()) {
      await popoverController.dismiss();
    }
    windowWidth.value = window.innerWidth;
  };

  const updateHeight = async (): Promise<void> => {
    if (await popoverController.getTop()) {
      await popoverController.dismiss();
    }
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
