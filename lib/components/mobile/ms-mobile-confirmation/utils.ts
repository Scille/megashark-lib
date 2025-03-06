// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { modalController } from '@ionic/vue';
import MsMobileConfirmation from '@lib/components/mobile/ms-mobile-confirmation/MsMobileConfirmation.vue';
import { Answer, MsModalResult } from '@lib/main';
import { Translatable } from '@lib/services';

export async function openMobileConfirmation(
  title: Translatable,
  subtitle: Translatable,
  yesText: Translatable,
  noText: Translatable,
): Promise<Answer> {
  const modal = await modalController.create({
    component: MsMobileConfirmation,
    canDismiss: true,
    cssClass: 'ms-mobile-confirmation',
    componentProps: {
      title: title,
      subtitle: subtitle,
      yesText: yesText,
      noText: noText,
    },
  });
  await modal.present();
  const result = await modal.onWillDismiss();
  await modal.dismiss();

  return result.role === MsModalResult.Confirm ? Answer.Yes : Answer.No;
}
