// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { toastController } from '@ionic/vue';
import { MsReportTheme } from '@lib/components';
import { I18n, Translatable, WindowSizeBreakpoints, getBreakpointFromWidth } from '@lib/services';
import { checkmark, closeCircle, information, warning } from 'ionicons/icons';

const DEFAULT_TOAST_DURATION = 5000;

interface HTMLIonToastElement extends HTMLElement {
  duration: number;
  present: () => Promise<void>;
}

export class ToastManager {
  toasts: HTMLIonToastElement[];
  currentToast: HTMLIonToastElement | null = null;

  constructor() {
    this.toasts = [];
  }

  async createAndPresent(toastConfig: {
    title?: Translatable;
    icon?: string;
    message: Translatable;
    theme: MsReportTheme;
    confirmButtonLabel?: Translatable;
    duration?: number;
    cssClass?: string | string[];
  }): Promise<any> {
    const duration = toastConfig.duration || DEFAULT_TOAST_DURATION;
    const isSmallDisplay = [WindowSizeBreakpoints.XS, WindowSizeBreakpoints.SM].includes(getBreakpointFromWidth());

    const toastCls = ['notification-toast', toastConfig.theme];
    if (toastConfig.cssClass) {
      if (typeof toastConfig.cssClass === 'string') {
        toastCls.push(toastConfig.cssClass);
      } else {
        toastCls.push(...toastConfig.cssClass);
      }
    }

    const toast = await toastController.create({
      header: I18n.translate(toastConfig.title),
      message: I18n.translate(toastConfig.message),
      cssClass: toastCls,
      mode: 'ios',
      duration: duration,
      position: isSmallDisplay === true ? 'top' : 'bottom',
      swipeGesture: isSmallDisplay === true ? 'vertical' : undefined,
      icon: toastConfig.theme ? this._getIcon(toastConfig.theme) : toastConfig.icon,
      buttons: [
        {
          text: I18n.translate(toastConfig.confirmButtonLabel || 'lib.services.toastManager.confirmButtonLabel'),
          role: 'confirm',
          side: 'end',
        },
      ],
    });

    this.toasts.push(toast);
    await this.managePresentQueue();

    const result = await toast.onDidDismiss();
    if (result) {
      this.toasts.splice(this.toasts.indexOf(toast), 1);
      await this.managePresentQueue();
    }
    return toast.onWillDismiss();
  }

  async managePresentQueue(): Promise<any> {
    const currentToast = this.toasts.at(0);

    if (currentToast) {
      document.documentElement.style.setProperty('--ms-toast-duration', `${currentToast.duration}ms`);
      // when the class active is added progress bar width is set to 0%
      setTimeout(() => {
        currentToast.classList.add('active');
      }, 100);
      await currentToast.present();
    }
  }

  private _getIcon(theme: MsReportTheme): string {
    switch (theme) {
      case MsReportTheme.Info:
        return information;
      case MsReportTheme.Success:
        return checkmark;
      case MsReportTheme.Warning:
        return warning;
      case MsReportTheme.Error:
        return closeCircle;
    }
  }
}
