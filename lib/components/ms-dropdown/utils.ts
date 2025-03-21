// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { modalController } from '@ionic/vue';
import MsSmallDisplayDropdown from '@lib/components/ms-dropdown/MsSmallDisplayDropdown.vue';
import { MsModalResult } from '@lib/components/ms-modal/types';
import { MsOptions } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';

export async function openSmallDisplayDropdown(options: MsOptions, title?: Translatable, defaultOption?: any): Promise<any> {
  const modal = await modalController.create({
    component: MsSmallDisplayDropdown,
    canDismiss: true,
    cssClass: 'sheet-modal',
    breakpoints: [0, 1],
    initialBreakpoint: 1,
    componentProps: {
      title: title,
      options: options,
      defaultOptionKey: defaultOption,
    },
  });
  await modal.present();
  const result = await modal.onWillDismiss();
  await modal.dismiss();
  return result.role === MsModalResult.Confirm ? result.data : null;
}
