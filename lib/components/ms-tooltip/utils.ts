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

export { TooltipAlignment, TooltipSide, openInformationTooltip, openTooltip };
