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

async function openTooltip(
  event: Event,
  text: Translatable,
  alignment = TooltipAlignment.Center,
  side = TooltipSide.Bottom,
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
  alignment = TooltipAlignment.Center,
  side = TooltipSide.Bottom,
): Promise<void> {
  let popover: HTMLIonPopoverElement | undefined;

  el.addEventListener('mouseenter', async (event: MouseEvent): Promise<void> => {
    // When our element is hovered, we create a tooltip
    popover = await popoverController.create({
      component: MsTooltip,
      event: event,
      alignment: alignment,
      side: side,
      componentProps: {
        text: text,
      },
      cssClass: 'tooltip-popover',
      showBackdrop: false,
    });
    // We watch the mouvement of the mouse
    document.addEventListener('mousemove', onDocumentMouseMove);
    await popover.present();

    async function onDocumentMouseMove(event: MouseEvent): Promise<void> {
      if (!popover) {
        return;
      }

      // We check the mouse coordinates against our element coordinates
      const rect = el.getBoundingClientRect();
      const hovered =
        event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;

      if (!hovered) {
        // The mouse is no longer over our element, we dismiss the popover and remove the listener
        await popover.dismiss();
        popover = undefined;
        document.removeEventListener('mousemove', onDocumentMouseMove);
      }
    }
  });
}

export { TooltipAlignment, TooltipSide, attachMouseOverTooltip, openInformationTooltip, openTooltip };
