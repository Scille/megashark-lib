// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { modalController } from '@ionic/vue';
import MsPasswordInputModal from '@lib/components/ms-modal/MsPasswordInputModal.vue';
import MsQuestionModal from '@lib/components/ms-modal/MsQuestionModal.vue';
import MsSpinnerModal from '@lib/components/ms-modal/MsSpinnerModal.vue';
import MsTextInputModal from '@lib/components/ms-modal/MsTextInputModal.vue';
import { GetPasswordOptions, GetTextOptions, MsModalResult } from '@lib/components/ms-modal/types';
import { Answer } from '@lib/components/ms-types';
import { Translatable } from '@lib/services';

export interface QuestionOptions {
  yesText?: Translatable;
  noText?: Translatable;
  keepMainModalHiddenOnYes?: boolean;
  yesIsDangerous?: boolean;
  backdropDismiss?: boolean;
}

export async function askQuestion(title: Translatable, subtitle: Translatable, options?: QuestionOptions): Promise<Answer> {
  const top = await modalController.getTop();
  if (top) {
    top.classList.add('overlapped-modal');
  }

  const modal = await modalController.create({
    component: MsQuestionModal,
    canDismiss: true,
    backdropDismiss: options?.backdropDismiss ?? true,
    cssClass: 'question-modal',
    componentProps: {
      title: title,
      subtitle: subtitle,
      yesText: options?.yesText,
      noText: options?.noText,
      yesIsDangerous: options?.yesIsDangerous,
    },
  });
  await modal.present();
  const result = await modal.onWillDismiss();
  await modal.dismiss();

  const answer = result.role === MsModalResult.Confirm ? Answer.Yes : Answer.No;

  if (top) {
    if (answer === Answer.No) {
      top.classList.remove('overlapped-modal');
    }
    // In most cases, we use askQuestion to dismiss a main modal process,
    // If we don't keep the main modal hidden on Yes, there is a disgraceful blink before the dismiss.
    // It's not really pretty but worst case is you forget to set the argument and the main modal blinks, instead of causing potentiel bugs.
    if (answer === Answer.Yes && !options?.keepMainModalHiddenOnYes) {
      top.classList.remove('overlapped-modal');
    }
  }
  return answer;
}

export async function getPasswordFromUser(options: GetPasswordOptions, isLargeDisplay: boolean): Promise<string | null> {
  const modal = await modalController.create({
    component: MsPasswordInputModal,
    canDismiss: true,
    backdropDismiss: false,
    showBackdrop: true,
    breakpoints: isLargeDisplay ? undefined : [0.5, 1],
    expandToScroll: false,
    handle: false,
    initialBreakpoint: isLargeDisplay ? undefined : 1,
    cssClass: 'password-input-modal',
    componentProps: options,
  });
  await modal.present();
  const result = await modal.onWillDismiss();
  await modal.dismiss();
  return result.role === MsModalResult.Confirm ? result.data : null;
}

export async function getTextFromUser(options: GetTextOptions, isLargeDisplay: boolean): Promise<string | null> {
  const modal = await modalController.create({
    component: MsTextInputModal,
    canDismiss: true,
    backdropDismiss: false,
    showBackdrop: true,
    breakpoints: isLargeDisplay ? undefined : [0.5, 1],
    expandToScroll: false,
    handle: false,
    initialBreakpoint: isLargeDisplay ? undefined : 1,
    cssClass: 'text-input-modal',
    componentProps: {
      title: options.title,
      subtitle: options.subtitle,
      trim: options.trim,
      validator: options.validator,
      inputLabel: options.inputLabel,
      placeholder: options.placeholder,
      okButtonText: options.okButtonText,
      defaultValue: options.defaultValue,
      selectionRange: options.selectionRange,
    },
  });
  await modal.present();
  const result = await modal.onWillDismiss();
  await modal.dismiss();
  return result.role === MsModalResult.Confirm ? result.data : null;
}

export async function openSpinnerModal(label?: Translatable): Promise<HTMLIonModalElement> {
  const modal = await modalController.create({
    component: MsSpinnerModal,
    canDismiss: true,
    backdropDismiss: false,
    showBackdrop: true,
    cssClass: 'ms-spinner-modal',
    componentProps: {
      label: label,
    },
  });
  await modal.present();
  return modal;
}
