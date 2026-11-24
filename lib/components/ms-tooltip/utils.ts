// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import MsTooltip from '@lib/components/ms-tooltip/MsTooltip.vue';
import { Translatable } from '@lib/services';

import { popoverController } from '@ionic/vue';

enum TooltipAlignment {
  Center = 'center',
  Start = 'start',
  End = 'end',
}

enum TooltipSide {
  Top = 'top',
  Bottom = 'bottom',
  Left = 'left',
  Right = 'right',
}

// Offsets are applied in screen coordinates: a positive x moves the tooltip to the right,
// a positive y moves it down. Values are in rem.
interface TooltipOffsets {
  x?: number;
  y?: number;
}

function applyOffsets(
  popover: HTMLIonPopoverElement,
  offsets?: TooltipOffsets,
  compensationX: number = 0,
  compensationY: number = 0,
): void {
  const baseX = `${offsets?.x ?? 0}rem`;
  const baseY = `${offsets?.y ?? 0}rem`;
  popover.style.setProperty(
    '--offset-x',
    compensationX === 0 ? baseX : `calc(${baseX} ${compensationX > 0 ? '+' : '-'} ${Math.abs(compensationX)}px)`,
  );
  popover.style.setProperty(
    '--offset-y',
    compensationY === 0 ? baseY : `calc(${baseY} ${compensationY > 0 ? '+' : '-'} ${Math.abs(compensationY)}px)`,
  );
}

async function openTooltip(
  event: Event,
  text: Translatable,
  alignment = TooltipAlignment.Center,
  side = TooltipSide.Bottom,
  offsets?: TooltipOffsets,
): Promise<void> {
  event.stopPropagation();
  const popover = await popoverController.create({
    component: MsTooltip,
    alignment: alignment,
    side: side,
    event: event,
    componentProps: {
      text,
    },
    cssClass: 'tooltip-popover',
    showBackdrop: false,
  });
  applyOffsets(popover, offsets);
  await popover.present();
  await popover.onWillDismiss();
  await popover.dismiss();
}

async function openInformationTooltip(event: Event, text: Translatable): Promise<void> {
  return await openTooltip(event, text, TooltipAlignment.Center, TooltipSide.Bottom);
}

async function attachMouseOverTooltip(
  el: HTMLElement,
  text: Translatable,
  delay: number = 500,
  alignment = TooltipAlignment.Center,
  side = TooltipSide.Bottom,
  offsets?: TooltipOffsets,
): Promise<void> {
  let popover: HTMLIonPopoverElement | undefined;
  let timeoutId: any = undefined;

  async function onMouseEnter(event: MouseEvent): Promise<void> {
    if (popover || timeoutId !== undefined) {
      return;
    }

    timeoutId = setTimeout(async () => {
      if (popover) {
        return;
      }

      // Ionic computes the position once at present() with the content size at that moment.
      // Compensate the size changes reported by MsTooltip to keep the tooltip anchored.
      // Reports during present() (the content is hidden at 0px first) only set the initial size.
      const isRTL = document.dir === 'rtl';
      const trailing = (alignment === TooltipAlignment.End) !== isRTL;
      const alignmentShare = alignment === TooltipAlignment.Center ? 0.5 : trailing ? 1 : 0;
      const widthShare = side === TooltipSide.Left ? 1 : side === TooltipSide.Right ? 0 : alignmentShare;
      const heightShare = side === TooltipSide.Top ? 1 : side === TooltipSide.Bottom ? 0 : alignmentShare;
      let previousWidth: number | undefined = undefined;
      let previousHeight: number | undefined = undefined;
      let compensationX = 0;
      let compensationY = 0;
      let presented = false;

      function onContentSizeChange(size: { width: number; height: number }): void {
        if (!presented || previousWidth === undefined || previousHeight === undefined) {
          previousWidth = size.width;
          previousHeight = size.height;
          return;
        }
        compensationX += (previousWidth - size.width) * widthShare;
        compensationY += (previousHeight - size.height) * heightShare;
        previousWidth = size.width;
        previousHeight = size.height;
        if ((compensationX === 0 && compensationY === 0) || !popover) {
          return;
        }
        applyOffsets(popover, offsets, compensationX, compensationY);
      }

      // When our element is hovered, we create a tooltip
      popover = await popoverController.create({
        component: MsTooltip,
        event: event,
        alignment: alignment,
        side: side,
        componentProps: {
          text: text,
          onSizeChange: onContentSizeChange,
        },
        cssClass: 'tooltip-popover',
        showBackdrop: false,
      });
      applyOffsets(popover, offsets);
      // We watch the actions of the mouse
      document.addEventListener('mousemove', onDocumentMouseMove);
      popover.style.pointerEvents = 'none';
      await popover.present();
      presented = true;

      function isOverElement(event: MouseEvent): boolean {
        const rect = el.getBoundingClientRect();
        return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      }

      async function onDocumentMouseMove(event: MouseEvent): Promise<void> {
        if (!popover) {
          return;
        }

        if (!isOverElement(event)) {
          // The mouse is no longer over our element, we dismiss the popover and remove the listener
          await popover.dismiss();
          popover = undefined;
          document.removeEventListener('mousemove', onDocumentMouseMove);
        }
      }
    }, delay);
  }

  function onMouseLeave(): void {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = undefined;
    }
  }

  const controller = new AbortController();
  const opts: AddEventListenerOptions = { signal: controller.signal };

  el.addEventListener('mouseenter', onMouseEnter, opts);
  el.addEventListener('mouseleave', onMouseLeave, opts);
}

export { attachMouseOverTooltip, openInformationTooltip, openTooltip, TooltipAlignment, TooltipSide };
export type { TooltipOffsets };
