// Parsec Cloud (https://parsec.cloud) Copyright (c) BUSL-1.1 2016-present Scille SAS

import { IValidator } from '@lib/common/validators';
import { MsReportTheme } from '@lib/components/ms-types';
import { Translatable } from '@lib/services/translation';

export enum Answer {
  No = 0,
  Yes = 1,
}

export interface GetTextOptions {
  title: Translatable;
  subtitle?: Translatable;
  trim?: boolean;
  validator?: IValidator;
  inputLabel?: Translatable;
  placeholder?: Translatable;
  okButtonText?: Translatable;
  defaultValue?: string;
  selectionRange?: [number, number];
}

export interface GetPasswordOptions {
  title: Translatable;
  subtitle?: Translatable;
  inputLabel?: Translatable;
  okButtonText?: Translatable;
}

export interface MsAlertModalConfig {
  title?: Translatable;
  theme: MsReportTheme;
  message: Translatable;
}

export interface MsModalConfig {
  title?: Translatable;
  theme?: MsReportTheme;
  subtitle?: Translatable;
  closeButton?: {
    visible: boolean;
    onClick?: () => Promise<boolean>;
  };
  cancelButton?: {
    disabled: boolean;
    label: Translatable;
    onClick?: () => Promise<boolean>;
    theme?: MsReportTheme;
  };
  confirmButton?: {
    disabled: boolean;
    label: Translatable;
    onClick?: () => Promise<boolean>;
    theme?: MsReportTheme;
  };
}

export enum MsModalResult {
  Cancel = 'cancel',
  Confirm = 'confirm',
}